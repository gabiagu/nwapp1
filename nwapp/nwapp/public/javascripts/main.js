$( document ).ready(function() {
    // magic
    
    var listOfWords = [];
        $wordsAndPositions = {},
        level = 0,
        score = 0;

    startLevel();

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

    //=================
    // next level
    //=================
    $('.js_actions__nextLevel').click(function(){
        startLevel();
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

function startLevel() {
    resetToInitial();
    $('.js_status__time span').removeClass('status__time-ending');
    $('.js_wordColumns .wordColumn__column').remove();
    $('.js_actions__submit').show();
    $('.js_actions__reset').show();
    $('.js_actions__shuffle').show();
    $('.js_actions__nextLevel').hide();
    $.ajax({
        url:'/getGameWords',
        type: 'get',
        dataType: 'json',
        success:function(data) {
            //console.log(data);
            $wordsAndPositions = {};
            sortData(data);
            level = level+1;
            console.log(level);
            $('.status__level_value').html(level);
            return data; 
        }
    });
};

function updateScore(word) {
    var word = word;
    //console.log(word);

    if (level < 10) {
        if (word.length == 3) {
            score = score + 10;
            $('.js_status__score_value').html(score);
        } else if (word.length == 4) {
            score = score + 20;
            $('.js_status__score_value').html(score);
        } else if (word.length == 5) {
            score = score + 40;
            $('.js_status__score_value').html(score);
        } else if (word.length == 6) {
            score = score + 60;
            $('.js_status__score_value').html(score);
        } else if (word.length == 7) {
            score = score + 100;
            $('.js_status__score_value').html(score);
        }
    } else if (level > 10) {
        if (word.length == 3) {
            score = score + 30;
            $('.js_status__score_value').html(score);
        } else if (word.length == 4) {
            score = score + 60;
            $('.js_status__score_value').html(score);
        } else if (word.length == 5) {
            score = score + 80;
            $('.js_status__score_value').html(score);
        } else if (word.length == 6) {
            score = score + 120;
            $('.js_status__score_value').html(score);
        } else if (word.length == 7) {
            score = score + 150;
            $('.js_status__score_value').html(score);
        }
    } else if (level > 30) {
        if (word.length == 3) {
            score = score + 50;
            $('.js_status__score_value').html(score);
        } else if (word.length == 4) {
            score = score + 80;
            $('.js_status__score_value').html(score);
        } else if (word.length == 5) {
            score = score + 120;
            $('.js_status__score_value').html(score);
        } else if (word.length == 6) {
            score = score + 200;
            $('.js_status__score_value').html(score);
        } else if (word.length == 7) {
            score = score + 250;
            $('.js_status__score_value').html(score);
        }
    }
}

function validateWord(word) {

    var wordToValidate = word.toString()+'\r'; 
    if (word.length < 3){
        // error out
        $('.tilesStaging__tile-loaded').addClass('tilesStaging__tile-error');
        setTimeout(function() {
            $('.tilesStaging__tile-loaded').removeClass('tilesStaging__tile-error');
        }, 250);
        return;
    }
    if (listOfWords.indexOf(wordToValidate) > -1) {
        for (var i in $wordsAndPositions) {
            if ( i == wordToValidate ) {
                var wordColumnTarget = $wordsAndPositions[i];
                // check if the word is already revealed
                if ( $('.'+wordColumnTarget+'.blurred').length ) {
                    $('.'+wordColumnTarget).html(wordToValidate).removeClass('blurred');
                    resetToInitial();
                    updateScore(wordToValidate);
                } else {
                    // error out
                    $('.tilesStaging__tile-loaded').addClass('tilesStaging__tile-error');
                    setTimeout(function() {
                        $('.tilesStaging__tile-loaded').removeClass('tilesStaging__tile-error');
                    }, 250);
                }
                
            }
        }
    } else {
        // error out
        $('.tilesStaging__tile-loaded').addClass('tilesStaging__tile-error');
        setTimeout(function() {
            $('.tilesStaging__tile-loaded').removeClass('tilesStaging__tile-error');
        }, 250);
    }
}

function startTimer() {
    //console.log('started timer');
    var threeMinutes = 60 * 3,
        display = $('.js_status__time span'),
        mins, seconds;
    gameTimer = setInterval(function() {
        //console.log('started timer?');
        mins = parseInt(threeMinutes / 60)
        seconds = parseInt(threeMinutes % 60);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.html(mins + ":" + seconds);
        threeMinutes--;
        if (threeMinutes == 10) {
            display.addClass('status__time-ending');
        }
        if (threeMinutes == 0) {
            endLevel();
        }
    }, 1800);
}

function endLevel() {
    clearInterval(gameTimer);
    $('.js_status__time span').html('0:00');

    // reveal
    $('li.blurred').each(function() {
        var currentItem = $(this).attr('class').replace('blurred ','');
        //console.log(currentItem);
        for (var i in $wordsAndPositions) {
           var wordKey = i;
           var wordValue = $wordsAndPositions[i];
           if ( wordValue == currentItem ) {
                $(this).html(wordKey).removeClass('blurred').addClass('revealed');
           };
        }
    });
    // disable game level actions
    //$('.js_actions button').attr('disabled','disabled');
    
    // toggle level actions
    $('.js_actions__submit').hide();
    $('.js_actions__reset').hide();
    $('.js_actions__shuffle').hide();
    $('.js_actions__nextLevel').show();
    //console.log('level ended!');
    //alert('level ended');
}

function sortData(data){
    var temptempList = [];
    tempList = $.map(data, function(value, index) { return [value]; });
    tempList = tempList[0];

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
    console.log(list_7);
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

    // console.log(fillInList);
    // CREATE COLUMNS AND ADD WORDS THERE
    if ( listLength > 30 ) {
        // if it's over 33, make it 4 columns instead of 3
        makeFourColumns = true;
        // add column containers
        $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-1"><ul></ul></div>');
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
        if (tempList2.length > 0) {
            $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-2"><ul></ul></div>');
            for (i = 0; i < tempList2.length; i++) {
                $wordsAndPositions[tempList2[i]] = 'c2p'+i;
                tempList2[i] = tempList2[i].replace(/[A-Za-z]/g, '_');
                $('.wordColumn-2 ul').append('<li class="blurred c2p'+i+'">'+tempList2[i]+'</li>');
            };
            
            if (tempList3.length > 0) {
                $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-3"><ul></ul></div>');
                for (i = 0; i < tempList3.length; i++) {
                    $wordsAndPositions[tempList3[i]] = 'c3p'+i;
                    tempList3[i] = tempList3[i].replace(/[A-Za-z]/g, '_');
                    $('.wordColumn-3 ul').append('<li class="blurred c3p'+i+'">'+tempList3[i]+'</li>');
                };

                if (tempList4.length > 0) {
                    $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-4"><ul></ul></div>');
                    $('.js_wordColumns').addClass('wordColumns-narrow');
                    for (i = 0; i < tempList4.length; i++) {
                        $wordsAndPositions[tempList4[i]] = 'c4p'+i;
                        tempList4[i] = tempList4[i].replace(/[A-Za-z]/g, '_');
                        $('.wordColumn-4 ul').append('<li class="blurred c4p'+i+'">'+tempList4[i]+'</li>');
                    };

                }

            }

        }

    } else {
        makeThreeColumns = true;
        // add column containers - first column first, the others if needed
        $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-1"><ul></ul></div>');
        // break apart the list in to the columns
        tempList1 = fillInList.splice(0,10);
        tempList2 = fillInList.splice(0,10);
        tempList3 = fillInList.splice(0,10);
        for (i = 0; i < tempList1.length; i++) {
            $wordsAndPositions[tempList1[i]] = 'c1p'+i;
            tempList1[i] = tempList1[i].replace(/[A-Za-z]/g, '_');
            $('.wordColumn-1 ul').append('<li class="blurred c1p'+i+'">'+tempList1[i]+'</li>');
            //console.log($wordsAndPositions);
        };
        if (tempList2.length > 0) {
            $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-2"><ul></ul></div>');
            for (i = 0; i < tempList2.length; i++) {
                $wordsAndPositions[tempList2[i]] = 'c2p'+i;
                tempList2[i] = tempList2[i].replace(/[A-Za-z]/g, '_');
                $('.wordColumn-2 ul').append('<li class="blurred c2p'+i+'">'+tempList2[i]+'</li>');
            };
            
            if (tempList3.length > 0) {
                $('.js_wordColumns').append('<div class="wordColumn__column wordColumn-3"><ul></ul></div>');
                for (i = 0; i < tempList3.length; i++) {
                    $wordsAndPositions[tempList3[i]] = 'c3p'+i;
                    tempList3[i] = tempList3[i].replace(/[A-Za-z]/g, '_');
                    $('.wordColumn-3 ul').append('<li class="blurred c3p'+i+'">'+tempList3[i]+'</li>');
                };

            }

        }
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
    startTimer();
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