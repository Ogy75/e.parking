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
    $(window).scroll(function () {
        var height = $(window).scrollTop();
        var scrolled = $('.pr-top-bar, .pr-nav-button')
        if (height > 80) {
            scrolled.removeClass('nav-down');
            scrolled.addClass('nav-up');
        } else {
            scrolled.addClass('nav-down');
            scrolled.removeClass('nav-up');
        }
    });

    // var didScroll;
    // var lastScrollTop = 0;
    // var delta = 5;
    // var navbarHeight = $('.pr-top-bar').outerHeight();

    // $(window).scroll(function (event) {
    //     didScroll = true;
    // });
    // setInterval(function () {
    //     if (didScroll) {
    //         hasScrolled();
    //         didScroll = false;
    //     }
    // }, 100);
    // function hasScrolled() {
    //     var st = $(this).scrollTop();
    //     if (Math.abs(lastScrollTop - st) <= delta)
    //         return;
    //     if (st > lastScrollTop && st > navbarHeight) {
    //         $('.pr-nav-button').removeClass('nav-down').addClass('nav-up');
    //         $('.pr-top-bar').removeClass('nav-down').addClass('nav-up');
    //     } else {
    //         if (st + $(window).height() < $(document).height()) {
    //             $('.pr-nav-button').removeClass('nav-up').addClass('nav-down');
    //             $('.pr-top-bar').removeClass('nav-up').addClass('nav-down');
    //         }
    //     }
    //     lastScrollTop = st;
    // }

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
    $('.js_addSpot').on('click', function () {
        var input = $('.spot-name-input');
        console.log(input);
        var spotName = $(this).parents('.js_parent').find(input);
        if (spotName.val() === '') {
            $(this).parents('.row').find('.error-msg').css('visibility', 'visible');
            spotName.addClass('error');
            spotName.val('').focus();
        }
        else {
            $(this).parents('.js_parent').find('.error-msg').css('visibility', 'hidden');
            var pSpot = '<tr><td><span class="badge badge-primary pk-spot-prefix">' + spotName.val() + '</span></td><td><select><option selected>Rotating</option><option>Permanent</option></select></td><td><span class="badge badge-warning cursor-pointer  js_removeEntry">remove</span></td></tr>';
            $('.pr-default-table tbody').append(pSpot);
            spotName.removeClass('error');
            spotName.val('').focus();
        }
    });

    //REMOVE ENTRY ITEM
    $('.js_removeEntry').on('click', function () {
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

    //TOGGLE CAMPAIGN VIEW
    $('#campaign-view-mode').click(function () {
        if ($(this).prop('checked') == true) {
            $('.current-list').hide();
            $('.campaign-list').show();
            $('#spots-header').find('span.title').text('Ongoing Campaign Status');
            $('#free-spot-count').hide();
            $('#unnasigned-active-count').text('3 active');
        }
        else {
            $('.campaign-list').hide();
            $('.current-list').show();
            $('#spots-header').find('span.title').text('Parking Spots');
            $('#free-spot-count').show();
            $('#unnasigned-active-count').text('8 active');
        }
    });

    //LOCATION SELECT
    $('select[name="pkLocation"]').change(function () {
        var value = $(this).find('option:selected').attr('value');

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

    //UNNASIGNED USERS FILTER
    $(function () {
        $('.unassigned-user-list').find('.badge-success').parents('.pr-block').show();
        $('.unassigned-user-list').find('.badge-warning, .badge-danger').parents('.pr-block').hide();
        $('select[name="unassignedStatus"]').change(function () {
            var value = $(this).find('option:selected').attr('value');

            switch (value) {
                case "2":
                    $('.unassigned-user-list').find('.pr-block').show();
                    break;
                case "3":
                    $('.unassigned-user-list').find('.badge-warning').parents('.pr-block').show();
                    $('.unassigned-user-list').find('.badge-success, .badge-danger').parents('.pr-block').hide();
                    break;
                case "4":
                    $('.unassigned-user-list').find('.badge-danger').parents('.pr-block').show();
                    $('.unassigned-user-list').find('.badge-warning, .badge-success').parents('.pr-block').hide();
                    break;
                default:
                    $('.unassigned-user-list').find('.badge-success').parents('.pr-block').show();
                    $('.unassigned-user-list').find('.badge-warning, .badge-danger').parents('.pr-block').hide();
                    break;
            }
        });
    });

    //REPORT VIEW LOCATION
    $('#view-location').on('click', function () {
        var img = $('.parking-sceheme-img');
        $(this).parents('.modal-body').find(img).slideToggle();
        $(this).find('i').toggleClass('fa-times');
    });

    //REPORT TOGGLE RESERVED STATUS
    $('.spot-history').hide();
    $('.js_history').on('click', function () {
        $(this).find('.spot-history').slideToggle(200);
        // $(this).toggleClass('fa-chev');
        $(this).find('.js_toggleButton').toggleClass('fa-chevron-up');
    });

    //FILTER USERS
    $('#filter-users').keyup(function () {
        var input = $(this);
        var filter = $(this).val(),
            count = 0;
        var user = $(this).parents('.pk-user-list').find('.unnasigned-user-data');
        var block = $(this).parents('.pk-user-list').find('.pr-block');
        $(user).each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).closest(block).hide();
            } else {
                $(this).closest(block).show();
                count++;
            }
            $('.input-icon').on('click', function () {
                if ($(this).hasClass('fa-times')) {
                    input.val('');
                    input.focus();
                    $(this).removeClass('fa-times');
                    block.show();
                    $('.results-message').hide()
                }
            });
        });
        (filter.length > 0) ? $('.input-icon').addClass('fa-times') : $('.input-icon').removeClass('fa-times');
        (count > 0) ? $('.results-message').hide() : $('.results-message').show();
    });
    //TOGLE DISABLED (DEACTIVATE USER PERMANENTLY)
    $('#permanent-deactivate-user').click(function () {
        if ($(this).prop('checked') == true) {
            $(this).parents('.modal-body').find('input[type=datetime]').prop('disabled', true);
        }
        else {
            $(this).parents('.modal-body').find('input[type=datetime]').prop('disabled', false);
        }
    });

    //PARKING TYPE TAB
    $('.panel-tabs a').click(function () {
        var tab_id = $(this).attr('data-tab');

        $('.panel-tabs a').removeClass('active');
        $('.tab-content').hide();

        $(this).addClass('active');
        $("#" + tab_id).show();
    })
});

$('.parking-sceheme-img').zoom()