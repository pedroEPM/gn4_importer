import mongoose from 'mongoose';

const Noteschema = new mongoose.Schema({
    title: {
        type: String,
    },
    XMLID: {
        type: Number,
        required: true,
        unique: true
    },
    content: {
        type: String,
    },
    authors: {
        type: String,
    },
    htmlContent: {
        type: String
    },
    credit: {
        type: String,
    },
    images: {
        type: [Number],
        default: []
    },
    newTitle: {
        type: String,
        default: null
    },
    newBody: {
        type: String,
        default: null
    },
    uploadDate: {
        type: Date,
    }
});

const Notes = mongoose.model('Note', Noteschema);

export default Notes;
