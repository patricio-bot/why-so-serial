var express = require('express');
var router = express.Router();

const Killer = require('../models/killer');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/killers/alphabet/:letter', async (req, res, next) => {
  let letter = req.params.letter;
  try {
    let killers = await Killer.find();
    const killersAlphabetical = [];
    killers.map(killer => {
      //console.log('Our killers: ', killer.lastName)
      if (killer.lastName) {
        if (killer.lastName.startsWith(letter.toUpperCase()) || killer.lastName.startsWith(letter.toLowerCase())) {
          killersAlphabetical.push(killer)
        }
      }
    })
    res.render('killers', { killers: killersAlphabetical });
  }
  catch (error) {
    console.log('Error while getting killers from DB: ', error);
  }
});

router.get('/killers/search/:zodiac', (req, res, next) => {
  let zodiac = req.params.zodiac;

  console.log(zodiac);
  Killer.find({ zodiacSign: zodiac })
    .then((killers) => {
      console.log(killers);
      res.render('killers', { killers });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/reviews/add', (req, res, next) => {
  const { user, comments } = req.body;
  Killer.update(
    { _id: req.query.killer_id },
    { $push: { reviews: { user, comments } } }
  )
    .then(killer => {
      res.redirect('/killers/' + req.query.killer_id);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/killers/:killerId', (req, res, next) => {
  let killerId = req.params.killerId;
  Killer.findOne({ '_id': killerId })
    .then(killer => {
      if (!killer) {
        return res.status(404).render('not-found');
      }
      res.render("details", { killer });
    })
    .catch(next);
});

module.exports = router;
