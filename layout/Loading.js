import ReactLoading from "react-loading";
import React from "react";
import styled from "styled-components";

const StyleElement = styled.div`
   & .loading{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-left: auto;
    margin-right: auto;
    position: absolute;
   }
 `;

export default function Loading() {
  const list = [
    {
      prop: "spin",
      name: "Spin",
    },
  ];

  return (
    <>
      <StyleElement style={{ textAlign: "center", alignItems: "center" }}>
        <ReactLoading
          className="loading"
          type={list.map((prop) => {
            return prop.prop;
          })}
          color="#061B34"
          height={1}
          width={50}
        />
      </StyleElement>
    </>
  );
}
