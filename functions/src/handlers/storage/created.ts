import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';
import CollectionReference = FirebaseFirestore.CollectionReference;

import { extractData } from '../../steps/extract-data';
import { extractText } from '../../steps/extract-text';

export const readScannedDocument = async (receiptsCollection: CollectionReference, object: ObjectMetadata) => {
    console.log('New file created', {object});

    let response;
    try {
        response = await extractText(object);
    } catch(e) {
        console.warn('Error performing analysis with Cloud Vision API', e);
        return;
    }

    let doc;
    try {
        const inputText = response[0].textAnnotations[0].description;
        console.log('Using input', inputText);
        doc = extractData(object.name, inputText);
        console.log('Data extracted', doc);
    } catch (e) {
        console.warn('Error extracting data', e);
        return;
    }

    try {
        console.log('Saving to Firestore...');
        const ref = await receiptsCollection.add(doc);
        console.log(`Saved as ${ref.id}`);
    } catch (e) {
        console.warn('Error persisting in Firestore', e);
        return;
    }

    console.info('Finished');
};
