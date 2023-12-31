const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all blogs
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//gets a single blog when clicked on the homepage
router.get('/blogs/:id', async (req, res) => {
  try {
    if (req.session.user_id) {
    var user = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: ['name', 'id'], 
    });
    } else {
      var user;
    }



    if (user) {
      var currentUserId = user.dataValues.id;
    } else {
      var currentUserId = 0;
    }

    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { 
          model: User, 
          attributes: ['name'] 
        }, 
        { 
          model: Comment,
          attributes: ['id', 'comment', 'user_id', 'user_name', 'date_created']
        }  
      ],
    });
    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
      current_user_id: currentUserId
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//edit a blog from the dashboard, sends to homepage if user is not author
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blog = blogData.get({ plain: true });
    if (req.session.user_id == blog.user_id) {
    res.render('editblog', {
      ...blog,
      blog_id: blog.id,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
    } else {
      try {
        // Get all projects and JOIN with user data
        const blogData = await Blog.findAll({
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        });
    
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('homepage', { 
          blogs, 
          logged_in: req.session.logged_in 
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//bring up dashboard page, this is main.handlebars when someone clicks on 'dashboard'
//Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//takes you to the "create new blog" page
router.get('/newblog', withAuth, async (req, res) => {
  try {
    res.render('newBlog', { 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//send user to signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

//checks to see if user is logged in
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

module.exports = router;
