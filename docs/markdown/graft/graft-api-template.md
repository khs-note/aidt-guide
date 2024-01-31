## template
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
