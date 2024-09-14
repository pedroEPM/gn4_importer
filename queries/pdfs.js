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
        }, '-content');


        // for (const littlePDF of allPDFs) {
        //     // const n = new Date(littlePDF.publicationDate).toISOString().substring(0, 10);
        //     // data[n] = null;

        //     // data[littlePDF.publication] = littlePDF.publication;
        //     data[littlePDF.publication.toLowerCase() + '-' + littlePDF.section.toLowerCase()] = littlePDF.publication.toLowerCase() + ' - ' + littlePDF.section.toLowerCase();
        // }
        // }

        console.log('--- Returning pdfs! ---')
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

export const aaa = async () => {
    try {
        console.log('mmmmmm')
        const aaaaaaaaa = await pdf.aggregate([
            {
                $match: {
                    page: 0 
                }
            },
            {
                $sort: {
                    XMLID: 1
                }
            },
            {
                $limit: 500000
            },
            {
                $group: {
                    _id: "$section",      // Agrupa por la propiedad mime
                    count: { $sum: 1 } // Cuenta cuántos hay en cada grupo
                }
            }

        ])

        console.log(aaaaaaaaa)
    } catch (error) {

    }
}



export const eeeeeeeeeee = async () => {
    try {
        console.log('mmmmmm')
        const aaaaaaaaa = await pdf.find({
            section: { $regex: 'A darle', $options: 'i' },
            page: 0
        }, '-content')

        const dataaaaaa = {}
        const dataaaaaa2 = {}
        const editDate = new Date().toISOString().substring(0,10);
        
        // console.log(aaaaaaaaa.length)
        let counter = 0;
        for(const littlePDF of aaaaaaaaa) {

            // counter++;
            // console.log(counter)
            // const titleSplited = littlePDF.title?.toLowerCase()?.trim()?.split('a darle')[2]?.split(' ')[0]//.split('-')[0]
            const titleSplited = littlePDF.title?.trim().split(' ')[0]
            if(Number(+titleSplited)) {
                dataaaaaa[titleSplited] = +titleSplited;
            } else {
                dataaaaaa2[titleSplited] = titleSplited
                // dataaaaaa2[titleSplited] = littlePDF.title?.trim()
            }

            // console.log('-----------')
            if(Number(+titleSplited)){
                // littlePDF.page = +titleSplited;
                // littlePDF.editDate = editDate;
                // await littlePDF.save() 
            }
            // console.log('6zxxxxxxxxx-----------')
        
        }

        console.log(dataaaaaa)
        console.log(dataaaaaa2)
        // console.log(aaaaaaaaa.length)
    } catch (error) {
        console.log(error)
    }
}






setTimeout(() => {
// const ella = 12120 + 40 + 6809 + 13504 + 480 + 3435 + 87 + 3678 + 73 + 81 + 1822 + 24120 + 3913 + 24820 + 433 + 7266 + 2 + 2827 + 280 + 2743 + 5 + 2303 + 20570 + 39 + 104 + 20498 + 8213 + 5540
// console.log(ella)

    // aaa()
    // eeeeeeeeeee()
}, 3000);