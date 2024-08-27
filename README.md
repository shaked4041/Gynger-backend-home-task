Gynger Basic Lending API
Overview
A basic lending API to manage signers, loans, and payments.

Integrates with the Unreliable Payments API for payment processing.

Setup
1. Clone the Repository

git clone https://github.com/shaked4041/Gynger-backend-home-task.git
cd Gynger-backend-home-task

2. Install Dependencies

npm install

3. Configure Environment
Create a .env file with:

PORT=3000

MONGO_URI=your_mongodb_connection_string

AUTH_TOKEN=your_initial_auth_token

4. Generate Auth Token 

Run the following script to fetch and store a new auth token:

node generateAuthToken.js

This script requests a new token from the Unreliable Payments API and saves it to .env.

If a token already exists, it won't overwrite it.

Note: Ensure axios is installed (npm install axios).

5. Start the Application

npm start
The server will run on port 3000. 

Modify the PORT variable in .env to change it.
