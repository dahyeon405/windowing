import FixedSizeList from "./lib/components/FixedSizeList/FixedSizeList.tsx";
import Item from "./Item.tsx";

function App() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(i);
  }

  const sampleProp = "can pass props!";

  return (
    <div className="App">
      <FixedSizeList scrollTarget={window} top={0} itemHeight={100} itemData={data} overscanCount={10}>
        <Item sampleProp={sampleProp} />
      </FixedSizeList>
    </div>
  );
}

export default App;
