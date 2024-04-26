



function searchButton(){
    var search = document.getElementById("txtSearch").value;
    var newE = document.createElement("p");
    newE.innerHTML = search;
    document.getElementById("searchResults").appendChild(newE);
}







