const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from .env file
const envConfig = dotenv.parse(fs.readFileSync('.env'));

// Set environment variables
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}
