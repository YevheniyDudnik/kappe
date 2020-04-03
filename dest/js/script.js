$(document).ready(function() {
    openBurgerMobile();
    initHolderBgPortfolio('.portfolio');
    filterPortfolio();
});

$(window).resize(function() {
    resizeWindow();
});

function openBurgerMobile() {
    let burger = $('.burger');
    let header = $('.header');
    $(burger).click(function() {
        $(burger).toggleClass('fa-bars');
        $(burger).toggleClass('fa-times');
        $(header).toggleClass('header--open');
    });
}

function resizeWindow() {
    let burger = $('.burger');
    let header = $('.header');
    if ($(window).width() >= 768){
        $(header).removeClass('header--open');
        if ($(burger).hasClass('fa-times')) {
            $(burger).removeClass('fa-times');
            $(burger).addClass('fa-bars');
        }
    }
}

function initHolderBgPortfolio(element) {
    "use strict";
    var elementWrap = $(element),
        elementItem = elementWrap.find('.portfolio__item');
        elementItem.each(function() {
            var cur = $(this),
                curImage = cur.find('.portfolio--wrapper-inner'),
                img = curImage.find('.portfolio__img'),
                imgSrc = img.attr('src');
            if (!!curImage.length && !!img.length && !!imgSrc) {
                curImage.css({
                    backgroundImage: 'url(' + imgSrc + ')',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat'
                });
            img.remove();
        }
    });
}

function filterPortfolio() {
    // init Isotope
    var $portfolio = $('.portfolio').isotope({
        itemSelector: '.portfolio__item',
        layoutMode: 'masonry',
        transitionDuration: '0.5s',
        masonry: {
            columnWidth: 405,
            fitWidth: true
        }
    });
    // bind filter link click
    $('.filter__list').on( 'click', 'a', function() {
        var filterValue = $( this ).attr('data-filter');
        $portfolio.isotope({ filter: filterValue });
    });
    // change active class on links
    $('.filter__group').each( function( i, filterGroup ) {
        var $filterGroup = $( filterGroup );
        $filterGroup.on( 'click', 'a', function() {
            $filterGroup.find('.filter__link--active').removeClass('filter__link--active');
            $( this ).addClass('filter__link--active');
        });
    });
}