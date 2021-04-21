import styled from 'styled-components'
import { Link } from "react-router-dom";

const LinkStyled = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export default LinkStyled;

