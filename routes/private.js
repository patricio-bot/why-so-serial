var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRound = 10;
const parser = require('./../config/cloudinary');

const Killer = require('../models/killer');
const User = require('../models/User');


/* Session Middleware */
router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }
    res.redirect('/login');
});


router.get('/add-killer', (req, res, next) => {
    res.render('private/add-killer');
});


router.post('/add-killer', parser.single('photo'), (req, res, next) => {
    const { name, lastName, aka, murderType, zodiacSign, numberOfVictimsConfirmed, numberOfVictimsPossible } = req.body;
    let imgPath;
    if (req.file) imgPath = req.file.url;
    const userId = req.session.currentUser._id;
    const userInfo = { isAuthor: true };
    const newKiller = new Killer({ name, lastName, aka, murderType, zodiacSign, numberOfVictimsConfirmed, numberOfVictimsPossible, author: userId, image: imgPath });
    if (name === '' || lastName === '' || murderType === '' || aka === '' || numberOfVictimsConfirmed === '' || numberOfVictimsPossible === '' || zodiacSign === '') {
        res.render('private/add-killer', { errorMessage: 'The fields: name, last name, murder type, zodiac sign, aka ,numberOfVictimsConfirmed and numberOfVictimsPossible are required' });
        return;
    }
    Killer.findOne({ lastName })
        .then((foundKiller) => {
            if (foundKiller) {
                res.render('private/add-killer', { errorMessage: `The killer ${lastName} already exists in Why So Serial Database` });
                return;
            }
            newKiller.save()
                .then((killer) => {
                    User.findByIdAndUpdate(userId, { $set: userInfo, $push: { killersCreated: killer._id } }, { new: true })
                        .then((user) => {
                            req.session.currentUser = user;
                            res.redirect(`/private/profile/${userId}`);
                        })
                        .catch((err) => {
                            next(err);
                        });
                })
                .catch((err) => {
                    res.render('private/add-killer', { errorMessage: 'Error creating the new Serial Killer' });
                });
        })
        .catch((err) => {
        });
});

router.get('/edit-killer', (req, res, next) => {
    Killer.findOne({ _id: req.query.killer_id })
        .then((killer) => {
            res.render('private/edit-killer', { killer });
        })
        .catch((err) => {
            next(err);
        });

});

router.post('/edit-killer', parser.single('photo'), (req, res, next) => {
    const userId = req.session.currentUser._id



    //console.log(yearsActive, typeof yearsActive)

    //yearsActive = yearsActive.split(/[ ,]+/).sort((a, b) => a - b);

    const author = userId;

    let image_url;
    if (req.file) image_url = req.file.url;
    let defaultKillerImg;


    Killer.findById(req.query.killer_id)
        .then(theKillerProfile => {

            defaultKillerImg = theKillerProfile.image;

            let imgPath = req.file ? req.file.url : defaultKillerImg;


            let { name, lastName, aka, gender, murderType, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, description, books } = req.body;

            yearsActive = yearsActive.split(/[ ,]+/).sort((a, b) => a - b);

            let killerUpdated = { name, lastName, aka, gender, murderType, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, description, books, image: imgPath };

            Killer.update({ _id: req.query.killer_id }, killerUpdated)
                .then(() => Killer.findById(req.query.killer_id))
                .then(killerUpdated => {
                    res.redirect(`/private/profile/${userId}`);
                })
                .catch(error =>
                    console.log(error));

        });
});


router.post('/fave-killer', (req, res, next) => {
    const userId = req.session.currentUser._id;
    Killer.findById(req.query.killer_id)
        .then((killer) => {
            User.findByIdAndUpdate(userId, { $push: { faveKillers: killer._id } }, { new: true })
                .then((user) => {
                    req.session.currentUser = user;
                    res.redirect(`/private/profile/${userId}`);
                })
                .catch((err) => {
                    next(err);
                });


        })
        .catch(error =>
            console.log(error));
});

router.post('/delete-killer', (req, res, next) => {

    const userId = req.session.currentUser._id;
    Killer.findByIdAndRemove({ _id: req.query.killer_id })
        .then(() => {
            res.redirect(`/private/profile/${userId}`);
        })
        .catch((error) => {
            console.log(error)
            return res.status(404).render('not-found');
        });
});

/* USER PROFILE */

router.get('/profile/:userId', (req, res, next) => {
    let userId = req.params.userId
    User.findById(userId)
        .populate("killersCreated")
        .then((user) => {
            res.render('private/profile', { user });
        })
        .catch(error => {
            console.log('error:', error);
        });
});

router.get('/fav-killers/:userId', (req, res, next) => {
    let userId = req.params.userId
    User.findById(userId)
        .populate("faveKillers")
        .then((user) => {
            res.render('private/fav-killers', { user })
        })
        .catch(error => {
            console.log('error:', error);
        });
})

router.get('/edit-user', (req, res, next) => {
    const userId = req.session.currentUser._id
    User.findOne({ '_id': req.query.user_id })
        .then((user) => {
            res.render('private/edit-user', { user })
        })
        .catch((err) => {
            console.log(err)
            next(err)
        })
})

router.post('/edit-user', parser.single('profilepic'), (req, res, next) => {

    let userId = req.query.user_id;
    let image_url;
    if (req.file) image_url = req.file.url;

    let previousUserImg;



    User.findById({ '_id': req.query.user_id })
        .then(theUserProfile => {
            previousUserImg = theUserProfile.image;
            let imgPath = req.file ? req.file.url : previousUserImg;

            const { name, email } = req.body;

            const userUpdated = { name, email, image: imgPath };

            User.update({ '_id': req.query.user_id }, userUpdated)
                .then(() => User.findById(userId))
                .then(userUpdated => {

                    res.redirect(`/private/profile/${userId}`);
                })
                .catch(error => console.log(error));
        });
});

module.exports = router;