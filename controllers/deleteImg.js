import fs from 'fs/promises';
import path from 'path';

async function deleteFile(fileDest, fileName) {
  try {
    const filePath = path.resolve(fileDest, fileName);
    //checking if file exists
    await fs.access(filePath);

    //Deleting the file
    await fs.unlink(filePath);
    console.log("File deletion successful");
  } catch (err) {
    if(err.code === 'ENOENT'){
      console.log('File does not exist');
      return;
    } else {
      console.error('Error deleting file:', err);
    }
  }
}

export { deleteFile }