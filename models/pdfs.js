import mongoose from 'mongoose';

const PDFSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    XMLID: {
        type: Number,
        required: true,
        unique: true
    },
    page: {
        type: Number,
        default: 0,
    },
    section: {
        type: String,
    },
    content: {
        type: String,
    },
    edition: {
        type: String
    },
    authors: {
        type: String,
    },
    publicationDate: {
        type: Date
    },
    editDate: {
        type: Date,
    },
    publication: {
        type: String
    },
    images: {
        type: [Number],
        default: []
    },
    notes: {
        type: [Number],
        default: []
    }
});

const User = mongoose.model('PDF', PDFSchema);

export default User;
