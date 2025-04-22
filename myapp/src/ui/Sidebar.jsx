import { Link } from "react-router-dom";
import styled from "styled-components";
import { HiHome, HiCalendar, HiMiniUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineOpenAI } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";
import { MdLogin } from "react-icons/md";

const StyledSideBar = styled.div`
  /* background-color: blueviolet; */
  grid-row: 1/-1;
  padding: 5rem;

  li {
    list-style-type: none;
    padding: 0;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
  }
  a {
    display: flex;
    align-items: center;
  }
  span {
    padding-left: 0.2rem;
  }
  img {
    max-width: 100px;
  }
`;

function Sidebar() {
  return (
    <StyledSideBar>
      <img src="/src/assets/logo.png" alt="logo" />
      <li>
        <Link to="/">
          <HiHome />
          <span>Home</span>
        </Link>
      </li>
      <li>
        <Link to="account">
          <GiArchiveRegister />
          <span>Register</span>
        </Link>
      </li>
      <li>
        <Link to="login">
          <MdLogin />
          <span>Login</span>
        </Link>
      </li>
      <li>
        <Link to="booking">
          <HiCalendar />
          <span>Booking</span>
        </Link>
      </li>
      <li>
        <Link to="booths">
          <AiOutlineOpenAI />
          <span>Booths</span>
        </Link>
      </li>
      {/* <li>
        <Link to="account">Account</Link>
      </li> */}
      <li>
        <Link to="users">
          <HiMiniUsers />
          <span>Users</span>
        </Link>
      </li>
      <li>
        <Link to="settings">
          <IoSettingsOutline />
          <span>Settings</span>
        </Link>
      </li>
    </StyledSideBar>
  );
}

export default Sidebar;
