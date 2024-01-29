# 타입선언

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