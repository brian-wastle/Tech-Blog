

//delete a blog
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

// takes you to "create new blog page"
const createButtonHandler = async () => {
  
  const response = await fetch('/newblog');
  
  if (response.ok) {
    document.location.replace('/newBlog');
  } else {
    alert(response.statusText);
  }
  };


document
.querySelector('#createBlog')
.addEventListener('click', createButtonHandler);

document
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);

