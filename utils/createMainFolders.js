import fs from 'fs';

export const createMainFolders = (folder, cUpdateDate) => {
    try {
        const rootDayFolder = folder + '/exportedData/' + cUpdateDate; 
        const foldersPerFileType = ['xmls', 'notes', 'pdfs', 'images']
        if (!fs.existsSync(rootDayFolder)) {
            fs.mkdirSync(rootDayFolder)
        }

        for(const folderPerFileType of foldersPerFileType) { 
            const file_ = rootDayFolder + '/' + folderPerFileType;  
            if (!fs.existsSync(file_)) {
                fs.mkdirSync(file_)
            }
        }
    } catch (error) {
        console.log('Error ', error);
    }
} 