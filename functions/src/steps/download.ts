import fetch, { Response } from 'node-fetch';
import * as fs from 'fs';

export const download = (uri: string, fileName: string): Promise<string> => {
    const localPath = `/tmp/${fileName}`;

    return fetch(uri)
        .then((res: Response) => {
            return new Promise<string>((resolve, reject) => {
                const fp = fs.createWriteStream(localPath);

                res.body.pipe(fp);
                res.body.on('error', reject);
                fp.on('finish', () => resolve(localPath));
                fp.on('error', reject);
            });
        })
};
