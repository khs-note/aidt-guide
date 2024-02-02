## router
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
