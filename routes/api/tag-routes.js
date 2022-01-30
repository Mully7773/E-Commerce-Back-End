const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  return res.json(tagData);
});
  // find all tags
  // be sure to include its associated Product data


router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product}],
  }).catch((err) => {
    res.json(err);
  });
  return res.json(tagData);
});
  // find a single tag by its `id`
  // be sure to include its associated Product data


router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })  //must be an object
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  });
});
  // create a new tag


router.put('/:id', (req, res) => {
  Tag.update(
    {
        tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});
  // update a tag's name by its `id` value


router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
  });
  // delete on tag by its `id` value


module.exports = router;
