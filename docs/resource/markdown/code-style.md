# 타입선언 {#code-style-types}

## 값
값의 형(type)은 원시형과 참조형으로 구분됩니다.

### 원시형
원시형은 값을 직접 조작 하며, `const`를 사용하면 변경 할 수 없습니다.

> string, number, boolean, null, undefined
```js
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```

### 참조형
참조형은 값의 참조를 통해 조작 하며, `const` 사용 시 선언값은 조작 할수 없지만 참조를 통한 변경이 가능합니다.

> object, array, function
```js
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```

## 참조(References)
모든 참조는 `const`를 사용합니다. `var` 또는 `let`를 사용하지 않습니다.
변수에 참조값을 재할당 할 수 없게 함으로 불변성을
유지 하여 버그로 이어지는 코드를 방지 합니다.
```js
// bad
var a = 1;
var b = 2;

// good
const a = 1;
const b = 2;
```

재할당 해야 할일이 존재 하면 `let`을 사용 합니다.
`var`의 함수스코프를 취하는 것 보다는 블록스코프를 취하는 `let`이 더 낫습니다.
```js
// bad
var count = 1;
if (true) {
    count += 1;
}

// good, use the let.
let count = 1;
if (true) {
    count += 1;
}
```

`let` 과 `const` 는 둘 다 블록 스코프를 사용합니다.
```js
// const와 let은 선언된 블록 안에서만 존재합니다.
{
    let a = 1;
    const b = 1;
}
console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

# 객체(Objects) {#code-style-object}
객체를 생성할 때는 리터럴 문법을 사용합니다.
```js
// bad
const item = new Object();

// good
const item = {};
```

동적 속성을 갖는 객체를 생성할 때는 계산식 표현법을 사용합니다.
```js
function getKey(k) {
    return `a key named ${k}`;
}

// bad
const obj = {
    id: 5,
    name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
};
```

객체의 단축 구분을 사용합니다.
```js
const lukeSkywalker = 'Luke Skywalker';

// bad
const atom = {
    value: 1,

    lukeSkywalker: lukeSkywalker
    addValue: function (value) {
        return atom.value + value;
    },
};

// good
const atom = {
    value: 1,

    lukeSkywalker,
    addValue(value) {
        return atom.value + value;
    },
};
```

속성의 단축구문은 객체 선언의 시작 부분에 모아줍니다.
어떤 속성이 단축구문을 사용하고 있는지 알기 쉽게 해줍니다.
```js
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

유효하지 않은 식별자에만 따옴표 속성을 사용합니다.
가독성이 좋아지며, 많은 자바스크립트 엔진이 쉽게 최적화 할 수 있습니다.
```js
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```

# 배열(Arrays) {#code-style-array}
배열을 생성할 때 리터럴 구문을 사용합니다.
```js
// bad
const items = new Array();

// good
const items = [];
```

배열을 복사할 때는 스프레드 연산자(...)를 사용 합니다.
```js
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

배열같이 취급되는 객체(array-like)를 배열로 변환할 때는 Array.from을 사용합니다.
```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```

배열이 여러 줄에 걸쳐 있다면 배열을 연 이후와 닫기 이전에 줄바꿈을 합니다.
```js
// bad
const arr = [
    [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
    id: 1,
}, {
    id: 2,
}];

const numberInArray = [
    1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
    {
        id: 1,
    },
    {
        id: 2,
    },
];

const numberInArray = [
    1,
    2,
];
```

# 분해할당(Destructuring) {#code-style-destructuring}
하나의 오브젝트에서 복수의 프로퍼티에 접근 할 때는 분해할당을 이용합니다.
분해할당을 이용함으로 프로퍼티에 대한 임시적인 참조 작성을 줄일 수 있습니다.
```js
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(obj) {
  const {firstName, lastName} = obj;
  return `${firstName} ${lastName}`;
}
```

배열의 분해 할당을 사용하여 조금 더 의미 있는 명칭을 사용 합니다.
```js
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

복수의 값을 반환하는 경우 배열이 아닌 객체의 구조화 대입을 사용 합니다.
객체를 사용함으로 새로운 프로퍼티의 추가 삭제에 대한 순서에 영향을 받지 않습니다.
```js
// bad
function processInput(input) {
  return [left, right, top, bottom];
}

// 호출처에서 반환된 데이터의 순서를 고려할 필요가 있습니다.
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  return {left, right, top, bottom};
}

// 호출처에서는 필요한 데이터만 선택하면 됩니다.
const {left, right} = processInput(input);
```

# 문자열(Strings) {#code-style-strings}
문자열에는 싱글쿼트(`''`) 를 사용합니다.
```js
// bad
const name = "Capt. Janeway";

// good
const name = 'Capt. Janeway';
```

