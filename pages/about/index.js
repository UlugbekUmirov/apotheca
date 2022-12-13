import { useEffect } from "react";
import axios from "../api/axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Navbar } from "../../layout/header";
import { useState } from "react";
import Link from "next/link";
export default function About() {
  const [category, setCategory] = useState([]);
  const [step, setStep] = useState(false);
  const [child, setChild] = useState(0);
  useEffect(() => {
    axios()
      .get("/category/?lan=uz")
      .then((response) => {
        const data = response?.data;
        const categoryy = Array.isArray(data) ? data : [];
        setCategory(categoryy);
      });
  }, []);
  const handledatalist = () => {
    setStep(!step);
  };
  const handleChild = () => {
    setChild(1);
  };
  return (
    <Navbar>
      <div className="content">
        <div className="container">
          <button style={{ background: "black" }} onClick={handledatalist}>
            <img src="Group 10092.svg" width={20} height={14} />
            <span style={{ color: "white" }}>Maxsulot katalogi</span>
          </button>
          {step === true ? (
            <>
              <ul
                style={{
                  background: "white",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  padding: "0",
                  width: "440px",
                  overflowY: "scroll",
                  position: "absolute",
                  bottom: "50px",
                  maxHeight: "400px",
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
                              <Link href={"/categories?category_id=" + id}>
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
        </div>
      </div>
    </Navbar>
  );
}
