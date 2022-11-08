import Image from "next/image";
import styled from "styled-components";
import Select from "react-select";
import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
 & .sticky-content{
   background-color: #F7F8FC;
   padding:24px 0px;
 
}
 & .dropdown-toggle::after {
  border:0;
}
& #button{
  background-color: #061B34;
  font-size:15px;
  font-weight:500;
  padding:10px 24px;

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
& .bag-icons {
 padding:10px;
 background-color:#143650;
 display:flex;
 align-items:center;
 border-radius:50%;
 margin:2px 0px;
 margin-right:16px
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
  { value: "uz", label: "O'zbek tili" },
  { value: "ru", label: "Русский" },
];

const Header = () => {
  const [selectedOption, setSelectedOption] = useState({
    label: "O'zbek tili",
    value: "",
    isDisabled: true,
  });
  const [scroll, setScroll] = useState(false);
  
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
  }, []);

  return (
    <div style={{ 
      "transition":"all 0.5s ease-in-out 0s",
      
  }}>
          {
          scroll
           ?  
           <Navbar  
           style={{
            'position':"fixed",
            "top":"0px" ,
            'width':"100%" , 
            'zIndex':"4" ,
            "transition":"all 0.5s ease-in-out 0s"
           }}>  
           <div className="sticky-content"  
           >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "spaceBetween",
              alignItems: "center",
            }}
          >
              <Image src='/logo-image.svg'
               style={{
              'marginRight':"24px", 
              "transitionTimingFunction": 'easeInOut'
              }} 
               width={55}
                height={52}
               />
            <DropdownButton
              className="dropdownbutton"
              id="button"
              title={`Maxsulotlar katalogi`}
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
            <form>
              <input
                type="text"
                placeholder="Dori nomini kiriting..."
                className="search-input"
              />
              <button className="search-btn">
                <Image src="/Search.svg" width={20} height={20} />
              </button>
            </form>
            <Image
              className="search-btn__after"
              src="/Search.svg"
              width={20}
              height={20}
            />
            <div className="bag-icons">
              <Image
                className="image"
                src="/Heart.svg"
                width={20}
                height={20}
              />
            </div>
            <span className="bag-title">Sevimlilar</span>
            <div className="bag-icons">
              <Image src="/Bag.svg" width={20} height={20} />
            </div>
            <span className="bag-title">Savat</span>
          </div>
           </div>
           </Navbar>
         :
         <Navbar style={{ 
             "transition":"all 0.5s ease-in-out 0s",
         }}>
           <div >
          <nav className="container" >
            <Image
              style={{ alignItems: "center", display: "flex" }}
              src="/logo.svg"
              width={177}
              height={52.2}
            />
            <div className="nav-right">
              <a href="tel:+998998715668">+998 99 871 56 68</a>
              <Image
                className="calling"
                src="/Calling.svg"
                width={24}
                height={24}
              />
              <button>Qayta bog'lanish</button>
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                {...defaultOptions}
              />
            </div>
          </nav>
          <div className="sticky-content" >
            <div
              className="container"
              style={{
                display: "flex",
                justifyContent: "spaceBetween",
                alignItems: "center",
              }}
            >
            
              <DropdownButton
                className="dropdownbutton"
                id="button"
                title={`Maxsulotlar katalogi`}
              >
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
              <form>
                <input
                  type="text"
                  placeholder="Dori nomini kiriting..."
                  className="search-input"
                />
                <button className="search-btn">
                  <Image src="/Search.svg" width={20} height={20} />
                </button>
              </form>
              <Image
                className="search-btn__after"
                src="/Search.svg"
                width={20}
                height={20}
              />
              <div className="bag-icons">
                <Image
                  className="image"
                  src="/Heart.svg"
                  width={20}
                  height={20}
                />
              </div>
              <span className="bag-title">Sevimlilar</span>
              <div className="bag-icons">
                <Image src="/Bag.svg" width={20} height={20} />
              </div>
              <span className="bag-title">Savat</span>
            </div>
          </div> 
           </div>
          </Navbar>
          }           
     
    </div>
  );
};
export default Header;
