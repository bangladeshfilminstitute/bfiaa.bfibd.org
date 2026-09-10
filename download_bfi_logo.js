const https = require('https');
const fs = require('fs');
const path = require('path');

const file = fs.createWriteStream(path.join(__dirname, 'images', 'bfi-logo.png'));

https.get('https://bfibd.org/wp-content/uploads/2024/03/BFI-logo-02-1.png', function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();  // close() is async, call cb after close completes.
    console.log('Downloaded bfi-logo.png');
  });
}).on('error', function(err) { // Handle errors
  fs.unlink(dest); // Delete the file async. (But we don't check the result)
  console.log('Error downloading', err.message);
});
