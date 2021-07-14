const fs = require('fs');
const path = require('path');

const path1800 = path.join(__dirname, '1800');
const path2000 = path.join(__dirname, '2000');

function moveUsers() {
  fs.readdir(path1800, (err, files) => {
    files.forEach((file) => {
      fs.rename(path.join(path1800, file), path.join(path2000, file), err1 => {});
    });
  });

  fs.readdir(path2000, (err, files) => {
    files.forEach((file) => {
      fs.rename(path.join(path2000, file), path.join(path1800, file), err1 => {});
    });
  });
}

module.exports = moveUsers;
