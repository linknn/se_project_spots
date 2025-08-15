import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  toggleButtonState,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

// const initialCards = [
//   {
//     name: "Sunflower",
//     link: "https://images.unsplash.com/photo-1548291616-bfccc8db731d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     name: "Polaroid",
//     link: "https://images.unsplash.com/photo-1576261240726-b4782dfcd02e?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     name: "Sunflower Field",
//     link: "https://images.unsplash.com/photo-1599270613570-a620f2e59f75?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     name: "Viking Boat",
//     link: "https://images.unsplash.com/photo-1663336014741-41b84fed050f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     name: "White and brown owl on a petaled field",
//     link: "https://images.unsplash.com/photo-1467811884194-ae868cd3f090?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     name: "Bubbles",
//     link: "https://images.unsplash.com/photo-1594035519981-62c9cef33ca9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },

//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9174fee8-14cf-423d-8847-48b971305a7a",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, users]) => {
    // Create new cards
    cards.forEach(function (item) {
      const card = getCardElement(item);
      cardsList.append(card);
    });
    profileNameEl.textContent = users.name;
    profileDescEl.textContent = users.about;
    // not textcontent, set the src
    // avatarEditFormEl.textContent = users.avatar;
  })
  .catch(console.error);

// Profile selectors
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileEditModal = document.querySelector("#edit-profile-modal");
const profileEditSubmitBtn = profileEditModal.querySelector("#profile-submit");
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

// New card selectors
const newPostBtn = document.querySelector(".profile__new-post");
const newPostModal = document.querySelector("#new-post-modal");
const newPostSubmitBtn = newPostModal.querySelector("#card-submit");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostFormEl = newPostModal.querySelector(".modal__form");
const newPostNameInput = newPostFormEl.querySelector("#card-caption-input");
const newPostLinkInput = newPostFormEl.querySelector("#card-image-input");

// Avatar selectors
const avatarEditBtn = document.querySelector(".profile__avatar-btn");
const avatarEditModal = document.querySelector("#edit-avatar-modal");
const avatarEditCloseBtn = avatarEditModal.querySelector(".modal__close-btn");
const avatarEditSubmitBtn = avatarEditModal.querySelector("#card-submit");
const avatarInput = avatarEditModal.querySelector("#profile-avatar-input");
const avatarEditFormEl = avatarEditModal.querySelector(".modal__form");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Delete selectors
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");
const deleteForm = deleteModal.querySelector("#delete-form");
let selectedCard, selectedCardId;

// Preview modal selectors
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
  // cardImageEl.id = data.id;
  cardTitleEl.textContent = data.name;

  // Card like button
  const cardHeartIconEl = cardElement.querySelector(".card__heart-btn");
  cardHeartIconEl.addEventListener("click", (evt) =>
    handleCardHeartIcon(evt, data._id)
  );

  // Card delete
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImageEl.addEventListener("click", () => {
    imagePreviewEl.src = data.link;
    imagePreviewEl.alt = data.name;
    imagePreviewCaption.textContent = data.name;
    openModal(imagePreviewModal);
  });

  return cardElement;
}

function handleCardHeartIcon(evt, id) {
  const cardHeartIcon = evt.target;
  const isLiked = cardHeartIcon.classList.contains("card__heart-btn_active");

  api
    .handleCardLike(id, isLiked)
    .then((likedCard) => {
      cardHeartIcon.classList.toggle("card__heart-btn_active");
    })
    // if (isLiked)
    .catch(console.error);

  // 1. check whether care is currently liked or not
  //      const isLiked = ???
  // 2. call handleCardLike method, passing appropriate arguments
  // 3. handle response (.then .catch)
  // 4. in the .then toggle active class
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

deleteModalCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

function handleEscKeyDown(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const modal = document.querySelector(".modal_is-opened");
    closeModal(modal);
  }
}

function handleOutsideModalClick(evt) {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
}

// Open and close modals
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscKeyDown);
  modal.addEventListener("click", handleOutsideModalClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscKeyDown);
  modal.removeEventListener("click", handleOutsideModalClick);
}

profileEditBtn.addEventListener("click", function () {
  openModal(profileEditModal);
  profileEditNameInput.value = profileNameEl.textContent;
  profileEditDescInput.value = profileDescEl.textContent;
  resetValidation(
    profileEditFormEl,
    [profileEditNameInput, profileEditDescInput],
    settings
  );
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

avatarEditBtn.addEventListener("click", function () {
  openModal(avatarEditModal);
});

avatarEditCloseBtn.addEventListener("click", function () {
  closeModal(avatarEditModal);
});

avatarEditFormEl.addEventListener("submit", handleAvatarEditSubmit);

function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      closeModal(avatarEditModal);
      console.log(data.avatar);
    })
    .catch(console.error);
}

// Edit profile information
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileEditSubmitBtn.textContent = "Saving...";
  api
    .editUserInfo({
      name: profileEditNameInput.value,
      about: profileEditDescInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescEl.textContent = data.about;
      closeModal(profileEditModal);
    })
    .catch(console.error)
    .finally(() => {
      profileEditSubmitBtn.textContent = "Save";
    });
}

profileEditFormEl.addEventListener("submit", handleProfileFormSubmit);

// Create new cards
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: newPostNameInput.value,
    link: newPostLinkInput.value,
  };

  api.createCard(inputValues).then((data) => {
    const card = getCardElement(data);
    cardsList.prepend(card);
  });
  evt.target.reset();
  toggleButtonState(
    [newPostNameInput, newPostLinkInput],
    evt.submitter,
    settings
  );
  closeModal(newPostModal);
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

newPostFormEl.addEventListener("submit", handleAddCardSubmit);

imagePreviewCloseBtn.addEventListener("click", function () {
  closeModal(imagePreviewModal);
});

enableValidation(settings);
