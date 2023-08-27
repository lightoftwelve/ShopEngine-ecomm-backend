# ShopEngine | An E-Commerce Backend

## Overview
This application is an Express.js API that uses Sequelize to interact with a MySQL database. It allows you to manage categories, products, and tags of an e-commerce application.

## Table of Contents
- [Features](#features)
- [Usage Guide](#usage-guide)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Demonstration](#demonstration)
- [Credits](#credits)
- [License](#license)

## Features
- <b>Database Connection</b>: Connects to a MySQL database using Sequelize by providing database name, MySQL username, and MySQL password in an environment variable file.
- <b>Database Creation and Seeding</b>: Allows creating a development database and seeding it with test data using schema and seed commands.
- <b>Server Start and Model Sync</b>: Starts the server and syncs the Sequelize models to the MySQL database.
- <b>Test API GET Routes</b>: Allows testing of the API GET routes for categories, products, or tags to ensure the data is being retrieved correctly.
- <b>Test API POST, PUT, DELETE Routes</b>: Allows testing of the API POST, PUT, and DELETE routes to ensure the data can be successfully created, updated, and deleted in the database.

## Usage Guide
1. **Installation**:
    ```bash
    git clone git@github.com:lightoftwelve/ShopEngine-ecomm-backend.git
    npm install
    ```

2. **Setting up the Database**:
    Navigate to the `db` folder and run the `schema.sql` in your preferred database tool (e.g., MySQL Workbench) to set up the database tables.

3. **Starting the Application**:
    ```bash
    node server.js
    ```

## Screenshots
![A screenshot of the app routes in Insomnia](/images/shopengine-ecomm-backend-screenshot.png)

## Technologies Used
- Node.js
- Sequelize
- MySQL2
- DotENV

## Live Demo
Watch the demo [here](https://drive.google.com/file/d/15sNWDmaryInAx1SemJFRmEZwlHhU6ulw/view).

## Credits
This project was accepted and completed as part of the UofT SCS Coding Boot Camp Online: Fullstack Flex PT course through the University of Toronto. The contents of the seeds folder, config folder, and pieces of other files as marked in the code were created by edX Boot Camps LLC. and has been modified for the purpose of this assignment. Otherwise, this project was independently developed by myself, Victoria Alawi.
- Github: [@lightoftwelve](https://github.com/lightoftwelve)
- LinkedIn: [@Victoria Alawi](https://www.linkedin.com/in/victoria-alawi-872984250/)
- Website: [www.lightoftwelve.com](http://www.lightoftwelve.com)

## License 
The license for this project is currently unavailable.
