const router = require('express').Router();
const { Category, Product } = require('../../models');
const { beforeBulkDestroy } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    const categoryData = await Category.findAll({
      include: [{model: Product,}],
    }).catch((err) => {
      res.json(err);
    });
    return res.json(categoryData);
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product, }],
  }).catch((err) => {
    res.json(err);
  });
  return res.json(categoryData);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })  //must be an object
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  });
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(
    {
        category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
Category.destroy({
  where: {
    id: req.params.id,
  },
})
  .then((deletedId) => {
    res.json(deletedId);
  })
  .catch((err) => res.json(err));
  // delete a category by its `id` value
});

module.exports = router;
