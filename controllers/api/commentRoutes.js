const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

//add a comment
router.post('/:id', async (req, res) => {


  try {
    const user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ['name', 'id'], // Specify the attributes you want to retrieve (in this case, 'name')
    });

    if (user) {
      var currentUserId = user.dataValues.id;
      var currentUserName = user.dataValues.name;
    } else {
      var currentUserId = 0;
      var currentUserName = '';
    }
    const newComment = await Comment.create({
      ...req.body,
      blog_id: req.params.id,
      user_id: req.session.user_id,
      user_name: currentUserName,
      user_id: currentUserId
    });
    console.log(user)
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //delete a comment
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;