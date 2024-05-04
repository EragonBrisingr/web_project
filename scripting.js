const apikey = 'AIzaSyC9b-eSB0ElErR1EVzOle_TfeL4mFRpTH8';

const bookContainer = document.getElementById("main");
const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent page refresh

    // Get the value of the search input
    const query = document.getElementById("txtSearch").value.trim();
    if (query !== "") {
        try {
            const books = await fetchBooks(query);
            displayBooks(books);
        } catch (error) {
            console.error("Error fetching books with query:", error);
        }
    }
});

async function fetchBooks(query = "fiction") {
    try {
        // cant call without at least one parameter or query so giving fiction as a default query
        // the "?" is used to "initiate" the query or search variables/parameters
        // the "&" is used to add more parameters (or conditions) to the query
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40&key=${apikey}`;
        //encode makes sure that the query is in a format that can be used in a URL
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.items || []; // Handle empty or null response
    } catch (error) {
        console.error(`Error fetching books with query "${query}":`, error);
        return [];
    }
}

function displayBooks(books) {
    if (!bookContainer) {
        console.error("Book container not found");
        return;
    }

    bookContainer.innerHTML = ""; // Clear the container before adding new books

    books.forEach((book) => {
        // Create the card container
        const bookCard = document.createElement("div");
        bookCard.classList.add("card", "card-style");
        bookCard.style.width = "18rem";
        bookCard.style.height = "25rem";

        // Create and set up the book thumbnail image
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.style.height = "15rem";
        img.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'; // Provide a placeholder if no thumbnail is available
        img.alt = book.volumeInfo.title;

        // Create and set up the book title
        const title = document.createElement("h5");
        title.classList.add("card-title");
        const truncateTitle = book.volumeInfo.title.length > 20 ? book.volumeInfo.title.slice(0, 20) + "..." : book.volumeInfo.title;
        title.textContent = truncateTitle;

        // Create and set up the book description
        const description = document.createElement("p");
        description.classList.add("card-text");
        if (book.volumeInfo.description) {
            const truncateDescription = book.volumeInfo.description.length > 120 ? book.volumeInfo.description.slice(0, 120) + "..." : book.volumeInfo.description;
            description.textContent = truncateDescription;
        } else {
            description.textContent = "No description available.";
        }

        bookCard.addEventListener("click", () => {
            // Pass book ID via query parameters
            const bookId = book.id;
            window.location.href = `bookDetails.html?bookId=${encodeURIComponent(bookId)}`;
        });

        // Append all elements to the card and add the card to the book container
        bookCard.appendChild(img);
        bookCard.appendChild(title);
        bookCard.appendChild(description);
        bookContainer.appendChild(bookCard);
    });
}

(async () => {
    try {
        // Initially load books with a default query (e.g., "fiction")
        const books = await fetchBooks();
        displayBooks(books);
    } catch (error) {
        console.error("Error in processing default books:", error);
    }
})();
