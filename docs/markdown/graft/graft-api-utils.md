## utils
유틸리티
```ts
Graft.utils ={
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
    lazy :GraftLazy;

    /** 오류 스택 */
    error(message :string, name? :string) :Error;
    /** 값 복사 */
    clone(vl :any) :any;
};
```

스토리지 객체
```ts
type GraftUtilsStorage ={
    get(key? :string) :string |GraftStringObject;
    set(key :string |GraftStringObject, val :string ='') :void;
    remove(key? :string |string[]) :void;
};
```

비동기 객체
```ts
interface GraftLazy {
    /** 지연키 등록여부 */
    contains(key :any) :boolean;
    /** 지연 활성화 */
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
    any(values: Promise[]) :Promise<any>;
    /** 비동기 패턴 */
    race(values: Promise[]) :Promise<any>;
    /** 비동기 순회 */
    iterable(actions :GraftLazyAction[]) :Promise<any>;
};

type GraftLazyAction=(
    data :any,
    next :(v? :any) =>void,
    error :(v :any) =>void
) =>void;
```
