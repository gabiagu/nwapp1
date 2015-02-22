$( document ).ready(function() {
    // magic
    
    var listOfWords = [];
    $wordsAndPositions = {};

    $.ajax({
        url:'/getGameWords',
        type: 'get',
        dataType: 'json',
        success:function(data) {
            //console.log(data);
            $wordsAndPositions = {};
            sortData(data);
            return data; 
        }
    });

    //=================
    // submit
    //=================
    $('.js_actions__submit').click(function(){
        var wordToValidate = [],
            word;
        $('.js_tilesStaging .tilesStaging__tile-loaded').each( function() {
            var templLetter = $(this).text();
            wordToValidate.push(templLetter);
        });
        word = wordToValidate.toString().replace(/,/g,'');
        validateWord(word);
    });

    //=================
    // reset to staging
    //=================
    $('.js_actions__reset').click(function(){
        resetToInitial();
    });

    //=================
    // shuffle
    //=================
    $('.js_actions__shuffle').click(function(){
        shuffleTiles();
    });

    // move tile from initial to staging
    $( document ).on( "click", ".js_tilesInitial .tilesInitial__tile-loaded", function() {
        var tileText = $(this).text();
        $('.js_tilesStaging .tilesStaging__tile:empty:first').text(tileText).toggleClass('tilesStaging__tile-loaded');
        $(this).html('').removeClass('tilesInitial__tile-loaded');
    });

    // move tile from staging to initial
    $( document ).on( "click", ".js_tilesStaging .tilesStaging__tile-loaded", function() {
        var tileText = $(this).text();
        $('.js_tilesInitial .tilesInitial__tile:empty:first').text(tileText).toggleClass('tilesInitial__tile-loaded');
        $(this).html('').removeClass('tilesStaging__tile-loaded');
    });

});

function validateWord(word) {
    var wordToValidate = word.toString()+'\r'; 
    console.log(wordToValidate);
    console.log(listOfWords);
    if (listOfWords.indexOf(wordToValidate) > -1) {
        /*for(var i in foo){
          alert(i); // alerts key
          alert(foo[i]); //alerts key's value
        }*/
        for (var i in $wordsAndPositions) {
            if ( i == wordToValidate ) {
                var wordColumnTarget = $wordsAndPositions[i];
                $('.'+wordColumnTarget).html(wordToValidate).toggleClass('blurred');
                resetToInitial();
            }
        }
        //$wordsAndPositions
    } else {
        console.log('nope');
    }
}

function sortData(data){
    var temptempList = [];
    tempList = $.map(data, function(value, index) { return [value]; });
    tempList = tempList[0];
    //console.log(tempList);
    list_3 = []; // create lists for every subset of string length
    list_4 = [];
    list_5 = [];
    list_6 = [];
    list_7 = [];
    for (i = 0; i < tempList.length; i++) { 
        if(tempList[i].length == 4) {
            list_3.push(tempList[i]);
        } else if (tempList[i].length == 5) {
            list_4.push(tempList[i]);
        } else if (tempList[i].length == 6) {
            list_5.push(tempList[i]);
        } else if (tempList[i].length == 7) {
            list_6.push(tempList[i]);
        } else if (tempList[i].length == 8) {
            if (list_7.length == 0) {
                list_7.push(tempList[i]);
            }
            
        }
    };
    // sort each alphabetically
    list_3.sort();
    list_4.sort();
    list_5.sort();
    list_6.sort();
    list_7.sort();
    //console.log(list_7);
    //console.log(list_7.length);
    // merge them back into one list
    list = [];
    list = list.concat(list_3);
    list = list.concat(list_4);
    list = list.concat(list_5);
    list = list.concat(list_6);
    list = list.concat(list_7);

    fillInWords(list);
};

