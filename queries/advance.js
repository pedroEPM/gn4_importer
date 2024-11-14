import note from '../models/notes.js';
import pdf from '../models/pdfs.js';
import image from '../models/images.js';


export const getPDFs = async(year) => {
    try {
        return await pdf.find({
            publicationDate: {
                $gte: new Date(year + '-01-01'),
                $lte: new Date(year + '-12-31'),
            },
            notes: { $ne: null }
        }, '-title -edition -editDate');

    } catch (error) {
        console.log('Error ', error);        
    }
}

export const getNote = async(XMLID) => {
    try {
        
        return await note.findOne({
            XMLID: +XMLID
        }, '-title -content -htmlContent')
    } catch (error) {
        console.log('Error ', error);        
    }
}



export const getImage = async(XMLID) => {
    try {
        
        return await image.findOne({
            XMLID: +XMLID
        })
    } catch (error) {
        console.log('Error ', error);        
    }
}

