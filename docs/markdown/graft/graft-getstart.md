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
어프리케이션에 대한 전반적인 환경값 설정 및 초기화를 수행하며, 프로젝트 전반에 사용할 객체의 별칭을 지정 할 수 있습니다.

**Graft.init**<br>
```js
// 프로젝트 전반에 사용 할 값으로 app 지정
const app= Graft.init(app=> {
    // 어플리케이션 초기화 및 설정
});
```

## Hello Graft

### 어플리케이션 구조
웹 어플리케이션 구동을 위한 파일 구조 입니다.

```shell
# 루트
/
    # 기능 라이브러리 폴더
    /libs
        /ui
            /style.css
            /ui.js
        /graft
            # Graft js 코어 라이브러리
            /graft.js
            # 어프리케이션 초기화 및 환경 설정
            /app-init.js

    # 페이지 GNB영역 모듈
    /gnb
        # 공통 헤더
        /header.html
        /header.js

    # 서비스 폴더
    /main
        # 어플리케이션 컨텐츠 영역을 컨트롤 할 스크립트
        /index.js
        # 어플리케이션 컨텐츠 영역에 대한 뷰(HTML) 템플릿
        /index.html

    # 어플리케이션 HTML
    /index.html
```

**index.html**<br>
브라우저에서 실행 되는 대상 HTML 페이지 입니다. 페이지 수행에 필요한 리소스 자원과 모듈화 된 스크립트의 자원의 배치등 기본 적인 구성 설정을 합니다.
```html
<!DOCTYPE html>
<html lang="ko-KR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Graft JS</title>
    <!-- Graft JS 스크립트 -->
    <script src="/libs/graft/graft.js"></script>
    <script src="/libs/graft/app-init.js"></script>
</head>
<body>
    <script>
    const resource =app.resource.getDefault();
    // 어플리케이션에 사용할 리소스를 추가 합니다.
    app.inject.resource({
        // 스타일 시트를 추가 합니다.
        css : resource.css,
        // 라이브러리 스크립트를 추가 합니다.
        js : resource.js,
        // 템플릿 HTML 수집 합니다.
        html: resource.html.add({
            main: '/main/index.html'
        }),
        // 비즈니스 처리를 위한 스크립트를 추가 합니다.
        script: app.resource.script.add([
            '/main/index.js',
        ]),
    })
    .then(_ =>{
        // 리소스 추가가 완료 후 호출 되며, 
        // 브라우저에서 렌더링 될 대상 추가
        // 등의 작업을 진행 합니다.

        // /gnb/header.js에서 정의된 header를 추가 합니다.
        app.html.insert(app.view.header);
        // main 컨텐츠를 추가 합니다.
        app.html.insert(app.view.main);
        // /gnb/footer.js에서 정의된 footer를 추가 합니다.
        app.html.insert(app.view.footer);
    });
    </script>
</body>
</html>
```

**/main/index.html**<br>
비즈니스를 처리 할 메인 컨텐츠를 출력할 VIEW 입니다. `data-vo`지시자를 선언 하여 스크립트를 통해 핸들링 할 수 있습니다.
```html
<!-- 메인 컨텐츠 HTML 템플릿 -->
<div class="py-5 text-center">
    <h2>index main</h2>
    <p class="lead">
        <button data-vo="btnAlert" type="button" class="btn btn-primary">Alert</button>
    </p>
</div>
```

**/main/index.js**<br>
템플릿 HTML으로 브라우저에 표현된 DOM객체를 생성 합니다. 생성된 객체에는 확장된 속성값으로 `$`가 이식되며, 뷰에 선언된 객체를 핸들링 할 수 있습니다.
```js
app.exec(_ =>{
    const view= app.view.main= app.tag('main', controller, {
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
        const {vo}= view.$;
        // 클릭이벤트
        // 뷰의 [data-vo=btnAlert] 지시자로 선언된 엘리먼트를 핸들링 합니다.
        vo.btnAlert.$.event('click', evt =>{
            alert();
        });
    }
    function initView() {
        app.log.out.debug('화면 초기화 구성...');
    }
});
```
