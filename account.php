<?php
  session_start();
  if(isset($_SESSION['username'])){
      $user = $_SESSION['username'];
      $email = $_SESSION['email'];
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>User Account</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: blanchedalmond;">
        <div class="container-fluid">
          <a class="navbar-brand" href="account.html"><i class="fa-solid fa-user"></i></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" style="padding-top:5%;">
                <?php
                    if(isset($_SESSION['username'])): ?>
                      Welcome, 
                      <?php echo $_SESSION['username']; ?>
                  <?php endif; ?>
                  !
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="index.php">Home</a>
              </li>
              
            </ul>
            <form id="searchForm" class="d-flex">
              <input class="form-control me-2" id="txtSearch" placeholder="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
          </form>          
          </div>
        </div>
      </nav>

    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <h1>User Account</h1>
                <hr>
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">
                            <?php
                                if(isset($_SESSION['username'])): ?>
                                <?php echo $_SESSION['username']; ?>
                            <?php endif; ?>
                        </h5>
                        <p class="card-text">Email: 
                            <?php
                                if(isset($_SESSION['email'])): ?>
                                <?php echo $_SESSION['email']; ?>
                            <?php endif; ?>
                        </p>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
    <main id="book-container" class="container">
        <div class="row" id="main">
          
        </div>
    </main>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script>
document.addEventListener("DOMContentLoaded", function() {
    fetch('fetchBooks.php')
        .then(response => response.json())
        .then(books => {
            if (books.error) {
                alert('Error: ' + books.error);
                return;
            }
            const container = document.getElementById('main');
            books.forEach(book => {
                const div = document.createElement('div');
                div.className = 'col-md-4';
                div.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${book.googleBooksUrl}" alt="Book Image">
                        <div class="card-body">
                            <p class="card-text">${book.title}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => console.error('Error loading books:', error));
});
</script>

</body>

</html>