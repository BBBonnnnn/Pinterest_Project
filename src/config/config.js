import dotenv from 'dotenv'

dotenv.config();



let model = { 
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    username:process.env.DB_USERNAME,
    pass:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    dialect:process.env.DB_DIALECT,
    client_id:process.env.CLIENT_ID,
    client_secret:process.env.CLIENT_SECRET,
    redirect_uris:process.env.REDIRECT_URIS}

    // console.log(model);

export default model
