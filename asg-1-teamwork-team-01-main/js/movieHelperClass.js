class selectedMovie {
  constructor(detials, keywords, cast, crew, youtube) {
   this.detailsList = JSON.parse(detials);
   this.keywordsList = JSON.parse(keywords);
   this.castList = JSON.parse(cast);
   this.crewList = JSON.parse(crew);
   this.youtubeVid = JSON.parse(youtube);
  }

  title() {
    return this.detailsList["original_title"];
  }

  keywords() {
    return this.keywordsList.map((words) => words["name"]);
  }

  cast() {
    const castMembers = this.castList.filter(
      (member) => member["known_for_department"] == "Acting"
    );
    const cast = castMembers.map((cast) => {
      return {
        name: cast["original_name"],
        character: cast["character"],
        order: cast["order"],
      };
    });
    return cast;
  }

  crew() {
    const crew = this.crewList.map((crew) => {
      return {
        name: crew["original_name"],
        department: crew["department"],
        job: crew["job"],
      };
    });
    return crew.sort(function (person1, person2) {
      if (person1.department === person2.department) {
        return person1.name.localeCompare(person2.name);
      } else {
        return person1.department.localeCompare(person2.department);
      }
    });
  }

  mobileSizePoster() {
    const endUrl = this.detailsList["poster_path"];
    return `https://image.tmdb.org/t/p/w185/${endUrl}`;
  }

  laptopSizePoser() {
    const endUrl = this.detailsList["poster_path"];
    return `https://image.tmdb.org/t/p/w342/${endUrl}`;
  }

  genres() {
    const genres = this.detailsList.genres;
    return genres.map((genre) => genre.name);
  }

  budget() {
    return this.detailsList.budget;
  }

  companies() {
    const companies = this.detailsList["production_companies"];
    const companyName = [];
    companies.forEach((company) => companyName.push(company.name));
    return companyName;
  }

  country() {
    const countries = this.detailsList["production_countries"];
    const countryName = [];
    countries.forEach((company) => countryName.push(company.name));
    return countryName;
  }

  releaseDate() {
    return this.detailsList["release_date"];
  }

  revenue() {
    return this.detailsList["revenue"];
  }

  runtime() {
    return this.detailsList["runtime"];
  }

  tagline() {
    return this.detailsList.tagline;
  }

  overview() {
    return this.detailsList.overview;
  }

  rating() {
    const ratings = [
      this.detailsList.popularity,
      this.detailsList["vote_average"],
      this.detailsList["vote_count"],
    ];
    return ratings;
  }

  imdbID() {
    return this.detailsList["imdb_id"];
  }

  tmdbID() {
    return this.detailsList.id;
  }

  youtubeLink() {
    return this.youtubeVid[0].key;
  }
}
