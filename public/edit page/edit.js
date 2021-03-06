/* eslint-disable */
window.onload = () => {
  const title = localStorage.getItem('blog-title');
  const body = localStorage.getItem('blog-body');
  document.querySelector('.blog-title').value = title;
  document.querySelector('.blog-body').value = body;
  const isLoggeddIn = localStorage.getItem('loggedIn');
  console.log(isLoggeddIn);
  const logoutBtn = document.querySelector('.logout-btn');
  const loginBtn = document.querySelector('.dropleft');
  if (isLoggeddIn === 'true') {
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
  }
};

document.querySelector('.edit-form').onsubmit = async (e) => {
  const id = localStorage.getItem('blog-id');
  e.preventDefault();
  try {
    const newTitle = e.target.title.value;
    const newBody = e.target.body.value;
    const newFile = e.target.file.files[0];
    if (!newTitle || !newBody) {
      throw new Error('Blog must have a title and a body');
    }
    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('body', newBody);
    if (newFile) {
      formData.append('image', newFile);
    }
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PATCH',
      body: formData,
    });
    const resJson = await res.json();
    if (resJson.status === 'success') {
      localStorage.setItem('blog-title', '');
      localStorage.setItem('blog-body', '');
      localStorage.setItem('blog-id', '');
      alert('Your Post has been edited!!');
      window.location.href = '../display page/display_html.html';
    } else {
      throw new Error(respJSON.message);
    }
    console.log(resJson);
  } catch (error) {
    alert(error.message);
  }
};
