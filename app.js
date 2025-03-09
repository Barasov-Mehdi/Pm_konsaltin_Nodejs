const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedback'); // Route file for feedback
const newsRoutes = require('./routes/news');         // Route file for news
const serviceRoutes = require('./routes/service');   // Route file for services
const deleteServiceRoutes = require('./routes/deleteService');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory (CSS, images, etc.)
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB bağlantısı başarılı')) // Connection success log
    .catch(err => console.error('MongoDB bağlantısı başarısız:', err)); // Connection error log

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route definitions
app.use('/feedback', feedbackRoutes); // Feedback routes
app.use('/news', newsRoutes);         // News routes
app.use('/services', serviceRoutes);   // Services routes
app.use('/deleteService', deleteServiceRoutes);
// Optional: Home page route
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor.`); // Server start log
});