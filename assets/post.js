const theUrl = new URL(location.href);
const id = theUrl.searchParams.get("id");

const postUrl = new URL("https://jsonplaceholder.typicode.com/posts/" + id);

fetch(postUrl)
  .then((res) => res.json())
  .then((post) => {
    console.log(post);

    const headerEl = document.getElementById("title");
    headerEl.textContent = post.title;

    const img = document.createElement("img");
    img.className = "post__img";
    img.src = `https://picsum.photos/id/${10 + post.id}/300`;

    const bodyEl = document.createElement("p");
    bodyEl.className = "post__body";
    bodyEl.textContent = post.body;

    const postEl = document.getElementById("post");
    postEl.append(img, bodyEl);

    const userUrl = new URL(
      "https://jsonplaceholder.typicode.com/users/" + post.userId
    );

    fetch(userUrl)
      .then((res) => res.json())
      .then((user) => {
        console.log(user);

        const img = document.createElement("img");
        img.className = "author__img";
        img.src = `https://i.pravatar.cc/300?img=${user.id}`;

        const authorName = document.createElement("a");
        authorName.href = `user-details.html?id=${user.id}`;
        authorName.className = "author__name";
        authorName.textContent = user.name;

        const authorEl = document.getElementById("author");
        authorEl.append(img, authorName);
      });

    const postCommentsUrl = new URL(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );

    fetch(postCommentsUrl)
      .then((res) => res.json())
      .then((comments) => {
        console.log(comments);

        const commentsFragment = document.createDocumentFragment();
        for (const comment of comments) {
          const commentItemEl = document.createElement("li");
          commentItemEl.className = "comments__item";

          const nameEl = document.createElement("h3");
          nameEl.className = "comments__name";
          nameEl.textContent = `${comment.name} (${comment.email})`;

          const bodyEl = document.createElement("p");
          bodyEl.className = "comments__body";
          bodyEl.textContent = comment.body;

          commentItemEl.append(nameEl, bodyEl);
          commentsFragment.appendChild(commentItemEl);
        }
        const commentsBlock = document.getElementById("comments");
        commentsBlock.appendChild(commentsFragment);
      });
  });
