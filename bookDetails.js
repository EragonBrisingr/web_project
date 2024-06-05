
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
    fetch('saveBook.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',//save as json
        },
        body: JSON.stringify({ //convert to json from js object
            userId: sessionStorage.getItem('userId'), // Assuming user ID is stored in sessionStorage
            bookId: book.id,  // Assuming `book.id` is the Google Books ID
            googleBooksUrl: `https://www.googleapis.com/books/v1/volumes/${book.id}`
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Book saved successfully!");
        } else {
            throw new Error(data.message);
        }
    })
    .catch(error => {
        console.error("Error saving book:", error);
        alert("Failed to save book. Please try again.");
    });
}



// Get book ID from query parameter and fetch book details
const params = new URLSearchParams(window.location.search);
const bookId = params.get("bookId");
if (bookId) {
    fetchBookById(bookId).then(displayBookDetails);
} else {
    console.error("No book ID provided in URL");
}
