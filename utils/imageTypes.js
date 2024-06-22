export const whatIsThetype = (type) => {
    const types = {
        'image/jpeg': '.jpg',
        'image/pdf': '.jpg',
        'image/png': '.png',
        'image/tiff': '.tif'
    }

    return types[type] ?? '.jpg';
}