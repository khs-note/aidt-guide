app.exec(_ =>{
    app.markdown ={};
    app.markdown.getResource =getResource;
    app.markdown.fetchFiles =fetchFiles;
    app.markdown.render =render;
    app.markdown.render.useOption =undefined;
    app.markdown.getOption =getOption;

    // ===== 내부 기능 ===== //
    async function render(target, text) {
        if(!app.markdown.render.useOption) {
            app.markdown.render.useOption =app.markdown.getOption();
            marked.use(app.markdown.render.useOption);
        }

        target.$.html =marked.parse(text);
        await setHighlight(target);
        drawDiagram(target);
    }
    function drawDiagram(target) {
        if(!window.mermaid) return;

        mermaid.run({
            nodes: target.$.queryAll('.language-mermaid'),
        });
    }
    function setHighlight(target) {
        return new Promise(resolve =>{
            target.$.queryAll('pre code').forEach(el =>{
                if(!el.classList.contains('language-mermaid')) {
                    hljs.highlightElement(el);
                }
            });
            setTimeout(_ =>resolve(), 100);
        });
    }
    function getOption() {
        const renderer ={
            heading(text, level, raw, slugger) {
                const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i;
                const hasId = text.match(headingIdRegex);
                return hasId
                    ?`<h${level} id="${hasId[1]}">${text.replace(headingIdRegex, '')}</h${level}>\n`
                    :false;
            }
        };

        return {renderer};
    }
    function fetchFiles(...urls) {
        return app.utils.lazy
            .all(urls.map(url =>fetch(url).then(rs =>rs.text())));
    }
    function getResource(opt ={}) {
        const {useDiagram} =opt;
        const mode =app.layout.theme.getMode();
        const js =[
            '../resource/libs/markdown/marked.min.js',
            '../resource/libs/markdown/highlight.min.js',
            useDiagram &&'../resource/libs/markdown/mermaid.min.js',
        ];
        const css =[
            `../resource/libs/markdown/github-markdown-${mode}.min.css`,
            `../resource/libs/markdown/highlight-${mode}.min.css`,
        ];
        return {js, css};
    }
});
