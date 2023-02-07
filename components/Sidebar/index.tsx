import React, { useState } from "react";
import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { ImQuestion } from "react-icons/im";
import { ListItens } from "./ListItens";
import { Container, Bar, BarItens } from "./styles";

export const Sidebar: React.FC = () => {
  const { asPath } = useRouter();
  const [small, setSmall] = useState(true);

  const handleClick = () => {
    setSmall((current) => !current);
  };

  return (
    <Container small={small}>
      <Bar small={small}>
        <BarItens small={small}>
          <ListItens
            title="Geral"
            path="/"
            name="Pagina inicial"
            active={asPath === "/"}
            onClick={handleClick}
          >
            <IoHome color="#f7bb00"/>
          </ListItens>

          <ListItens
            title="Sobre mim"
            path="/about"
            name="Quem sou eu?"
            active={asPath === "/about"}
            onClick={handleClick}
          >
            <ImQuestion color="#f7bb00"/>
          </ListItens>

          <ListItens
            title="Contato"
            path="/contact"
            name="Fale comigo"
            active={asPath === "/contact"}
            onClick={handleClick}
          >
            <FaPhone color="#f7bb00" />
          </ListItens>
        </BarItens>
      </Bar>
      <button onClick={handleClick}>
        {small ? (
          <GiHamburgerMenu fontSize="30px" color="#f7bb00" />
        ) : (
          <FaWindowClose fontSize="30px" color="#f7bb00" />
        )}
      </button>
    </Container>
  );
};
