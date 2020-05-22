$( document).ready(function() {

    //NOTIF MESSAGES
    var error = {
        dataLoad: 'Error Loading Data! Please try Again.',
        incomplete: 'Please select required data.',
        other: 'Bla, bla, bla...',
    }
    var success = {
        save: 'Sucessfully Saved.',
        add: 'Successfully added',
    }
    var info = {
        general: 'Lep je dan napolju!',
        reccuringModeOff: 'Reccuring Mode has been turned Off. Campaigns will not repeat weekly.',
        reccuringModeOn: 'Reccuring Mode has been turned On. Campaigns will repeat on selected days.',
        general: 'some info',
    };

    //NOTIFICATION INIT
    Notiflix.Notify.Init({
        width: '300px',
        fontSize: '13px',
        fontFamily: 'Arial',
        timeout: 5000,
        messageMaxLength: 200,
        success: {
            background: '#1f9c26',
            childClassName: 'success',
            notiflixIconColor: 'rgba(255,255,255,0.4)',
        },
        failure: {
            background: '#d8483e',
            childClassName: 'failure',
            notiflixIconColor: 'rgba(255,255,255,0.4)',
        },
        info: {
            background: '#0000b4',
            childClassName: 'info',
            notiflixIconColor: 'rgba(255,255,255,0.4)',
        },
    });

    //SPINNER SIM
    $(window).on('load', function () {
        $('.spinner-bg').fadeOut(700);
    });

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
        if ($(this).prop('checked') === true) {
            $('#manual').hide();
            $('#auto').show();
            Notiflix.Notify.Info(info.reccuringModeOn);
        }
        else {
            $('#manual').show();
            $('#auto').hide();
            Notiflix.Notify.Info(info.reccuringModeOff);
        }
    });

    //TOGGLE CAMPAIGN VIEW
    $('.campaign-period-arrow').on('click',function () {
        if (!$(this).hasClass('inactive')){
            $('.current-period-arrow').removeClass('inactive');
            $(this).addClass('inactive');
            $('.campaign-period-list').show();
            $('.campaign-period-date').show();
            $('.current-period-list').hide();
            $('.current-period-date').hide();
            $('#spots-header').find('span.title').text('Campaign Status');
            $('#free-spot-count').hide();
            }
    });
    $('.current-period-arrow').on('click',function () {
        if (!$(this).hasClass('inactive')){
            $(this).addClass('inactive');
            $('.campaign-period-arrow').removeClass('inactive');
            $('.current-period-list').show();
            $('.current-period-date').show();
            $('.campaign-period-list').hide();
            $('.campaign-period-date').hide();
            $('#spots-header').find('span.title').text('Parking Spots');
            $('#free-spot-count').show();
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
    });

    //LOAD MORE
    $('.history-item').hide();
    if ($(window).height() < 640) {
        $(function () {
            $('.history-item').slice(0, 6).show();
            $('#load-more').on('click', function (e) {
                e.preventDefault();
                $('.history-item:hidden').slice(0, 10).slideDown();
                if ($('.history-item:hidden').length == 0) {
                    $('#load-more').hide();
                }
            });
        });
    }
    else {
        $(function () {
            $('.history-item').slice(0, 10).show();
            $('#load-more').on('click', function (e) {
                e.preventDefault();
                $('.history-item:hidden').slice(0, 10).slideDown();
                if ($('.history-item:hidden').length == 0) {
                    $('#load-more').hide();
                }
            });
        });
    };

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

    //NOTIFICATIONS DEMO
    $('.js_success').on('click', function () {
        Notiflix.Notify.Failure(error.dataLoad);
        Notiflix.Notify.Failure(error.incomplete);
        Notiflix.Notify.Failure(error.other);
        Notiflix.Notify.Success(success.save);
        Notiflix.Notify.Info(info.general);
        $('.js_showDates').show();
    });

    
    $("#appRestart").modal();

});

$('.parking-sceheme-img').zoom()