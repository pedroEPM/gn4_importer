import express from 'express';
const router = express.Router();

router.get('/importerFiles', async (req, res = express.response) => {
    try {
        return res.status(200).json({
            ok: true,
            msg: 'This is okey in importerFiles'
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error',
            error,
        })
    }
});

export default router;