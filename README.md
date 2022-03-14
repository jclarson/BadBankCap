<img src="public/bank.png" width='100'>

# Name

Bad Bank

# Description

This is a React project to simulate a bank's user interface.
It brings together all the knowledge from the MIT xPro course I have been taking.
This is a 3-tier application incorporating front-end and back-end, and attaches to a database.
Users are separated into customers and admins.
Admin users can create additional admin users and can see data for all users.
Customers can create additional customer accounts and are only able to see data for their own account.

# Technology Used

MERN stack (MongoDB, Express, React, and Node.JS).

# Installation

Download the files.

Start a MongoDB database listening on port 27017.

In the download directory, run npm install.

# Usage

Since this is deployed on Heroku, you'll need to change the mongodb setting to point to your local database.

- In the dal.js file:
  - Uncomment line 2
  - On line 5, change the first parameter of MongoClient.connect() from `process.env.MONGODB_URL` to just `url`

Run node index.js from the directory to which the files were downloaded.

After Installation has been completed, open a browser to localhost:3000.

# Features

Basic security requiring email and password to authenticate.

All users can create new user accounts, deposit to and withdraw from checking and savings accounts, and transfer money between the 2 accounts.

Standard users can see all data for their own account.

Admin users:
- Can see all data for all accounts.
- Create admin user accounts when using the create new account page.
- Are denoted visually when logged in with `(A)` after their name in the navbar.

# Support

No support is provided for this application.  Use at your own discretion.

# Roadmap

Plans to possibly add better authentication, plus improvements to the UI such as the ability to display individual transactions rather than just balances.

# License information

MIT License in the LICENSE file in this directory.
