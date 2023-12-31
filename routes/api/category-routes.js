const router = require('express').Router();
const { Category, Product } = require('../../models');
const notFound = require('../../middleware/notFound');

// GET all categories and their associated products
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [Product],
    });
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

// GET a single category by its ID and its associated products
router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!category) {
      return next(notFound('No category found with this id!'));
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// POST a new category
router.post('/', async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    next(error);
  }
});

// PUT (update) a category by its ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedCategory[0]) {
      return next(notFound('No category found with this id!'));
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// DELETE a category by its ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedCategory) {
      return next(notFound('No category found with this id!'));
    }
    res.json(deletedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// Starter Code:
// const router = require('express').Router();
// const { Category, Product } = require('../../models');
// // The `/api/categories` endpoint
// router.get('/', (req, res) => {
//   // find all categories
//   // be sure to include its associated Products
// });
// router.get('/:id', (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });
// router.post('/', (req, res) => {
//   // create a new category
// });
// router.put('/:id', (req, res) => {
//   // update a category by its `id` value
// });
// router.delete('/:id', (req, res) => {
//   // delete a category by its `id` value
// });
// module.exports = router;