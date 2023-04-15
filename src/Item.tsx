import React from "react";

export default function Item({ index, sampleProp }: { index: number; sampleProp: string }) {
  return (
    <div
      style={{
        height: "100px",
        backgroundColor: "antiquewhite",
        borderRadius: "10px",
        fontSize: "18px",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      Item: {index}
      <br></br>
      {sampleProp}
    </div>
  );
}
