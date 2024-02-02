# Tag 객체
`Graft.tag`를 이용하여 DOM객체를 생성하며, 해당 객체를 관리 하는 확장 속성(`$`)을 지원 합니다.
```js
const view =app.tag('div', ...);
```

## $ 객체 기능 목록

### 속성
```ts
GraftElement.$ ={
    /** 부모 엘리먼트 */
    parent :Element;

    /** 컨텐츠 TEXT 처리 */
    text :string;

    /** HTML 마크업 처리 */
    html :string;

    /** VALUE 값 처리 */
    value :string;
};
```

스크립트(js)와 뷰(html) 상태값에 반응하는 속성값으로 getter / setter 기능으로 사용합니다.
```html
<div id="sample">
    <div data-vo="textSample">11</div>
    <div data-vo="htmlSample"><strong>22</strong></div>
    <input data-vo="valueSample" type="text" value="33">
</div>

<script>
    const sample =app.html.query('#sample');
    const tag =app.tag(sample);
    const {textSample, htmlSample, valueSample} =tag.$.vo;

    // 결과값: 11
    console.log(textSample.$.text);
    // 결과값: <strong>22</strong>
    console.log(htmlSample.$.html);
    // 결과값: 33
    console.log(valueSample.$.value);

    textSample.$.text ='aa';
    htmlSample.$.html ='<p>bb</p>';
    valueSample.$.value ='cc';
</script>
```

### 메소드

### getter / setter
```ts
/** 부모 엘리먼트 */
$.parent :Element
```

```ts
const view =app.tag('div', ...);

/** 부모 엘리먼트 */
view.$.parent :GraftElement;

/** 컨텐츠 TEXT 처리 */
view.$.text :string;

/** HTML 마크업 처리 */
view.$.html :string;

/** VALUE 값 처리 */
view.$.value :string;

/** vo 컬렉션 객체 */
view.$.vo :{[k :string]: GraftElement};

/** HTML 템플릿 컬렉션 객체 */
view.$.template :object;

/** 클래스 유틸리티 */
view.$.cls :{
    has(v :string) :boolean;
    add(...v :string[]) :view.$.cls;
    remove(...v :string[]) :view.$.cls;
};

/**
 * 엘리먼트 추가
 * @param child 추가 할 엘리먼트
 * @param befor 앞에 추가 할 경우의 대상 엘리먼트
 */
view.$.insert(child :GraftElement, befor? :GraftElement) :GraftElement;

/**
 * 엘리먼트 검색
 * @param selector 쿼리 셀렉터
 */
view.$.query(selector :string) :GraftElement |null;

/**
 * 검색된 모든 엘리먼트
 * @param selector 쿼리 셀렉터
 */
view.$.queryAll(selector :string) :GraftElement[];

/**
 * 이벤트 등록
 * @param type 이벤트 타입(사용자 클래스를 점('.')을 사용하여 구분)
 * @param listener 이벤트 리스너
 */
view.$.event(type :string, listener :(ev :Event) =>any) :void;

/**
 * 이벤트 삭제
 * @param type 이벤트 타입
 */
view.$.removeEvent(type :string) :void;

/** vo 객체의 HTML 반환 */
view.$.getHtmls() :object;
/** vo 객체의 HTML 세팅 */
view.$.setHtmls(vl :object) :void;
/** vo 객체의 TEXT 반환 */
view.$.getTexts() :object;
/** vo 객체의 TEXT 세팅 */
view.$.setTexts(vl :object) :void;
/** vo 객체의 VALUE 반환 */
view.$.getValues() :object;
/** vo 객체의 VALUE 세팅 */
view.$.setValues(vl :object) :void;
```