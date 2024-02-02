# Tag 객체
`Graft.tag`를 이용하여 DOM객체를 생성하며, 해당 객체를 관리 하는 확장 속성(`$`)을 지원 합니다.
```js
const view =app.tag('div', ...);
```

## $ 객체 기능 목록

### 속성
```ts
/** 부모 엘리먼트 */
$.parent :Element;

/** 컨텐츠 TEXT 처리 */
$.text :string;

/** HTML 마크업 처리 */
$.html :string;

/** VALUE 값 처리 */
$.value :string;

/** vo 컬렉션 */
$.vo :{[string]: GraftElement};

/** HTML 템플릿 객체 */
$.template :{[string] :string};

/** 클래스 유틸리티 */
$.cls :{
    /** 클래스 유무 */
    has(v :string) :boolean;
    /** 클래스 추가 */
    add(...v :string[]) :view.$.cls;
    /** 클래스 삭제 */
    remove(...v :string[]) :view.$.cls;
};
```

사용예

생성된 Element객체를 이용한 화면제어 샘플 입니다.
스크립트(js)와 뷰(html)의 상태값에 반응하는 속성으로 `text`,`html`,`value`등을 사용하여 입/출력을 처리 합니다. `data-vo`지시자로 선언된 객체는 `vo`객체로 취합되며,
`data-template`을 이용하여 재사용 될 HTML조각을 작성 합니다.
```html
<div id="sample">
    <div data-vo="textSample">11</div>
    <div data-vo="htmlSample"><strong>22</strong></div>
    <input data-vo="valueSample" type="text" value="33">

    <div data-template>
        <!-- tempSample 안의 내용을 검색합니다. -->
        <ul data-template="tempSample">
            <li>list item</li>
        </ul>
    </div>
</div>

<script>
    const sample =app.html.query('#sample');
    const tag =app.tag(sample);
    // vo컬렉션
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

    // 템플릿 컬렉션
    // 결과값: <li>list item</li>
    console.log(tag.template.tempSample);
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
