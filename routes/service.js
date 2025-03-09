const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary'); // Cloudinary konfigürasyonu
const Service = require('../models/service');

const router = express.Router();

// Cloudinary Storage Konfigürasyonu
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowedFormats: ['jpg', 'png', 'jpeg'],
        transformation: [{ quality: "auto:low" }] // Otomatik düşük kalite
    }
});

const upload = multer({ storage: storage });

// Tüm hizmetleri listeleme (sadece /services URL'si üzerinden)
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

// Yeni hizmet ekleme
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file.path; // Cloudinary'ye yüklenen resmin URL'si
        const service = new Service({
            category: req.body.category,
            image: imageUrl,
            name: req.body.name,
            description: req.body.description
        });
        await service.save();
        res.redirect('/services');
    } catch (error) {
        res.status(400).send({ error: 'Hizmet eklenemedi!', details: error.message });
    }
});

// Hizmet silme
router.post('/delete/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            // Cloudinary'den resmi sil
            const imagePublicId = service.image.split('/').pop().split('.')[0]; // Public ID'yi al
            await cloudinary.uploader.destroy(`uploads/${imagePublicId}`);
        }
        await Service.findByIdAndDelete(req.params.id);
        res.redirect('/services');
    } catch (error) {
        res.status(500).send({ error: 'Hizmet silinemedi!', details: error.message });
    }
});

module.exports = router;