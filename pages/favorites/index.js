import Link from "next/link";
import { StyleElement } from "../index";
import Image from "next/image";
import Head from "next/head";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyleElementt = styled.div``;
export default function Favorites() {
  const [likes, setLikes] = useState([]);
  const [like, setLike] = useState([]);
  useEffect(() => {
    let slikes = localStorage.getItem("slikes");
    slikes = JSON.parse(slikes?.length ? slikes : "[]");
    setLikes(slikes);
    let urll = "/drug/?lan=uz";
    slikes.forEach((i) => {
      urll += "&ids[]=" + i.id;
    });
    const data = new FormData();
    axios()
      .get(urll)
      .then((response) => {
        const data = response?.data;
        const likee = Array.isArray(data) ? data : [];
        setLike(likee);
      });
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
      <main className="content">
        <div className="container">
          <div style={{ margin: "30px 0px" }}>
            <span>
              <Link href="/">Asosiy sahifa</Link>
            </span>{" "}
            <span style={{ color: "#738DA3" }}>{` > `}</span>
            <span style={{ color: "#738DA3" }}> Sevimli maxsulotlar</span>
          </div>
          <div
            style={{ margin: "30px 0", fontSize: "32px", fontWeight: "500" }}
          >
            Sevimli mahsulotlar
          </div>
          <div>
            <StyleElement>
              {likes.length === 0 ? (
                <>
                  <div
                    className=""
                    style={{ textAlign: "center", padding: "20px 0px 30px" }}
                  >
                    <Image width={50} height={50} src="/favoritedefault.svg" />
                    <h3
                      style={{
                        fontWeight: "500",
                        fontSize: "24px",
                        margin: "1rem",
                      }}
                    >
                      Sevimli mahsulotlarga hozircha hech narsa qo‘shilmagan
                    </h3>
                    <p
                      style={{
                        fontWeight: "400",
                        fontSize: "18px",
                        color: "#6f818f",
                      }}
                    >
                      Mahsulotlar katalogi orqali sevimli mahsulotlaringizni
                      qo‘shing
                    </p>
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
                      Katalogga o'tish
                    </button>
                  </div>
                </>
              ) : (
                <div className="cards">
                  {like.map(({ name, Country_of_origin, Manufacturer, id }) => {
                    /*  */
                    let sbaskets = localStorage.getItem("sbaskets");
                    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
                    /*  */
                    let slikes = localStorage.getItem("slikes");
                    slikes = JSON.parse(slikes?.length ? slikes : "[]");
                    console.log("likes", slikes);
                    return (
                      <div
                        className={
                          sbaskets
                            .map(({ id }) => {
                              return id;
                            })
                            .includes(id)
                            ? "card-item addshadow"
                            : "card-item"
                        }
                      >
                        <Image
                          src={""}
                          width={130}
                          height={130}
                          onError={(e) => {
                            e.target.src =
                              "https://www.svgindianmarket.com/images/thumbs/default-image_510.png";
                            // some replacement image
                          }}
                        />
                        <div>
                          <h5>
                            {Manufacturer.name}
                            {Country_of_origin.name}
                          </h5>
                          <h4>
                            {name.length <= 45
                              ? name
                              : name.slice(0, 47) + "..."}
                          </h4>
                          <button
                            className={
                              sbaskets
                                .map(({ id }) => {
                                  return id;
                                })
                                .includes(id)
                                ? `addbasket`
                                : "btn"
                            }
                            onClick={() => addBasket(id)}
                          >
                            {sbaskets
                              .map(({ id }) => {
                                return id;
                              })
                              .includes(id) ? (
                              ""
                            ) : (
                              <Image
                                src="/Bag.svg"
                                width={15}
                                height={15}
                                style={{ marginRight: "10px" }}
                              />
                            )}

                            {sbaskets
                              .map(({ id }) => {
                                return id;
                              })
                              .includes(id)
                              ? "Qo'shildi"
                              : "Savatga qo'shish"}
                          </button>
                          <i
                            style={{ fontSize: "20px" }}
                            className={
                              slikes
                                .map(({ id }) => {
                                  return id;
                                })
                                .includes(id)
                                ? `fa fa-heart like`
                                : "far fa-heart"
                            }
                            onClick={() => Like(id)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </StyleElement>
          </div>
        </div>
      </main>
    </div>
  );
}
