const initialCards = [
  {
    name: "Snowy owl",
    link: "https://plus.unsplash.com/premium_photo-1674275698987-3bf078858747?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Owl eye close up",
    link: "https://plus.unsplash.com/premium_photo-1675188410515-f5886e29c09e?q=80&w=684&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Waving owl",
    link: "https://images.unsplash.com/photo-1516233758813-a38d024919c5?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Owl eyes in the back of its head",
    link: "https://images.unsplash.com/photo-1543549789-add7e987e50a?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "White and brown owl on a petaled field",
    link: "https://images.unsplash.com/photo-1467811884194-ae868cd3f090?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Greyscale owl head",
    link: "https://images.unsplash.com/photo-1627787489784-4abd690c03c2?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditCloseBtn = profileEditModal.querySelector(".modal__close-btn");
const profileEditFormEl = profileEditModal.querySelector(".modal__form");
const profileEditNameInput = profileEditFormEl.querySelector(
  "#profile-name-input"
);
const profileEditDescInput = profileEditFormEl.querySelector(
  "#profile-desc-input"
);

const profileNameEl = document.querySelector(".profile__name");
const profileDescEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostNameInput = newPostFormEl.querySelector("#card-caption-input");
const newPostLinkInput = newPostFormEl.querySelector("#card-image-input");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const imagePreviewModal = document.querySelector("#image-preview-modal");
const imagePreviewEl = imagePreviewModal.querySelector(".modal__image");
const imagePreviewCloseBtn = imagePreviewModal.querySelector(
  ".modal__close_type_preview"
);
const imagePreviewCaption = imagePreviewModal.querySelector(".modal__caption");

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  // Card like button
  const cardHeartIconEl = cardElement.querySelector(".card__heart-btn");
  cardHeartIconEl.addEventListener("click", () => {
    cardHeartIconEl.classList.toggle("card__heart-btn_active");
  });

  // Card delete
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
    cardElement = null;
  });

  cardImageEl.addEventListener("click", () => {
    imagePreviewEl.src = data.link;
    imagePreviewEl.alt = data.name;
    imagePreviewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  profileEditNameInput.value = profileNameEl.textContent;
  profileEditDescInput.value = profileDescEl.textContent;
});

profileEditCloseBtn.addEventListener("click", function () {
  closeModal(profileEditModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Edit profile information
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileNameEl.textContent = profileEditNameInput.value;
  profileDescEl.textContent = profileEditDescInput.value;
  closeModal(profileEditModal);
}

profileEditFormEl.addEventListener("submit", handleProfileFormSubmit);

// Create new cards
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostNameInput.value,
    link: newPostLinkInput.value,
  };

  const card = getCardElement(inputValues);
  cardsList.prepend(card);

  closeModal(newPostModal);
}

newPostFormEl.addEventListener("submit", handleAddCardSubmit);

// Add new cards to DOM
initialCards.forEach(function (item) {
  const card = getCardElement(item);
  cardsList.append(card);
});

imagePreviewCloseBtn.addEventListener("click", function () {
  closeModal(imagePreviewModal);
});