100문자 이상의 문자열은 문자열 연결을 사용해서 복수행에 걸쳐 기술할 필요가 있습니다.
주의: 문자연결을 과용하면 성능에 영향을 미칠 수 있습니다.
```js
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// good
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';
```

프로그램에서 문자열을 생성하는 경우는 template strings를 이용합니다.
템프릿 문자열의 경우 문자 치환기능과 적절한 줄바꿈 기능으로 가독성이 좋습니다.
```js
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

# 함수(Functions) {#code-style-functions}

함수식 보다 함수선언을 이용합니다. 이름이 부여된 함수 선언은 콜스택에서 추적이 가능 하도록 합니다.
```js
// bad
const foo = function () {
};

// good
function foo() {
}
```

함수이외의 블록(if나 while같은)에서 함수를 선언하지 않습니다. 함수선언은 block 단위 범위상태가 아닙니다.
```js
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```

함수 스코프에 전달되는 `arguments`객체를 사용하지 않습니다.
나머지 연산자(`...`)를 사용하여 사용하고자 하는 파라미터를 명확히 할수 있으며,
전달되는 타입이 객체인 `arguments`와 다르게 나머지 연산자는 배열을 사용합니다.
```js
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

함수의 파라미터를 변이시키는 것보다 default 파라미터를 이용합니다.
파라미터 변이에 대한 미묘한 버그를 방지할 수 있습니다.
```js
// bad
function handleThings(opts) {
  // 논리연산자 트리거로 인해 false 인경우 실제 값임에도
  // 객체로 변이 되는 버그 발생
  opts = opts || {};
  // ...
}

// bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

default 파라미터는 뒤쪽에 배치 합니다.
```js
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

새 함수 사용할 때는 함수 리터럴 문법을 사용합니다.
Function constructor를 사용하는 경우 eval() 과 같은 수준의 취약점을 일으킬 수 있습니다.
```js
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');

// good
var add = (a, b) =>{
    return a + b;
};
```

## 화살표 함수

함수식을 사용하는 경우 화살표 함수를 사용합니다.
함수(`function`)가 가지고 있는 내부 기능으로 `this`와 `arguments`객체를 가지고 있지 않아
통상 기대하고 있는 대로 동작하며 구분이 보다 간결합니다.
```js
// bad
[1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
});

// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
```

함수의 본체가 하나의 식으로 구성된 경우에는 중괄호({})를 생략 가능합니다.
그 외에는 return 문을 이용 합니다.
복수의 함수가 연결된 경우에 읽기 쉬워집니다.
```js
// good
[1, 2, 3].map(number => `A string containing the ${number}.`);

// bad
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map(number => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});
```

식이 복수행에 걸쳐있을 경우는 가독성을 더욱 좋게하기 위해 소괄호()로 감싸 주세요.
함수의 개시와 종료부분이 알기쉽게 보이기 때문입니다.
```js
// bad
[1, 2, 3].map(number => 'As time went by, the string containing the ' +
  `${number} became much longer. So we needed to break it over multiple ` +
  'lines.'
);

// good
[1, 2, 3].map(number => (
  `As time went by, the string containing the ${number} became much ` +
  'longer. So we needed to break it over multiple lines.'
));
```

함수의 인수가 하나인 경우 소괄호()를 생략하는게 가능합니다.
```js
// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].reduce((y, x) => x + y);
```

# 이터레이터 {#code-style-iterators}

문법적 루프(for-in, for-of) 대신 `map()`과 `reduce()`와 같은 고차함수를 사용합니다.
사이트 이펙트에 대한 예측보다는 불변(immutable)인 순수함수를 다루는 편이 좋습니다.
```js
const numbers = [1, 2, 3, 4, 5];

// bad
let sum = 0;
for (let num of numbers) {
  sum += num;
}

sum === 15;

// good
let sum = 0;
numbers.forEach((num) => sum += num);
sum === 15;

// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```

# 변수와 프로퍼티 {#code-style-variables}

프로퍼티에 접근하는 경우는 점 `.`을 사용 합니다.
```js
const luke = {
  jedi: true,
  age: 28,
};

// bad
const isJedi = luke['jedi'];

// good
const isJedi = luke.jedi;
```

변수를 사용해 프로퍼티에 접근하는 경우는 대괄호 [] 를 사용 합니다.
```js
const luke = {
  jedi: true,
  age: 28,
};

function getProp(prop) {
  return luke[prop];
}

const isJedi = getProp('jedi');
```

변수를 선언 할 때는 항상 const 를 사용해 주십시오.
그렇게 하지 않으면 글로벌 변수로 선언됩니다.
글로벌로 선언될 경우 namespace 를 오염시키 수 있습니다.
```js
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

`const`를 그룹화하고 다음에 `let`을 그룹화 합니다.
이전에 할당한 변수에 대해 나중에 새 변수를 추가하는 경우에 유용합니다.
```js
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

