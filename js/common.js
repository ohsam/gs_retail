var commonJs = {};
this.commonJs = commonJs;
var winSt = 0;
var ptrInstance = undefined;
const ANIMATION_EASING = 'easeOutExpo';

/**
 * 트랜지션 css
 */
var cssScript = {
    actionInput: {
        'transition': 'all 0.4s',
        '-webkit-transition': 'all 0.4s',
        '-moz-transition': 'all 0.4s',
        '-ms-transition': 'all 0.4s',
        '-o-transition': 'all 0.4s',
    },
    scrollFix: {
        'transition': 'height 0.4s, padding 0.4s',
    }
}


$(document).on('ready', function () {
    console.log('-------script bind-------');
    eventBinding.bind();
})

$(window).on('load', function () {

    commonJs.initPriceNumArea($('.btnFixed.prFixed'));
    commonJs.initEventFlyer($('.eventFlyer'));
    commonJs.initSwiper($('.swipeArea'));
    commonJs.initActiveInput($('.activeInput'));
    commonJs.initTabToggle('.tabScript', 'tabcon');
    commonJs.initAccordion($('.acc'));
    commonJs.initSearchBar($('.totalSearch .srch'));
    commonJs.initStepContainer($('.stepConArea'));
    commonJs.initScrollFix($('.setFilterArea .setFilter'));
    commonJs.initTabToggle('.tabScript', 'tabCont');
    commonJs.initHashMotion($('.setFilter'));
    commonJs.initPTR('.refreshArea');
    commonJs.initAutoResizeArea($('.autosizeArea'));
    commonJs.initStampBoard($('.stampBoard'));
    commonJs.initEvtRoulette($('.rouletteArea'), 8);
    commonJs.initDataPathBtn($('a,button'));
    commonJs.initDayPicker($('.days'));
    commonJs.initTabTogMotion($('.tabTog'));
    commonJs.initDepthAcc($('.mbsCoupon'));
    commonJs.initDoughnutChart('.bnfGraph', '.grp');
    commonJs.initDoughnutChart('.targetGraph', '.grp');
    commonJs.initScrollDetect($('.grp'));
    commonJs.initMainTab($('.mainTab'));
    commonJs.initCategorySwipe($('.categorySwipe'));
    commonJs.initDesignScroll($('.myStorage'));
    commonJs.setCouponFontSize($('.imgCoupon'));

    /* [s]: 와인25+ */
    commonJs.initDesignScroll($('.wineList'));
    commonJs.initSquareBoard($('.squareBoard'));
    commonJs.initGnbWine($('.gnb_wine'));
    commonJs.initGauge($('.gauge'));
    commonJs.initScoring($('.scoringBlock'));
    commonJs.initBoxSwiper($('.wineCallDetail .swiper-container'));
    commonJs.initWineStorage($('.wineStorage'));
    /* [e]: 와인25+ */
})

var eventBinding = {
    /**
     * 동적으로 노드가 append되는 경우의 위임이벤트
     */
    bind: function () {
        commonJs.initActiveRadio('.storeSelect li>.checkForm>label');
        commonJs.initBtnSelect('.prRist li>button');
        commonJs.initOneBtnSelect('.categoryTab li>a');
        commonJs.initExpendedToggle('.rsvList li>.rsvStore');
        commonJs.initSorting('.sorting select');
        commonJs.initArlimMoreBtn('.arlimList .more');
        commonJs.initSetMoreBtn('.moreArea', '.moreCon', '.more');
        commonJs.initMoreTxt('.txtArea .moreTxt');
        commonJs.initOneBtnSelect('.setFilter .kwHashtag>li>a');
        commonJs.initOneBtnSelect('.setFilter .kwHashtag>li>span>input');
        commonJs.initStoreViewer('.storeViewer .viewCtrl button');
        commonJs.initShowPassword('.pwshow');

        commonJs.initTooltipBtn('.tooltip>.tooltipBtn', '.tooltipCont>button.btnClose');
        commonJs.initOneBtnClass('.infoBtn button');
        commonJs.initSendConRadio('.sendCon .radioCon .checkForm input');
        commonJs.initNoneAnimMoreBtn('.mbsShow', '.btnOpen>button');
        commonJs.initFaqCategory('.faqCategory');
        commonJs.initTermsArea('.termsArea');
        commonJs.initToastTooltip($('.shareArea'));
    }
}


/** *******************************************************
 * 
 * 이벤트 위임 스크립트
 * 
 *  ********************************************************/

/**
 * 공통 fixed버튼 활성화 라디오버튼 
 * gsf-029.html 최근 배송지목록 라디오버튼 적용
 */
commonJs.initActiveRadio = function (node) {
    $(document).on('click', node, function (evt) {
        $('.btnFixed button.btnTP').attr('disabled', false);
    })
}

/**
 * 공통 button태그 aria-selected show
 * gsf-027.html 장바구니버튼 적용
 * 
 * 마크업상 .prRist li>button 요소에만 적용하면 됩니다. 
 */
commonJs.initBtnSelect = function (node) {
    $(document).on('click', node, function (evt) {
        evt.preventDefault();

        $(node).removeAttr('title');

        if ($(this).hasClass('btnBasket')) {
            return;
        }
        if ($(this).hasClass('on') && $(this).attr('data-path') == undefined) {
            $(this).removeClass('on').removeAttr('class');
        } else {
            $(this).addClass('on').attr('title', '주문선택');
        }
    })
}

/**
 * one aria-selected element show/hide
 * com-502.html
 */
commonJs.initOneBtnSelect = function (node) {

    $(document).on('click', node, function (evt) {

        var btnType = ($(this).prop('tagName') == 'A') ? 'aria-selected' : 'checked';

        if ($(this).prop('tagName') == 'A') {
            evt.preventDefault();
            $(node).attr(btnType, false);
            $(this).attr(btnType, true);
        } else {

            if (!$(this).is(':checked')) {
                $(this).prop(btnType, false);
            } else {
                $(this).prop(btnType, true);
            }
        }

        $(this).trigger('gsrHash');

        var searchArea = $(this).closest('.tabCont').find('.searchArea');
        if (searchArea.length) {
            searchArea.find('.btnArea button').trigger('hash_click');
        }
    })
}

/**
 * 예약상품 리스트
 * gsf-013.html
 */
commonJs.initExpendedToggle = function (node) {
    $(document).on('click', node, function (evt) {
        var t = $(this);
        var flag = false;

        if (t.attr('aria-expanded') == 'false') {
            flag = true;
        } else {
            flag = false;
        }
        t.attr('aria-expanded', flag);

    })
}

/**
 * 공통 가운데정렬 셀렉박스
 */
commonJs.initSorting = function (node) {
    $(document).on('change', node, function (evt) {
        var selectedName = $(this).children('option:selected').text();
        $(this).next('label').text(selectedName);

    })

}

/**
 * 알림리스트 더보기 버튼
 * uti-001.html
 */
commonJs.initArlimMoreBtn = function (node) {
    $(document).on('click', node, function (evt) {
        $(this).closest('.arlimCon').addClass('txtAll');
    })
}

/**
 * 설정페이지 이벤트알림 더보기 버튼
 * UTI-008.html
 */
commonJs.initSetMoreBtn = function (parent, con, btn) {
    if (!$(parent).find(con).length) {
        return;
    }
    //open button
    $(document).off('.setMoreBtn').on('click.setMoreBtn', parent + '>' + btn, function (evt) {
        var _this = $(this);

        var container = _this.closest(parent);

        _this.attr('aria-expanded', true);
        _this.closest(parent).addClass('on');
        container.css({
            'display': 'block',
            'overflow': 'hidden',
        });

        var h = container.outerHeight();

        container.css({
            'height': _this.outerHeight()
        }).stop().animate({
            'height': h,
        }, {
            duration: 250,
            ease: ANIMATION_EASING,
            complete: function () {
            }
        })
    })

    //close button
    $(document).on('click', con + ' ' + btn, function (evt) {
        var _this = $(this);
        var container = _this.closest(parent);
        var moreArea = _this.closest(parent);

        container.stop().animate({
            'height': _this.outerHeight(),
        }, {
            duration: 250,
            ease: ANIMATION_EASING,
            complete: function () {
                container.removeAttr('style');
                moreArea.removeClass('on');
                moreArea.children(btn).attr('aria-expanded', false);
            }
        })
    })
}

/**
 * text Area 더보기 버튼
 * com-508.html
 */
commonJs.initMoreTxt = function (node) {
    $(document).on('click', node, function (evt) {
        $(this).closest('.txtArea').addClass('on');
    })
}


/**
 * 매장찾기 지도 보이기/숨기기
 * com-317.html
 */
commonJs.initStoreViewer = function (node) {
    $(document).on('click', node, function (evt) {
        var _t = $(this);
        var storeViewer = _t.closest('.storeViewer');
        var listView = storeViewer.find('.listView');
        var mapView = storeViewer.find('.mapView');

        //map button
        if (_t.hasClass('map')) {
            var listBtn = _t.siblings('.list');

            _t.removeClass('on').addClass('out');
            listView.hide();
            mapView.show().css({
                'height': $(window).outerHeight() - mapView.offset().top
            });

            setTimeout(function () {
                _t.removeClass('out');
                listBtn.addClass('on');
            }, 950);
        }

        //list button
        if (_t.hasClass('list')) {
            var mapBtn = _t.siblings('.map');

            _t.removeClass('on').addClass('out');
            mapView.hide().css('height', '');
            listView.show();

            setTimeout(function () {
                _t.removeClass('out');
                mapBtn.addClass('on');
            }, 950);
        }

    })
}

/**
 * 비밀번호 보기/안보이기
 * int-027.html
 */
commonJs.initShowPassword = function (node) {
    $(document).on('click', node, function (evt) {
        var text = ['비밀번호 숨기기', '비밀번호 보기'];
        var _t = $(this);

        if (_t.hasClass('on')) {
            _t.text(text[0]);
            _t.removeClass('on');
        } else {
            _t.text(text[1]);
            _t.addClass('on');
        }
    })
}


/**
 * 툴팁 show/hide
 * com-093.html
 */
