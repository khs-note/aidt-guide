# 객체와 배열

## 객체(Objects)
객체를 생성할 때는 리터럴 문법을 사용하세요.
```js
// bad
const item = new Object();

// good
const item = {};
```

동적 속성을 갖는 객체를 생성할 때는 속성 계산명을 사용하세요.
객체의 모든 속성을 한 곳에서 정의할 수 있습니다.
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

속성의 단축구문은 객체 선언의 시작 부분에 모아주세요.
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

유효하지 않은 식별자에만 따옴표 속성을 사용하세요.
가독성이 좋아지며, 많은 자바스크립트 엔진이 더 쉽게 최적화 할 수 있습니다.
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

## 배열(Arrays)
배열을 생성할 때 리터럴 구문을 사용하세요.
```js
// bad
const items = new Array();

// good
const items = [];
```

배열을 복사할 때는 스프레드 연산자(...)를 사용하세요.
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

객체를 배열로 변환할 때는 Array.from을 사용하세요.
```js
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };

// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike);
```

배열이 여러 줄에 걸쳐 있다면 배열을 연 이후와 닫기 이전에 줄바꿈을 해주세요.
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
