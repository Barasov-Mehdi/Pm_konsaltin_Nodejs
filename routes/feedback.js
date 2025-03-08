const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('feedback'); // feedback.ejs dosyasını render et
});

router.post('/', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.redirect('/feedback');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/messages', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.render('feedMessage', { feedbacks });
    } catch (error) {
        res.status(500).send({ error: 'Geri bildirimler getirilemedi!', details: error.message });
    }
});

module.exports = router;

// Tüm geri bildirimleri alma
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.render('feedback', { feedbacks });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;