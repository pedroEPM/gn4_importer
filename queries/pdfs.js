import pdf from '../models/pdfs.js';

import { findByXMLID as findByXMLImgID } from '../queries/images.js'

export const add = async (body) => {
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
        return await pdf.findOne({ XMLID });
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

export const getPDFS = async (littleYear) => {
    try {
        const data = {};
        // const years = [
        //     2015,
        //     2016,
        //     2017,
        //     2018,
        //     2019,
        //     2020,
        //     2021,
        //     2022,
        //     2023,
        //     2024,
        // ]
        // for (const littleYear of years) {
            console.log(`--- ${littleYear} ---`)
            const allPDFs = await pdf.find({
                publicationDate: {
                    $gte: new Date(littleYear + '-01-01'),
                    $lte: new Date(littleYear + '-12-31'),
                },
            });


            // for (const littlePDF of allPDFs) {
            //     // const n = new Date(littlePDF.publicationDate).toISOString().substring(0, 10);
            //     // data[n] = null;

            //     // data[littlePDF.publication] = littlePDF.publication;
            //     data[littlePDF.publication.toLowerCase() + '-' + littlePDF.section.toLowerCase()] = littlePDF.publication.toLowerCase() + ' - ' + littlePDF.section.toLowerCase();
            // }
        // }

        
        console.log(data.length)
        console.log('--- Done! ---')
        return allPDFs;
    } catch (error) {
        console.log('Error getPDFS ', error);
    }
}

// setTimeout(async() => {
//     console.log(await getPDFS())
// }, 3000);

export const getImagesByPDFs = async (year) => {
    try {
        const pdfs_ = await pdf.aggregate([
            {
                $match: {
                    publicationDate: {
                        $gte: new Date(year + '-01-01'),
                        $lte: new Date(year + '-12-31'),
                    },
                    images: { $ne: null }
                }
            },
            {
                $project: {
                    publicationDate: 1,
                    XMLID: 1,
                    images: 1
                },
            },
        ]);

        const finalImages = [];
        for (const littlePDF of pdfs_) {
            const splitedDate = new Date(littlePDF.publicationDate).toISOString().split('-');
            for (const littleImg of littlePDF.images) {
                finalImages.push(`/${splitedDate[0]}-${splitedDate[1]}/${littleImg}`)
            }
        }

        return finalImages;
    } catch (error) {
        console.log('Error by get images by pdfs ', error);
    }
}