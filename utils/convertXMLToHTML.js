import { load } from 'cheerio';
import note from '../models/notes.js';
import { Types } from 'mongoose';

export const setHTMLByXML = async (uploadDate) => {
    try {
        const allNotes = await note.find({
            uploadDate: {
                $gte: new Date(uploadDate),
                $lte: new Date(uploadDate),
            }
        })

        console.log(allNotes.length)
        for(const littleNote of allNotes) {
            const $ = load(littleNote.htmlContent);       
            const hijosDelBody = $('body').children();
            const content = $(hijosDelBody[0]).children();
         
            // content.each((index, element) => {
            //     console.log(`Hijo ${index}:`, $(element).html());
            // });

            if (content.length === 0) {
                littleNote.newTitle = '';
                littleNote.newBody = '';
            }

            if (content.length === 1) {
                const childreFromChildren = $(content[0]).children();
                if (childreFromChildren.length === 1) {

                    const cTitle = $(childreFromChildren[0]).html().trim().split(' ')
                    const title = cTitle.length > 3 ? $(childreFromChildren[0]).html().trim().split(' ').splice(3).join(' ') : $(childreFromChildren[0]).html().trim();
                    const body = $(childreFromChildren[0]).html()
                    littleNote.newTitle = title;
                    littleNote.newBody = body;
                } else {
                    const title = $(childreFromChildren[0]).html().trim();
                    let body = '';
                    for (let i = 1; i < childreFromChildren.length; i++) body = body + $(childreFromChildren[i]).html().trim();

                    littleNote.newTitle = title;
                    littleNote.newBody = body;
                }
            }

            if (content.length > 1) {
                const title = $(content[0]).html().trim();
                let body = '';
                for (let i = 1; i < content.length; i++) body = body + $(content[i]).html().trim();

                littleNote.newTitle = title;
                littleNote.newBody = body;
            }
        }

        const operaciones = allNotes.map((archivo, index) => {
            return {
                updateOne: {
                    filter: { _id: new Types.ObjectId(archivo._id) },
                    update: { $set: {
                        newTitle: archivo.newTitle,
                        newBody: archivo.newBody
                    }, upsert: true }
                }
            };
        });

        if (allNotes.length > 0) await note.bulkWrite(operaciones);
        console.log('Done!')
    } catch (error) {
        console.log('Error ', error);
    }
}