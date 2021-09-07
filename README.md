## Task
Your task is to implement a **Personal Job Alert service** which will send an email for newly added jobs, which match the criteria defined by the user.

1. **Basic Version of the Job Alert Service**
   1. For every new job added to the DB I want to get an **email notification** if it matches my search criteria
   1. Search criteria will be:
        - a list of **cities** that I define, when I set up the service
        - List of **keywords** that I’m interested in, which will be searched for in the job’s title
   1. Every time a new job get’s added which matches any of these criteria I want to receive a simple notification via email (plain-text is fine) containing the details of the job (title, city, company name, investors)
1. **Advanced version: Daily Jobs Digest Service**
   1.  In a real-world example we would have lots of jobs being added every day, it would be very spammy to send the user one email for each new job
   1. Instead we want to send him a digest at the end of the day (scheduled for a specific time) that will contain an aggregated list of all matching jobs that have been added during the day  

How you write that service is up to you, the only requirement from our side is that you do it in **NodeJS**.

Here are some suggestions where to get started:
- You should take a look at **Events** in Hasura, for setting up a trigger to your service
- Right now the DB does not have an exposed port to the outside in the Docker config
- You can either query data from the DB using GraphQL queries or connect directly with Postgres credentials
- Please design the extended DB schema that can store the job alert configs for users

Make sure to put a focus on **error handling** and **testing** for the service that you’re developing.

Let me know if you have any questions.

## Overview

This project uses a `docker-compose` file to bundle the React app with a Postgres database and [Hasura GraphQL Engine](https://hasura.io/).
Upon start the database will be initialized with tables `jobs`, `companies`, `investors` and `company_investors` and seeded with data.

## How to run the project

There are two ways how to run the project:

1.) Using only the docker-compose file: 
- `docker-compose up --build`
- This will start the React app on port 8000 and Hasura on port 8080

## Description of commands

### `docker-compose up -d --build`

Builds and starts the containers for the React app, Postgres database and Hasura Console alongside each other.
It can take a few seconds after the containers have started until the Database is fully initialized and seeded.
* Open [http://localhost:8000](http://localhost:8000) for the **React app**
* Open [http://localhost:8080](http://localhost:8080) for the **Hasura Console**

## About Hasura GraphQL Engine

Hasura GraphQL Engine is a blazing-fast GraphQL server that gives you **instant, realtime GraphQL APIs over Postgres**, with [**webhook triggers**](event-triggers.md) on database events, and [**remote schemas**](remote-schemas.md) for business logic.

Hasura helps you build GraphQL apps backed by Postgres or incrementally move to GraphQL for existing applications using Postgres.

Read more at [hasura.io](https://hasura.io) and the [docs](https://hasura.io/docs).



# Changes I've made 
1. Added a talentspace-node folder to hold the node application 
2. Made changes to the docker-compose.yaml file to start up the backend along with the rest of the application 
3. Added a few more migrations to the Hasura migrations folder that hold changes for the application logic 
   a. created an alert_config table to hold alert settings for the application with columns email, cities and key_words, if the job matches with the cities and the keywords, the email address wil get an alert / digest 
   b. added a column to jobs table to hold the created date so we can send a 24 hour digest for the people who match the criteria 

## How to run / check the application 
   - running docker-compose up --build should start up the whole application and the backend should start on localhost:4000 (nest-api.dev:4000 in the docker network)
   - In the .env file in talentspace-node folder, you should set DIGEST_EMAIL_SCHEDULE to run every 24 hours, in CRON format Eg;- 0 0 * * *. But for testing purposes you can make it run every minute or at a specific time 
      - Right now the digest is running every minute at the 45th second for testing purpose 
   - In alert_config table you can insert rows for alert settings for instance. cities and keywords should be comma separated 
      For instace: email: test@gmail.com        cities: London, Paris, Frankfurt        key_words: developer, frontend 
   - In the hasura events, create an event trigger for a job insert operation, the webhook URL should be http://nest-api.dev:4000/job/alert
      - When you create a job, if any of the alert_config records match the job, the email address will receive an alert 
      - Also The email address will receive a digest for all jobs at the specified time in the .env 



