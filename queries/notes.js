import note from '../models/notes.js';

export const add = async(body) => {
    try {
        const newNote = new note({
            title: body.title,
            XMLID: body.XMLID,
            content: body.content,
            authors: body.authors,
            htmlContent: body.htmlContent,
            credit: body.credit
        });

        await newNote.save()
    } catch (error) {
        console.log('Error add new note ', error);
    }
}

export const findByXMLID = async (XMLID) => {
    try {
        return await note.findOne({XMLID});
    } catch (error) {
        console.log('Error find by XMLID ', error);
    }
}

export const findByID = async (ID) => {
    try {
        return await note.findById(ID);
    } catch (error) {
        console.log('Error find by ID ', error);
    }
}

export const getNotes = async(params) => {
    try {
        return await note.aggregate(params).allowDiskUse(true);
    } catch (error) {
        console.log('Error getPDFs', error);        
    }
}