import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 25px;
`;

export const HeaderContainer = styled.div`
  height: 100px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  position: fixed;
  padding-right: 40px;
  right: 0;
  top: 0;
  z-index: 100;
  background-color: white;
  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 70%;
  height: 120%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`
export const OptionDiv = styled.div`
    ${OptionContainerStyles}
`