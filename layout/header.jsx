import Image from "next/image";
import styled from "styled-components";
import Select from "react-select";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";
import InputMask from "react-input-mask";
import axios from "../pages/api/axios";
import Link from "next/link";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";
import { useSelector } from "react-redux";

const Navbar = styled.div`
& nav {
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  align-item: center;
  height:100px;
}
& .nav-right {
  align-items: center;
  display: flex;
}
& a{
 text-decoration: none;
 color:black;
 font-size:18px
}
& .calling{
 display:none;

}
& .nav-right button{
  margin:0px 24px;
  border-radius:8px;
  padding: 12px 14px;
  border:1px solid #061b34;
  background-color:white;
}
& .navbarscrolltrue{
  top: -100px; 
  position: fixed;
  transition: all 0.5s ease-in-out 0s;
  width: 100%;
  z-index: 4;
}
& .navbarscrollfalse{
  position: fixed;
  border-bottom: none;
  top: 0px;
  transition: all 0.5s ease-in-out 0s;
  width: 100%;
  z-index: 4;
 
}
 & .dropdown-toggle::after {
  border:0;
}
& #button{
  background-color: #061B34;
  font-size:15px;
  font-weight:500;
  padding:10px ;
  display:flex;
  align-items:center;

}
& .dropdown-toggle::before{
  background-image:url('/Group 10092.svg') 
  content:''
}

& .search-input{
 border:none;
 padding:10px 0px 10px 24px;
 outline:none;
 width:100%;
 border-radius:8px;
}
& .search-btn{
  align-items:center;
}
& .search-input::placeholder {
  color:black;
  font-weight:500;
  color:#061B34;
}
& .search-btn{
  background-color:white;
  border:none;
  padding-right: 25px;
  border-radius:8px;
}
& form{
  width:100%;
  display:flex;
  justify-content:space-between;
  margin:0px 24px;
  background-color:white;
  border-radius:8px;
  transition: all 0.5s ease-in-out 0s;
}
 & .bag-icons  {
 padding:10px;
 background-color:#143650;
 display:flex;
 align-items:center;
 border-radius:50%;
 margin:2px 0px;
 margin-right:16px;
 
}
& .bag-title{
 display:flex;
 align-items:center;
 margin-right:24px;
}
& .search-btn__after{
  margin:0px 8px;
  display:none;
  text-align: end;
  width:100%
}
& Navbar{
  transition: all 0.5s ease-in-out 0s;
}
& .scrollimgtrue{
  height: 0px;
  margin: 0px;
  transform-origin: left center;
  transition-timing-function: ease-in-out;
  min-width: 0px !important;
  width: 0px !important;
}
& .scrollimgfalse{
  height: 52px;
  margin: 0px 24px 0px 0px;
  transform-origin: left center;
  transition-timing-function: ease-in-out;
  min-width: 56px !important;
  width: 56px !important;
}
& .trans5{
  transition: .5s;
}
& .navbarbottom{
  background: #F7F8FC;
  padding:14px 0px;
}
& .react-datalist-input__textbox {
  border:1px solid white;
  outline:white solid 1px;
}
& .favoritescount{
  -webkit-box-align: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid rgb(255, 255, 255)!important;
  bottom: -4px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  max-height: 20px;
  min-width: 20px;
  padding: 3px;
  position: absolute;
  font-size:11px;
  font-weight:500;
  left:20px;
  background-color:red;
  color:white;
}

 @media (max-width: 768px){
   .nav-right a{
      display:none;
    }
}
@media(max-width:576px){
  .nav-right button {
    display:none;
  }
  .calling{
   display:block;
   margin:0px 15px;
  }
  & .search-btn__after{
  display:block;
 
  }
  & form{
   display:none;
  }
}
 
@media(max-width:992px){
  .bag-title{
    display:none;
  } 
  .katalog-title{
   display:none;
   margin: 0px 0px -2px;
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
const options = [
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
        <span style={{ fontSize: "1px" }}>O'zbek tili</span>
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
        <span style={{ fontSize: "12px" }}>Русский</span>
      </>
    ),
  },
];

const Header = () => {

  const [selectedOption, setSelectedOption] = useState({
    label: (
      <>
        <img
          src="https://apotheca.uz/static/images/russian-flag.svg"
          width={18}
          height={18}
          style={{ marginRight: "5px" }}
        />
        <span style={{ fontSize: "14px" }}>O'zbek tili</span>
      </>
    ),
    value: "",
    isDisabled: true,
  });

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
  const [baskets, setBaksets] = useState([]);
  const [likes, setLikes] = useState([]);
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
    let sbaskets = localStorage.getItem("sbaskets");
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
    setBaksets(sbaskets);

    let slikes = localStorage.getItem("slikes");
    slikes = JSON.parse(slikes?.length ? slikes : "[]");
    setLikes(slikes)
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
    console.log("target", e.target.value);

    let urlll = `/drug/search/?search=${
      e.target.value.length >= 2 && e.target.value
    }&lan=uz`;
    axios()
      .get(urlll)
      .then((response) => {
        console.log(
          (response?.data?.data).map((data) => {
            return data;
          })
        );
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
        console.log(
          "data",
          data.map(({ name }) => {
            return name;
          })
        );
      });
  };
  const className2 = scroll
    ? "navbarscrolltrue     bg-white"
    : " navbarscrollfalse   bg-white ";
  const className3 = scroll
    ? " scrollimgfalse trans5"
    : " scrollimgtrue trans5";
  return (
    <div>
      <Navbar style={{ position: "relative" }}>
        <div className={className2}>
          <nav className="container">
            <Link href="/">
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
                Qayta bog'lanish
              </button>
              {step === 0 ? (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body style={{ textAlign: "center" }}>
                    <h3>Qayta bo'g'laish</h3>
                    <p style={{ color: "#6f818f" }}>
                      Ism va telefon raqamingizni kiriting
                    </p>
                    <div>
                      <div style={{ color: "#6f818f" }}>Ism</div>
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
                      <div style={{ color: "#6f818f" }}>Telefon raqam</div>
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
                      Yuborish
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
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                {...defaultOptions}
              />
            </div>
          </nav>
          <div className="navbarbottom">
            <div
              className="container"
              style={{
                display: "flex",
                justifyContent: "spaceBetween",
                alignItems: "center",
              }}
            >
              <Link href="/ ">
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
              <DropdownButton
                className="dropdownbutton"
                id="button"
                title={
                  <>
                    <img src="Group 10092.svg" width={20} height={14} />{" "}
                    <span
                      style={{ marginLeft: "5px" }}
                      className="katalog-title"
                    >
                      Mahsulotlar katalogi
                    </span>
                  </>
                }
              >
                <Dropdown.Item layout="responsive" href="#/action-1">
                  Action
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
              <form>
                <DatalistInput
                  type="text"
                  placeholder="Dori nomini kiriting..."
                  className="search-input"
                  onSelect={(item) => console.log(item.value)}
                  onChange={Change}
                  items={data.map(({ id, name }) => ({
                    id: id,
                    value: name,
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
              <Image
                className="search-btn__after"
                src="/Search.svg"
                width={20}
                height={20}
              />
              <Link style={{ display: "flex" }} href="/favorites">
                <span className="" style={{ position: "relative" }}>
                  <div className="bag-icons">
                    <Image
                      className="image basketicons"
                      src="/Heart.svg"
                      width={20}
                      height={20}
                    />
                    {likes.length === 0 ? (
                      ""
                    ) : (
                      <span className="favoritescount">{likes.length}</span>
                    )}
                  </div>
                </span>
                <span className="bag-title">Sevimlilar</span>
              </Link>
              <Link href="/basket">
                <span style={{ display: "flex", position: "relative" }}>
                  <div className="bag-icons ">
                    <Image
                      className="bag-img basketicons"
                      src="/Bag.svg"
                      width={20}
                      height={20}
                    />
                    {baskets.length === 0 ? (
                      ""
                    ) : (
                      <span className="favoritescount">{baskets.length}</span>
                    )}
                  </div>

                  <span className="bag-title">Savat</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};
export default Header;
