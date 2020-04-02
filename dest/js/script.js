$(document).ready(function() {
    openBurgerMobile();
    initHolderBgPortfolio('.portfolio');
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
