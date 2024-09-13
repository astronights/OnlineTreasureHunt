# Online Treasure Hunt

An online treasure hunt structured as a riddle with incremental levels. This is supported with a live dashboard to track players.

The set of questions can be upserted to a MongoDB database, with the relevant media uploaded as static files.

## Puzzle Format

The puzzle is split into multiple levels

- Each level can be accessed only on completion of the previous level.
- Levels contain text, image and media clues
- Other elements such as source codes, hidden files are also used as clues.

## Technology Stack

NodeJS is primarily used to build this website. 

Additional functionalities are implemented with:

- Passport JS (Authentication)
- BCrypt (Cryptography)
- MongoDB (Level Details)
- eJS (Serving static web pages)

## Running the App

The app can be run as a standard NodeJS app

```bash
npm start
```
