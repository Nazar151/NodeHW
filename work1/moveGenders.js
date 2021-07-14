const fs = require('fs');
const path = require('path');

const path1800 = path.join(__dirname, '1800');
const path2000 = path.join(__dirname, '2000');

const boysPath = path.join(__dirname, 'boys');
const girlsPAth = path.join(__dirname, 'girls');

function moveGender() {
  fs.readdir(path1800, (err, files) => {
    files.forEach((file) => {
      fs.readFile(path.join(path1800, file), (err1, data) => {
        if(err1) console.log(err1);
        const changeJson = JSON.parse(data.toString());
        changeJson.gender === 'male'
          ? fs.rename(path.join(path1800, file), path.join(boysPath, file), err2 => {})
          : fs.rename(path.join(path1800, file), path.join(girlsPAth, file), err2 => {});
      });
    });
  });

  fs.readdir(path2000, (err, files) => {
    files.forEach((file) => {
      fs.readFile(path.join(path2000, file), (err1, data) => {
        if(err1) console.log(err1);
        const changeJson = JSON.parse(data.toString());
        changeJson.gender === 'female'
          ? fs.rename(path.join(path2000, file), path.join(girlsPAth, file), err2 => {})
          : fs.rename(path.join(path2000, file), path.join(boysPath, file), err2 => {});
      });
    });
  });
}

module.exports = moveGender;
