const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {let allTags = await Tag.findAll({
    include: {model: Product, through: ProductTag}
  });
  res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {let tag = await Tag.findByPk(req.params.id, {
    include: {model: Product, through: ProductTag}
  });
  res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
  let newTag = await Tag.create(req.body, {
    where: {id: req.params.id}
  })
  res.status(200).json(newTag);
} catch (err){
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    let tag = await Tag.update(req.body, {where: {
      id: req.params.id
    }})
    res.status(200).json(tag);
    if(!tag){
      res.status(404).json('No tag with that id')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    let deleteTag = await Tag.destroy({where: {id: req.params.id}});
    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
