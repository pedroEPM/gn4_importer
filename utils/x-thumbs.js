import fs from 'fs';
const folder = process.env.FOLDER + '/archivo-in';

export const moveThumbs = async( cUploadDate ) => {
    try {
        console.log('--- Uploading thumbnails ---')
        const files = fs.readdirSync(folder).filter(element => element.trim().toLocaleLowerCase().includes('_thumb'));
        for(const file of files) await fs.promises.rename(folder + '/' + file, folder + '/exported/' + cUploadDate + '/x-thumbs/' + file);

        console.log('- All thumbs are moved -')
        
    } catch (error) {
        console.log('Error set new pdf ', error);
    }
}