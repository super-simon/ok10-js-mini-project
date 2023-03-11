const theUrl = new URL(location.href);
const id = theUrl.searchParams.get("id");

const usersUrl = new URL("https://jsonplaceholder.typicode.com/users/" + id);

user = fetch(usersUrl)
  .then((res) => res.json())
  .then((user) => {
    console.log(user);

    const header = document.getElementById("user-name");
    header.textContent = user.name;

    const usersFragment = document.createDocumentFragment();
    // for (const user of users) {
    //   const userBlock = document.createElement("div");
    //   userBlock.className = "user";

    //   const img = document.createElement("img");
    //   img.src = `https://i.pravatar.cc/300?img=${user.id}`;

    //   const idNameBlock = document.createElement("div");
    //   idNameBlock.className = "id-name";
    //   const idNameLink = document.createElement("a");
    //   idNameLink.href = `user-details.html?id = ${user.id}`;
    //   idNameLink.textContent = `${user.id} ${user.name}`;
    //   idNameBlock.appendChild(idNameLink);

    //   userBlock.append(img, idNameBlock);

    //   usersFragment.appendChild(userBlock);
    // }
    // const usersBlock = document.getElementById("users");
    // usersBlock.appendChild(usersFragment);
  });
