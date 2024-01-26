type GraftExtends ={
    /** 팝업 엘리먼트 생성 */
    popup?(tag :keyof HTMLElementTagNameMap, p1 :GraftTagParam, p2:GraftTagParam) :GraftElement;
};

/** 설정 확장 기능 */
type GraftExConfig ={};

type GraftExResource ={};

/** 로그 확장 기능 */
type GraftExLog ={};

/** 팝업 기능 */
type GraftExElementPopup ={};

/** 유틸리티 확장 */
type GraftExUtils ={};

/** 브릿지 기능 확장 */
type GraftExBridge ={
    /** 데이터 저장 */
    setData?(key :string, value :string) :Promise<void>;
    /** 데이터 읽기 */
    getData?(key :string) :Promise<string>;
    /** 키패드 오픈 */
    showKeypad?() :Promise<string>;
};