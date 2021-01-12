const API_KEY = "19822472-14ec0e3f9ba277805ee5b06f8";
const BASE_URL = "https://pixabay.com/api";

export default class PixabayApi {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
    this.perPage = 12;
  }

  fetchImg() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;

    return fetch(url)
      .then((response) => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
