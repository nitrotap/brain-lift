# brain-lift

## Description

Brain Lift helps users understand how their cognitive load affects their learning and performance. Use the NASA Task Load Index to measure and track your cognitive load for different tasks.

Brain Lift uses a PHP server for cost-effective and customizable server-side operations. User data is stored in a secure and reliable MySQL database. The front-end is built with Angular and Ionic, ensuring a responsive and intuitive user interface. These technologies together enhance the user's experience in tracking cognitive load.

![badmath](https://img.shields.io/github/languages/top/nitrotap/brain-lift)
![badmath](https://img.shields.io/github/issues/nitrotap/brain-lift)
![badmath](https://img.shields.io/github/forks/nitrotap/brain-lift)  
![badmath](https://img.shields.io/github/stars/nitrotap/brain-lift)

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)

- [Tests](#Tests)
- [Questions](#Questions)
- [License](#License)

## Installation

This application requires Node.js, Angular, and Ionic.

### Visit the website to download and install Node.js.

[https://nodejs.org/en/download](https://nodejs.org/en/download)

### Angular CLI

`npm install -g @angular/cli`

### Ionic CLI

`npm install -g @ionic/cli`

### Clone the repo from GitHub

`git clone https://github.com/nitrotap/brain-lift.git`

### Use the develop branch

`git checkout develop`

### Install the npm packages

Ionic Angular is set up in the client folder  
`cd client\`

Install npm packages  
`npm i`

### Run the development server

`ionic serve`

### Set up database

Be sure to set up and start the mysql database. Ensure the proper attributes are present in the env.php file. A sample is given in sample.env.php.

In phpmyadmin, run tables.sql to set up the database. Run seeds.sql to add sample data to the database.

## Usage

To launch development server, go to the client folder and run ionic serve

`cd client`

`ionic serve`

## Tests

`ng test`

## Questions

Please reach out to me on [GitHub](https://github.com/nitrotap) or by email at kartikinpublic@gmail.com for any additional questions.

## License

<p>&copy; 2023 Kartik Jevaji. All rights reserved.</p>