commonJs.initTooltipBtn = function (showNode, hideNode) {
    $(document).off('.openTooltip').on('click.openTooltip', showNode, function (evt) {
        evt.preventDefault();
        var tooltip = $(this).closest('.tooltip');
        if (tooltip.hasClass('on')) {
            tooltip.removeClass('on');
            tooltip.find('.tooltipBtn').attr('aria-expanded', false);

            tooltip.trigger('tooltipClose');
        } else {
            tooltip.addClass('on');
            $(this).attr('aria-expanded', true);
        }
    })

    $(document).off('.closeTooltip').on('click.closeTooltip', hideNode, function () {
        var tooltip = $(this).closest('.tooltip');
        tooltip.removeClass('on');
        tooltip.find('.tooltipBtn').attr('aria-expanded', false);
        tooltip.trigger('tooltipClose');
    })

}

/**
 * 클릭시 on클래스 attach/detach
 */
commonJs.initOneBtnClass = function (node) {
    $(document).on('click', node, function () {
        $(this).addClass('on').siblings('button').removeClass('on');
    })
}

/**
 * 유료 멤버십 선물페이지 즉시전송/예약전송 show/hide 
 * MEM-507.html
 */
commonJs.initSendConRadio = function (node) {

    $('.viewArea').each(function () {
        if ($(this).closest('.sendCon').find('.radioCon .checkForm:eq(0) input').prop('checked')) {
            $(this).hide();
        }
        if ($(this).prev('.sendCon').find('.radioCon .checkForm:eq(0) input').prop('checked')) {
            $(this).hide();
        }
    })

    $(document).on('click', node, function () {
        var dataCon = $(this).closest('.sendCon').find('.viewArea');
        if (!dataCon.length) {
            dataCon = $(this).closest('.sendCon').next('.viewArea');
        }
        if ($(this).closest('.radioCon').find('.checkForm').index($(this).closest('.checkForm')) == 0) {
            dataCon.hide();
        } else {
            dataCon.show();
        }
    })
}

/**
 * 멤버쉽 페이지의 더보기버튼 적용.(애니메이션 없이 바로 show)
 * MEM-500.html
 */
commonJs.initNoneAnimMoreBtn = function (div, btn) {
    $(document).on('click', btn, function () {
        var _this = $(this);
        var container = _this.closest('.mbsJoinCon').find(div);
        if (_this.hasClass('on')) {
            container.removeClass('on');
            _this.attr('aria-expanded', false).removeClass('on');
            return;
        }
        container.addClass('on');
        _this.attr('aria-expanded', true).addClass('on');
    })
}

/**
 * 공통 FAQ페이지 ver1 카테고리셀렉트 선택시 각 카테고리div영역 show/hide
 * com-502-ver1.html
 */
commonJs.initFaqCategory = function (node) {
    var selecBox = node + ' select';
    var defaultTabPanel = $(node).nextAll('div[role=tabpanel]');
    var defaultSelected = $(selecBox).children('option:selected').index();
    defaultTabPanel.hide().eq(defaultSelected).show();

    $(document).on('change', selecBox, function () {
        var selectedName = $(this).children('option:selected').index();
        var tabPanel = $(node).nextAll('div[role=tabpanel]');
        var selectPanel = tabPanel.eq(selectedName);
        tabPanel.hide().eq(selectedName).show();

        var faqTab = selectPanel.find('.faqTab');
        if (faqTab.length) {
            var selectedFaqCon = selectPanel.children('.faqCon').eq(0);
            selectedFaqCon.show().siblings('.faqCon').hide();
            selectedFaqCon.find('.acc.faq>li .accTit').removeClass('on');
            faqTab.find('li a').attr('aria-selected', false).end().find('li:eq(0) a').attr('aria-selected', true);
        }
    })
}

/**
 * 약관동의 모션 스크립트 정의.
 * INT-066.html
 */
commonJs.initTermsArea = function (node) {

    //전체동의 체크폼. 
    $(document).on('change', node + ' .totalCheck input', function () {
        var _t = $(this);
        var ulAcc = _t.closest('.termsArea').find('ul.acc');
        var ulAccH = ulAcc.height();

        ulAcc.off().on('totalCheckClick', function () {
            ulAcc.css({
                'display': 'block',
                'overflow': 'hidden',
            })
            ulAcc.stop().animate({
                'height': ulAccH
            }, {
                'duration': 400,
                'ease': ANIMATION_EASING,
                'complete': function () {
                    ulAcc.removeAttr('style');
                }
            })
        })

        if (_t.prop('checked')) {
            _t.closest('.checkForm').siblings('button').attr('aria-expanded', false).show().end().siblings('a').hide();
            ulAcc.height('0px').hide();
        } else {
            _t.closest('.checkForm').siblings('button').hide().end().siblings('a').show();
            ulAcc.css({
                'display': 'block',
                'overflow': '',
                'height': ''
            })
        }
    })

    //전체동의 체크박스가 true인 상태에서 아코디언 버튼 선택시.
    $(document).on('click', node + ' .totalCheck button', function () {
        var termsArea = $(this).closest('.termsArea');
        $(this).siblings('a').show();
        $(this).attr('aria-expanded', true).hide();
        termsArea.find('ul.acc').trigger('totalCheckClick');

    })

    //필수약관 체크폼.
    $(document).on('change', node + ' .necessary .checkForm input', function () {
        var _t = $(this);
        var necessary = _t.closest('.necessary.on');
        if (_t.prop('checked') && necessary.length) {

            necessary.find('button').trigger('click');
        }
    })


}

/**
 * 화면 진입 후 5초동안 툴팁 show
 * !!commonjs.initTooltipBtn 함수 선정의 필수입니다!!
 * 
 * COM-800.html
 * 
 * param1 : 툴팁을 감싸고 있는 shareArea 앨리먼트
 * param2 : 툴팁 노출시간
 */
commonJs.initToastTooltip = function (el, duration) {
    el.each(function () {
        var itm = $(this);
        var delayTime = (duration == undefined) ? 5000 : duration;
        var tooltip = itm.find('.tooltip');
        var tooltipCont = tooltip.find('.tooltipCont');
        if (!tooltip.length) {
            return;
        }

        var closeTimer = setTimeout(function () {
            if (!tooltip.hasClass('on')) {
                return;
            }
            tooltipCont.animate({
                'opacity': 0.1
            },
                {
                    duration: 200,
                    complete: function () {
                        tooltipCont.find('.btnClose').trigger('click');
                        tooltipCont.css('opacity', 1);
                    }
                })
        }, delayTime);

        tooltip.on('tooltipClose', function () {
            clearTimeout(closeTimer);
        })

    })
}

/************************************************************************************************************************
 * 
 * 호출 스크립트
 * 
 ***********************************************************************************************************************/


/**
 * 레이어 팝업 show시 부모화면 스크롤 prevent
 */
commonJs.preventBodyScroll = function (callback) {
    $('body').css({
        'overflow-y': 'hidden',
        'position': 'fixed'
    })

    if (callback != undefined) {
        callback();
    }
}

/**
 * 레이어 팝업 hide시 부모화면 스크롤 allow
 */
commonJs.allowBodyScroll = function (callback) {
    $('body').css({
        'overflow-y': '',
        'position': ''
    })

    if (callback != undefined) {
        callback();
    }
}

/**
 * 사전예약상세 - 예약하기 버튼 선택시 수량선택 엘리먼트
 * gsf-011.html
 * 
 * 마크업상 '.btnFixed.prFixed' 요소에만 적용하면 됩니다.
 */
commonJs.initPriceNumArea = function (el) {
    el.each(function (idx, i) {
        var itm = $(i);
        var btn = itm.prev('.btnFixed').find('button.btnTP');
        var prTotal = itm.find('.prTotal');
        var ptH = prTotal.outerHeight();

        btn.off('click').on('click', function () {
            clickedIndex = btn.index($(this));
            $(this).closest('.btnFixed').hide();
            itm.show();
            act();
        })

        function act() {

            prTotal.css({
                'position': 'relative',
                'margin-bottom': -ptH
            })

            prTotal.stop().animate({
                'margin-bottom': 0
            }, {
                duration: 200,
                ease: ANIMATION_EASING,
                complete: function () {
                    prTotal.removeAttr('style');
                    prTotal.find('.minus').focus();
                }
            })
        }
    })
}

/** 
 * swiper getter
 * https://swiperjs.com/  참고
 * ex) commonJs.getSwiper($('.swipeArea'));
 */
commonJs.getSwiper = function (el) {
    return el.data('swiper');
}

/** 
 * 행사전단 - 행사전단지 몰아보기 버튼 선택
 * gsf-001.html 
 * */
commonJs.initEventFlyer = function (el) {
    var win = $(window);
    var body = $('body');
    el.each(function (idx, i) {
        var itm = $(i);
        var flyBtn = itm.find('.flyerMore');
        var flyView = itm.find('.flyerView');
        var btnH = flyBtn.outerHeight();
        var viewH = flyView.outerHeight();
        var dim = el.find('.dimmed');
        var open, option;
        var hasDim = dim.length ? true : false;

        viewH = flyView.css({
            'display': 'block',
            'visibility': 'hidden'
        }).outerHeight();

        flyView.removeAttr('style');

        flyBtn.off('click').on('click', function () {
            flyView.css('display', 'block');
            open = (itm.hasClass('open')) ? true : false;

            if (open) {
                //close
                option = btnH;

            } else {
                //open
                dim.show();
                itm.css('height', btnH);
                option = viewH + btnH;
            }

            itm.stop().animate({
                'height': option,
            }, {
                duration: 300,
                ease: ANIMATION_EASING,
                step: function () {
                    itm.css('overflow', '');
                },
                complete: function () {
                    if (!open) {
                        itm.addClass('open');
                        winSt = win.scrollTop();
                        if (hasDim) {
                            body.css({
                                width: '100%',
                                marginTop: -winSt
                            });
                            commonJs.preventBodyScroll();
                        }
                    } else {
                        dim.hide();
                        itm.removeAttr('style');
                        itm.removeClass('open');
                        body.css({
                            width: '',
                            marginTop: ''
                        });
                        if (hasDim) {
                            commonJs.allowBodyScroll(function () {
                                win.scrollTop(winSt);
                            });
                        }
                    }
                    flyView.css('display', '');
                    flyBtn.attr('aria-expanded', !open);
                }
            })
        });
    })
}

