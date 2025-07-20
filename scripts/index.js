const initialCards = [
  {
    name: "Snowy owl",
    link: "https://plus.unsplash.com/premium_photo-1674275698987-3bf078858747?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Waving owl",
    link: "https://images.unsplash.com/photo-1516233758813-a38d024919c5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "White and brown owl on a petaled field",
    link: "https://images.unsplash.com/photo-1467811884194-ae868cd3f090?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Owl eyes in the back of its head",
    link: "https://images.unsplash.com/photo-1543549789-add7e987e50a?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Owl eye close up",
    link: "https://plus.unsplash.com/premium_photo-1675188410515-f5886e29c09e?q=80&w=684&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Greyscale owl head",
    link: "https://images.unsplash.com/photo-1627787489784-4abd690c03c2?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditCloseBtn = profileEditModal.querySelector(".modal__close-btn");
const profileEditFormEl = profileEditModal.querySelector(".modal__form");
const profileEditNameInput = profileEditModal.querySelector(
  "#profile-name-input"
);
const profileEditDescInput = profileEditModal.querySelector(
  "#profile-desc-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostNameInput = document.querySelector("#card-caption-input");
const newPostLinkInput = document.querySelector("#card-image-input");

profileEditBtn.addEventListener("click", function () {
  profileEditModal.classList.add("modal_is-opened");
  profileEditNameInput.value = profileNameEl.textContent;
  profileEditDescInput.value = profileDescEl.textContent;
});

profileEditCloseBtn.addEventListener("click", function () {
  profileEditModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = profileEditNameInput.value;
  profileDescEl.textContent = profileEditDescInput.value;
  profileEditModal.classList.remove("modal_is-opened");
}

profileEditFormEl.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(newPostNameInput.value);
  console.log(newPostLinkInput.value);
  newPostModal.classList.remove("modal_is-opened");
}

newPostFormEl.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (card) {
  console.log(card.name);
});
