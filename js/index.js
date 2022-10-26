const movieSearchBox = document.getElementById('movie-search-box')
const searchList = document.getElementById('search-list')
const resultGrid = document.getElementById('result-grid')
let moviePoster;
async function getData(movieTitle) {
  const res = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=69d0ba7f`)
  const data = await res.json()
  if (data.Response === "True") displayMovieList(data.Search)
}
function findMovies() {
  let searchTerm = (movieSearchBox.value).trim()
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list')
    getData(searchTerm)
  }
  else {
    searchList.classList.add('hide-search-list')
  }
  console.log(searchTerm)
  return searchTerm
}
function displayMovieList(movies) {
  searchList.innerHTML = ``
  for (idx in movies) {
    let movieListItem = document.createElement('div')
    movieListItem.classList.add('search-list-item')
    movieListItem.dataset.id = movies[idx].imdbID
    if (movies[idx].Poster !== "N/A") {
      moviePoster = movies[idx].Poster
    }
    else {
      moviePoster = './images/No-Image.jpg'
    }
    movieListItem.innerHTML += ` 
    <div class="search-item-thumbnail">
      <img src="${moviePoster}">
    </div>
    <div class="search-item-info">
      <h3>${movies[idx].Title}</h3>
      <p>${movies[idx].Year}</p>
    </div>
 `
    searchList.appendChild(movieListItem)
  }
  getMovieData()
}
function getMovieData() {
  const searchListMovies = document.querySelectorAll('.search-list-item')
  searchListMovies.forEach(mv => {
    mv.addEventListener('click', async () => {
      searchList.classList.add('hide-search-list')
      movieSearchBox.value = ""
      const res = await fetch(`http://www.omdbapi.com/?i=${mv.dataset.id}&apikey=69d0ba7f`)
      const res_MovieDetails = await res.json()
      if (res_MovieDetails.Poster !== "N/A") {
        res_MovieDetails.Poster = res_MovieDetails.Poster
      }
      else {
        res_MovieDetails.Poster = './images/No-Image.jpg'
      }
      console.log(res_MovieDetails)
      resultGrid.innerHTML = (`
      <div class="movie-poster"><img src="${res_MovieDetails.Poster}" alt="Movie-Poster"></div>
          <div class="movie-info">
            <h3 class="movie-title">${res_MovieDetails.Title}</h3>
            <ul class="movie-misc-info">
              <li class="year">Year: ${res_MovieDetails.Year}</li>
              <li class="rated">Ratings: ${res_MovieDetails.Rated}</li>
              <li class="released">Released: ${res_MovieDetails.Released}</li>
            </ul>
            <p class="genre"><b>Genre:</b>${res_MovieDetails.Genre}</p>
            <p class="writer"><b>Writer:</b> ${res_MovieDetails.Writer}</p>
            <p class="actors"><b>Actors:</b> ${res_MovieDetails.Actors}</p>
            <p class="plot">${res_MovieDetails.Plot}</p>
            <p class="language"><b>Language:</b>${res_MovieDetails.Language}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b> ${res_MovieDetails.Awards}
            </p>
            <p class="awards"><b><i class="fas fa-clock"></i></b> ${res_MovieDetails.Runtime}</p>
          </div>`)
    })
  })
}