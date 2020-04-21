$(document).ready(function() {
    openBurgerMobile();
    initDots('.portfolio__info--title, .portfolio__info--category, [class $= "__description--text"]', 3, 0);
    initDots('.reference-post__title, .aside-post__text', 2, 0);
    initDots('[class $= "__description--title"], .reference-post__link, .aside-post__title', 1, 0);
    initHolderBg('.portfolio, .blog');
    filterPortfolio();
    filterBlog();
    carousel('.gallery-post__carousel');
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

function filterPortfolio() {
    var $portfolio = $('.portfolio').isotope({
        itemSelector: '.portfolio__item',
        layoutMode: 'masonry',
        transitionDuration: '0.5s',
        masonry: {
            columnWidth: 405,
            fitWidth: true
        }
    });
    $('.filter__list').on( 'click', 'a', function() {
        var filterValue = $( this ).attr('data-filter');
        $portfolio.isotope({ filter: filterValue });
    });
    $('.filter__group').each( function( i, filterGroup ) {
        var $filterGroup = $( filterGroup );
        $filterGroup.on( 'click', 'a', function() {
            $filterGroup.find('.filter__link--active').removeClass('filter__link--active');
            $( this ).addClass('filter__link--active');
        });
    });
}

function filterBlog() {
    var $blog = $('.blog').isotope({
        itemSelector: '.blog__item',
        layoutMode: 'masonry',
        transitionDuration: '0.5s',
        masonry: {
            columnWidth: 294,
            fitWidth: true,
            gutter: 25,
            horizontalOrder: true
        }
    });
    $('.filter__list').on( 'click', 'a', function() {
        var filterValue = $( this ).attr('data-filter');
        $blog.isotope({ filter: filterValue });
    });
    $('.filter__group').each( function( i, filterGroup ) {
        var $filterGroup = $( filterGroup );
        $filterGroup.on( 'click', 'a', function() {
            $filterGroup.find('.filter__link--active').removeClass('filter__link--active');
            $( this ).addClass('filter__link--active');
        });
    });
}

function carousel(element) {
    "use strict";
    var slider = $(element);
    $(slider).slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        draggable: false,
        nextArrow: '<i class="fas fa-angle-right slick-next slick-arrow"></i>',
        prevArrow: '<i class="fas fa-angle-left slick-prev slick-arrow"></i>',
        speed: 500
    });
}

function initHolderBg(element) {
    "use strict";
    var elementWrap = $(element),
        elementItem = elementWrap.find('[class *= "item"]');
        elementItem.each(function() {
            var cur = $(this),
                curImage = cur.find('[class *= "wrapper-inner"]'),
                img = curImage.find('[class *= "img"]'),
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

function initDots(element, line, tolerance) {
	'use strict';
	var elementWrap = $(element);
	elementWrap.each(function () {
		var lines = line,
			holder = $(this),
            textLH = parseInt(holder.css('line-height')),
            textH = parseInt(holder.height()),
            textInnerH = parseInt(holder.innerHeight()),
            maxH = (textLH * (lines + 1)) + (textInnerH - textH);
		holder.css({ maxHeight: maxH }).dotdotdot({
            tolerance: tolerance,
            watch: true
		});
	});
}