변수를 할당 할 때는 필요하고 합리적인 장소에서 사용합니다.
변수의 라이프 주기는 짧을 수록 좋으며,
`let`과 `const`는 함수스코프가 아닌 블록스코프를 사용합니다.
```js
// good
function() {
    test();
    console.log('doing stuff..');

    //..other stuff..

    const name = getName();

    if (name === 'test') {
        return false;
    }

    return name;
}

// bad - unnecessary function call
// 필요없는 함수 호출
function(hasName) {
    const name = getName();

    if (!hasName) {
        return false;
    }

    this.setFirstName(name);

    return true;
}

// good
function(hasName) {
    if (!hasName) {
        return false;
    }

    const name = getName();
    this.setFirstName(name);

    return true;
}
```

# 호이스팅 {#code-style-hoisting}
함수와 변수의 선언은 항상 컨택스트 범위의 상단으로 보이지 않게 이동 합니다.

## 함수선언
함수선언은 함수명과 함수본체가 호이스팅 됩니다.
```js
function example() {
    superPower(); // => Flying

    function superPower() {
        console.log('Flying');
    }
}
```

## 함수의 할당
함수가 할당되기 전 변수가 호이스팅 되며 함수의 본체는 호이스팅 되지 않습니다.
```js
function example() {
    console.log(anonymous); // => undefined

    anonymous(); // => TypeError anonymous is not a function

    var anonymous = function() {
        console.log('anonymous function expression');
    };
}
```

# 조건식 {#code-style-equality}

`if`문과 같은 조건식은 강제형변환으로 평가됩니다.
다음과 같은 심플한 룰을 따릅니다.

* **객체**는 true로 평가됩니다.
* **undefined**는 false로 평가됩니다.
* **null**은 false로 평가됩니다.
* **부울값** 은 boolean형의 값 으로 평가됩니다.
* **넘버**는 true로 평가됩니다. 하지만 **+0**, **-0**, or **NaN** 의 경우는 false 입니다.
* **문자열**은 true 로 평가됩니다. 하지만 빈문자 **''** 의 경우는 false 입니다.

```js
if ([0]) {
    // 배열은 객체로 true 로 평가됩니다.
}
```

# 블록 {#code-style-blocks}

복수행의 블록에는 중괄호 ({}) 를 사용 합니다.
```js
// bad
if (test)
    return false;

// good
if (test) return false;

// good
if (test) {
    return false;
}

// bad
function() { return false; }

// good
function() {
    return false;
}
```

복수행 블록의 if 와 else 를 이용하는 경우 else 는 if 블록 끝의 중괄호(})와 같은 행에 위치시켜 줍니다.
```js
// bad
if (test) {
  thing1();
  thing2();
}
else {
  thing3();
}

// good
if (test) {
  thing1();
  thing2();
} else {
  thing3();
}
```

# 콤마와 세미콜론 {#code-style-commas}

선두에 콤마를 사용하지 않습니다.
```js
// bad
const story = [
    once
  , upon
  , aTime
];

// good
const story = [
  once,
  upon,
  aTime,
];

// bad
const hero = {
    firstName: 'Ada'
  , lastName: 'Lovelace'
  , birthYear: 1815
  , superPower: 'computers'
};

// good
const hero = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  birthYear: 1815,
  superPower: 'computers',
};
```

세미콜론을 사용하여 문장의 끝을 표기합니다.
```js
// bad
(function() {
  const name = 'Skywalker'
  return name
})()

// good
(() => {
  const name = 'Skywalker';
  return name;
})();
```

# 명명규칙 {#code-style-naming}

이름으로 부터 의도가 읽혀질 수 있도록 합니다.
```js
// bad
function q() {
  // ...stuff...
}

// good
function query() {
  // ..stuff..
}
```

객체와 함수 그리고 인스턴스에는 카멜케이스(camelCase)를 사용합니다.
```js
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}

// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

private 프로퍼티명은 선두에 언더스코어(`_`) 를 사용 합니다.
```js
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';

// good
this._firstName = 'Panda';
```

내부함수는 선두에 언더스코어(`_`) 를 사용 합니다.
```js
function foo() {
    // bad
    function bar() {}

    // good
    function _bar() {}
}
```

객체에 접근이 필요한 메소드의 경우 `getVal()`이나 `setVal('hello')`를 사용합니다.
```js
// bad
dragon.age();

// good
dragon.getAge();

// bad
dragon.age(25);

// good
dragon.setAge(25);
```

프로퍼티의 값이 boolean인 경우 `isVal()`이나 `hasVal()`를 사용합니다.
```js
// bad
if (!dragon.age()) {
  return false;
}

// good
if (!dragon.hasAge()) {
  return false;
}
```
