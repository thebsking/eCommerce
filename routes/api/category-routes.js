const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const categories = await Category.findAll({
    include: Product
  })
  res.status(200).json(categories)
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const category = await Category.findByPk(req.params.id,{
      include: Product
    })
    res.status(200).json(category)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body)
    res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: { id: req.params.id }});
    res.status(200).json(updateCategory);
    if(!updateCategory){
      res.status(404).json({message: 'No category with this id'});
    }
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: { id: req.params.id}
    });
    res.status(200).json(deleteCategory);
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
