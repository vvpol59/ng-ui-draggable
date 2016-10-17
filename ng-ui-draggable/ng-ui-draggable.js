/**
 *  * директива диалогового окна а-ля jQuery.draggable
 * Created by vvpol on 17.10.2016.
 */
(function(){
    "use strict";
    var app = angular.module('draggableApp', []);
    app.directive('ngUiDraggable', ['$document', function($document){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var startX, startY, initialMouseX, initialMouseY, rParams, handler,
                    params = {
                        handlerClass: false
                    };
                function mousemove(e){
                    var dx = e.clientX - initialMouseX;
                    var dy = e.clientY - initialMouseY;
                    element.css({
                        top:  startY + dy + 'px',
                        left: startX + dx + 'px'
                    });
     //               return false;
                }
                /**
                 * Инициализация перетаскивания по mousedown
                 * @param e
                 */
                function initDraggable(e){
                    startX = element.prop('offsetLeft');
                    startY = element.prop('offsetTop');
                    initialMouseX = e.clientX;
                    initialMouseY = e.clientY;
                    $document.on('mousemove', mousemove);
                    $document.one('mouseup', function() {
                        $document.off('mousemove');
                    });
                }

                rParams = attrs.ngUiDraggable ? JSON.parse(attrs.ngUiDraggable) : {};
                if (rParams['handler-class'] != undefined){
                    params.handlerClass = rParams['handler-class'];
                }

                element.css({position: 'absolute'});
                handler = params.handlerClass ? angular.element(element[0].getElementsByClassName('params.handlerClass')[0]) : element;
                handler.on('mousedown', initDraggable);
            }
        }
    }]);

})();