document.addEventListener("DOMContentLoaded", () => {
  let modal = document.querySelector(".modal-content");
  let showmodal = document.getElementById("myModal");
  let crewCastTab = document.querySelector(".tabs");

  const poster = document.querySelector(".poster-images-dynamic");
  const movieTitleBox = document.querySelector("#movietitleBox");
  const genresContainer = document.querySelector(".genres-dynamic");
  const keywordContainer = document.querySelector(".keyword-dynamic");
  const companiesContianer = document.querySelector(".comp-details");
  const countriesContiner = document.querySelector(".country-details");
  const budgetContainer = document.querySelector(".budget-details");
  const releaseDateContainer = document.querySelector(".release-date-dynamic");
  const revenueContainer = document.querySelector("#dynamic-revenue");
  const runtimeContainer = document.querySelector("#dynamic-runtime");
  const taglineContainer = document.querySelector("#tagline");
  const overviewContainer = document.querySelector(".overview");
  const popularityContainer = document.querySelector("#popularity");
  const averageContainer = document.querySelector("#average");
  const countContainer = document.querySelector("#count");
  const castBox = document.querySelector("#castBox");
  const crewBox = document.querySelector("#crewBox");
  let startingImage;

  const closeButton = document.querySelector(".close-modal");

  closeButton.addEventListener("click", () => {
    showmodal.style.display = "none";
    modal.removeChild(startingImage);
  });

  const header = document.querySelector(".details-header-event");
  const detailsPage = document.querySelector("#detailsPage");
  const defaultPage = document.querySelector("#defaultview");
  const homePage = document.querySelector("#homePage");

  header.addEventListener("click", () => {
    detailsPage.style.display = "none";
    defaultPage.style.display = "none";
    homePage.style.display = "block";
    let titleSearchBox = document.querySelector("#movie-search");
    titleSearchBox.value = "";
    let searchButton = document.querySelector(
      "#homePage-search-button-matching"
    );
    let favButton = document.querySelector("#favButton");
    searchButton.setAttribute("disabled", "");
    favButton.removeAttribute("disabled", "");
    let movieBox = document.querySelector("#movie-box");

    while (movieBox.firstChild) {
      movieBox.removeChild(movieBox.firstChild);
    }
    removeChildren();
  });

  const leftSection = document.querySelector(".left-section");
  leftSection.addEventListener("click", (e) => {
    if (e.target.tagName == "I") {
      const title = e.target.dataset.movieTitle;
      let msg = new SpeechSynthesisUtterance(title);
      window.speechSynthesis.speak(msg);
    }
    if (e.target.tagName == "IMG") {
      startingImage = e.target.cloneNode();

      const tabletWidth = window.matchMedia(
        "(min-width: 427px) and (max-width: 769px)"
      );
      if (tabletWidth.matches) {
        startingImage.src = e.target.src.replace("w342", "w342");
      } else {
        startingImage.src = e.target.src.replace("w342", "w780");
      }
      modal.prepend(startingImage);
      showmodal.style.display = "block";
    }
  });

  const backSearchButton = document.querySelector(".detailsbuttonup");
  backSearchButton.addEventListener("click", () => {
    removeChildren();
    detailsPage.style.display = "none";
    defaultPage.style.display = "block";
  });

  let instance = M.Tabs.init(crewCastTab, {});

  function removeChildren() {
    poster.replaceChildren();
    movieTitleBox.replaceChildren();
    genresContainer.replaceChildren();
    keywordContainer.replaceChildren();
    companiesContianer.replaceChildren();
    countriesContiner.replaceChildren();
    budgetContainer.replaceChildren();
    releaseDateContainer.replaceChildren();
    revenueContainer.replaceChildren();
    runtimeContainer.replaceChildren();
    taglineContainer.replaceChildren();
    overviewContainer.replaceChildren();
    popularityContainer.replaceChildren();
    averageContainer.replaceChildren();
    countContainer.replaceChildren();
    castBox.replaceChildren();
    crewBox.replaceChildren();
  }

  // showMoreBtn.addEventListener("click", () => {
  //   let dots = document.querySelector("#dots")
  //   let moreKeywords = document.querySelector("#more")
  //   let buttonText = document.querySelector("#myBtn")
  //   // let buttonArrow = document.querySelector("#expand")

  //   if (dots.style.display === "none") {
  //     dots.style.display = "inline";
  //     buttonText.textContent = "Show more";
  //     moreKeywords.style.display = "none";
  //   } else {
  //     dots.style.display = "none";
  //     buttonText.textContent = "Show less";
  //     moreKeywords.style.display = "inline";
  //   }
  // })
});
