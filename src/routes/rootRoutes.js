import express from 'express'
import imageRoutes from './imageRoutes.js';
import userRoutes from './userRoutes.js';

const rootRoutes = express.Router();

rootRoutes.use("/images",imageRoutes);
rootRoutes.use("/users",userRoutes)


export default rootRoutes