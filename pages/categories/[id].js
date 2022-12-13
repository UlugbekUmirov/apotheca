import axios from "../api/axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loading from "../../layout/Loading";

const StyleElemenеntslug = styled.div`
  & .btn {
    color: white;
    background: #e93235;
    border-radius: 8px;
    padding: 12px 24px;
    border: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    min-width: 250px;
  }
  & .addbasket {
    background: #f7f8fc;
    border-radius: 8px;
    padding: 12px 24px;
    color: black;
    border: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    min-width: 250px;
  }
  .card-item {
    display: flex;
    align-items: center;
  }
  & .nolike {
    box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.06);
    padding: 10px;
    border-radius: 50%;
    transition: all 0.3s ease 0s;
  }
  & .like {
    color: red;
    box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.06);
    padding: 10px;
    border-radius: 50%;
    transition: all 0.3s ease 0s;
  }
  & .copy-icon {
    box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.06);
    padding: 5px 10px;
    border: none;
    border-radius: 50%;
    transition: all 0.3s ease 0s;
    background: white;
  }
`;
export default function Detailes() {
  const [result, setResult] = useState({});
  const [basket, setBakset] = useState([]);
  const [likee, setLikee] = useState([]);
  const [property, setProperty] = useState([]);
  const [step, setStep] = useState(0);
  const { results } = useSelector((state) => state.like);

  const router = useRouter();
  useEffect(() => {
    let sbaskets = localStorage.getItem("sbaskets");
    sbaskets = JSON.parse(sbaskets?.length ? sbaskets : "[]");
    setBakset(sbaskets);
    let slikes = localStorage.getItem("slikes");
    slikes = JSON.parse(slikes?.length ? slikes : "[]");
    setLikee(slikes);

    const data = new FormData();
    console.log("router.query.id => ", router.query.id);
    axios()
      .get("/drug/" + router.query.id + "?lan=uz")
      .then((response) => {
        const result = response?.data;
        setResult(result);
        if (router.query.id !== "undefined") {
          setStep(1);
        }
        const propertyy = result.Property;
        setProperty(propertyy);
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
    sbaskets = JSON.parse(
      typeof window !== "undefined"
        ? sbaskets?.length
          ? sbaskets
          : "[]"
        : "[]"
    );

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
      setBakset(l);
    } else {
      sbaskets = [...sbaskets, { id: id, count: 1 }];
      localStorage.setItem("sbaskets", JSON.stringify(sbaskets));
      setBakset(sbaskets);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(
      function () {
        alert("copied successfully!");
      },
      function (err) {
        alert("Failed to copy");
      }
    );
  };

  return (
    <div>
      <Head>
        <title>Internet dorixona - Apotheca</title>
      </Head>
      <div className="container">
        <div className="content">
          {step === 0 ? (
            <>
             <Loading/>
            </>
          ) : (
            <>
              <div>
                <div style={{ margin: "30px 0px" }}>
                  <span>
                    <Link href="/">Asosiy sahifa</Link>
                  </span>
                  <span>{` > `}</span>
                  <span>
                    {" "}
                    <Link href="/categories">Mahsulotlar katalogi</Link>
                  </span>
                  <span>{` > `}</span>
                  <span style={{ color: "#738DA3" }}>{result.name}</span>
                </div>
                <StyleElemenеntslug>
                  <div className="card-item" style={{ position: "relative" }}>
                    <i
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "60px",
                        fontSize: "20px",
                      }}
                      onClick={() => Like(result.id)}
                      className={
                        likee
                          .map(({ id }) => {
                            return id;
                          })
                          .includes(result.id)
                          ? "fa fa-heart like"
                          : "far fa-heart nolike"
                      }
                    ></i>
                    <button
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                      className="copy-icon"
                      onClick={copyToClipboard}
                    >
                      <Image src="/copy icons.svg" width={18} height={18} />
                    </button>
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
                    <div>
                      <h5
                        style={{ fontSize: "32px", width: "calc(100%-100px)" }}
                      >
                        {result?.name ?? "noma'lum"}
                      </h5>
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
                          {result?.Manufacturer?.name ?? "noma'lum"}
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
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>
                          {" "}
                          {result?.Country_of_origin?.name ?? "noma'lum"}
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
                          Dori shakli :{" "}
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>
                          {result?.Release_form?.name ?? "noma'lum"}
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
                          Ta'sir etuvchi modda :{" "}
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>
                          {result?.Active_substance ?? "noma'lum"}
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
                          Qutidagi miqdori :{" "}
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>
                          {result?.Amount_in_package ?? "0"}
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
                          Farmaseftik kompaniya :{" "}
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: "500" }}>
                          {result?.pharmacotherapeutic_group?.name ??
                            "noma'lum"}
                        </span>
                      </h5>
                      <button
                        className={
                          basket
                            .map(({ id }) => {
                              return id;
                            })
                            .includes(result?.id ?? "0")
                            ? "addbasket"
                            : "btn"
                        }
                        onClick={() => addBasket(result?.id ?? "0")}
                      >
                        {basket
                          .map(({ id }) => {
                            return id;
                          })
                          .includes(result?.id ?? "0") ? (
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
                          .includes(result?.id ?? "0")
                          ? "Qo'shildi"
                          : "Savatga qo'shish"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3>Umumiy ma'lumotlar</h3>
                    {property.map((item) => {
                      return (
                        <>
                          <p
                            style={{
                              color: "#6f818f",
                              lineHeight: "150%",
                              maxWidth: "970px",
                              fontSize: "16px",
                              fontWeight: "400",
                            }}
                            dangerouslySetInnerHTML={{ __html: item.value }}
                          />
                        </>
                      );
                    })}
                  </div>
                </StyleElemenеntslug>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
