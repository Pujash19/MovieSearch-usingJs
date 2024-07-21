const API_KEY = "6429e400";
const BASE_URL = "http://www.omdbapi.com";
const API_URL = `${BASE_URL}/?apikey=${API_KEY}&s=popular&type=movie`;
const searchURL = `${BASE_URL}/?apikey=${API_KEY}&type=movie`;
const recommendationsHeader = document.getElementById("recommendations-header");
let movieId = "";
let recommendationsURL = "";
const main = document.getElementById("main");
const recommendations = document.getElementById("recommendations");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.Search);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
  }
}

async function getRecommendations(movieTitle) {
  try {
    const url = `${BASE_URL}/?apikey=${API_KEY}&s=${movieTitle}&type=movie`;
    const res = await fetch(url);
    const data = await res.json();
    movieId = data.Search[0].imdbID;
    const movieDetailsURL = `${BASE_URL}/?apikey=${API_KEY}&i=${movieId}&plot=full`;
    const detailsRes = await fetch(movieDetailsURL);
    const detailsData = await detailsRes.json();
    const genre = detailsData.Genre.split(",")[0];
    const recommendationsURL = `${BASE_URL}/?apikey=${API_KEY}&s=${genre}&type=movie`;
    const recRes = await fetch(recommendationsURL);
    const recData = await recRes.json();
    showRecommendations(recData.Search);
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
  }
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { Title, Poster, imdbRating, Plot } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${Poster}" alt="${Title}">
        <div class="movie-info">
                <h3>${Title}</h3>
                <span class="${getColor(imdbRating)}">${imdbRating}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${Plot}
        </div>
        `;

    main.appendChild(movieEl);
  });
}

function showRecommendations(data) {
  recommendations.innerHTML = "";
  data.forEach((movie) => {
    const { Title, Poster, imdbRating, Plot } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${Poster}" alt="${Title}">
        <div class="movie-info">
                <h3>${Title}</h3>
                <span class="${getColor(imdbRating)}">${imdbRating}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${Plot}
        </div>
        `;

    recommendations.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    const searchApiUrl = `${searchURL}&s=${searchTerm}`;
    getMovies(searchApiUrl);
    getRecommendations(searchTerm);
    recommendationsHeader.hidden = false;
  } else {
    getMovies(API_URL);
  }
});












/* function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.Search);
    });
}

function getRecommendations(movieTitle) {
  const url = `${BASE_URL}/?apikey=${API_KEY}&s=${movieTitle}&type=movie`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      movieId = data.Search[0].imdbID;
      const movieDetailsURL = `${BASE_URL}/?apikey=${API_KEY}&i=${movieId}&plot=full`;
      fetch(movieDetailsURL)
        .then((res) => res.json())
        .then((data) => {
          // Assuming recommendations are based on similar movies with the same genre
          const genre = data.Genre.split(",")[0];
          const recommendationsURL = `${BASE_URL}/?apikey=${API_KEY}&s=${genre}&type=movie`;
          fetch(recommendationsURL)
            .then((res) => res.json())
            .then((data) => {
              showRecommendations(data.Search);
            });
        });
    });
}

function showMovies(data) {
  main.innerHTML = "";
  data.forEach((movie) => {
    const { Title, Poster, imdbRating, Plot } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${Poster}" alt="${Title}">
        <div class="movie-info">
                <h3>${Title}</h3>
                <span class="${getColor(imdbRating)}">${imdbRating}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${Plot}
        </div>
        `;

    main.appendChild(movieEl);
  });
}

function showRecommendations(data) {
  recommendations.innerHTML = "";
  data.forEach((movie) => {
    const { Title, Poster, imdbRating, Plot } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${Poster}" alt="${Title}">
        <div class="movie-info">
                <h3>${Title}</h3>
                <span class="${getColor(imdbRating)}">${imdbRating}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${Plot}
        </div>
        `;

    recommendations.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm) {
    const searchApiUrl = `${searchURL}&s=${searchTerm}`;
    getMovies(searchApiUrl);
    getRecommendations(searchTerm);
    recommendationsHeader.hidden = false;
  } else {
    getMovies(API_URL);
  }
}); */

