import '../css/app.scss';
import $ from "jquery";
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'waypoints';
import 'scrollTo';

$(function () {
    function loadCSS(href){
        var ss = window.document.createElement('link'),
            ref = window.document.getElementsByTagName('head')[0];

        ss.rel = 'stylesheet';
        ss.href = href;

        // temporarily, set media to something non-matching to ensure it'll
        // fetch without blocking render
        ss.media = 'only x';

        ref.parentNode.insertBefore(ss, ref);

        setTimeout( function(){
            // set media back to `all` so that the stylesheet applies once it loads
            ss.media = 'all';
        },0);
    }
    loadCSS('build/style.css');

    var mailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $('[id^=scrollTo]').click(function () {
        var id = $(this).attr('id').slice(9);
        $(window).scrollTo($('#' + id), 1000, {offset: {top: -70, left: 0}});
    });

    $('.nav a').on('click', function () {
        $('.navbar-toggle').click();
    });


    /**
     * Mail Handling
     */
    $('#send').click(function () {
        var textlength = 10;

        var mailvalid = false;
        var textvalid = false;

        var msg = $('#msg').val();
        var mail = $('#inputmail').val();

        /**
         * Mailvalidation
         */
        if (mail) {
            if (mail.match(mailregex) !== null) {
                $('#mailicon').removeClass('text-danger')
                    .removeClass('glyphicon-warning-sign')
                    .addClass('glyphicon-user');
                mailvalid = true;
            } else {
                $('#mailicon').addClass('text-danger')
                    .addClass('glyphicon-warning-sign')
                    .removeClass('glyphicon-user');
                console.error("das ist keine mail Adresse");
            }
        } else {
            $('#mailicon').addClass('text-danger');
            console.error("keine Mail angegeben");
        }

        /**
         * Messagevalidation
         */
        if (msg && msg.length > textlength) {
            $('#texticon').removeClass('text-danger')
                .removeClass('glyphicon-warning-sign')
                .addClass('glyphicon-align-left');
            textvalid = true;
        } else {
            $('#texticon').addClass('text-danger')
                .addClass('glyphicon-warning-sign')
                .removeClass('glyphicon-align-left');
            console.error("Der Text ist nicht lange genug");
        }

        /**
         * Send mail
         */
        if (mailvalid && textvalid) {
            var link = "mailto:verena@pferde.fit"
                + "?cc=" + mail
                + "&subject=" + escape("pferde.fit Mail von " + mail)
                + "&body=" + escape(msg);
            var mailtoWindow = window.open(link);
            window.setTimeout(function () {
                mailtoWindow.close();
            },300);
        }

    })
});
