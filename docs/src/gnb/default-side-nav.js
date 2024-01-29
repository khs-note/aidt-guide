app.exec(_ =>{
    const view =app.view.gnbSideNav =app.tag('div', controller, {
        html :app.template.gnbSideNav,
        class :'flex-shrink-0 p-3 d-none d-md-block',
        dataNonePrint :'',
        style :'width: 280px;',
    });
    /**
     * 사이드 네비게이션 컨트롤러
     */
    function controller() {
        initView();
        bindEvent();
        app.view.main.$.insert(view);
    }

    // ==== 내부 기능 ====
    function bindEvent() {
        const {vo} =view.$;
        vo.toggleMode.$.event('change', _ =>app.layout.theme.toggleMode());
    }
    function initView() {
        const {vo} =view.$;

        app.layout.theme.onLoad(isDark =>{
            vo.toggleMode.checked =isDark;
        });
    }
});
