import fs from 'fs'
import xml2js from 'xml2js'

const parser = new xml2js.Parser();
const folder = process.env.FOLDER;

export const readXML = async () => {
    try {
        const files = fs.readdirSync(folder);
        const filesType = {}
        for(const file of files) {
            const customName = file.toLocaleLowerCase().trim();
            // if(customName.includes('.xml')){

            //     const data = await fs.promises.readFile(folder + '/' + file);
            //     const result = await parser.parseStringPromise(data);
            
            //     if(result.root.document) await fs.promises.rename(folder + '/' + file, folder + '/xml/pdfs/' + file);
            //     if(result.root.story) await fs.promises.rename(folder + '/' + file, folder + '/xml/notes/' + file);            
            //     if(result.root.image) await fs.promises.rename(folder + '/' + file, folder + '/xml/images/' + file);
            // }

            if(customName.includes('_thumb')) await fs.promises.rename(folder + '/' + file, folder + '/thumbnails/' + file);
            // if(customName.includes('.pdf')) await fs.promises.rename(folder + '/' + file, folder + '/pdfs/' + file);
            // if(customName.includes('.jpg')
            //     || customName.includes('.png')
            //     || customName.includes('.tif') ) await fs.promises.rename(folder + '/' + file, folder + '/images/' + file);
        }
        // console.log(filesType)
        console.log('- Done -')
    } catch (error) {
        console.log('Error ' + error);
    }
}