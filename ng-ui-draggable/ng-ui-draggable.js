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
                var startX,
                    startY,
                    initialMouseX,
                    initialMouseY,
                    rParams,
                    handler,
                    width,
                    height,
                    container,
                    containment = {},
                    params = {
                        handlerClass: false,
                        axis: false,
                        containment: false
                    };

                /**
                 * Обработчик перемещения
                 * @param e
                 * @returns {boolean}
                 */
                function mousemove(e){
                    e.stopPropagation();
                    e.preventDefault();
                    var dx = e.clientX - initialMouseX,
                        dy = e.clientY - initialMouseY,
                        newY = startY + dy,
                        newX = startX + dx;
                    if (newX < 0){
                        newX = 0;
                    }
                    if (newY < 0){
                        newY = 0;
                    }
                    if (newX + width > containment.right){
                        newX = containment.right - width;
                    }
                    if (newY + height > containment.bottom){
                        newY = containment.bottom - height;
                    }
                    element.css({
                        top:  newY + 'px',
                        left: newX + 'px'
                    });
                    return false;
                }
                /**
                 * Инициализация перетаскивания по mousedown
                 * @param e
                 */
                function initDraggable(e){
                    e.stopPropagation();
                    e.preventDefault();
                    startX = element.prop('offsetLeft');
                    startY = element.prop('offsetTop');
                    initialMouseX = e.clientX;
                    initialMouseY = e.clientY;
                    // Если задан контейнер, определяемся с разменами контейнера и элемента
                    width = element.prop('offsetWidth');
                    height = element.prop('offsetHeight');
                    containment = {
                        top: 0,  //container.prop('offsetTop'),
                        left: 0  //container.prop('offsetLeft')
                    };
                    containment.right = /*containment.left +*/ container.prop('offsetWidth');
                    containment.bottom = /*containment.top +*/ container.prop('offsetHeight');
                    $document.on('mousemove', mousemove);
                    $document.one('mouseup', function() {
                        $document.off('mousemove');
                    });
                }
                // --------- Инициализация -------------------
                element.css({position: 'absolute'});
                rParams = attrs.ngUiDraggable ? JSON.parse(attrs.ngUiDraggable) : {};
                if (rParams['handler-class'] != undefined){
                    params.handlerClass = rParams['handler-class'];
                }
                if (rParams.containment != undefined){  // Задан контейнер
                    if (rParams.containment[0] == '.'){

                    } else if (rParams.containment[0] == '#'){

                    } else if (rParams.containment == 'parent'){
                        container = element.parent();
                    }
                    if (container){
                        params.containment = rParams.containment;
                    }
                } else {  // Контейнером назначаем body
                    container = angular.element(document.getElementsByTagName('body')[0]);
                }
                if (rParams.axis != undefined){
                    params.axis = rParams.axis;
                }
                handler = params.handlerClass ? angular.element(element[0].getElementsByClassName(params.handlerClass)[0]) : element;
                handler.on('mousedown', initDraggable);
            }
        }
    }]);

})();