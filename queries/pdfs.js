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

        
        for(const littlePDF of allPDFs) {
            // data[littlePDF.publication] = littlePDF.publication;
            data[littlePDF.publication.toLowerCase() + '-' + littlePDF.section] = littlePDF.publication.toLowerCase() + ' - ' + littlePDF.section.toLowerCase();
        }

        console.log(data)
        return allPDFs;
    } catch (error) {
        console.log('Error getPDFS ', error);
    }
}


 
const notebooks_ = {
    'diario de yucatan-cuadernoa' : '637663de0b99890014be9d4e',
    'diario de yucatan-yucatán' : '637663de0b99890014be9d4e',
    'diario de yucatan-nacional-internacional' : '63767466375114001322b11a',
    'diario de yucatan-local': '63767468375114001322b127',
    'diario de yucatan-imagen': '63767467375114001322b11d',
    'diario de yucatan-deportes': '63767466375114001322b11b',
    'publimetro-publimetro': '6376747b375114001322b176'
}


const publications_ = {
    'diario de yucatan': '637663de0b99890014be9d4e',
    'publimetro': '637663df0b99890014be9d63',
    
}


// : {
//     notebook: '',
//     publication: '',
// }