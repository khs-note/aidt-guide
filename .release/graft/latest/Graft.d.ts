/**
 * Graft JS
 * 
 * HTML에 편이 기능을 이식하여 화면작업을 쉽게 할 수 있도록 합니다.
 */
declare class Graft {
    /** 어플리케이션 초기화 */
    static init(block :(grafg: Graft) =>void) :Graft;
    /** 네이티브 이벤트 수신 */
    static postWebMessage(msg :GraftBridgePayload) :void;
    /** 네이티브 메시지 응답 수신 */
    static receiveWebMessage(msg :GraftBridgeReceive) :void;
}

declare interface Graft extends GraftExtends {
    /** 어플리케이션 초기화 */
    init(block :(grafg :Graft) =>void) :Graft;
    /** 어플리케이션 수행을 위한 고유 영역 */
    exec(block :(v :Graft) =>void) :void;

    /** 부모 객체 */
    get parent() :Graft;
    /** 환경설정 값 */
    config :GraftConfig &GraftExConfig;
    /** 어플리케이션 리소스 */
    resource :GraftResource &GraftExResource;
    /** 의존성 리소스 주입 */
    imports :GraftImports;
    /** HTML 템플릿 */
    template :GraftStringObject;
    /** 화면(view) 콜렉션 */
    view :{[k:string] :GraftElement};
    /** 로깅 객체 */
    log :GraftLog &GraftExLog;
    /** 유틸리티 */
    utils :GraftUtils &GraftExUtils;
    /** 브릿지 */
    bridge :GraftBridge &GraftExBridge;
    /** HTML 헬퍼 */
    html :GraftHtml;
    /** 태그 엘리먼트 생성 */
    tag :GraftTagMethod &GraftTagCompenion;
    /** 페이지 라우터 */
    router :GraftRouter;
};

interface GraftRouter {
    /** 라우터 초기화 :라우터의 기본값 세팅 */
    setFirst(target :any) :void;
    /** 라우터 세팅 */
    set(key :string, target :any) :void;
    /** 라우터 조회 */
    get(key? :string) :any |[string, any];
    /** 라우터 이동 처리 */
    push(key :string, param? :any) :void;

    /** 라우터 변경 이벤트 */
    override onChange(stat :GraftRouterState) :void;
};

type GraftRouterState ={
    key :any;
    param :any |undefined;
    target :any;
};

interface GraftHtml {
    /** 화면 최상위 객체 :<html> */
    page: HTMLElement |Element |null;
    /**
     * 엘리먼트 추가
     * @param child 추가 대상
     * @param target 추가 대상의 부모(디폴트: body)
     * @param befor 앞에 추가 할 경우
     */
    insert(child :GraftElement, target? :GraftElement, befor? :GraftElement) :GraftElement;
    /**
     * 엘리먼트 검색
     * @param selector 쿼리 셀렉터
     * @param target 검색 대상(디폴트: document)
     */
    query(selector :string, target? :GraftElement) :GraftElement |null;
    /**
     * 검색된 모든 엘리먼트
     * @param selector 쿼리 셀렉터
     * @param target 검색 대상(디폴트: document)
     */
    queryAll(selector :string, target? :GraftElement) :GraftElement[];
    /**
     * 스타일 룰 추가
     * @param rule 
     * @example addStyleRule('*:focus {border:.3rem dashed lightpink !important;}');
     */
    addStyleRule(...ruls :string[]);
};

interface GraftImports {
    /** 스크립트 주입 */
    script(url :string) :Promise<unknown>;
    /** 스타일시트 주입 */
    style(url :string) :Promise<unknown>;
    /** HTML 요청 */
    html(url :string) :Promise<string>;
    /** 리소스 주입 */
    resource(cfg :GraftResourceConfig, delay :number =50) :Promise<unknown>;
};

interface GraftBridge {
    /** 네이티브 객체 */
    set native(vl :GraftBridgeNative) :void;

    /** 네이티브 메시지 전송 */
    postMessage(message :GraftBridgePayload) :Promise<any>;
    /** 네이티브 메시지 수신 */
    receiveWebMessage(message :GraftBridgeReceive) :void;
    
    /** 네이티브 이벤트 수신 */
    postWebMessage(message :GraftBridgePayload) :void;
    /** 네이티브 이벤트 수신 리스너 등록 */
    override onMessageEvent(message :GraftBridgePayload) :void;
};
type GraftBridgeNative ={
    postMessage(message :string) :void;
};
type GraftBridgePayload ={
    command :string;
    payload :{[k:string] :any};
};
type GraftBridgeReceive ={
    command :string;
    receive :{[k:string] :any};
};


interface GraftUtils {
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
/**
 * @param data 데이터
 * @param next 다음 진행
 * @param error 오류 처리
 */
type GraftLazyAction =(data :any, next :(v? :any) =>void, error :(v :any) =>void) =>void;

type GraftUtilsStorage ={
    get(key? :string) :string |GraftStringObject;
    set(key :string |GraftStringObject, val :string ='') :void;
    remove(key? :string |string[]) :void;
};

// ==== log ====
interface GraftLog {
    /**
     * 로깅 설정
     * @param label 출력 라벨
     * @param debug 디버그 출력 스타일
     * @param info 출력 스타일
     */
    setting(opt :{label :string, debug :string, info :string}) :void;
    /** 로깅 객체 반환 */
    getLogger(...labels :any[]) :GraftLoggers;

