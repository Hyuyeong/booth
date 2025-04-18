import styled from "styled-components";

export const Form = styled.form`
  display: grid;
  gap: 1.2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  max-width: 500px;
  margin: auto;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #232323;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  /* border: none; */
  outline: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &:focus {
    border: 2px solid #8b5cf6;
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

export const SubmitButton = styled.button`
  background: linear-gradient(45deg, #6a5af9, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(138, 92, 246, 0.5);
  transition: all 0.3s ease;

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

export const CancelButton = styled.button`
  background: transparent;
  color: #ccc;
  border: 2px solid #ccc;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: black;
    border-color: black;
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: translateY(1px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #06beb6, #48b1bf);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(72, 177, 191, 0.5);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(72, 177, 191, 0.7);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 3px 8px rgba(72, 177, 191, 0.4);
  }
`;
