//SPINNER SIM
$(window).on('load', function () {
    $('.spinner-bg').fadeOut(700);
});

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
    $('#add-spot').on('click', function () {
        var spotName = $('#spot-name');
        var spotNameVal = $('#spot-name').val();
        if(spotName.val() === ''){
            $(this).parents('.row').find('.error-msg').css('visibility', 'visible');
            spotName.addClass('error');
            spotName.val('').focus();
        }
        else{
            $(this).parents('.row').find('.error-msg').css('visibility', 'hidden');
            var pSpot = '<tr><td>' + spotNameVal + '</td><td><select><option selected="">Rotating</option><option selected="">Permanent</option></select></td><td><span class="badge badge-warning remove-entry">remove</span></td></tr>';
            $('.pr-default-table tbody').append(pSpot);
            spotName.removeClass('error');
            spotName.val('').focus();
        }
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

    //TOGGLE CAMPAIGN MODE
    $('#campaign-mode').click(function () {
        if ($(this).prop('checked') == true) {
            $('#manual').hide();
            $('#auto').show();
        }
        else {
            $('#manual').show();
            $('#auto').hide();
        }
    });

    //TOGGLE MODE BLOCK
    // $('#campaign-state').click(function(){
    //     if($(this).prop('checked') == true){
    //         console.log('checked');
    //         $('#mode-block').show();
    //         $('#text-on').show();
    //         $('#text-off').hide();
    //     }
    //     else {
    //         console.log('unchecked');
    //         $('#mode-block').hide();
    //         $('#text-on').hide();
    //         $('#text-off').show();
    //     }
    // });

    //LOCATION SELECT
    $('select[name="pkLocation"]').change(function () {
        var value = $(this).find("option:selected").attr("value");

        switch (value) {
            case "2":
                $('#bg-gtc-gh').show();
                $('#bg-gtc-gh').siblings().hide()
                break;
            case "3":
                $('#bg-gtc-41').show();
                $('#bg-gtc-41').siblings().hide()
                break;
            case "4":
                $('#kg-open').show();
                $('#kg-open').siblings().hide()
                break;
            case "5":
                $('#ni-open').show();
                $('#ni-open').siblings().hide()
                break;
            default:
                $('#bg-gtc-open').show();
                $('#bg-gtc-open').siblings().hide()
                break;
        }
    });

    //REPORT VIEW LOCATION
    $('#view-location').on('click', function () {
        var img = $('.parking-sceheme-img');
        img.toggle();
        if (img.hasClass('d-none')) {
            img.toggleClass('d-none');
            $(this).html('hide location');
        }
        else if (!img.hasClass('d-none')) {
            img.toggleClass('d-none');
            $(this).text('show location');
        }
    });

    //SPOT TYPE SWITCH
    $('.parking-type').on('click', function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    //REPORT TOGGLE RESERVED STATUS
    $(function () {
        var reserved = $('.reservation-spot');
        var allReserved = $('.pr-default-table').find(reserved);
        allReserved.parents('tr').hide();
        $('.js_reserved').on('click', function () {
            allReserved.parents('tr').toggle();
            $(this).text() === 'show reserved' ? $(this).text('hide reserved') : $(this).text('show reserved');
        });
    });
});

$('.parking-sceheme-img').zoom()