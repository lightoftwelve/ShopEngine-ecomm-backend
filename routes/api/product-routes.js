const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const notFound = require('../../middleware/notFound');

// GET all products along with their associated categories and tags
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Category, {
        model: Tag,
        through: ProductTag,
      }],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET a single product by its ID along with its associated category and tags
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, {
        model: Tag,
        through: ProductTag,
      }],
    });
    if (!product) {
      return next(notFound('No product found with this id!'));
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// POST a new product. If the product has associated tags, create pairings in the ProductTag model
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

// PUT (update) a product by its ID. Also, update its associated tags.
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });

    const productTagIds = productTags.map(({ tag_id }) => tag_id);
    const newProductTags = req.body.tagIds.filter((tag_id) => !productTagIds.includes(tag_id)).map((tag_id) => {
      return {
        product_id: req.params.id,
        tag_id,
      };
    });

    const productTagsToRemove = productTags.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id)).map(({ id }) => id);

    await ProductTag.destroy({ where: { id: productTagsToRemove } });
    await ProductTag.bulkCreate(newProductTags);

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// DELETE a product by its ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedProduct) {
      return next(notFound('No product found with this id!'));
    }
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// Starter Code:
// const router = require('express').Router();
// const { Product, Category, Tag, ProductTag } = require('../../models');
// // get all products
// router.get('/', (req, res) => {
//   // find all products
//   // be sure to include its associated Category and Tag data
// });
// // get one product
// router.get('/:id', (req, res) => {
//   // find a single product by its `id`
//   // be sure to include its associated Category and Tag data
// });
// // create new product
// router.post('/', (req, res) => {
//   /* req.body should look like this...
//     {
//       product_name: "Basketball",
//       price: 200.00,
//       stock: 3,
//       tagIds: [1, 2, 3, 4]
//     }
//   */
//   Product.create(req.body)
//     .then((product) => {
//       // if there's product tags, we need to create pairings to bulk create in the ProductTag model
//       if (req.body.tagIds.length) {
//         const productTagIdArr = req.body.tagIds.map((tag_id) => {
//           return {
//             product_id: product.id,
//             tag_id,
//           };
//         });
//         return ProductTag.bulkCreate(productTagIdArr);
//       }
//       // if no product tags, just respond
//       res.status(200).json(product);
//     })
//     .then((productTagIds) => res.status(200).json(productTagIds))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).json(err);
//     });
// });
// // update product
// router.put('/:id', (req, res) => {
//   // update product data
//   Product.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((product) => {
//       if (req.body.tagIds && req.body.tagIds.length) {

//         ProductTag.findAll({
//           where: { product_id: req.params.id }
//         }).then((productTags) => {
//           // create filtered list of new tag_ids
//           const productTagIds = productTags.map(({ tag_id }) => tag_id);
//           const newProductTags = req.body.tagIds
//             .filter((tag_id) => !productTagIds.includes(tag_id))
//             .map((tag_id) => {
//               return {
//                 product_id: req.params.id,
//                 tag_id,
//               };
//             });

//           // figure out which ones to remove
//           const productTagsToRemove = productTags
//             .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//             .map(({ id }) => id);
//           // run both actions
//           return Promise.all([
//             ProductTag.destroy({ where: { id: productTagsToRemove } }),
//             ProductTag.bulkCreate(newProductTags),
//           ]);
//         });
//       }
//       return res.json(product);
//     })
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });
// router.delete('/:id', (req, res) => {
//   // delete one product by its `id` value
// });
// module.exports = router;