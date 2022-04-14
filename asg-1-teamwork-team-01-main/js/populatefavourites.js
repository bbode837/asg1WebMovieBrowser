function populateFavourites() {
  localStorage.clear();

  let mNames = [679, 348, 1091, 2666, 10204, 1124, 9342, 8536, 13342, 72105];
  passIDToSaveDetails(mNames)
  createFavMovieObj(mNames);
}

const passIDToSaveDetails = (mNames) => {
  mNames.forEach(id => saveDetails(id))
}
const saveDetails = (movieId) => {
  const urls = [
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
    `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=325f1fbb49366fab4ffcaaea71f3dcb6`,
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`,
  ];

  Promise.all(urls.map((url) => fetch(url).then((resp) => resp.json()))).then(
    (objs) => setSessionStorageItems(movieId, objs)
  );
}
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
const createFavMovieObj = (mNames) => {
  mNames.forEach((id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=325f1fbb49366fab4ffcaaea71f3dcb6&language=en-US`
    )
      .then((response) => response.json())
      .then((res) => localStorage.setItem(res.id, JSON.stringify(res)));
  });
};
