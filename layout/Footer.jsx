import Image from "next/image";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
const StyleElement = styled.div`
  & .footer {
    background-color: #061b34;
    padding: 60px 0px 30px 0px;
  }
  & p {
    color: white;
  }
  & h5 {
    color: white;
  }
  & .row {
    display: flex;
  }
  & .footer-icon {
    margin-right: 20px;
  }
  @media (max-width: 576px) {
    .footer {
      text-align: center;
    }
  }
`;
export default function Footer() {
  const { t } = useTranslation("common", { keyPrefix: "footer" });
  return (
    <StyleElement>
      <div className="footer">
        <div>
          <div className="container">
            <div className="row">
              <div style={{}} className="col-12 col-lg-3 col-md-4 col-sm-6">
                <div>
                  <Image
                    className="footer-icon "
                    src="/footer logo.svg"
                    width={225}
                    height={66.1}
                  />
                </div>
                <div style={{ margin: "40px 0" }}>
                  <Image
                    className="footer-icon"
                    src="/Instagram.svg"
                    width={40}
                    height={40}
                  />
                  <Image
                    className="footer-icon"
                    src="/Dribbble.svg"
                    width={40}
                    height={40}
                  />
                  <Image src="/Twitter.svg" width={40} height={40} />
                </div>
              </div>
              <div style={{}} className="col-12 col-lg-3 col-md-4  col-sm-6">
                <h5>{t("abouttitle")}</h5>
                <p>{t("aboutp1")}</p>
                <p>{t("aboutp2")}</p>
                <p>{t("aboutp3")}</p>
              </div>
              <div style={{}} className="col-12 col-lg-3 col-md-4  col-sm-6">
                <h5>{t("catalogTitle")}</h5>
                <p>{t("kategoriyatitle")}</p>
                <p>{t("kategoriyap1")}</p>
                <p>{t("kategoriyap2")}</p>
                <p>{t("kategoriyap3")}</p>
              </div>
              <div className="col-12 col-lg-3">
                <h5>{t("abouttitle")}</h5>
                <p>
                  <a href="tel:+998716914837">+998 71 691-48-37</a>
                </p>
                <p>info@apotheka.com</p>
                <p>24/7</p>
                <p>{t("kontaktp1")}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <hr style={{ border: 'none', borderTop:'1px solid white'}} />
          <div
            style={{
              color: "white",
              textAlign: "center",
              alignItems: "center",
              marginTop: "30px",
              fontSize: "18px",
            }}
          >
            APOTHECA LLC © {new Date().getFullYear()}.{""}
            <span style={{ marginLeft: "10px" }}>{t("huquq")}</span>
          </div>
        </div>
      </div>
    </StyleElement>
  );
}
