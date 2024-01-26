app.exec(_ =>{
    const view =app.view.gnbSideMobNav =app.tag('div', controller, {
        html :app.template.gnbSideMobNav,
        class :'d-md-none',
    });
    function controller() {
        initView();
        bindEvent();
        extendMethod();
        app.view.main.$.insert(view);
    }

    // ==== 내부 기능 ====
    function extendMethod() {
        const {vo} =view.$;

        // 사이드 네비게이션 슬라이드 온
        view.$.slideOn =_ =>{
            vo.navBar.$.cls.remove('hiding');
            vo.backdrop.$.cls.remove('d-none');
            requestAnimationFrame(_ =>{
                vo.navBar.$.cls.add('show');
                vo.backdrop.$.cls.add('show');
            });
        };
    }
    function bindEvent() {
        const {vo} =view.$;
        // vo.toggleMode.$.event('change', _ =>app.layout.theme.toggleMode());
        vo.close.$.event('click', _ =>{
            vo.navBar.$.cls.add('hiding').remove('show');
            vo.backdrop.$.cls.remove('show');
            setTimeout(_ =>{
                vo.backdrop.$.cls.add('d-none');
            }, 300);
        });
    }
    function initView() {
    }
});
