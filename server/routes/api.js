var express = require('express');
var router = express.Router();

const Note = require('../models/notes.js');

/* GET users listing. */
router.get('/note', function(req, res, next) {
//   res.send('respond with a resource');
    Note.find(function (err, notes) {
        let ctx = {
            notes: notes.map(function (note) {
                return {
                    date: note.date,
                    content: note.getContent(),
                    content_morning: content_morning,
                    content_noon: content_noon,
                    content_night: content_night
                }
            })
        };
        res.json(ctx);
    })
});

router.post('/note', function (req, res, next) {
    new Note({
        date: new Date(),
        content_morning: 'String morning',
        content_noon: 'String noon',
        content_night: 'String night',
    }).save();
});

module.exports = router;
