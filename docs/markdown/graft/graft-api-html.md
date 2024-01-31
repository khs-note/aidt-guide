## html
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