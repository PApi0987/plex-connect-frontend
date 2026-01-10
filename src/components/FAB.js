import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 0 10px ${({ theme }) => theme.accent};
`;

export default function FAB({ onClick }) {
  return <Button onClick={onClick}>+</Button>;
}
