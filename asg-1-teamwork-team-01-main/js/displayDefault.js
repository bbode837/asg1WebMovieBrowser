
function displayDefault(numMovies) {
  let defaultPage = document.querySelector("#defaultview")
  defaultPage.style.display = "block"

  let randomArray = []
  const defaultMoviesIndecies = [3, 5, 302, 101, 55, 361, 369, 461, 525, 603]
  let homePage = document.querySelector("#homePage")
  let detailsPage = document.querySelector("#detailsPage")
  let movieBox = document.querySelector("#movie-box")

  // debugger
  homePage.style.display = 'none'
  detailsPage.style.display = 'none'

  if (numMovies == 0) {
    while (movieBox.firstChild) {
      movieBox.removeChild(movieBox.firstChild)
    }
    const noMoviesToShow = document.createElement("h6")
    noMoviesToShow.classList = 'center no-movie-header'
    noMoviesToShow.textContent = "No movies to show"
    movieBox.appendChild(noMoviesToShow)
  } else if (numMovies > 0) {
    while (movieBox.firstChild) {
      movieBox.removeChild(movieBox.firstChild)
    }
    for (let i = 0; i < numMovies; i++) {
      randomArray.push(Math.floor(Math.random() * (655 - 1) + 1))
    }

    randomArray.forEach(index => movieBox.appendChild(createMovieElement(index)))

  } else if (numMovies == undefined) {
    while (movieBox.firstChild) {
      movieBox.removeChild(movieBox.firstChild)
    }
    defaultMoviesIndecies.forEach(index => movieBox.appendChild(createMovieElement(index)))
  }
}
