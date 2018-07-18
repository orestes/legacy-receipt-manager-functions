curl -X POST \
-H 'Content-Type: application/json' \
-d '{ \
  "mimeType": "application/pdf", \
  "originalFilename": "Scanned_20180708-1527.pdf", \
  "id": "12vhdeUZsLrm7re_Kxa_dfaouVcxwbS3c", \
  "webContentLink": "https://drive.google.com/a/orestes.io/uc?id=12vhdeUZsLrm7re_Kxa_dfaouVcxwbS3c&export=download" \
}' \
https://us-central1-orestes-lab-198500.cloudfunctions.net/notifyUpload