/**
 * swiper 적용
 * gsf-001.html 
 * uti-004.html
 * com-095.html
 * 
 * param1: 스와이퍼 객체 
 * param2: 옵션 object
 *  - rollingDelay(num) :자동롤링 간격 시간  (5초 디폴트 설정되어있음. 설정시 ms단위로 설정가능. ex: 4초인경우 4000 )
 *  - initialId: 초반에 보여줄 슬라이드의 id 
 * ex) commonJs.initSwiper($('.swipeArea'),{rollingDelay: 5000 , initialId: 123123});
 * 
*/
commonJs.initSwiper = function (el, params) {
    var params = params || {};
    el.each(function (idx, i) {
        var itm = $(i);
        var container = itm.find('.swipeCont');
        var btnAuto = itm.find('.btnCtrl.stop');
        var isAutoplay = false, isLoop = false;
        var visible = true;
        var view, allSlide = null;
        var _slidePerView = 1, _slidesPerGroup = 1, _centeredSlides = true;
        var groupItem = (itm.hasClass('itemSwipe')) ? true : false;
        var indicatorNum = itm.find('.num');
        var rollingDelay = (params.rollingDelay != undefined) ? params.rollingDelay : 5000;
        var swiperData = itm.data('swiper');

        //기존 스와이퍼 destory;
        if (swiperData != undefined) {
            swiperData.destroy();
        }

        //if display none 
        if (!container.is(':visible')) {
            visible = false;
            view = container.closest('.flyerView, .tabcon');
            view.css('display', 'block');
        }

        var wrapper = itm.find('.swiper');

        var slide = itm.find('.swiper> li');

        var margin = (slide.css('margin-right') != undefined) ? parseInt(slide.css('margin-right')) : 0;
        var speed = 400;
        var indicatorBtn = itm.find('.indicator>button');
        var swiperBtn = itm.find('.swipeBtn');

        var initIndex = 0;

        slide.each(function () {
            if ($(this).attr('id') == params.initialId && params.initialId) {
                initIndex = $(this).index();
            }
        })

        if (!swiperBtn.length) {
            swiperBtn = itm.find('.indicatorNum');
        }

        //gs25메인의 카테고리 스와이프일 경우 return.
        if (itm.closest('.categorySwipe').length) {
            return;
        }

        //3그룹 스와이프일 경우. (ex: gs25이벤트상세페이지 COM-518.html)
        if (groupItem) {
            _slidePerView = 3, _slidesPerGroup = 3;
            swiperBtn = itm.find('.indicatorNum');
        }

        //더미Li append.
        var dummySize = _slidesPerGroup - (slide.length % 3);
        if (groupItem && dummySize != 3) {
            for (var cnt = 0; cnt < dummySize; cnt++) {
                wrapper.append("<li></li>");
            }
            slide = itm.find('.swiper> li');
        }

        wrapper.addClass('swiper-wrapper');
        slide.addClass('swiper-slide');

        indicatorBtn.not(indicatorBtn.eq(0)).remove();
        var slideH = 0;
        slide.each(function (idx, i) {
            if (slideH < $(this).outerHeight()) {
                slideH = $(this).outerHeight();
            };
            if (idx == 0) return;
            indicatorBtn.eq(0).clone().text(idx + 1).attr('aria-selected', false).appendTo(itm.find('.indicator'));
        })

        if (!itm.closest('.prViewArea').length) {
            slide.css('height', slideH);
        }

        indicatorBtn = itm.find('.indicator>button');


        //if autoplay
        if (btnAuto.length) {
            isAutoplay = {
                delay: rollingDelay,
            };
            isLoop = true;
        }

        if (itm.closest('.main').length) {
            isLoop = true;
        }

        var swiper = new Swiper(container, {
            mode: 'horizontal',
            initialSlide: initIndex,
            speed: speed,
            spaceBetween: margin,
            autoplay: isAutoplay,
            runCallbacksOnInit: false,
            loop: isLoop,
            loopedSlides: 2,
            slidesPerGroup: _slidesPerGroup,
            slidesPerView: _slidePerView,
            lazy: {
                loadPrevNext: true
            },
            on: {
                init: function () {
                    if (!visible) {
                        view.removeAttr('style');
                    }

                    allSlide = itm.find('.swiper> li');

                    allSlide.attr('aria-hidden', true);
                    if (allSlide.length == 1) {
                        itm.find('.swipeBtn').hide();
                    }

                    slide.eq(this.realIndex).attr('aria-hidden', false);

                    //쿠폰상세 페이지일경우 바코드fix 스크립트 적용 
                    var barcodeFixed = slide.eq(this.realIndex).find('.cpBarcodeFixed');
                    if (barcodeFixed.length) {
                        commonJs.initBarcodeFix(barcodeFixed, this, this.getTranslate());
                    }

                    //indicator
                    indicatorBtn.off('click').on('click', function () {
                        var idx = indicatorBtn.index($(this));

                        if (isLoop) {
                            swiper.slideToLoop(idx, speed, false);
                            autoPlayState(false);
                        } else {
                            swiper.slideTo(idx, speed, false);
                        }
                    })

                    //next/prev button
                    swiperBtn.find('button').on('click', function () {

                        autoPlayState(false);
                        var bIdx = $(this).closest('.indicatorNum, .swipeBtn').find('button').index($(this));
                        if (bIdx == 0) {
                            swiper.slidePrev();
                        } else if (bIdx == 1) {
                            swiper.slideNext();
                        } else if (bIdx == 2) {
                            autoPlayState(false);
                        }
                    })

                    //button Autoplay stop/play
                    btnAuto.off('click').on('click', function () {
                        autoPlayState($(this).hasClass('play'));
                    })

                    if (slide.length == 1) {
                        indicatorBtn.hide();
                    }

                    if (indicatorNum.length) {
                        indicatorNum.html(getCurrentPage(0));
                    }

                },
                transitionStart: function () {
                    var realIdx = this.realIndex;
                    var idx = this.activeIndex;
                    var selectedSlide = itm.find('.swiper> li').eq(idx);

                    if (groupItem) {
                        selectedSlide = slide.slice(idx, idx + _slidePerView);
                    }

                    indicatorBtn.eq(realIdx).attr('aria-selected', true).siblings('button').attr('aria-selected', false);

                    wrapper.css({
                        'height': selectedSlide.outerHeight()
                    })
                    if (allSlide != null) {
                        allSlide.attr('aria-hidden', true);
                    }

                    selectedSlide.attr('aria-hidden', false);

                },
                transitionEnd: function () {
                    var idx = this.realIndex;
                    var selectedSlide = slide.eq(idx);

                    //쿠폰상세 페이지내에서 스와이프시 바코드fix 스크립트 적용 
                    var barcodeFixed = selectedSlide.find('.cpBarcodeFixed');
                    if (barcodeFixed.length) {
                        commonJs.initBarcodeFix(barcodeFixed, this, this.getTranslate());
                    }

                    if (indicatorNum.length) {
                        indicatorNum.html(getCurrentPage(idx));
                    }
                },
                touchStart: function () {
                    if (isLoop) {
                        autoPlayState(false);
                    }
                }
            }
        });

        function autoPlayState(state) {
            if (swiper == undefined) {
                return;
            }

            if (state) {
                //play상태 
                btnAuto.text('정지').removeClass('play').addClass('stop');
                swiper.autoplay.start();

            } else {
                //stop상태 
                btnAuto.text('재생').removeClass('stop').addClass('play');
                swiper.autoplay.stop();
            }
        }

        function getCurrentPage(_idx) {
            var tag = '<b>' + Math.ceil((_idx / _slidePerView) + 1) + '</b>/' + Math.ceil(slide.length / _slidePerView);
            return tag;
        }


        itm.data('swiper', swiper);
    })
}


/**
 * 와인25+ swiper 적용
 * gsm-000.html 
 * 
 * 
*/
commonJs.initSquareBoard = function (el, params) {
    var container = el.find('.swiper-container');

    container.each(function(i, elm){
        if($(elm).hasClass('filterContainer')){ /* filter View only */
            var $filterContainer = $(elm);

            //기존 스와이퍼 destory;
            var swiperData = $filterContainer.data('swiper');
            if (swiperData != undefined) {
                swiperData.destroy();
            }
            var swiper = new Swiper($filterContainer, {
                slidesPerView: 'auto',
                slidesPerColumn: 2,
                spaceBetween: 28,
                pagination: {
                    el: $filterContainer.find('.swiper-pagination').eq(0),
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<button type="button" class="' + className + '">' + (index + 1) + '</button>';
                    }
                },
                on: {
                    paginationUpdate: function() {
                        var bulletCount = this.pagination.bullets.length;
                        var $pageEl = this.pagination.$el;
                        if(bulletCount < 2){
                            $pageEl.css("display", "none");
                        }else {
                            $pageEl.css("display", "");
                        }
                    }
                }
            });
            $filterContainer.data('swiper', swiper);
            
            // 데이터 로드
            $filterContainer.one("loadData", function(e, param){
                var url = $(this).parent(".filterSection").attr("data-ajax-url");
                var category = param || $(this).parent(".filterSection").attr("data-current");
                console.log(category);
                $.ajax({
                    method: "GET",
                    url: url,
                    data: {"category":category},
                    dataType: "json"
                }).done(function (data) {
                    $filterContainer.trigger("draw", data.category[category]);
                });
            });

            $filterContainer.one("draw", function(e, data){
                var slideStr = '';
                $(data.items).each(function(i, el){
                    slideStr += '<li class="swiper-slide">';
                    slideStr +=    '<a href="'+(el.url || '#')+'" aria-selected="'+(el.current || 'false')+'">';
                    slideStr +=    '<span class="icon"><img src="'+(el.imageUrl)+'" alt="'+(el.alt || el.name || null)+'"></span>'+(el.name)+'</a>';
                    slideStr +=    '</li>';
                })
                $(this).find(".filter.swiper-wrapper").html(slideStr);
                commonJs.initSquareBoard($(this).parent());
            });

            // click event
            $filterContainer.find("a").on("click", function(e){
                $filterContainer.find("a").attr("aria-selected", false);
                $(this).attr("aria-selected", true);
            });

        }else{ /* square 2x2 View option*/
            var swiper = new Swiper(elm, {
                slidesPerView: 'auto',
                slidesPerColumn: 2,
                spaceBetween: 10,
            });
        }
    });
}


/**
 * 와인25+ GNB적용
 * GSM-000.html
 * 
 */
