import express from 'express'
import { addSavePicture, checkCode, forgotPassword, getCreatedById, getProfileById, getSaveById, login, register, updateAvatarById, updateNewPassword, updatePassword, updateProfileById } from '../controllers/userController.js';
import { upload } from '../controllers/imageController.js';
const userRoutes = express.Router();
userRoutes.post("/register",register);
userRoutes.post("/login",login);
userRoutes.post("/add-save-picture",addSavePicture);
userRoutes.get("/get-created-by-id/:id",getCreatedById);
userRoutes.get("/get-saved-by-id/:id",getSaveById);
userRoutes.get("/get-profile-by-id",getProfileById);
userRoutes.put("/update-profile-by-id",updateProfileById);
userRoutes.post("/forgot-password",forgotPassword);
userRoutes.put("/check-code",checkCode);
userRoutes.post("/update-password",updatePassword);
userRoutes.put("/update-newpassword",updateNewPassword);
userRoutes.put("/update-avatar-by-id",upload.single("file"),updateAvatarById);
export default userRoutes