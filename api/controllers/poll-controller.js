const mongoose = require('mongoose');
const Poll = require('../models/poll');
const Participant = require('../models/participant');

exports.Get_Poll = (req, res) => {
  Poll.findOne({ slug: req.params.slug })
    .exec()
    .then((poll) => {
      if (poll.length < 1) {
        return res.status(404).json({
          error: 'anket bulunamadı ',
        });
      }
      return res.status(201).json({
        poll,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.Post_Poll = (req, res) => {
  Poll.find({ slug: req.body.slug })
    .exec()
    .then((filteredPoll) => {
      if (filteredPoll.length >= 1) {
        return res.status(200).json({
          message: 'Bu Slug Kullanılıyor',
        });
      }
      const poll = new Poll({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        css: req.body.css,
        js: req.body.js,
        name: req.body.name,
        desc: req.body.desc,
        slug: req.body.slug,
        selectableLastMessages: req.body.selectableLastMessages,
        lastDesc: req.body.lastDesc,
        questions: req.body.questions,
        answers: req.body.answers,
        settings: req.body.settings,
      });
      poll
        .save()
        .then((poll) => {
          console.log('anket kaydedildi');
          res.status(201).json({
            message: 'Anket Kaydedildi',
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            error,
          });
        });
    });
};


exports.Get_All_Polls = (req, res) => {
  const perPage = 10;
  const { page } = req.params;
  let count = 0;
  Poll.count({}, (err, countItems) => {
    count = countItems;
  });
  Poll.find()
    .select('name desc slug createdAt')
    .limit(perPage)
    .skip(perPage * page)
    .sort({ createdAt: -1 })
    .exec()
    .then((polls) => {
      res.status(200).json({
        polls,
        count,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.Get_Polls = (req, res) => {
  Poll.find({ userId: req.params.userId })
    .sort({ createdAt: -1 })
    .exec()
    .then((polls) => {
      if (polls.length > 0) {
        res.status(200).json({
          polls,
          message: 'Anketleri Getirdik...',
        });
      } else {
        res.status(201).json({
          polls: [],
          message: 'Anket Bulunamadı...',
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};


exports.Delete_Poll = (req, res) => {
  Poll.remove({
    _id: req.params._id,
  })
    .exec()
    .then(poll => res
      .status(201)
      .json({
        message: 'Anket Silindi',
      }))
    .then(() => {
      Participant.remove({ pollId: req.params._id })
        .exec();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error,
      });
    });
};

exports.Update_Poll = (req, res) => {
  Poll.update({ _id: req.body._id }, {
    $set: {
      name: req.body.name,
      userId: req.body.userId,
      css: req.body.css,
      js: req.body.js,
      desc: req.body.desc,
      slug: req.body.slug,
      lastDesc: req.body.lastDesc,
      questions: req.body.questions,
      answers: req.body.answers,
      settings: req.body.settings,
      selectableLastMessages: req.body.selectableLastMessages,
    },
  })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: 'Anket Güncellendi',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
