# Book-Search-App-Tech-Asses-8th-Light-DEC-2021

# #1. ProjectDescription

> The application takes keywords from the user to display 5 search results provided by the Google Books API. 
I intend to implement the ability to save books from the user's book search and a page to view all the saved books.
Unfortunately I ran out of time and could not get these functions operating before the first deadline.
I origionally planned to use a mongodb server to save the book searches however I may switch to creating a shopping cart like javascript function to save the book searches.

Some of my biggest difficulties in creating this project dealt with applying my knowledge and using new technologies.
I hadn't had the chance to use the Google APIs yet, the first hurdle was attempting to properly access the information I wanted from Google Books.
Then the next biggest challange was creating dynamic templates using express and NODE.js to display the 5 search results. 
Now I am attempting to create a ejs page that renders the saved books and one that creates the saved book search. My approach may change.


2. Before Running

>Enter the link http://localhost:2000/gbooks into your browser. In the terminal (I used gitbash) intilize using npm init-y and install the following npm packages using
npm i axios body-parser ejs express googleapis method-override mongoose nodemon

I used mongodb to create a server. It is not really saving much information rn becaue I haven't been able to store information from saved books there yet.
However, in order to have my server open I use the windows powershell to run mongod, I open a seperate powershell page and run mongo to start the server.
