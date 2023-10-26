document.addEventListener('DOMContentLoaded', () => {
    const filmsList = document.getElementById('films');
    const movieInfo = document.getElementById('movie-info');
    const buyTicketBtn = document.getElementById('buy-ticket');
    fetch('db.json')
        .then((response) => response.json())
        .then((data) => {
            const movies = data.films;

            movies.forEach((movie) => {
                const movieItem = document.createElement('li');
                movieItem.classList.add('film');
                movieItem.textContent = movie.title;

                movieItem.addEventListener('click', () => {
                    displayMovieDetails(movie);
                });

                filmsList.appendChild(movieItem);
            });

            if (movies.length > 0) {
                displayMovieDetails(movies[0]);
            }
        })
        .catch((error) => console.error('Error fetching data:', error));
    function displayMovieDetails(movie) {
        const poster = document.getElementById('movie-poster');
        const title = document.getElementById('movie-title');
        const runtime = document.getElementById('movie-runtime');
        const showtime = document.getElementById('movie-showtime');
        const tickets = document.getElementById('movie-tickets');
        const description = document.getElementById('movie-description');

        poster.src = movie.poster;
        title.textContent = movie.title;
        runtime.textContent = `Runtime: ${movie.runtime} minutes`;
        showtime.textContent = `Showtime: ${movie.showtime}`;
        const availableTickets = movie.capacity - movie.tickets_sold;
        tickets.textContent = `Available Tickets: ${availableTickets}`;
        description.textContent = movie.description;

        buyTicketBtn.disabled = availableTickets === 0;
        buyTicketBtn.addEventListener('click', () => {
            if (availableTickets > 0) {
                availableTickets--;
                tickets.textContent = `Available Tickets: ${availableTickets}`;
                buyTicketBtn.disabled = availableTickets === 0;
            }
        });
    }
});
