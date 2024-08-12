const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Adjust the path if needed

// Route to create a new expense
router.post('/', async (req, res) => {
    const { description, amount, date } = req.body;
    try {
        const newExpense = new Expense({ description, amount, date });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create expense' });
    }
});

// Route to get all expenses
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch expenses' });
    }
});


// Delete an expense
router.delete('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) return res.status(404).send('Expense not found');
        res.status(200).send('Expense deleted');
    } catch (error) {
        res.status(500).send('Error deleting expense');
    }
});


module.exports = router;
