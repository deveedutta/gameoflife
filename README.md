Game of Life
==========

Cross browser working model for [Jon Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) implemented using Javascript and HTML Table
-----------------------------------------------------

*Declaration*

I took help from [Julian Pulgarin](http://www.julianpulgarin.com/canvaslife/)'s code to understand how the algorithm works and how the code should behave. Honestly, I couldn't have accomplished this in this short while without his publication. My code is not plagiarized because I've applied my 'custom' stupidity to solve problems hereS.


Download
--------

	git clone git@github.com:deveedutta/gameoflife.git
	cd gameoflife/


Running
-------

* Download/Clone the repo/extract the contents
* Open index.html in browser
* Click to make the cells alive. Select around 10-20 cells this way.
* Click on the start button
* See the action happening.
* Want to increase/change the grid size ? Enter any number in text-box and hit enter.
* Hitting enter calls reinit() method with the new grid size
* Use 'start/stop' to toggle animation


Steps to use
------------

Initialize reference to html variables

	var 
		canvas              = document.querySelector('#gameCanvas')
	,   startAnimation      = document.querySelector('#startAnimation')
	,   animationStarted    = false
	,   gridSize            = document.querySelector('#gridsize')

Call init

	$$.init ( canvas, { ... } );

Use *registerListener* to register event listeners

	$$.registerListener( HTMLElement , 'eventName', eventHandlerFunction, bubbleTrueORfalse );


Compatility
-----------
I created this using table > tr > td. I think it should work in every browser. If you find any issues, please notify me.