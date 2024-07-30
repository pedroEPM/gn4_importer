import fs from 'fs';

import { add, findByID, findByXMLID, find } from '../queries/images.js';
import { readerXML } from '../utils/readXML.js'
import { whatIsThetype } from '../utils/imageTypes.js' 
const folder = process.env.FOLDER + '/images/images';

export const setNewImage = async() => {
    try {
        const allTypes = {};

        console.log('--- Uploading Images ---');
        const files = fs.readdirSync(folder).filter(element => element.trim().toLocaleLowerCase().includes('image_'));
        for(const file of files) {
            const { image: imageData } = await readerXML(folder + '/' + file);
            const body = {};

            body.XMLID = file.trim().toLowerCase().replace('.xml', '').replace('image_', '');
            if(imageData[0]?.title) body.title = imageData[0]?.title[0];
            if(imageData[0]?.summary) body.content = imageData[0]?.summary[0];
            if(imageData[0]?.authors) body.authors = imageData[0]?.authors[0];
            if(imageData[0]?.credit) body.credit = imageData[0]?.credit[0];

            const ctype = imageData[0].data[0]['$'].mime;
            if(ctype){
                const finalType = whatIsThetype(ctype.trim().toLowerCase())
                body.type = finalType;
            } else {
                body.type = '.jpg';
            }

            allTypes[ctype] = '';
            
            // if(ctype === 'image/vdn.adobe.photoshop' 
            //     || ctype === 'image/x-eps'
            //     || ctype === 'application/postscript'
            //     || ctype === 'image/bmp') console.log(ctype + ' ' + body.XMLID);
 
            await add(body);
            await fs.promises.rename(folder + '/' + file, folder + '/imagesReaded/' + file);
            // if(body.type === '.pdf') await fs.promises.copyFile(folder + '/' + body.XMLID + body.type, folder + '/imagePDF/' + body.XMLID + body.type);
            
        }

        // console.log(allTypes)
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

export const find_ = async() => {
    try {
        const img = await find();
        // const mmm = {};
        // for(const littleImg of img) mmm[littleImg.credit] = null
        

        // console.log(mmm)
        return img;
    } catch (error) {
        console.log(error)
        
    }
}
