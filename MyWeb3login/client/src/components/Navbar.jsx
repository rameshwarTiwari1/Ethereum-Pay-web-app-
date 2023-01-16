import React, { useEffect } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "./assets/ethgif.gif";
// import axios from "axios";
import "./allcompo.css";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  // const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = React.useState(false);

  // useEffect(async () => {
  //   let url = "http://localhost:8080/users.list";
  //   let options = {
  //     method: "GET",
  //     url: url,
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}}`,
  //     },
  //   };
  //   try {
  //     let response = await axios(options);
  //     console.log(response.data);
  //   } catch (e) {
  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 1100);
  //   }
  // }, []);

  return (
    <nav className=' w-full bg- flex md:justify-center justify-between items-center'>
      <div className='md:flex-[0.8] flex-initial justify-center items-center'>
        <img src={logo} alt='logo' className=' ethlogo cursor-pointer' />
      </div>
      <ul className='   text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}

        <Link
          className='text-white text-decoration-none py-2 px-7 mx-4 rounded-full cursor-pointer btn btn-outline-primary'
          to='/signup'
        >
          Log Out
        </Link>
        {/* </li> */}
      </ul>
      <div className='flex relative'>
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className=' text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(true)}
          />
        )}
        {/* {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className='text-white md:hidden cursor-pointer'
            onClick={() => setToggleMenu(false)}
          />
        )} */}
        {toggleMenu && (
          <ul
            className='z-10 fixed  -top-0 -right-2 p-3 w-[27vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'
          >
            <li className='text-xl w-full cursor-pointer my-2'>
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops='my-2 text-lg'
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
