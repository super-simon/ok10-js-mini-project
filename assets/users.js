const usersUrl = new URL("https://jsonplaceholder.typicode.com/users");

users = fetch(usersUrl)
  .then((res) => res.json())
  .then((users) => {
    console.log(users);

    const usersFragment = document.createDocumentFragment();
    for (const user of users) {
      const userBlock = document.createElement("li");
      userBlock.className = "user";

      const img = document.createElement("img");
      img.className = "user__img";
      img.src = `https://i.pravatar.cc/300?img=${user.id}`;

      const idNameBlock = document.createElement("h2");
      idNameBlock.className = "user__id-name";
      idNameBlock.textContent = `${user.id}. ${user.name}`;

      const button = document.createElement("a");
      button.href = `user-details.html?id=${user.id}`;
      button.textContent = "Show Details →";
      button.className = "user__button";

      userBlock.append(img, idNameBlock, button);

      usersFragment.appendChild(userBlock);
    }
    const usersBlock = document.getElementById("users");
    usersBlock.appendChild(usersFragment);
  });
