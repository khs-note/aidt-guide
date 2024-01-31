const app =Graft.init((app) => {
    // 환경변수 세팅
    app.config.version ='1.0.0';
    app.config.debug =/http:/.test(location.protocol);
    // 로그 세팅
    app.log.out =logOut();
    // 유틸리티 세팅
    app.utils =extendsUtils();

    app.layout ={};
    // 테마 세팅
    app.layout.theme =layoutTheme();

    // 디폴트 리소스 세팅
    app.resource.getDefault =resourceDefault;
    // 디폴트 레이아웃 세팅
    app.layout.default =layoutDefault;

    // 링크 경로
    app.link =appLink();
    // 데이터 통신
    app.ajax =appAjax();


    // ===== 내부 기능 =====
    function appAjax() {
        const getText =url =>fetch(url).then(res =>res.text());
        const getJson =url =>fetch(url).then(res =>res.json());
        return {getText, getJson};
    }
    function layoutDefault() {
        app.html.insert(app.view.gnbHeader);
        app.html.insert(_mainContainer());


        function _mainContainer() {
            const {mainWrap} =app.view;

            app.view.gnbSideNav.$.cls.add('col-md-3', 'd-none', 'd-md-block');
            app.view.main.$.cls.add('col-12', 'col-md-9', 'py-3');

            mainWrap.$.insert(app.view.gnbSideNav);
            mainWrap.$.insert(app.view.main);
            return app.tag('main', {class :'container'}, [mainWrap]);
        }
    }
    function resourceDefault(opt ={}) {
        const js =app.utils.zipArray([], opt.js);
        const css =app.utils.zipArray([
            'libs/bootstrap/bootstrap.min.css',
            'libs/bootstrap/bootstrap-icons.min.css',
            'src/gnb/default-style.css',
        ], opt.css);
        const script =app.utils.zipArray([
            'src/gnb/default-header.js',
            'src/gnb/default-side-nav.js',
        ], opt.script);
        const html =app.utils.zipObject({
            gnbHeader :'src/gnb/default-header.html',
            gnbSideNav :'src/gnb/default-side-nav.html',
        }, opt.html);

        // 메인 컨네이너 세팅
        app.view.main =app.tag('div');
        app.view.mainWrap =app.tag('div', {class :'row g-md-5'});

        return app.resource.getResource({js, css, script, html});
    }
    function appLink() {
        const {debug} =app.config;
        const docsMain =debug ?'/docs' :'/aidt-guide';
        return {docsMain};
    }
    function layoutTheme() {
        const {utils :{storage :{local}}} =app;

        const getMode =_ =>local.get('theme-mode') ||'light';
        const toggleMode =_ =>{
            _setMode(getMode() =='light' ?'dark' :'light');
            location.reload();
        };
        const onLoad =block =>{
            const mode =getMode();
            app.html.page.dataset.bsTheme =mode;
            block &&block(mode =='dark');
        };
        return {getMode, toggleMode, onLoad};


        function _setMode(mode) {
            local.set('theme-mode', mode);
        }
    }
    function extendsUtils() {
        app.utils.zipArray =(a =[], b =[]) =>a.concat(b);
        app.utils.zipObject =(a ={}, b ={}) =>Object.assign({}, a, b);

        return app.utils;
    }
    function logOut() {
        const {name, version, debug} =app.config;
        debug &&app.log.setting({
            label :[name, version].join(' '),
        });
        return app.log.getLogger();
    }
});
