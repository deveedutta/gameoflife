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
    ,   doc              = this.document                                    // root initialized to 'window' in browser and 'exports' in server
    ,   registerListener = Function.prototype.call.bind ( AddListener )
    ,   timeout          = null
    ,   _el              = null
    ,   _life            = []
    ,   _cell            = {}
    ,   _options         = { }
    ,   _timeout         = 0
    ;
    
    Object.prototype.addCell = function ( cellId, cellElement) {
        if ( cellId.toLowerCase && cellElement instanceof HTMLElement ) {
            this[cellId] = cellElement;
        }
    }
    
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
        },
        registerListener :   registerListener
    }
    
    
    function start ( ) {                                                   // Animation Start implementation
        var count;
        
        _timeout = setInterval( function () {
//            try {
                for ( var X = 0; X < _options.gridSize ; X++ ) {
                    for ( var Y = 0; Y < _options.gridSize ; Y++ )  {
                        
                        count = countNeighbors ( X, Y );
                        
                        if ( _life [X][Y] == 1 && ( count < 2 || count > 3 ) ) {                // Any live-cell will die if neighbor count is < 2 or > 3

                            _life [X][Y] = 0;                                                   // Kill the cell
                            (_cell[ 'td-' + X + ',' + Y]).setAttribute('class', '');            // Kill the table's td

                        } else if ( _life [X][Y] == 0 && count == 3 ){                          // But if a dead cell has exactly 3 neighbors
                            
                            _life [X][Y] = 1;                                                   // It resurrects ( Creepy Horror Story : Will sure post this on reddit/shortscarystories/)
                            (_cell[ 'td-' + X + ',' + Y]).setAttribute('class', 'active');
                            
                        }
                    }
                }
//            }
//            catch ( error ) {
//                clearInterval( timeout );
//            }
        }, 700);
        
        return true;
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
        * I tried hard to deal with the 'undefined' out-of-bound array index.
        * It was harder than I anticipated. Julian's code came to rescue.
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
    
    function reinit ( gridSize ) {

        if ( ! _el instanceof HTMLElement ) return;
        if ( isNaN (gridSize * 1) )         return;

        _options['gridSize'] = ( gridSize * 1 );

        init ( _el, _options );
    }
    
    
    
    function init ( el, options ) {
        if ( ! el instanceof HTMLElement ) return;
        _el = el;
        
        
        for ( item in options ) {
            _options [ item ] = options [ item ];
        }
        
        
        drawTable();
        
        
    } //init ends
    
    function drawTable () {
        var 
            i,j
            cel             = 'createElement'
        ,   table           = doc[cel]('table');
        
        for ( i = 0; i < _options.gridSize ; i++ ) {
            
            var tr = doc[cel]('tr');
            _life [ i ] = new Array( _options.gridSize );
            
            for ( j = 0; j < _options.gridSize ; j++ ) {
                var td = doc[cel] ( 'td' );
                td.setAttribute( 'id', 'td-' + i + ',' + j );
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
