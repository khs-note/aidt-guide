## resource
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
