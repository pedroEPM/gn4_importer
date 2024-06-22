import mongoose from 'mongoose';

const Imageschema = new mongoose.Schema({
    title: {
        type: String,
    },
    XMLID: {
        type: Number,
        required: true,
        unique: true
    },
    credit: {
        type: String,
    },
    content: {
        type: String,
    },
    authors: {
        type: String,
    },
});

const Image = mongoose.model('Image', Imageschema);

export default Image;
