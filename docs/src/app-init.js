const app =Graft.init((app) => {
    // 환경변수 세팅
    app.config.version ='1.0.0';
    app.config.debug =/http:/.test(location.protocol);
    // 로그 세팅
    app.log.out =logOut();

    app.layout ={};
    // 테마 세팅
    app.layout.theme =layoutTheme();

    // 디폴트 리소스 세팅
    app.resource.getDefault =resourceDefault;
    // 디폴트 레이아웃 세팅
    app.layout.default =layoutDefault;

    // 링크 경로
    app.link =getLinkPath();


    // ===== 내부 기능 =====
    function layoutDefault() {
        app.html.insert(app.view.gnbHeader);
        app.html.insert(app.view.main);
    }
    function resourceDefault() {
        const js =[];
        const css =[
            'libs/bootstrap/bootstrap.min.css',
            'libs/bootstrap/bootstrap-icons.min.css',
            'src/gnb/default-style.css',
        ];
        const script =[
            'src/gnb/default-header.js',
            'src/gnb/default-side-nav.js',
            'src/gnb/default-side-mob-nav.js',
        ];
        const html ={
            gnbHeader :'src/gnb/default-header.html',
            gnbSideNav :'src/gnb/default-side-nav.html',
            gnbSideMobNav :'src/gnb/default-side-mob-nav.html',
        };

        app.view.main =app.tag('main', {class :'d-flex flex-nowrap container'});
        return app.resource.getResource({js, css, script, html});
    }
    function getLinkPath() {
        const {debug} =app.config;
        const docsMain =debug ?'/docs' :'/aidt-guide';
        return {docsMain};
    }
    function layoutTheme() {
        const {utils :{storage :{local}}} =app;

        const toggleMode =_ =>{
            _setMode(_getMode() =='light' ?'dark' :'light');
            location.reload();
        };
        const onLoad =block =>{
            const mode =_getMode();
            app.html.page.dataset.bsTheme =mode;
            block &&block(mode =='dark');
        };
        return {toggleMode, onLoad};

        function _getMode() {
            return local.get('theme-mode') ||'light';
        }
        function _setMode(mode) {
            local.set('theme-mode', mode);
        }
    }
    function logOut() {
        const {name, version, debug} =app.config;
        debug &&app.log.setting({
            label :[name, version].join(' '),
        });
        return app.log.getLogger();
    }
});
