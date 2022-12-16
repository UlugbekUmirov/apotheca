import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";
const StyledElement = styled.section`
  & .container {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 600px;
    justify-content: center;
    width: 100%;
    @media screen and (max-width: 1440px) {
      height: 100vh;
    }
    & h3 {
      color: #5762f7;
      font-size: 44px;
      font-weight: 700;
      margin: 0;
      text-align: center;
      @media screen and (max-width: 991px) {
        font-size: 32px;
      }
    }
    & p {
      color: #303030;
      font-size: 16px;
      font-weight: 500;
      margin: 20px 0 30px 0;
      text-align: center;
    }
    & div {
      width: 250px;
      & a {
        align-items: center;
        background-color: #5762f7;
        border-radius: 8px;
        color: #ffffff;
        display: flex;
        font-size: 16px;
        font-weight: 500;
        height: 48px;
        justify-content: center;
        text-decoration: none;
        width: 100%;
      }
    }
  }
`;
const NotFound = () => {
  const { t } = useTranslation("common", { keyPrefix: "not-found" });
  useEffect(() => {
    window.scrollTo({
      behavior: "auto",
      left: 0,
      top: 0,
    });
  }, []);
  return (
    <>
      <StyledElement>
        <div className="container">
          <h3>{t("title")}</h3>
          <p>{t("not-found-or-deleted")}</p>
          <div>
            <Link href="/">{t("home")}</Link>
          </div>
        </div>
      </StyledElement>
    </>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default NotFound;
