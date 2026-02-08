import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaWindowClose } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { ImQuestion } from "react-icons/im";
import { ListItens } from "./ListItens";
import { Container, Bar, BarItens, MenuButton, Overlay } from "./styles";

export const Sidebar: React.FC = () => {
  const { asPath } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((current) => !current);
  };

  return (
    <Container>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
          />
        )}
      </AnimatePresence>
      
      <Bar
        as={motion.div}
        animate={{ x: isOpen ? 0 : 250 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <BarItens>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
            transition={{ delay: 0.1 }}
          >
            <ListItens
              title="Geral"
              path="/"
              name="Página inicial"
              active={asPath === "/"}
              onClick={handleClick}
            >
              <IoHome color="#f7bb00" />
            </ListItens>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            <ListItens
              title="Sobre mim"
              path="/about"
              name="Quem sou eu?"
              active={asPath === "/about"}
              onClick={handleClick}
            >
              <ImQuestion color="#f7bb00" />
            </ListItens>
          </motion.div>
        </BarItens>
      </Bar>
      
      <MenuButton
        as={motion.button}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <FaWindowClose fontSize="28px" color="#f7bb00" />
        ) : (
          <GiHamburgerMenu fontSize="28px" color="#f7bb00" />
        )}
      </MenuButton>
    </Container>
  );
};
