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

// 23.12.11 : JS 진행 후 vue 로 다시 진행해보기
document.addEventListener('DOMContentLoaded', function() {
    const $areaTab = document.querySelectorAll('.area-tab');
    if($areaTab.length > 0) {
        const $tabBtn = document.querySelectorAll('.tab-btn');

        $tabBtn.forEach((_this,i,arr) => {
            _this.addEventListener('click', function() {
                const tabBtnId = _this.getAttribute('href').slice(1);
                const $tabPanel = document.getElementById(tabBtnId);
                const tabPanelAll = _this.closest('.area-tab').nextElementSibling.children;
                
                // _this.parentElement.classList.add('is-active');
                // _this.closest('.tab-menu').querySelector('li').classList.remove('is-active');
                let tabLi = _this.closest('.tab-menu').querySelectorAll('li');
                // console.log(tabLi.length)

                for(let i = 0; i < tabLi.length; i++) {
                    tabLi[i].classList.remove('is-active');
                }
                _this.parentElement.classList.add('is-active');
                
                for(let i = 0; i < tabPanelAll.length; i++) {
                    // console.log(i)
                    const $tabPanel = tabPanelAll[i];
                    $tabPanel.classList.remove('is-block');
                }
                $tabPanel.classList.add('is-block');
                return false;
            })
        });
    }
})


    

