# Graft 시작하기


## 소개
웹 어플리케이션에 대한 사용자 인터페이스를 작성하기 위한 스크립트 입니다.
DOM 엘리먼트의 기능을 확장 하여 개발 편의 기능을 제공 합니다.

### 시작하기
HTML 문서에 `graft.min.js` 파일을 추가 후 사용합니다.
웹 어플리케이션을 작성하기 위해 전역 객체인 **Graft**를 사용합니다.

```html
<script src="graft.min.js"></script>
```

### 어플리케이션 초기화
어플리케이션에 대한 전반적인 환경값 설정 및 초기화를 수행하며, 프로젝트 전반에 사용할 객체의 별칭을 지정 할 수 있습니다.

**Graft.init**<br>
```js
// 프로젝트 전반에 사용 할 값으로 app 지정
const app= Graft.init(app=> {
    // 어플리케이션 초기화 및 설정
});
```

## Hello Graft

```html
<!DOCTYPE html>
<html lang="ko-KR">
<head>
    <script src="graft.min.js"></script>
</head>
<body>
    <header>
        <h1 data-vo="header"></h1>
    </header>
    <main data-vo="main"></main>

    <script>
    // 초기화
    const app =Graft.init();
    // Tag 객체 생성
    const view =app.tag(document.body, _ =>{
        view.$.setTexts({
            header :'Hello',
            main :'Hello, World!'
        });
    });
    </script>
<body>
```

`Graft.init`로 어플리케이션을 초기화 하며, 고차 함수를 이용해 환경 설정이 가능 합니다. `tag` 메소드를 이용해 바디를 스캔하며, 확장 기능이 이식 된 `$`객체를 이용하여 화면 또는 스크립트를 핸들링 합니다. 해당 샘플에서는 `setTexts()` 기능을 이용하여 **data-vo** 지시자로 선언된 모든 엘리먼트 객체의 TEXT값을 출력 합니다.

![hello 결과](images/markdown/graft-getstart-001.png)

## 동적 페이지
어플리케이션 구동을 위한 리소스(css, javascript)를 동적 로드가 가능합니다. 스크립트의 동적 로드를 이용한 모듈화가 가능 합니다.

### 어플리케이션 구조
```shell
# 기능 라이브러리 폴더
/libs
    /graft
        # Graft js 라이브러리
        /graft.min.js
        # 어플리케이션 초기화 및 환경 설정
        /app-init.js

# 서비스 폴더
/src
    # 페이지 GNB영역 모듈
    /gnb
        /gnb-header.html
        /gnb-header.js
    # 어플리케이션 컨텐츠 영역을 컨트롤 할 스크립트
    /index.js
    # 어플리케이션 컨텐츠 영역에 대한 뷰(HTML) 템플릿
    /index.html

# 어플리케이션 HTML
/index.html
```

### app-init.js
어플리케이션의 초기화 및 환경 값을 세팅 합니다.
```js
const app= Graft.init(app=> {
    app.resource.getDefault =_ =>{
        const js =[];
        const css =[];
        const script =[
            'src/gnb/gnb-header.js',
        ];
        const html ={
            gnbHeader: 'src/gnb/gnb-header.html',
        };

        return app.resource.getResource({js, css, script, html});
    };
});
```

### index.html
브라우저에서 실행 되는 대상 HTML 페이지 입니다. 페이지 수행에 필요한 리소스 자원과 모듈화 된 스크립트의 자원의 배치등 기본 적인 구성 설정을 합니다.
```html
<!DOCTYPE html>
<html lang="ko-KR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graft JS</title>
    <!-- Graft JS 스크립트 -->
    <script src="libs/graft/graft.min.js"></script>
    <script src="libs/graft/app-init.js"></script>
</head>
<body>
    <script>
    const resource =app.resource.getDefault();
    // 어플리케이션에 사용할 리소스를 추가 합니다.
    app.imports.resource({
        // 스타일 시트를 추가 합니다.
        css : resource.css,
        // 라이브러리 스크립트를 추가 합니다.
        js : resource.js,
        // 템플릿 HTML 수집 합니다.
        html: resource.html.add({
            main: 'src/index.html'
        }),
        // 비즈니스 처리를 위한 스크립트를 추가 합니다.
        script: app.resource.script.add([
            'src/index.js',
        ]),
    })
    .then(_ =>{
        // 리소스 추가가 완료 후 호출 되며, 
        // 브라우저에서 렌더링 될 대상 추가 등의 작업을 진행 합니다.

        // gnb-header.js에서 정의된 header를 추가 합니다.
        app.html.insert(app.view.gnbHeader);
        // main 컨텐츠를 추가 합니다.
        app.html.insert(app.view.main);
    });
    </script>
</body>
</html>
```

### src/index.html
메인 컨텐츠를 구성 할 VIEW 템플릿 입니다. `data-vo`지시자를 선언 하며, 선언된 vo 객체를 스크립트를 통해 핸들링 할 수 있습니다.
```html
<div class="py-5 text-center">
    <h2>index main</h2>
    <p class="lead">
        <button data-vo="btnAlert" type="button" class="btn btn-primary">
            Alert
        </button>
    </p>
</div>
```

### src/index.js
뷰를 컨트롤 할 스크립트 입니다. `tag`메소드를 이용하여 DOM객체를 생성 하며, 생성된 객체에는 확장 된 속성값으로 `$`가 이식 됩니다. 뷰에 선언 된 객체를 핸들링 할 수 있습니다.
```js
app.exec(_ =>{
    const view =app.view.main =app.tag('main', controller, {
        html: app.template.main,
        class: 'container',
    });
    /**
     * 화면컨트롤러
     */
    function controller() {
        // 초기화
        initView();
        // 이벤트 바인딩
        bindEventMain();
    }


    function bindEventMain() {
        // 뷰의 [data-vo] 지시자로 선언된 컨렉션 객체
        const {vo}= view.$;

        // 클릭이벤트
        vo.btnAlert.$.event('click', evt =>{
            alert();
        });
    }
    function initView() {
        app.log.out.debug('화면 초기화 구성...');
    }
});
```
