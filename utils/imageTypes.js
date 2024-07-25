export const whatIsThetype = (type) => {
    const types = {
        'image/jpeg': '.jpg',
        'image/pdf': '.pdf',
        'image/png': '.png',
        'image/tiff': '.tif'
    }

    return types[type] ?? '.jpg';
}