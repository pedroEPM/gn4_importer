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
            mime: body.mime,
            uploadDate: body.uploadDate,
        });

        await newImage.save()
    } catch (error) {
        console.log('Error add new Image ', error);
    }
}

export const find = async (XMLID) => {
    try {
        // return await image.find({
        //     $or: [
        //         { type: ".pdf" },
        //         { type: ".eps" },
        //         { type: ".ps" },
        //         { type: ".eps" },
        //         { type: ".psd" },
        //     ]
        // });

        return await image.aggregate([
            {
              $group: {
                _id: "$type",      // Agrupa por la propiedad mime
                count: { $sum: 1 } // Cuenta cuántos hay en cada grupo
              }
            }
          ]);
    } catch (error) {
        console.log('Error find by XMLID ', error);
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
