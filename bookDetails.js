
const apikey = 'AIzaSyC9b-eSB0ElErR1EVzOle_TfeL4mFRpTH8';

const bookDetailContainer = document.getElementById('book-detail');

async function fetchBookById(bookId) {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(bookId)}?key=${apikey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching book details:", error);
    }
}

function displayBookDetails(book) {
    if (!bookDetailContainer) {
        console.error("Book detail container not found");
        return;
    }

    // Clear any existing content
    bookDetailContainer.innerHTML = "";

    // Add book title
    const title = document.createElement("h1");
    title.innerHTML = book.volumeInfo.title;
    bookDetailContainer.appendChild(title);

    // Add book thumbnail
    const thumbnail = document.createElement("img");
    thumbnail.src = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
    bookDetailContainer.appendChild(thumbnail);
    
    //Add book author
    const author = document.createElement("p");
    author.innerHTML = book.volumeInfo.authors || "No author available.";
    bookDetailContainer.appendChild(author);

    // Add book description
    const description = document.createElement("p");
    description.innerHTML = book.volumeInfo.description || "No description available.";
    bookDetailContainer.appendChild(description);

    //Add save button
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.classList.add("btn", "btn-primary");
    saveButton.onclick = ()=> {
        saveBook(book);
    };
    bookDetailContainer.appendChild(saveButton);
}

function saveBook(book) {
    try {
        let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
        savedBooks.push(book);
        localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
        alert("Book saved successfully!");
    } catch (error) {
        console.error("Error parsing savedBooks from localStorage:", error);
        alert("Failed to save book. Please try again.");
    }
}


// Get book ID from query parameter and fetch book details
const params = new URLSearchParams(window.location.search);
const bookId = params.get("bookId");
if (bookId) {
    fetchBookById(bookId).then(displayBookDetails);
} else {
    console.error("No book ID provided in URL");
}