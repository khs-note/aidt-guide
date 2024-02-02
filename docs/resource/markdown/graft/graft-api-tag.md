## tag
확장된 기능의 태그 엘리먼트 객체([GraftElement](#graft-tag))를 생성 합니다.
```ts
/**
 * @param tagName 생성 태그명
 * @param prop 엘리먼트 속성값
 * @param children 서브 엘리먼트
 * @param controller 태그를 핸들링 할 함수
 */
Graft.tag(
    tagName :string,
    prop? :{[string] :string},
    children? :Element[],
    controller? :() =>void
) :GraftElement;
```

사용예
```js
// tag 생성 시 HTML 마크업을 추가 하고 싶은 경우
// prop의 html 속성값을 이용합니다.
const view =app.tag('main', controller, {
    html: `<div>main content</div>`,
    class: 'container',
});

// 화면컨트롤러
function controller() {
    // 초기화
    initView();
    // 이벤트 바인딩
    bindEvent();
}
function bindEvent();
function initView();
```

### 동반객체
`tag()`함수의 정적 함수로 반환되는 `GraftElement`인스턴스에 사용자 정의 기능을 추가 합니다.

#### directive
사용자 정의 지시자(**data-directive**)에 반응하는 기능을 설정 합니다.
```ts
Graft.tag.directive(
    // 디렉티브명
    name :string,
    // 선언한 디렉티브에 반응할 함수 블록
    block :(el:GraftElement, parent:GraftElement)=>void
) :void;
```

사용예
```html
<!-- 사용자 정의 디렉티브 선언 -->
<button data-directive="toggle">토글버튼</button>

<!-- 토글 버튼 액션 정의 -->
<script>
app.tag.directive('toggle', el =>{
    el.$.event('click.toggle', _ =>{
        if(el.style.color =='red') {
            el.style.color ='black';
        } else {
            el.style.color ='red';
        }
    });
});
</script>
```

#### decorator
`GraftElement` 인스턴스에 기능을 추가 하고 싶을 경우 사용합니다.
```ts
Graft.tag.decorator(
    /**
     * tag함수로 GraftElement 생성시 호출되는 함수
     * @param {GraftElement} el 생성된 객체
     */
    block :(el :GraftElement) =>void
) :void;
```

사용예
```js
app.tag.decorator(el =>{
    // 화면 노출 처리를 위한 함수를 추가 확장 합니다.
    el.$.show = ()=>{
        el.style.display ='block';
    };

    // 화면 숨김 처리를 위한 함수를 추가 확장 합니다.
    el.$.hide = ()=>{
        el.style.display ='none';
    };
});

// view의 확장 객체 $에 기본 기능에
// 추가적으로 show, hide 메소드가 추가 됩니다.
const view =app.tag('div', {
    style :'display:none;',
});
view.$.show();
```
