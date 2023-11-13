
import {google} from 'googleapis'
import fs  from 'fs'
const CLIENT_ID = '815949449745-4t71ihrfm3qqr757d7cdoitku53o60ep.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REFRESH_TOKEN = '1//04IpMmwoJeDsACgYIARAAGAQSNwF-L9IrNvOfPq67sN4DLAxjeDXY5iivNwbEWA2KLqVoQ2PnyhcN9ess_vnDJfMB_H7sU2omKXs';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const oauth2Client = new google.auth.OAuth2 (
    CLIENT_ID,
    CLIENT_SECRET,
    REFRESH_TOKEN,
    REDIRECT_URI
);
oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN});
const drive = google.drive({
    version: 'v3',
    auth:oauth2Client
})
const uploadFile = async (filename,filePath)=>{
    
    try{
        const parents = "1hKqbC2m2QS47csZQpMONPcnb_hWAHaDH";
        const mimeType = filename.endsWith('.jpg') || filename.endsWith('.png') ? 'image/jpg' : 'image/png';
        const response = await drive.files.create({
            requestBody:{
                name:filename,
                mimeType:mimeType,
                parents:parents
            },
            media:{
                mimeType:mimeType,
                body:fs.createReadStream(filePath)
            }
        })
        // console.log(response.data)
        return response.data
    }catch(err){
        console.log(err.message)
    }
}

const generatePublicURL = async ()=>{
    try{
      const fileId = '1DpIK1Q6NV1By1rpG_DvxGag7LkgzxkmF'
        await drive.permissions.create({
            fileId:fileId,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        })
        const result =await drive.files.get({
            fileId:fileId,
            fields:'webContentLink ,id, webViewLink,thumbnailLink'
        })

        console.log(result.data)
    }catch(err){
        console.log(err.message)
    }
}



export {generatePublicURL,uploadFile}
