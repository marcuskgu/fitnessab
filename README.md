# fitnessab
 
Prototype application repo for group 14's software development project, TIG059 2020 Univeristy of Gothenburg.  
  
The application is built using Node.js with the Express framework. SQLite3 was used to create the relational database. The application connects to the database through a Node.js SQLite3 module. Node.js was selected for its capability to connect to a database in addition to its flexibility in quickly creating a UI.  
  
EJS was selected as view engine because of its programmatic similarity to HTML, as some of our group members had previous (although modest) experience with HTML.  
  
Database interactions and functions can be found in ./database/db.js. The application calls these from the route files. The route files handle user requests. They represent either a web page or a functionality of the application. 

Depending on user interaction, the route files serve view files to the user. For smartphone usecases, view files are always embedded in a special index view. This index view creates a viewport with the dimensions 675x1200 in which all other content is displayed, in order to emulate a smartphone in portrait mode.
  
**APIs and frameworks in use:**  
  
*   **NPM** - Node package manager  
*   **Node.js**  
*   **Express** - web API  
*   **SQLite3 Node.js module**  
*   **EJS** - Embedded JavaScript templating, Express view engine  

**Files/folders with our code:**  
  
*   **./app.js** - main application file, currently only used to initialize the app  
*   **./start.bat** - script to start the server (on windows)  
  
*   **./database/** - folder containing database and related javascript code  
*   **./routes/** - javascript code  
*   **./views/** - html and ejs code  
*   **./views/partials/** - html and ejs code  
*   **./public/stylesheets/** - CSS style sheets  
*   **./sqlfiles/** - folder containing sqlite scripts, schemas etc
