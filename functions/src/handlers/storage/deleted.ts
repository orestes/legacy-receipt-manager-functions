import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';

import CollectionReference = FirebaseFirestore.CollectionReference;
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;

export const deleteMatchingEntry = async (receiptsCollection: CollectionReference, object: ObjectMetadata) => {
    console.log('File deleted', {object});

    try {
        console.log('Query');
        const query = await receiptsCollection.where('fileName', '==', object.name);
        console.log('Snapshot');
        const snapshot: QuerySnapshot = await query.get();
        console.log('Batch');
        const batch = await query.firestore.batch();

        console.log('Delete');
        snapshot.forEach((doc: QueryDocumentSnapshot) => batch.delete(doc.ref));

        console.log('Commit');
        await batch.commit();
        console.log('Entry deleted')
    } catch(e) {
        console.warn('Error performing analysis with Cloud Vision API', e);
        return;
    }

    console.info('Finished');
};
