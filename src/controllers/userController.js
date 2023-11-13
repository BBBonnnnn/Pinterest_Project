import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import { Sequelize } from 'sequelize'
import bcrypt, { hashSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'
import nodemailer from 'nodemailer'
let model = initModels(sequelize);
let Op = Sequelize.Op;
const register = async (req, res) => {
    let { email, password } = req.body
    let checkEmail = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })
    if (checkEmail) {
        res.send("Email đã tồn tại!!!")
        return;
    }
    let passCrypt = bcrypt.hashSync(password, 10)
    await model.nguoi_dung.create({
        email,
        mat_khau: passCrypt,
        ten: '',
        tuoi: 0,
        anh_dai_dien: '',
        ho: ''
    })
    res.send("Đăng ký thành công")

}

const login = async (req, res) => {
    let { email, password } = req.body
    let checkEmail = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })
    if (checkEmail) {
        let checkPass = bcrypt.compareSync(password, checkEmail.mat_khau)
        if (checkPass) {
            let token = jwt.sign({ checkEmail }, "PINTEREST", { algorithm: "HS256", expiresIn: "1y" })
            let userId = checkEmail.nguoi_dung_id
            let data = {
                token,
                userId
            }
            res.send(data)
        } else {
            res.send("password incorrect!!!")
        }
    } else {
        res.send("email incorrect!!!");
    }
}

const getCreatedById = async (req, res) => {
    let { id } = req.params
    let { token } = req.headers;
    let infoUser = jwt.decode(token);
    let data = await model.hinh_anh.findAll({
        where: {
            nguoi_dung_id: id
        }
    })

    res.send(data)

}

const addSavePicture = async (req, res) => {
    let { token } = req.headers;
    let infoUser = jwt.decode(token);
    let { hinhId, duongDan } = req.body;
    let checkSavedPicture = await model.luu_anh.findOne({
        where: {
            hinh_id: hinhId,
            nguoi_dung_id: infoUser.checkEmail.nguoi_dung_id
        }
    })
    if (checkSavedPicture) {
        res.send("Ảnh đã lưu rồi!!!")
        return
    }
    await model.luu_anh.create({
        nguoi_dung_id: infoUser.checkEmail.nguoi_dung_id,
        hinh_id: hinhId,
        ngay_luu: new Date(),
        duong_dan: duongDan
    })
    res.send(infoUser)

}
const getSaveById = async (req, res) => {
    let { id } = req.params
    let { token } = req.headers;
    let infoUser = jwt.decode(token);
    let data = await model.luu_anh.findAll({
        where: {
            nguoi_dung_id: id
        }
    })

    res.send(data)

}
const getProfileById = async (req, res) => {
    let { token } = req.headers;
    let infoUser = jwt.decode(token);
    let data = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: infoUser.checkEmail.nguoi_dung_id
        }
    })

    res.send(data)

}
const updateProfileById = async (req, res) => {
    let { token } = req.headers;
    let { firstname, surname, age } = req.body;
    let infoId = jwt.decode(token);
    let infoUser = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: infoId.checkEmail.nguoi_dung_id
        }
    })
    infoUser = {
        ...infoUser,
        ten: firstname,
        ho: surname,
        tuoi: age
    }

    await model.nguoi_dung.update(infoUser, {
        where: {
            nguoi_dung_id: infoId.checkEmail.nguoi_dung_id
        }
    })

    res.send('Update Info Success!!!')
}
// ------------------upload-avatar----------------------


const updateAvatarById = async (req, res) => {
    let { token } = req.headers;
    let file = req.file;
    let infoId = jwt.decode(token);
    let infoUser = await model.nguoi_dung.findOne({
        where: {
            nguoi_dung_id: infoId.checkEmail.nguoi_dung_id
        }
    });
    const filename = path.basename(infoUser.anh_dai_dien);

    fs.unlink(`C:/Users/Admin/Desktop/baitap_nop/Back-End/mypicture_project/BE/public/images/${filename}`, err => {
        if (err) {
            console.error('Lỗi khi xóa tệp tin:', err);
        } else {
            console.log('Tệp tin đã được xóa thành công.');
        }
    })
    infoUser = {
        ...infoUser,
        anh_dai_dien: `http://localhost:8080/public/images/${file.filename}`
    }

    await model.nguoi_dung.update(infoUser, {
        where: {
            nguoi_dung_id: infoId.checkEmail.nguoi_dung_id
        }
    })

    res.send("Update Avatar Success!!!")

}



// ----------------send-mail-------------------------

const forgotPassword = async (req, res) => {
    let { email } = req.body
    let checkEmail = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "truonghoangkhang17051995@gmail.com", // Email của bạn
            pass: "lwwtybnfaoccnpui", // Mật khẩu của bạn
        },


    });
    if (checkEmail) {
        let randomNumber = Math.floor(Math.random() * 1000000);
        let formattedNumber = String(randomNumber).padStart(6, '0');
        let code1 = await model.quen_mat_khau_code.create({
            code: formattedNumber,
            nguoi_dung_id: checkEmail.nguoi_dung_id
        })
        const mailOptions = {
            from: "truonghoangkhang17051995@gmail.com", // Địa chỉ email nguồn
            to: checkEmail.email, // Địa chỉ email đích
            subject: "Verification Code", // Chủ đề email
            text: `
                     Welcome to SwapMyFace!
            
                     Here's your verification code: ${code1.code}`, // Nội dung email (dạng văn bản)
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Lỗi khi gửi email: " + error);
            } else {
                console.log("Email đã được gửi: " + info.response);
            }
        })
        res.send('Check your email and enter your code !!!')
    } else {

        res.send('Email chưa đăng được đăng ký !!!')
    }


}
const checkCode = async (req, res) => {
    let { values,email } = req.body
    let checkEmail = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })
    let checkcode = await model.quen_mat_khau_code.findOne({
        where: {
            nguoi_dung_id:checkEmail.nguoi_dung_id,
            code:values.code
        }
    })
    if(checkcode){
        res.send("Success")
        return
    }
    res.send("Fail")
}

const updatePassword = async (req, res) => {
    let { values,email } = req.body
    let checkEmail = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })
    let checkcode = await model.quen_mat_khau_code.findOne({
        where: {
            nguoi_dung_id:checkEmail.nguoi_dung_id,
            code:values.code
        }
    })
    if(checkcode){
        res.send("thành công")
        return
    }
    res.send("thất bại")
}
const updateNewPassword = async (req, res) => {
    let {email,values} = req.body
    let {newpassword,checknewpassword} =values
   if(newpassword == checknewpassword){
    let passCrypt = bcrypt.hashSync(newpassword, 10)
    let infoUser = await model.nguoi_dung.findOne({
        where: {
            email: email
        }
    })
    infoUser = {
        ...infoUser,
        mat_khau:passCrypt
    }
    await model.nguoi_dung.update(infoUser, {
        where: {
           email:email
        }
    })

    await model.quen_mat_khau_code.destroy({
        where:{
            nguoi_dung_id:infoUser.dataValues.nguoi_dung_id
        }
    })
    res.send("Creat New password Success") 
   }else if(newpassword != checknewpassword){
    res.send("mật khẩu xác thực không đúng")
   }
}


// ---------------------------------------------------

export {
    register, login,
    getCreatedById, addSavePicture,
    getSaveById, getProfileById,
    updateProfileById,
    updateAvatarById,
     forgotPassword,
    checkCode,updatePassword,updateNewPassword
}
