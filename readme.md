## About

This a sample application to perform following tasks

* As a user, I can view all lists and tasks which have been created
* As a user, I can create an empty list with a name property
* As a user, I can delete an entire list with all its tasks
* As a user, I can add new tasks to an existing list with a name, description and deadline properties
* As a user, I can update the name, description and deadline of a task within a list
* As a user, I can move a single task to a different list
* As a user, I can move multiple tasks to a different list in a single transaction
* As a user, I can delete a task from a list
* As a user, I can delete multiple tasks from a list in a single transaction
* As a user, I can complete a task
* As a user, I will receive an email when a task is completed
* As a user, I will receive an email when a task passes it's deadline

## Tech used

* NodeJS : For the api services
* ReactJS : For the frontend app
* MongoDB : For the database
* Mocha : For testing api services

## Getting Started

Follow the below instructions on setting up the project locally.

## To run the app on docker

1. From your terminal change the working dir to docker
   ```js
   cd docker
   ```
2. To deploy to docker
   ```js
   docker-compose up
   ```

## To run the app on local

1. Locate to rest-api dir
   ```js
   cd rest-api
   ```
2. Make sure mongo db is running on localhost and change the below line in .env (both rest-api and service-manager)
   ```js
    DATABASE_URL=mongodb://localhost:27017/
   ```
3. Run apis
   ```js
   npm install
   ```
   ```js
   npm start
   ```
4. Locate to frontend dir
   ```js
   cd frontend
   ```
5. Run react app
   ```js
   npm install
   ```
   ```js
   npm start
   ```
6. To regenerate api docs
   ```js
   npm run swagger-autogen
   ```
7. Locate to service-manager dir
   ```js
   cd service-manager
   ```
8. Run service manager app for scheduled jobs
   ```js
   npm install
   ```
   ```js
   npm start
   ```

## Urls

* React App [http://localhost:3001](http://localhost:3001)
* API Base Url [http://localhost:3000](http://localhost:3000)
* API Docs Url [http://localhost:3000/docs](http://localhost:3000/docs)

## To test the app

   ```js
   npm test
   ```