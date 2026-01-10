import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const ModalBox = styled.div`
  background: ${({ theme }) => theme.primary};
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
`;

export default function Modal({ open, onClose, children }) {
  return (
    <Backdrop open={open} onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        {children}
      </ModalBox>
    </Backdrop>
  );
    }
