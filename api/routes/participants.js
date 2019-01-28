const express = require('express');

const router = express.Router();
const ParticipantController = require('../controllers/participant-controller');
const checkAuth = require('../middleware/check-auth');

router.post('/', ParticipantController.Post_Participant);
router.get('/:slug', ParticipantController.Get_Participants);

module.exports = router;
