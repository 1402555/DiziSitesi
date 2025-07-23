
function getWatchedMovies() {
    return JSON.parse(localStorage.getItem("watchedMovies")) || [];
}

function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}


function addMovie() {
    let title = document.getElementById("title").value;
    let imageUrl = document.getElementById("imageUrl").value;
    let link = document.getElementById("link").value;
    let category = document.getElementById("category").value;

    if (!title || !imageUrl || !link) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    if (category === "watched") {
        let watchedMovies = getWatchedMovies();
        watchedMovies.push({ title, image: imageUrl, link });
        localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
    } else {
        let watchlist = getWatchlist();
        watchlist.push({ title, image: imageUrl, link });
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }

    document.getElementById("title").value = "";
    document.getElementById("imageUrl").value = "";
    document.getElementById("link").value = "";

    renderWatchedMovies();
    renderWatchlist();
}


function renderWatchedMovies() {
    let watchedMovies = getWatchedMovies();
    let watchedListDiv = document.getElementById("watchedList");

    if (watchedListDiv) {
        watchedListDiv.innerHTML = "";
        watchedMovies.forEach((movie, index) => {
            watchedListDiv.innerHTML += `
                <div class="movie-item">
                    <a href="${movie.link}" target="_blank">
                        <img src="${movie.image}" alt="${movie.title}">
                    </a>
                    <h3>${movie.title}</h3>
                    <button onclick="addToFavorites(${index}, 'watched')">Favorilere Ekle</button>
                    <button onclick="deleteMovie(${index}, 'watched')">Sil</button>
                </div>
            `;
        });
    }
}


function renderWatchlist() {
    let watchlist = getWatchlist();
    let watchListDiv = document.getElementById("İzlenecekListesi");

    if (watchListDiv) {
        watchListDiv.innerHTML = "";
        watchlist.forEach((movie, index) => {
            watchListDiv.innerHTML += `
                <div class="movie-item">
                    <a href="${movie.link}" target="_blank">
                        <img src="${movie.image}" alt="${movie.title}">
                    </a>
                    <h3>${movie.title}</h3>
                    <button onclick="addToFavorites(${index}, 'watchlist')">Favorilere Ekle</button>
                    <button onclick="deleteMovie(${index}, 'watchlist')">Sil</button>
                </div>
            `;
        });
    }
}


function addToFavorites(index, category) {
    let favorites = getFavorites();
    let movieList = category === "watched" ? getWatchedMovies() : getWatchlist();
    let selectedMovie = movieList[index];

    // Aynı film zaten favorilerde mi?
    if (favorites.some(movie => movie.title === selectedMovie.title)) {
        alert("Bu film zaten favorilerde!");
        return;
    }

    favorites.push(selectedMovie);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    renderFavorites();
}


function removeFavorite(index) {
    let favorites = getFavorites();
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}


function renderFavorites() {
    let favorites = getFavorites();
    let favListIndex = document.getElementById("favList"); // Ana Sayfa Kaydırmalı Favoriler
    let favListPage = document.getElementById("favoriListesi"); // Favoriler Sayfası

    if (favListIndex) {
        favListIndex.innerHTML = "";
        favorites.forEach((movie) => {
            favListIndex.innerHTML += `
                <div>
                    <a href="${movie.link}" target="_blank">
                        <img src="${movie.image}" alt="${movie.title}">
                    </a>

                </div>
            `;
        });
    }
    

    if (favListPage) {
        favListPage.innerHTML = ""; // Önce eski içeriği temizle
        let favGrid = document.createElement("div"); // Yeni bir div oluştur
        favGrid.classList.add("fav-grid"); // fav-grid sınıfını ekle
    
        favorites.forEach((movie, index) => {
            let favCard = document.createElement("div");
            favCard.classList.add("fav-card");
            favCard.innerHTML = `
                <a href="${movie.link}" target="_blank">
                    <img src="${movie.image}" alt="${movie.title}">
                </a>
                <h3>${movie.title}</h3>
                <button onclick="removeFavorite(${index})">Favorilerden Kaldır</button>
            `;
    
            favGrid.appendChild(favCard); // Yeni kartları ekle
        });
    
        favListPage.appendChild(favGrid); // Grid div’ini ekle
    }
    
    
}


function deleteMovie(index, category) {
    if (category === "watched") {
        let watchedMovies = getWatchedMovies();
        watchedMovies.splice(index, 1);
        localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
        renderWatchedMovies();
    } else {
        let watchlist = getWatchlist();
        watchlist.splice(index, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        renderWatchlist();
    }

    // Eğer favorilerde de varsa, onu da sil
    removeFromFavoritesByTitle(category === "watched" ? getWatchedMovies()[index]?.title : getWatchlist()[index]?.title);
}


function removeFromFavoritesByTitle(title) {
    if (!title) return;

    let favorites = getFavorites();
    favorites = favorites.filter(movie => movie.title !== title);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}


document.addEventListener("DOMContentLoaded", () => {
    renderWatchedMovies();
    renderWatchlist();
    renderFavorites();
});







document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
});
















