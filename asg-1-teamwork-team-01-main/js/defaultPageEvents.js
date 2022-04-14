document.addEventListener("DOMContentLoaded", () => {
  const detailsPage = document.querySelector("#detailsPage");
  const defaultPage = document.querySelector("#defaultview");
  const homePage = document.querySelector("#homePage");

  let movieBox = document.querySelector("#movie-box");
  let movieHolder = document.querySelector(".movie-holder");

  const defaultheader = document.querySelector(".defaultheaderevent");
  const filterDiv = document.querySelector(".filter-div");
  const filterToggle = document.querySelector(".switch");

  defaultheader.addEventListener("click", () => {
    sessionStorage.clear();
    homePage.style.display = "block";
    detailsPage.style.display = "none";
    defaultPage.style.display = "none";
    while (movieBox.firstChild) {
      movieBox.removeChild(movieBox.firstChild);
    }
    let titleSearchBox = document.querySelector("#movie-search");
    titleSearchBox.value = "";
    let searchButton = document.querySelector(
      "#homePage-search-button-matching"
    );
    searchButton.setAttribute("disabled", "");
    favButton.removeAttribute("disabled", "");
  });

  let savefilter = document.querySelector("[title='Filter']");

  //saves filter data on click
  savefilter.addEventListener("click", saveFilterData);

  let titleFilter = document.querySelector(
    "[placeholder='Eg. Spiderman: No Way Home']"
  );
  let beforeYear = document.querySelector("[placeholder='Eg. 1999']");
  let afterYear = document.querySelector("[placeholder='Eg. 2010']");
  let earlyBetweenYear = document.querySelector("[placeholder='Eg. 2008']");
  let lateBetweenYear = document.querySelector("[placeholder='Eg. 2015']");

  let belowRating = document.querySelector("#aboveInputId");
  let aboveRating = document.querySelector("#aboveInputIdrange");
  let lowBetweenRating = document.querySelector("#betweenInputId");
  let highBetweenRating = document.querySelector("#between1InputId");

  //saves filter data and checks if theres values
  function saveFilterData() {
    let titleFilterValue = titleFilter.value;
    let beforeYearValue = beforeYear.value;
    let afterYearValue = afterYear.value;
    let earlyBetweenYearValue = earlyBetweenYear.value;
    let lateBetweenYearValue = lateBetweenYear.value;

    let belowRatingValue = belowRating.value;
    let aboveRatingValue = aboveRating.value;
    let lowBetweenRatingValue = lowBetweenRating.value;
    let highBetweenRatingValue = highBetweenRating.value;
    let allRadio = document.querySelectorAll("[type='radio']");
    if (
      titleFilterValue == "" &&
      (!allRadio[0].checked || beforeYearValue == "") &&
      (!allRadio[1].checked || afterYearValue == "") &&
      (!allRadio[2].checked ||
        earlyBetweenYearValue == "" ||
        lateBetweenYearValue == "") &&
      !allRadio[3].checked &&
      !allRadio[4].checked &&
      !allRadio[5].checked
    ) {
      let warnMess = document.querySelector(".filterWarn");
      warnMess.style.display = "block";
    }
  }

  const backSearchButton = document.querySelector(".detailsbuttonup");

  backSearchButton.addEventListener("click", () => {
    detailsPage.style.display = "none";
    defaultPage.style.display = "block";
    let titleFilterValue = titleFilter.value;
    let beforeYearValue = beforeYear.value;
    let afterYearValue = afterYear.value;
    let earlyBetweenYearValue = earlyBetweenYear.value;
    let lateBetweenYearValue = lateBetweenYear.value;

    let belowRatingValue = belowRating.value;
    let aboveRatingValue = aboveRating.value;
    let lowBetweenRatingValue = lowBetweenRating.value;
    let highBetweenRatingValue = highBetweenRating.value;
  });

  let belowtext = document.querySelector("#beforeOutputId");
  let abovetext = document.querySelector("#aboveOutputId");
  let lowbetweentext = document.querySelector("#betweenOutputId");
  let highbetweentext = document.querySelector("#between1OutputId");
  let clearfilter = document.querySelector("[title='Clear']");
  let radioButtons = document.querySelectorAll(".radioFilter");

  //saves filter data on click
  clearfilter.addEventListener("click", emptyClear);

  function emptyClear() {
    if (
      !(
        titleFilter.value == "" &&
        beforeYear.value == "" &&
        afterYear.value == "" &&
        earlyBetweenYear.value == "" &&
        lateBetweenYear.value == "" &&
        belowRating.value == "0" &&
        aboveRating.value == "0" &&
        lowBetweenRating.value == "0" &&
        highBetweenRating.value == "10"
      )
    ) {
      console.log("hey");
      titleFilter.value = "";
      beforeYear.value = "";
      afterYear.value = "";
      earlyBetweenYear.value = "";
      lateBetweenYear.value = "";
      belowRating.value = "0";
      belowtext.textContent = "0";
      aboveRating.value = "0";
      abovetext.textContent = "0";
      lowBetweenRating.value = "0";
      lowbetweentext.textContent = "0";
      highBetweenRating.value = "0";
      highbetweentext.textContent = "0";
      radioButtons.forEach((input) => (input.checked = false));
      movieBox.replaceChildren();

      let titleFilterValue = titleFilter.value;
      let beforeYearInputValue = parseInt(beforeYearInput.value);
      let afterYearInputValue = afterYearInput.value;
      let betweenlowYearInputValue = betweenlowYearInput.value;
      let betweenhighYearInputValue = betweenhighYearInput.value;
      let belowRatingInputValue = parseFloat(belowRatingSlider.value);
      let aboveRatingSliderValue = parseFloat(aboveRatingSlider.value);
      let betweenRatingSliderLowValue = parseFloat(
        betweenRatingSliderLow.value
      );
      let betweenRatingSliderHighValue = parseFloat(
        betweenRatingSliderHigh.value
      );

      let detailsArrayCompleted = getAllDetailsFromSessionStorage();

      if (titleFilterValue != "") {
        detailsArrayCompleted = detailsArrayCompleted.filter((movie) =>
          movie["original_title"]
            .toLowerCase()
            .includes(titleFilterValue.toLowerCase())
        );
      }
      //   fetch(
      //     `https://api.themoviedb.org/3/search/movie?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&query=${titleFilterValue}&page=1`
      //   )
      //     .then((repsone) => repsone.json())
      //     .then((movies) => getMovieDetailsFilter(movies.results));
      // }

      if (beforeYearRadio.checked) {
        console.log("before year checked");
        detailsArrayCompleted = detailsArrayCompleted.filter(
          (movie) =>
            parseInt(movie["release_date"].substr(0, 4)) <= beforeYearInputValue
        );
      }

      if (betweenYearRadio.checked) {
        console.log("between year checked");

        console.log("after year checked");

        if (betweenlowYearInputValue > betweenhighYearInputValue) {
          let warnMess = document.querySelector(".filterWarn");
          warnMess.style.display = "block";
          warnMess.textContent = "First Year Must Be Less Than Second Year";
        } else if (
          betweenlowYearInputValue != "" &&
          betweenhighYearInputValue != "" &&
          betweenYearRadio.checked == true
        ) {
          let lowerLimitFilter = detailsArrayCompleted.filter(
            (movie) =>
              parseInt(movie["release_date"].substr(0, 4)) >=
              betweenlowYearInputValue
          );
          detailsArrayCompleted = lowerLimitFilter.filter(
            (movie) =>
              parseInt(movie["release_date"].substr(0, 4)) <=
              betweenhighYearInputValue
          );
        }
      }

      if (afterYearRadio.checked) {
        console.log("between year checked");
        detailsArrayCompleted = detailsArrayCompleted.filter(
          (movie) =>
            parseInt(movie["release_date"].substr(0, 4)) >= afterYearInputValue
        );
      }

      if (belowRatingRadio.checked) {
        console.log("below rating checked");
        detailsArrayCompleted = detailsArrayCompleted.filter(
          (movie) => parseFloat(movie["vote_average"]) <= belowRatingInputValue
        );
      }

      if (aboveRatingRadio.checked) {
        console.log("after rating checked");
        detailsArrayCompleted = detailsArrayCompleted.filter(
          (movie) => parseFloat(movie["vote_average"]) >= aboveRatingSliderValue
        );
      }

      if (betweenRatingRadio.checked) {
        console.log("between rating checked");

        if (betweenRatingSliderHighValue < betweenRatingSliderLowValue) {
          let warnMess = document.querySelector(".filterWarn");
          warnMess.style.display = "block";
          warnMess.textContent = "First Rating Must Be Less Than Second Rating";
        } else if (
          betweenRatingSliderHighValue != "" &&
          betweenRatingSliderLowValue != "" &&
          betweenRatingRadio.checked == true
        ) {
          let lowerLimitFilter = detailsArrayCompleted.filter(
            (movie) =>
              parseFloat(movie["vote_average"]) >= betweenRatingSliderLowValue
          );
          detailsArrayCompleted = lowerLimitFilter.filter(
            (movie) =>
              parseFloat(movie["vote_average"]) <= betweenRatingSliderHighValue
          );
        }
      }

      detailsArrayCompleted = detailsArrayCompleted.sort((movie1, movie2) =>
        movie1["original_title"].localeCompare(movie2["original_title"])
      );

      let forEachArray = detailsArrayCompleted;
      if (forEachArray.length == 0) {
        const noMoviesToShow = document.createElement("h6");
        noMoviesToShow.classList = "center no-movie-header";
        noMoviesToShow.textContent = "No movies to show";
        movieBox.appendChild(noMoviesToShow);
      }

      forEachArray.forEach((movie) => {
        const filteredDiv = createMovieElementAPI(movie);

        insertMoviesFiltered(filteredDiv);
      });
    }
  }

  movieHolder.addEventListener("click", (e) => {
    if (
      e.target.className == "far fa-heart fav-icon" ||
      e.target.className == "far fa-heart fav-icon toggle-fav"
    ) {
      e.target.classList.toggle("toggle-fav");
    }

    if (e.target.className == "far fa-heart fav-icon") {
      if (localStorage.length != 0) {
        const favMovieID = parseInt(e.target.dataset.movieIndex);
        localStorage.removeItem(favMovieID);
      }
    }

    if (e.target.className == "far fa-heart fav-icon toggle-fav") {
      const favMovieID = parseInt(e.target.dataset.movieIndex);

      localStorage.setItem(favMovieID, getMovieDetailsObject(favMovieID));
    }

    if (
      e.target.tagName == "IMG" ||
      e.target.className.includes("dynamic-title")
    ) {
      let movieIndex = parseInt(e.target.dataset.movieIndex);
      console.log(movieIndex);
      const movieObject = createMovieObject(movieIndex);
      console.log(movieObject)
      showMovieDetails(movieObject);
    }
  });

  const slidesDefault = document.querySelectorAll("[type='range']");
  const beforeRateId = document.querySelector("#beforeOutputId");
  const aboveRateId = document.querySelector("#aboveOutputId");
  const lowBetweenId = document.querySelector("#betweenOutputId");
  const highBetweenId = document.querySelector("#between1OutputId");

  slidesDefault[0].addEventListener("click", () => {
    beforeRateId.textContent = slidesDefault[0].value;
  });
  slidesDefault[0].addEventListener("touchstart", () => {
    beforeRateId.textContent = slidesDefault[0].value;
  });

  slidesDefault[1].addEventListener("click", () => {
    aboveRateId.textContent = slidesDefault[1].value;
  });
  slidesDefault[1].addEventListener("touchstart", () => {
    aboveRateId.textContent = slidesDefault[1].value;
  });

  slidesDefault[2].addEventListener("click", () => {
    lowBetweenId.textContent = slidesDefault[2].value;
  });
  slidesDefault[2].addEventListener("touchstart", () => {
    lowBetweenId.textContent = slidesDefault[2].value;
  });

  slidesDefault[3].addEventListener("click", () => {
    highBetweenId.textContent = slidesDefault[3].value;
  });
  slidesDefault[3].addEventListener("touchstart", () => {
    highBetweenId.textContent = slidesDefault[3].value;
  });

  const filterButton = document.querySelector(".toggle-text");
  const movieFilterPanel = document.querySelector(".filters-div");
  const listPanel = document.querySelector(".movie-holder");

  function wideList() {
    movieFilterPanel.style.display = "none";
    listPanel.style.width = "100%";
  }

  function wideFil() {
    movieFilterPanel.classList.add("filterFadeIn");
    movieFilterPanel.classList.remove("filterFadeOut");
  }

  const mediaWidth = window.matchMedia("(max-width: 450px)");
  const tabletWidth = window.matchMedia(
    "(min-width: 427px) and (max-width: 769px)"
  );

  filterButton.addEventListener("click", () => {
    if (filterButton.textContent == "Show filters") {
      movieFilterPanel.style.display = "block";
      setTimeout(wideFil, 0);

      listPanel.style.float = "right";
      if (mediaWidth.matches) {
        listPanel.style.width = "100%";
      } else {
        listPanel.style.width = "66.6666666667%";
      }
      if (tabletWidth.matches) {
        listPanel.style.width = "60%";
      }

      filterButton.textContent = "Hide filters";
    } else {
      movieFilterPanel.classList.add("filterFadeOut");
      movieFilterPanel.classList.remove("filterFadeIn");

      setTimeout(wideList, 900);
      filterButton.textContent = "Show filters";
    }
  });

  const showMovieDetails = (movieObject) => {
    defaultPage.style.display = "none";
    detailsPage.style.display = "block";

    const movieToRender = movieObject;
    console.log(movieToRender);

    const title = movieToRender.title();
    const genres = movieToRender.genres();
    const cast = movieToRender.cast();
    const crew = movieToRender.crew();
    const keywords = movieToRender.keywords();
    const budget = movieToRender.budget();
    const companies = movieToRender.companies();
    const countries = movieToRender.country();
    const mobilePoster = movieToRender.mobileSizePoster();
    const laptopPoster = movieToRender.laptopSizePoser();
    const releaseDate = movieToRender.releaseDate();
    const revenue = movieToRender.revenue();
    const runtime = movieToRender.runtime();
    const tagline = movieToRender.tagline();
    const overview = movieToRender.overview();
    const imdbID = movieToRender.imdbID();
    const tmdbID = movieToRender.tmdbID();
    const IMDBLink = `https://www.imdb.com/title/${imdbID}`;
    const TMDBLink = `https://www.themoviedb.org/movie/${tmdbID}`;
    const movieRating = movieToRender.rating();
    const youtubeEmbedLink = movieToRender.youtubeLink();

    const poster = document.querySelector(".poster-images-dynamic");
    const movieTitleBox = document.querySelector("#movietitleBox");
    const genresContainer = document.querySelector(".genres-dynamic");
    const keywordContainer = document.querySelector(".keyword-dynamic");
    const companiesContianer = document.querySelector(".comp-details");
    const countriesContiner = document.querySelector(".country-details");
    const budgetContainer = document.querySelector(".budget-details");
    const iFrameComponent = document.querySelector(".responsive-iframe");

    const imageLaptop = document.createElement("IMG");
    imageLaptop.src = laptopPoster;
    imageLaptop.alt = `${title} banner`;
    imageLaptop.classList = "image-details";
    poster.appendChild(imageLaptop);

    const imageMobile = document.createElement("IMG");
    imageMobile.src = mobilePoster;
    imageMobile.alt = `${title} banner`;
    imageMobile.classList = "imagesmall-details";
    poster.appendChild(imageMobile);

    const titleOfMovie = document.createElement("h5");
    titleOfMovie.textContent = `${title} `;
    titleOfMovie.classList = "center title-details movie-title-event";

    const speaker = document.createElement("i");
    speaker.classList = "fas fa-volume-up";
    speaker.setAttribute("id", "speakerBtn");
    speaker.dataset.movieTitle = titleOfMovie.textContent;
    titleOfMovie.appendChild(speaker);
    movieTitleBox.appendChild(titleOfMovie);

    const genresParagraph = document.createElement("p");
    genresParagraph.setAttribute("id", "genreP");

    const genresHeader = document.createElement("h6");
    genresHeader.classList = "info-content-headers-details";
    genresHeader.textContent = "Genres";
    genresContainer.appendChild(genresHeader);

    genres.forEach((genre) => {
      let element = document.createElement("span");
      element.classList = "kwordbox-details";
      element.textContent = genre;
      genresParagraph.appendChild(element);
    });
    genresContainer.appendChild(genresParagraph);

    const keywordParagraph = document.createElement("p");

    const keywordHeader = document.createElement("h6");
    keywordHeader.classList = "info-content-headers-details";
    keywordHeader.textContent = "Keywords";
    keywordContainer.appendChild(keywordHeader);

    keywordParagraph.setAttribute("id", "keywordP");
    keywords.splice(1, 3).forEach((keyword) => {
      let element = document.createElement("span");
      element.classList = "kwordbox-details";
      element.textContent = keyword;
      keywordParagraph.appendChild(element);
    });
    // const showMore = document.createElement("span");
    // showMore.textContent = "...";
    // keywordParagraph.appendChild(showMore);

    const more = document.createElement("span");
    // more.setAttribute("id", "more");
    keywords.forEach((keyword) => {
      let element = document.createElement("span");
      element.classList = "kwordbox-details";
      element.textContent = keyword;
      more.appendChild(element);
    });
    keywordParagraph.appendChild(more);
    keywordContainer.appendChild(keywordParagraph);

    const companiesParagraph = document.createElement("p");

    const companiesHeader = document.createElement("h6");
    companiesHeader.classList = "info-content-headers-details";
    companiesHeader.textContent = "Companies";
    companiesContianer.appendChild(companiesHeader);

    companiesParagraph.setAttribute("id", "companiesP");
    companies.forEach((keyword) => {
      let element = document.createElement("span");
      element.classList = "kwordbox-details compTab";
      element.textContent = keyword;
      companiesParagraph.appendChild(element);
    });
    companiesContianer.appendChild(companiesParagraph);

    const countriesParagraph = document.createElement("p");

    const countiresHeader = document.createElement("h6");
    countiresHeader.classList = "info-content-headers-details";
    countiresHeader.textContent = "Countires";
    countriesContiner.appendChild(countiresHeader);

    countriesParagraph.setAttribute("id", "countriesP");
    countries.forEach((keyword) => {
      let element = document.createElement("span");
      element.classList = "kwordbox-details countTab";
      element.textContent = keyword;
      countriesParagraph.appendChild(element);
    });
    countriesContiner.appendChild(countriesParagraph);

    const budgetParagraph = document.createElement("p");

    const budgetHeader = document.createElement("h6");
    budgetHeader.classList = "info-content-headers-details";
    budgetHeader.textContent = "Budget";
    budgetContainer.appendChild(budgetHeader);

    budgetParagraph.setAttribute("id", "budgetP");
    const budgetFormatted = budget
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    budgetParagraph.textContent = `$ ${budgetFormatted}`;
    budgetContainer.appendChild(budgetParagraph);

    const releaseDateContainer = document.querySelector(
      ".release-date-dynamic"
    );
    const revenueContainer = document.querySelector("#dynamic-revenue");
    const runtimeContainer = document.querySelector("#dynamic-runtime");

    const releaseDateContent = document.createElement("p");

    const releaseHeader = document.createElement("h6");
    releaseHeader.classList = "info-content-headers-details";
    releaseHeader.textContent = "Release Date";
    releaseDateContainer.appendChild(releaseHeader);

    budgetParagraph.setAttribute("id", "releaseP");
    releaseDateContent.textContent = releaseDate;
    releaseDateContainer.appendChild(releaseDateContent);

    const revenueContent = document.createElement("p");

    const revenueHeader = document.createElement("h6");
    revenueHeader.classList = "info-content-headers-details";
    revenueHeader.textContent = "Revenue";
    revenueContainer.appendChild(revenueHeader);

    revenueContent.setAttribute("id", "revenueP");
    const revenueFormatted = revenue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    revenueContent.textContent = `$ ${revenueFormatted}`;
    revenueContainer.appendChild(revenueContent);

    const runtimeContent = document.createElement("p");

    const runtimeHeader = document.createElement("h6");
    runtimeHeader.classList = "info-content-headers-details";
    runtimeHeader.textContent = "Runtime";
    runtimeContainer.appendChild(runtimeHeader);

    runtimeContent.setAttribute("id", "runtimeP");
    const runtimeHour = Math.floor(runtime / 60);
    const runtimeMinute = Math.floor(runtime - runtimeHour * 60);
    const runtimeFormatted = `${runtimeHour}h ${runtimeMinute}m`;
    runtimeContent.textContent = runtimeFormatted;
    runtimeContainer.append(runtimeContent);

    const taglineContainer = document.querySelector("#tagline");
    const IMDBContent = document.querySelector("#IMDB");
    const TMDBContent = document.querySelector("#TMDB");

    const taglineContent = document.createElement("p");

    const taglineHeader = document.createElement("h6");
    taglineHeader.classList = "info-content-headers-details";
    taglineHeader.textContent = "Tagline";
    taglineContainer.appendChild(taglineHeader);

    taglineContent.setAttribute("id", "tagP");
    taglineContent.textContent = tagline;
    taglineContainer.appendChild(taglineContent);

    IMDBContent.setAttribute("href", IMDBLink);
    IMDBContent.setAttribute("target", `${title} - IMDB`);

    TMDBContent.setAttribute("href", TMDBLink);
    TMDBContent.setAttribute("target", `${title} - TMDB`);

    const overviewContainer = document.querySelector(".overview");
    const popularityContainer = document.querySelector("#popularity");
    const averageContainer = document.querySelector("#average");
    const countContainer = document.querySelector("#count");

    const overviewParagraph = document.createElement("p");

    const overviewHeader = document.createElement("h6");
    overviewHeader.classList = "info-content-headers-details";
    overviewHeader.textContent = "Overview";
    overviewContainer.appendChild(overviewHeader);

    overviewParagraph.setAttribute("id", "overviewP");
    overviewParagraph.textContent = overview;
    overviewContainer.appendChild(overviewParagraph);

    popularityContainer.textContent += `Popularity: ${movieRating[0]}`;
    averageContainer.textContent += `Average: ${movieRating[1]}`;

    countContainer.textContent += `Count: ${movieRating[2]}`;

    const popularityIcon = document.createElement("i");
    popularityIcon.classList = "fas fa-fire padright";
    popularityContainer.prepend(popularityIcon);

    const aveargeIcon = document.createElement("i");
    aveargeIcon.classList = "fas fa-star-half-alt padright";
    averageContainer.prepend(aveargeIcon);
    const countIcon = document.createElement("i");
    countIcon.classList = "fas fa-calculator padright";
    countContainer.prepend(countIcon);

    const castBox = document.querySelector("#castBox");
    cast.forEach((member) => {
      const holder = document.createElement("div");
      holder.classList = "row";
      const name = document.createElement("div");
      name.classList = "col s6";
      holder.appendChild(name);
      const nameParaghraph = document.createElement("p");
      nameParaghraph.textContent = member.name;
      name.appendChild(nameParaghraph);

      const role = document.createElement("div");
      role.classList = "col s6";
      holder.appendChild(role);
      const roleParagraph = document.createElement("p");
      roleParagraph.textContent = member.character;
      role.appendChild(roleParagraph);

      holder.appendChild(role);

      castBox.appendChild(holder);
    });

    const crewBox = document.querySelector("#crewBox");
    crew.forEach((member) => {
      const holder = document.createElement("div");
      holder.classList = "row";
      const name = document.createElement("div");
      name.classList = "col s5";
      holder.appendChild(name);
      const nameParaghraph = document.createElement("p");
      nameParaghraph.textContent = member.name;
      name.appendChild(nameParaghraph);

      const job = document.createElement("div");
      job.classList = "col s7";
      holder.appendChild(job);
      const jobParagraph = document.createElement("p");
      jobParagraph.textContent = `${member.department} - ${member.job}`;
      job.appendChild(jobParagraph);

      holder.appendChild(job);
      crewBox.appendChild(holder);
    });

    iFrameComponent.setAttribute(
      "src",
      `https://www.youtube.com/embed/${youtubeEmbedLink}`
    );
  };

  const createMovieObject = (movieID) => {
    const details = sessionStorage.getItem(`${movieID} - details`);
    const keywords = sessionStorage.getItem(`${movieID} - keywords`);
    const cast = sessionStorage.getItem(`${movieID} - cast`);
    const crew = sessionStorage.getItem(`${movieID} - crew`);
    const youtube = sessionStorage.getItem(`${movieID} - youtube`);

    return new selectedMovie(details, keywords, cast, crew, youtube);
  };

  //grabbing all the sliders and radio buttons then when one radio button is pressed, the others will
  // not be checked (.checked = false) and the value gets cleared to the starting value (0 or empty string)

  let belowRatingSlider = document.querySelector("input#aboveInputId");
  let aboveRatingSlider = document.querySelector("input#aboveInputIdrange");
  let betweenRatingSliderLow = document.querySelector("input#betweenInputId");
  let betweenRatingSliderHigh = document.querySelector("input#between1InputId");
  let belowRatingRadio = document.querySelector(".belowratingradio");
  let aboveRatingRadio = document.querySelector(".aboveratingradio");
  let betweenRatingRadio = document.querySelector(".betweenratingradio");

  let beforeYearRadio = document.querySelector(".beforeyearradio");
  let afterYearRadio = document.querySelector(".afteryearradio");
  let betweenYearRadio = document.querySelector(".betweenyearradio");
  let beforeYearInput = document.querySelector(".beforeInput");
  let afterYearInput = document.querySelector(".afterInput");
  let betweenlowYearInput = document.querySelector(".betweenInputlow");
  let betweenhighYearInput = document.querySelector(".betweenInputhigh");
  let searchButton = document.querySelector("#homePage-search-button-matching");

  searchButton.addEventListener("click", () => {
    belowRatingSlider.value = "0";
    beforeRateId.textContent = "0";
    aboveRatingSlider.value = "0";
    aboveRateId.textContent = "0";
    betweenRatingSliderLow.value = "0";
    betweenRatingSliderHigh.value = "0";
    belowRatingRadio.checked = false;
    aboveRatingRadio.checked = false;
    betweenRatingRadio.checked = false;
    lowBetweenRating.value = "0";
    lowbetweentext.textContent = "0";
    highBetweenRating.value = "0";
    highbetweentext.textContent = "0";
    titleFilter.value = "";
    beforeYearInput.value = "";
    afterYearInput.value = "";
    betweenlowYearInput.value = "";
    betweenhighYearInput.value = "";
    belowRatingRadio.checked = false;
    beforeYearRadio.checked = false;
    afterYearRadio.checked = false;
    betweenYearRadio.checked = false;
  });

  beforeYearRadio.addEventListener("click", () => {
    afterYearInput.value = "";
    betweenlowYearInput.value = "";
    betweenhighYearInput.value = "";

    afterYearRadio.checked = false;
    betweenYearRadio.checked = false;
  });

  afterYearRadio.addEventListener("click", () => {
    beforeYearInput.value = "";
    betweenlowYearInput.value = "";
    betweenhighYearInput.value = "";

    beforeYearRadio.checked = false;
    betweenYearRadio.checked = false;
  });

  betweenYearRadio.addEventListener("click", () => {
    beforeYearInput.value = "";
    afterYearInput.value = "";

    beforeYearRadio.checked = false;
    afterYearRadio.checked = false;
  });

  belowRatingRadio.addEventListener("click", () => {
    aboveRatingSlider.value = "0";
    aboveRateId.textContent = "0";
    betweenRatingSliderLow.value = "0";
    betweenRatingSliderHigh.value = "0";
    aboveRatingRadio.checked = false;
    betweenRatingRadio.checked = false;
    lowBetweenRating.value = "0";
    lowbetweentext.textContent = "0";
    highBetweenRating.value = "0";
    highbetweentext.textContent = "0";
  });

  aboveRatingRadio.addEventListener("click", () => {
    belowRatingSlider.value = "0";
    beforeRateId.textContent = "0";
    betweenRatingSliderLow.value = "0";
    betweenRatingSliderHigh.value = "0";
    belowRatingRadio.checked = false;
    betweenRatingRadio.checked = false;
    lowBetweenRating.value = "0";
    lowbetweentext.textContent = "0";
    highBetweenRating.value = "0";
    highbetweentext.textContent = "0";
  });

  betweenRatingRadio.addEventListener("click", () => {
    belowRatingSlider.value = "0";
    beforeRateId.textContent = "0";
    aboveRatingSlider.value = "0";
    aboveRatingSlider.value = "0";
    belowRatingRadio.checked = false;
    aboveRatingRadio.checked = false;
    aboveRating.value = "0";
    abovetext.textContent = "0";
  });

  // do this ^ for when text is inputted into title input

  //sorting by rating

  const ratingsortbutton = document.querySelector("#ratingsort");
  ratingsortbutton.addEventListener("click", () => {
    if (
      ratingsortbutton.textContent == "Rating⇅" ||
      ratingsortbutton.textContent == "Rating↑"
    ) {
      const arrayRating = [];
      let ratings = document.querySelectorAll(".outterDiv-container");
      ratings.forEach((rate) => arrayRating.push(rate));
      let sortedByFilterLowToHigh = arrayRating.sort((rate1, rate2) =>
        rate1
          .querySelector(".dynamic-rating")
          .textContent.localeCompare(
            rate2.querySelector(".dynamic-rating").textContent
          )
      );

      let movieBox = document.querySelector("#movie-box");

      sortedByFilterLowToHigh.forEach((movie) => movieBox.appendChild(movie));
      ratingsortbutton.textContent = "Rating↓";
      yearsortbutton.textContent = "Year⇅";
      titlesortbutton.textContent = "Title⇅";
    } else {
      const arrayRating = [];
      let ratings = document.querySelectorAll(".outterDiv-container");
      ratings.forEach((rate) => arrayRating.push(rate));
      let sortedByFilterLowToHigh = arrayRating.sort((rate1, rate2) =>
        rate2
          .querySelector(".dynamic-rating")
          .textContent.localeCompare(
            rate1.querySelector(".dynamic-rating").textContent
          )
      );

      let movieBox = document.querySelector("#movie-box");

      sortedByFilterLowToHigh.forEach((movie) => movieBox.appendChild(movie));
      ratingsortbutton.textContent = "Rating↑";
      yearsortbutton.textContent = "Year⇅";
      titlesortbutton.textContent = "Title⇅";
    }
  });

  //year sort
  const yearsortbutton = document.querySelector(".yearSort");

  yearsortbutton.addEventListener("click", () => {
    if (
      yearsortbutton.textContent == "Year⇅" ||
      yearsortbutton.textContent == "Year↑"
    ) {
      const arrayYear = [];
      let ratings = document.querySelectorAll(".outterDiv-container");
      ratings.forEach((year) => arrayYear.push(year));
      let sortedByFilterLowToHigh = arrayYear.sort((year1, year2) =>
        year1
          .querySelector(".dynamic-year")
          .textContent.localeCompare(
            year2.querySelector(".dynamic-year").textContent
          )
      );

      let movieBox = document.querySelector("#movie-box");

      sortedByFilterLowToHigh.forEach((movie) => movieBox.appendChild(movie));
      yearsortbutton.textContent = "Year↓";
      ratingsortbutton.textContent = "Rating⇅";
      titlesortbutton.textContent = "Title⇅";
    } else {
      const arrayYear = [];
      let ratings = document.querySelectorAll(".outterDiv-container");
      ratings.forEach((year) => arrayYear.push(year));
      let sortedByFilterLowToHigh = arrayYear.sort((year1, year2) =>
        year2
          .querySelector(".dynamic-year")
          .textContent.localeCompare(
            year1.querySelector(".dynamic-year").textContent
          )
      );

      let movieBox = document.querySelector("#movie-box");

      sortedByFilterLowToHigh.forEach((movie) => movieBox.appendChild(movie));
      yearsortbutton.textContent = "Year↑";
      ratingsortbutton.textContent = "Rating⇅";
      titlesortbutton.textContent = "Title⇅";
    }
  });

  //title sort
  const titlesortbutton = document.querySelector("#titleSort");

  titlesortbutton.addEventListener("click", () => {
    if (
      titlesortbutton.textContent ==
        "\n                    Title⇅\n                  " ||
      titlesortbutton.textContent == "Title↑" ||
      titlesortbutton.textContent == "Title⇅"
    ) {
      const arraytitle = [];
      let ratings = document.querySelectorAll(".outterDiv-container");
      ratings.forEach((title) => arraytitle.push(title));
      let sortedByFilterLowToHigh = arraytitle.sort((title1, title2) =>
        title1
          .querySelector(".dynamic-title")
          .textContent.localeCompare(
            title2.querySelector(".dynamic-title").textContent
          )
      );

      let movieBox = document.querySelector("#movie-box");

      sortedByFilterLowToHigh.forEach((movie) => movieBox.appendChild(movie));
      titlesortbutton.textContent = "Title↓";
      yearsortbutton.textContent = "Year⇅";
      ratingsortbutton.textContent = "Rating⇅";
    } else {
      const arraytitle = [];
      let ratings = document.querySelectorAll(".outterDiv-container");
      ratings.forEach((title) => arraytitle.push(title));
      let sortedByFilterLowToHigh = arraytitle.sort((title1, title2) =>
        title2
          .querySelector(".dynamic-title")
          .textContent.localeCompare(
            title1.querySelector(".dynamic-title").textContent
          )
      );

      let movieBox = document.querySelector("#movie-box");

      sortedByFilterLowToHigh.forEach((movie) => movieBox.appendChild(movie));
      titlesortbutton.textContent = "Title↑";
      yearsortbutton.textContent = "Year⇅";
      ratingsortbutton.textContent = "Rating⇅";
    }
  });

  let allInput = document.querySelectorAll("input");

  allInput.forEach((button) => {
    button.addEventListener("click", () => {
      let warnMess = document.querySelector(".filterWarn");
      warnMess.style.display = "none";
    });
  });

  beforeYearInput.addEventListener("keypress", () => {
    afterYearInput.value = "";
    betweenlowYearInput.value = "";
    betweenhighYearInput.value = "";

    afterYearRadio.checked = false;
    betweenYearRadio.checked = false;
    beforeYearRadio.checked = true;
  });

  afterYearInput.addEventListener("keypress", () => {
    beforeYearInput.value = "";
    betweenlowYearInput.value = "";
    betweenhighYearInput.value = "";

    beforeYearRadio.checked = false;
    betweenYearRadio.checked = false;
    afterYearRadio.checked = true;
  });

  betweenlowYearInput.addEventListener("keypress", () => {
    beforeYearInput.value = "";
    afterYearInput.value = "";
    betweenYearRadio.checked = true;
    beforeYearRadio.checked = false;
    afterYearRadio.checked = false;
  });
  betweenhighYearInput.addEventListener("keypress", () => {
    betweenYearRadio.checked = true;
    beforeYearRadio.checked = false;
    afterYearRadio.checked = false;
  });

  belowRatingSlider.addEventListener("click", () => {
    belowRatingRadio.checked = true;
    aboveRatingSlider.value = "0";
    aboveRateId.textContent = "0";
    betweenRatingSliderLow.value = "0";
    betweenRatingSliderHigh.value = "0";
    aboveRatingRadio.checked = false;
    betweenRatingRadio.checked = false;
    lowBetweenRating.value = "0";
    lowbetweentext.textContent = "0";
    highBetweenRating.value = "0";
    highbetweentext.textContent = "0";
  });

  aboveRatingSlider.addEventListener("click", () => {
    aboveRatingRadio.checked = true;
    belowRatingSlider.value = "0";
    beforeRateId.textContent = "0";
    betweenRatingSliderLow.value = "0";
    betweenRatingSliderHigh.value = "0";
    belowRatingRadio.checked = false;
    betweenRatingRadio.checked = false;
    lowBetweenRating.value = "0";
    lowbetweentext.textContent = "0";
    highBetweenRating.value = "0";
    highbetweentext.textContent = "0";
  });
  betweenRatingSliderLow.addEventListener("click", () => {
    betweenRatingRadio.checked = true;
    belowRatingSlider.value = "0";
    beforeRateId.textContent = "0";
    aboveRatingSlider.value = "0";
    aboveRatingSlider.value = "0";
    belowRatingRadio.checked = false;
    aboveRatingRadio.checked = false;
    aboveRating.value = "0";
    abovetext.textContent = "0";
  });
  betweenRatingSliderHigh.addEventListener("click", () => {
    betweenRatingRadio.checked = true;
    belowRatingSlider.value = "0";
    beforeRateId.textContent = "0";
    aboveRatingSlider.value = "0";
    aboveRatingSlider.value = "0";
    belowRatingRadio.checked = false;
    aboveRatingRadio.checked = false;
    aboveRating.value = "0";
    abovetext.textContent = "0";
  });

  const getMovieDetailsObject = (id) => {
    return sessionStorage.getItem(`${id} - details`);
  };

  // https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
  function toSentenceCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  let filterMovieButton = document.querySelector(".filterMovie");
  const findIndices = (movieArray) => {
    let indices = [];
    movieArray.forEach((title) =>
      indices.push(
        movieDB.findIndex((movie) => movie["original_title"] == title)
      )
    );

    return indices;
  };

  // NEEDED FUNCTION //

  const getMovieDetailsFilter = (listOfMovies) => {
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
        .then((div) => insertMoviesFiltered(div));
    });

    sortedMovies.forEach((movie) => {
      getAllInfoFilter(movie.id);
    });
  };
  const insertMoviesFiltered = (div) => {
    if (div == undefined) {
      console.log("nothing to show");
    } else {
      homePage.style.display = "none";
      defaultPage.style.display = "block";
      movieBox.appendChild(div);
    }
  };

  const getAllInfoFilter = (movieId) => {
    const urls = [
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
      `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=325f1fbb49366fab4ffcaaea71f3dcb6`,
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
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
  };

  const getAllDetailsFromSessionStorage = () => {
    const items = { ...sessionStorage };
    let detailsArray = [];
    for (let key in items) {
      if (key.includes("details")) {
        detailsArray.push(JSON.parse(sessionStorage.getItem(key)));
      }
    }

    return detailsArray;
  };

  ///////////////////////////////////////////////////

  //filter by title -- DONE
  filterMovieButton.addEventListener("click", () => {
    movieBox.replaceChildren();

    let titleFilterValue = titleFilter.value;
    let beforeYearInputValue = parseInt(beforeYearInput.value);
    let afterYearInputValue = afterYearInput.value;
    let betweenlowYearInputValue = betweenlowYearInput.value;
    let betweenhighYearInputValue = betweenhighYearInput.value;
    let belowRatingInputValue = parseFloat(belowRatingSlider.value);
    let aboveRatingSliderValue = parseFloat(aboveRatingSlider.value);
    let betweenRatingSliderLowValue = parseFloat(betweenRatingSliderLow.value);
    let betweenRatingSliderHighValue = parseFloat(
      betweenRatingSliderHigh.value
    );

    let detailsArrayCompleted = getAllDetailsFromSessionStorage();

    if (titleFilterValue != "") {
      detailsArrayCompleted = detailsArrayCompleted.filter((movie) =>
        movie["original_title"]
          .toLowerCase()
          .includes(titleFilterValue.toLowerCase())
      );
    }
    //   fetch(
    //     `https://api.themoviedb.org/3/search/movie?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&query=${titleFilterValue}&page=1`
    //   )
    //     .then((repsone) => repsone.json())
    //     .then((movies) => getMovieDetailsFilter(movies.results));
    // }

    if (beforeYearRadio.checked) {
      console.log("before year checked");
      detailsArrayCompleted = detailsArrayCompleted.filter(
        (movie) =>
          parseInt(movie["release_date"].substr(0, 4)) <= beforeYearInputValue
      );
    }

    if (betweenYearRadio.checked) {
      console.log("between year checked");

      console.log("after year checked");

      if (betweenlowYearInputValue > betweenhighYearInputValue) {
        let warnMess = document.querySelector(".filterWarn");
        warnMess.style.display = "block";
        warnMess.textContent = "First Year Must Be Less Than Second Year";
      } else if (
        betweenlowYearInputValue != "" &&
        betweenhighYearInputValue != "" &&
        betweenYearRadio.checked == true
      ) {
        let lowerLimitFilter = detailsArrayCompleted.filter(
          (movie) =>
            parseInt(movie["release_date"].substr(0, 4)) >=
            betweenlowYearInputValue
        );
        detailsArrayCompleted = lowerLimitFilter.filter(
          (movie) =>
            parseInt(movie["release_date"].substr(0, 4)) <=
            betweenhighYearInputValue
        );
      }
    }

    if (afterYearRadio.checked) {
      console.log("between year checked");
      detailsArrayCompleted = detailsArrayCompleted.filter(
        (movie) =>
          parseInt(movie["release_date"].substr(0, 4)) >= afterYearInputValue
      );
    }

    if (belowRatingRadio.checked) {
      console.log("below rating checked");
      detailsArrayCompleted = detailsArrayCompleted.filter(
        (movie) => parseFloat(movie["vote_average"]) <= belowRatingInputValue
      );
    }

    if (aboveRatingRadio.checked) {
      console.log("after rating checked");
      detailsArrayCompleted = detailsArrayCompleted.filter(
        (movie) => parseFloat(movie["vote_average"]) >= aboveRatingSliderValue
      );
    }

    if (betweenRatingRadio.checked) {
      console.log("between rating checked");

      if (betweenRatingSliderHighValue < betweenRatingSliderLowValue) {
        let warnMess = document.querySelector(".filterWarn");
        warnMess.style.display = "block";
        warnMess.textContent = "First Rating Must Be Less Than Second Rating";
      } else if (
        betweenRatingSliderHighValue != "" &&
        betweenRatingSliderLowValue != "" &&
        betweenRatingRadio.checked == true
      ) {
        let lowerLimitFilter = detailsArrayCompleted.filter(
          (movie) =>
            parseFloat(movie["vote_average"]) >= betweenRatingSliderLowValue
        );
        detailsArrayCompleted = lowerLimitFilter.filter(
          (movie) =>
            parseFloat(movie["vote_average"]) <= betweenRatingSliderHighValue
        );
      }
    }

    detailsArrayCompleted = detailsArrayCompleted.sort((movie1, movie2) =>
      movie1["original_title"].localeCompare(movie2["original_title"])
    );

    let forEachArray = detailsArrayCompleted;
    if (forEachArray.length == 0) {
      const noMoviesToShow = document.createElement("h6");
      noMoviesToShow.classList = "center no-movie-header";
      noMoviesToShow.textContent = "No movies to show";
      movieBox.appendChild(noMoviesToShow);
    }

    forEachArray.forEach((movie) => {
      const filteredDiv = createMovieElementAPI(movie);

      insertMoviesFiltered(filteredDiv);
    });
  });
});
