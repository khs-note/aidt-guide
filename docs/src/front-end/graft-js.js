app.exec(_ =>{
    const view =app.view.conts =app.tag('div', controller, {
        html :app.template.conts,
    });
    function controller() {
        initView();
        bindEvent();
        app.view.main.$.insert(view);
    }


    // ===== 내부 기능 ===== //
    function bindEvent() {
        const {vo} =view.$;
        vo.print.$.event('click', _ =>{
            window.print();
        });
    }
    function initView() {
        const {vo} =view.$;
        _markdownRender();


        function _markdownRender() {
            app.markdown.fetchFiles(...[
                'markdown/graft/graft-getstart.md',
                'markdown/graft/graft-api.md',
                'markdown/graft/graft-api-config.md',
                'markdown/graft/graft-api-log.md',
                'markdown/graft/graft-api-resource.md',
                'markdown/graft/graft-api-imports.md',
                'markdown/graft/graft-api-template.md',
                'markdown/graft/graft-api-view.md',
                'markdown/graft/graft-api-html.md',
                'markdown/graft/graft-api-utils.md',
                'markdown/graft/graft-api-router.md',
                'markdown/graft/graft-api-bridge.md',
                'markdown/graft/graft-tag.md',
                'markdown/graft/graft-bridge.md',
            ])
                .then(texts =>{
                    app.markdown.render(vo.getstart, texts.shift());

                    app.markdown.render(vo.api, texts.shift());
                    app.markdown.render(vo.apiConfig, texts.shift());
                    app.markdown.render(vo.apiLog, texts.shift());
                    app.markdown.render(vo.apiResource, texts.shift());
                    app.markdown.render(vo.apiImports, texts.shift());
                    app.markdown.render(vo.apiTemplate, texts.shift());
                    app.markdown.render(vo.apiView, texts.shift());
                    app.markdown.render(vo.apiHtml, texts.shift());
                    app.markdown.render(vo.apiUtils, texts.shift());
                    app.markdown.render(vo.apiRouter, texts.shift());
                    app.markdown.render(vo.apiBridge, texts.shift());

                    app.markdown.render(vo.tag, texts.shift());
                    app.markdown.render(vo.bridge, texts.shift());
                });
        }
    }
});
