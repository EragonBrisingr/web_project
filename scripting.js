
const apikey = 'AIzaSyC9b-eSB0ElErR1EVzOle_TfeL4mFRpTH8'

const bookContainer = document.getElementById("main");

async function fetchRandomBooks() {
    try {
        const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40&key=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.items || [];
    } catch (error) {
        console.error("Error fetching random books", error);
        return [];
    }
}

function displayBooks(books) {
    if (!bookContainer) {
        console.error("book container not found");
        return;
    }
    bookContainer.innerHTML = "";
    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("card","card-style");
        bookCard.style.width = "18rem";
        bookCard.style.height = "25rem";
        
        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.style.height = "15rem";
        // Check if imageLinks and thumbnail exist before accessing the thumbnail
        img.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150'; // Provide a placeholder if no thumbnail is available
        img.alt = book.volumeInfo.title;
        
        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = book.volumeInfo.title;
        const truncateTitle = book.volumeInfo.title.length > 20 ? book.volumeInfo.title.slice(0, 20) + "..." : book.volumeInfo.title;
        title.textContent = truncateTitle;

        const description = document.createElement("p"); // Description element needs to be created here
        description.classList.add("card-text");
        if (book.volumeInfo.description) {
            const truncateDescription = book.volumeInfo.description.length > 120 
                ? book.volumeInfo.description.slice(0, 120) + "..." 
                : book.volumeInfo.description;
            description.textContent = truncateDescription;
        } else {
            description.textContent = "No description available.";
        }     

        bookCard.appendChild(img);
        bookCard.appendChild(title);
        bookCard.appendChild(description);
        bookContainer.appendChild(bookCard);
    });
}

(async () => {
    try {
        const books = await fetchRandomBooks();
        displayBooks(books);
    } catch (error) {
        console.error("Error in processing", error);
    }
})();

/*
function searchBooks() {
    var search = document.getElementById("txtSearch").value;
    var url = "https://www.googleapis.com/books/v1/volumes?q=" + search + "&key=AIzaSyC9b-eSB0ElErR1EVzOle_TfeL4mFRpTH8";

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var books = data.items;
            var searchResults = document.getElementById("searchResults");
            searchResults.innerHTML = "";
            if (books) {
                books.forEach(book => {
                    var title = book.volumeInfo.title;
                    var authors = book.volumeInfo.authors;
                    var description = book.volumeInfo.description;

                    var bookElement = document.createElement("div");
                    bookElement.classList.add("book");

                    var titleElement = document.createElement("h3");
                    titleElement.textContent = title;
                    bookElement.appendChild(titleElement);

                    var descriptionElement = document.createElement("p");
                    descriptionElement.textContent = description.substring(0, 100) + "...";
                    bookElement.appendChild(descriptionElement);

                    searchResults.appendChild(bookElement);
                });
            } else {
                searchResults.innerHTML = "<p>No results found.</p>";
            }

            // Check if API was implemented correctly
            console.log("API implementation status: Success");

            // Check if API works
            if (books && books.length > 0) {
                console.log("API works: Yes");
            } else {
                console.log("API works: No");
            }
        })
        .catch(error => {
            console.error("Error searching books:", error);
        });
}
*/