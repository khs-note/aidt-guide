app.exec(_ =>{
    app.markdown ={};
    app.markdown.getResource =getResource;
    app.markdown.fetchFiles =fetchFiles;
    app.markdown.render =render;
    // app.markdown.setHighlight =setHighlight;
    // app.markdown.drawDiagram =drawDiagram;

    // ===== 내부 기능 ===== //
    function render(target, text) {
        target.$.html =marked.parse(text);
        setHighlight(target);
        drawDiagram(target);
        return app.markdown;
    }
    function drawDiagram(target) {
        setTimeout(_ =>mermaid.run({
            nodes: target.$.queryAll('.language-mermaid'),
        }), 100);
        return app.markdown;
    }
    function setHighlight(target) {
        requestAnimationFrame(_ =>{
            target.$.queryAll('pre code')
                .forEach(block =>hljs.highlightElement(block));
        });
        return app.markdown;
    }
    function fetchFiles(...urls) {
        const {lazy} =app.utils;
        return lazy.all(urls.map(url =>fetch(url).then(rs =>rs.text())));
    }
    function getResource() {
        const mode =app.layout.theme.getMode();
        const js =[
            'libs/markdown/marked.min.js',
            'libs/markdown/highlight.min.js',
            'libs/markdown/mermaid.min.js',
        ];
        const css =[
            `libs/markdown/github-markdown-${mode}.min.css`,
            `libs/markdown/highlight-${mode}.min.css`,
        ];
        return {js, css};
    }
});
