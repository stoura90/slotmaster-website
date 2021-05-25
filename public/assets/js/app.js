window.addEventListener('load', function(e){
    $('.select2').each(function(event){
        const placeholder = $(this).attr('placeholder')

        $(this).select2({
            minimumResultsForSearch: -1,
            placeholder: placeholder,
            allowClear: false,
            selectOnClose: false,
        })
        
        $(this).change(function(e) {
            const label = $(this).parent().find('label')
            if(e.target.value !== '') {
                $(label).show()
            } else {
                $(label).hide()
            }
        })
    })

    $('select[name="mlt"]').select2MultiCheckboxes({
    	templateSelection: function(selected, total) {
            return "Selected " + selected.length + " of " + total;
        }
    })

    // inputs
    $('input').on('keyup', function(e) {
        const parent = $(this).closest('.input-label') || $(this).closest('.input-label-border')
        if(e.target.value.length > 0) {
            $(this).parent().addClass('active')
        } else {
            $(this).parent().removeClass('active')
        }
    })

    // password show/hide
    $('.toggle-password').click(function(e) {
        const currentInput = $(this).parent().find('input')
        if($(currentInput).attr('type') == 'password') {
            $(currentInput).attr('type', 'text')
            $(this).removeClass('hide')
            $(this).addClass('active')
        } else {
            $(currentInput).attr('type', 'password')
            $(this).addClass('hide')
            $(this).removeClass('active')
        }
    })

    // swiper slide in header.bkp
    const swiper = new Swiper('.header.bkp-slider .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 11,
        centeredSlides: true,
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            1024: {
              slidesPerView: 'auto',
            },
          }
      
    });

    // header.bkp swiper slide pagination position
    
    if(swiper.$el !== undefined) {
        const container = $('.container').innerWidth()
        const activeSlider = $('.header.bkp-slider .swiper-slide-active').offset().left
        const bullets = $('.header.bkp-slider .swiper-pagination')
        if(window.innerWidth > 992) {

            $(bullets).css({
                'left': `${(activeSlider + container) - ($(bullets).innerWidth() / 3) - 4}px`
            })
    
            // header.bkp swiper slide arrows position
            $('.header.bkp-slider .swiper-button-prev').css({
                'left': `${($(document).innerWidth() - container) / 2 - 30}px`
            })
            $('.header.bkp-slider .swiper-button-next').css({
                'right': `${($(document).innerWidth() - container) / 2 - 30}px`
            })
        } else {
            $(bullets).css({
                'left': `50%`,
                'transform': 'translateX(-50%)'
            })
        }
    }

    // slot-swiper
    const slotSwiper = new Swiper('.slot-carousel .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 12,
        // Navigation arrows
        navigation: {
          nextEl: '.slot-carousel .swiper-btn.next',
          prevEl: '.slot-carousel .swiper-btn.prev',
        },
        breakpoints: {
            575: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 6,
            }
          }
      
    });

    const casinoSwiper = new Swiper('.casino-carousel .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 2,
        spaceBetween: 12,
      
        // Navigation arrows
        navigation: {
          nextEl: '.casino-carousel .swiper-btn.next',
          prevEl: '.casino-carousel .swiper-btn.prev',
        },
        breakpoints: {
            575: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
              slidesPerView: 5,
            },
            1200: {
              slidesPerView: 6,
            }
          }
      
    });

    const footerCareouselTop = new Swiper('.ft-carousel-1 .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 12,
      
        // Navigation arrows
        navigation: {
          nextEl: '.ft-carousel-1 .swiper-btn.next',
          prevEl: '.ft-carousel-1 .swiper-btn.prev',
        },
        breakpoints: {
            575: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            }
          }
      
    });
    const footerCareouselBottom = new Swiper('.ft-carousel-2 .swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 'auto',
        spaceBetween: 12,
      
        // Navigation arrows
        navigation: {
          nextEl: '.ft-carousel-2 .swiper-btn.next',
          prevEl: '.ft-carousel-2 .swiper-btn.prev',
        },
        breakpoints: {
            575: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            }
          }
      
    });

    const select = (el, text, clear) => {
        const title = text.charAt(0).toUpperCase() + text.slice(1);
        $(el).select2MultiCheckboxes({
            templateSelection: function(selected, total) {
                if(clear) {
                    if(selected.length > 1) {
                        return `${title}: ${selected.length - 1}`;
                    } else {
                        return `${title}: `;
                    }
                } else {
                    if(selected.length > 0) {
                        return `${title}: ${selected.length}`;
                    } else {
                        return `${title}: `;
                    }
                }
            }
        })
    }

    select('select[name="provider"]', 'Providers', false)
    select('select[name="categories"]', 'Categories', false)
    select('select[type="vendor"]', 'Vendor', false)
    select('select[type="type"]', 'Type', false)

    // clear select
    $('select').on('select2:open', function(e) {
        if($(this).attr('id') === 'clear') {
            setTimeout(() => {
                $('.select2-results__options li[aria-disabled="true"]').addClass('clear')
                $('.select2-results__options .clear').attr('aria-disabled', 'false')
                $('.select2-results__options .clear').on('click', function(el) {
                    $(this).parent().find('li').each(function(item){
                        $(this).attr('aria-selected', 'false')
                        $(this).removeClass('select2-results__option--highlighted')
                    })
                    $(e.target).val('')
                    select(e.target, e.target.name, true)
                })
            }, 500);
        }
        
    })

    // flatpickr
    $('.date-filter').flatpickr({
        mode: 'range',
        dateFormat: 'd/m/Y',
        maxDate: 'today',
        locale: {
            rangeSeparator: ' - '
        }
    })

    // birthday date flatpickr
    $('#birthday').flatpickr({
        dateFormat: 'd.m.Y',
        maxDate: 'today',
        disableMobile: true,
    })

    $('.date-filter').on('change', function(e) {
        if(e.target.value.length > 0) {
            $(e.target).next().find('span').addClass('d-none')
        }
    })
    $('#birthday').on('change', function(e) {
        if(e.target.value.length > 0) {
            $(e.target).parent().addClass('active')
        } else {
            $(e.target).parent().removeClass('active')
        }
    })

    // finances tab
    $('.finances .nav-item button').each(function(e) {
        const parent = $(this).closest('.finances')

        const primaryTitle = $('.title-con .pr')

        const secondaryTitle = $('.title-con .sec')

        const back = $('.title-con .back')

        $(this).on('click', function(btn) {
            if(btn.currentTarget) {
                $(parent).hide()

                $(primaryTitle).addClass('d-none')

                $(back).removeClass('d-none')

                $(back).addClass('d-flex')

                $(secondaryTitle).text(btn.currentTarget.textContent)
            }
        })
    })

    // when btn back click
    $('.title-con .back').on('click', function(e) {
        const parent = $(this).closest('.title-con')

        $('.finances.account-tabs').show()

        $(parent).find('.back').addClass('d-none')

        $(parent).find('.tab-headline.pr').removeClass('d-none')

        $('.finances .nav-item button').removeClass('active')

        $('#finance-tabContent .tab-pane').removeClass('show, active')
    })

    if($(window).innerWidth() < 768) {
        $('#finance-tabContent .tab-pane:first-child').addClass('show active')
    }
})