commonJs.initGnbWine = function (el, params) {
    if(!el.length) return;
    //$('html').css("scroll-behavior", "smooth");

    var $gnb = el.eq(0);
    var $home = $("#home").eq(0);
    var $category = $("#category").eq(0);
    var gapY = 114;
    var homeY = $home.offset().top - gapY;
    var cateY = $category.offset().top - gapY;

    $gnb.find("a").click(function(e){
        var target = String($(this).attr("href"));
        if(target.length > 1 && target.indexOf("#") == 0){
            e.preventDefault();
            if(target == "#category"){
                var category = $(this).attr("data-category");
                var current = $category.attr("data-current");
                if(category !== current){
                    $category.attr("data-current", category);
                    $category.find(".swiper-container").trigger("loadData", category);
                    $(window).trigger("scroll");
                }
            }
            $('html, body').animate({
                scrollTop: $(target).offset().top - gapY + 1
            }, 300, function () {
                //
            });
        }
    });

    $(window).on('scroll', function(e){
        var winScrollTop = $(e.target).scrollTop();
        if(winScrollTop >= cateY){
            var current = $category.attr("data-current");
            $gnb.find("a").removeClass("current").filter("[data-category="+current+"]").addClass("current");
        }else{
            $gnb.find("a").removeClass("current").filter("[href='#home']").addClass("current");
        }
    });
}

/**
 * 와인25+ 나의와이너리 그래프 적용
 * GSM-300.html
 * 
 */
commonJs.initGauge = function (el) {
    $(el).each(function(i, elm){
        var $elm = $(elm);
        var $graph = $elm.find(".graph");
        var total = $elm.data("total").toString() || "100";
        var current = $elm.data("current").toString() || "100";
        var percent = parseInt(current.split(",").join()) / parseInt(total.split(",").join()) * 100;
        var unit = $elm.data("unit").toString() || "";
        var knob = pureknob.createKnob(150, 150);

        // Set properties.
        knob.setProperty('angleStart', -0.80 * Math.PI);
        knob.setProperty('angleEnd', 0.80 * Math.PI);
        knob.setProperty('colorBG', '#e9e9e9');
        knob.setProperty('colorFG', '#f56275');
        knob.setProperty('trackWidth', 0.09);
        knob.setProperty('valMin', 0);
        knob.setProperty('valMax', 100);

        knob.setProperty('readonly', true);
        knob.setProperty('label', null);
        knob.setProperty('textScale', 0.00);
        // Set initial value.
        knob.setValue(percent);

        // Create element node.
        var node = knob.node();

        // Add it to the DOM.
        $graph.append(node);

        $elm.find(".current").text(current+unit);
        $elm.find(".total").text(total+unit);
    })
}

/**
 * 와인25+ 별점주기 적용
 * GSM-333.html
 * 
 */
commonJs.initScoring = function(el) {
    $(el).each(function(i, elm){
        var $elm = $(elm);
        var $stars = $elm.find('.stars > *');
        var $score = $elm.find('.score');
        var $input = $elm.find('input[type="hidden"]');
        var score = parseInt($elm.data("score").toString() || "0");
        
        scoring(score);

        $stars.each(function(i, el){
            $(this).on("click", function(e){
                scoring (i + 1);
                e.preventDefault();
            })
        })

        function scoring (score){
            $stars.each(function(i, el){
                if(i < score){
                    $(this).removeClass("empty half");
                }else{
                    $(this).removeClass("half").addClass("empty");
                }
            })
            $score.text(score);
            $input.val(score);
        }
    })
}

/**
 * 와인25+ 와인콜 상세 스와이퍼 적용
 * GSM-361.html
 * 
 */
commonJs.initBoxSwiper = function (el, params) {
    var container = el.find('.swiper-container');

    el.each(function(i, elm){
        var $slides = $(this).find(".swiper-slide");

        if($slides.length <= 1) {
            return;
        }else{
            $slides.each(function(){
                var $img = $(this).find("img").eq(0);
                if($img.width() < $img.height() - 10){
                    $(this).addClass("fixH");
                }
            })
        }

        var swiper = new Swiper(elm, {
            spaceBetween: 10,
            pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
        });
    });
}
/**
 * 와인25+ 와이너리 보관함 스와이퍼 적용
 * GSM-350.html
 *
 * 현재 작성중 2020-12-16
 */
