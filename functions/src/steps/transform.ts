import * as os from 'os';

const gs = require('gs');

export const transformPDFtoJPEG = (source: string, fileName): Promise<string> => {
    const destination: string = `${os.tmpdir()}/${fileName}.jpg`;

    return new Promise((resolve, reject) => {
        console.log(`Running gs`, {destination});

        gs().batch().nopause().q().device('jpeg')
            .executablePath('lambda-gs/bin/./gs')
            .output(destination)
            .input(source)
            .exec(err => {
                if (err) {
                    reject(err);
                }

                resolve(destination);
            });
    });
};
