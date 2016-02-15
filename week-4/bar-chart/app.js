// first, grab a reference to the <main> element and store
// it with a `main` variable
var $main = $( 'main' );

var color = chroma.scale(['rgb(100,100,200)','rgb(200,100,100)']).domain([ 0, 100 ]);

function createBar ( month, i ) {
	var $container = $( '<div class="container"></div>' );

	var $label     = $( '<span class="small label">' + month.label.slice( 0, 3 ) + '</span>' );
	var $bigLabel  = $( '<span class="big label">' + month.label + '</span>' );
	var $bar       = $( '<div class="bar" style="width: 0%;" data-temp="' + month.value + '"></div>' );

	$bar.css( 'background-color', color( month.value ) );

	// add the label and bar to the container...
	$container.append( $label, $bigLabel, $bar );

	$container.fadeIn( 800 );

	setTimeout( function () {
		$bar.css( 'width', month.value + '%' );
	}, i * 100 );

	// ...then add the container to the page
	$main.append( $container );
}

var $select = $( 'select' );

function update () {
	var selected = $select.val();

	$.get( 'data/' + selected + '.json', function ( months ) {
		$main.empty();

		months.forEach( function ( month, i ) {
			createBar( month, i );
		});
	});
}

$select.on( 'change', function () {
	update();
});

update();