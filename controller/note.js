import fs from 'fs';

import { add, findByID, findByXMLID, getNotes } from '../queries/notes.js';
import { readerXML, parseXML } from '../utils/readXML.js'
const folder = process.env.FOLDER;

export const setNewNote = async() => {
    try {

        const files = fs.readdirSync(folder).filter(element => element.trim().toLocaleLowerCase().includes('story_'));
        
        
        for(const file of files) {
            const { story: noteData } = await readerXML(folder + '/' + file);
            const bodyContent = await parseXML(folder + '/' + file, 'xmlText')
            const body = {};
            const images = [];


            body.XMLID = file.trim().toLowerCase().replace('.xml', '').replace('story_', '');
            if(noteData[0]?.title) body.title = noteData[0]?.title[0];
            if(noteData[0]?.summary) body.content = noteData[0]?.summary[0];
            if(noteData[0]?.authors) body.authors = noteData[0]?.authors[0];
            if(noteData[0]?.credit) body.credit = noteData[0]?.credit[0];
            body.htmlContent = bodyContent;
            if(noteData[0]?.objs) {
                noteData[0]?.objs[0]?.image?.forEach(element => {
                    images.push(+element['$'].id)
                });
            }
            body.images = images;
          

            // console.log(body)
            await add(body);
            await fs.promises.rename(folder + '/' + file, folder + '/notesReaded/' + file);
        }

        console.log('- All notes are upadated -')
        
    } catch (error) {
        console.log('Error set new note ', error);
    }
}

export const getNotes_ = async( cBody ) => {
    try {
        const cSkip = Math.abs(1 - cBody.page) * +cBody.limit;
        const body = [
            { $project: {
                XMLID: 1,
                _id: 1,
            } },
            { $sort: {
                XMLID: 1
            } },
            { $skip: cSkip },
            { $limit: +cBody.limit }
        ]

        return await getNotes(body);
        
    } catch (error) {
        console.log(error)
    }
}

export const findById = async(id) => {
    try {
        return await findByID(id);
    } catch (error) {
        console.log(error)
        
    }
}

export const findByXMLId = async(id) => {
    try {
        return await findByXMLID(id);
    } catch (error) {
        console.log(error)
        
    }
}