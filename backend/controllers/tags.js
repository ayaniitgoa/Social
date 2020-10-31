exports.getAllTags = (req, res) => {
  Tags.find({}, (err, tags) => {
    res.send(tags);
    if (err) {
      res.status(401).json({
        msg: 'Error while loading tags',
      });
    }
  });
};

exports.selectedTags = (req, res) => {
  const id = req.params.id;
  const selectedTagValues = req.body.selectedTagValues;
  User.findByIdAndUpdate(
    id,
    {
      $addToSet: { tags: selectedTagValues },
    },
    { new: true }
  )
    .populate('tags', { label: 0 })
    .select('tags -_id')
    .then((user) => {
      res.send(user.tags);
    })
    .catch(() => {
      res.status(401).json({
        msg: 'Tags deletion unsuccessful',
      });
    });
};

exports.deleteTags = (req, res) => {
  const { id } = req.params;
  const { deletedTags } = req.body;
  User.findByIdAndUpdate(
    id,
    {
      $pullAll: {
        tags: deletedTags,
      },
    },
    { new: true }
  )
    .populate('tags', { label: 0 })
    .select('tags -_id')
    .then((user) => {
      res.send(user.tags);
    })
    .catch(() => {
      res.status(401).json({
        msg: 'Tags unable to load..',
      });
    });
};
