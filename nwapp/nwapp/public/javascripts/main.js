$( document ).ready(function() {
   	// magic
	
	//=================
   	// reset to staging
   	//=================
   	$('.js_actions__reset').click(function(){
   		resetToInitial();
   	});

   	//=================
   	// reset to staging
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