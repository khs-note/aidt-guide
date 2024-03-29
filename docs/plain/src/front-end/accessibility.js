app.exec(_ =>{
    const view =app.view.conts =app.tag('div', controller, {
        html :app.template.conts,
        class :'w-100 p-3'
    });
    function controller() {
        initView();
        bindEvent();
        app.view.main.$.insert(view);
    }


    // ===== 내부 기능 ===== //
    function bindEvent() {
        const {vo} =view.$;
        vo.print.$.event('click', _ =>window.print());
    }
    function initView() {
        const {vo} =view.$;
        _markdownRender();


        function _markdownRender() {
            app.markdown.fetchFiles(...[
                'markdown/accessibility/html.md',
            ])
                .then(texts =>{
                    app.markdown.render(vo.html, texts.shift());
                    // app.markdown.render(vo.objectArray, texts.shift());
                });
        }
    }
});
