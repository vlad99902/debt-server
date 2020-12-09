const { Router, response, request } = require('express');
const config = require('config');
const Debt = require('../models/Debt');
const auth = require('../middleware/auth.middleware');
const ObjectID = require('mongodb').ObjectID;
const router = Router();

router.post('/add', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');

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
    const result = await Debt.deleteOne({
      _id: ObjectID(req.body._id),
    });

    if (result.deletedCount !== 1) {
      res.status(500).json({ message: `Debt ${req.body._id} not found` });
    }

    res.json({ message: `Debt ${req.body._id} was successfully deleted` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const debt = await Debt.update(
      { _id: req.body.item._id },
      { $set: { ...req.body.item } },
    );
    res
      .status(200)
      .json({ message: `Debt ${req.body.item._id} was successfully updated` });
  } catch (e) {
    res.status(500).json({ message: 'Something wrong with update debt' });
  }
});

module.exports = router;
