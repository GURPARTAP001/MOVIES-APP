const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// we are using the below function to fetch the data from the api url,the below function returns us a promise
async function getMovies() {
    const resp = await fetch(APIURL);
    const respData = await resp.json();

    console.log(respData);
    return respData;
}



async function show() {
    const h = await getMovies();
    h.results.forEach(movie => {

        const { poster_path, title, vote_average } = movie //here we are destructuring these thing else we have to use them as movie.poster_path etc
        const movieEl = document.createElement("div")

        movieEl.classList.add("movie");
        movieEl.innerHTML =
            `
            <img src="${IMGPATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        `
        main.appendChild(movieEl)


    });

}
show()

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    }
    else if (vote >= 5) {
        return "orange";
    }
    else {
        return "red";
    }
}
//search.......................


async function getSearch(a) {

    const resp = await fetch(SEARCHAPI + a)
    const respData = await resp.json();

    return respData;
}

async function showSearch(e) {
    const h = await getSearch(e);
    console.log(h);
    main.innerHTML = '';
    if(h.total_results==0){
        main.innerHTML=`<h1>No Match Found</h1>`
        return 0;
    }
    //clearing the previous movies inside the main
    h.results.forEach(movie => {

        const { poster_path, title, vote_average } = movie //here we are destructuring these thing else we have to use them as movie.poster_path etc
        const movieEl = document.createElement("div")

        movieEl.classList.add("movie");
        movieEl.innerHTML =
            `
            <img src="${poster_path != null ? IMGPATH + poster_path :"https://th.bing.com/th/id/OIP.Zn8GD6ZZppjZG4B_57tiZAHaET?w=294&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        `
        main.appendChild(movieEl)


    });
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        showSearch(searchTerm)
    }
   


})
