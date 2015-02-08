module.exports = {
  exported_words: function() {
  // magic
  //var items;

    // placeholder for dictionary 
    var items = [];
    // object for mixed stuff
    //===========================
    var scrambledWords = [];
    var finalSelection = [];

    // load dictionary
    //=============================
    /*$.ajax({ 
        type: 'GET', 
        url: 'merged-eowl.txt', 
        dataType:'text',
        success: function (data) { 
          items = data.split('\n');
        }
    });*/
    var fs = require('fs');
    fs.readFile('merged-eowl.txt', function(err, data) {
        if(err) throw err;
        items = data.toString().split("\n");
        // for(i in items) {
        //     console.log(items[i]);
        // }
    });

    
    //console.log('scrabledWords type of = '+typeof(scrambledWords));
    // get masterword?
    //============================
    var getWordsNew=function(masterword, callback){
      var results={}
      var a,i,l;
      function nextLetter(a,l,key,used){
          var i;
          var j;
          if(key.length==l){
              return;
          }
          for(i=0;i<l;i++){
              if(used.indexOf(""+i)<0){
                  results[key+a[i]]="";
                  nextLetter(a,l,key+a[i],used+i);
              }
          }
       }
      a=masterword.split("");
        l=a.length;
      for (i = 0; i < a.length; i++) {
          results[a[i]] = "";
          nextLetter(a, l, a[i], "" + i)
      }
      for(var key in results) {
        scrambledWords.push(key);
      }
      for (var i = 0; i < scrambledWords.length; i++) {
        var keytest = scrambledWords[i]+'\r';
        if (items.indexOf(keytest) > -1) {
          finalSelection.push(scrambledWords[i]);
        }
      }
      callback(scrambledWords);

    };
    // function to trigger anagrams
    //========================
    getWordsNew('father', function(word){
      // returns scrabledWords
    });
    return scrambledWords;

  }
};