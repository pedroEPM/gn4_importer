import pdf from '../models/pdfs.js';

export const add = async(body) => {
    try {
        const newPDF = new pdf({
            title: body.title,
            XMLID: body.XMLID,
            page: body.page,
            section: body.section,
            edition: body.edition,
            content: body.content,
            authors: body.authors,
            publicationDate: body.publicationDate,
            publication: body.publication,
            images: body.images,
            notes: body.notes,
        });

        await newPDF.save()
    } catch (error) {
        console.log('Error add new pdf ', error);
    }
}

export const findByXMLID = async (XMLID) => {
    try {
        return await pdf.findOne({XMLID});
    } catch (error) {
        console.log('Error find by XMLID ', error);
    }
}

export const findByID = async (ID) => {
    try {
        return await pdf.findById(ID);
    } catch (error) {
        console.log('Error find by ID ', error);
    }
}

export const getPDFS = async() => {
    try {
        const data = {};
        const allPDFs = await pdf.find({});

        // for(const littlePDF of allPDFs) {
            // data[littlePDF.publication] = littlePDF.publication;
            // data[littlePDF.publication + '-' + littlePDF.section] = littlePDF.publication + '-' + littlePDF.section;
        // }

        return allPDFs;
    } catch (error) {
        console.log('Error getPDFS ', error);
    }
}