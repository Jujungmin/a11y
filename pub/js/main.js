// 팝업열기
// modalOpen('다음에 열 팝업클래스')
function modalOpen($modal) {
	let isOpen = false;
	// 팝업 2개이상일 때
	if($('.dim').length) {
		isOpen = true;
	}
	$modal = $('.' + $modal);
	$('body').css({'overflow': 'hidden', 'padding-right': '17px'});
	$modal.css({display: 'block'}).attr('role', 'dialog').removeAttr('aria-hidden');

	if(!isOpen) $('body').append('<div class="dim"></div>');
}

// 팝업닫기
function modalClose($modal) {
	// modalClose('all') 전체 팝업닫기
	if($modal === 'all') {
		$('.modal').css({display: 'none'}).attr('arai-hidden', 'true').removeAttr('role');
	} else {
		$($modal).closest('.modal').css({display: 'none'}).attr('arai-hidden', 'true').removeAttr('role');
	}
	// modalClose(this) dim 처리.
	if($('.modal').css('display') === 'none') {
		$('.dim').remove();
		$('body').removeAttr('style');
	}
}

$(function() {
	// input text 모두 지우기
	$('.button-delete').on('click', (e)=> {
		$(e.currentTarget).siblings('input').val('cmd');
	})
	// 체크박스 모두 선택하기
	// name은개발에서 변경가능하므로 클래스로변경.
	$('#checkAll').on({
		'click': function() {
			let ckboxAll = $('#checkAll').prop('checked');
			if(ckboxAll) {
				$('.check-choice').prop('checked', true);
			} else {
				$('.check-choice').prop('checked', false);
			}
		},
	});

	$('.check-choice').on('click', (e) => {
		const ckLength = $('.check-choice').length;
		$('.check-choice:checked').length === ckLength ? $('#checkAll').prop('checked', true) : $('#checkAll').prop('checked', false)
	})
})