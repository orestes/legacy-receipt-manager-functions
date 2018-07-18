import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';

import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient();

export const extractText = async function (object: ObjectMetadata) {
    const gcsUri = `gs://${object.bucket}/${object.name}`;

    const request = {
        image: {
            source: {
                imageUri: gcsUri,
            },
        },
        features: [{
            type: 'DOCUMENT_TEXT_DETECTION',
        }],
    };

    console.log('Analysing image...', request);
    const response = await client.annotateImage(request);

    console.log('Cloud Vision API processing done');
    return response;
};
