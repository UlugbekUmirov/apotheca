import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "../api/axios";
import Image from "next/image";
import styled from "styled-components";
import { StyleElement } from "..";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Link from "next/link";
const Categories = styled.div`
  & .accordion {
    width: 275px;
    background-color: #f7f8fc;
    outline: white solid 1px;
    border-radius: 16px;
    padding: 16px 0px 16px 0;
  }
  & .accordion-item {
    border: none;
  }
  & .accordion-button:focus {
    z-index: 3;
    border-color: white;
    outline: 0;
    box-shadow: white !important;
    color: black !important;
  }
  & .accardion-button:focus::after {
    color: black;
  }
  & .accordion-button {
    margin: 0px !important;
    background-color: #f7f8fc;
    padding: 0;
    margin: 7.5px 0px;
    padding: 0px 16px;
  }
  & .accardion-header .name {
    font-size: 15px;
    font-weight: 500;
    margin: 5px 0px;
  }
  & .accordion-body {
    padding: 0 !important;
  }

  & .card-items {
    min-width: calc(25% - 24px);
    padding: 16px;
    position: relative;
    border-radius: 16px;
    filter: none;
    height: 309px;
    margin: 12px;
  }
  & .card-items h5 {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #6f818f;
    height: 30px;
    margin: 10px 0px 0px;
  }
  & .card-items h4 {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #23272b;
    height: 48px;
    line-height: 150%;
    margin: 8px 0px;
  }
  & .card-items .btn {
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
  .cardds {
    align-self: flex-start;
    display: flex;
    flex-wrap: wrap;
    margin: -12px 0px 0px;
    margin-left: 12px;
  }
  & .categoryyyy {
    align-self: stretch;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0px 0px 50px;
  }
  & .right-categories {
    align-self: flex-start;
    border-radius: 16px;
    position: sticky;
    top: 184px;
    transition: top 0.5s ease-in-out 0s;
    width: 275px;
  }
  & .right-categories__scroll {
    align-self: flex-start;
    border-radius: 16px;
    position: sticky;
    top: 84px;
    transition: top 0.5s ease-in-out 0s;
    width: 275px;
  }
  & .cardd {
    border-radius: 16px;
    height: 331px;
    margin: 12px;
    min-width: calc(33.3333% - 24px);
    padding: 16px;
    position: relative;
    width: calc(33.3333% - 24px);
  }

  @media (max-width: 1200px) {
    .cardd {
      min-width: calc(50% - 24px);
      width: calc(50% - 24px);
    }
  }

  @media (max-width: 900px) {
    .cardd {
      min-width: calc(100% - 24px);
      width: calc(100% - 24px);
    }
  }
  @media (max-width: 768px) {
    & .accordion {
      width: 100%;
      background-color: #f7f8fc;
    }
    .cardds {
      margin: 0px;
      width: 100%;
    }
    .categoryyyy {
      flex-direction: column;
    }
    .cardd {
      min-width: calc(50% - 24px);
      width: calc(50% - 24px);
    }
    .right-categories__scroll {
      position: static;
      width: 100%;
    }
    .right-categories {
      width: 100%;
      margin: 0px;
    }
  }
  @media (max-width: 576px) {
    .cardd {
      min-width: calc(100% - 24px);
      width: calc(100% - 24px);
    }
  }
`;
function BasicExample() {
  const { t } = useTranslation("common", { keyPrefix: "catalog" });
  const [category, setCategory] = useState([]);
  const [categoriesresult, setCategoriesresult] = useState([]);
  const [likee, setlike] = useState([]);
  const [sbasket, setSbasket] = useState([]);
  const [scrol, setScrol] = useState(false);
  useEffect(() => {
    let positionn = window.pageYOffset;
    console.log("window", window.pageYOffset);
    window.addEventListener("scroll", () => {
      const currentPositionn = window.pageYOffset;
      if (positionn < currentPositionn) {
        setScrol(true);
      } else {
        setScrol(false);
      }
      positionn = currentPositionn;
    });

    axios()
      .get("/category/?lan=uz")
      .then((response) => {
        const data = response?.data;
        const categoryy = Array.isArray(data) ? data : [];
        setCategory(categoryy);
      });

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const category_id = params.category_id ? parseInt(params.category_id) : "";
    axios()
      .get(
        "drug/?per_page=9&page=1&lan=uz" +
          (category_id ? "&category[]=" + category_id : "")
      )
      .then((response) => {
        const data = response?.data?.results;
        const resultss = Array.isArray(data) ? data : [];
        setCategoriesresult(resultss);
      })
      .catch();
  }, []);
  const addBasket = (id) => {
    let sbaskets = localStorage.getItem("sbaskets");
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
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
      setSbasket(l);
    } else {
      sbaskets = [...sbaskets, { id: id, count: 1 }];
      localStorage.setItem("sbaskets", JSON.stringify(sbaskets));
      setSbasket(sbaskets);
    }
  };
  const Like = (id) => {
    let slikes = localStorage.getItem("slikes");
    slikes = JSON.parse(slikes?.length ? slikes : "[]");
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
      setlike(l);
    } else {
      slikes = [...slikes, { id: id, count: 1 }];
      localStorage.setItem("slikes", JSON.stringify(slikes));
      setlike(slikes);
    }
  };
  const className = scrol ? "right-categories__scroll " : " right-categories ";
  return (
    <div className="content container">
    <Head>
        <title>{t("title")}-Apotheca</title>
      </Head>
      <div style={{ margin: "30px 0px" }}>
        <span>
          <Link href="/">{t("home")}</Link>
        </span>{" "}
        <span style={{ color: "#738DA3" }}>{` > `}</span>
        <span style={{ color: "#738DA3" }}>{t('catalog')}</span>
      </div>
      <div style={{ margin: "30px 0", fontSize: "32px", fontWeight: "500" }}>
      {t('catalog')}
      </div>
      <Categories>
        <div className="categoryyyy">
          <Accordion defaultActiveKey="0" className="accordion">
            <div className={className}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 16px",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: "500", fontSize: "16px" }}>
                  {t('filter')}
                </span>
                <span
                  style={{
                    color: "#FF6B03",
                    fontWeight: "400",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {t('filterclear')}
                </span>
              </div>
              <hr style={{ color: "#738DA3" }} />
              <span style={{ padding: "0px 16px", fontWeight: "500" }}>
                {t('catalog')}
              </span>
              {category.map(({ name, id, childs }) => {
                return (
                  <>
                    <li style={{ listStyleType: "none" }}>
                      <Accordion.Item eventKey={id} aria-expanded="false">
                        <Accordion.Header
                          layout="responsive"
                          className="accardion-header"
                        >
                          <div className="name">{name}</div>
                        </Accordion.Header>
                        <Accordion.Body style={{ background: "#f7f8fc" }}>
                          {childs.map(({ description }) => {
                            return (
                              <div style={{ padding: "10px 16px" }}>
                                <Image
                                  width={20}
                                  height={20}
                                  src="/Pathh.svg"
                                  style={{
                                    marginRight: "10px",
                                    alignItems: "center",
                                    marginBottom: "2.5px",
                                  }}
                                />
                                <span>{description}</span>
                              </div>
                            );
                          })}
                        </Accordion.Body>
                      </Accordion.Item>
                    </li>
                  </>
                );
              })}
            </div>
          </Accordion>
          <StyleElement className="cardds">
            {categoriesresult.map(
              ({ name, Country_of_origin, Manufacturer, id }) => {
                let sbaskets = localStorage.getItem("sbaskets");
                sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
                let slikes = localStorage.getItem("slikes");
                slikes = JSON.parse(slikes?.length ? slikes : "[]");
                return (
                  <div
                    className={
                      sbaskets
                        .map(({ id }) => {
                          return id;
                        })
                        .includes(id)
                        ? "card-items cardd addshadow"
                        : "card-items cardd"
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
                        {Manufacturer?.name ?? ""}
                        {Country_of_origin?.name ?? ""}
                      </h5>
                      <h4>
                        {name.length <= 45 ? name : name.slice(0, 47) + "..."}
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
                          ? (t('addbasket2'))
                          : t('addbasket')}
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
              }
            )}
          </StyleElement>
        </div>
      </Categories>
    </div>
  );
}

export default BasicExample;
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
