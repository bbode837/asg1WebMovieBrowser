
document.addEventListener("DOMContentLoaded", () => {
  //Starter
  let idsArray;
  let defaultPage = document.querySelector("#defaultview");
  let detailsPage = document.querySelector("#detailsPage");
  let homePage = document.querySelector("#homePage");
  let searchButton = document.querySelector("#homePage-search-button-matching");
  let searchBox = document.querySelector("#movie-search");
  let movieBox = document.querySelector("#movie-box");
  let searchedMovie;
  let searchInput = document.querySelector("#movie-search");
  const favButton = document.querySelector("#favButton");

  detailsPage.style.display = "none";
  defaultPage.style.display = "none";

  if (searchBox.value == "") {
    searchButton.setAttribute("disabled", "");
  }

  ["input", "keydown"].forEach((eventType) =>
    searchBox.addEventListener(eventType, (e) => {
      movieBox.replaceChildren();
      if (e.keyCode == 13) {
        e.preventDefault();
        searchButton.click();
      }
      searchBox.value = e.target.value;
      searchedMovie = e.target.value;
      searchButton.removeAttribute("disabled", "");
      if (searchBox.value.length == 0) {
        searchButton.setAttribute("disabled", "");
      }
      if (searchBox.value.length > 0) {
        favButton.setAttribute("disabled", "");
      } else {
        favButton.removeAttribute("disabled", "");
      }
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&query=${searchedMovie}&page=1`
      )
        .then((response) => response.json())
        .then((movies) => autocomplete(inp, movies.results));
    })
  );

  favButton.addEventListener("click", () => {
    homePage.style.display = "none";
    defaultPage.style.display = "block";

    if (localStorage.length == 0) {
      const noMoviesToShow = document.createElement("h6");
      noMoviesToShow.classList = "center no-movie-header";
      noMoviesToShow.textContent = "No movies to show";
      movieBox.appendChild(noMoviesToShow);
    }
    const items = {
      ...localStorage,
    };

    let detailsObject;
    let favMovies = [];
    for (let item in items) {
      detailsObject = JSON.parse(localStorage.getItem(item));
      favMovies.push(detailsObject);
    }

    const sortedFavs = favMovies.sort((movie1, movie2) =>
      movie1["original_title"].localeCompare(movie2["original_title"])
    );

    sortedFavs.forEach((fav) =>
      movieBox.appendChild(createMovieElementAPI(fav))
    );
    // sortedFavs.forEach((fav) => console.log(fav));
  });

  const getMovieDetails = (listOfMovies) => {
    if (listOfMovies.length == 0) {
      console.log("nothing to show");
      homePage.style.display = "none";
      defaultPage.style.display = "block";

      const noMoviesToShow = document.createElement("h6");
      noMoviesToShow.classList = "center no-movie-header";
      noMoviesToShow.textContent = "No movies to show";
      movieBox.appendChild(noMoviesToShow);
    }
    const sortedMovies = listOfMovies.sort((movie1, movie2) =>
      movie1["original_title"].localeCompare(movie2["original_title"])
    );

    sortedMovies.forEach((movie) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`
      )
        .then((response) => response.json())
        .then((object) => createMovieElementAPI(object))
        .then((div) => insertMovies(div));
    });

    sortedMovies.forEach((movie) => {
      getAllInfo(movie.id);
    });
  };
  const insertMovies = (div) => {
    if (div == undefined) {
      console.log("nothing to show");
    } else {
      homePage.style.display = "none";
      defaultPage.style.display = "block";
      movieBox.appendChild(div);
    }
  };

  const getAllInfo = (movieId) => {
    const urls = [
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
      `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=325f1fbb49366fab4ffcaaea71f3dcb6`,
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
    ];

    Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then(
      (objs) => setSessionStorageItems(movieId, objs)
    );
  };

  const setSessionStorageItems = (id, objs) => {
    sessionStorage.setItem(`${id} - details`, JSON.stringify(objs[0]));
    sessionStorage.setItem(
      `${id} - keywords`,
      JSON.stringify(objs[1].keywords)
    );
    sessionStorage.setItem(`${id} - cast`, JSON.stringify(objs[2].cast));
    sessionStorage.setItem(`${id} - crew`, JSON.stringify(objs[2].crew));
    sessionStorage.setItem(`${id} - youtube`, JSON.stringify(objs[3].results));
  };

  // https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript

  function toSentenceCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  searchButton.addEventListener("click", () => {
    const titleToSearch = toSentenceCase(searchedMovie);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&query=${titleToSearch}&page=1`
    )
      .then((repsone) => repsone.json())
      .then((movies) => getMovieDetails(movies.results));
  });

  let inputtitle = document.querySelector("#movie-search");
  let titletodefault = inputtitle.value;
  let titleFilter = document.querySelector(
    "[placeholder='Eg. Spiderman: No Way Home']"
  );

  titleFilter.value = titletodefault;

  let inp = document.getElementById("movie-search");

  // help from https://www.w3schools.com/howto/howto_js_autocomplete.asp
  function autocomplete(inp, arr) {
    searchInput.addEventListener("keydown", (e) => {
      inp = document.getElementById("movie-search");

      if (inp.value.length > 1) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        let currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
          let a,
            b,
            i,
            val = this.value;
          /*close any already open lists of autocompleted values*/
          closeAllLists();
          if (!val) {
            return false;
          }
          currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");

          if (inp.value.length <= 2) {
            a.style.display = "none";
          }
          /*append the DIV element as a child of the autocomplete container:*/
          this.parentNode.appendChild(a);
          /*for each item in the array...*/
          arr.forEach((movie) => {
            /*check if the item starts with the same letters as the text field value:*/

            if (
              movie["original_title"].substr(0, val.length).toUpperCase() ==
              val.toUpperCase()
            ) {
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              let strong = document.createElement("strong");
              strong.textContent = movie["original_title"].substr(
                0,
                val.length
              );
              strong.textContent += movie["original_title"].substr(val.length);

              let hiddenAuto = document.createElement("input");
              hiddenAuto.type = "hidden";
              hiddenAuto.value = movie["original_title"];

              b.append(strong);
              strong.append(hiddenAuto);

              /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function (e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                searchedMovie = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
              });
              a.appendChild(b);
            }
          });
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
          let x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
          }
        });

        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
          // let strongText = document.querySelector("strong");
          // let autoTitle = strongText.textContent;
          // console.log(autoTitle);
          closeAllLists(e.target);
        });
      }
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
    });
  }
});
