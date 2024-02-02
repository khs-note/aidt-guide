app.exec(_ =>{
    app.markdown ={};
    app.markdown.getResource =getResource;
    app.markdown.fetchFiles =fetchFiles;
    app.markdown.render =render;

    // ===== 내부 기능 ===== //
    function render(target, text) {
        target.$.html =marked.parse(text);
        setHighlight(target);
        drawDiagram(target);
    }
    function drawDiagram(target) {
        if(!window.mermaid) return;

        setTimeout(_ =>mermaid.run({
            nodes: target.$.queryAll('.language-mermaid'),
        }), 200);
    }
    function setHighlight(target) {
        requestAnimationFrame(_ =>{
            target.$.queryAll('pre code')
                .forEach(block =>hljs.highlightElement(block));
        });
    }
    function fetchFiles(...urls) {
        const {lazy} =app.utils;
        return lazy.all(urls.map(url =>fetch(url).then(rs =>rs.text())));
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
