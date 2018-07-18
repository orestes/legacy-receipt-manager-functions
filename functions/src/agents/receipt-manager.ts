import { dialogflow, SimpleResponse } from 'actions-on-google';

import * as admin from 'firebase-admin';
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;

import { Receipt } from '../models/receipt.interface';
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;

const random = (options) => options[Math.floor(Math.random() * options.length)];

export const receiptManager = dialogflow({
    debug: true,
});

receiptManager.intent('actions.intent.CANCEL', (conv, params) => {
    return conv.close('Okay, bye!');
});

receiptManager.intent('query.pending', (conv, params) => {
    console.log('query.pending', {query: conv.query, params});

    return admin.firestore()
        .collection('receipts')
        .where('category', '==', 'pending')
        .get()
        .then((snapshot: QuerySnapshot) => {
            console.log('Matching receipts', snapshot.docs);

            const count = snapshot.size;

            if (!count) {
                const ssml = [
                    `Nope, you\'re good.`,
                    `No. Looks like you\'re done for now.`,
                    `I can see no tickets pending`,
                    `You don\'t have any tickets pending. good job!`,
                ];

                conv.add(random(ssml));
            } else {
                const ssml = [
                    `There are ${count} receipts pending classification`,
                    `You have ${count} receipts to go through.`,
                    `Still ${count} receipts left to classify.`,
                ];

                conv.add(random(ssml));
            }

            conv.add('Anything else?');
        });
});

receiptManager.intent('query.category', (conv, params) => {
    console.log('query.category', {query: conv.query, params});

    const category = (params.Category as string).toLowerCase();

    return admin.firestore()
        .collection('receipts')
        .where('category', '==', category)
        .get()
        .then((snapshot: QuerySnapshot) => {
            console.log('Matching receipts', snapshot.docs);

            const currency = 'euros';
            const count = snapshot.size;
            const total = snapshot.docs
                .reduce((total: number, r: QueryDocumentSnapshot) => {
                    return total + (r.data() as Receipt).total;
                }, 0);

            if (!count) {
                conv.add(new SimpleResponse(`There are no tickets tagged as ${category}`));
            } else {
                const ssml = [
                    `There are ${count} receipts tagged as ${category}. The total is ${total} ${currency}`,
                    `You have ${count} receipts tagged as ${category}, for a total of ${total} ${currency}`,
                    `That would be ${total} ${currency} spend on ${category}.`,
                    `Looks like ${total} ${currency}, adding the ${count} tickets tagged ${category}.`,
                    `I can see ${count} tickets tagged ${category}, totalling ${total} ${currency}.`,
                ];

                conv.add(random(ssml));
            }

            conv.ask('Anything else?');
        });
});
