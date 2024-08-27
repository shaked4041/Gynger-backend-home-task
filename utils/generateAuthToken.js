const axios = require('axios');
const fs = require('fs');
const path = require('path');

const envFilePath = path.join(__dirname, '.env'); 

async function generateAuthToken() {
    try {
        const response = await axios.post('https://unreliable-payments-wappznbt3q-uc.a.run.app/auth-tokens');
        const token = response.data.token;

        let envFile = '';
        if (fs.existsSync(envFilePath)) {
            envFile = fs.readFileSync(envFilePath, 'utf8');
        }

        if (!envFile.includes('AUTH_TOKEN=')) {
            fs.appendFileSync(envFilePath, `AUTH_TOKEN=${token}\n`);
            console.log('Auth token stored in .env file');
        } else {
            console.log('Auth token already exists in .env file');
        }
    } catch (error) {
        console.error('Error generating auth token:', error);
    }
}

generateAuthToken();
