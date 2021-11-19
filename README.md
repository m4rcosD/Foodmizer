
###What tools we used
- We used the Spoonacular API and got a licence key for this project
- Mongo DB --> for database
- Postman --> test data from API
- Axios --> to fetch data from API and conect to our server
- Express.Js --> to create a server side project
###Contributors
This project is built by two creative mind that go by the alias's of:
- @Marcos Paulo Dias
- @Rodrigo Ribeiro


# Food Randomizer 1.7

## Description

Who didnt got stuck without ideas to your next meal?
Current solutions are usualy push u to a specific segment(vegans / personal recipes/etc..)
This web application  will consist in a basic search and filter plataform to fetch meals from a selected API, and display them to the user in a super and simple format.
When its time to go to the kitchen just focus on the ingredients that we have and folow the proposed steps, we take care of the recipe and hep you thought the process.
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can favourite my prefered meals
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to have all the meals available so that I can get a random one
- **events create** - As a user I want to create an prfofile so i cand edit my preferences
- **events detail** - As a user I want to see the event details, images and steps of my selected recipe 
- **event filter** - As a user I want to be able to attend to event so that the organizers can count me in

## Backlog

List of other features outside of the MVPs scope

User profile:
- Dark/Light mode
- upload my profile picture
- log in via Google
- list of recepies created by the user stored in his profile


Geo Location:
- add geolocation to events when creating
- show event in a map in event detail page
- show all events in a map in the event list page

Homepage
- ...


## ROUTES:

- GET / 
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /search
  - renders a filter search bar
- POST /random 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
username: String
password: String
favourite recepies: ?? goes on user models? since its stored on the user profile /// HELP
```

recipe model

```
Recipeid: ObjectId<User>
Title: String
Description: String
Steps: String
Ingredients: String , Numbers
Cusine type: String
Duration: Number
Image: img     // IMage type exists ?? /////HELP
 ```
 ###What tools we used
- We used the Spoonacular API and got a licence key for this project
- Mongo DB --> for database
- Postman --> test data from API
- Axios --> to fetch data from API and conect to our server
- Express.Js --> to create a server side project

###Contributors

This project is built by two creative mind that go by the alias's of:
- @Marcos Paulo Dias
- @Rodrigo Ribeiro
