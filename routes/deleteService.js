const express = require('express');
const Service = require('../models/service');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Silme sayfasını açma
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.render('deleteService', { services });
    } catch (error) {
        res.status(500).send({ error: 'Hizmetler yüklenirken hata oluştu!', details: error.message });
    }
});

// Hizmeti silme
router.post('/delete/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            // Cloudinary'den resmi sil
            const imagePublicId = service.image.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`uploads/${imagePublicId}`);
        }

        await Service.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Hizmet başarıyla silindi.' });
    } catch (error) {
        res.status(500).send({ error: 'Hizmet silinemedi!', details: error.message });
    }
});

module.exports = router;
