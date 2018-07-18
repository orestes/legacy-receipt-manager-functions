import { ObjectMetadata } from 'firebase-functions/lib/providers/storage';

import { storage, https } from 'firebase-functions';
import * as admin from 'firebase-admin';

import { readScannedDocument, deleteMatchingEntry, notifyUploadHandler } from './handlers';
import { receiptManager } from './agents/receipt-manager';

admin.initializeApp();
const receipts = admin.firestore().collection('receipts');

export const readReceiptImage = storage.object()
    .onFinalize(async (object: ObjectMetadata) => await readScannedDocument(receipts, object));

export const deleteReceipt = storage.object()
    .onDelete(async (object: ObjectMetadata) => await deleteMatchingEntry(receipts, object));

export const notifyUpload = https.onRequest(notifyUploadHandler);

export const receiptManagerRequest = https.onRequest(receiptManager);
