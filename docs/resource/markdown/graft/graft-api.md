# Graft 속성 및 메소드

## 기능 목록

### 정적함수
* [Graft:init](#graft-api-init) 어플리케이션 초기화 합니다.
* Graft:postWebMessage [Bridge 연결](#graft-bridge)을 위한 함수로 네이티브 이벤트 수신을 위한 함수 입니다.
* Graft:receiveWebMessage [Bridge 연결](#graft-bridge)을 위한 함수로 네이티브 기능 수행 결과에 대한 응답 수신을 위한 함수 입니다.

### 메소드
* [Graft::exec](#graft-api-exec) 어플리케이션의 독립적인 공간을 제공합니다.
* [Graft::tag](#graft-api-tag) Tag 엘리먼트 객체를 생성합니다.

### 속성
* [Graft::config](#graft-api-config) 어플리케이션의 정보 및 환경 값을 설정 합니다.
* [Graft::log](#graft-api-log) 로그 출력을 위한 객체를 생성 합니다.
* [Graft::resource](#graft-api-resource) 리소스 관리 도우미 객체 입니다.
* [Graft::imports](#graft-api-imports) 어플리케이션 구동에 필요한 리소스를 추가 합니다.
* [Graft::template](#graft-api-template) HTML 템플릿 콜렉션 객체 입니다.
* [Graft::view](#graft-api-view) 어플리케이션에서 사용되는 뷰 콜렉션 입니다.
* [Graft::html](#graft-api-html) 화면 제어를 위한 헬퍼 객체 입니다.
* [Graft::utils](#graft-api-utils) 유틸리티
* [Graft::router](#graft-api-router) 동적 페이지를 관리 합니다.
* [Graft::bridge](#graft-api-bridge) 스크립트와 네이트간 통신을 처리 합니다.

## init {#graft-api-init}
정적 함수로 어플리케이션을 초기화 하며, 고차 함수를 이용해 환경 설정이 가능 합니다.

```ts
/**
 * @param block 환경 설정을 위한 고차 함수
 */
Graft.init(block: (Graft) =>void) :Graft;
```

사용예
```js
const app =Graft.init(app =>{
    app.config.name ='app-name';
    app.config.version ='0.0.1';
});
```

## exec {#graft-api-exec}
어플리케이션 수행을 위한 독립적인 공간을 제공합니다.
```js
app.exec(_ =>{
    // 수행 로직을 작성합니다.
});
```

## tag {#graft-api-tag}
확장된 기능의 태그 엘리먼트 객체([GraftElement](#graft-tag))를 생성 합니다.
```ts
/**
 * @param tagName 생성 태그명
 * @param prop 엘리먼트 속성값
 * @param children 서브 엘리먼트
 * @param controller 태그를 핸들링 할 함수
 */
Graft.tag(
    tagName :string,
    prop? :{[string] :string},
    children? :Element[],
    controller? :() =>void
) :GraftElement;
```

사용예
```js
// tag 생성 시 HTML 마크업을 추가 하고 싶은 경우
// prop의 html 속성값을 이용합니다.
const view =app.tag('main', controller, {
    html: `<div>main content</div>`,
    class: 'container',
});

// 화면컨트롤러
function controller() {
    // 초기화
    initView();
    // 이벤트 바인딩
    bindEvent();
}
function bindEvent();
function initView();
```

### 동반객체
`tag()`함수의 정적 함수로 반환되는 `GraftElement`인스턴스에 사용자 정의 기능을 추가 합니다.

#### directive
사용자 정의 지시자(**data-directive**)에 반응하는 기능을 설정 합니다.
```ts
Graft.tag.directive(
    // 디렉티브명
    name :string,
    // 선언한 디렉티브에 반응할 함수 블록
    block :(el:GraftElement, parent:GraftElement)=>void
) :void;
```

사용예
```html
<!-- 사용자 정의 디렉티브 선언 -->
<button data-directive="toggle">토글버튼</button>

<!-- 토글 버튼 액션 정의 -->
<script>
app.tag.directive('toggle', el =>{
    el.$.event('click.toggle', _ =>{
        if(el.style.color =='red') {
            el.style.color ='black';
        } else {
            el.style.color ='red';
        }
    });
});
</script>
```

#### decorator
`GraftElement` 인스턴스에 기능을 추가 하고 싶을 경우 사용합니다.
```ts
Graft.tag.decorator(
    /**
     * tag함수로 GraftElement 생성시 호출되는 함수
     * @param {GraftElement} el 생성된 객체
     */
    block :(el :GraftElement) =>void
) :void;
```

사용예
```js
app.tag.decorator(el =>{
    // 화면 노출 처리를 위한 함수를 추가 확장 합니다.
    el.$.show = ()=>{
        el.style.display ='block';
    };

    // 화면 숨김 처리를 위한 함수를 추가 확장 합니다.
    el.$.hide = ()=>{
        el.style.display ='none';
    };
});

// view의 확장 객체 $에 기본 기능에
// 추가적으로 show, hide 메소드가 추가 됩니다.
const view =app.tag('div', {
    style :'display:none;',
});
view.$.show();
```

## config {#graft-api-config}
어플리케이션의 정보 및 환경 값을 설정 합니다.
```ts
Graft.config ={
    /** 어플리케이션 이름 */
    name :string;

    /** 버전 */
    version :string;

    /** 디버그 여부 */
    debug :boolean;
}
```

## log {#graft-api-log}
로그 출력을 위한 객체를 생성 합니다.
```ts
Graft.log ={
    /**
     * 로그 환경 값을 설정 합니다.
     * @param {
          label 출력 라벨
          debug 출력 스타일
          info 출력 스타일
       } opt 설정 옵션값
     */
    setting(opt :{label :string, debug :string, info :string}) :void;

    /**
     * 로깅 객체를 반환 합니다.
     */
    getLogger() :GraftLoggers;


    /**
     * 중단점을 설정 합니다.
     * 환경값이(config.debug) 디버그 모드일 경우 수행 합니다.
     * @param key 중단 키값
     */
    breake(key :string) :void;

    /**
     * 중단점을 추가 합니다.
     * breake가 반응할 키값을 설정 합니다.
     * @param keys 키값을 콤마(,)로 구분해서 입력
     */
    addBreake(...keys :string[]) :void;

    /**
     * 중단점으로 설정된 키값을 반환 합니다.
     */
    getBreakes() :string[];

    /**
     * 중단점으로 설정된 키를 삭제 합니다.
     * @param keys 키값을 콤마(,)로 구분해서 입력
     */
    removeBreake(...keys :string[]) :void;

    /**
     * 중단점 전체 삭제
     */
    clearBreak() :void;
}
```

로깅객체
```ts
type GraftLoggers ={
    debug(...opt :any[]) :void;
    info(...opt :any[]) :void;
    warn(...opt :any[]) :void;
    error(...opt :any[]) :void;
};
```

## resource {#graft-api-resource}
리소스 관리 도우미 객체 입니다.
```ts
Graft::resource ={
    /**
     * 리소스 객체를 생성 합니다.
     */
    getResource(cfg :GraftResourceConfig) :GraftResourceConfig;
};
```

리소스 객체
```ts
type GraftResourceConfig ={
    /**정적 스크립트 경로 */
    js? :string[];
    /**스타일 시트 경로 */
    css? :string[];
    /**로직 스크립트 경로 */
    script? :string[];
    /**HTML 템플릿 경로 */
    html? :{[k :string] :string}
};
```

## imports {#graft-api-imports}
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

## template {#graft-api-template}
HTML 템플릿 콜렉션 객체 입니다.
```ts
Graft::template ={};
```

`imports.resource()`함수를 통해 수집된 HTML 템플릿을 저장 합니다.
```js
app.imports.resource({
    html :{
        // template.sample 템플릿 결과물 저장
        sample :'sample.html',
    }
});
```

## view {#graft-api-view}
어플리케이션에서 사용되는 뷰 콜렉션 입니다.
```ts
Graft::view ={
    [string] :GraftElement
};
```

외부 모듈에서 특정 뷰에 접근할 경우 `Graft::view`객체를 통해서 접근 할 수 있습니다.
```js
// tag 객체를 생성 하며, 뷰 콜렉션에 저장 합니다.
app.view.sample =app.tag('div', {
    // 템플릿을 이용하여 HTML 렌더링 처리
    html :app.template.sample,
});
```

## html {#graft-api-html}
화면 제어를 위한 헬퍼 객체 입니다.
```ts
Graft::html {
    /**
     * 화면 최상위 객체(<html> 태그) 입니다.
     */
    page: HTMLElement |null;


    /**
     * 엘리먼트를 추가 합니다.
     * @param child 추가 대상
     * @param target 추가 대상의 부모(디폴트: body)
     * @param befor 앞에 추가 할 경우
     */
    insert(
        child :GraftElement,
        target? :GraftElement,
        befor? :GraftElement
    ) :GraftElement;

    /**
     * 엘리먼트를 검색 후 대상 객체를 반환 합니다.
     * @param selector 쿼리 셀렉터
     * @param target 검색 대상(디폴트: document)
     */
    query(selector :string, target? :GraftElement) :GraftElement |null;

    /**
     * 엘리먼트를 검색 후 대상 객체를 배열로 반환 합니다.
     * @param selector 쿼리 셀렉터
     * @param target 검색 대상(디폴트: document)
     */
    queryAll(selector :string, target? :GraftElement) :GraftElement[];

    /**
     * 스타일 룰을 추가적으로 적용합니다.
     * @param rule 적용 할 스타일
     */
    addStyleRule(...ruls :string[]);
};
```

사용예
```js
// 속성값이 id="foo" 인 엘리먼트를 검색 후 반환 합니다.
const foo =app.html.query('#foo');

// 포커싱 된 엘리먼트에 스타일을 적용 합니다.
app.html.addStyleRule(`*:focus {border:.3rem dashed lightpink !important;}`);
```

## utils {#graft-api-utils}
유틸리티
```ts
Graft.utils ={
    /** 스토리지 */
    storage :{
        /** 로컬 스토리지 */
        local :GraftUtilsStorage;
        /** 세션 스토리지 */
        session :GraftUtilsStorage;
    };
    /** 쿠키 */
    cookie :GraftUtilsStorage;
    /** 비동기 연산 */
    lazy :GraftLazy;

    /** 오류 스택 */
    error(message :string, name? :string) :Error;
    /** 값 복사 */
    clone(vl :any) :any;
};
```

스토리지 객체
```ts
type GraftUtilsStorage ={
    get(key? :string) :string |GraftStringObject;
    set(key :string |GraftStringObject, val :string ='') :void;
    remove(key? :string |string[]) :void;
};
```

비동기 객체
```ts
interface GraftLazy {
    /** 지연키 등록여부 */
    contains(key :any) :boolean;
    /** 지연 활성화 */
    on(key :any) :Promise<any>;
    /** 지연 정상 귀결 */
    resolve(key :any, data? :any) :void;
    /** 지연 거부 */
    reject(key :any, data? :any) :void;
    /** 비동기 패턴 */
    all(values: Promise[]) :Promise<any[]>;
    /** 비동기 패턴 */
    allSettled(values: Promise[]) :Promise<any[]>;
    /** 비동기 패턴 */
    any(values: Promise[]) :Promise<any>;
    /** 비동기 패턴 */
    race(values: Promise[]) :Promise<any>;
    /** 비동기 순회 */
    iterable(actions :GraftLazyAction[]) :Promise<any>;
};

type GraftLazyAction=(
    data :any,
    next :(v? :any) =>void,
    error :(v :any) =>void
) =>void;
```

## router {#graft-api-router}
SPA(Single Page Application)또는 스탭이 존재하는 페이지에서
동적으로 추가 되는 페이지를 관리 합니다.
```ts
Graft.router ={
    /**
     * 라우터 초기화를 초기화 합니다.
     * 페이지의 시작이 되는 기본 레이어를 세팅 합니다.
     * @param target 기본 레이어(스탭의 첫번째 엘리먼트)
     */
    setFirst(target :any) :void;

    /**
     * 사용할 라우터를 세팅 합니다.
     * @param key 키값
     * @param target 저장 레이어(엘리먼트 객체)
     */
    set(key :string, target :any) :void;

    /**
     * 세팅된 라우터를 조회 합니다.
     * @param key 조회 키값
     */
    get(key? :string) :any |[string, any];

    /**
     * 라우터 스택 정보를 갱신 합니다.
     * onChange 함수를 통해 정보 갱신 여부를 알려 줍니다.
     * @param key 키값
     * @param param 전달 파라미터
     */
    push(key :string, param? :any) :void;

    /**
     * 라우터 변경시 발생 되는 이벤트 입니다.
     * @param stat 변경상태
     */
    override onChange(stat :GraftRouterState) :void;
};
```

변경상태
```ts
type GraftRouterState ={
    /** 라우터 키값 */
    key :any;
    /** 전달 파라미터 */
    param :any |undefined;
    /** 대상 레이어 */
    target :any;
};
```

## bridge {#graft-api-bridge}
네이티브 연결 객체로 스크립트와 네이트간 통신 처리 합니다.
```ts
Graft.bridge ={
    /** 연결 될 네이티브 객체를 세팅 합니다. */
    native: any;

    /**
     * 네이티브에 기능 요청을 전달 하며,
     * 수행 결과를 `Promise`로 반환 받습니다.
     * @param message 기능 수행 요청 메시지 전문
     */
    postMessage(message :{
        // 수행요청 명령어
        command :string;
        // 전달 파라미터
        payload :object;
    }) :Promise<any>;

    /**
     * 네이티브에서 발생 된 이벤트를 수신할 리스너를 등록 합니다.
     * @param message 이벤트 수신 메시지
     */
    override onMessageEvent(message :{
        // 발생된 이벤트 명령어 타입
        command :string;
        // 전달 파라미터
        payload :object;
    }) :void;
};
```
