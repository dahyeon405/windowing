### 소개

화면에 보이는 요소만 렌더링함으로써 성능 개선에 도움을 줄 수 있는 리액트 컴포넌트입니다.

다음과 같이 react-window를 사용하면서 느낀 불편한 점들을 개선하였습니다.

- 내부 스크롤이 생기지 않는 방식으로 구현하였습니다. react-window는 List 내부에 스크롤이 생겨 이 스크롤 위치를 감지하나, 본 컴포넌트에서는 스크롤 타겟 요소를 지정해줄 수 있습니다.
- List 내부의 Item 컴포넌트에 props를 넘겨줄 수 있습니다.

---

<br>

### 사용법

```jsx
<FixedSizeList scrollTarget={window} top={0} itemHeight={300} itemData={data} overscanCount={2}>
  <Item newprops={newprops} />
</FixedSizeList>
```

- `scrollTarget`: 스크롤 타겟 요소
- `top`: 스크롤 타겟 요소 내에서 `List`의 y축 위치
- `itemHeight`: 아이템의 높이
- `itemData`: 렌더링 시 사용할 배열 형태의 데이터
- `overscanCount`: 위 아래로 추가로 렌더링할 요소의 개수
