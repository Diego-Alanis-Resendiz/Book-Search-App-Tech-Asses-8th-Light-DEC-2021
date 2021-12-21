const form = document.getElementById('searchForm');
const apiKey = "AIzaSyAvQEdxlEXw009DfNKihy44hF1fFmxlvXQ";
const bookSearch = document.getElementById('bookSearch');
const googleApi = "https://www.googleapis.com/books/v1/volumes?q=";

const searchTerm = form.elements.query.value;

//Accessing information from Google Books API
form.addEventListener('click', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const res = await axios.get(`${googleApi}${searchTerm}+&key=${apiKey}`);

    //this function get necessary information from API and displays it on the html website    
    function bookResults(x) {
        for (let i = 0; i < x; i++) {
            let items = res.data.items[i];
            let title = items.volumeInfo.title;
            let author = items.volumeInfo.authors;
            let publisher = items.volumeInfo.publisher;

            const book = document.createElement('div');
            book.innerHTML = `<h3>${i + 1}. ${title}</h3>
                              <div><b>Author(s):</b> ${author}</div>
                              <div><b>Publisher:</b> ${publisher}<div>
                              `
                ;

            const newList = document.getElementById("bookResults");
            newList.appendChild(book);
        }
    }

    bookResults(5);
});