commonJs.initWineStorage = function (el, params) {
    var storage = el;
    
    storage.each(function(i, elm){
        var $storage = $(elm);
        var $menu = $storage.find(".storageMenu");
        var $storageBlock = $storage.find(".storage");
        
        $menu.off('click').on('click', '.btn-basket', function(e){
            $menu.removeClass("delete").addClass("basket");
            $storageBlock.removeClass("delete").addClass("basket");
        }).on('click', '.btn-delete', function(e){
            $menu.removeClass("basket").addClass("delete");
            $storageBlock.removeClass("basket").addClass("delete");
        }).on('click', '.btn-cancel', function(e){
            $menu.removeClass("basket delete");
            $storageBlock.removeClass("basket delete");
            $storageBlock.find('input[type="checkbox"]').each(function(i, el){
                el.checked = false;
            });
        }).on('click', '.btn-select-all', function(e){
            var checkboxs = $storageBlock.find('input[type="checkbox"]');
            if(checkboxs.length == $storageBlock.find('input[type="checkbox"]:checked').length){
                checkboxs.each(function(i, el){
                    el.checked = false;
                });
            } else {
                checkboxs.each(function(i, el){
                    el.checked = true;
                });
            }
        }).on('click', '.btn-delete-submit', function(e){
            var checkedboxs = $storageBlock.find('input[type="checkbox"]:checked');
            var data;
            if(!checkedboxs.length){
                console.log("상품을 선택해 주세요");
                return;
            }else{
                data = checkedboxs.serialize();
                $swiperContainer.trigger("loadData", data);
            }
        });



        var $swiperContainer = $storage.find('.swiper-container').eq(0);

        //기존 스와이퍼 destory;
        var swiperData = $swiperContainer.data('swiper');
        if (swiperData != undefined) {
            swiperData.destroy();
        }
        var swiper = new Swiper($swiperContainer, {
            spaceBetween: 10,
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
        $swiperContainer.data('swiper', swiper);
        
        // 데이터 로드
        $swiperContainer.one("loadData", function(e, param){
            var url = $storage.attr("data-ajax-url");
            var data = param;
            
            $.ajax({
                method: "GET",
                url: url,
                data: data,
                dataType: "json"
            }).done(function (data) {
                $swiperContainer.trigger("draw", data.wineList);
            });
        });

        /* 9개 단위로 재 생성해야함 */
        $swiperContainer.one("draw", function(e, data){
            var slide;
            $swiperContainer.find(".swiper-wrapper .swiper-slide").remove();

            $(data.items).each(function(i, el){
                if(i%9 == 0){
                    slide = $('<div class="swiper-slide"><ul class="list"></ul></div>');
                    $swiperContainer.find(".swiper-wrapper").append(slide);
                    slide = slide.find(".list");
                }
                var itemStr = '';
                itemStr += '<li>';
                itemStr +=      '<div class="title">'+ el.name +'</div>';
                itemStr +=      '<div class="imgWrap"><img src="'+(el.imageUrl)+'" alt="'+(el.alt || el.name || null)+'"></div>';
                itemStr +=      '<span class="checkForm wine">';
                itemStr +=          '<input type="checkbox" name="'+ (el.checkboxName || el.checkboxId || 'wine_'+i) +'" id="'+ (el.checkboxId || el.checkboxName || 'wine_'+i) +'">';
                itemStr +=          '<label for="'+ (el.checkboxId || el.checkboxName || 'wine_'+i) +'">'+ el.name +'</label>';
                itemStr +=      '</span>';
                itemStr +=      '<button type="button" class="btnBasket" onclick="'+ (el.cartFn || null) +'">장바구니 담기</button>';
                itemStr += '</li>';
                slide.append(itemStr);
            });
            commonJs.initWineStorage($storage);
        });

        // 유리문 따라다니기
        var $glass = $storage.find(".glass");
        if($storage.hasClass("init")) {
            $(window).off('scroll.glass');
        }
        $(window).on('scroll.glass', function(){
            $glass.css('top', -1 * ($(window).scrollTop() - 184));
        });

        // init 표시
        $storage.addClass("init");

        // 비활성화 탭의 스와이퍼인 경우
        if(!$storage.is(':visible')){
            //var target = document.getElementById('tab-purchased');
            var $targetSwiper = $storage.find('.swiper-container').eq(0).data('swiper');
            var observer = new MutationObserver(function(mutations) {
                if($storage.is(':visible') && $targetSwiper){
                    $targetSwiper.update();
                };
            });
            var config = {
                attributes: true,
                childList: false,
                characterData: false,
                subtree: false,
                attributeOldValue: false,
                characterDataOldValue: false,
                attributeFilter: ["style"]
            };
            observer.observe($storage.get(0), config);    
        }

    });
}




/**
 * 공통 아코디언
 * 가이드 참조
 * com-096.html
 */
commonJs.initAccordion = function (el) {
    //acc
    el.each(function (idx, i) {

        var itm = $(i);
        var tit = itm.find('.accTit');
        var li = itm.children('li');

        //along type
        if (!li.length) {
            li = itm;
        }

        li.css({
            'overflow': 'hidden'
        })
        itm.find('.accCon').css({
            'visibility': 'visible'
        })

        //초기화시 aira-expanded 속성에 따라 accTit on클래스 삽입/삭제
        tit.find('button').each(function () {
            if ($(this).attr('aria-expanded') === "true") {
                $(this).closest('.accTit').addClass('on');
            } else {
                $(this).closest('.accTit').removeClass('on');
            }
        })

        // 조회기간선택 폼 열고 닫기
        var searchAreaClicked = function () {
            var t = $(this);

            var openLi = t.closest('li');
            var liTit = t.closest('.acc').find('.accTit');
            var isOpen = liTit.hasClass('on');
            var openedLi = li.find('.accTit.on').closest('li');
            var closeHeight = li.find('.accTit.on').outerHeight();

            //along type
            if (!openLi.length) {
                openLi = itm;
            }
            if (isOpen) {
                openedLi = openLi;
            }

            //opened list close
            openedLi.stop().animate({
                'height': closeHeight,
            }, {
                duration: 250,
                ease: ANIMATION_EASING,
                complete: function () {
                    openedLi.find('.accTit').removeClass('on');
                    openedLi.find('.accTit button').attr('aria-expanded', false);
                }
            })
        }
        itm.find('.accCon .searchArea .btnArea button').on('click', searchAreaClicked).on('hash_click', searchAreaClicked);

        tit.find('button').off('click').on('click', function () {
            var t = $(this);

            var openLi = t.parentsUntil(itm, 'li');
            var liTit = t.closest('.accTit');
            var isOpen = liTit.hasClass('on');
            var liCon = liTit.siblings('.accCon');
            var liHeight = liTit.outerHeight() + liCon.outerHeight();
            var openedLi = li.find('.accTit.on').closest('li');
            var closeHeight = li.find('.accTit.on').outerHeight();

            //along type
            if (!openLi.length) {
                openLi = itm;
            }

            if (isOpen) {
                openedLi = openLi;
            }

            //opened list close
            openedLi.stop().animate({
                'height': closeHeight,
            }, {
                duration: 250,
                ease: ANIMATION_EASING,
                complete: function () {
                    openedLi.find('.accTit').removeClass('on');
                    openedLi.find('.accTit button').attr('aria-expanded', false);
                }
            })

            if (isOpen) {
                return;
            }

            //open
            openLi.stop().animate({
                'height': liHeight
            }, {
                duration: 250,
                ease: ANIMATION_EASING,
                complete: function () {
                    liTit.addClass('on');
                    t.attr('aria-expanded', true);

                    openLi.css('height', '');
                }
            })

        })
    })
}



/**
 * 공통 액티브인풋
 * 가이드 참조
 */
commonJs.initActiveInput = function (el) {
    if (!el.length) {
        return;
    }

    el.find('label').css(cssScript.actionInput);
    el.each(function (idx, i) {
        var itm = $(i);
        var input = itm.find('input');
        var delBtn = itm.find('button.delete');
        var bTag = itm.find('b');

        itm.find('input').focus(function () {
            $(this).parent('.activeInput').addClass('action');
        });

        // input 삭제 클릭시
        delBtn.click(function () {
            event.stopPropagation();
            input.attr('value', '').val('');
            input.focus();
            itm.addClass("action");

            //자동완성input일 경우. (commonJs.initSearchBar)
            input.trigger('keyup');

            $(this).hide();
            bTag.css({
                'right': ''
            })
        });
        input.on('keyup', function () {
            if (!input.val().length) {
                delBtn.hide();
                bTag.css({
                    'right': ''
                })
                return;
            }

            if (input.val().length) {

                delBtn.show();
                bTag.css({
                    'right': '27px'
                })
            }
        })

        // input 빠져 나올시
        itm.find('input').focusout(function () {
            if ($(this).val().length < 1) {
                itm.removeClass("action");
            }
        });
    })
}


/**
 * 공통 토글탭
 * .tabScript 클래스가 붙어있어야만 스크립트 동작
 * 
 * com-312.html
 * gsf-009.html
 */
commonJs.initTabToggle = function (node, cont) {
    var el = $(node);
    var screenW = $(window).outerWidth() / 2;
    var type = ['tabcon', 'tabCont'];
    var MOTION_TABCON = 0;
    var MOTION_TABCONT = 1;

    el.each(function (idx, i) {
        var itm = $(i);

        if (!itm.length || !itm.nextAll('.' + cont).length) {
            return;
        }

        var contList = [];
        var tabList = [];
        var selected;
        var tab = itm.find('ul');
        var tabLi = itm.find('ul>li');
        var motion = -1;
        var btnType = 'button';

        //jessture 함수 적용. (터치이벤트)
        if (itm.hasClass('tabTog')) {
            commonJs.initTabTogJessture(itm);
            motion = MOTION_TABCON;
        }

        if (cont == type[1]) {
            motion = MOTION_TABCONT;
            tabLi.each(function () {
                tabList.push($(this).offset().left);
            })
        }

        itm.nextUntil(node).each(function () {
            if ($(this).hasClass(cont)) {
                contList.push($(this));
            }
        })

        itm.find('ul>li').each(function () {
            var _t = $(this);

            //btnType : a태그와 button태그 두가지. 
            if (!_t.find('button').length) {
                btnType = 'a';
            }

            //페이지 진입시 aria-selected속성이 true인 페이지 show
            if ($(this).find(btnType).attr('aria-selected') == 'true') {
                selected = $('#' + $(this).find(btnType).attr('aria-controls'));
            }
        })

        hide(contList);
        selected.show();

        tabLi.off('click').on('click', function (evt) {
            evt.preventDefault();

            var t = $(this);
            var idx = t.index();
            var cont = $('#' + t.find(btnType).attr('aria-controls'));

            if (motion == MOTION_TABCONT) {
                scrollLeftMotion(idx, tab, tabList[idx]);
            }

            if (motion == MOTION_TABCON) {
                $(this).find(btnType).trigger('tabtogClick');
                return;
            }

            t.siblings('li').find(btnType).attr('aria-selected', false);
            t.find(btnType).attr('aria-selected', true);

            hide(contList);
            cont.find('.acc.faq>li .accTit').removeClass('on');
            cont.show();
        })
        // commonJs.initTabTogJessture 함수에서 제스쳐 이벤트 시 show
        if (motion == MOTION_TABCON) {
            tabLi.find(btnType).on('tabtogJessture', function (e, triggeredLi) {

                hide(contList);

                try {
                    //공통 Contents개발
                    _gsrUtil.execPageFunc("tabToggleSwiper", e);
                } catch (err) {
                }

                $('#' + triggeredLi.attr('aria-controls')).show();
            })
        }
    })


    function hide(list) {
        for (i in list) {
            list[i].hide();
        }
    }

    function scrollLeftMotion(menuIdx, tab, offset) {
        var w = offset - screenW + tab.find('li>a:eq(' + menuIdx + ')').outerWidth() / 2;
        tab.stop().animate({
            scrollLeft: w
        }, {
            duration: 250,
            ease: ANIMATION_EASING,
        })
    }

}


/**
 * 검색창 검색어 입력시 검색키워드리스트 보이기
 */
commonJs.initSearchBar = function (el) {
    var autoCom = $('.autoCom');
    el.each(function (idx, i) {
        var itm = $(i);
        var input = itm.find('input');

        input.off('.searchInput').on('keyup.searchInput', function (evt) {
            if (!input.val().length) {
                autoCom.hide();
                commonJs.allowBodyScroll();
                return;
            }
            autoCom.show();
            commonJs.preventBodyScroll();
        })
    })
}

/**
 * 택배예약 step3 show/hide 컨테이너
 * com-063.html
 */
commonJs.initStepContainer = function (el) {

    el.each(function (idx, i) {
        var itm = $(i);
        var stepContainer = itm.find('.stepContainer');
        var oneButton = false;
        itm.find('.stepContainer').not(stepContainer.eq(0)).hide();

        stepContainer.on('click', '.btnPrss>button', function (evt) {
            var _this = $(this);

            var idx = _this.closest('.btnPrss').find('button').index(evt.target);

            if (_this.closest('.btnPrss').find('button').length == 1) {
                idx = 1;
            }
            var currentContainer = _this.closest('.stepContainer');
            if (idx == 0) {
                //prev

                //first container
                if (!currentContainer.prev('.stepContainer').length) {
                    return;
                }
                currentContainer.prev('.stepContainer').show();
            } else if (idx == 1) {
                //next

                //last container
                if (!currentContainer.next('.stepContainer').length) {
                    return;
                }
                currentContainer.next('.stepContainer').show();
            }
            currentContainer.hide();
        })
    })
}

/**
 * gsr 해시태그 스크롤픽스 (스크롤하여 컨텐츠 영역으로 도달할 시 필터영역 픽스)
 * commonJs.clickHash 함수 정의되어있어야 함. 
 * 
 * com-503.html
 */
commonJs.initScrollFix = function (el) {
    var screenW = $(window).outerWidth() / 2;

    el.each(function (idx, i) {
        var win = $(window);
        var itm = $(i);
        var hashTab = itm.find('.kwHashtag');
        var header = $('.header');
        var headerLength = (header.length) ? true : false;
        var fix = itm.offset().top;
        hashTab.removeAttr('style');
        var openH = hashTab.addClass('scroll').outerHeight();
        var hashOffset = [];
        hashTab.find('li').each(function () {
            hashOffset.push($(this).offset().left);
        })

        var hash = hashTab.find('li>span,a');
        //a태그, span태그 구분
        var hashType = (hash.prop('tagName') == 'A') ? 'li>a[aria-selected=true]' : 'li>span input[checked]';

        var fixH = hashTab.removeClass('scroll').outerHeight();
        hashTab.css(cssScript.scrollFix);
        itm.css(cssScript.scrollFix);

        var menuState = 0;
        var lastSt = 0;
        var selectedHash = (hash.prop('tagName') == 'A') ? hashTab.find(hashType) : hashTab.find(hashType).closest('span');
        var menuIdx = (hash.index(selectedHash) == -1) ? 0 : hash.index(selectedHash);
        var scrollfixClass = 'scrollFixed';

        //탭 영역에 포함 될 시 
        if (itm.closest('.tabCont').length) {
            scrollfixClass = 'scrollFixed02';
        }

        hash.on('gsrHash', function () {
            menuState = hash.index(hashTab.find(hashType));
        })

        win.on('scroll.scrollFixed', function () {
            var st = $(this).scrollTop();
            if (fix <= win.scrollTop()) {
                //fix
                hashTab.addClass('scroll').css('height', openH);
                itm.addClass(scrollfixClass).css('height', openH);
                //네이티브의 경우 scroll 클래스 header영역의 top값 제거. 
                if (!headerLength) {
                    hashTab.css({
                        'top': '0px'
                    })
                }

                if (menuIdx != menuState) {

                    if (lastSt > st || st == lastSt) {
                        return;
                    }
                    selectedHash = hashTab.find(hashType);
                    menuIdx = hash.index(selectedHash);
                    commonJs.clickHash(menuIdx, false, hashOffset[menuIdx], hashTab, screenW);
                    menuState = menuIdx;
                } else {

                    if (hashTab.scrollLeft() == 0 && menuState != 0) {
                        commonJs.clickHash(menuState, false, hashOffset[menuState], hashTab, screenW);
                    }
                }
            } else {
                //top
                itm.removeClass(scrollfixClass).css('height', fixH);
                hashTab.removeClass('scroll').css('height', fixH);
            }

            lastSt = st;
        })
    })
}

/**
 * 해시태그 클릭 모션 선정의 
 * commonJs.clickHash 함수 정의되어있어야 함. 
 * COM-503.html
 * GSF-041.html
 */
commonJs.initHashMotion = function (el) {
    var screenW = $(window).outerWidth() / 2;

    el.find('ul').each(function (idx, i) {
        var hashTab = $(i);
        var hashOffset = [];
        var hasScroll = true;
        var hash = (hashTab.find('li a,span').eq(0).prop('tagName') == 'A') ? hashTab.find('li a') : hashTab.find('span');

        if (!hashTab.hasClass('scroll')) {
            hasScroll = false;
        }

        hashTab.addClass('scroll');
        if (!hashTab.closest('.layDrawer').is(':visible')) {
            hashTab.closest('.layDrawer').css({
                'display': 'block',
                'visibility': 'hidden'
            })
        }

        hashTab.children('li,span').each(function () {
            hashOffset.push($(this).offset().left);
        })

        hashTab.closest('.layDrawer').css({
            'display': '',
            'visibility': ''
        })

        if (!hasScroll) {
            hashTab.removeClass('scroll');
        }
        /**
         * 해시태그 li의 a태그들이
         * commonJs.initOneBtnSelect함수의 인자로 먼저 선언되어잇어야 함. (트리거)
         */
        hash.on('gsrHash', function (evt) {

            if (!hashTab.hasClass('scroll')) {
                return;
            }

            var idx = hash.index($(this));
            commonJs.clickHash(idx, true, hashOffset[idx], hashTab, screenW);
        })

    });
}

/**
 * 해시태그 클릭 모션
 * COM-503.html
 * GSF-041.html
 * 
 * menuIdx  클릭된 메뉴 인덱스
 * type     : true = 클릭이벤트 , false = 스크롤시 이벤트
 * offset   : 필터영역내 필터엘리먼트의 left offset
 * tab      : 필터영역 엘리먼트  
 * screenW  : 기기 가로사이즈 /2
 */
commonJs.clickHash = function (menuIdx, type, offset, tab, screenW) {

    var w = offset - screenW + tab.find('li>a:eq(' + menuIdx + ')').outerWidth() / 2;
    if (!type) {
        tab.scrollLeft(w - 500);
    }
    tab.stop().animate({
        scrollLeft: w
    }, {
        duration: 250,
        ease: ANIMATION_EASING,
    })
}


/**
 * 당겨서 새로고침 모션
 * https://github.com/BoxFactura/pulltorefresh.js/blob/master/README.md
 * 
 * GSF-006.html
 * GSF-009.html 
 * 
 * node     : pull영역의 엘리먼트
 */
commonJs.initPTR = function (node) {
    var el = $(node);
    if (!el.length) {
        return;
    }

    if (ptrInstance != undefined) {
        PullToRefresh.destroyAll();
    }

    var refreshH = el.outerHeight();

    ptrInstance = PullToRefresh.init({
        mainElement: node,
        onInit: function () {
        },
        onRefresh: function () {
            //pull시 이벤트
            try {
                _gsrUtil.execPageFunc("refresh");
            } catch (err) {
            }

        },
        distMax: refreshH,                            //pull 최대높이
        distThreshold: refreshH - 2,                      //callback함수가 요구되는 최소높이
        distReload: refreshH,                         // pull 후 다시 돌아가게되는 높이
        iconArrow: ' ',
        iconRefreshing: ' ',
        instructionsPullToRefresh: ' ',
        instructionsReleaseToRefresh: ' ',
        instructionsRefreshing: ' ',
    });

    el.css({
        'height': '0'
    })
}


/**
 * 자동 리사이즈 텍스트 에어리어. 
 * 최대 4줄까지 출력. 그 이상은 스크롤바 생김. 
 */
commonJs.initAutoResizeArea = function (el) {
    el.each(function () {
        var offset = this.offsetHeight - this.clientHeight;
        var maxlength = (this.scrollHeight + offset) * 4;
        $(this).on('keyup', function () {

            if (maxlength <= this.scrollHeight + offset) {
                return;
            }

            $(this).css('height', 'auto').css('height', this.scrollHeight + offset);
        })
    })
}


/**
 * 제스쳐 및 탭 클릭시 탭모션 적용 
 * guide.html 탭내용
 */
commonJs.initTabTogJessture = function (el) {

    el.each(function (idx, i) {

        var jess = new Jessture($(this));
        var itm = $(i);
        var isDisplayNone = false;

        if (!itm.is(':visible')) {
            isDisplayNone = true;
            itm.closest('.tabcon').css({
                'display': 'block',
                'visibility': 'hidden'
            });
        }

        var li = itm.find('ul>li');
        var liLength = li.length;
        var liWidth = li.outerWidth();
        var index = li.find('a').index(li.find('a[aria-selected = true]'));
        var TAG = '<span class="tabSelect" role="none" style="width:135px;"></span>';
        itm.append(TAG);

        var tabSelect = itm.find('.tabSelect');
        var cssLeft = parseInt(tabSelect.css('left'));


        if (isDisplayNone) {
            itm.closest('.tabcon').css({
                'display': '',
                'visibility': ''
            });
        }

        tabSelect.css({
            'left': cssLeft + liWidth * index,
            'width': liWidth
        })

        li.find('a').on('tabtogClick', function () {
            index = li.find('a').index($(this));
            togMotionTo(index);
        })

        //swipe right
        jess.on('jsRight', function () {
            if (index >= liLength - 1) {
                return;
            }
            index++;
            togMotionTo(index);
        })

        //swipe left
        jess.on('jsLeft', function () {
            if (index <= 0) {
                return;
            }
            index--;
            togMotionTo(index);
        })

        function togMotionTo(motionIdx) {

            tabSelect.css({
                'left': cssLeft + liWidth * motionIdx,
                'transition': 'left 0.3s'
            })
            li.find('a').attr('aria-selected', false);
            var triggerLi = li.eq(index).find('a');
            triggerLi.attr('aria-selected', true);

            triggerLi.trigger('tabtogJessture', [triggerLi]);
        }

    })

    //제스쳐 이벤트 클래스
    function Jessture(target) {
        var startX = 0;
        var startY = 0;
        var _this = $(this);
        var UP = this.UP = 'jsUp';
        var DOWN = this.DOWN = 'jsDown';
        var RIGHT = this.RIGHT = 'jsRight';
        var LEFT = this.LEFT = 'jsLeft';

        target.on('touchstart , mousedown', function (e) {
            if (e.type == 'mousedown') {
                // input 필드 체크
                if ($(e.target).filter('input').length == 0) {
                    e.preventDefault();
                }
                startX = e.pageX;
                startY = e.pageY;
            } else {
                startX = e.originalEvent.touches[0].pageX;
                startY = e.originalEvent.touches[0].pageY;
            }
        });

        target.on('touchmove , mousemove', function (e) {
            var endX = 0;
            var endY = 0;
            // e.preventDefault();
            if (e.type != 'mousemove') { }
        });
        target.on('touchend , mouseup', function (e) {
            var endX = 0;
            var endY = 0;
            if (e.type == 'mouseup') {
                //if(!e.originalEvent.touches){
                endX = Number(e.pageX);
                endY = Number(e.pageY);
                e.preventDefault();
            } else {
                endX = Number(e.originalEvent.changedTouches[0].pageX);
                endY = Number(e.originalEvent.changedTouches[0].pageY);
            }
            var disX = Math.abs((startX * startX) - (endX * endX));
            var disY = Math.abs((startY * startY) - (endY * endY));

            if (disX > disY) {
                if (Math.abs(startX - endX) > 70) {
                    if (startX < endX) {
                        _this.trigger(RIGHT);
                    } else {
                        _this.trigger(LEFT);
                    }
                }
            }
            startX = 0;
            startY = 0;
        });

        this.on = function (evt, func) {
            _this.on(evt, func);
        };
    }
}

/**
 * 쿠폰함 바코드영역 상단에 닿을시 fixed.
 * com-102.html
 * com-103.html
 * com-107.html
 * com-095.html
 * 
 * param1: 바코드 엘리먼트 
 * param2: 스와이퍼 객체
 * param3: 스와이퍼의 translate 값. 
 */
commonJs.initBarcodeFix = function (el, swiper, translate) {
    var win = $(window);
    el.each(function () {

        var itm = $(this);
        var h = itm.offset().top - $('.fullPop h1').outerHeight();
        var barcode = itm.find('.cpBarcode');
        var eventAttached = true;

        win.off('.barcode').on('scroll.barcode', function () {
            var st = win.scrollTop();

            if (st >= h) {

                if (swiper.animating) {
                    return;
                }
                barcode.addClass('fixedTop');

                itm.css({
                    'height': barcode.outerHeight()
                })

                $('.swiper-wrapper').css({
                    'transform': ''
                })

                itm.closest('.swiper-wrapper').css({
                    'position': 'relative',
                    'left': translate
                })


                if (eventAttached) {
                    swiper.detachEvents();
                    eventAttached = false;
                }

            } else if (st < h) {
                if (swiper.animating) {
                    return;
                }

                barcode.removeClass('fixedTop');
                swiper.setTranslate(translate);

                itm.css({
                    'height': ''
                })

                itm.closest('.swiper-wrapper').css({
                    'position': '',
                    'left': ''
                })

                if (!eventAttached) {
                    swiper.attachEvents();
                    eventAttached = true;
                }

            }
        })

    })
}

/**
 * 스탬프 적립내역
 * COM-518.html
 */
commonJs.initStampBoard = function (el) {
    el.each(function () {
        var itm = $(this);

        var stampList = itm.find('.stampList');
        var btn = itm.children('button');
        var expanded = (stampList.hasClass('on')) ? true : false;

        var expandedH = stampList.outerHeight() -
            (parseInt(stampList.css('padding-bottom')) + parseInt(stampList.css('padding-top')));
        var h = stampList.children('li').outerHeight(true) * 2;

        if (!expanded) {
            stampList.css({
                'height': h,
                'transition': 'height 0.4s'
            })
        }

        btn.on('click', function () {
            var _btn = $(this);
            var _expanded = (_btn.hasClass('on')) ? true : false;

            if (_expanded) {
                stampList.css('height', h);
                _btn.removeClass('on').attr('aria-expanded', false);
            } else {
                stampList.css('height', expandedH);
                _btn.addClass('on').attr('aria-expanded', true);
            }
        })
    })
}

/**
 * 이벤트 룰렛클래스 init
 * COM-546.html
 * 
 * param1 : 룰렛클래스
 * param2 : 경품갯수(4, 6, 8)
 */
commonJs.initEvtRoulette = function (el, givenum) {
    el.each(function () {
        var itm = $(this);
        rouletteSection = new RouletteSection(itm, givenum);
    })
}

/**
 * 이벤트 룰렛클래스
 */
function RouletteSection(contents, givenum) {
    var _this = this;
    var roulette = contents.find('.rotate');
    var speed = 1800;
    var flagBlock = false;
    var completeD = null;
    var degree = 0;
    var wheelInterval = null;
    
    //경품갯수 따른 각도 (각 4, 6, 8)
    var completeD4 = [2160, 2520, 2340, 2250];
    var completeD6 = [2160, 2460, 2400, 2340, 2280, 2220];
    var completeD8 = [2160, 2475, 2430, 2385, 2340, 2295, 2250, 2205];
    
    if (givenum === 4) {
        completeD = completeD4;
    } else if (givenum === 6) {
        completeD = completeD6;
    } else if (givenum === 8) {
        completeD = completeD8;
    }

    var diffD = 0;
    try{
    	diffD = (360 / givenum) / 2;
    }catch (e) {
		// TODO: handle exception
	}
    var publicFunction = {
        startRoulette: _this.startRoulette = function (num, callback) {
            flagBlock = true;
            roulette.rotate({
                angle: 0,
                animateTo: num < 0 ? 0 : (completeD[num] - diffD),
                center: ["50%", "50%"],
                easing: $.easing.esing,
                callback: function () {
                    flagBlock = false;
                    if(callback != null && typeof callback == 'function'){
                    	callback();
                    }
                },
                duration: num < 0 ? 0 : speed
            });
        },
        wheelRoulette : _this.wheelRoulette = {
        	wheelSet : function(){
        		roulette.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        		roulette.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});        		
        	},
        	start : function(){	
        		degree = 0;
        		try{
        			if(!isNull(wheelInterval)){
        				rouletteSection.wheelRoulette.stop();
        			}
        		}catch (e) {
					// TODO: handle exception
				}
                wheelInterval = setInterval(function() {
                	if(roulette == null || $('#startRouletteEvent')[0] == null){
                		clearInterval(wheelInterval);
                	}else{
                        degree = degree + 100;
                        rouletteSection.wheelRoulette.wheelSet();
                	}
                 },5);
        	},
        	stop : function(){
        		clearInterval(wheelInterval);
        	}
        },
        isRun: _this.isRun = function () {
            return flagBlock;
        }
    }
}

