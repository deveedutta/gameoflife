/*
 *  Author  : Deveedutta Maharana
 *  Task    : John Conway's Game of Life
 *  License : MIT & WTFPL
 *
 *
*/
/*
 *  globals :   $$
 *  Spacing :   Tab Spacing (Not 4 spaces)
 *  JSLint  :   Meh, keep it more spacious
 *
*/

var $$ = $$ || null;  //framework name '$$'

(function () {
    var
        root             = this                                             // root initialized to 'window' in browser and 'exports' in server
    ,   registerListener = Function.prototype.call.bind ( AddListener )
    ,   timeout          = null
    ,   el               = null
    ,   _options         = { }
    ;
    
    function AddListener ( event, func, bubble ) {                          // Universal Event Listener
        var THIS = this;                                                    // THIS : The HTMLElement on which event listener is to be registered 
        if ( THIS.addEventListener ) {                                      // Event Registration old browser fallback
            THIS.addEventListener ( event, func, bubble );
        } else if ( THIS.attachEvent ) {
            THIS.attachEvent ( 'on' + event, func );
        }
    }
    
    
    var framework = {                                                       // 'THE Framework' that gives 'LIFE'
        init        :   init,
        reinit      :   reinit,
        start       :   start,                                              // Animation Start function
        registerListener :   registerListener
    }
    
    
     function start ( ) {                                                   // Animation Start implementation
//        timeout = setInterval( function () {
//            
//        }, 400)
        
    }
    
    function reinit ( gridSize ) {

        if ( ! el instanceof HTMLElement )  return;
        if ( isNaN (gridSize * 1) )         return;

        _options['gridSize'] = ( gridSize * 1 );

        init ( el, _options );
    }
    
    
    
    function init ( el, options ) {
        if ( ! el instanceof HTMLElement ) return;
        
        
        
        for ( item in options ) {
            _options [ item ] = options [ item ];
        }
        
        
        
    }
    
    
        root.$$ = $$ || framework;                                          // Exporting the Object
    
})();
