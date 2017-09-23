import '../css/app.scss';
import $ from "jquery";
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'waypoints';
import 'scrollTo';

$(function () {
    $('[id^=scrollTo]').click(function () {
        var id = $(this).attr('id').slice(9);
        $(window).scrollTo($('#' + id), 1000, {offset: {top: -51, left: 0}});
    });

    $('.nav a').on('click', function(){
        $('.navbar-toggle').click();
    });

    $('#marketing').waypoint(function () {
        $('.img-circle').addClass('animated zoomIn');
    }, {
        offset: '50%',
        triggerOnce: true
    });

    $('.featurette').waypoint(function () {
        $('#' + this.element.id + ' .featurette-image').addClass('animated pulse');
    }, {
        offset: '50%',
        triggerOnce: true
    });
});
