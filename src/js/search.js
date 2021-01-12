import PixabayApi from "./apiService.js";
import cardTpl from "../templates/card.hbs";
import refs from "./refs.js";
import { onOpenModal } from "./modal.js";

const { form, gallery, scroll } = refs;
const imageSearch = new PixabayApi();

form.addEventListener("submit", onSearch);
gallery.addEventListener("click", onOpenModal);

function onSearch(e) {
  e.preventDefault();
  imageSearch.searchQuery = e.currentTarget.elements.query.value;
  if (imageSearch.searchQuery === "")
    return alert("Hmm... here is nothing. Try to search again");

  imageSearch.resetPage();
  clearContainer();
  imageSearch.fetchImg().then(appendImgMarcup);
}

function appendImgMarcup(hits) {
  gallery.insertAdjacentHTML("beforeend", cardTpl(hits));
}

function clearContainer() {
  gallery.innerHTML = "";
}

const onTry = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && imageSearch.query !== "") {
      imageSearch.fetchImg().then((hits) => {
        appendImgMarcup(hits);
        imageSearch.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onTry, {
  rootMargin: "160px",
});
observer.observe(scroll);
