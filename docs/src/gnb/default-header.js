app.exec(_ =>{
    const view =app.view.gnbHeader =app.tag('header', controller, {
        html :app.template.gnbHeader,
        class :'py-3 border-bottom',
        dataNonePrint :'',
    });
    function controller() {
        bindEvent();
    }


    // ==== 내부 기능 ====
    function bindEvent() {
        const {vo} =view.$;
        vo.mobNav.$.event('click', _ =>app.view.gnbSideMobNav.$.slideOn());
    }
});
