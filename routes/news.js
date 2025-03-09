const express = require('express');
const News = require('../models/news');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const news = await News.find();
        res.render('news', { news });
    } catch (error) {
        res.status(500).send({ error: 'Haberler getirilirken hata oluştu!', details: error.message });
    }
});

router.get('/deleteNews', async (req, res) => {
    const { title, author } = req.query;

    let filter = {};
    if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search for title
    if (author) filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search for author

    try {
        const news = await News.find(filter);
        res.render('deleteNews', { news, title, author });
    } catch (error) {
        res.status(500).send({ error: 'Haberler getirilirken hata oluştu!', details: error.message });
    }
});



router.post('/', async (req, res) => {
    try {
        const news = new News(req.body);
        await news.save();
        res.redirect('/news');
    } catch (error) {
        res.status(400).send({ error: 'Haber eklenemedi!', details: error.message });
    }
});

router.post('/delete/:id', async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.redirect('/news');
    } catch (error) {
        res.status(500).send({ error: 'Haber silinemedi!', details: error.message });
    }
});

module.exports = router;
