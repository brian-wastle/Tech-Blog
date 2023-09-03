const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//add a comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      blog_id: 1,
      user_id: req.session.user_id,
    });
      
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // //delete a comment
  // router.delete('/:id', withAuth, async (req, res) => {
  //   try {
  //     const blogData = await Comment.destroy({
  //       where: {
  //         id: req.params.id,
  //         user_id: req.session.user_id,
  //       },
  //     });
  
  //     if (!blogData) {
  //       res.status(404).json({ message: 'No comment found with this id!' });
  //       return;
  //     }
  
  //     res.status(200).json(blogData);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });
  
  module.exports = router;