


const form = document.getElementById('searchForm');
const apiKey = "AIzaSyAvQEdxlEXw009DfNKihy44hF1fFmxlvXQ";
const bookSearch = document.getElementById('bookSearch')


//Accessing information from Google Books API
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value
    const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}+&key=${apiKey}`)

    // I tested a base case to see if everything matched and I was properly accessing information from Google Books API
    console.log(res.data.items[0].volumeInfo.title)
    console.log(res.data.items[0].volumeInfo.authors)
    console.log(res.data.items[0].volumeInfo.publisher)

    const title = res.data.items[0].volumeInfo.title
    const author = res.data.items[0].volumeInfo.authors
    const publisher = res.data.items[0].volumeInfo.publisher
    
    //Displying Author, Title, and Publisher 
    const bookInfo = document.createElement("p");

    const bookTitle = document.createTextNode(`Title: ${title}, `);
    const bookAuthors = document.createTextNode(`Author(s): ${author}, `);
    const bookPublisher = document.createTextNode(`Publisher: ${publisher}`);

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthors);
    bookInfo.appendChild(bookPublisher);

    const element = document.getElementById("div1");
    element.appendChild(bookInfo);

})