/**
 * 룰렛모션 start
 * param1: 당첨경품 지정. (0 ~ 경품갯수-1)
 */
commonJs.startRoulette = function (num) {
    if (rouletteSection.isRun()) {
        return;
    }
    rouletteSection.startRoulette(num);
}

/**
 * a/button 선택시 해당 data-path 속성값이 id인요소 show 
 * gs2-085.html (상품정보 예약주문하기 버튼)
 */
commonJs.initDataPathBtn = function (el) {
    var screenH = $(window).height();
    el.each(function () {
        var itm = $(this);

        var dPath = itm.attr('data-path');

        if (dPath === undefined) {
            return;
        }

        itm.off('click').on('click', function () {
            var div = $('#' + dPath);
            var preventBodyScroll = false;

            div.show();

            if ($(this).closest('.priceHistory').length) {
                preventBodyScroll = true;
                commonJs.preventBodyScroll();
            }
            var drwCon = div.find('.drwCon');
            var drwConH = drwCon.height();
            var resultH = screenH - div.find('.drwTit').height() - 15;

            drwCon.css({
                'max-height': resultH
            })
            if (!div.find('a.inLayer').length) {
                div.prepend('<a href="#" role="text" class="inLayer">레이어팝업 시작</a>');
            }
            div.find('a.inLayer').focus();

            div.find('.close').off('click').on('click', function () {
                div.hide();
                itm.focus();
                commonJs.allowBodyScroll();
            })
        })
    })
}

