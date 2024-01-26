app.exec(_ =>{
    const view =app.view.conts =app.tag('div', controller, {
        html :app.template.conts,
        class :'w-100 p-3'
    });
    function controller() {
        app.view.main.$.insert(view);
    }
});
