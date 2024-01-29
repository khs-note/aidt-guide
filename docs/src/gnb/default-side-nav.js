app.exec(_ =>{
    const view =app.view.gnbSideNav =app.tag('div', controller, {
        html :app.template.gnbSideNav,
        class :'flex-shrink-0 p-3 d-none d-md-block',
        dataNonePrint :'',
        style :'width: 280px;',
    });
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
        _themeMode();
        _setActiveLink();


        function _setActiveLink() {
            const paths =location.pathname.split('/');
            const regExp =new RegExp(paths[paths.length -1] +'$');
            view.$.queryAll('[href]').forEach(el =>{
                if(/#/.test(el.href)) return;

                el.href =el.href.replace(location.origin, '').replace(/^\//, app.link.docsMain +'/');
                if(regExp.test(el.href)) {
                    el.$.cls.add('text-primary');
                    el.firstElementChild.$.cls
                        .remove('bi-caret-right')
                        .add('bi-caret-right-fill');
                    el.nextElementSibling.$.cls.remove('d-none');
                }
            });
        }
        function _themeMode() {
            app.layout.theme.onLoad(isDark =>{
                vo.toggleMode.checked =isDark;
            });
        }
    }
});
