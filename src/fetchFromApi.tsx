import axios from 'axios';
import { history } from './index';


export const BASE_URL = 'http://localhost:8080';

const options = {
  headers: {
    'token': localStorage.getItem("USER_LOGIN"),
  }
};



export const getImageApi = async () => {
    const { data } = await axios.get(`${BASE_URL}/api/images/get-image`);
  
    return data;
  }

  export const getImageByIdApi = async (id:any) => {
    const { data } = await axios.get(`${BASE_URL}/api/images/get-image-by-id/${id}`);
  
    return data;
  }

  export const addPictureApi = async (values:any) => {
    const { data } = await axios.post('http://localhost:8080/api/images/add-a-picture',values,options);
  
    return data;
}
  
export const getCommentsByIdApi = async (hinh_id:any,duong_dan:any) => {
  const { data } = await axios.get(`${BASE_URL}/api/images/get-comments-by-id/${hinh_id}/${duong_dan}`);

  return data;
}

export const addCommentApi = async (value:any,hinh_id:any) => {
  const { data } = await axios.post(`${BASE_URL}/api/images/add-comment`,{value,hinh_id},options);

  return data;
}

export const getCreatedByIdApi = async (id:any) => {
  const { data } = await axios.get(`${BASE_URL}/api/users/get-created-by-id/${id}`,options);

  return data;
}
export const getSavedByIdApi = async (id:any) => {
  const { data } = await axios.get(`${BASE_URL}/api/users/get-saved-by-id/${id}`,options);
  return data;
}


export const addSavePictureApi = async (hinhId:any,duongDan:any) => {
  const { data } = await axios.post(`${BASE_URL}/api/users/add-save-picture`,{hinhId,duongDan},options);

  return data;
}



export const getProfileByIdApi = async () => {
  const { data } = await axios.get(`${BASE_URL}/api/users/get-profile-by-id`,options);
  return data;
}
export const updateProfileByIdApi = async (values:any) => {
  const { data } = await axios.put(`${BASE_URL}/api/users/update-profile-by-id`,values,options);
  return data;
}

export const updateAvatarByIdApi = async (values:any) => {
  const { data } = await axios.put(`${BASE_URL}/api/users/update-avatar-by-id`,values,options);
  return data;
}

export const getImagesbySearchNameApi = async (keyword:any) => {
  const { data } = await axios.get(`${BASE_URL}/api/images/get-images-by-search-name/${keyword}`,options);
  return data;
}

export const forgotPasswordApi = async (values:any) => {
  const { data } = await axios.post(`${BASE_URL}/api/users/forgot-password`,values,options);
  return data;
}

export const checkCodeApi = async (code:any) => {
  const { data } = await axios.put(`${BASE_URL}/api/users/check-code`,code,options);
  return data;
}

export const updateNewPasswordApi = async (values:any) => {
  const { data } = await axios.post(`${BASE_URL}/api/users/update-newpassword`,values,options);
  return data;
}

