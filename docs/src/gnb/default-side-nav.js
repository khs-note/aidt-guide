app.exec(_ =>{
    const view =app.view.gnbSideNav =app.tag('div', {
        html :app.template.gnbSideNav,
        dataNonePrint :'',
    }, _ =>{
        initView();
        bindEvent();
        extendMethod();
    });
    /** 모바일 네비게이션 */
    view.$.mobNav =null;


    // ==== 내부 기능 ====
    function extendMethod() {
        view.$.mobNavSlideOn =_ =>view.$.mobNav.$.slideOn();
    }
    function bindEvent() {
        const {vo} =view.$;
        vo.toggleMode.$.event('change', _ =>app.layout.theme.toggleMode());
    }
    function initView() {
        const {vo} =view.$;
        _themeMode();
        _displayMenuList();


        function _displayMenuList() {
            const active ={d0 :false, d1 :false};
            app.view.gnbHeader.$.menu.lazyEach((data, depth, isActive) =>{
                switch(depth) {
                case 0:
                    active.d0 =isActive;
                    return _displayMenuItem0(active, data);
                case 1:
                    active.d1 =isActive;
                    return _displayMenuItem1(active, data, isActive);
                case 2:
                case 3:
                    return _displayMenuItem2_3(active, data, depth);
                }
            });
        }
        function _displayMenuItem2_3({d0, d1}, data, depth) {
            if(!d0 || !d1) return;

            const list =vo.menuList.lastElementChild.$.query('ul');
            list.$.insert(app.tag('li', {
                class: `py-1${depth ==3 ?' ps-3' :''}${data.underline ?' border-bottom' :''}`,
                html: `<a href="${data.link}" class="link-body-emphasis text-decoration-none">
                    ${data.name}
                </a>`,
            }));
        }
        function _displayMenuItem1({d0}, data, isActive) {
            if(!d0) return;

            vo.menuList.$.insert(app.tag('li', {
                class :'mb-1',
                html :`
                    <a href="${app.link.docsMain +data.link}"
                        class="btn border-0 collapsed fw-bold${isActive ?' text-primary' :''}">
                        <i class="bi bi-caret-right${isActive ?'-fill' :''}"></i> ${data.name}
                    </a>
                    <div class="collapse show ms-3">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-3"></ul>
                    </div>
                `,
            }));
        }
        function _displayMenuItem0({d0}, data) {
            if(!d0) return;

            vo.navTitle.$.text =data.name;
        }
        function _themeMode() {
            app.layout.theme.onLoad(isDark =>{
                vo.toggleMode.checked =isDark;
            });
        }
    }
});


app.exec(_ =>{
    const {gnbSideNav} =app.view;
    const view =gnbSideNav.$.mobNav =app.tag('div', {
        html :gnbSideNav.$.template.mobNav,
        class :'d-md-none',
    }, _ =>{
        initView();
        bindEvent();
        extendMethod();
        app.view.main.$.insert(view);
    });


    // ==== 내부 기능 ====
    function extendMethod() {
        const {vo} =view.$;

        // 네비게이션 슬라이드 온
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
        vo.close.$.event('click', _ =>{
            vo.navBar.$.cls.add('hiding').remove('show');
            vo.backdrop.$.cls.remove('show');
            setTimeout(_ =>{
                vo.backdrop.$.cls.add('d-none');
            }, 300);
        });
    }
    function initView() {
        const {vo} =view.$;
        _displayMenuList();

        function _displayMenuList() {
            const active ={d0 :false, d1 :false};
            app.view.gnbHeader.$.menu.lazyEach((data, depth, isActive) =>{
                switch(depth) {
                case 0:
                    active.d0 =isActive;
                    return _displayMenuItem0(active, data);
                case 1:
                    active.d1 =isActive;
                    return _displayMenuItem1(active, data, isActive);
                case 2:
                case 3:
                    return _displayMenuItem2_3(active, data, depth);
                }
            });
        }
        function _displayMenuItem2_3({d0, d1}, data, depth) {
            if(!d0 || !d1) return;

            const {lastElementChild :{lastElementChild}} =vo.menuList;
            const list =lastElementChild.$.query('.btn-toggle-nav');
            list.$.insert(app.tag('li', {
                class: `py-1${depth ==3 ?' ps-3' :''}${data.underline ?' border-bottom' :''}`,
                html: `<a href="${data.link}" class="link-body-emphasis text-decoration-none">
                    ${data.name}
                </a>`,
            }));
        }
        function _displayMenuItem1({d0}, data, isActive) {
            if(!d0) return;

            const {lastElementChild} =vo.menuList;
            lastElementChild.$.insert(app.tag('li', {
                class :'mb-1',
                html :`
                    <a href="${app.link.docsMain +data.link}"
                        class="btn border-0 collapsed fw-bold${isActive ?' text-primary' :''}">
                        <i class="bi bi-caret-right${isActive ?'-fill' :''}"></i> ${data.name}
                    </a>
                    <div class="collapse show ms-3">
                        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small ms-3"></ul>
                    </div>
                `,
            }));
        }
        function _displayMenuItem0(_, data) {
            vo.menuList.$.insert(app.tag('div', {
                html: `<a href="${app.link.docsMain +data.link}"
                    class="link-body-emphasis text-decoration-none">
                    ${data.name}
                    </a>`,
                class :'h3'
            }));
            vo.menuList.$.insert(app.tag('ul', {class :'list-unstyled ps-0'}));
        }
    }
});
