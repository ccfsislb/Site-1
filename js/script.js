$(document).ready(function () {
    isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    /*--------------------------
        ACTIVE WOW JS
        ----------------------------*/
        new WOW().init();


        $("#carousel_hero").owlCarousel({
            merge: true,
            smartSpeed: 2000,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            autoplay: true,
            autoplayTimeout: 5000,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            items: 1,
        });


        $(window).scroll(function () {
            var height = $(window).scrollTop();
            if (height > 30) {
                $('header').addClass('header-fixed');
            } else {
                $('header').removeClass('header-fixed');
            }
        });


        const nav = $('.nav');

    //burger
    $('.nav__arrow').click(() => {
        nav.toggleClass('active');
    })


    //closing

    $(document).mouseup(function (e) {
        if (!nav.is(e.target) && !$('.nav__arrow').is(e.target) && nav.hasClass('active') && nav.has(e.target).length === 0) {
            nav.removeClass('active');
        }
    });


    if (isMobile.any()) {
        $('.nav__item').click((e) => {

            $(e.currentTarget).toggleClass('active');
        })
    } else {
        $('.nav__item').on('mouseenter', function (e) {
            $(e.currentTarget).addClass('active');
        });
        $('.nav__item').on('mouseleave', function (e) {
            $(e.currentTarget).removeClass('active');
        });
    }



    //clients 
    var client_photo = $('#carousel_clientsPhotos');
    client_photo.owlCarousel({
        loop: true,
        center: true,
        margin: 0,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        mouseDrag: true,
        touchDrag: false,
        center: true,
        navText: ['<i class="fa fa-angle-left btn"></i>', '<i class="fa fa-angle-right btn"></i>'],

        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            992: {
                items: 3
            }
        },
    });


    var client_info = $('#carousel_clientsInfo');
    client_info.owlCarousel({
        loop: true,
        margin: 30,
        autoplay: false,
        autoplayTimeout: 4000,
        smartSpeed: 600,
        navText: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });


    $(window).resize(debounce(function(){
       client_photo.trigger('refresh.owl.carousel');
   }, 600));


    var isTranslating = false;
    var translationTimeout;
    var translationDelay = 600; 
    client_photo.on('translate.owl.carousel', function(p){
        if (isTranslating) {
            return;
        }

        isTranslating = true;
        var index = p.page.index;

        client_info.trigger('to.owl.carousel', index);
        isTranslating = false;
    });


    client_info.on('translate.owl.carousel', function(p){
        if (isTranslating) {

            return;
        }

        isTranslating = true;
        var index = p.page.index;
        client_photo.trigger('to.owl.carousel', index);
        isTranslating = false;
    });

}
)