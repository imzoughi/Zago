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
    bootstrapModule.init();
    mainNav.init();
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
        $j('.mega-menu .dropdown-menu .dropdown-box').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
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

        $j('.navbar-toggle[data-target="#main-menu-navigation"]').on('click', function (e) {
            e.preventDefault();
            $j('.body').toggleClass('object-fixed');
        });



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
                $j(searchForm).addClass('collapse').wrap('<div class="search-row" id="search-row_id"></div>');
                $j('#search-row_id').prependTo('.header--navbar .container');
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
