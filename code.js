const moviesContainer = document.createElement('div')
const combinedDatas = movieDetails.map(movieDetail => {
    const matchedMovie = movies.find(movie => movie.title === movieDetail.title)
    return { ...matchedMovie, ...movieDetail }
})

displayingSearchContainer()

const submitButton = document.querySelector('button');

submitButton.addEventListener('click', () => {
    moviesContainer.textContent = ''
    document.getElementById('actorsNameId').value = ''
    document.getElementById('movieTitleId').value = ''

    displayMovies()
})

function displayingSearchContainer() {
    document.body.textContent = ''
    const searchMoviesContainer = document.createElement('div')
    searchMoviesContainer.setAttribute('class', 'searchDiv')
    const pageTitle = document.createElement('h1')
    pageTitle.innerText = "Kenzie Movie Catalog"

    const searchByMoviesTitle = `<label for="movieTitleId">Search by Movie Title: <input type = "text" id ="movieTitleId" name = "movieTitle" placeholder = "Enter a movie title" autocomplete = "off"></label>`
    const searchByActors = `<label for="actorsNameId">Search by Actor/Actress: <input type = "text" id ="actorsNameId" name = "actorsName" placeholder = "Enter an actor name" autocomplete = "off"></label>`
    const submitButton = `<button>Search</button>`

    searchMoviesContainer.innerHTML = searchByMoviesTitle
    searchMoviesContainer.innerHTML += searchByActors
    searchMoviesContainer.innerHTML += submitButton

    document.body.append(pageTitle, searchMoviesContainer)
}

function displayMovies() {
    for (let film of combinedDatas) {
         creatingMovies(film)
    }
}

function creatingMovies(Movie) {
    moviesContainer.setAttribute('class', 'movies-container')
    let movieCard = document.createElement('div')
    movieCard.setAttribute('class', 'movie-card')
    let title = document.createElement('h3')
    let castingMembers = document.createElement('p')
    let genre = document.createElement('p')
    let years = document.createElement('p')
    let popularity = document.createElement('p')
    let image = document.createElement('img')
    
    image.src = Movie.imageUrl
    image.alt = `Movie poster: ${Movie.title || 'unknown title'}`
   
    title.innerText = `Title: ${Movie.title}`
    castingMembers.innerText = Movie.cast
    genre.innerHTML = `<strong>genres:</strong> ${Movie.genre}`
    years.innerHTML = `<strong>Year:</strong> ${Movie.year}`
    popularity.innerHTML = `<strong>Popularity:</strong> ${Movie.popularity}`
   
    movieCard.append(image, title, castingMembers, years, genre, popularity)
    moviesContainer.append(movieCard)
    document.body.append(moviesContainer)
}

document.body.addEventListener('input', () => {

    const actorsInput = document.getElementById('actorsNameId')
    const titleInput = document.getElementById('movieTitleId')
    const moviesContainer = document.querySelector('.movies-container')
    if (!moviesContainer) return
    let moviesByInputResult = []

    combinedDatas.forEach(movie => {

        let actorsOfMovie = movie.cast.join('')
        let titleOfMovie = movie.title

        if (actorsInput.value && !titleInput.value) {

            if (actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1) {
                moviesByInputResult.push(movie)
            }
        } else if (!actorsInput.value && titleInput.value) {

            if (titleOfMovie.toLowerCase().indexOf(titleInput.value.toLowerCase()) > -1) {
                moviesByInputResult.push(movie)

            }
        } else if (actorsInput.value && titleInput.value) {
            if (actorsOfMovie.toLowerCase().indexOf(actorsInput.value.toLowerCase()) > -1 && titleOfMovie.toLowerCase().indexOf
            (titleInput.value.toLowerCase()) > -1) {
                moviesByInputResult.push(movie)

            }
        }

        if (actorsInput.value === '' && titleInput.value === '') {
            moviesContainer.textContent = ''
            moviesByInputResult = []

        }
    })

    if (moviesByInputResult.length === 1) {

        moviesContainer.textContent = ''
        creatingMovies(moviesByInputResult[0])
    } else {

        moviesByInputResult.forEach(movieFound => {

            if (moviesContainer.childElementCount > moviesByInputResult.length) {
                moviesContainer.textContent = ''
            }

            creatingMovies(movieFound)
        })
    }
})
