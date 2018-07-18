import { File } from '@google-cloud/storage';
import * as admin from 'firebase-admin';

// Steps
import { download } from '../../steps/download';
import { transformPDFtoJPEG } from '../../steps/transform';

// Models
import { FileMetadata } from '../../models/file-metadata';

export const notifyUploadHandler = (req, res) => {
    const file: FileMetadata = req.body;

    console.log('New file uploaded on Drive', {file});

    return download(file.webContentLink, file.originalFilename)
        .then(downloadPath => transformPDFtoJPEG(downloadPath, file.originalFilename))
        .then(imagePath => {
            return admin.storage()
                .bucket('orestes-lab-198500.appspot.com')
                .upload(imagePath, {
                    destination: file.originalFilename + '.jpg',
                });
        })
        .then((files: File[]) => {
            return res.send('Downloaded, transformed and uploaded: ' + JSON.stringify(files));
        });
};
