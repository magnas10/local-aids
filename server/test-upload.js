const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testUpload() {
  // You need a valid token - check your browser's localStorage
  const token = 'YOUR_TOKEN_HERE';
  
  console.log('Test upload script created.');
  console.log('To test upload, you need to:');
  console.log('1. Login in your browser');
  console.log('2. Open browser console and run: localStorage.getItem("token")');
  console.log('3. Copy that token and update this script');
  console.log('4. Or just test from the browser UI at http://localhost:3000/gallery');
}

testUpload();
