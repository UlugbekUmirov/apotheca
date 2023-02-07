import Image from "next/image";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import InputMask from "react-input-mask";
import axios from "../pages/api/axios";
import Link from "next/link";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import Language from "./Language";
export const Navbar = styled.div`
  & nav {
    padding: 24px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }
  & .nav-right {
    align-items: center;
    display: flex;
  }
  & a {
    text-decoration: none;
    color: black;
    font-size: 18px;
  }
  & .calling {
    display: none;
  }
  & .nav-right button {
    margin: 0px 24px;
    border-radius: 8px;
    padding: 12px 14px;
    border: 1px solid #061b34;
    background-color: white;
  }
  & .navbarscrolltrue {
    top: -100px;
    position: fixed;
    transition: all 0.5s ease-in-out 0s;
    width: 100%;
    z-index: 4;
  }
  & .navbarscrollfalse {
    position: fixed;
    border-bottom: none;
    top: 0px;
    transition: all 0.5s ease-in-out 0s;
    width: 100%;
    z-index: 4;
  }
  & .dropdown-toggle::after {
    border: 0;
  }
  & #button {
    background-color: #061b34;
    font-size: 15px;
    font-weight: 500;
    padding: 10px;
    display: flex;
    align-items: center;
  }
  & .dropdown-toggle::before {
    background-image: url("/Group 10092.svg");
    content: "";
  }
  & .search-input2 {
    border: none;
    padding: 10px 0px 10px 24px;
    outline: none;
    width: 100%;
    border-radius: 8px;
  }

  & .search-input2::placeholder {
    color: black;
    font-weight: 500;

    color: #061b34;
  }
  & .search-input {
    border: none;
    padding: 10px 0px 10px 24px;
    outline: none;
    width: 100%;
    border-radius: 8px;
  }
  & .search-btn {
    align-items: center;
  }
  & .search-input::placeholder {
    color: black;
    font-weight: 500;
    color: #061b34;
  }
  & .search-btn {
    background-color: white;
    border: none;
    padding-right: 25px;
    border-radius: 8px;
  }
  & form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0px 24px;
    background-color: white;
    border-radius: 8px;
    transition: all 0.5s ease-in-out 0s;
  }
  & .bag-icons {
    padding: 10px;
    background-color: #143650;
    display: flex;
    align-items: center;
    border-radius: 50%;
    margin: 2px 0px;
    margin-right: 16px;
  }
  & .bag-title {
    display: flex;
    align-items: center;
    margin-right: 24px;
  }
  & .search-btn__after {
    margin: 0px 8px;
    display: none;
    text-align: end;
    width: 100%;
  }
  & Navbar {
    transition: all 0.5s ease-in-out 0s;
  }
  & .scrollimgtrue {
    height: 0px;
    margin: 0px;
    transform-origin: left center;
    transition-timing-function: ease-in-out;
    min-width: 0px !important;
    width: 0px !important;
  }
  & .scrollimgfalse {
    height: 52px;
    margin: 0px 24px 0px 0px;
    transform-origin: left center;
    transition-timing-function: ease-in-out;
    min-width: 56px !important;
    width: 56px !important;
  }
  & .trans5 {
    transition: 0.5s;
  }
  & .navbarbottom {
    background: #f7f8fc;
    padding: 14px 0px;
  }
  & .react-datalist-input__textbox {
    border: 1px solid white;
    outline: white solid 1px;
  }
  & .favoritescount {
    -webkit-box-align: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid rgb(255, 255, 255) !important;
    bottom: -4px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    max-height: 20px;
    min-width: 20px;
    padding: 3px;
    position: absolute;
    font-size: 11px;
    font-weight: 500;
    left: 20px;
    background-color: red;
    color: white;
  }
  .dropdownbtn {
    display: inline-block;
  }
  .dropdownbtn {
    -webkit-box-align: center;
    align-items: center;
    border-radius: 8px;
    display: flex;
    height: 51px;
    margin: 0px;
    padding: 0px 24px;
    transition: box-shadow 0.4s ease 0s;
    white-space: nowrap;
  }

  @media (max-width: 992px) {
    .bag-title {
      display: none;
    }
    .katalog-title {
      display: none;
      margin: 0px 0px -2px;
    }
    .catalogtext {
      display: none;
    }
    .dropdownbtn {
      padding: 10px;
      height: 45px;
    }
  }

  @media (max-width: 768px) {
    .nav-right a {
      display: none;
    }
  }
  @media (max-width: 576px) {
    .nav-right button {
      display: none;
    }
    .calling {
      display: block;
      margin: 0px 15px;
    }
    & .search-btn__after {
      display: block;
    }
    & .form1 {
      display: none;
    }
  }
`;
const defaultOptions = {
  isMulti: false,
  isSearchable: false,
  styles: {
    control: (styles) => ({
      ...styles,
      border: "none",
      display: "flex",
    }),
    options: (styles) => ({
      color: "black",
    }),
    indicatorSeparator: (styles) => ({
      color: "none",
    }),
    menu: (styles) => ({ ...styles, borderRadius: "12px" }),
    dropdownIndicator: (styles) => ({
      padding: 0,
      displey: "flex",
      alignItems: "center",
      margin: "-20px 0px 0px 0px",
      height: "8px",
    }),
    singleValue: (styles) => ({
      ...styles,
      fontSize: "14px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    }),
    multiValue: (styles) => ({
      fontSize: "14px",
    }),
    valueContainer: (styles) => ({
      padding: 0,
      display: "flex",
      alignItems: "center",
    }),
  },
};

/* const options = [
  
   {
    value: "uz",
    label: (
      <>
        <img
          src="https://apotheca.uz/static/images/russian-flag.svg"
          width={18}
          height={18}
          style={{ marginRight: "5px" }}
        />
        <span style={{ fontSize: "12px" }}>Русский</span>
      </>
    ),
  },
  {
    value: "ru",
    label: (
      <>
        <img
          src="https://apotheca.uz/static/images/uzbekistan-flag.svg"
          width={18}
          height={18}
          style={{ marginRight: "5px" }}
        />
        <span style={{ fontSize: "12px" }}>O'zbek tili</span>
      </>
    ),
  }, 
]; */

const Header = (props) => {
  const { locale } = useRouter();
  const { t } = useTranslation("common", { keyPrefix: "header" });
  /* const [selectedOption, setSelectedOption] = useState({
    label: (
      <>
        <img
          src="https://apotheca.uz/static/images/russian-flag.svg"
          width={18}
          height={18}
          style={{ marginRight: "5px" }}
        />
        <span style={{ fontSize: "15px" }}>Русский</span>
      </>
    ),
    value: "ru",
    isDisabled: true,
  }); */

  const [scroll, setScroll] = useState(false);
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [fio, setFio] = useState("");
  const [step, setStep] = useState(0);
  const [networkError, setNetworkError] = useState(false);
  const [data, setData] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setvalue] = useState("");
  const [id, setId] = useState(0);
  const [basket, setBaksets] = useState([]);
  const [like, setLikes] = useState([]);
  const [category, setCategory] = useState([]);
  const [target, setTarget] = useState("");
  const [step3, setStep3] = useState(false);
  const [child, setChild] = useState(0);
  const [srch, setSrch] = useState(0);
  useEffect(() => {
    let position = window.pageYOffset;
    window.addEventListener("scroll", () => {
      const currentPosition = window.pageYOffset;
      if (position < currentPosition) {
        setScroll(true);
      } else {
        setScroll(false);
      }
      position = currentPosition;
    });

    let sbaskets = window?.localStorage?.getItem("sbaskets");
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");

    let slikes = window?.localStorage?.getItem("slikes");
    slikes = JSON.parse(slikes?.length ? slikes : "[]");

    setBaksets(sbaskets);
    setLikes(slikes);

    axios()
      .get("/category/?lan=uz")
      .then((response) => {
        const data = response?.data;
        const categoryy = Array.isArray(data) ? data : [];
        setCategory(categoryy);
      });
  }, []);

  const SendSMS = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fio", fio);
    data.append("phone", phone);
    const value = Object.fromEntries(data.entries());
    await axios()
      .post("/call/?lan", value)
      .then((response) => {
        const status = response?.data?.status;
        if (status === 1) {
          setStep(1);
        } else {
          setNetworkError(true);
        }
      })
      .catch(() => setNetworkError(true));

    // await axios().get(
    //   encodeURI(
    //     `https://api.telegram.org/bot5702349594:AAHkwZZFWMAgffq76pmtE1VaFuxJnf7nv4w/sendMessage?chat_id=${-1001818127319}&text=👤Ismi:</b> ${fio}\n<b>📞Telefon raqami:</b>+${phone}\n&parse_mode=html`
    //   )
    // );
  };

  const Change = (e) => {
    let urlll = `/drug/search/?search=${
      e.target.value.length >= 2 && e.target.value
    }&lan=uz`;
    axios()
      .get(urlll)
      .then((response) => {
        const dataa = (response?.data?.data).map((data) => {
          return data;
        });
        setData(dataa);
        const name = data.map(({ name }) => {
          return name;
        });
        setvalue(name);
        const idd = data.map(({ id }) => {
          return id;
        });
        setId(idd);
        const tar = data.map(({ slug }) => {
          return slug;
        });
        setTarget(tar);
      });
  };

  const handledatalist = () => {
    setStep3(!step3);
    if (
      window.location.href ===
      "/categories?category_id=" +
        category.map(({ id }) => {
          return id;
        })
    ) {
      setStep3(false);
    }
  };
  const handleChild = () => {
    setChild(1);
  };
  const handleSearch = () => {
    setSrch(1);
  };

  const className2 = scroll
    ? "navbarscrolltrue    bg-white"
    : "navbarscrollfalse   bg-white ";
  const className3 = scroll
    ? " scrollimgfalse trans5"
    : " scrollimgtrue trans5";

  return (
    <div>
      <Navbar style={{ position: "relative" }}>
        <div className={className2}>
          <nav className="container">
            <Link href="/" locale={locale}>
              <Image
                style={{ alignItems: "center", display: "flex" }}
                src="/logo.svg"
                width={177}
                height={52.2}
              />
            </Link>
            <div className="nav-right">
              <a href="tel:+998998715668">+998 99 871 56 68</a>
              <Image
                variant="primary"
                onClick={handleShow}
                className="calling"
                src="/Calling.svg"
                width={24}
                height={24}
                style={{ cursor: "pointer" }}
              />
              <button variant="primary" onClick={handleShow}>
                {t("contact")}
              </button>
              {step === 0 ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body style={{ textAlign: "center" }}>
                    <h3>{t("contact")}</h3>
                    <p style={{ color: "#6f818f" }}>{t("contacttitle")}</p>
                    <div>
                      <div style={{ color: "#6f818f" }}>{t("name")}</div>
                      <input
                        type="text"
                        onChange={(e) => {
                          const fio = e.target.value;
                          setFio(fio);
                        }}
                        name="name"
                        style={{
                          width: "60%",
                          margin: "10px 0",
                          border: "1px solid rgba(20, 54, 80, 0.1)",
                          background: "rgba(20, 54, 80, 0.1)",
                          overflow: "hidden",
                          borderRadius: "8px",
                          padding: "4px",
                        }}
                      />
                    </div>
                    <div>
                      <div style={{ color: "#6f818f" }}>{t("phone")}</div>
                      <InputMask
                        className="InputMask"
                        formatChars={{ b: "[0-9]" }}
                        mask="+998 (bb) bbb-bb-bb"
                        maskChar=""
                        style={{
                          width: "60%",
                          margin: "10px 0",
                          border: "1px solid rgba(20, 54, 80, 0.1)",
                          background: "rgba(20, 54, 80, 0.1)",
                          overflow: "hidden",
                          borderRadius: "8px",
                          padding: "4px",
                        }}
                        value={phone}
                        onChange={(e) => {
                          const phone = e.target.value
                            .replace(/-/g, "")
                            .replace(/\(/g, "")
                            .replace(/\)/g, "")
                            .replace(/\+/g, "")
                            .replace(/\s/g, "")
                            .replace(/_/g, "");
                          setPhone(phone);
                        }}
                      />
                    </div>
                    <button
                      onClick={SendSMS}
                      style={{
                        background: "#061b34",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        width: "60%",
                        padding: "5px",
                        marginBottom: "10px",
                      }}
                    >
                      {t("button")}
                    </button>
                    {networkError && (
                      <p style={{ color: "red" }}>Nimadir xato</p>
                    )}
                  </Modal.Body>
                </Modal>
              ) : (
                <Modal>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                  </Modal.Body>
                </Modal>
              )}
              <Language />
              {/*  <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                {...defaultOptions}
              /> */}
            </div>
          </nav>
          <div className="navbarbottom">
            <div
              className="container"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <Link href="/">
                  <Image
                    src="/logo-image.svg"
                    className={className3}
                    style={{
                      marginRight: "24px",
                    }}
                    width={0}
                    height={0}
                  />
                </Link>
                <button
                  style={{ background: "#061b34" }}
                  className="dropdownbtn"
                  onClick={handledatalist}
                >
                  <Image src="/Group 10092.svg" width={20} height={14} />

                  <span
                    style={{ color: "white", marginLeft: "5px" }}
                    className="catalogtext"
                  >
                    {t("catalog")}
                  </span>
                </button>
                {step3 === true ? (
                  <>
                    <ul
                      style={{
                        background: "white",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        padding: "0",
                        width: "440px",
                        overflowY: "scroll",
                        maxHeight: "400px",
                        position: "absolute",
                        top: "170px",
                      }}
                    >
                      <li onClick={handleChild}>
                        {category.map(({ name, childs, id }) => {
                          return (
                            <>
                              <div
                                style={{
                                  padding: "7.5px ",
                                  cursor: "pointer",
                                  border: "1px solid #f7f8fc",
                                }}
                              >
                                {name}
                              </div>
                              {child === 1 ? (
                                <>
                                  <ul style={{ background: "#F7F8FC" }}>
                                    <Link
                                      href={"/categories?category_id=" + id}
                                    >
                                      <li
                                        style={{
                                          listStyle: "none",
                                          cursor: "pointer",
                                        }}
                                      >
                                        <span>
                                          {childs.map(({ description }) => {
                                            return (
                                              <div
                                                style={{
                                                  paddingTop: "7.5px",
                                                  paddingBottom: "7.5px",
                                                }}
                                              >
                                                {"● " + description}
                                              </div>
                                            );
                                          })}
                                        </span>
                                      </li>
                                    </Link>
                                  </ul>
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          );
                        })}
                      </li>
                    </ul>
                  </>
                ) : (
                  ""
                )}
                <form className="form1">
                  <DatalistInput
                    type="text"
                    placeholder={t("placeholder")}
                    className="search-input"
                    onSelect={({ slug }) => {
                      window.location.href = "/categories/" + slug;
                    }}
                    onChange={Change}
                    items={data.map(({ id, name, slug }) => ({
                      id: id,
                      value: name,
                      slug: slug,
                    }))}
                  />
                  <button className="search-btn">
                    <Image src="/Search.svg" width={20} height={20} />
                  </button>

                  <Image
                    className="search-btn__after"
                    src="/Search.svg"
                    width={20}
                    height={20}
                  />
                </form>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Image
                  className="search-btn__after search-res"
                  src="/Search.svg"
                  width={20}
                  height={20}
                  style={{ textAlign: "end", paddingRight: "10px" }}
                  onClick={handleSearch}
                />
                <div
                  className={"search-2"}
                  style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: "9999999999999",
                    left: "-24px",
                  }}
                >
                  {srch === 1 ? (
                    <>
                      <form className="form2">
                        <DatalistInput
                          type="text"
                          placeholder="Dori nomini kiriting..."
                          className="search-input2"
                          onSelect={({ slug }) => {
                            window.location.href = "/categories/" + slug;
                          }}
                          onChange={Change}
                          items={data.map(({ id, name, slug }) => ({
                            id: id,
                            value: name,
                            slug: slug,
                          }))}
                        />
                        <button className="search-btn">
                          <Image src="/Search.svg" width={20} height={20} />
                        </button>
                      </form>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <Link
                  style={{ display: "flex" }}
                  href="/favorites"
                  locale={locale}
                >
                  <span className="" style={{ position: "relative" }}>
                    <div className="bag-icons">
                      <Image
                        className="image basketicons"
                        src="/Heart.svg"
                        width={20}
                        height={20}
                      />

                      {JSON.parse(
                        typeof window !== "undefined"
                          ? window?.localStorage?.getItem("slikes")?.length
                            ? window?.localStorage?.getItem("slikes")
                            : "[]"
                          : "[]"
                      ).length === 0 ? (
                        ""
                      ) : (
                        <span className="favoritescount">
                          {
                            JSON.parse(
                              localStorage?.getItem("slikes")?.length
                                ? localStorage?.getItem("slikes")
                                : "[]"
                            ).length
                          }
                        </span>
                      )}
                    </div>
                  </span>
                  <span className="bag-title">{t("favorites")}</span>
                </Link>
                <Link href="/basket" locale={locale}>
                  <span style={{ display: "flex", position: "relative" }}>
                    <div className="bag-icons ">
                      <Image
                        className="bag-img basketicons"
                        src="/Bag.svg"
                        width={20}
                        height={20}
                      />
                      {JSON.parse(
                        typeof window != "undefined"
                          ? window?.localStorage?.getItem("sbaskets")?.length
                            ? window?.localStorage?.getItem("sbaskets")
                            : "[]"
                          : "[]"
                      ).length === 0 ? (
                        ""
                      ) : (
                        <span className="favoritescount">
                          {
                            JSON.parse(
                              typeof window != "undefined"
                                ? window?.localStorage?.getItem("sbaskets")
                                    ?.length
                                  ? window?.localStorage?.getItem("sbaskets")
                                  : "[]"
                                : "[]"
                            ).length
                          }
                        </span>
                      )}
                    </div>
                    <span className="bag-title">{t("baskets")}</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
