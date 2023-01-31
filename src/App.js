import FixedSizeList from "./lib/components/FixedSizeList.tsx";
import Item from "./Item.tsx";

function App() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(i);
  }

  return (
    <div className="App">
      <FixedSizeList scrollTarget={window} top={0} itemHeight={200} itemData={data} overscanCount={2}>
        <Item />
      </FixedSizeList>
    </div>
  );
}

export default App;
