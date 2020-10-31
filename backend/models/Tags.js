const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  value: {
    type: String,
  },
  label: {
    type: String,
  },
});

module.exports = Tags = mongoose.model('tags', TagsSchema);
