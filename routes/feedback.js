const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

// Geri bildirimleri listeleme
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.render('feedback', { feedbacks });
    } catch (error) {
        res.status(500).send({ error: 'Geri bildirimler getirilemedi!', details: error.message });
    }
});

// Geri bildirim ekleme
// API üzerinden geri bildirim eklxeme
router.post('/api/feedback', async (req, res) => {
    try {
        console.log("API'den gelen veri:", req.body);
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json({ message: "Geri bildirim başarıyla alındı!" });
    } catch (error) {
        console.error("API Hata:", error);
        res.status(400).json({ error: error.message });
    }
});



// Silme işlemi için route (messages sayfasına yönlendirme)
router.post('/delete/:id', async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.redirect('/feedback'); // Geri bildirimler sayfasına yönlendir
    } catch (error) {
        res.status(500).send({ error: 'Geri bildirim silinemedi!', details: error.message });
    }
});

// Tüm geri bildirimleri alma (messages sayfası)
router.get('/messages', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.render('feedMessage', { feedbacks });
    } catch (error) {
        res.status(500).send({ error: 'Geri bildirimler getirilemedi!', details: error.message });
    }
});

// 2 dakikadan daha eski geri bildirimleri silme işlemi
const clearOldFeedbacks = async () => {
    const cutoffDate = new Date(Date.now() - 260000 * 60 * 1000); // 2 dakika önceki tarihi al
    await Feedback.deleteMany({ createdAt: { $lt: cutoffDate } }); // 2 dakikadan eski olanları sil
};

// Belirli aralıklarla eski geri bildirimleri temizleyen fonksiyonu başlat
setInterval(clearOldFeedbacks, 60 * 1000); // Her 1 dakikada bir çalıştır

module.exports = router;