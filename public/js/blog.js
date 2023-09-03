// const blog_id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
//   ];
  
  const commentFormHandler = async (event) => {
    event.preventDefault();
  
  const comment = document.querySelector('#comment-box').value.trim();
  
    //add a comment
    if (comment) {
        const response = await fetch(`/api/comments/`, {
          method: 'POST',
          body: JSON.stringify({ comment }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          await document.location.reload();
        } else {
          alert('Failed to create comment');
        }
      }
    };

    document
    .querySelector('.form-submit')
    .addEventListener('submit', commentFormHandler);

  //   //delete a comment
  // const delButtonHandler = async (event) => {
  
  //     const response = await fetch(`/api/blogs/${blog_id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.ok) {
  //       console.log('ok')
  //       // document.location.replace('/dashboard');
  //     } else {
  //       alert('Failed to delete blog');
  //     }
  // };
    

  
  // document
  //   .querySelector('#del-button')
  //   .addEventListener('click', delButtonHandler);