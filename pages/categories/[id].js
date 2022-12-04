import axios from "../api/axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const StyleElemenеntslug = styled.div`
  &.btn {
    color: white;
    background: #e93235;
    border-radius: 8px;
    padding: 12px 24px;
    color: white;
    border: none;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
  & .addbasket {
    background: #f7f8fc;
    border-radius: 8px;
    padding: 12px 24px;
    color: black;
    border: none;
    width: 100%;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
`;
export default function Detailes() {
  const [result, setResult] = useState({});
  const [basket, setBakset] = useState([]);
  const router = useRouter();

  const { likes, results } = useSelector((state) => state.like);

  useEffect(() => {
    let sbaskets = localStorage.getItem("sbaskets");
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
    let slikes = localStorage.getItem("slikes");
    setBakset(sbaskets);
    console.log("==jj==>", slikes);
    slikes = JSON.parse(slikes?.length ? slikes : "[]");
    console.log("====>", slikes);
    const data = new FormData();
    axios()
      .get("/drug/" + router.query.id + "?lan=uz")
      .then((response) => {
        const result = response?.data;
        setResult(result);
      })
      .catch();
  }, []);
  const Like = (id) => {
    let slikes = localStorage.getItem("slikes");
    console.log("==jj==>", slikes);
    slikes = JSON.parse(slikes?.length ? slikes : "[]");
    console.log("====>", slikes);
    if (
      slikes
        .map(({ id }) => {
          return id;
        })
        .includes(id)
    ) {
      const b = slikes;
      let l = [];
      b.forEach((obj) => {
        if (obj.id !== id) {
          l.push(obj);
        }
      });
      slikes = l;
      localStorage.setItem("slikes", JSON.stringify(slikes));
    } else {
      slikes = [...slikes, { id: id, count: 1 }];
      localStorage.setItem("slikes", JSON.stringify(slikes));
    }
  };

  const addBasket = (id) => {
    let sbaskets = localStorage.getItem("sbaskets");
    console.log("==jj==>", sbaskets);
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
    console.log("====>", sbaskets);

    if (
      sbaskets
        .map(({ id }) => {
          return id;
        })
        .includes(id)
    ) {
      const b = sbaskets;
      let l = [];
      b.forEach((obj) => {
        if (obj.id !== id) {
          l.push(obj);
        }
      });
      sbaskets = l;
      localStorage.setItem("sbaskets", JSON.stringify(sbaskets));
    } else {
      sbaskets = [...sbaskets, { id: id, count: 1 }];
      localStorage.setItem("sbaskets", JSON.stringify(sbaskets));
    }
  };

  return (
    <div>
      <Head>
        <title>Internet dorixona - Apotheca</title>
      </Head>
      <div className="container">
        <div className="content">
          <div style={{ margin: "30px 0px" }}>
            <span>
              <Link href="/">Asosiy sahifa</Link>
            </span>{" "}
            <span>{` > `}</span>
            <span>
              {" "}
              <Link href="/categories">Mahsulotlar katalogi</Link>
            </span>
            <span>{` > `}</span>
            <span style={{ color: "#738DA3" }}>{result.name}</span>
          </div>
          <StyleElemenеntslug>
            <div>
              <div>
                <Image
                  src=""
                  width={374}
                  height={374}
                  onError={(e) => {
                    e.target.src =
                      "https://www.svgindianmarket.com/images/thumbs/default-image_510.png";
                    // some replacement image
                  }}
                />
              </div>
              <div>
                <h5>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  >
                    Ishlab chiqaruvchi:{" "}
                  </span>
                  <span style={{ fontSize: "16px", fontWeight: "500" }}>
                    {result.name}
                  </span>
                </h5>
                <h5>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  >
                    Ishlab chiqaruvchi davlat :{" "}
                  </span>
                  <span>{}</span>
                </h5>
                <h5>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  >
                    Dori shakli :{" "}
                  </span>
                  <span></span>
                </h5>
                <h5>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  >
                    Ta'sir etuvchi modda :{" "}
                  </span>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  ></span>
                </h5>
                <h5>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  >
                    Qutidagi miqdori :{" "}
                  </span>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  ></span>
                </h5>
                <h5>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  >
                    Farmaseftik kompaniya :{" "}
                  </span>
                  <span
                    style={{
                      fontWeight: "400",
                      color: "#6f818f",
                      fontSize: "16px",
                    }}
                  ></span>
                </h5>
                <button
                  className={
                    basket
                      .map(({ id }) => {
                        return id;
                      })
                      .includes(result.id)
                      ? "addbasket"
                      : "btn"
                  }
                  onClick={() => addBasket(result.id)}
                >
                  {basket
                    .map(({ id }) => {
                      return id;
                    })
                    .includes(result.id) ? (
                    ""
                  ) : (
                    <Image
                      src="/Bag.svg"
                      width={15}
                      height={15}
                      style={{ marginRight: "10px" }}
                    />
                  )}
                  {basket
                    .map(({ id }) => {
                      return id;
                    })
                    .includes(result.id)
                    ? "Qo'shildi"
                    : "Savatga qo'shish"}
                </button>
              </div>
            </div>
          </StyleElemenеntslug>
        </div>
      </div>
    </div>
  );
}
