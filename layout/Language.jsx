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
  <svg fill="none" height="10" viewBox="0 0 12 8" width="16">
    <path
      d="M1 1.5L6 6.5L11 1.5"
      stroke="#2C3E50"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);
const Globe = () => (
  <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
    <g clipPath="url(#clip0_63_1210)">
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.59961 9H20.3996"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M3.59961 15H20.3996"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.4997 3C9.81501 5.69961 8.92188 8.81787 8.92188 12C8.92188 15.1821 9.81501 18.3004 11.4997 21"
        stroke="#2C3E50"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 3C14.1847 5.69961 15.0778 8.81787 15.0778 12C15.0778 15.1821 14.1847 18.3004 12.5 21"
        stroke="#2C3E50"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_63_1210">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
      >
        <Globe />
        <span>{language === "ru" ? "RU" : language === "uz" ? "UZ" : ""}</span>
        <Down />
      </button>
      <ul ref={ref}>
        <li
          data-active={language === "uz" ? "active" : "inactive"}
          onClick={(e) => {
            e.stopPropagation();
            changeLanguage("uz");
          }}
        >
          <p>
            <span>UZ</span>
          </p>
        </li>
        <li
          data-active={language === "ru" ? "active" : "inactive"}
          onClick={(e) => {
            e.stopPropagation();
            changeLanguage("ru");
          }}
        >
          <p>
            <span>RU</span>
          </p>
        </li>
      </ul>
    </StyledElement>
  );
}
