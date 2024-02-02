## imports
어플리케이션 구동에 필요한 리소스를 추가 합니다.
```ts
Graft::imports ={
    /**
     * 리소스를 추가합니다.
     * @param cfg 리소스 객체
     */
    resource(cfg :GraftResourceConfig) :Promise;


    /**
     * 스크립트를 추가합니다.
     * @param url URL 경로
     */
    script(url :string) :Promise;

    /**
     * 스타일시트를 추가합니다.
     * @param url URL 경로
     */
    style(url :string) :Promise;

    /**
     * HTML을 요청합니다.
     * @param url URL 경로
     */
    html(url :string) :Promise;
};
```

리소스 객체
```ts
type GraftResourceConfig ={
    /** 정적 스크립트 경로 */
    js :string[];
    /** 스타일 시트 경로 */
    css :string[];
    /** 로직 스크립트 경로 */
    script :string[];
    /** HTML 템플릿 경로로 결과 값은 Graft.template 객체에 취합됩니다. */
    html :{[k :string] :string};
};
```

사용예
```js
// 단일 스크립트의 동적 추가
app.imports.script('jQuery.js')
    .then(_ =>{
        // 스크립트 로드 완료
        $(...);
    });


// 리소스 설정 값을 이용한 추가
app.imports.resource({
    // 스타일 시트를 추가 합니다.
    css : [],
    // 라이브러리 스크립트를 추가 합니다.
    js : [],
    // 템플릿 HTML 수집 합니다.
    html: {
        gnbHeader: 'src/gnb/gnb-header.html',
        main: 'src/index.html',
    },
    // 비즈니스 처리를 위한 스크립트를 추가 합니다.
    // script의 경우 선언된 순서로 로딩 됩니다.
    script: [
        'src/gnb/gnb-header.js',
        'src/index.js',
    ],
})
    .then(_ =>{
        // 리소스 추가가 완료 후 호출 되며, 
        app.html.insert(app.view.gnbHeader);
        // main 컨텐츠를 추가 합니다.
        app.html.insert(app.view.main);
    });
```
