## view
어플리케이션에서 사용되는 뷰 콜렉션 입니다.
```ts
Graft::view ={};
```

외부 모듈에서 특정 뷰에 접근할 경우 `Graft::view`객체를 통해서 접근 할 수 있습니다.
```js
// tag 객체를 생성 하며, 뷰 콜렉션에 저장 합니다.
app.view.sample =app.tag('div', {
    // 템플릿을 이용하여 HTML 렌더링 처리
    html :app.template.sample,
});
```
