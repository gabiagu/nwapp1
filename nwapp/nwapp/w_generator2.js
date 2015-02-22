module.exports = {
  exported_words: function(callback) {
  // magic
    // initial vars
    var fullDict = [],
        seven_letter_words = [],
        gameWordList = [],
        validWordSelection = [],
        counter = 1,
        masterword = '';


    //============================
    var getWords=function(masterword, callback){
      validWordSelection = [];
      gameWordList = [];
      var results={}
      var a,i,l;
      function nextLetter(a,l,key,used){
        var i;
        var j;
        if(key.length==l){
          return;
        };
        for(i=0;i<l;i++){
          if(used.indexOf(""+i)<0){
              results[key+a[i]]="";
              nextLetter(a,l,key+a[i],used+i);
          };
        };
      };
      a=masterword.split("");
      l=a.length;
      for (i = 0; i < a.length; i++) {
          results[a[i]] = "";
          nextLetter(a, l, a[i], "" + i)
      };
      // eliminate words shorter than 3 letters
      for(var key in results) {
        if (key.length > 2) {
          gameWordList.push(key);
        };
        
      };
      // validate against the full dictionary
      for (var i = 0; i < gameWordList.length; i++) {
        var keytest = gameWordList[i]+'\r';
        if (fullDict.indexOf(keytest) > -1) {
          validWordSelection.push(keytest);
        };
      };

      // sort the set of valid words
      //console.log('before write - '+validWordSelection.length);
      //console.log(validWordSelection);
      validWordSelection.sort();
      if (validWordSelection.length < 40) {
        console.log(masterword);
        console.log('added '+counter+' so far');
        var fs = require("fs");
        var path = 'output/'+counter+'.txt';
        fs.writeFile(path, validWordSelection, function (err) {
          if (err) return console.log(err);
          //console.log('done');
        });
        counter = counter+1;
      } else {
        return;
      };
      
      //console.log('at the end of write length is '+validWordSelection.length)
      
      // send the final selection back as callback
      callback(validWordSelection);
    };

    // 3
    
    reallyStartGettingData(getListOfSevenLetterWords);
    
    // 1
    // LOAD LIST OF 7 LETTER WORDS
    //==============================================
    function reallyStartGettingData(callback) {
      var fs = require('fs');
      fs.readFile('shortlist_seven_letter_words.txt', function(err, data) {
          if(err) throw err;
          sevenLetterWordsList = data.toString().split(",");
          //console.log(sevenLetterWordsList.length);
          callback(sevenLetterWordsList);
      });
    };

    // 2
    function getListOfSevenLetterWords(sevenLetterWordsList){
      
      // 3
      //=================================
      startGettingData(loadFullDict);
      //console.log(sevenLetterWordsList.length);
      //console.log(typeof(sevenLetterWordsList));
      // 1 LOAD FULL DICTIONARY
      //===================================
      function startGettingData(callback) {
        var fs = require('fs');
        fs.readFile('eowl_dict.txt', function(err, data) {
            if(err) throw err;
            fullDict = data.toString().split("\n");
            callback(fullDict);
        });
      };

      // 2
      //===================================
      function loadFullDict(fullDict) {
        
        // var masterword = sevenLetterWordsList[Math.floor(Math.random()*sevenLetterWordsList.length)];
        setTimeout(function() {
        for (i = 0; i < sevenLetterWordsList.length; i++) { 
          validWordSelection = [];
          var masterword = sevenLetterWordsList[i];
          //console.log(masterword);
          getWords(masterword, function(word){
            // will return validWordSelection - array with the set of words
          });
        }
        }, 200);
      };
    };
    //console.log('word selection '+validWordSelection.length);
    return validWordSelection;
    //callback(validWordSelection);
  }
};