const express = require('express');
const Service = require('../models/service');

const router = express.Router();

// Tüm hizmetleri listeleme sayfası
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.render('services', { services });
    } catch (error) {
        res.status(500).send({ error: 'Hizmetler getirilirken hata oluştu!', details: error.message });
    }
});

// Yeni hizmet ekleme
router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.redirect('/services');
    } catch (error) {
        res.status(400).send({ error: 'Hizmet eklenemedi!', details: error.message });
    }
});

// Hizmet silme
router.post('/delete/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.redirect('/services');
    } catch (error) {
        res.status(500).send({ error: 'Hizmet silinemedi!', details: error.message });
    }
});

module.exports = router;
