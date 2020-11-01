const express = require('express');
const Tags = require('../../models/Tags');
const User = require('../../models/User');
const TagsController = require('../../controllers/tags');
const auth = require('../../middlewares/checkAuth');

const router = express.Router();

router.get('/', auth, TagsController.getAllTags);

router.post('/selectedtags/:id', auth, TagsController.selectedTags);

// @route POST api/tags/delete/:id
// @desc delete tags
// @access Private

router.post('/delete/:id', auth, TagsController.deleteTags);

module.exports = router;
