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
            const n = new Date(littlePDF.publicationDate).toISOString().substring(0,10);
            data[n] = null;

            // data[littlePDF.publication] = littlePDF.publication;
            // data[littlePDF.publication.toLowerCase() + '-' + littlePDF.section.toLowerCase()] = littlePDF.publication.toLowerCase() + ' - ' + littlePDF.section.toLowerCase();
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
    'publimetro-publimetro': '6376747b375114001322b176',
    'la i-avisos económicos': '667dab370dd3bd00264f6eb6',
    'la i-deportes': '667dab9e0dd3bd00264f6eb7',
    'la i-famosos': '667dabdc0dd3bd00264f6eb8',
    'la i-familia': '667dabf70dd3bd00264f6eb9',
    'la i-misterios': '667dac330dd3bd00264f6eba',
    'la i-nacional': '667dac4f0dd3bd00264f6ebb',
    'la i-comunidad': '667dac730dd3bd00264f6ebc',
    'la i-temática': '667daca20dd3bd00264f6ebd',
    'la i-noticias': '667dacb90dd3bd00264f6ebe',
    'la i-lai': '63767477375114001322b13a',
    'al chile-chile': '6376747b375114001322b166',
    'al chile-avisos económicos': '667dad750dd3bd00264f6ebf',
    'al chile-pasión': '667dafe90dd3bd00264f6ec0',
    'al chile-ardiente': '667db0040dd3bd00264f6ec1',
    'al chile-misterios': '667db02c0dd3bd00264f6ec2',
    'al chile-grilla': '667db1410dd3bd00264f6ec3',
    'al chile-alarma': '667db1770dd3bd00264f6ec4',
}
 


// : {
//     notebook: '',
//     publication: '',
// }