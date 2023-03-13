const theUrl = new URL(location.href);
const id = theUrl.searchParams.get("id");
let publicationsAreLoaded = false;

const userUrl = new URL("https://jsonplaceholder.typicode.com/users/" + id);

fetch(userUrl)
  .then((res) => res.json())
  .then((user) => {
    console.log(user);

    const header = document.getElementById("user-name");
    header.textContent = user.name;

    const img = document.getElementById("user-img");
    img.src = `https://i.pravatar.cc/300?img=${user.id}`;
    img.alt = `${user.name} profile image`;

    const detailsListEl = document.getElementById("user-details");
    const detailsItemEl = document.createElement("li");
    detailsItemEl.className = "user-details__item";
    const detailsItemLabelEl = document.createElement("span");

    const idEl = detailsItemEl.cloneNode();
    const idLabelEl = detailsItemLabelEl.cloneNode();
    idLabelEl.textContent = "ID: ";
    idEl.append(idLabelEl, user.id);

    const usernameEl = detailsItemEl.cloneNode();
    const usernameLabelEl = detailsItemLabelEl.cloneNode();
    usernameLabelEl.textContent = "Username: ";
    usernameEl.append(usernameLabelEl, user.username);

    const emailEl = detailsItemEl.cloneNode();
    const emailLinkEl = document.createElement("a");
    emailLinkEl.textContent = user.email;
    emailLinkEl.href = "mailto:" + user.email;
    const emailLabelEl = detailsItemLabelEl.cloneNode();
    emailLabelEl.textContent = "Email: ";
    emailEl.append(emailLabelEl, emailLinkEl);

    const phoneEl = detailsItemEl.cloneNode();
    const phoneLabelEl = detailsItemLabelEl.cloneNode();
    phoneLabelEl.textContent = "Phone: ";
    phoneEl.append(phoneLabelEl, user.phone);

    const websiteEl = detailsItemEl.cloneNode();
    const websiteLinkEl = document.createElement("a");
    websiteLinkEl.textContent = user.website;
    websiteLinkEl.href = "http://" + user.website;
    const websiteLabelEl = detailsItemLabelEl.cloneNode();
    websiteLabelEl.textContent = "Website: ";
    websiteEl.append(websiteLabelEl, websiteLinkEl);

    const addressEl = detailsItemEl.cloneNode();
    const addressLabelEl = detailsItemLabelEl.cloneNode();
    addressLabelEl.textContent = "Address: ";
    addressEl.append(
      addressLabelEl,
      `${user.address.city}, ${user.address.street}, ${user.address.suite}, ${user.address.zipcode} (lat: ${user.address.geo.lat}, lng: lat: ${user.address.geo.lat})`
    );

    const companyEl = detailsItemEl.cloneNode();
    const companyLabelEl = detailsItemLabelEl.cloneNode();
    companyLabelEl.textContent = "Company: ";
    companyEl.append(
      companyLabelEl,
      `${user.company.name} (${user.company.catchPhrase}, ${user.company.bs})`
    );

    detailsListEl.append(
      idEl,
      usernameEl,
      emailEl,
      phoneEl,
      websiteEl,
      addressEl,
      companyEl
    );
  });

const showPublicationsButton = document.getElementById(
  "show-publications-button"
);

showPublicationsButton.addEventListener("click", () => {
  if (publicationsAreLoaded) {
    return;
  }

  const userPublicationsUrl = new URL(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );

  fetch(userPublicationsUrl)
    .then((res) => res.json())
    .then((publications) => {
      console.log(publications);

      const publicationsFragment = document.createDocumentFragment();
      for (const publication of publications) {
        const publicationItemEl = document.createElement("li");
        publicationItemEl.className = "publications__item";

        const img = document.createElement("img");
        img.className = "publications__img";
        img.src = `https://picsum.photos/id/${10 + publication.id}/300`;

        const titleEl = document.createElement("h2");
        titleEl.className = "publications__title";
        titleEl.textContent = publication.title;

        const buttonEl = document.createElement("a");
        buttonEl.href = `post-details.html?id=${publication.id}`;
        buttonEl.textContent = "Read →";
        buttonEl.className = "publications__button";

        publicationItemEl.append(img, titleEl, buttonEl);
        publicationsFragment.appendChild(publicationItemEl);
      }
      const publicationsBlock = document.getElementById("publications");
      publicationsBlock.appendChild(publicationsFragment);

      publicationsAreLoaded = true;
      showPublicationsButton.style.cursor = "default";
      console.log(publicationsAreLoaded);
    });
});
