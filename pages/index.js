import Head from "next/head";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import { FreeMode, Navigation, Thumbs, Pagination, Autoplay } from "swiper";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "./api/axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styled from "styled-components";
import { useTranslation } from "next-i18next";
export const StyleElement = styled.div`
  & .swiper-slide {
    font-size: 18px;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    // margin-bottom: 60px;
    margin: 60px 0px;
  }
  & .swiper-button-next {
    background-image: url("/arrowLight.svg");
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    width: 48px;
    height: 48px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    align-items: center;
    background-color: white;
  }

  & .swiper-button-next::after {
    display: none;
  }
  & .swiper-slide-prev .slider1,
  .swiper-slide-next .slider1,
  .swiper-slide-prev .slider2,
  .swiper-slide-next .slider2,
  .swiper-slide-next .slider1 sapn,
  .swiper-slide-next .slider2 span,
  .swiper-slide-next .slider1 h1,
  .swiper-slide-next .slider2 h1,
  .swiper-slide-next .slider1 h1 span,
  .swiper-slide-next .slider2 h1 span,
  .swiper-slide-next .slider1 button,
  .swiper-slide-next .slider2 button {
    background-color: #f7f8fc;
    background-image: none;
    border-radius: 32px;
    color: #f7f8fc !important;
  }
  .swiper-slide-prev .slider1,
  .swiper-slide-next .slider1 {
    color: #f7f8fc;
  }
  & .swiper-button-prev {
    background-image: url("/Arrowright.svg");
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    width: 48px;
    height: 48px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  & .slider2 {
    margin-top: 50px;
  }

  & .swiper-button-prev {
    position: absolute;
    top: 50%;
    left: 10%;
  }

  & .swiper-button-next {
    position: absolute;
    top: 50%;
    right: 10%;
  }
  & .swiper-button-prev::after {
    display: none;
  }
  & .slider1 {
    width: 100%;
    height: auto;
    border-radius: 32px;
    background: linear-gradient(
          87deg,
          rgb(247, 248, 252) 43%,
          rgba(255, 255, 255, 0) 65%
        )
        right center no-repeat,
      url("/slider 1.png");
    background-position: right center;
    background-repeat: no-repeat;
    positsion: relative;
  }
  & .slider2 {
    background-image: url("slider 1.png");
    layout: responsive;
    height: auto;

    positsion: relative;
  }

  .slider1 h1,
  .slider2 h1 {
    color: #23272b;
    width: 35%;
    font-weight: 700;
    font-size: 48px;
    line-height: 150%;
    margin-left: 8%;
    margin-top: 8%;
  }
  & .batafsil-btn {
    padding: 16px 30px;
    border: none;
    background-color: #e93235;
    border-radius: 8px;
    color: white;
    margin-left: 8%;
    margin-top: 30px;
    margin-bottom: 114px;
  }
  & .facility {
    display: flex;
    margin-bottom: 100px;
  }
  .facility-item h2 {
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    color: #143650;
    margin: 24px 0px 16px 0px;
  }
  .facility-item p {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #738da3;
  }
  .facility-item h2,
  .facility-item p,
  .facility-item {
    text-align: center;
  }
  & .facility-image {
    padding: 32px 40px 42px 35px;
    background-color: #f7f8fc;
    border-radius: 50%;
  }

  & .card-item {
    min-width: calc(25% - 24px);
    width: calc(25% - 24px);
    padding: 16px;
    position: relative;
    border-radius: 16px;
    filter: none;
    height: 309px;
    margin: 12px;
  }
  .addshadow {
    box-shadow: rgba(0, 0, 0, 0.06) 0px 5px 15px 0px;
  }
  & .category-item {
    min-width: 200px;
    width: 200px;
    margin: 12px;
    text-align: center;
  }
  & .category-item p {
    text-align: center;
    margin: 16px 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
  }
  & .category-item .category-image {
    padding: 19px;
    background: #f7f8fc;
    border-radius: 50%;
  }
  & .cards {
    display: flex;
    overflow-x: scroll;
  }
  & .card-item h5 {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #6f818f;
    height: 30px;
    margin: 10px 0px 0px;
  }
  & .card-item h4 {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #23272b;
    height: 48px;
    line-height: 150%;
    margin: 8px 0px;
  }
  & .card-item .btn {
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
  & .cards::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  & .fa-heart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
  }

  & .action {
    width: 100%;
    height: 100%;
    background: linear-gradient(
          87deg,
          rgb(247, 248, 252) 43%,
          rgba(255, 255, 255, 0) 65%
        )
        right center no-repeat,
      url(/image-2.svg);
    background-position: right center;
    background-repeat: no-repeat;
    border-radius: 32px;
    padding: calc(50px);
  }
  & .action h2 {
    font-weight: 700;
    font-size: 36px;
    line-height: 150%;
    width: 50%;
  }
  & .action button {
    padding: 16px 30px;
    background: #e93235;
    color: white;
    border: none;
    border-radius: 8px;
  }
  & .export-profile {
    display: flex;
    align-items: center;
  }
  & .export-profile Image {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  & .export-profile span {
    color: #6f818f;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
  }
  & .thought {
    background-color: white;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 60px;
  }

  & .slider-title {
    margin: 0;
  }
  & .swiper-pagination-bullet-active {
    background-color: #d11b27 !important;
  }
  & .vakansiya span {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #6f818f;
  }
  & .vakansiya-title {
    font-weight: 400;
    font-size: 36px;
    line-height: 160%;
    margin: 32px 0px;
  }
  & .vakansiya-number p {
    font-weight: 500;
    font-size: 36px;
    line-height: 160%;
    color: #e93235;
  }
  & .vakansiya-number span {
    font-weight: 400;
    font-size: 20px;
    color: #6f818f;
  }
  & .mapouter {
    position: relative;
    text-align: right;
    width: 100%;
  }
  & .gmap_canvas {
    overflow: hidden;
    background: none !important;
  }
  & .gmap_iframe {
    height: 474px !important;
  }
  & .contacts {
    width: 100%;
  }
  & .map {
    display: flex;
  }
  & .btn {
    color: white;
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
  & .like {
    color: red;
    box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.06);
    padding: 10px;
    border-radius: 50%;
    transition: all 0.3s ease 0s;
  }

  & .fa-heart {
    transition: all 0.3s ease 0s;
  }
  & .far {
    color: #738da3;
    transition: all 0.3s ease 0s;
  }
  @media (max-width: 1200px) {
    .card-item .btn {
      font-size: 15px;
      padding: 12px 1px;
    }
  }
  @media (max-width: 1100px) {
    .card-item {
      min-width: calc(33.3333% - 24px);
    }
    .action h2 {
      font-size: 25px;
    }
  }
  @media (max-width: 991px) {
    .slider1 h1 {
      font-size: 28px;
    }
    .vakansiya-image {
      display: none;
    }
    .vakansiya-title {
      font-size: 24px;
    }
    .map {
      display: block;
    }
    .mapouter {
      width: 100%;
    }
    .contacts {
      padding: 0 !important;
    }
    .footer-contacts span {
      font-size: 18px !important;
    }
  }

  @media (max-width: 800px) {
    .card-item {
      min-width: calc(50% - 24px);
    }
  }
  @media (max-width: 768px) {
    .action {
      background-image: none;
      background-color: #f7f8fc;
      background-position: right center;
      background-repeat: no-repeat;
      border-radius: 20px;
      padding: calc(20px + 3vw);
    }
    .action h2 {
      font-size: 20px;
      width: 100%;
    }
    & .action button {
      padding: 16px 30px;
      background: #e93235;
      color: white;
      border: none;
      border-radius: 8px;
      width: 100%;
    }
    .slider2,
    .slider1 {
      background-image: none;
      background-color: rgb(247, 248, 252);
    }
    .slider1 h1 {
      width: 90%;
      margin: 20px;
    }
    .batafsil-btn{
    margin:10px;
     width:90%
    }
  }
  @media (max-width: 500px) {
    .card-item {
      min-width: calc(100% - 24px);
    }
    .slider1 {
      margin: 0;
      padding: 20px;
    }
    .slider1 h1 {
      width: 100%;
    }
    .swiper-slide-prev h1 {
      width: 100%;
    }
    .swiper-slide-prev {
      margin: 0;
      padding: 20px;
    }
  }
`;
export default function Home() {
  const { t } = useTranslation("common", { keyPrefix: "home" });
  const [views, setViews] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [category, setCategory] = useState([]);
  const [basketss, setBaksetss] = useState([]);
  const [likee, setLikee] = useState([]);
  const { results } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = new FormData();
    axios()
      .get("/category/?lan=uz")
      .then((response) => {
        const data = response?.data;
        const categoryy = Array.isArray(data) ? data : [];
        setCategory(categoryy);
      });

    axios()
      .get("/drug/?per_page=6")
      .then((response) => {
        const data = response?.data?.results;
        const results = Array.isArray(data) ? data : [];
        dispatch({
          type: "SET_RESULTS",
          payload: results,
        });
        const iterator = data.values();
        for (const value of iterator) {
          const results = value;
          results.Image.map((e) => {
            const resultImage = e.image;
            dispatch({
              type: "SET_IMAGE",
              payload: resultImage,
            });
          });
        }
      })
      .catch(() => console.log("err"));
  }, []);

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
      setLikee(l);
    } else {
      slikes = [...slikes, { id: id, count: 1 }];
      localStorage.setItem("slikes", JSON.stringify(slikes));
      setLikee(slikes);
    }
  };

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
      setBaksetss(l);
    } else {
      sbaskets = [...sbaskets, { id: id, count: 1 }];
      localStorage.setItem("sbaskets", JSON.stringify(sbaskets));
      setBaksetss(sbaskets);
    }
  };

  return (
    <div>
      <Head>
        <title>Internet dorixona - Apotheca</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/Group.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossorigin="anonymous"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
          crossorigin="anonymous"
        ></link>
        {/* icon */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <StyleElement>
        <main className="content">
          <div className="swiper">
            <Swiper
              slidesPerView={1.28}
              spaceBetween={50}
              centeredSlides={true}
              navigation={true}
              loop={true}
              thumbs={{ swiper: thumbsSwiper }}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Thumbs, FreeMode]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="slider1">
                  <h1>
                    Ваш <span style={{ color: "#E93235" }}>первый шаг</span> к
                    активному долголетию
                  </h1>
                  <Link href="/categories">
                    <button className="batafsil-btn">
                      {t("sliderbutton")}
                    </button>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slider1">
                  <h1>
                    Ваш
                    <span style={{ color: "#E93235" }}>первый шаг</span> к
                    активному долголетию
                  </h1>
                  <Link href="/categories">
                    <button className="batafsil-btn">
                      {t("sliderbutton")}
                    </button>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="container">
            <div className="facility row">
              <div className="facility-item col-12  col-md-6 col-lg-4">
                <Image
                  src="/icons-1.svg"
                  className="facility-image"
                  width={145}
                  height={145}
                />
                <h2>{t("facilityh2__1")}</h2>
                <p>{t("facilityp")}</p>
              </div>
              <div className="facility-item col-12  col-md-6 col-lg-4">
                <Image
                  src="/icons-2.svg"
                  className="facility-image"
                  width={145}
                  height={145}
                />
                <h2>{t("facilityh2__2")}</h2>
                <p>{t("facilityp")}</p>
              </div>
              <div className="facility-item col-12  col-md-6 col-lg-4">
                <Image
                  src="/icons-3.svg"
                  className="facility-image"
                  width={145}
                  height={145}
                />
                <h2>{t("facilityh2__3")}</h2>
                <p>{t("facilityp")}</p>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginBottom: "30px" }}>
            <h2>{t("vibr")}</h2>
            <div className="cards">
              {results.map(
                ({ name, Country_of_origin, Manufacturer, id, slug }) => {
                  let sbaskets = localStorage.getItem("sbaskets");
                  sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
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
                      <Link href={"/categories/" + slug} key={slug}>
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
                        <h5>
                          {Manufacturer.name}
                          {Country_of_origin.name}
                        </h5>
                        <h4>
                          {name.length <= 45 ? name : name.slice(0, 47) + "..."}
                        </h4>
                      </Link>
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
                          ? t("addbasket2")
                          : t("addbasket")}
                      </button>
                      <i
                        style={{
                          fontSize: "20px",
                          transition: "all 0.3s ease 0s",
                        }}
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
                  );
                }
              )}
            </div>
          </div>
          <div className="container">
            {/*    <h2>Oxirgi ko'rilganlar</h2> */}
            <div className="cards">
              {/* {views.map(({ Country_of_origin, Manufacturer, name, id }) => {
                return (
                  <>
                    <div className="card-item">
                      <Image
                        src={""}
                        width={130}
                        height={130}
                        onError={(e) => {
                          e.target.src =
                            "https://www.svgindianmarket.com/images/thumbs/default-image_510.png"; // some replacement image
                        }}
                      />
                      <h5>
                        {Manufacturer.name}
                        {Country_of_origin.name}
                      </h5>
                      <h4>
                        {name.length <= 45 ? name : name.slice(0, 47) + "..."}
                      </h4>
                      <button
                        className={baskets?.includes(id) ? `addbasket` : "btn"}
                        onClick={() => addBasket(id)}
                      >
                        {baskets?.includes(id) ? (
                          ""
                        ) : (
                          <Image
                            src="/Bag.svg"
                            width={15}
                            height={15}
                            style={{ marginRight: "10px" }}
                          />
                        )}

                        {baskets?.includes(id)
                          ? "Qo'shildi"
                          : "Savatga qo'shish"}
                      </button>
                      <i
                        style={{ fontSize: "20px" }}
                        className={
                          likes?.includes(id)
                            ? `fa fa-heart like`
                            : "far fa-heart"
                        }
                        onClick={() => Like(id)}
                      ></i>
                    </div>
                  </>
                );
              })} */}
            </div>
          </div>
          <div className="container">
            <div className="action">
              <h2>{t("actiontitle")}</h2>
              <Link href="/categories">
                <button>{t("actionbutton")}</button>
              </Link>
            </div>
          </div>
          <div className="container">
            <h2 style={{ margin: "40px 0px" }}>{t("Ommabop")}</h2>
            <div className="cards">
              {console.log("category", category)}
              {category.map(({ name }) => {
                return (
                  <>
                    <div className="category-item">
                      <Image
                        src={""}
                        width={91}
                        height={91}
                        className="category-image"
                        onError={(e) => {
                          e.target.src =
                            "https://www.svgindianmarket.com/images/thumbs/default-image_510.png"; // some replacement image
                        }}
                      />
                      <p>{name}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div style={{ backgroundColor: "#F7F8FC", padding: "80px 0px" }}>
            <div className="container">
              <h2 style={{ margin: "0px 0px 40px 0px" }}>{t("thought")}</h2>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                navigation={false}
                modules={[Pagination, Autoplay, Navigation]}
                className="mySwiper slider"
              >
                <SwiperSlide className="slider-one">
                  <div className="thought">
                    <div className="export-profile">
                      <Image src="/Rectangle 50.svg" width={60} height={60} />
                      <div>
                        <h5 className="slider-title">Jakob Kenter</h5>
                        <span>24.09.20</span>
                      </div>
                    </div>
                    <p className="">
                      Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                      сгенерировать несколько абзацев более менее осмысленного
                      текста рыбы на русском языке, а начинающему оратору. Сайт
                      рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                      сгенерировать несколько.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slider-one">
                  <div className="thought">
                    <div className="export-profile">
                      <Image
                        src="/Rectangle 51 (1).svg"
                        width={60}
                        height={60}
                      />
                      <div>
                        <h5 className="slider-title">Jakob Kenter</h5>
                        <span>24.09.20</span>
                      </div>
                    </div>
                    <p className="">
                      Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                      сгенерировать несколько абзацев более менее осмысленного
                      текста рыбы на русском языке, а начинающему оратору. Сайт
                      рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                      сгенерировать несколько абзацев, более менее осмысленного
                      текста рыбы на русском языке, а начинающему оратору.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slider-one">
                  <div className="thought">
                    <div className="export-profile">
                      <Image src="/Rectangle 51.svg" width={60} height={60} />
                      <div>
                        <h5 className="slider-title">Jakob Kenter</h5>
                        <span>24.09.20</span>
                      </div>
                    </div>
                    <p className="">
                      Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру
                      сгенерировать несколько абзацев более менее осмысленного
                      текста рыбы на русском языке, а начинающему оратору. Сайт
                      рыбатекст поможет дизайнеру, верстальщику.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slider-one">
                  <div className="thought">
                    <div className="export-profile">
                      <Image src="/Rectangle 50.svg" width={60} height={60} />
                      <div>
                        <h5 className="slider-title">Jakob Kenter</h5>
                        <span>24.09.20</span>
                      </div>
                    </div>
                    <p className="">
                      Образовательная платформа №1 по качеству обучения. Вы
                      получите знания, которые помогут вам освоить профессию
                      мечты и изменить жизнь. Образовательная платформа №1 по
                      качеству обучения. Вы получите знания, которые помогут вам
                      освоить профессию мечты и изменить жизнь.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slider-one">
                  <div className="thought">
                    <div className="export-profile">
                      <Image src="/Rectangle 50.svg" width={60} height={60} />
                      <div>
                        <h5 className="slider-title">Jakob Kenter</h5>
                        <span>24.09.20</span>
                      </div>
                    </div>
                    <p className="">
                      Образовательная платформа №1 по качеству обучения. Вы
                      получите знания, которые помогут вам освоить профессию
                      мечты и изменить жизнь. Образовательная платформа №1 по
                      качеству обучения. Вы получите знания, которые помогут вам
                      освоить профессию мечты и изменить жизнь.
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="container">
            <div
              className=""
              style={{
                padding: "60px 0px 40px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div className="vakansiya">
                <span style={{ letterSpacing: "5px" }}>— {t("vakansiyi")}</span>
                <p className="vakansiya-title">{t("vakansiyititle")}</p>
                <div style={{ display: "flex" }}>
                  <div
                    className="vakansiya-number"
                    style={{ marginRight: "50px" }}
                  >
                    <p>{`>100`}</p>
                    <span>{t("vakansiya__1")}</span>
                  </div>
                  <div className="vakansiya-number">
                    <p>{`>20`}</p>
                    <span>{t("vakansiya__1")}</span>
                  </div>
                </div>
              </div>
              <div className="vakansiya-image">
                <Image src="/Group 9.svg" width={600} height={600} />
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#F5F6F6" }}>
            <div className="container">
              <div className="map">
                <div class="mapouter">
                  <div class="gmap_canvas">
                    <iframe
                      class="gmap_iframe"
                      width="100%"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      src="https://maps.google.com/maps?width=494&amp;height=474&amp;hl=en&amp;q=University of Oxford&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                    <a href="https://mcpenation.com/">Minecraft Website</a>
                  </div>
                </div>
                <div
                  className="contacts"
                  style={{ padding: "60px 40px", marginBottom: "10px" }}
                >
                  <h2>{t("contact__2")}</h2>
                  <div className="footer-contacts">
                    <a href="tel:+998998715668">
                      <Image
                        style={{ margin: "12px" }}
                        src="/Frame 10100.svg"
                        width={48}
                        height={48}
                      />
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "400",
                          alignItems: "center",
                        }}
                      >
                        +998 99 871-56-68
                      </span>
                    </a>
                    <div className="footer-contacts">
                      <Image
                        style={{ margin: "12px" }}
                        src="/Frame 10100 (1).svg"
                        width={48}
                        height={48}
                      />
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "400",
                          alignItems: "center",
                        }}
                      >
                        info@apotheca.uz
                      </span>
                    </div>
                    <a
                      href="https://t.me/apothecauz"
                      className="footer-contacts"
                    >
                      <Image
                        style={{ margin: "12px" }}
                        src="/Frame 10100 (2).svg"
                        width={48}
                        height={48}
                      />
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "400",
                          alignItems: "center",
                        }}
                      >
                        @apothecauz
                      </span>
                    </a>
                    <div className="footer-contacts">
                      <Image
                        style={{ margin: "12px" }}
                        src="/Frame 10100 (3).svg"
                        width={48}
                        height={48}
                      />
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "400",
                          alignItems: "center",
                        }}
                      >
                        24/7
                      </span>
                    </div>
                    <div
                      style={{ display: "flex" }}
                      className="footer-contacts"
                    >
                      <Image
                        style={{ margin: "12px" }}
                        src="/Frame 10100 (4).svg"
                        width={48}
                        height={48}
                      />
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "400",
                          alignItems: "center",
                        }}
                      >
                        {t('lokatsiya')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </StyleElement>
    </div>
  );
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
