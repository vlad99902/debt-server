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

router.delete('/:id', auth, async (req, res) => {
  try {
    const debt = await Debt.deleteOne({ _id: req.body._id });

    res.status(204).json({ message: 'Все заебись!' });
    console.log(res);
  } catch (e) {
    res.status(500).json({ message: 'Something wrong with delete debt' });
  }
});

module.exports = router;
