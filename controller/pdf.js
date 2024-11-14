import fs from 'fs';

import { add, findByID, findByXMLID, getPDFS, getImagesByPDFs } from '../queries/pdfs.js';
import { readerXML } from '../utils/readXML.js'

const folder = process.env.FOLDER + '/archivo-in';
// const folder = process.env.FOLDER + '/pdfs';

export const setNewPDF = async( cUploadDate ) => {
    try {
        console.log('--- Uploading PDFs ---')
        const files = fs.readdirSync(folder).filter(element => element.trim().toLocaleLowerCase().includes('document_'));
        // console.log('PDFs found: ', files.length )
        // const oneFile = [files[0], files[1]]
        for(const file of files) {
            const { document: pdfData } = await readerXML(folder + '/' + file);
            const body = {};
            const images = [];
            const notes = [];

            body.XMLID = file.trim().toLowerCase().split('document_')[1].replace('.xml', '').replace('document_', '');
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
            body.uploadDate = cUploadDate;

            await add(body);
            await fs.promises.rename(folder + '/' + file, folder + '/exported/' + cUploadDate + '/xmls/' + file);
            // await fs.promises.rename(folder + '/' + file, folder + '/pdfsReaded/' + file);
        }

        console.log('- All pdfs are upadated -')
        
    } catch (error) {
        console.log('Error set new pdf ', error);
    }
}

export const getPDFS_ = async(year) => {
    try {
        return await getPDFS(year);
    } catch (error) {
        console.log(error)
    }
}

export const getPDFsByID = async(req, res) => {
    try {
        const { id } = req.params;
        const pdfFound = await findByID(id);
        return res.status(200).json({
            ok: true,
            msg: pdfFound,
        })
    } catch (error) {
        console.log('Error in get pdf by id ', error);
        return  res.status(500).json({
            ok: false,
            msg: 'Error',
            error
        })
    }
} 
// 

export const getImagesByPDFs_ = async(req, res) => {
    try {
        const { year } = req.params;
        const pdfs = await getImagesByPDFs(year);
        // const contenido = pdfs.join('\n');
        // console.log(`--- Saved ${year} file  ---`)
        // await fs.promises.writeFile(`./files/images-${year}.txt`, contenido);
        return res.status(200).json({
            ok: true,
            counter: pdfs?.length,
            msg: pdfs,
        })
    } catch (error) {
        console.log('Error in get images by PDFs controller ', error);
        return  res.status(500).json({
            ok: false,
            msg: 'Error',
            error
        })
    }
}