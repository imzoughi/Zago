/** ==========================================
 * JS DOCUMENT
 * DESCRIPTION: MAIN JS FILE
 * PROJECT NAME: ZAGO
 * DATE: 14/09/2016
 * AUTHOR: Issam-MZOUGHI
 ============================================ */

/* ========================================== *\
 *  INIT
 \* ========================================== */
var $j = jQuery.noConflict();

$j(function () {
    picturefill();
    bootstrapModule.init();
    mainNav.init();
    mainSlideshow.init();
    responsive.init();
});
/* ========================================== *\
 *  MODULES
 \* ========================================== */

/* =bootstrapModule */
var bootstrapModule = function () {
    function _init() {

        $j('[data-toggle="tooltip"]').tooltip();

    }

    return {
        init: _init
    };
}();

/* =mainNav */
var mainNav = function () {
    function _init() {

        //Show dropdown on hover only for desktop devices
        //-----------------------------------------------
        var delay = 0, setTimeoutConst;
        if ((Modernizr.mq('only all and (min-width: 1025px)') && !Modernizr.touch) || $j("html.ie8").length > 0) {
            $j('.main-navigation:not(.onclick) .navbar-nav>li.dropdown, .main-navigation:not(.onclick) li.dropdown>ul>li.dropdown').hover(
                function () {
                    var $this = $j(this);
                    setTimeoutConst = setTimeout(function () {
                        $this.addClass('open').slideDown();
                        $this.find('.dropdown-toggle').addClass('disabled');
                    }, delay);

                }, function () {
                    clearTimeout(setTimeoutConst);
                    $j(this).removeClass('open');
                    $j(this).find('.dropdown-toggle').removeClass('disabled');
                });


        }

        //Show dropdown on click only for mobile devices
        //-----------------------------------------------
        if (Modernizr.mq('only all and (max-width: 1024px)') && Modernizr.touch || $j(".main-navigation.onclick").length > 0) {
            $j(window).resize(function () {
                if ($j('.main-navigation.collapse')) {
                    $j('.main-navigation').removeClass('collapse');
                }
            });

            $j('.main-navigation [data-toggle=dropdown], .header-top [data-toggle=dropdown]').on('click', function (event) {

                $j(".dropdown-menu").animate({scrollTop: 0}, 500);

                // Avoid following the href location when clicking
                event.preventDefault();
                // Avoid having the menu to close when clicking
                event.stopPropagation();
                // close all the siblings
                $j(this).parent().siblings().removeClass('open');
                // close all the submenus of siblings
                $j(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
                // opening the one you clicked on
                $j(this).parent().toggleClass('open');
            });

            $j('.title-n1').on('click', function (event) {
                // Avoid following the href location when clicking
                event.preventDefault();


                $j('[data-toggle=dropdown]').removeClass('open');
                $j(this).closest('.dropdown.mega-menu').removeClass('open');
            });

            $j('.title-n2').on('click', function (event) {
                // Avoid following the href location when clicking
                event.preventDefault();
                // Avoid having the menu to close when clicking
                event.stopPropagation();

                $j(this).closest('.dropdown').removeClass('open');

            });
        }

        //Transparent Header Calculations
        var timer_tr;
        if ($j(".transparent-header").length > 0) {
            $j(window).load(function () {
                trHeaderHeight = $j("header.header").outerHeight();
                $j(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight) + "px");
            });
            $j(window).resize(function () {
                if ($j(this).scrollTop() < headerTopHeight + headerHeight - 5) {
                    trHeaderHeight = $j("header.header").outerHeight();
                    $j(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight) + "px");
                }
            });
            $j(window).scroll(function () {
                if ($j(this).scrollTop() === 0) {
                    if (timer_tr) {
                        window.clearTimeout(timer_tr);
                    }
                    timer_tr = window.setTimeout(function () {
                        trHeaderHeight = $j("header.header").outerHeight();
                        $j(".transparent-header .tp-bannertimer").css("marginTop", (trHeaderHeight) + "px");
                    }, 300);
                }
            });
        }

        // Give mega-menu dropdown-box
        //----------------------------------------------
        $j('.mega-menu').each(function(i, elem) {
            $j(elem)
                .find('.dropdown-menu .dropdown-box')   // Only children of this row
                .matchHeight({byRow: true,
                    property: 'height',
                    target: null,
                    remove: false}); // Row detection gets confused so disable it
        });


        $j('.btn-main-menu').on('click', function (e) {
            e.preventDefault();

            $j('.main-navigation').slideToggle();
        });

        $j('.btn-search-xs').on('click', function (e) {
            e.preventDefault();
            $j(this).toggleClass('is-open');
            $j('#search-box_id').slideToggle();
        });

        $j('.btn-user-xs').on('click', function (e) {
            e.preventDefault();
            $j(this).toggleClass('is-open');
            $j('.nav-user').slideToggle();
        });

        $j('.navbar-toggle[data-target="#main-navigation_id"]').on('click', function (e) {
            e.preventDefault();
            $j('.body').toggleClass('body-fixed');
        });



    }

    return {
        init: _init
    };
}();

/* =mainSlideshow */
var mainSlideshow = function () {
    function _init() {

        $j('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            loop: true,
            dots: true,
            fade: true,
            autoplay: true,
            autoplaySpeed: 8000,
            //asNavFor: '.slider-nav',

            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        dots: true,
                        fade: false,
                    }
                }
            ]
        });

        // $j('.slider-nav').slick({
        //     slidesToShow: 5,
        //     slidesToScroll: 1,
        //     asNavFor: '.slider-for',
        //     dots: false,
        //     centerMode: false,
        //     focusOnSelect: true,
        //
        //     responsive: [
        //         {
        //             breakpoint: 992,
        //             settings: {
        //                 fade: false,
        //             }
        //         }
        //     ]
        // });
    }

    return {
        init: _init
    };
}();

/* =responsive */
var responsive = function () {
    function _init() {

        function searchBar() {
            var searchForm = $j('#search-box_id');

            if($j(window).width() < 768) {
                if($j(searchForm).not().parent('.search-row')) {
                    $j(searchForm).addClass('collapse').wrap('<div class="search-row" id="search-row_id"></div>');
                    $j('#search-row_id').prependTo('.header--navbar .container');
                } else {
                    return;
                }
            }
        }
        searchBar();

        $j(window).resize(function () {
            searchBar();
        });
    }

    return {
        init: _init
    };
}();
