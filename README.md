
# Meet App

Objective
To build a serverless, progressive web application (PWA) with React using a test-driven
development (TDD) technique. The application uses the Google Calendar API to fetch
upcoming events.

Key Features
1. Filter events by city.
2. Show/hide event details.
3. Specify number of events.
4. Use the app when offline.
5. Add an app shortcut to the home screen.
6. View a chart showing the number of upcoming events by city.

## Feature 2: Show/Hide an event’s details.

User Story
As a user
I should be able to click on an event. So that I can see more/less detail about that event.
Scenarios:
- Scenario 1: An event element is collapsed by default.
Given The main page showed all the events.
When the user selects a city
Then The user will see a list of events in that city by title except the details which is hidden/collapsed by default
- Scenario 2: User can expand an event to see its details.
Given The user did see a list of events,
When the user clicks on an event
Then the event will expand to show more detail about that event.
- Scenario 3: User can collapse an event to hide its details.
Given The main page showed an expanded event with its details. When the user clicks on the expanded event
Then the event will collapse to hide extra details

## Feature 3: Specify number of events. 

User Story
As a user
I should be able to select how many events I want to see.
So that I can choose the number of events on screen at a time.
Scenarios:
- Scenario 1: When a user did not specify a number, 32 is the default number.
Given The main page showed events from a city. When The user loads the list of events
Then 32 events will be loaded by default.
- Scenario 2: User can change the number of events they want to see.
Given the main page showed events from a city.
When the user inputs the number of events that they want to see per page
Then the number of events on the page will change to match the number that the user input
 
## Feature 4: Use the App when offline. 

User Story
As a user,
I should be able to use the app when offline.
So that I do not need internet access to see the events I was viewing previously
Scenarios: 
- Scenario 1: Show cached data when there is no internet connection.
Given The user was not connected to the internet.
When the user opens the app
Then the users will see the events in the city that were viewed by the user last time.
- Scenario 2: Show error when user changes the settings (city, time range)
Given the user was not connected to the internet and the app is open.
When the user tries to change the settings that they are not cached
Then the app will display an error saying that they must reconnect to the internet to access that data.

## Feature 5: Data visualization 

User Story
As a user,
I should be able to see a visualization of the events for the different cities. So that I can easily see which cities are the most eventful.
Scenario:
- Scenario 1: Show a chart with the number of upcoming events in each city.
Given the user was using the app for multiple cities.
When the user opens the app
Then the app will display multiple cities with the events in each in a bar graph that easily communicates the number of events in each city.

![alt text](https://github.com/Abakayfl/meet/blob/master/Screen%20Shot%202021-04-18%20at%2012.23.01%20AM.png)


## Link for the app
https://abakayfl.github.io/meet/
