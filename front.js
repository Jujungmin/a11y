    /*
    $(document).ready(function() {
    if($('.area-tab').length > 0) {
        /*
        탭 선택 시 title="선택됨"
        각 탭 안의 swiepr 작동되도록 접근성에 맞게 나오기
        여러개의 탭
        tab-content
        li.is-active 일 때 title="선택됨"
        *
        $('.tab-menu > li').each(function() {
            let $tabBtn = $(this).find('.tab-btn');
            $('li.is-active').find('.tab-btn').attr('title', '선택됨');
            $tabBtn.on('click', function(e) {
                e.preventDefault();
                let tabCont = $(this).attr('href');
                if(!$(this).closest('li').hasClass('is-active')) {
                    $(this).closest('.tab-menu').find('li.is-active').removeClass('is-active').find('.tab-btn').removeAttr('title');
                    $(this).attr('title', '선택됨').closest('li').addClass('is-active');
                    $(this).parents('.area-tab').next('.tab-content').children('.tab-panel').removeClass('is-block')
                    $(tabCont).addClass('is-block');
                } else {
                    return false;
                }
            })
        })
    }

});
*/

document.addEventListener('DOMContentLoaded', function() {
    const $areaTab = document.querySelectorAll('.area-tab');
    if($areaTab.length > 0) {
        const $tabMenu = document.querySelectorAll('.tab-menu > li');

        $tabMenu.forEach((el,i) => {
            console.log(el,i)
        });
    }
})


    

