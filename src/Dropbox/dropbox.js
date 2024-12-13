import { Dropbox } from 'dropbox';
import fetch from 'cross-fetch';
import process from 'process';

let DROPBOX_ACCESS_TOKEN = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN;

const boundFetch = fetch.bind(window);

const dropbox = new Dropbox({ 
  accessToken: DROPBOX_ACCESS_TOKEN,
  fetch: boundFetch,
});

export const refreshToken = async () => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8000/dbxtoken`
        );
        const res = await response.json();
        DROPBOX_ACCESS_TOKEN = res;
    } catch (error) {
        console.error("Error al obtener token dbx:", error);
    }
}

export const uploadFileToDropbox = async (file) => {
  try {
    console.log('File:',file);
    const response = await dropbox.filesUpload({ path: `/${file.name}`, contents: file });
    return response;
  } catch (error) {
    console.error('Error uploading file to Dropbox', error);
    throw error;
  }
};

export const listFilesInDropbox = async () => {
  try {
    const response = await dropbox.filesListFolder({ path: '' });
    console.log('Dropbox response:', response);
    if (response.result && response.result.entries) {
      return response.result.entries;
    }
    return [];
  } catch (error) {
    console.error('Error fetching files from Dropbox', error);
    throw error;
  }
};

export const getFileLink = async (path) => {
  try {
    // Call Dropbox API to get a temporary link
    const response = await dropbox.filesGetTemporaryLink({ path });

    // Check if the response contains a valid 'link'
    if (response && response.result && response.result.link) {
      return response.result.link;  // Return the valid link
    } else {
      console.error('Failed to retrieve link for file:', path);
      return null; // Return null if the link is not available
    }
  } catch (error) {
    console.error('Error fetching file link from Dropbox:', error);
    return null;  // Return null on error
  }
};

