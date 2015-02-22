module.exports = {
  generateWordList: function() {
    var fs = require('fs');
    var fileNumber = Math.floor(Math.floor(Math.random() * 150) + 2);
    var text = fs.readFileSync('output/'+fileNumber+'.txt');
    //console.log(fileNumber);
    return text.toString().split(',');

    /*var wordsList = [];

    getData(writeData);

    function getData(callback) {

      var fs = require('fs');
      var fileNumber = Math.floor(Math.floor(Math.random() * 168) + 0);
      fs.readFile('output/'+fileNumber+'.txt', function(err, data) {
          if(err) throw err;
          wordsList = data.toString().split(",");
          // this fills in the array with stuff and sends it back, I guess
          callback(wordsList);
      });

    };
    
    console.log('in between - '+wordsList.length);
    // this returns 0 :(
    function writeData(wordsList) {
      console.log(wordsList.length);
      // this returns the length of the filled array
    };
    console.log('before return - '+wordsList.length);
    // this returns 0 :(
    return wordsList;
    */
  }
};