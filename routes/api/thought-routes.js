const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//thought routes
router.route('/').get(getAllThoughts);
router.route('/:thoughtId').get(getThoughtById);
router.route('/').post(createThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);

//reaction routes
router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;