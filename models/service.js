const mongoose = require('mongoose');
const express = require('express');

const serviceSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Vergi xidməti', 'Mühasibat xidməti', 'Mətbəə', 'Poliqrafiya'],
    required: true
  },
  image: {
    type: String, 
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  info: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

module.exports = mongoose.model('Service', serviceSchema);
