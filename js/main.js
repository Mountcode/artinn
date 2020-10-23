$(function(){

    const mobile_flag = 1024;
    const adaptive_w = $(window).width();

    $(window).on("resize", function () {
        const adaptive_w = $(window).width();
        if (adaptive_w < mobile_flag) {
            mobileScripst();
        }
        if (adaptive_w >= mobile_flag) {
            fixedHeader();
        }
    }).resize();

    // Fixed header
    function fixedHeader(){
        var fixed_el = $('header nav'),
            margin_fix_el = $('header');
        $( window).scroll(function() {
            var offtop = $(this).scrollTop();
            if (offtop > 300){
                $(fixed_el).addClass('fixed');
                $(margin_fix_el).addClass('marginFix');
            }
            else{
                $(fixed_el).removeClass('fixed');
                $(margin_fix_el).removeClass('marginFix');
            }
        });
    }
    

    // main menu parents
    function menuParentIcon(){
        $('<i class="fa fa-angle-down"></i>').appendTo('.main-menu>ul>.main-menu__link.main-menu__link_parent');
    }
    menuParentIcon();
            

    // Tabs
    $('.tabs .tab_nav li').click(function(){
        var thisTabsBlock = $(this).parents('.tabs');
        var activeTab = $(this).attr('data-tab');
        $('.tab_nav li',thisTabsBlock).removeClass('active')
        $(this).addClass('active');
        $('.tabs_content .tab',thisTabsBlock).removeClass('active');
        $('.tabs_content .tab[data-tab='+activeTab+']',thisTabsBlock).addClass('active'); 
    }); 

    //    Product card counter
    $('.counter-box .angles .fa-angle-up').click(function(){
        var currentItem = $(this).parents('.counter-box');
        var thisValue = $('.product-counter',currentItem).val(); 
        thisValue++;
        $('.product-counter',currentItem).val(thisValue);
    })
    $('.counter-box .angles .fa-angle-down').click(function(){
        var currentItem = $(this).parents('.counter-box');
        var thisValue = $('.product-counter',currentItem).val();
        if(thisValue != 1){
            thisValue--;
            $('.product-counter',currentItem).val(thisValue);
        }
    })

    //******************* Slider and carousels *********************//
    $('.main-slider').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn', 
        lazyLoad: true,
        nav: true,
        stagePadding:0,
        smartSpeed:450,
        navText: "",
        autoplay: true,
        autoplayTimeout: 15000,
        autoplaySpeed: 700,
        margin: 0,
        responsiveClass: true,
        loop: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 1,
                dots:true,
                nav: false
            },
            1000: {
                items: 1,
                nav: false,
                dots: true,
                loop: true
            }
        }
    });

    $('.review-carousel').owlCarousel({
        animateOut: 'fadeOut',
        animateIn: 'fadeIn', 
        lazyLoad: true,
        nav: true,
        stagePadding:0,
        // smartSpeed:450,
        navText: "",
        autoplay: true,
        autoplayTimeout: 15000,
        autoplaySpeed: 700,
        margin: 0,
        responsiveClass: true,
        loop: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 1,
                dots:true,
                nav: false
            },
            1000: {
                items: 1,
                nav: false,
                dots: true,
                loop: true
            }
        }
    });

    //   Product page 2 owl carousels
    try {
        var slider = $(".carousel-full");
            var thumbnailSlider = $(".carousel-thumbs");
            var duration = 500;
            var syncedSecondary = true;

            setTimeout(function () {
                $('.cloned .item-slider-model a').attr('data-fancybox', 'group-2');
            }, 500);

            // carousel function for main slider
            slider
                .owlCarousel({
                    loop: true,
                    nav: false,
                    dots: false,
                    navText: ['', ''],
                    items: 1,
                    lazyLoad: true,
                    autoplay: false,
                    autoHeight: true,
                    mouseDrag: false,
                    smartSpeed: 600,
                    autoplayHoverPause: true,
                    smartSpeed:650,
                }).on('changed.owl.carousel', syncPosition);


            // carousel function for thumbnail slider
            thumbnailSlider
            .on('initialized.owl.carousel', function () {
                thumbnailSlider.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                loop: false,
                nav: false,
                margin: 10,
                smartSpeed: 600,
                smartSpeed:650,
                autoplay: false,
                mouseDrag: false,
                animateIn: 'fadeIn', 
                animateOut: 'fadeOut', 
                responsive: {
                    0: {
                        items: 4
                    },
                    600: {
                        items: 5
                    },
                    1200: {
                        items: 4
                    }
                }
            }).on('changed.owl.carousel', syncPosition2);

            var owl = $('.carousel-full');

            $('.slider_box .next_gallery').click(function() {
                owl.trigger('next.owl.carousel');
            })

            $('.slider_box .prev_gallery').click(function() {
                owl.trigger('prev.owl.carousel');
            })


        // on click thumbnaisl
        thumbnailSlider.on("click", ".owl-item", function (e) {
            e.preventDefault();
            var number = $(this).index();
            slider.data('owl.carousel').to(number, 300, true);
        });


        function syncPosition(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }

            thumbnailSlider
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = thumbnailSlider.find('.owl-item.active').length - 1;
            var start = thumbnailSlider.find('.owl-item.active').first().index();
            var end = thumbnailSlider.find('.owl-item.active').last().index();

            if (current > end) {
                thumbnailSlider.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                thumbnailSlider.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }

        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                slider.data('owl.carousel').to(number, 100, true);
            }
        }

    } catch (e) {
        console.log(e);
    }

    //************* Mobile scripts and fixs ***************//
    function mobileScripst(){
        $('.mobile-menu').click(function(){
            $(this).toggleClass('active');
            $(this).next('ul').toggleClass('active');
        });
        $('.sidebar__item_mobile-closed').click(function(){
            $('.sidebar__title',this).toggleClass('active');
        });
        $('.remove_button').text('X')
    }


    //***************** Stable scripts *******************//
    $('input.phone').mask('+7 (000) 000-0000');
    $('input.phone').focus(function(){
        $(this).text('+7').val('+7');
    });
    $('#contact_form').submit(function(){
        $.fancybox.close();
    });
    new WOW().init();


    // Accordion
    $('.accordion').on('click','.accordion__header',function(){
        $(this).parent('.accordion__row').toggleClass('active')
        $(this).next('.accordion__content').slideToggle('fast')
    })

    try{
        //    Анимированный счетчик цифр
        var show = true;
        var countbox = "#counts";
        $(window).on("scroll load resize", function(){
            if(!show) return false;
            if(!$(countbox).length) return false;
            var w_top = $(window).scrollTop();        
            var e_top = $(countbox).offset().top;     
            var w_height = $(window).height();        
            var d_height = $(document).height();      
            var e_height = $(countbox).outerHeight(); 
            if(w_top + 700 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
                $(".spincrement").spincrement({
                    thousandSeparator: "",
                    duration: 2000
                });
                show = false;
            }
        });

        var show__2 = true;
        var countbox2 = "#counts__2";
        $(window).on("scroll load resize", function(){
            if(!show__2) return false;
            if(!$(countbox2).length) return false;
            var w_top = $(window).scrollTop();        
            var e_top = $(countbox2).offset().top;     
            var w_height = $(window).height();        
            var d_height = $(document).height();      
            var e_height = $(countbox2).outerHeight(); 
            if(w_top + 700 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height){
                $(".spincrement").spincrement({
                    thousandSeparator: "",
                    duration: 2000
                });
                show__2 = false;
            }
        });
    } catch (err) {}

    // Images lazyload
    (function() {
        function logElementEvent(eventName, element) {
            console.log(
                Date.now(),
                eventName,
                element.getAttribute("data-src")
            );
        }

        var callback_enter = function(element) {};
        var callback_exit = function(element) {};
        var callback_reveal = function(element) {};
        var callback_loaded = function(element) {};
        var callback_error = function(element) {
            element.src =
                "../libs/lazyload/error_placeholder.png";
        };
        var callback_finish = function() {
            logElementEvent("lazyload done", document.documentElement);
        };

        var ll = new LazyLoad({
            callback_enter: callback_enter,
            callback_exit: callback_exit,
            callback_reveal: callback_reveal,
            callback_loaded: callback_loaded,
            callback_error: callback_error,
            callback_finish: callback_finish
        });

    })();

    // parallax bg
    (function($) {
        $.fn.bgscroll = function(options) {
        
            var x = $.extend({
            bgpositionx: 50,
            direction: "bottom",
            debug: !1,
            min: 0,
            max: 100
            }, options);
        
            var a = $(document).height() - $(window).height(),
                b = a - (this.offset().top + this.height());
        
            this.offset().top < a && (b = 0);
        
            var c = (this.offset().top + this.height());
        
            if ($(window).scrollTop() > b && $(window).scrollTop() < c) {
            var d = ($(window).scrollTop() - b) / (c - b) * 100;
        
            "top" == x.direction && (d = 100 - d),
                d > x.max && (d = x.max),
                d < x.min && (d = x.min);
        
            if (x.debug){
                console.log('Element background position: ' + d + ' %');
            }
            }
        
            return this.css({
            backgroundPosition: x.bgpositionx + '% ' + d + '%'
            });
        };
    }(jQuery));


    // To top
    $( window).scroll(function() {
        var offtop = $(this).scrollTop();
        var page_h = document.body.clientHeight;
        if (offtop > 580){$('.totop').fadeIn('fast');}
        else{$('.totop').fadeOut('fast');}
        if(offtop > page_h - 900){
            $('.totop').addClass('stopped')
        }
        else{
            $('.totop').removeClass('stopped')
        }
    });
    $('.totop').click(function(){
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // page anchor
    try {
        $('.goTo').click(function() {
            var dataAnchor = $(this).attr('data-go');
            $('.toThis').each(function() {
                if ($(this).attr('data-go') == dataAnchor) {
                    $('html, body').animate({ scrollTop: $(this).offset().top - 80 }, 500);
                }
            })
        });
    } catch (err) {
        console.log(err);
    }

})
























