// basic server configuration..

import dotenv from 'dotenv';

// loading all environment variable..
dotenv.config();

console.log('PORT from .env:', process.env.PORT);
export const PORT=process.env.PORT || 4000;

// exporting mongodb url
export const MONGODB_URL=process.env.MONGODB_URL;


// Exporting JWT secret key from environment variables
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
