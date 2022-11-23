import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StyleElement } from "../index";
import Image from "next/image";
import Head from "next/head";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "../api/axios";
export default function Basket() {
  const { results, likes, baskets, resultImage, count } = useSelector(
    (state) => state.like
  );
  const [basket, setBakset] = useState([]);
  useEffect(() => {
    let urll = "/drug/?lan=uz";
    baskets.forEach((i) => {
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
  const addCount = () => {
    dispatch({
      type: "SET_COUNT",
      payload: count + 1,
    });
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
      <div className="content">
        <div className="container">
          <div style={{ margin: "30px 0px" }}>
            <span>
              <Link href="/">Asosiy sahifa</Link>
            </span>{" "}
            <span style={{ color: "#738DA3" }}>{` > `}</span>
            <span style={{ color: "#738DA3" }}>Savat</span>
          </div>
          <div
            style={{ margin: "30px 0", fontSize: "32px", fontWeight: "500" }}
          >
            Savat
          </div>
          <StyleElement>
            <div className="baskets">
              <div className="">
                {basket.map(({ name, Country_of_origin, Manufacturer, id }) => {
                  return (
                    <>
                      <div
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
                          <h4 style={{ fontWeight: "500", fontSize: "18px" }}>
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
                                <Image src="/minus.svg" width={16} height={2} />
                              </button>
                              <h4 style={{ marginRight: "16px" }}>
                                <span style={{ fontSize: "18px" }}>
                                  {count} ta
                                </span>
                              </h4>
                              <button
                                onClick={addCount}
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
                                <Image src="/plus.svg" width={16} height={16} />
                              </button>
                              <button
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
                })}
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
                    1
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
      </div>
    </div>
  );
}
