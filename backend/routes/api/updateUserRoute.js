const express = require('express');
const cloudinary = require('../../utils/cloudinary').cloudinary;
const router = express.Router();
const User = require('../../models/User');
const Tags = require('../../models/Tags');
const UpdateUserController = require('../../controllers/updateUser');
const auth = require('../../middlewares/checkAuth');

router.post('/profilePic/:id', auth, UpdateUserController.updateProfilePic);

router.post('/tag/:id', (req, res) => {
  console.log(req.body);
});

module.exports = router;
