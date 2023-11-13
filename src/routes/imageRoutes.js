import express from 'express'
import { addComment, addPicture, getCommentsById, getImage,getImageById, getImagesBySearchName, upload } from '../controllers/imageController.js';

const imageRoutes = express.Router();

imageRoutes.get("/get-image",getImage);

imageRoutes.get("/get-image-by-id/:id",getImageById);

imageRoutes.get("/get-comments-by-id/:hinhid/:duongdan",getCommentsById);

imageRoutes.post("/add-comment",addComment);

imageRoutes.get("/get-images-by-search-name/:keyword",getImagesBySearchName);


imageRoutes.post("/add-a-picture",upload.single("file"),addPicture);

export default imageRoutes