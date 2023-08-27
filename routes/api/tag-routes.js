const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const notFound = require('../../middleware/notFound');

// GET all tags with their associated products
router.get('/', async (req, res, next) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        }
      ]
    });
    res.json(tags);
  } catch (error) {
    next(error);
  }
});

// get one tag
router.get('/:id', async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: ProductTag,
          as: 'products'
        }
      ]
    });
    if (!tag) {
      return next(notFound('No tag found with this id!'));
    }
    res.json(tag);
  } catch (error) {
    next(error);
  }
});

// Create a new tag
router.post('/', async (req, res, next) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    next(error);
  }
});

// Update a tag by its id
router.put('/:id', async (req, res, next) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedTag[0]) {
      return next(notFound('No tag found with this id!'));
    }
    res.json(updatedTag);
  } catch (error) {
    next(error);
  }
});

// Delete a tag by its id
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      return next(notFound('No tag found with this id!'));
    }
    res.json(deletedTag);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// Starter Code:
// const router = require('express').Router();
// const { Tag, Product, ProductTag } = require('../../models');
// // The `/api/tags` endpoint
// router.get('/', async (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });
// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });
// router.post('/', (req, res) => {
//   // create a new tag
// });
// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });
// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });
// module.exports = router;