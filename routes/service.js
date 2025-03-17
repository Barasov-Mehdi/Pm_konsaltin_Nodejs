const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Cloudinary konfigürasyonu
const Service = require('../models/service');

const router = express.Router();

// Tüm hizmetleri listeleme
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.render('services', { services });
    } catch (error) {
        res.status(500).send({ error: 'Hizmetler getirilirken hata oluştu!', details: error.message });
    }
});

// Tüm hizmetleri JSON formatında almak için GET metodu
router.get('/getAllServices', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services); // JSON formatında geri döner
    } catch (error) {
        res.status(500).send({ error: 'Hizmetler getirilirken hata oluştu!', details: error.message });
    }
});

// Tek hizmet getirme
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send({ error: 'Hizmet bulunamadı!' });
        }
        res.json(service); // JSON olarak döner
    } catch (error) {
        res.status(500).send({ error: 'Hizmet detayları alınırken hata oluştu!', details: error.message });
    }
});

// Yeni hizmet ekleme
router.post('/', async (req, res) => {
    try {
        const { category, description } = req.body; // Formdan gelen veriler

        // Gelen verileri kontrol edin
        console.log('Formdan gelen veriler:', req.body);

        // Validasyon kontrolü
        if (!category || !description) {
            return res.status(400).send({ error: 'Tüm alanların doldurulması gereklidir.' });
        }

        const service = new Service({
            category,
            description
        });

        // Servisi kaydet
        await service.save();
        res.redirect('/services');
    } catch (error) {
        console.error('Hata:', error); // Hata bilgilerini konsola yazdır
        res.status(400).send({ error: 'Hizmet eklenemedi!', details: error.message });
    }
});

// Hizmet silme
router.post('/delete/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            // Cloudinary'den resmi silme kodunu kaldırdım
        }
        await Service.findByIdAndDelete(req.params.id);
        res.redirect('/services');
    } catch (error) {
        res.status(500).send({ error: 'Hizmet silinemedi!', details: error.message });
    }
});

module.exports = router;