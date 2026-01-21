const express = require('express');
const router = express.Router();
const { 
    createTask, 
    getTasks, 
    updateTask, 
    deleteTask // Intha function-ah controller-la irunthu import pannalaam
} = require('../controllers/taskController');
const auth = require('../middleware/auth');

// 1. Task Create panna
router.post('/', auth, createTask);

// 2. Ella tasks-aiyum paarkka
router.get('/', auth, getTasks);

// 3. Task Title or Status-ah update panna (Edit & Status change)
router.put('/:id', auth, updateTask);

// 4. Task-ah delete panna (Ithai ippo add panniyachu)
router.delete('/:id', auth, deleteTask);

module.exports = router;