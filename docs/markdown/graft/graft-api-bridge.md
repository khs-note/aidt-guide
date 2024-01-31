## bridge
네이티브 연결 객체로 스크립트와 네이트간 통신 처리 합니다.
```ts
Graft.bridge ={
    /** 연결 될 네이티브 객체를 세팅 합니다. */
    native: any;

    /**
     * 네이티브에 기능 요청을 전달 하며,
     * 수행 결과를 `Promise`로 반환 받습니다.
     * @param message 기능 수행 요청 메시지 전문
     */
    postMessage(message :{
        // 수행요청 명령어
        command :string;
        // 전달 파라미터
        payload :object;
    }) :Promise<any>;

    /**
     * 네이티브에서 발생 된 이벤트를 수신할 리스너를 등록 합니다.
     * @param message 이벤트 수신 메시지
     */
    override onMessageEvent(message :{
        // 발생된 이벤트 명령어 타입
        command :string;
        // 전달 파라미터
        payload :object;
    }) :void;
};
```
