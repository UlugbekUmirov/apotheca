import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Head from "next/head";
import styled from "styled-components";
import { StyleElement } from "../index";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useRouter } from "next/router";
export default function Basket() {
  const {locale} = useRouter()
  const { baskets } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const [basket, setBakset] = useState([]);
  const [basketss, setBaksetss] = useState([]);
  useEffect(() => {
    let sbaskets = localStorage.getItem("sbaskets");
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
    setBaksetss(sbaskets);
    let urll = "/drug/?lan=uz";
    sbaskets.forEach((i) => {
      urll += "&ids[]=" + i.id;
    });
    const data = new FormData();
    axios()
      .get(urll)
      .then((response) => {
        const data = response?.data;
        const basket = Array.isArray(data) ? data : [];
        setBakset(basket);
      });
  }, []);

  const addCount = (id) => {
    let ll = [];
    basketss.forEach((obj) => {
      if (obj.id === id) {
        ll.push({ ...obj, count: obj.count + 1 });
      } else {
        ll.push(obj);
      }
      setBaksetss(ll);
    });
    //localStorage.setItem("ll", JSON.stringify(ll));
  };
  const minusCount = (id) => {
    let lllll = [];
    basketss.forEach((obj) => {
      if (obj.id === id) {
        lllll.push({
          ...obj,
          count: obj.count === 1 ? obj.count : obj.count - 1,
        });
      } else {
        lllll.push(obj);
      }
      setBaksetss(lllll);
    });
  };
  const productCount = (id) => {
    let count = 0;
    basketss.forEach((item) => {
      if (item.id === id) {
        count = item.count;
      }
    });
    return count;
  };
  //   const productCountasdsdsdasdf = () => {
  //     let sum = 0;
  //     let count = 0;
  //     baskets.forEach((item) => {
  //       item.count;
  //     });
  //     return (count += sum);
  //   };

  const removeBasket = (id) => {
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
      const newBasket = basket.filter((item) => item.id !== id);
      setBakset(newBasket);

      const b = sbaskets;
      let l = [];
      b.forEach((obj) => {
        if (obj.id !== id) {
          l.push(obj);
        }
      });
      sbaskets = l;
      localStorage.setItem("sbaskets", JSON.stringify(sbaskets));
      setBaksetss(l);
    }
  };

  const StyleElement = styled.div`
    & .basket-item {
      display: flex;
    }
    & .baskets {
      display: flex;
      justify-content: space-between;
    }
    & .basket-item {
      margin-bottom: 24px;
    }
    @media (max-width: 991px) {
      .baskets {
        display: block;
      }
    }
    @media (max-width: 768px) {
      .basket-item {
        margin-bottom: 16px;
      }
    }
    @media (max-width: 500px) {
      .basket-item {
        display: block;
      }
      .basket-img {
        margin-bottom: 24px;
      }
    }
  `;
  return (
    <div>
      <Head>
        <title>Internet dorixona - Apotheca </title>
      </Head>
      <div className="content container">
        <div style={{ margin: "30px 0px" }}>
          <span>
            <Link href="/">Asosiy sahifa</Link>
          </span>{" "}
          <span style={{ color: "#738DA3" }}>{` > `}</span>
          <span style={{ color: "#738DA3" }}>Savat</span>
        </div>
        <div style={{ margin: "30px 0", fontSize: "32px", fontWeight: "500" }}>
          Savat
        </div>
        {basketss.length === 0 ? (
          <>
            <div
              className=""
              style={{ textAlign: "center", padding: "20px 0px 30px" }}
            >
              <Image width={50} height={50} src="/bagdefault.svg" />
              <h3
                style={{ fontWeight: "500", fontSize: "24px", margin: "1rem" }}
              >
                Savat bo'sh
              </h3>
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "18px",
                  color: "#6f818f",
                }}
              >
                O‘zingizga kerakli mahsulotlarni katalogdan yoki izlash xizmati
                orqali toping
              </p>
              <Link href="/categories">
                <button
                  style={{
                    background: "#E93235",
                    borderRadius: "8px",
                    padding: "15px 74px",
                    color: "white",
                    border: "none",
                    fontWeight: "500",
                    fontSize: " 16px",
                    lineHeight: "19px",
                  }}
                >
                  Katalog
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="container">
            <StyleElement>
              <div className="baskets">
                <div className="">
                  {basket.map(
                    ({ name, Country_of_origin, Manufacturer, id }) => {
                      return (
                        <>
                          <div
                            id="basket"
                            className="basket-item"
                            style={{
                              alignItems: "center",
                              background: "#F7F8FC",
                              padding: "24px",
                              borderRadius: "16px",
                            }}
                          >
                            <Image
                              src={""}
                              width={151}
                              height={151}
                              onError={(e) => {
                                e.target.src =
                                  "https://www.svgindianmarket.com/images/thumbs/default-image_510.png"; // some replacement image
                              }}
                              className="basket-img"
                              style={{
                                borderRadius: "16px",
                                marginRight: "24px",
                              }}
                            />
                            <div>
                              <h4
                                style={{ fontWeight: "500", fontSize: "18px" }}
                              >
                                {name.length <= 45
                                  ? name
                                  : name.slice(0, 47) + "..."}
                              </h4>
                              <h5
                                style={{
                                  fontWeight: "400",
                                  fontSize: "18px",
                                  color: "#738DA3",
                                  margin: "16px 0",
                                }}
                              >
                                {Manufacturer.name}
                                {Country_of_origin.name}
                              </h5>
                              <div>
                                <div style={{ display: "flex" }}>
                                  <button
                                    onClick={() => minusCount(id)}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      alignItems: "center",
                                      display: "flex",
                                      borderRadius: "8px",
                                      marginRight: "16px",
                                      border: "none",
                                      padding: "0px",
                                      padding: "8px 8px",
                                    }}
                                  >
                                    <Image
                                      src="/minus.svg"
                                      width={16}
                                      height={2}
                                    />
                                  </button>
                                  <h4 style={{ marginRight: "16px" }}>
                                    <span style={{ fontSize: "18px" }}>
                                      {productCount(id)}
                                      ta
                                    </span>
                                  </h4>
                                  <button
                                    onClick={() => addCount(id)}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      alignItems: "center",
                                      display: "flex",
                                      borderRadius: "8px",
                                      marginRight: "16px",
                                      border: "none",
                                      padding: "0px",
                                      padding: "8px 8px",
                                    }}
                                  >
                                    <Image
                                      src="/plus.svg"
                                      width={16}
                                      height={16}
                                    />
                                  </button>
                                  <button
                                    onClick={() => removeBasket(id)}
                                    style={{
                                      width: "32px",
                                      height: "32px",
                                      alignItems: "center",
                                      display: "flex",
                                      background: "red",
                                      borderRadius: "8px",
                                      border: "none",
                                      padding: "0px",
                                      padding: "8px 8px",
                                    }}
                                  >
                                    <Image
                                      src="/delete.svg"
                                      width={16}
                                      height={16}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    }
                  )}
                </div>
                <div
                  style={{
                    background: "#F7F8FC",
                    padding: "24px",
                    borderRadius: "16px",
                    transition: "top 0.5s ease-in-out 0s",
                    width: "347px",
                    height: "324px",
                  }}
                >
                  <h3>Buyurtma tafsilotlari</h3>
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "24px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "#738DA3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      Umumiy narxi
                    </span>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#143650",
                      }}
                    >
                      {baskets.map((item) => {
                        let sum = 0;
                        return <>{console.log("item", item.count)}</>;
                      })}
                    </span>
                  </h4>
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "24px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "#738DA3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      Soni(dona)
                    </span>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#143650",
                      }}
                    >
                      Narx so'rov bo'yicha{" "}
                    </span>
                  </h4>
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "24px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "#738DA3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      Yetkazib berish xizmati{" "}
                    </span>
                    <span
                      style={{
                        fontWeight: "400",
                        fontSize: "16px",
                        color: "#143650",
                      }}
                    >
                      0 so'm
                    </span>
                  </h4>
                  <h4
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "24px 0",
                    }}
                  >
                    <span
                      style={{
                        color: "#738DA3",
                        fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      To‘lov miqdori:
                    </span>
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "#061b34",
                      }}
                    >
                      Narx so'rov bo'yicha
                    </span>
                  </h4>
                  <button
                    style={{
                      width: "100%",
                      border: "none",
                      color: "white",
                      padding: "12px",
                      background: "#143650",
                      borderRadius: "8px",
                    }}
                  >
                    Buyurtma berish
                  </button>
                </div>
              </div>
            </StyleElement>
          </div>
        )}
      </div>
    </div>
  );
}
