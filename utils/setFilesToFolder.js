import fs from 'fs'
import xml2js from 'xml2js'

const parser = new xml2js.Parser();
const folder = 'C:/Users/pedro.estrella/Downloads/Download/Download2'
export const setNewFolder = async () => {
    try {
        const regex = new RegExp('.pdf', 'gi');
        const regexGif = new RegExp('.gif', 'gi');
        const regexThumb = new RegExp('_thumb', 'gi');

        const onlyPDFsAndThumbs = {};
        (await fs.promises.readdir(folder)).forEach(element => {
            const newNameWithoutType = element.replace(regex, '').replace(regexThumb, '').replace(regexGif, '');
            if (regex.test(element) || regexThumb.test(element)) {
                // console.log(newNameWithoutType)
                if (!onlyPDFsAndThumbs[newNameWithoutType]) onlyPDFsAndThumbs[newNameWithoutType] = [];
                if (regex.test(element)) onlyPDFsAndThumbs[newNameWithoutType].push(element)
                if (regexThumb.test(element)) onlyPDFsAndThumbs[newNameWithoutType].push(element)
            }
        })

        // for (const littlePDF of onlyPDFs) {
        // const folderName = littlePDF.replace(regex, '');
        // const thumbnailRegexName = new RegExp(folderName + '_thumb', 'gi');
        // const newCustomFolder = folder + '/' + folderName;

        // await fs.promises.mkdir(newCustomFolder);
        // await fs.promises.rename(folder + '/' + littlePDF, newCustomFolder + '/' + littlePDF);
        // const isFounded = onlyThumbs.find(element => thumbnailRegexName.test(element))
        // if (isFounded) {
        //     await fs.promises.rename(folder + '/' + isFounded, newCustomFolder + '/' + isFounded);
        // }

        // if(await fs.promises.access(filePath))
        // }

    } catch (error) {
        console.log('Error ', error);
    }
}

let counter = 0;

export const readXML = async () => {
    try {
        const regex = new RegExp('.xml', 'gi');

        const files = (await fs.promises.readdir(folder)).filter(file => regex.test(file))
        const pdfs = [];
        console.log('\n\n\n\n')
        console.log('\n\n\n\n')
        for(const file of files) {
            const data = await fs.promises.readFile(folder + '/' + file);
            const result = await parser.parseStringPromise(data);
            // const isHadImage = result.root.document[0].images;
            // const isHadNote = result.root.document[0].story;

            if(result.root.document) {
                pdfs.push(file);
                await moveFiles(result.root)
            }

            
        }

        // console.log(pdfs.length)
        counter = counter + pdfs.length;
        counter = counter + pdfs.length;
        console.log(counter)

        // await fs.promises.writeFile('./data/pdfsDemo.txt', JSON.stringify(pdfs, null, 2));
        // const data = await fs.promises.readFile(folder + '/49755371.xml');

        // if is had images[0] and stories[0] is pdf
        // console.log(result.root.document[0].images[0].image.length)
        // console.log(result.root.document[0].stories[0].story.length)
        console.log('- Done -')
    } catch (error) {
        console.log('Error ' + error);
    }
}

const verifyExistFile = async (path, newPath, isFolder = false) => {
    if (!fs.existsSync(path) && isFolder) {
        fs.mkdirSync(path)
    }
    
    if(fs.existsSync(path) && !isFolder) {
        await fs.promises.rename(path, newPath);
    }
}

const whatIsThetype = (type) => {
    const types = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/tiff': '.tif'
    }

    return types[type] ?? '.jpg';
}

export const moveFiles = async(pdfJson) => {
    try {
        const xmlType = '.xml';
        const pdfType = '.pdf';
        // const data = await fs.promises.readFile(folder + '/49755366.xml');
        // const result = await parser.parseStringPromise(data);
        const newFolderName = pdfJson.document[0].title[0].replaceAll('/', '');
        const newPath = `${folder}/${newFolderName}`;
        // console.log(newFolderName)
        
        await verifyExistFile(newPath, null, true)
        await verifyExistFile(folder + '/' + newFolderName + '_Thumb.gif', newPath + '/' + newFolderName + '_Thumb.gif')
        // await verifyExistFile(folder + '/' + pdfJson.document[0]['$'].id + xmlType, folder + '/' + newFolderName + '/' + pdfJson.document[0]['$'].id + xmlType)
        if(fs.existsSync(folder + '/' + pdfJson.document[0]['$'].id + xmlType)) await fs.promises.copyFile(folder + '/' + pdfJson.document[0]['$'].id + xmlType, folder + '/' + newFolderName + '/' + pdfJson.document[0]['$'].id + xmlType);
        await verifyExistFile(folder + '/' + newFolderName + pdfType, folder + '/' + newFolderName + '/' + newFolderName + pdfType)
        
        // await verifyExistFile(folder + '/' +  , newPath + '_Thumb.gif')
        // console.log(folder + '/' + newFolderName + '_Thumb.gif')
        
        const allImages = pdfJson.document[0].images ? pdfJson.document[0]?.images[0].image : [];
        const allNotes = pdfJson.document[0]?.stories ? pdfJson.document[0]?.stories[0].story : [];

        counter = allImages.length + counter;
        counter = allImages.length + counter;
        counter = allNotes.length + counter;

        for(const images of allImages) {
            const xmlName =  '/' + images['$']['id'] + xmlType;
            const imageInfo = await fs.promises.readFile(folder + xmlName);
            const { root: imageJson } = await parser.parseStringPromise(imageInfo);
            const imageTitle = imageJson.image[0].title[0]
            const type = whatIsThetype(imageJson.image[0].data[0]['$'].mime);

            if(fs.existsSync(folder + '/' + imageTitle + type)) await fs.promises.copyFile(folder + '/' + imageTitle + type, newPath + '/' + imageTitle + type);
            await verifyExistFile(folder + xmlName, newPath + '/' + xmlName);   
        }

        for(const notes of allNotes) {
            const xmlName =  '/' + notes['$']['id'] + xmlType;
            await verifyExistFile(folder + xmlName, newPath + '/' + xmlName);

            // const noteInfo = await fs.promises.readFile(folder + '/' + notes['$']['id'] + xmlType);
            // const { root: noteJson} = await parser.parseStringPromise(noteInfo);
            // const noteTitle = noteJson.story[0];
            // const imageTitle = noteJson.image[0].title[0];
        }

        
        // console.log('- Done -');
    } catch (error) {
        console.log('Error ' + error)
    }
}