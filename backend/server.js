const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
const PORT = 5000;
// const MONGO_URI = 'mongodb+srv://usamashahe:S@mshah111@expensemanager.9u3xv.mongodb.net/?retryWrites=true&w=majority&appName=ExpenseManager';
const MONGO_URI = 'mongodb+srv://UsamaShah:shah12345@expensemanager.9u3xv.mongodb.net/?retryWrites=true&w=majority&appName=ExpenseManager';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/expenses', expenseRoutes);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
