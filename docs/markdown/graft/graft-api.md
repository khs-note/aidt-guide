# Graft API 기능 정의

## 기능 목록
### 속성

[**inject**](#graftinject): 어플리케이션 구동에 필요한 리소스를 추가 합니다.

[**cfg**](#graftcfg): 어플리케이션의 환경값을 설정 합니다.

[**log**](#graftlog): 로그를 출력 합니다.

[**template**](#graftview): HTML 템플릿이 저장 되는 공간 입니다.

[**view**](#graftview): 모듈화된 DOM객체를 관리 합니다.

[**resource**](#graftresource): 리소스 디폴트값을 세팅 합니다.

[**html**](#grafthtml): HTML 핸들링 객체 입니다.

[**util**](#graftutil): 유틸리티

[**bridge**](#graftbridge): 네이티브 연결 객체 입니다.


### 메소드

[**exec**](#graftexec): 즉시 실행 함수로 독립 컨텍스트 구간을 제공합니다.

[**tag**](#grafttag): 태그 엘리먼트 객체(DOM)를 생성합니다.

### 정적메소드

[**init**](#graftinit): 어플리케이션 초기화 함수 입니다.

postWebMessage: 네이티브의 이벤트 수신을 위한 함수 입니다. [브릿지](./graft-bridge.md) 참고.

receiveWebMessage: 네이티브로 전송한 메시지에 대한 응답 수신을 위한 함수 입니다. [브릿지](./graft-bridge.md) 참고.

## 정적메소드

### Graft.init
어플리케이션 초기화 함수 입니다.

```js
/**
 * 초기화 함수로 생성된 인스턴스를 반환 합니다.
 * @param {(Graft) =>void} block 초기화 구현 함수
 * @returns {Graft}
 */
Graft.init(block);

/**@example */
const app =Graft.init(graft =>{
});
```

## 속성

### Graft.inject
어플리케이션 구동에 필요한 리소스를 추가 합니다.

```ts
Graft.inject ={
    // 스크립트를 추가합니다.
    script(url :string) :Promise;
    // 스타일시트를 추가합니다.
    style(url :string) :Promise;
    // HTML을 요청합니다.
    html(url :string) :Promise;
    // 리소스를 추가합니다.
    resource(cfg :GraftResourceConfig) :Promise;
};
type GraftResourceConfig ={
    /**정적 스크립트 경로 */
    js? :GraftResourceArray;
    /**스타일 시트 경로 */
    css? :GraftResourceArray;
    /**로직 스크립트 경로 */
    script? :GraftResourceArray;
    /**HTML 템플릿 경로 */
    html? :GraftResourceObject;
};
```

### Graft.cfg
```ts
Graft.cfg ={
    // 어플리케이션 이름
    name :string,
    // 버전정보
    version :string,
    // 디버그 여부
    debug :boolean,
};
```

### Graft.log
로그를 출력을 위한 객체를 생성 합니다.

```ts
Graft.log ={
    // 콘솔 출력을 위한 스타일을 설정 합니다.
    setting(opt :{
        // 콘솔에 출력 될 라벨 정보
        label :string,
        // 콘솔에 출력될 스타일로 CSS의 형태로 작성
        info :string
        // 디버그 레벨 출력 스타일
        debug :string,
    }) :void;

    // 로깅 객체 반환
    getLogger(...labels :any[]) :GraftLoggers;
}:
type GraftLoggers ={
    debug(...opt :any[]) :void;
    info(...opt :any[]) :void;
    warn(...opt :any[]) :void;
    error(...opt :any[]) :void;
};
```

### Graft.view
모듈화된 DOM객체가 저장된 공간으로 `Graft.tag`를 이용하여 생성 합니다.

```js
app.view.viewName =Graft.tag('div', controller, {
    html: Graft.template.viewName
});
function controller() {
    // DOM객체 생성시 호출 되며,
    // 화면 구현에 대한 내용을 작성합니다.
}
```

### Graft.resource
[Graft.inject](#graftinject) 에서 사용하는 리소스 설정값을 얻어 올때 사용합니다.

```ts
Graft.resource ={
    // 리소스 객체를 재구성 하여 반환 합니다.
    getResource(cfg :GraftResourceConfig) :GraftResourceConfig;
};
type GraftResourceConfig ={
    /**정적 스크립트 경로 */
    js? :Array<string>;
    /**스타일 시트 경로 */
    css? :Array<string>;
    /**로직 스크립트 경로 */
    script? :Array<string>;
    /**HTML 템플릿 경로 */
    html? :Object<string, string>;
};
```

### Graft.html
HTML 처리를 수행하는 도우미 객체로 엘리먼트의 검색 및 추가 등의 기능을 처리 합니다.

[GraftElement 타입 참고](./graft-tag.md)

```ts
Graft.html ={
    // 최상위 객체로 <html>을 의미 합니다.
    page :HTMLElement |null;

    /**
     * 엘리먼트를 삽입합니다.
     * @param child 삽입 서브 객체
     * @param target 삽입 대상이 되는 객체 (디폴트 :BODY)
     * @param befor 앞쪽에 삽일 할 경우 대상이 되는 객체
     * @returns 삽입 된 서브 객체(target) 반환
     */
    insert(child :GraftElement, target? :GraftElement, befor? :GraftElement) :GraftElement;

    /**
     * 엘리먼트를 검색 합니다.
     * @param selector 검색 쿼리 셀렉터
     * @param target 지정된 영역에서 검색 할 경우
     * @returns 검색 엘리먼트 반환
     */
    query(selector :string, target? :GraftElement) :GraftElement |null;

    /**
     * 엘리먼트들 검색, 검색 결과를 배열로 반환 합니다.
     * @param selector 검색 쿼리 셀렉터
     * @param target 지정된 영역에서 검색 할경우
     * @returns 검색 엘리먼트 목록 반환
     */
    queryAll(selector :string, target? :GraftElement) :GraftElement[];

    /**
     * 스타일을 추가 합니다.
     * @param ruls 스타일 룰을 콤마(,)로 구분하여 작성
     * @example
     *     addStyleRule('*:focus {border:.3rem dashed lightpink !important;}');
     */
    addStyleRule(...ruls :Array<string>);
};
```

### Graft.util
유틸리티

```ts
Graft.util ={
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
    lazy :{
        /** 지연 등록여부 */
        contains(key :any) :boolean;
        /** 지연 대기를 활성화 합니다. */
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
        any(values: Promise[]) :Promise<any[]>;
        /** 비동기 패턴 */
        race(values: Promise[]) :Promise<any[]>;
        /** 비동기 순회 처리 */
        iterable(actions :GraftLazyAction[]) :Promise<any>;
    };
};

type GraftUtilsStorage ={
    /** 데이터 게터 */
    get(key? :string) :string |object;
    /** 데이터 세터 */
    set(key :string |object, val :string ='') :void;
    /** 데이터 삭제 */
    remove(key? :string |string[]) :void;
};
```

### Graft.bridge
네이티브 연결 객체로 스크립트와 네이트간 통신 처리 합니다.

```ts
Graft.bridge ={
    /** 연결 될 네이티브 객체 */
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

## 메소드

### Graft.exec
스크립트 실행 상의 독립적인 공간을 제공합니다. 모듈화된 스크립트에서 `exec`의 고차함수를 이용하여 구현부 작성시 사용합니다.

```js
app.exec(_ =>{
    // 비즈니스 로직 구현부...
});
```

### Graft.tag
태그 엘리먼트 객체(DOM)를 생성 하며, DOM객체를 핸들링 할 수 있는 확장된 객체(`$`)를 제공 합니다.<br>
[태그 관리자](./graft-tag.md) 참고.

```js
// 태그를 생성 하며, 태그 생성시 주입된 함수를 이용하여 view영역을 핸들링 합니다.
// <div id="tag-id"></div>
const view =app.tag('div', controller, {id:'tag-id'});

// view영역 컨트롤 함수
function controller() {
    view.$.html ='<p>hello graft...</p>';
}
```

**tag 동반객체**<br>

directive<br>
뷰의 지시자(`data-directive`)에 반응하는 사용자 정의 기능을 설정 합니다.
```ts
tag.directive(
    // 디렉티브명
    name :string,
    // 선언한 디렉티브에 반응할 함수 블록
    block :(el:GraftElement, parent:GraftElement)=>void
) :void;
```

구현예
```html
<button data-directive="toggle">토글버튼</button>
<script>
Graft.tag.directive('toggle', el =>{
    if(el.style.color =='red') {
        el.style.color ='black';
    } else {
        el.style.color ='red';
    }
});
</script>
```

decorator<br>
tag() 함수로 생성된 DOM 인스턴스에 사용자 정의 기능을 추가 합니다.
```ts
tag.decorator(
    block :(el :GraftElement) =>void
) :void;
```

구현예
```js
app.tag.decorator(el =>{
    el.$.show = ()=>{
        el.style.display ='block';
    };
    el.$.hide = ()=>{
        el.style.display ='none';
    };
});

const view =app.tag('div', {
    style :'display:none;',
});
view.$.show();
```
