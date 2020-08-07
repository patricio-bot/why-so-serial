# Why so Serial?

![logo](/public/images/Logo.png)

## Description

Search and collaborative Data Base platform for Serial Killers in which you can read info about famous Serial Killers and you can also add new killer files, edit them and delete them. :knife: You can also add to favorites the files you like the most and have a personal diplay of those or leave comments with lots of love or suggestions for the creators. :heart:



## User Stories

- **404** - As users, we want to be politely warned that this page does not exist and it was our fault to search for it. :warning:
- **500** - As users, we want to be politely warned that the amazing team behind the project screwd it up and it's not our fault.​ :broken_heart:
- **Homepage** - As users, we want to be able to access the homepage and filter killers by alphabetical order or by Zodiac sign. :house:
- **Display results** - As users, we want a nice display of the information we've been searching for. :mag_right:
- **Detailed display** - As users, we also want to be able to get another nice display of the detailed information of the killer we just clicked on. :computer_mouse:
- **Sign Up** - As users, we may love the page and want to see some additional content so we want to create an account. It's free! :free:
- **Log In** - As users, we want to log in so we can see the amazing aditional features and create our profile! :sunglasses:
- **Log Out** - As users, we want to close our session once we finished navigating through this amazing page so no one can get back to our account. :wave:
- **Edit Profile** - As users, we want to be able to edit our profiles whenever we need it. :clown_face:
- **Create Killer File** - As users, if we don't find a file about the killer we've been searching for, we want to be able to create that file ourselves and be able do see those displayed in our profile. :new:
- **Edit Killer File** - As users, we want to edit the killer files if some information is not correct or there's a recent update. :bar_chart:
- **Delete Killer File** - As users, we want to delete some of the killer files we've created anytime we need to. :x:
- **Comments** - As users, we want to add comments to a particular killer file to make suggestions for the creator or to tell him/her how much we loved the detailed information he/she provided. :heart_eyes:
- **Favorites** - As users, we want to add our favorite reads to a favorites list and display those anytime we want so we don't need to do the same search again. :heart:



## Server Routes (back-end) 

| **Method** | **Route**                  | **Description**                                              | **Request - Body**                                          |
| ---------- | -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `GET`      | `/`                        | Main page route. Renders home `index` view.                  |                                                              |
| `GET`      | `/killers/alphabet/:letter` | Renders `killers` view.                                      |                                                              |
| `GET` | `/killers/search/:zodiac` | Renders `killers` view. | |
| `GET`      | `/killers/:killerId` | Renders `details` view.                                      |                                                              |
| `POST`     | `/private/reviews/add`  | Sends comments form data to the server, updates DB and renders `details` view. | {author, comment}                                            |
| `GET`      | `/signup`                  | Renders `auth/signup` form view.                             |                                                              |
| `POST`     | `/signup`                  | Sends Sign Up info to the server and creates user in the DB. Renders `auth/signup` view. | {name, email, password}                                      |
| `GET`      | `/login`                   | Renders `auth/login` form view.                              |                                                              |
| `POST`     | `/login`                   | Sends Log In form data to the server and redirects to homepage. | {email, password}                                            |
| `GET`      | `/logout`                  | Logges user out and redirects to `index` view.               |                                                              |
| `GET`      | `/private/profile/:userId`    | Private route. Renders `private/profile` view.         |                                                              |
| `GET`      | `/private/edit-user` | Private route. Renders `private/edit-user` form view. |                                                              |
| `POST`    | `/private/edit-user` | Private route. Sends edit-profile info to server and updates user in DB and in `profile` view. | {[imageUrl], name, email, password}                          |
| `GET`      | `/private/add-killer`      | Private route. Renders `private/add-killer` form view.       |                                                              |
| `POST`     | `/private/add-killer`      | Private route. Sends add-killer info to server and creates killer in DB. | {[imageUrl], author, name, lastName, aka, gender, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, murderType, description, books} |
| `GET`      | `/private/edit-killer` | Private route. Renders `private/edit-killer` form view.      |                                                              |
| `POST`    | `/private/edit-killer` | Private route. Sends edit-killer info to server and updates killer in DB and in killers view. | {[imageUrl], author, name, lastName, aka, gender, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, murderType, description, books} |
| `POST` | `/private/delete-killer`     | Executes delete button function and updated DB. Redirects to `/private/profile/${userId}` view. |                                                              |
| `POST`  | `/private/fave-killer` | Private route. Redirects to `/private/profile/${userId}` view. |                                                              |



## Models

Serial Killer model

```javascript
{
  "image": String,
  "author": { type: Schema.Types.ObjectId, ref: 'User' },
  "name": String,
  "lastName": String,
  "aka": String,
  "gender": String,
  "birthDate": String,
  "zodiacSign": String,
  "yearsActive": [Number],
  "numberOfVictimsConfirmed": Number,
  "numberOfVictimsPossible": Number,
  "country": String,
  "weapons": [String],
  "arrested": Number,
  "victimProfile": String,
  "murderType": [String],
  "description": String,
  "books": [String],
  "review": [{
            user: String,
            comments: String
        		}]
  }
```



User model

```javascript
{
  "image": { type: String, default: '../images/avatar.png' },
  "name": String,
  "email": String,
  "password": String,
  "isAuthor": { type: Boolean, default: false },
  "killersCreate": [{ type: Schema.Types.ObjectId, ref: 'Killer' }],
  "faveKillers: [{ type: Schema.Types.ObjectId, ref: 'Killer' }]
}
```



Comment model

```javascript
{
  "author": { type: Schema.Types.ObjectId, ref: 'User' },
  "comment": String,
  "killerReviewed": { type: Schema.Types.ObjectId, ref: 'Killer' }
}
```



## Backlog

- Insert a Cluedo game so the user can solve crime related riddles and catch the killer.
- Allow password edit only with email validation.
- Allow users to interact with each other and see others' profiles.
- Create a public API with the db we made.



## Links

#### Git 

[Repository Link](https://github.com/MartaJank/why-so-serial-m2-project)

[Deploy Link](https://why-so-serial.herokuapp.com/)



#### Trello

[Our Trello board](https://trello.com/b/TlfJc7Ud/why-so-serial)



#### Slides

[Our amazing presentation!](https://docs.google.com/presentation/d/1ttOryOclzhJ0yiJgGZhi4_01DrFzLpvSLqSiYrLTAB0/edit?usp=sharing) 

