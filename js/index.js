const search_box = document.getElementById("search-box")
search_box.value = ""
const search_result_div = document.getElementById("search-result")
async function getData(movieTitle) {
  const res = await fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=69d0ba7f`)
  const data = await res.json()
  const movieData = data.Search
  movieData.forEach(dt => {
    if (dt != null || dt != undefined) {
      if (dt.Poster === "N/A" || dt.Poster == undefined) {
        dt.Poster = `./images/No-Image.jpg`
      }
      search_result_div.innerHTML += (`
      <div class="contents">
            <img src="${dt.Poster}" class="logo">
            <span class="text-content">
              <span class="title">${dt.Title}</span>
              <span class="year">${dt.Year}</span>
            </span>
          </div>
      `)
    }
  });
  console.log(data.Search)
}

let search_value;
search_box.addEventListener("input", () => {
  setTimeout(() => {
    if (search_box.value == undefined || search_box.value == "") {
      return
    } else {
      search_value = search_box.value
      getData(search_value)
    }
  }, 10)
})
search_box.addEventListener("keydown", () => {
  setTimeout(() => {
    if (search_box.value == undefined || search_box.value == "") {
      return
    } else {
      search_value = search_box.value
      getData(search_value)
    }
  }, 10)
})
