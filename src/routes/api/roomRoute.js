const router = require('express').Router();
const roomController = require('../../controllers/roomController');

// TODO authentication
router.post('/', roomController.createRoom);
router.get('/', roomController.findRooms);
router.get('/:id', roomController.findRoomById);

module.exports = router;
