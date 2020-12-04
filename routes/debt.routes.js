const { Router, response, request } = require('express');
const config = require('config');
const Debt = require('../models/Debt');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/add', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');
    //TODO логика добавления в бд
    // const { _id, title, sum, completed, owe } = req.body;
    const debt = new Debt({
      ...req.body.dataToSend,
      owner: req.user.userId,
    });
    console.log(debt);
    console.log(req.body);

    await debt.save();
    res.status(201).json(debt);
  } catch (e) {
    res.status(500).json({ message: 'Something wrong with add new deb' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    //все дебтсы текущего пользователся
    const debts = await Debt.find({ owner: req.user.userId });
    res.json(debts);
  } catch (e) {
    res.status(500).json({ message: 'Something wrong with get all debts' });
  }
});

module.exports = router;
