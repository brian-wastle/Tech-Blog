const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#project-name').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
  
    //update a blog
    if (name && description) {
      const response = await fetch(`/api/blogs/:id`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        body: JSON.stringify({ name, description }),
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update blog');
      }
    }
  };

  
document
.querySelector('.edit-project-form')
.addEventListener('submit', newFormHandler);