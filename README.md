Game of Life
==========

Cross browser working model for [Jon Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life)
-----------------------------------------------------

*Declaration*

I took help from [Julian Pulgarin](http://www.julianpulgarin.com/canvaslife/)'s code to understand how the algorithm works and how the code should behave. Honestly, I couldn't have accomplished this in this short while without his publication. My code is not plagiarized because I've applied my 'custom' stupidity to solve problems here.

Additionally, I wrote this code purely for employment purposes. Therefore, anyone willing to fork or modify it, then please be careful before making any pull requests.

Steps to use plugin
-------------------

1. Initialize reference to html variables

>    var 
>        canvas              = document.querySelector('#gameCanvas')
>    ,   startAnimation      = document.querySelector('#startAnimation')
>    ,   animationStarted    = false
>    ,   gridSize            = document.querySelector('#gridsize')

2. Call init

>   $$.init ( canvas, { ... } );

3. Use *registerListener* to register event listeners

>   $$.registerListener( HTMLElement , 'eventName', eventHandlerFunction, bubbleTrueORfalse );
            
            