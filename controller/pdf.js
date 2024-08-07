import fs from 'fs';

import { add, findByID, findByXMLID, getPDFS } from '../queries/pdfs.js';
import { readerXML } from '../utils/readXML.js'

const folder = process.env.FOLDER + '/pdfs';
// const folder = process.env.FOLDER + '/xml/pdfs';

export const setNewPDF = async() => {
    try {

        const files = fs.readdirSync(folder).filter(element => element.trim().toLocaleLowerCase().includes('document_'));
        // const oneFile = [files[0], files[1]]
        for(const file of files) {
            const { document: pdfData } = await readerXML(folder + '/' + file);
            const body = {};
            const images = [];
            const notes = [];

            body.XMLID = file.trim().toLowerCase().replace('.xml', '').replace('document_', '');
            if(pdfData[0]?.title) body.title = pdfData[0]?.title[0];
            if(pdfData[0]?.pagenum) body.page = +pdfData[0]?.pagenum[0] ?? 0;
            if(pdfData[0]?.section) body.section = pdfData[0]?.section[0];
            if(pdfData[0]?.edition) body.edition = pdfData[0]?.edition[0];
            if(pdfData[0]?.summary) body.content = pdfData[0]?.summary[0];
            if(pdfData[0]?.authors) body.authors = pdfData[0]?.authors[0];
            if(pdfData[0]?.publicationDate) body.publicationDate = pdfData[0]?.publicationDate[0].toLowerCase().replace('z', '');
            if(pdfData[0]?.publication) body.publication = pdfData[0]?.publication[0];
            if(pdfData[0]?.images) {
                pdfData[0]?.images[0].image.forEach(element => {
                    images.push(+element['$'].id)
                });
            }

            if(pdfData[0]?.stories) {
                pdfData[0]?.stories[0].story.forEach(element => {
                    notes.push(+element['$'].id)
                });
            }

            body.images = images;
            body.notes = notes;

            // console.log(body)

            await add(body);
            await fs.promises.rename(folder + '/' + file, folder + '/pdfsReaded/' + file);
        }

        console.log('- All pdfs are upadated -')
        
    } catch (error) {
        console.log('Error set new pdf ', error);
    }
}

export const getPDFS_ = async() => {
    try {
        return await getPDFS();
    } catch (error) {
        console.log(error)
    }
}
