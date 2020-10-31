const cloudinary = require('../utils/cloudinary').cloudinary;
const User = require('../models/User');

exports.updateProfilePic = async (req, res, next) => {
  const fileStr = req.body.img;
  //   console.log(fileStr);

  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'passport-login',
  });

  User.findByIdAndUpdate(req.params.id, {
    profilePic: uploadedResponse.secure_url,
  })
    .then(() => {
      res.status(201).json({
        msg: 'Image Update Successful',
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: 'Image update unsuccessful',
      });
    });
};
