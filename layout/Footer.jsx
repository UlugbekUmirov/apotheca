import Image from "next/image";
import styled from "styled-components";
const StyleElement = styled.div`
  & .footer {
    background-color: #061b34;
    padding: 60px 0px 48px 0px;
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
  return (
    <StyleElement>
      <div className="footer">
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
              <h5>О компании</h5>
              <p>Наша команда</p>
              <p>Отзывы клиентов</p>
              <p>Контакты</p>
              <p>Публичная оферта</p>
              <p>Вакансии</p>
            </div>
            <div style={{}} className="col-12 col-lg-3 col-md-4  col-sm-6">
              <h5>Категории</h5>
              <p>Спорт питание</p>
              <p>Для похудения</p>
              <p>Противовирусные</p>
              <p>Спорт питание</p>
              <p>Для похудения</p>
            </div>
            <div className="col-12 col-lg-3">
              <h5>О компании</h5>
              <p>
                <a href="tel:+998716914837">+998 71 691-48-37</a>
              </p>
              <p>info@apotheka.com</p>
              <p>8:30 - 20:30 без выходных</p>
              <p>
                город Ташкент, Алмазарский <div>район, ул. Зиё, дом 12</div>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </StyleElement>
  );
}
