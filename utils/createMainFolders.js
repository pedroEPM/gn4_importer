import fs from 'fs';

export const createMainFolders = (folder, cUpdateDate) => {
    try {
        const rootDayFolder = folder + '/exported/' + cUpdateDate; 
        const foldersPerFileType = ['xmls', 'allFiles', 'x-thumbs']
        
        if (!fs.existsSync(folder + '/exported/')) fs.mkdirSync(folder + '/exported/')

        if (!fs.existsSync(rootDayFolder)) fs.mkdirSync(rootDayFolder)

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