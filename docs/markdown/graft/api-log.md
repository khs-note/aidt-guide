## log
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
