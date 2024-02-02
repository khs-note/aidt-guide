## init
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
