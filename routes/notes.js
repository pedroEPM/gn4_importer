import express from 'express';
const router = express.Router();

import { getNotes_, findById, findByXMLId } from '../controller/note.js'

router.get('/', async (req, res = express.response) => {
    try {

        if(!req.body.limit) req.body.limit = 500; 
        if(!req.body.page) req.body.page = 1; 
        const notes = await getNotes_(req.body);
        res.status(200).json({
            ok: true,
            msg: notes,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

router.get('/:id', async (req, res = express.response) => {
    try {
        const { id } = req.params;
        const note = await findById(id);
        res.status(200).json({
            ok: true,
            msg: note,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

router.get('/XML/:id', async (req, res = express.response) => {
    try {
        const { id } = req.params;
        const note = await findByXMLId(+id);
        res.status(200).json({
            ok: true,
            msg: note,
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});



export default router;