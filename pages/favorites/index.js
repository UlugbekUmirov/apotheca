import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { StyleElement } from "../index";
import Image from "next/image";
import Head from "next/head";
export default function Favorites() {
  const { results, likes, resultImage  , baskets  } = useSelector((state) => state.like);

  const dispatch = useDispatch();
  const Like = (id) => {
    if (likes.includes(id)) {
      // setLikes(likes.filter((item) => item !== id));
      dispatch({
        type: "SET_LIKES",
        payload: likes.filter((item) => item !== id),
      });
    } else {
      // setLikes([...likes, id]);
      dispatch({
        type: "SET_LIKES",
        payload: [...likes, id],
      });
    }
  };
  const addBasket = (id) => {
    if (baskets.includes(id)) {
      // setLikes(likes.filter((item) => item !== id));
      dispatch({
        type: "SET_BASKET",
        payload: baskets.filter((item) => item !== id),
      });
    } else {
      // setLikes([...likes, id]);
      dispatch({
        type: "SET_BASKET",
        payload: [...baskets, id],
      });
    }
  };
  return (
    <div>
      <Head>
      <title>Internet dorixona - Apotheca</title>
      </Head>
      <main className="content">
        <div className="container">
            <div style={{ margin: "30px 0px" }}>
              <span>
                <Link href="/">Asosiy sahifa</Link>
              </span>{" "}
              <span style={{ color: "#738DA3" }}>{` > `}</span>
              <span style={{ color: "#738DA3" }}> Sevimli maxsulotlar</span>
            </div>
            <div style={{'margin':'30px 0' , "fontSize":"32px" , fontWeight:'500'}}>
              Sevimli mahsulotlar 
            </div>
                
          <div>
            <StyleElement>
            <div className="cards">
              {results.filter(({ id }) => likes.includes(id)).map(({ name, Country_of_origin, Manufacturer, id }) => {
                return (
                  <div
                    className={
                      baskets?.includes(id)
                        ? "card-item addshadow"
                        : "card-item"
                    }
                  >
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
                    <div>
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
                  </div>
                );
              })}
            </div>
            </StyleElement>
          </div>
        </div>
      </main>
    </div>
  );
}
