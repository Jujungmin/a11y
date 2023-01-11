(function(t) {
	var lp = {
			zIdx : 1500,
			fnCb : new Object(),  // 개별팝업에서 콜백함수를 셋팅할수 있는 함수 객체.
			winLastW : new Object(),
			closeTarget : new Object(),
			firstPopFocus : new Object(),
			elCnt : 0, // element 갯수
			move : function(){
				$( '.popWrap' ).each(function(){
					// [+] A.insertBefore(B) :: B뒤에 A추가.
					$(this).insertBefore( ".wrapper" );
				});
			},
			// Open
			open : function (url, jsParam, jsURL, fnObj){ // jsParam(json 파라미터 객체), fnObj(콜백함수)
				lp.zIdx++; 
				var alertState = 'none';
				wa.getNowFocus();
				lp.winLastW = $('body').outerWidth();
				if(fnObj != undefined && fnObj != null && fnObj != ""){
					lp.fnCb = fnObj; // 콜백함수 셋팅.
				}
				if( $('body').hasClass('popOn') == false ){
					if( isIOS == true ){
						var scrlPos = $(window).scrollTop();
						$('html, body').addClass('popOn');
						$('html, body').scrollTop( 0 );
						$(window).scrollTop( 0 );
						$('#content').css('top','-'+scrlPos+'px');
					} else {
						$('html, body').addClass('popOn');
					}
					lp.firstPopFocus = $(':focus');
				}
				if( lp.winLastW != $(window).width() ){
					$('body').addClass('hasScroll');
				}
				var ajaxType = false;
				if( url.indexOf('/') != -1 ){
					ajaxType = true;
				}
				if( ajaxType == true ){
					var str = url + " .popup";
					var popupID = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'))
					$('body').prepend('<div class="popWrap" id="'+popupID+'"></div>');
					$('#'+popupID).show();
					$('#'+popupID).load(str, jsParam, function(){
						lp.openedSet( $(this), jsURL);
					});
				} else {
					$(url).show();
					setTimeout(function(){
						lp.openedSet( $(url), jsURL);
					},10)
				}
			},
			openedSet : function( _target, jsURL ){
				var target = $(_target).closest('.popWrap');
				console.log("openedSet : " + target );
				$(target).css( 'z-index', lp.zIdx ).attr({'data-idx': lp.zIdx, 'tabindex': -1});
				lp.getCol( $(target) );
				$('html').addClass('hideBody');
				$('.wrapper').attr('aria-hidden','true');
				if( $('.isDevice').length > 0 ){
					$(target).find('.popCont').attr('role','dialog');
				}
				// $(target).find('.popHead h1').attr('tabindex','0');
				$(target).find('.popBody').attr('tabindex','0');
				if( $('.btnArea .single.toDay').length > 0 ){
					$(target).closest('.popWrap').addClass('hasSetToday'); 
				}
				lp.focusLoopInit();
				if( jsURL != undefined )$.getScript( jsURL ).done( function(){ /*cf_popfooter();*/ }).fail(function(){ /*cf_popfooter();*/ });
				
				if( $(target).find('.popCont.alert').length > 0 ){
					$(target).css( 'z-index', lp.zIdx + 55000 ).removeAttr('data-idx');
					$(target).find('.popContain').addClass('alert');
					$(target).addClass('alertPop');
				} else if( $(target).find('.popCont.bottom').length > 0 ){
					$(target).addClass('bottomSheet');
				} else {
					$(target).addClass('fullPop');
				}
				$(target).addClass('nowOpen');
				// bottom sheet
				setTimeout(function(){$(target).find('.popCont.bottom').addClass('open');},100);
				//swiper문제 해결
				for( var i = 0 ; i < $('.popWrap .swiperWrap').length ; ++i ){
					try{
						window['ui' +$('.popWrap .swiperWrap:eq('+i+')').attr('id') ].update();
					}catch(e){
						console.log(e);
					}
				}
				if( $('.nowOpen .swiperWrap .swiper-container').length == 0 ){
					$('.nowOpen .swiperWrap').addClass('swiperReady');
					ui.swiperInit();
				}
				// console.log(target);
				// 추후 팝업에서 스크롤 할때 애니메이션이 있을 경우 필요함
				$(target).find('.popBody').scroll( layout.popScrollMoved );
				setTimeout(function(){
					layout.popScrollMoved();
					$( wa.getLpFocus( $(target) ) ).focus();
					// console.log(wa.getLpFocus($(target)));
					
					$('#test').append('<p class="ac">'+new Date()+'</p>');
				},1000);
				// 기본 실행
				layout.wcmsCheck();
				ui.init();
				$(target).focus();
				
				/* IE에서 팝업 높이값 체크 못할 경우 할수 있음.
				if( $('.popWrap.nowOpen').find('.popBody').length > 0 ){
					 if( $(target).find('.alert').length == 0 ){
						var idx = $(target).data('idx');
						var targetStr = '.nowOpen[data-idx='+idx+']';
						window["nowOpen"+ $(target).data('idx') ] = setInterval(function(){
							lp.popupResize( targetStr );
						}, 500);
					}
				}*/
				/*ui.emailInit();
				$('.popWrap .ipt').each(function(){
					if( $(this).data('unit') != undefined ){
						ui.iptUnitInit( $(this) );
					}
				});
				ui.setBtnAddInit();*/
			},
			close : function (target, _mTime){
				var closeTarget = target;
				$(closeTarget).addClass("removeEnabled");
				if( target == null || target == undefined){
					var closeTarget = $(':focus').closest('.popWrap');
					$(closeTarget).addClass("removeEnabled");
				}
				if(_mTime == null || _mTime == undefined){
					var mTime = 450;
				} else {
					mTime = _mTime;
				}
				if( $(wa.nowFocusEl).closest('.menu').length == 0 ){
					wa.setNowFocus();
				} else {
					$(wa.nowFocusEl).find('>span').attr('tabindex','-1').focus();
					$(wa.nowFocusEl).trigger('focusout');
				}
				/* IE에서 팝업 높이값 체크 못할 경우 할수 있음.
				clearInterval( window["nowOpen"+$(closeTarget).data('idx')] );
				*/
				if( $(closeTarget).find('.popCont.bottom').length == 0 || winW > 768 ){
					console.log("bottom sheet 아님");
					$(closeTarget).removeClass('nowOpen');
					setTimeout(function(){
						if( $(closeTarget).hasClass("removeEnabled") ){
							$(closeTarget).remove();
						}
						lp.closeComplete();
					}, mTime);
				} else {
					console.log("bottom sheet 상태");
					$(closeTarget).find('.popCont.bottom').removeClass('open');
					setTimeout(function(){
						if( $(closeTarget).hasClass("removeEnabled") ){
							$(closeTarget).remove();
						}
						lp.closeComplete();
					},400);
				}
			},
			closeComplete : function(){
				if( $('body .popWrap.nowOpen').length == 0 ){
					$('html, body').removeClass('popOn hasScroll popFullScroll hideBody');
					$('.wrapper').removeAttr('aria-hidden');
					if( $(lp.firstPopFocus).closest('.menu').length == 0 ){
						$(lp.firstPopFocus).focus();
					} else {
						$(lp.firstPopFocus).find('>span').attr('tabindex','-1').focus();
						$(lp.firstPopFocus).trigger('focusout');
					}
					if( isIOS == true ){
						var scrlPos = - parseInt( $('#content').css('top') );
						$('html, body').removeClass('popOn');
						$('#content').css('top','auto');
						$('html, body').scrollTop( scrlPos );
					} else {
						$('html, body').removeClass('popOn');
					}
				}
				layout.wcmsCheck();
			},
			getCol : function( target ){
				classMove( $(target), ['bottom', 'searchPage', 'digiPrdAll'] );
				var getCol = $(target).find('.popBody').attr('class');
				if( getCol != undefined ){
					console.log( "getCol : " + getCol );
					if( getCol.indexOf('col_') > -1 ){
						var replaceCol = getCol.replace('popBody','').replace('on','').replace(/ /gi, '');
						$(target).find('.popCont').addClass( replaceCol );
						$(target).find('.popBody').removeClass( replaceCol );
					}
				}
				function classMove(obj, arry){
					for( var i = 0 ; i < arry.length ; ++i ){
						if( $(target).find('.popBody').hasClass(arry[i]) == true ){
							$(target).find('.popBody').removeClass(arry[i]);
							$(target).find('.popCont').addClass(arry[i]);
						}
					}
				}
			},
			focusLoopInit : function (){
				$('.popWrap').each(function(){
					if( $(this).find('.focusSet').length == 0 ){
						$(this).prepend('<div class="focusSet blind first" tabindex="0"></div>');
						$(this).append('<div class="focusSet blind last" tabindex="0"></div>');
						$(this).find('.focusSet').bind({
							'focusin':function(e){
								var dataIdx = $(e.target).closest('.popWrap').data('idx');
								var popWrap =  '.popWrap[data-idx='+dataIdx+'] .popCont';
								
								if( $(e.target).closest('.popWrap').hasClass('alertPop') ){
									popWrap = '.popWrap .popCont';
								}
								//console.log($(e.target));
								//console.log($( wa.getEnabledFocus(popWrap) ));
								
								if( $(e.target).hasClass('first') ){
									//console.log('first');
									$( wa.getEnabledFocus(popWrap) ).last().focus();
								} else {
									//console.log('last');
									$( wa.getEnabledFocus(popWrap) ).first().focus();
								}
							}
						});
					}
				});
			},
			popupResize : function( _str ){
				console.log("popupResize _str : " + _str);
				var str =_str;
				if( $( str + ' .popBody')[0] != undefined ){
					if( $( str + ' .popBody').data('height') != $(str + ' .popBody')[0].scrollHeight ){
						$( str + ' .popBody').data('height', $(str + ' .popBody')[0].scrollHeight);
						
						$(str + ' .popBody').removeClass('on').removeAttr('tabindex');
						$(str + ' .popBody').css('height','auto');
						winH = $(window).height();
						
						var result = $(str + ' .popBody').data('height');
						$(str + ' .popCont').css('min-height', 0);
						var vGap = 60; // 60은 팝업과 검은색 Dimmed 영역의 위아래 합산된 마진
						if( $('body.windowPop').length > 0 ){
							vGap = 0;
							if( $('body.windowPop .popWrap .popBody').length > 0 ){
								vGap = 60;
							}
						}
						var headerH = $(str + ' .popHead').outerHeight();
						if( $(str + ' .popCont > .btnArea.sticky').length > 0 ){
							var bottomH = $(str + ' .popCont > .btnArea.sticky').outerHeight();
						} else {
							bottomH = 20;
							$(str + ' .popCont').addClass('pb20');
						}
						var stickyH = 0;
						var maxH = winH - vGap - headerH - bottomH;
						if( maxH < $(str + ' .popBody')[0].scrollHeight ){
							$(str + ' .popBody').height( maxH );
							$(str + ' .popBody').addClass('on');
							$(str + ' .popBody').attr('tabindex','0');
						}
					}
				}
			},
			callBack : function(aa){ // 개별팝업에서 콜백 함수 호출 할수 있도록 제공.
				lp.fnCb(aa);
			},
			callBackNullClose : function (mTime){
				if(lp.fnCb != undefined && lp.fnCb != null && lp.fnCb != ""){
					lp.fnCb(null); // 콜백함수 셋팅.
				}
				lp.fnCb = null;
				lp.close(mTime);
			},
			setCallBack : function(pFn){ // 팝업 호출시 콜백 함수를 셋팅 할수 있도록 제공.
				lp.fnCb = pFn;
			}
	}
	t.layout = layout; // Layout 관련
	t.gnb = gnb; // GNB 관련
	t.tip = tip; // tooltip
	t.ui = ui; // UI Component
	t.ip = lp; // 레이어팝업
	t.dpicker = dpicker; // monthPicker
	t.wa = wa; // 접근성 관련
	t.analysis = analysis; // Browser analysis
})(this);	
	