    /** 중단점 설정 */
    breake(key :string) :void;
    /** 중단점 추가 */
    addBreake(...keys :string[]) :void;
    /** 중단점 키반환 */
    getBreakes() :string[];
    /** 중단점 삭제 */
    removeBreake(...keys :string[]) :void;
    /** 중단점 전체 삭제 */
    clearBreak() :void;
}
type GraftLoggers ={
    debug(...opt :any[]) :void;
    info(...opt :any[]) :void;
    warn(...opt :any[]) :void;
    error(...opt :any[]) :void;
};

interface GraftConfig {
    /** 어플리케이션 이름 */
    name :string;
    /** 버전 */
    version :string;
    /** 디버그 여부 */
    debug :boolean;
}

type GraftStringObject =Record<string, string>;

// ==== resource ====
interface GraftResource {
    /** 리소스 객체 생성 */
    getResource(cfg :GraftResourceConfig) :GraftResourceConfig;
};
type GraftResourceArray =string[] |(string[] &{add:(v: string[])=> string[]});
type GraftResourceObject =GraftStringObject &{add:(v: GraftStringObject)=> GraftStringObject};
type GraftResourceConfig ={
    /**정적 스크립트 경로 */
    js? :GraftResourceArray;
    /**스타일 시트 경로 */
    css? :GraftResourceArray;
    /**로직 스크립트 경로 */
    script? :GraftResourceArray;
    /**HTML 템플릿 경로 */
    html? :GraftResourceObject;
};

// ==== element ====
type GraftElement =HTMLElement &HTMLInputElement &{$ :GraftElementExtends};
type GraftElementExtends =GraftElementBranch |(GraftElementBranch &GraftExElementPopup);
type GraftElementBranch ={
    /** 부모 엘리먼트 */
    parent :GraftElement;
    /** 소유자 엘리먼트 */
    owner :GraftElement |undefined;
    /** TEXT 컨텐츠 */
    text :string;
    /** HTML 마크업 */
    html :string;
    /** VALUE 값 */
    value :string;
    /** vo 객체 :[data-vo] 수집 */
    vo :{[k :string]: GraftElement};
    /** HTML 템플릿 객체 :[data-template] 수집 */
    template :GraftStringObject;
    /** directive 객체 :[data-directive] 수집 */
    directive :{[k :string]: GraftElement[]};
    /** 클래스 유틸리티 */
    cls: {
        has(v :string) :boolean;
        add(...v :string[]) :GraftElementBranch.cls;
        remove(...v :string[]) :GraftElementBranch.cls;
    };

    /**
     * 엘리먼트 추가
     * @param child 추가 할 엘리먼트
     * @param befor 앞에 추가 할 경우의 대상 엘리먼트
     */
    insert(child :GraftElement, befor? :GraftElement) :GraftElement;
    /**
     * 엘리먼트 검색
     * @param selector 쿼리 셀렉터
     */
    query(selector :string) :GraftElement |null;
    /**
     * 검색된 모든 엘리먼트
     * @param selector 쿼리 셀렉터
     */
    queryAll(selector :string) :GraftElement[];
    /**
     * 이벤트 등록
     * @param type 이벤트 타입(사용자 클래스를 점('.')을 사용하여 구분)
     * @param listener 이벤트 리스너
     */
    event<K extends keyof HTMLElementEventMap>(type :K, listener :(ev: HTMLElementEventMap[K]) =>any) :void;
    /**
     * 이벤트 삭제
     * @param type 이벤트 타입
     */
    removeEvent(type :keyof HTMLElementEventMap) :void;

    /** vo 객체의 HTML 반환 */
    getHtmls() :GraftStringObject;
    /** vo 객체의 HTML 세팅 */
    setHtmls(vl :GraftStringObject) :void;
    /** vo 객체의 TEXT 반환 */
    getTexts() :GraftStringObject;
    /** vo 객체의 TEXT 세팅 */
    setTexts(vl :GraftStringObject) :void;
    /** vo 객체의 VALUE 반환 */
    getValues() :GraftStringObject;
    /** vo 객체의 VALUE 세팅 */
    setValues(vl :GraftStringObject) :void;
};

// ==== tag ====
type GraftTagMethod =(tag :keyof HTMLElementTagNameMap |HTMLElement, p1 :GraftTagParam, p2:GraftTagParam) =>GraftElement;
type GraftTagCompenion ={
    /** 디렉티브([data-directive])에 반응하는 구현부 세팅 */
    directive(name:string, block:(el:GraftElement, parent:GraftElement)=>void) :void;
    /** 엘리먼트 기능 추가 */
    decorator(block :(el :GraftElement) =>void) :void;
};
type GraftTagParam =GraftStringObject &{html:string} |((view :GraftElement) =>void);
