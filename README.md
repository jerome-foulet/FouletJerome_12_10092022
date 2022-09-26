# Profil page of SportSee

This project was initialized using Create React App.

To install it you need node (v16.13.1) and npm (8.4.1) and use the command

`npm install`

To run the project use the command

`npm run start`

You can change profil by passing the "userId" with value "12" or "18" in query parameters like

`?userId=18`

You can switch between mocked data or API call by passing "isMockedData" with value "true" or "false" in query parameters like

`?isMockedData=false`

Both can be combined like

`?isMockedData=false&userId=18`

By default the application without query parameters use mocked data on userId 12.

The .env file contain `REACT_APP_BACKEND_URL` to change the URL to the BACKEND API.

# BackEnd API

For informations about BACKEND, please report to the repo

[Project 9 - Front-end Dashboard](https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard)
