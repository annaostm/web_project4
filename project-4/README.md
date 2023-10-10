# IT2810 Project 4

The code implemented by the team is in the Nextflix1 folder. We have made an application where you can find information about Netflix movies and leave ratings and reviews.

## Start the Nextflix app

To run the application, start in the root file, "IT2810-PROJECT-3" and `cd Nextflix1` into the Nextflix1 folder in the terminal. Then in the terminal write `npm install` (short: npm i) to install the packages and then `npx expo start` to start the React Native-app.
A QR-code will appear in the terminal, along with some options for what you could press to use the app. Since the backend is in an NTNU server, you have to be connected to Eduroam or be connected to NTNU-VPN to be able to load the backend, both on your computer and phone. 

If you are trying the app with your phone, you will need to download the app "Expo Go".
Follow the instructions in the terminal (scan the QR code with Expo Go (if you have an android phone) og scan the QR-code with the camera app and press the notification from Expo Go (if you have an iPhone)).
You can also use simulators for phones on your computer (keep in mind that the design on the app is intended for mobile screens).

Some of the libraries we have used contain components not compatible with web, so avoid trying the app with the web version.

# Documentation for Project 4

Documentation for project 4, by group 45.

## About the application

The Nextflix app is a React Native project where a user can search, filter and see more information about movies and series on Netflix. In addition, users can submit reviews and ratings to the database, which will instantly appear in the app.

We are using the same backend as in project 3, with a mongodb with all our data, and apollo- and express-server (MERN-stack).
The application has the same functionality and theme, but has been better adapted to mobile format by using React Native.

### React Native

React Native is a framework that lets us develop using the React framework together with native platform capabilities, so that the applications are very responsive and well suited for different screens.

We have reused some of the logic from frontend in project 3, as recommended, but also had to adjust a lot, as the tags and libraries that are used in React Native are different from regular react. Furthermore, we used a lot of Material UI components in project 3, which is not avaliable in React Native. We then had to find other options for this. We then used some components from React-Native-Paper. For instance we have used this for Cards, Buttons and Input-fields. The reason we chose this is because it is based on Material UI and have a similar design and funcunality. We also used RNPickerSelect from react-native-picker-select to style and function our filterbuttons. 

We also had to rethink what a user on a mobile phone needs for a good user experience. Therefore, we have put a lot of effort into the navigation system in the App. We have also chosen not to display poster images for the movies in the about pages, as this takes up a lot of space, and we believe the user finds easy access to info about the movie more important than the poster.

### Navigation

We have opted for combining two different types of navigation methods. There is a tab at the bottom at the screen where the user can view the home screen, movies list or series list. We felt that separating these important categories was most intuitive. 

We have also made sure that the filtering, sorting and search-input will stay the same on the movies and series page, even if the user navigates between the different pages. This way, the user can search on something on the movies page, then go to the series-page and filter on "Anime series", and still come back to the same place and search results on the movies-page. This was a conscious decision to benefit the user, by not resetting all the data whenever the user accedentaly navigates to another page. 

There is also a stack function where the user will be sent to the about page of the movie/serie they are viewing, and can return to the last page with the return arrow, while staying on the same tab. This gives a smooth and intuitive experience.

### Search Bar

The user can search for a movie/series and get the expected results. The user does not need to type in the exact title for it to be displayed. The user can type a word or some letters, and the database will find all movies/series containing that word or specific letters. This makes it easier for the user to find desired movie/serie, and was therefore something we prioritized when writing the functunaliy for the search bar. The input is also not case sensitive to make it more user friendly. If there is no suited result, the user will get feedback about this. 

When they want to reset the search field, they can either delete the letters/words in the searchfield or click the cancel button. All the movies/series will then be displayed. The results will be displayed when pressing return on the keyboard or pressing on anything other than the keyboard. A mobile app have limited space, and we therefore decided against implemening a search button. 

Since the search-bar component is rendered in the display-data component, it will be rerendered every time the data changes, like for instance if the user searches on something and the data has to be refetched. This would lead to the searchbar-value also resetting, resulting in correct data-results, but not user friendly to not see what you searched on. To solve this, we also pass in a prop named "defaultValue" the searchbar can be set to. That way, the correct word will be displayed and correspond to the retrived results. 

### Filters and sorting

The user can filter according to which category of movie/serie they want to watch, and sort the results according to release date or alphabetically if they want. The lists for categories for movies and series is in the "lists.ts"-file in the "queries"-folder. 

### About page

The about page uses show_id to find the correct information for a movie/serie, using useQuery. To make sure that when a user clicks on a card, the correct movie/serie is displayed, we have used Apollo Client's reactive variables. It enables you to read and write local data anywhere in your application, without needing to use a GraphQL operation to do so. It is a very effective state management beacuse whenever the value of a reactive variable changes, Apollo Client automatically detects that change. Every active query with a field that depends on the changed variable automatically updates. The reactive variables were implemented using the useReactiveVar React hook. The variables were made using makeVar, and modified/read by calling the function returned by makeVar. We used this to make reactive variables for the correct show_id calles 'MovieId'. When a card is clicked the variable automatically updates, and the aboutpage will use this show_id in the useQuery. That way the function knows how to find the correct movie/serie, by reading reactive variables defined in another file.

The About page shows the average score in procent, title, description, cast, director, release year, country and reviews. The user is also able to submit a rating in stars wich will automatically recalculate the avarage score for the movie/serie. In addition the user can type in a review in the input-field. When they press the submit-button, they will be notified that their review have been sumbitted, and they can see their review instantly in the list of reviews. For handling ratings and reviews in the database, we use useMutations. 

### Components

We have made it a consceous effort to reuse as much of our components as possible. Instead of making the two pages "MoviePage" and "SeriesPage" containing much of the same code, we made a component called "DisplayData" that both pages can render. The pages are differentiated by passing in two props to the "DisplayData"-component, namely navigation (the correct tab the data is displayed) and type (which is either "Movie" or "TV Show"). By using these props, DisplayData can be rendered by both pages, thus drastically reducing repetitive code. Furthermore, the buttons for sorting and filtering use the same component "SelectLabels". The options that can be selected are set by the options-props. 

### Infinite scroll

We have used infitite scroll in our app. Infinite scroll is a technique that loads more content as the user scrolls towards the end of the loaded content. It creates the effect of a never-ending stream of content and can provide a more fluid alternative to conventional pagination, and is the reason we chose to use it. The limit is the maximum number of items returned by each query, and the offset is the number of items that should be skipped. The limit is here set to batchsize and offset set to default 0, but changes to (pageNumber + 1) * batchSize when fetchMore is called. To fetch additional pages of data, we can call the fetchMore function returned by useQuery. This function allows us to update the variables that were originally passed to our query and merges the results of each subsequent query with the existing data returned by the hook. For Apollo Client to merge this data propertly, we configured keyArgs for the type, input, title, category and sort fields in our Apollo Client cache. We then merged existing data with the incoming data. 

### Safe Area View

We decided to use SafeAreaView to render content within the safe area boundaries of a device. It is currently only applicable to iOS devices with iOS version 11 or later. SafeAreaView renders nested content and automatically applies padding to reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views. Moreover, and most importantly, Safe Area's paddings reflect the physical limitation of the screen, such as rounded corners or camera notches.

