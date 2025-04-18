import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Body = styled.div`
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    // 모달 안쪽을 클릭한 경우는 무시
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWrapper>
        <CloseButton onClick={onClose}>×</CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>,
    document.body
  );
}

Modal.Header = ({ children }) => <Header>{children}</Header>;
Modal.Body = ({ children }) => <Body>{children}</Body>;
Modal.Footer = ({ children }) => <Footer>{children}</Footer>;

export default Modal;
