import fs from 'fs';

import { add, findByID, findByXMLID } from '../queries/images.js';
import { readerXML } from '../utils/readXML.js'

const folder = process.env.FOLDER;

export const setNewImage = async() => {
    try {

        const files = fs.readdirSync(folder).filter(element => element.trim().toLocaleLowerCase().includes('image_'));
        console.log(files.length)
        for(const file of files) {
            const { image: imageData } = await readerXML(folder + '/' + file);
            const body = {};

            body.XMLID = file.trim().toLowerCase().replace('.xml', '').replace('image_', '');
            if(imageData[0]?.title) body.title = imageData[0]?.title[0];
            if(imageData[0]?.summary) body.content = imageData[0]?.summary[0];
            if(imageData[0]?.authors) body.authors = imageData[0]?.authors[0];
            if(imageData[0]?.credit) body.credit = imageData[0]?.credit[0];

            await add(body);
            await fs.promises.rename(folder + '/' + file, folder + '/imagesReaded/' + file);

        }

        console.log('- All images are upadated -')
        
    } catch (error) {
        console.log('Error set new image ', error);
    }
}

export const findByXMLId = async(id) => {
    try {
        return await findByXMLID(id);
    } catch (error) {
        console.log(error)
        
    }
}