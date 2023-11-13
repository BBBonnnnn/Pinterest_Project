import initModels from '../models/init-models.js'
import sequelize from '../models/connect.js'
import multer, { diskStorage } from 'multer';
import { uploadFile } from '../googleAPi.js';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { Sequelize } from 'sequelize'
let Op = Sequelize.Op;
let model = initModels(sequelize);
// -----get-Image---------------------
const getImage = async (req, res) => {

    let data = await model.hinh_anh.findAll()

    res.send(data)

}
// ----------get-Image-By-Id-------------------------
const getImageById = async (req, res) => {
    let { id } = req.params
    let data = await model.hinh_anh.findOne({
        where: {
            duong_dan: id
        }
    })

    res.send(data)

}
// ---------------add-Picture----------------------
const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/images",
        filename: (req, file, callback) => {
            callback(null, new Date().getTime() + "_" + file.originalname)
        }
    })
});

const addPicture = async (req, res) => {
    let { token } = req.headers;
    let infoUser = jwt.decode(token);
    let file = req.file;
    let { title, description } = req.body;
    let data = { file, title, description }
    await uploadFile(file.filename, file.path).then(async (result) => {
        await model.hinh_anh.create({
            tieu_de_hinh: title,
            ten_hinh: result.name,
            duong_dan: result.id,
            mo_ta: description,
            nguoi_dung_id: infoUser.checkEmail.nguoi_dung_id
        })
        fs.unlink(file.path, err => {
            if (err) {
                console.error('Lỗi khi xóa tệp tin:', err);
            } else {
                console.log('Tệp tin đã được xóa thành công.');
            }
        })

    }
    ).catch(err => {
        console.log(err)
    })
    res.send(data)
}
// --------------------get-comments-by-id---------------------------------


const getCommentsById = async (req, res) => {
    let { hinhid, duongdan } = req.params
    let data = await model.binh_luan.findAll({
        where: {
            hinh_id: hinhid
        }
    })

    res.send(data)

}

const addComment = async (req, res) => {
    let { value,hinh_id } = req.body;
    let { token } = req.headers;
    let infoUser = jwt.decode(token);


    await model.binh_luan.create({
            ngay_binh_luan: new Date(),
            noi_dung: value.comment,
            nguoi_dung_id: infoUser.checkEmail.nguoi_dung_id,
            hinh_id: hinh_id
    })
    res.send('!!!!!thành công')



}

const getImagesBySearchName = async (req, res) => {
    let { keyword } = req.params

    let data = await model.hinh_anh.findAll({
        where: {
            tieu_de_hinh: {
                [Op.like]: `%${keyword}%`
            }
        }
    })

    res.send(data)
}



export {
    upload,
    getImage,
    getImageById,
    addPicture,
    getCommentsById,
    addComment,
    getImagesBySearchName
}


