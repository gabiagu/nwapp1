module.exports = {
  exported_words: function(callback) {
  // magic
    // initial vars
    var fullDict = [],
        seven_letter_words = [],
        gameWordList = [],
        validWordSelection = [],
        masterword = '';


    //============================
    var getWords=function(masterword, callback){

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
      validWordSelection.sort();
      console.log(validWordSelection.length);
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
      fs.readFile('seven_letter_words.txt', function(err, data) {
          if(err) throw err;
          sevenLetterWordsList = data.toString().split(" ");
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
        var masterword = 'writer';
        //console.log(masterword);
        getWords(masterword, function(word){
          // will return validWordSelection - array with the set of words
        });
      };
    };
    //console.log('word selection '+validWordSelection.length);
    return validWordSelection;
    //callback(validWordSelection);
  }
};