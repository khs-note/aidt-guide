app.exec(_ =>{
    const view =app.view.gnbHeader =app.tag('header', {
        html :app.template.gnbHeader,
        class :'border-bottom pt-3 pb-md-3',
        dataNonePrint :'',
    }, _ =>{
        initView();
        bindEvent();
    });
    view.$.menu =viewMenu();


    // ==== 내부 기능 ====
    function viewMenu() {
        const menu ={
            // 메뉴 데이터
            _data :undefined,
            _thunks :[],

            // 메뉴 데이터 순회
            lazyEach(block) {
                if(this._data) this._each(_data, 0, block);
                else {
                    this._thunks.push(block);
                }
            },

            _each(data, depth, block) {
                const file =location.pathname.split('/').pop();
                const prefix =file.split('-').shift();

                data.forEach(item =>{
                    block(item, depth, _isActive(item, depth));
                    if(item.subs) this._each(item.subs, depth +1, block);
                });

                function _isActive(item, depth) {
                    switch(depth) {
                        case 0:
                            return new RegExp(`^\/${prefix}-`).test(item.link);
                        case 1:
                            return new RegExp(`\/${file}`).test(item.link);
                        default:
                            return false;
                    }
                }
            },
            _fetchData() {
                setTimeout(_ =>{
                    app.ajax.getJson('src/gnb/default-munu.json')
                        .then(json =>{
                            this._thunks.forEach(block =>this._each(json, 0, block));
                        });
                }, 100);
            },
        };

        menu._fetchData();
        return menu;
    }
    function bindEvent() {
        const {vo} =view.$;
        vo.mobNav.$.event('click', _ =>app.view.gnbSideNav.$.mobNavSlideOn());
    }
    function initView() {
        const {vo} =view.$;
        const {home} =app.link;

        vo.homeLink.href =home;
        // 메뉴 데이터 출력
        _displayMenuList();

        function _displayMenuList() {
            view.$.menu.lazyEach((data, depth, isActive) =>{
                if(depth !=0) return;

                const active =isActive ?'fw-bold' :'link-body-emphasis';
                vo.menuList.$.insert(app.tag('li', {
                    class :'nav-item',
                    html :`<a class="nav-link ${active}" href="${home +data.link}">${data.name}</a>`
                }));
            });
        }
    }
});
