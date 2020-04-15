$(function () {
    //MAIN NAV
    var navTrigger = $('.pr-nav-button');
    var nav = $('.pr-container-nav');
    navTrigger.on('click', function () {
        nav.toggleClass('hide-menu');
        $('.pr-wrapper-right').toggleClass('wrapper-right-expand');
    });

    //TOP BAR SCROLL
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.pr-top-bar').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 100);
    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop && st > navbarHeight) {
            $('.pr-nav-button').removeClass('nav-down').addClass('nav-up');
            $('.pr-top-bar').removeClass('nav-down').addClass('nav-up');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('.pr-nav-button').removeClass('nav-up').addClass('nav-down');
                $('.pr-top-bar').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }

    //BLOCK MENU
    $('.pr-block-menu').on('click', function () {
        var trigger = event.target;
        $(trigger).find('.menu-items').toggle();
    });
    $('.menu-items').on('click', function () {
        $(this).hide();
    });
    $(document).mouseup(function (ev) {
        var container = $('.menu-items');
        if (!container.is(ev.target) && container.has(ev.target).length === 0) {
            container.hide();
        }
    });

    //ADD NEW PARKING SPOT
    var pSpot = '<tr><td>Level 2 - 215</td><td><select><option selected="">Rotating</option><option selected="">Permanent</option></select></td><td><span class="badge badge-warning remove-entry">remove</span></td></tr>';
    $('#add-spot').on('click', function () {
        $('.pr-default-table tbody').append(pSpot);
    });

    //REMOVE ENTRY ITEM
    $('.remove-entry').on('click', function () {
        $(this).parents('tr').remove();
    });

    //SCROLL TOP
    //Scroll to top
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#go-top').fadeIn(100);
        } else {
            $('#go-top').fadeOut(100);
        }
    });
    $('#go-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
    });
});
