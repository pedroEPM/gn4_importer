export const whatIsThetype = (type) => {
    const types = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/tiff': '.tif',
        'image/gif': '.gif',
        'image/bmp': '.bmp',
        'image/pdf': '.pdf',
        'image/x-eps': '.eps',
        'application/postscript': '.ps',
        'image/x-eps': '.eps',
        'image/vdn.adobe.photoshop': '.psd'
    }

    return types[type] ?? '.jpg';
}