/**
 * 날짜선택 버튼
 * GS2-095.html
 */
commonJs.initDayPicker = function (el) {
    el.each(function () {
        var itm = $(this);
        var offsetL = [];
        var btnList = itm.find('li button');
        var screenW = $(window).width();
        itm.find('li').each(function () {
            offsetL.push($(this).offset().left);
        })

        btnList.on('click', function () {
            btnList.attr('aria-selected', false);
            $(this).attr('aria-selected', true);
            itm.stop().animate({
                scrollLeft: offsetL[btnList.index($(this))] - screenW / 2
            }, {
                duration: 250,
                ease: ANIMATION_EASING,
            })
        })
    })
}

/**
 * 탭토글 버튼 선택시 트랜지션 애니메이션 작동.
 * GS2-101.html
 */
commonJs.initTabTogMotion = function (el) {
    el.each(function () {
        var itm = $(this);
        if (itm.hasClass('tabScript')) {
            return;
        }
        commonJs.initTabTogJessture(itm);
        itm.find('li>a').on('click', function () {
            $(this).trigger('tabtogClick');
        })
    })
}

/**
 * 유료멤버십페이지 할인권 아코디언 모션 스크립트.
 * MEM-512.html
 */
commonJs.initDepthAcc = function (el) {
    el.each(function () {
        var itm = $(this);
        var info = itm.find('.mbsInfo .depth,.other');
        var sec = 70;

        itm.find('.mbsTit').off('click').on('click', function (evt) {
            evt.preventDefault();
            var isOpened = false;
            if ($(this).attr('aria-expanded') == 'true') {
                isOpened = true;
                $(this).attr('aria-expanded', false);
            } else {
                $(this).attr('aria-expanded', true);
            }

            info.each(function (idx, infoEl) {
                var iEl = $(infoEl);

                setTimeout(function () {
                    iEl.css({
                        'display': 'block',
                        'overflow': 'hidden',
                    })
                    var defaultH = 0;
                    var h = iEl.height();
                    if (isOpened) {
                        defaultH = h;
                        h = 0;
                    }
                    iEl.css({
                        'height': defaultH
                    })

                    $(infoEl).stop().animate({
                        height: h
                    }, {
                        ease: ANIMATION_EASING,
                        duration: sec,
                        complete: function () {
                            iEl.removeAttr('style');
                            (isOpened) ? iEl.hide() : iEl.show();
                        }
                    })

                }, idx * sec);
            })
        })
    })
}

/**
 * 나만의혜택 이벤트참여페이지 이전혜택조회 도넛차트 스크립트.
 * GS2-143.html
 * api document url : https://github.com/rendro/easy-pie-chart
 * 
 * param1: 그래프 엘리먼트
 * 
 * 그래프 태그의 data-percent 속성에 퍼센티지 적용 후 해당 init함수 실행.
 * 
 * 사용자의 스크롤을 감지하여 해당영역이 노출될 시 작동해야하기때문에
 * commonJs.initScrollDetect , commonJs.updateDoughnutChart 함수와 함께 쓰입니다. 
 * 
 */
commonJs.initDoughnutChart = function (parentNode, node) {
    var el = $(parentNode + ' ' + node);
    el.each(function () {
        var itm = $(this);
        var v_rotate = 0;
        var lineCap = 'butt';
        var isDisabled = false;
        if (itm.attr('data-percent') === undefined || itm.attr('data-percent') == 0) {
            lineCap = 'butt';  //percentage속성이 없거나 0일때 회색부분만 보여야하기 때문에 butt타입 지정. 
            isDisabled = true;
        }

        //차트디자인의 흰 점 
        // var spot = itm.find('.spot');
        // spot.css({
        //     'transform' : 'rotate('+0+'deg)',
        //     'transition' : 'transform .5s ease-in-out'
        // })
        // if(isDisabled){
        //     spot.hide();
        // }

        // name: 그래프요소를 감싸는 부모 클래스
        // color : 그래프 컬러코드  

        var colorList = [
            {
                'name': 'targetGraph',
                'color': '#007cff',
                'trackColor': '#dddddd',
                'shadow': false
            },
            {
                'name': 'bnfGraph',
                'color': '#007cff',
                'trackColor': '#f2f2f2',
                'shadow': false

            }]

        var colorCode = colorList.filter(function (color) {
            return color.name == parentNode.substring(1, 100);
        })

        //차트 init 
        itm.easyPieChart({
            barColor: colorCode[0].color,            //차트가 그려질 색
            trackColor: colorCode[0].trackColor,          //차트가 그려지는 트랙의 기본 배경색
            scaleColor: '#fff',             //차트 테두리 선
            lineCap: lineCap,               //차트 선모양 
            lineWidth: 9,                  //선 두께
            scaleLength: 5,
            size: itm.width(),              //차트크기
            animate: 500,                   //애니메이션 시간 
            rotate: v_rotate,                    //시작하는 각도
            shadow: colorCode[0].shadow,
            onStart: function (from, to) {
                // var deg = to*3.6;
                // if(!to){
                //     return;
                // }
                // spot.css({
                //     'transform' : 'rotate('+deg+'deg)'
                // })
            },
            onStop: function () {
            },
            easing: ANIMATION_EASING,
        });

        itm.on('scroll-detected', function () {
            commonJs.updateDoughnutChart(itm, itm.attr('data-percent'));
        })

    })
}

/**
 * 도넛차트 퍼센티지 업데이트 스크립트.
 * 
 * commonJs.initDoughnutChart 함수가 선정의되어야 동작합니다.
 * 
 * param1: 그래프 엘리먼트
 * param2: 업데이트 할 percentage
 */
commonJs.updateDoughnutChart = function (el, per) {
    el.data('easyPieChart').disableAnimation().update(0);
    el.data('easyPieChart').enableAnimation().update(per);
}

/**
 * 스크롤영역 감지 스크립트. 
 * commonJs.initDoughnutChart 함수가 선정의되어야 동작합니다.
 * 
 * param1: 스크롤 감지할 엘리먼트요소. 
 */
commonJs.initScrollDetect = function (el) {
    var win = $(window);
    var screenH = win.height();
    win.off('.detect');
    el.each(function () {
        var itm = $(this);
        var offsetTop = itm.offset().top;

        win.on('scroll.detect', function () {
            var st = win.scrollTop();
            if (st + screenH > offsetTop) {

                //도넛차트 영역에 스크롤 될 경우 도넛차트 init 및 실행.  
                if (itm.data('easyPieChart').options.updated === undefined && itm.hasClass('grp')) {
                    itm.data('easyPieChart').options.updated = true;
                    itm.trigger('scroll-detected');
                }
            }
        })
    })
}

/**
 * 메인페이지 메인탭의 메뉴가 lalavla인 경우 scrollLeft변경 변경. 
 * INT-035.html
 */
