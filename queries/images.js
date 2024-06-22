import image from '../models/images.js';

export const add = async(body) => {
    try {
        const newImage = new image({
            title: body.title,
            XMLID: body.XMLID,
            content: body.content,
            authors: body.authors,
            credit: body.credit,
            type: body.type,
        });

        await newImage.save()
    } catch (error) {
        console.log('Error add new Image ', error);
    }
}

export const findByXMLID = async (XMLID) => {
    try {
        return await image.findOne({XMLID});
    } catch (error) {
        console.log('Error find by XMLID ', error);
    }
}

export const findByID = async (ID) => {
    try {
        return await image.findById(ID);
    } catch (error) {
        console.log('Error find by ID ', error);
    }
}