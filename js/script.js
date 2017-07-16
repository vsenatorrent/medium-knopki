function getHighlight() {
 
    var selection = window.getSelection(); // 1.
 
    var object = {
        parent : null,
        text   : '',
        rect   : null
    };
 
    // Если выборка не пуста.
    if ( selection.rangeCount > 0 ) {
        object = {
            text   : selection.toString().trim(), // вытягиваем текст.
            parent : selection.anchorNode.parentNode, // получаем родительский блок-обертку текста.
            rect   : selection.getRangeAt(0).getBoundingClientRect() // получаем рамку.
        };
    }
 
    return object; // 2.
}

var btnGroup = document.querySelector( '.btnGroup' );
 
function showMenu() {
 

    var highlight = getHighlight();
 

    if ( highlight.text === '' ) {
 
        btnGroup.setAttribute( 'class', 'btnGroup' );
        btnGroup.style.left = 0;
        btnGroup.style.top  = 0;
 
        return;
    }
 

    /**
     * Показываем меню только в случае, если выделенная область параграф.
     */
    if ( highlight.parent.nodeName !== 'P' ) {
        return;
    }
 

    var width = ( highlight.rect.width / 2 ) - 108;
    /**
     * "108" получено путем деления ширины кнопок на 2.
     */
 
    btnGroup.setAttribute( 'class', 'btnGroup show' );
    btnGroup.style.left = ( highlight.rect.left + width ) + 'px';
    btnGroup.style.top  = ( highlight.rect.top - 35 ) + 'px';
    /**
     * "40" – высота наших кнопок.
     * Тут мы поднимаем меню над верхней границей выделенного текста.
     */
}

document.body.addEventListener( 'mouseup', function() {
     setTimeout( showMenu, 100 );
} );


var copyBtn = document.querySelector('.copy');
function copy(){
  document.execCommand("copy"); 
}

copyBtn.onclick = copy;

function hide(){
  btnGroup.classList.remove('show');
}

btnGroup.onclick = hide;