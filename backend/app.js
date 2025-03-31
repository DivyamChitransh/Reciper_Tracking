const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const authrotes = require('./routes/authentication.js');
const reciperoutes = require('./routes/reciperoutes.js');

const logger = require('./middlewares/logger.js');

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(logger);
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Recipe_TrackerDB').then(() => console.log('Database Connected!')).
catch(err=> console.log('Failed to connect!',err))

app.use('/',authrotes);
app.use('/',reciperoutes);

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
});