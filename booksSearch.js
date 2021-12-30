const keyword = document.getElementById('keywords');
keyword.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('submitSearch').click();
    }

});


//Google Books Api Information
const googleBooksApi = "https://www.googleapis.com/books/v1/volumes?q=";
const apiKey = //your API Key goes here, refer to read me;
const googleBooksSearchResults = async (x) => {
    try {
        return await axios.get(`${googleBooksApi}${x}+&key=${apiKey}`);
    } catch (error) {
        console.error(error);
    }
};

const savedBooksLists = [];

const getAllSearchResults = async () => {
    let query = keyword.value;

    if (query == "") {
        alert("Whoops! You typed in an empty search. Please enter and author or title.");
    } else {
        let searchResults = await googleBooksSearchResults(query);
        let books = searchResults.data.items;
        return books;
    }
};

let topFiveArray = [];

function createBookDisplayDiv() {
    const booksDisplayList = document.createElement('div');
    booksDisplayList.setAttribute('id', 'bookDisplayDiv');
    const parentDiv = document.getElementById('displayBooks');
    parentDiv.appendChild(booksDisplayList);
}

function removeBookDisplayDiv() {
    let displayedBooks = document.getElementById('bookDisplayDiv');
    displayedBooks.remove();
}

function createButtonsForDisplay(num, divLocation, title, author, publisher) {
    const savedBooksList = document.getElementById('savedForLaterBookList')
    const newButton = document.createElement('button');
    newButton.setAttribute('id', `button${num + 1}`);
    newButton.innerHTML = 'Save For Later';

    newButton.addEventListener('click', () => {
        console.log(`button #${num + 1} clicked`);
        const savedItem = document.createElement('li')
        savedItem.innerHTML =`<div><b>Book Title:</b> ${title}</div>
        <div><b>Author(s):</b> ${author}</div>
        <div><b>Publisher:</b> ${publisher}</div>
        <p></p>
        `
        ;
        savedBooksList.appendChild(savedItem)

    });
    divLocation.appendChild(newButton);
    

}

function displayBookInformation(w, x, y, z) {
    const displayBooks = document.createElement('div');
    displayBooks.innerHTML = `<h3>${w + 1}. ${x}</h3>
                      <div><b>Author(s):</b> ${y}</div>
                      <div><b>Publisher:</b> ${z}<div>
                      `
        //   <button id='bookNumber${w + 1}'>Add to Reading List</button>
        ;
    const newList = document.getElementById('bookDisplayDiv');
    newList.appendChild(displayBooks);

    createButtonsForDisplay(w, displayBooks, x, y, z);


}


const getTopFiveResults = async () => {
    let searches = await getAllSearchResults();
    createBookDisplayDiv();

    if (topFiveArray.length === 0) {
        for (let i = 0; i < 5; i++) {
            let volumeInfo = searches[i].volumeInfo;
            let title = volumeInfo.title;
            let author = volumeInfo.authors;
            let publisher = volumeInfo.publisher;

            topFiveArray[i] = {
                'Title': `${title}`,
                'Author': `${author}`,
                'Publisher': `${publisher}`
            };

            displayBookInformation(i, title, author, publisher);
        }

    }
    else {
        removeBookDisplayDiv();
        topFiveArray = topFiveArray.splice(0, topFiveArray.length);
        for (let i = 0; i < 5; i++) {
            let volumeInfo = searches[i].volumeInfo;
            let title = volumeInfo.title;
            let author = volumeInfo.authors;
            let publisher = volumeInfo.publisher;

            topFiveArray[i] = {
                'Title': `${title}`,
                'Author': `${author}`,
                'Publisher': `${publisher}`
            };
            displayBookInformation(i, title, author, publisher);
        }
    }

    console.log(topFiveArray);
};



