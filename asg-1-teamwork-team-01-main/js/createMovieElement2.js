function createMovieElementAPI(movieObj) {
  // sessionStorage.setItem(uniqueID, JSON.stringify(movieObj))
  let isFav = false;
  let localStorageKeys = []
  for (let key in localStorage) {
    localStorageKeys.push(key)
  }
  if (localStorageKeys.includes(movieObj.id+'')) {
    isFav = true
  }
  // if (localStorage.getItem(movieObj.id) == movieObj.id) {
  //   isFav = true;
  // }
  const baseURL = "https://image.tmdb.org/t/p/w185/";

  const outterDiv = document.createElement("div");
  outterDiv.classList =
    "row center seperator mobile-container outterDiv-container";

  const innerDiv = document.createElement("div");
  innerDiv.classList = "row";

  const imageContainer = document.createElement("div");
  imageContainer.classList = "col s2 dynamic-height-poster";

  const moviePoster = document.createElement("IMG");
  moviePoster.classList = `poster poster-mobile`;
  moviePoster.dataset.movieIndex = movieObj.id;
  moviePoster.src = baseURL + movieObj["poster_path"];

  imageContainer.appendChild(moviePoster);
  innerDiv.appendChild(imageContainer);

  const titleContainer = document.createElement("div");
  titleContainer.classList = "col s4 margin4K dynamic-height";

  const titleComponent = document.createElement("h6");
  titleComponent.classList = `movies dynamic-title`;
  titleComponent.dataset.movieIndex = movieObj.id;
  titleComponent.textContent = movieObj["title"];

  titleContainer.appendChild(titleComponent);
  innerDiv.appendChild(titleContainer);

  const yearContainer = document.createElement("div");
  yearContainer.classList = "col s2 margin4K dynamic-height";

  const yearComponent = document.createElement("h6");
  yearComponent.classList = "movies dynamic-year";
  yearComponent.textContent = movieObj[
    "release_date"
  ].substring(0, 4);

  yearContainer.appendChild(yearComponent);
  innerDiv.appendChild(yearContainer);

  const ratingContainer = document.createElement("div");
  ratingContainer.classList = "col s2 margin4K dynamic-height";

  const ratingComponent = document.createElement("h6");
  ratingComponent.classList = "movies dynamic-rating";
  ratingComponent.textContent = movieObj["vote_average"];

  ratingContainer.appendChild(ratingComponent);
  innerDiv.appendChild(ratingContainer);

  const favouriteContainer = document.createElement("div");
  favouriteContainer.classList = "col s1 dynamic-height fav-shift";

  const favouriteComponent = document.createElement("I");
  favouriteComponent.classList = "far fa-heart fav-icon";
  favouriteComponent.dataset.movieIndex = movieObj.id;
  if (isFav) {
    favouriteComponent.classList = "far fa-heart fav-icon toggle-fav";
  }
  favouriteContainer.appendChild(favouriteComponent);
  innerDiv.appendChild(favouriteContainer);

  outterDiv.appendChild(innerDiv);

  return outterDiv;
}
