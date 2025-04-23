import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const StyledHeader = styled.div`
  /* background-color: #f1f1f1; */
  padding: 1rem 2rem;
  display: flex;
  /* justify-content: space-between;
  align-items: center; */

  .wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;

    span {
      background-color: blue;
      color: white;
      padding: 0.2rem 0.4rem;
      border-radius: 10px;
      text-transform: uppercase;
      margin-right: 1rem;
      &.admin {
        background-color: red;
      }
    }
  }
`;

const UserInfo = styled.div`
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
`;

const LogoutButton = styled.button`
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUserName(decoded.unique_name);
        setRole(decoded.role || "User");
        setUserEmail(decoded.email);
      } catch {
        setUserName("");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <StyledHeader>
      {userName && (
        <div className="wrapper">
          <UserInfo>
            <span className={role.toLowerCase()}>{role}</span>
            {userName}({userEmail})
          </UserInfo>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      )}
    </StyledHeader>
  );
}

export default Header;
