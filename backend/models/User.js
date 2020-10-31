const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 32,
      trim: true,
    },
    email: {
      type: String,
      index: true,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      uniqueCaseInsensitive: true,
    },
    password: {
      type: String,
      required: true,
    },
    authCount: {
      type: Number,
      default: 0,
    },

    profilePic: {
      type: String,
      default:
        'https://res.cloudinary.com/ayan-cloud-image/image/upload/v1603696924/defaultpropic_lrhcst.jpg',
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags',
      },
    ],

    age: { type: Number, min: 12 },

    register_date: {
      type: Date,
      default: Date.now,
    },
  },

  {
    timestamps: true,
  }
);

UserSchema.plugin(mongooseUniqueValidator);

module.exports = User = mongoose.model('user', UserSchema);
