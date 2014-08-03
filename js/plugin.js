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
    ,   doc              = this.document                                    // document object
    ,   registerListener = Function.prototype.call.bind ( AddListener )     // Javascripting the hipsters way: Registering listeners
    ,   timeout          = null
    ,   _el              = null                                             // Private reference to the html element on which we draw
    ,   _life            = []                                               // Array to maintain 'LIFE'
    ,   _cell            = {}                                               // Object that keeps a record of the corresponding <td> tags
    ,   _options         = { }                                              // Private copy of the options
    ,   _timeout         = 0                                                // timeout
    ,   _countTime       = 0                                                // Running time
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
        stop        :   function () {                                       // Animation STOP function
            clearInterval(_timeout);
            return false;
        },
        clear       :   function () {
            this.stop();
            _countTime = 0;
            _options.timerTag.innerHTML = _countTime + ' ms';
            _life = [];
            _cell = {};
            drawTable();
            return false;
        },
        registerListener :   registerListener
    }
    
    
    function start ( ) {                                                   // Animation Start implementation
        var count;
        
        _timeout = setInterval( runner, 700);
        
        return true;
    }
    
    function runner () {
//      try {
        for ( var X = 0; X < _options.gridSize ; X++ ) {
            for ( var Y = 0; Y < _options.gridSize ; Y++ )  {

                count = countNeighbors ( X, Y );

                if ( _life [X][Y] == 1 && ( count < 2 || count > 3 ) ) {                // Any live-cell will die if neighbor count is < 2 or > 3

                    _life [X][Y] = 0;                                                   // Kill the cell
                    (_cell[ 'td-' + X + ',' + Y]).setAttribute('class', '');            // Kill the table's td

                } else if ( _life [X][Y] == 0 && count == 3 ){                          // But if a dead cell has exactly 3 neighbors..

                    _life [X][Y] = 1;                                                   // ..it resurrects ( Creepy Horror Story : Will sure post this on reddit/shortscarystories/)
                    (_cell[ 'td-' + X + ',' + Y]).setAttribute('class', 'active');

                }
            }
        }
        _countTime += 700;
        _options.timerTag.innerHTML = _countTime + ' ms'; 
//            }
//            catch ( error ) {
//                clearInterval( timeout );
//            }        
    }
    
    function countNeighbors ( X, Y ) {
        var count;
        var S = _options.gridSize * 1;
          
        count = 
            //CELLS on TOP ROW 
            _life   [(X-1+S)%S]     [(Y-1+S)%S]
        +   _life   [(X-1+S)%S]     [Y]
        +   _life   [(X-1+S)%S]     [(Y+1+S)%S]

        //CELLS on SAME ROW
        +   _life [X][(Y-1+S)%S]
        +   _life [X][(Y+1+S)%S]
        
        //CELLS on BOTTOM ROW
        +   _life [(X+1+S)%S]       [(Y-1+S)%S]
        +   _life [(X+1+S)%S]       [Y]
        +   _life [(X+1+S)%S]       [(Y+1+S)%S]
        
        ;
        /*
        * Credits : http://www.julianpulgarin.com/canvaslife/
        * I tried hard to deal with the 'undefined' out-of-bound array indices.
        * It was harder than I thought. Julian's code came to rescue.
        */

//        count = 
//            //CELLS on TOP ROW 
//            _life [X-1][Y-1]
//        +   _life [X-1][Y]
//        +   _life [X-1][Y+1]
//
//        //CELLS on SAME ROW
//        +   _life [X][Y-1]
//        +   _life [X][Y+1]
//        
//        //CELLS on BOTTOM ROW
//        +   _life [X+1][Y-1]
//        +   _life [X+1][Y]
//        +   _life [X+1][Y+1]
//        
//        ;
        return count;
    }
                                                                                                    // 
    function reinit ( gridSize ) {                                                                  // Re-init: Re-draw everything. Utilize the private _el & _options

        if ( ! _el instanceof HTMLElement ) return;
        if ( isNaN (gridSize * 1) )         return;

        _options['gridSize'] = ( gridSize * 1 );

        init ( _el, _options );                                                                     // Call init : Pass _el & _options
    }
    
    
    
    function init ( el, options ) {
        if ( ! el instanceof HTMLElement ) return;
        _el = el;
        
        
        for ( item in options ) {
            _options [ item ] = options [ item ];
        }
        
        
        drawTable();                                                                                // Keeping the house clear: Moved a messy code to drawTable
        
        
    } //init ends
    
    function drawTable () {
        var 
            i,j
            cel             = 'createElement'                                                       // Inspired by code obfuscators, I will write a Code...
        ,   table           = doc[cel]('table');                                                    // ...So cryptic that people will be left with scratching their heads...
        
        for ( i = 0; i < _options.gridSize ; i++ ) {
            
            var tr = doc[cel]('tr');                                                                // ...Wondering 'What I did here'
            _life [ i ] = new Array( _options.gridSize );
            
            for ( j = 0; j < _options.gridSize ; j++ ) {
                var td = doc[cel] ( 'td' );                                                         // I think a 'var' here is necessary
                td.setAttribute( 'id', 'td-' + i + ',' + j );                                       // I remember last time, when I din't 'var', it created duplicates
                tr.appendChild ( td );

                _life [ i ][ j ] = 0;
                _cell [ 'td-' + i +',' + j ] = td;
                
                
                registerListener( td, 'click', function () {
                    this.setAttribute('class', 'active');

                    var id = this.getAttribute('id').split('td-')[1];
                    var X = id.split(',')[0] * 1;
                    var Y = id.split(',')[1] * 1;
                    
                    _life [ X ][ Y ] = 1;
                }, false);
                
            }
            
            table.appendChild ( tr );
        }
        
        _el.innerHTML = "";
        _el.appendChild(table);
        
    } //drawTable ends
    
        root.$$ = $$ || framework;                                          // Exporting the Object
    
})();
