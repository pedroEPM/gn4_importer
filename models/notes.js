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
    }
});

const Notes = mongoose.model('Note', Noteschema);

export default Notes;
