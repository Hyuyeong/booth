import styled from "styled-components";

const Button = styled.button`
  background: linear-gradient(45deg, #6a5af9, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  text-transform: uppercase;
  width: ${(props) => props.width || "auto"};
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(138, 92, 246, 0.5);
  transition: all 0.3s ease;
  margin-top: 1.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(138, 92, 246, 0.7);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 8px rgba(138, 92, 246, 0.4);
  }

  &:disabled {
    background: #ccc;
    color: #666;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default Button;
