import { Sequelize } from "sequelize";
import model from "../config/config.js";


const sequelize = new Sequelize("db_my_pinterest","root","1234",{
    host:"localhost",
    port:"3307",
    dialect:"mysql"
})

export default sequelize


//  yarn sequelize-auto -h localhost -d db_my_pinterest -u root -x 1234 -p 3307 --dialect mysql -o ./src/models -l esm