function fillInWords(list) {
    var fillInList = [];
    var templist = [];
    templist = list.slice(0);
    listOfWords = list.slice(0);
    fillInList = list;
    //console.log(typeof(list));
    //console.log(list);
    var listLength = fillInList.length,
        makeThreeColumns = false, // triggers to know whether to build 3 or 4 columns
        makeFourColumns = false,
        tempList1 = [], // I'll split the original list in as many elements needed to make it up
        tempList2 = [],
        tempList3 = [],
        tempList4 = [];

    for (i = 0; i < fillInList.length; i++) {
        //fillInList[i] = fillInList[i].replace(/[A-Za-z]/g, '_');
    };
    // console.log(fillInList);
    // CREATE COLUMNS AND ADD WORDS THERE
    if ( listLength > 33 ) {
        // if it's over 36, make it 4 columns instead of 3
        makeFourColumns = true;
        // add column containers
        $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-1"><ul></ul></div><div class="wordColumn__column wordColumn-2"><ul></ul></div><div class="wordColumn__column wordColumn-3"><ul></ul></div><div class="wordColumn__column wordColumn-4"><ul></ul></div>');
        // break apart the list in to the columns
        tempList1 = fillInList.splice(0,10);
        tempList2 = fillInList.splice(0,10);
        tempList3 = fillInList.splice(0,10);
        tempList4 = fillInList.splice(0,10);
        // ADD WORDS TO EACH COLUMN
        for (i = 0; i < tempList1.length; i++) {
            $wordsAndPositions[tempList1[i]] = 'c1p'+i;
            tempList1[i] = tempList1[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-1 ul').append('<li class="blurred c1p'+i+'">'+tempList1[i]+'</li>');
            //console.log($wordsAndPositions);
        };
        for (i = 0; i < tempList2.length; i++) {
            $wordsAndPositions[tempList2[i]] = 'c2p'+i;
            tempList2[i] = tempList2[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-2 ul').append('<li class="blurred c2p'+i+'">'+tempList2[i]+'</li>');
        };
        for (i = 0; i < tempList3.length; i++) {
            $wordsAndPositions[tempList3[i]] = 'c3p'+i;
            tempList3[i] = tempList3[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-3 ul').append('<li class="blurred c3p'+i+'">'+tempList3[i]+'</li>');
        };
        for (i = 0; i < tempList4.length; i++) {
            $wordsAndPositions[tempList4[i]] = 'c4p'+i;
            tempList4[i] = tempList4[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-4 ul').append('<li class="blurred c4p'+i+'">'+tempList4[i]+'</li>');
        };

    } else {
        makeThreeColumns = true;
        // add column containers
        $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-1"><ul></ul></div><div class="wordColumn__column wordColumn-2"><ul></ul></div><div class="wordColumn__column wordColumn-3"><ul></ul></div>');
        // break apart the list in to the columns
        tempList1 = fillInList.splice(0,11);
        tempList2 = fillInList.splice(0,11);
        tempList3 = fillInList.splice(0,11);
        for (i = 0; i < tempList1.length; i++) {
            $wordsAndPositions[tempList1[i]] = 'c1p'+i;
            tempList1[i] = tempList1[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-1 ul').append('<li class="blurred c1p'+i+'">'+tempList1[i]+'</li>');
            //console.log($wordsAndPositions);
        };
        for (i = 0; i < tempList2.length; i++) {
            $wordsAndPositions[tempList2[i]] = 'c2p'+i;
            tempList2[i] = tempList2[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-2 ul').append('<li class="blurred c2p'+i+'">'+tempList2[i]+'</li>');
        };
        for (i = 0; i < tempList3.length; i++) {
            $wordsAndPositions[tempList3[i]] = 'c3p'+i;
            tempList3[i] = tempList3[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-3 ul').append('<li class="blurred c3p'+i+'">'+tempList3[i]+'</li>');
        };
    };
    
console.log($wordsAndPositions);

    // get the 7 letter word
    var sevenLetterWord = templist[templist.length - 1];
    //console.log(sevenLetterWord);
    sevenLetterWord.toString();
    //console.log(templist);
    //sevenLetterWordArr = [];
    sevenLetterWordArr = sevenLetterWord.split('');
    //console.log(sevenLetterWordArr);
    $('.js_tilesInitial .tilesInitial__tile').removeClass('tilesInitial__tile-loaded').text('');
    for (i = 0; i < sevenLetterWordArr.length; i++) {
        $('.js_tilesInitial .tilesInitial__tile:empty:first').html(sevenLetterWordArr[i]).addClass('tilesInitial__tile-loaded');
        //console.log(sevenLetterWordArr[i]);
    };
};


function resetToInitial() {

    tempTileList = [];

    // collect all tiles in Staging
    $('.js_tilesStaging .tilesStaging__tile.tilesStaging__tile-loaded').each(function() {
        
        var stagedTile = $(this).text();

        tempTileList.push(stagedTile);
        
        //console.log(tempTileList);
    });

    // for each tile in Staging, load it in an empty Initial
    for ( var i = 0, unstagedTile; unstagedTile = tempTileList[i]; i++ ) {
        //console.log(unstagedTile);
        $('.js_tilesInitial .tilesInitial__tile:empty:first').text(unstagedTile).toggleClass('tilesInitial__tile-loaded');
    }

    // nuke old ones
    $('.js_tilesStaging .tilesStaging__tile').html('').removeClass('tilesStaging__tile-loaded');
};

function shuffleTiles() {
    // return all to initial
    resetToInitial();
    // make new array
    tempTileList = [];
    $('.js_tilesInitial .tilesInitial__tile.tilesInitial__tile-loaded').each(function() {
        // start adding the text
        var stagedTile = $(this).text();
        tempTileList.push(stagedTile);
    });
    $('.js_tilesInitial .tilesInitial__tile.tilesInitial__tile-loaded').html('').removeClass('tilesInitial__tile-loaded');
    //console.log(tempTileList);
    $('.js_tilesInitial .tilesInitial__tile').each(function(index, character) {
            tile = tempTileList.splice(Math.floor(Math.random() * tempTileList.length), 1)[0];
            $('.js_tilesInitial .tilesInitial__tile:empty:first').text(tile).addClass('tilesInitial__tile-loaded');;
            //console.log(tile);
        });

};