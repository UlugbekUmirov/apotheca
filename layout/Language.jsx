import { I18nContext } from "next-i18next";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
const StyledElement = styled.div`
  position: relative;
  & button {
    background: transparent;
    border: none;
    font-weight: 500;
    font-size: 16px;
    color: #303030;
    height: 30px;
    padding: 0;
    margin: 0;
    display: flex;
    cursor: pointer;
    align-items: center;
    & span {
      margin: 0 6px;
    }
  }
  & ul {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(13, 46, 105, 0.2);
    list-style: none;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    right: 0;
    top: 34px;
    display: flex;
    z-index: 2;
    flex-direction: column;
    transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
    transform: translateY(${({ isActive }) => (isActive ? "0" : "-12px")});
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    visibility: ${({ isActive }) => (isActive ? "visible" : "hidden")};
    & li {
      border-bottom: 1px solid rgba(110, 120, 146, 0.15);
      cursor: pointer;
      font-weight: 500;
      font-size: 16px;
      padding: 12px 24px;
      white-space: nowrap;
      margin: 0;
      &[data-active="active"] {
        background: #5762f7;
        color: #ffffff;
      }
      &[data-active="inactive"] {
        background: transparent;
      }
      &:last-child {
        border-bottom: none;
      }
      &:hover {
        background: #5762f7;
        color: #ffffff;
      }
      & p {
        height: 100%;
        margin: 0;
        width: 100%;
      }
    }
  }
`;
const Down = () => (
  <svg fill="none" height="7" viewBox="0 0 12 8" width="11">
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="#2C3E50"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default function Language() {
  const ref = useRef(null);
  const router = useRouter();
  const { i18n } = useContext(I18nContext);
  const { language } = i18n;
  const changeLanguage = (locale) => {
    const { asPath } = router;
    localStorage.setItem("lan", locale);
    setActive(!active);
    router.push(asPath, asPath, { locale });
  };
  const [active, setActive] = useState(false);
  useEffect(() => {
    const onClick = () => setActive(!active);
    if (active) {
      window.addEventListener("click", onClick);
    }
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [active, ref]);

  return (
    <StyledElement isActive={active}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
        style={{ cursor: "pointer" }}
      >
        {language === "ru" ? (
          <img
            src="https://apotheca.uz/static/images/russian-flag.svg"
            width={18}
            height={18}
            style={{ marginRight: "5px" }}
          />
        ) : language === "uz" ? (
          <img
            src="https://apotheca.uz/static/images/uzbekistan-flag.svg"
            width={18}
            height={18}
            style={{ marginRight: "5px" }}
          />
        ) : (
          ""
        )}
        <span style={{ marginRight: "5px" }}>
          {language === "ru"
            ? "Русский"
            : language === "uz"
            ? "O'zbek tili"
            : ""}
        </span>
        <Down />
      </div>
      <ul ref={ref}>
        <li
          data-active={language === "uz" ? "active" : "inactive"}
          onClick={(e) => {
            e.stopPropagation();
            changeLanguage("uz");
          }}
        >
          <>
            <img
              src="https://apotheca.uz/static/images/uzbekistan-flag.svg"
              width={18}
              height={18}
              style={{ marginRight: "5px" }}
            />
            <span style={{ fontSize: "12px" }}>O'zbek tili</span>
          </>
        </li>
        <li
          data-active={language === "ru" ? "active" : "inactive"}
          onClick={(e) => {
            e.stopPropagation();
            changeLanguage("ru");
          }}
        >
          <>
            <img
              src="https://apotheca.uz/static/images/russian-flag.svg"
              width={18}
              height={18}
              style={{ marginRight: "5px" }}
            />
            <span style={{ fontSize: "15px" }}>Русский</span>
          </>
        </li>
      </ul>
    </StyledElement>
  );
}
