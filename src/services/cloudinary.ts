interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  folder: string;
}

export const cloudinaryConfig = {
  cloudName: 'dbghm9912',
  uploadPreset: 'OaQACj140UuYOH1E2hRegMCUknE',
  apiKey: 'YOUR_API_KEY'
};

export const uploadImage = async (file: File, folder: string): Promise<CloudinaryResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  return response.json();
};

export const getImagesFromFolder = async (folder: string) => {
  // Questa funzione userà l'API di Cloudinary per ottenere tutte le immagini in una cartella
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/resources/image/upload?prefix=${folder}/`,
    {
      headers: {
        Authorization: `Basic ${btoa(cloudinaryConfig.apiKey + ':')}`
      }
    }
  );

  return response.json();
}; 