commonJs.initMainTab = function (el) {
    var orgArr = el.find('ul>li').get();

    el.find('ul>li a').each(function () {
        if ($(this).attr('aria-selected') == 'true') {
            if ($(this).find('span').text() == 'lalavla') {
                el.find('ul').scrollLeft(1000);
                return;
            }
        }
    })
}

/**
 * gs25 메인페이지 디자인스크롤 적용.
 * INT-038.html
 */
commonJs.initDesignScroll = function (el) {
    var lastTouchX = 0;
    var screenW = $(window).width();
    el.each(function () {
        var itm = $(this);
        var scrollUl = itm.find('ul');
        var ulWidth = scrollUl.prop('scrollWidth');
        var scrollThumb = itm.find('.scroll-thumb');
        var scrollThumbW = scrollThumb.width();
        var scrollbarW = screenW - ((ulWidth - screenW) / ulWidth * screenW) - scrollThumbW;
        var maxScrollbarScr = screenW - scrollThumbW;
        var maxScrollLeft = ulWidth - screenW;

        function attageDesignScrollListener() {
            scrollUl.off('.designScroll').on('scroll.designScroll', function (evt) {
                var sl = $(this).scrollLeft();
                var thumbScrLeft = (sl / ulWidth * screenW) + sl / (ulWidth - screenW) * scrollbarW;
                if (sl < 0) {
                    scrollThumb.css('margin-left', 0);
                    return;
                }
                if (sl > maxScrollLeft) {
                    scrollThumb.css('margin-left', maxScrollbarScr);
                    return;
                }
                scrollThumb.css({
                    'margin-left': thumbScrLeft
                })
            })
        }
        attageDesignScrollListener();

        scrollThumb.on('touchmove', function (evt) {
            scrollUl.off('.designScroll');
            evt.preventDefault();
            var touchX = evt.originalEvent.targetTouches[0].clientX - (scrollThumbW / 2);
            if (touchX < 0) {
                touchX = 0;
            }
            if (touchX >= screenW - scrollThumbW) {
                touchX = screenW - scrollThumbW;
            }
            var touchSl = touchX / (screenW - scrollThumbW) * (ulWidth - screenW);
            scrollUl.scrollLeft(touchSl);

            if (lastTouchX == touchX) {
                return false;
            }
            lastTouchX = touchX;

            $(this).css({
                'margin-left': touchX
            })

        }).on('touchend', function () {
            attageDesignScrollListener();
        })

    })

}

/**
 * gs25 카테고리 스와이프 및 스크롤탭 적용.
 * INT-038.html
 */
commonJs.initCategorySwipe = function (el) {
    var speed = 300;

    el.each(function () {
        var itm = $(this);
        var ctgUl = itm.find('.category ul');
        var translate = 0;
        var realCtg = 0,
            lastCtg = 0;
        var initFinished = false;
        var ctgLength = 0;

        var contContainer = itm.find('.swipeCont').addClass('cont-swiper-container');
        contContainer.find('ul').addClass('cont-swiper-wrapper');
        contContainer.find('li').addClass('cont-swiper-slide');

        var contSwiperData = contContainer.data('swiper');
        var categorySwiperData = itm.find('.category').data('swiper');
        
        //기존 스와이퍼 destory;
        if (contSwiperData != undefined) {
            contSwiperData.destroy();
            ctgUl.find('.duplicate').remove();
            itm.find('.indicator>button.duplicate').remove();
        }
        if(categorySwiperData != undefined){
            categorySwiperData.destroy();
        }
        var ctgOrg = ctgUl.find('li');
        var first = ctgOrg.clone().addClass('duplicate').prependTo(ctgUl);
        ctgOrg.clone().addClass('duplicate').appendTo(ctgUl);
        var ctgCnt = Number(first.length);
        
        first.each(function () {
            translate += ($(this).outerWidth(true));
        })

        var indicatorBtn = itm.find('.indicator>button');
        itm.find('.indicator>button:not(:eq(0))').remove();

        var categoryObj = {};

        contContainer.find('li').each(function (idx, i) {
            var ctgNum = $(this).attr('data-category');
            var obj = {};
            obj.start = (categoryObj[ctgNum] != undefined) ? categoryObj[ctgNum].start : idx;
            obj.length = (categoryObj[ctgNum] != undefined) ? categoryObj[ctgNum].length + 1 : 1;
            categoryObj[ctgNum] = obj;

            if (idx == 0) return;
            indicatorBtn.eq(0).clone().text(idx + 1).attr('aria-selected', false).addClass('duplicate').appendTo(itm.find('.indicator'));
        })
        indicatorBtn = itm.find('.indicator>button');

        var contSwiper = new Swiper(contContainer, {
            loop: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            direction: 'horizontal',
            containerModifierClass: 'cont-swiper-container',
            wrapperClass: 'cont-swiper-wrapper',
            slideClass: 'cont-swiper-slide',
            touchRatio: 0.1,
            lazy: {
                loadPrevNext: true
            },
            on: {
                init: function () {
                    initFinished = true;
                    //indicator
                    indicatorBtn.off('click').on('click', function () {
                        var idx = indicatorBtn.index($(this));
                        contSwiper.slideToLoop(idx, speed, false);
                    })
                },
                transitionStart: function () {
                    var categoryNum = this.slides[this.activeIndex].getAttribute('data-category');
                    var visibleBtn = indicatorBtn.slice(categoryObj[categoryNum].start, (categoryObj[categoryNum].length + categoryObj[categoryNum].start)).show();
                    indicatorBtn.not(visibleBtn).hide();
                    indicatorBtn.eq(this.realIndex).attr('aria-selected', true).siblings('button').attr('aria-selected', false);

                },
                slideChangeTransitionStart: function () {
                    if (!initFinished) {
                        return;
                    }

                },
                slideChangeTransitionEnd: function () {
                    this.allowTouchMove = true;
                    if (!initFinished) {
                        return;
                    }
                },
                slideNextTransitionStart: function () {
                    if (!initFinished) {
                        return;
                    }

                    lastCtg = realCtg;
                    realCtg = Number(this.slides[this.activeIndex].getAttribute('data-category'));

                    if (lastCtg != realCtg) {
                        this.allowTouchMove = false;
                        if (realCtg > lastCtg) {
                            
                            tabOffset = realCtg - lastCtg;
                        } else {
                            tabOffset = (ctgCnt - lastCtg) + realCtg;
                        }
                        moveTo = categorySwiper.activeIndex + tabOffset;

                        if (categorySwiper.activeIndex >= ctgLength - (ctgCnt + 1)) {
                            //클릭 인덱스가 스와이프의 끝부분일때
                            categorySwiper.setTranslate(categorySwiper.getTranslate() + translate);
                            moveTo = categorySwiper.activeIndex - first.length + 1;
                        }
                        setTimeout(function () {
                            categorySwiper.slideTo(moveTo, 190, false);
                        }, 100)
                    }
                },
                slidePrevTransitionStart: function () {
                    if (!initFinished) {
                        return;
                    }
                    lastCtg = realCtg;
                    realCtg = Number(this.slides[this.activeIndex].getAttribute('data-category'));
                    if (lastCtg != realCtg) {
                        this.allowTouchMove = false;

                        if (realCtg > lastCtg) {
                            tabOffset = (ctgCnt - realCtg) + Number(lastCtg);
                        } else {
                            tabOffset = lastCtg - realCtg;
                        }
                        moveTo = categorySwiper.activeIndex - tabOffset;

                        if (categorySwiper.activeIndex <= ctgCnt - 1) {
                            //클릭 인덱스가 스와이프의 처음부분일때
                            categorySwiper.setTranslate(categorySwiper.getTranslate() - translate);
                            moveTo = categorySwiper.activeIndex + first.length - 1;
                        }
                        setTimeout(function () {
                            categorySwiper.slideTo(moveTo, 190, false);
                        }, 100)
                    }
                },
            }
        });
        contContainer.data('swiper', contSwiper);

        var categoryContainer = itm.find('.category').addClass('tab-swiper-container');
        categoryContainer.find('ul').addClass('tab-swiper-wrapper');
        categoryContainer.find('li').addClass('tab-swiper-slide');
        
        var categoryInit = false;
        var categorySwiper = new Swiper(categoryContainer, {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 'auto',
            loopedSlides: 100,
            centeredSlides: true,
            centeredSlidesBounds: true,
            slideToClickedSlide: true,
            spaceBetween: 0,
            containerModifierClass: 'tab-swiper-container',
            wrapperClass: 'tab-swiper-wrapper',
            slideClass: 'tab-swiper-slide',
            on: {
                init: function () {
                    categoryInit = true;
                    ctgLength = $(this.slides).length;
                    $(this.slides).find('a').on('click', function (evt) {
                        evt.preventDefault();
                    })
                },
                beforeDestroy: function(){  
                },
                slideChangeTransitionStart: function () {

                    this.allowTouchMove = false;
                    contSwiper.allowTouchMove = false;

                    if (categoryInit) {
                        contSwiper.slideToLoop($(contSwiper.wrapperEl).find('li[data-category=' + this.slides[this.activeIndex].getAttribute('data-category') + ']').eq(0).index(), speed, false);
                        setTimeout(function () {
                            categorySwiper.allowTouchMove = true;
                            contSwiper.allowTouchMove = true;
                        }, speed);
                    }

                    lastCtg = realCtg;
                    realCtg = this.slides[this.activeIndex].getAttribute('data-category');
                },
                transitionEnd: function () {
                    $(this.slides).find('a').attr('aria-selected', false);
                    $(this.slides).eq(this.activeIndex).find('a').attr('aria-selected', true);
                    this.allowTouchMove = true;
                    contSwiper.allowTouchMove = true;
                },
                click: function (evt) {
                    if (this.clickedIndex == undefined) {
                        return;
                    }
                    lastCtg = realCtg;
                    realCtg = this.clickedSlide.getAttribute('data-category');
                },
            }
        });
        categoryContainer.data('swiper', categorySwiper);
    })
}


/**
 * 쿠폰 폰트사이즈 지정 스크립트.
 * param1: 쿠폰엘리먼트 ($('.imgCoupon'))
 * 
 * COM-563.html(경품정보 페이지)
 */
commonJs.setCouponFontSize = function (el) {
    el.each(function () {
        var itm = $(this);
        var data = itm.find('.data');
        data.css('font-size', itm.width() * parseInt(data.css('fontSize')) / parseInt(itm.find('img')[0].naturalWidth / 2));
    })
}

 