import React from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { List } from "./List";
import { Hyperlink } from "./Hyperlink";
import { Container, FooterContent, FooterGrid, Copyright, SocialLinks } from "./styles";
import { FaLinkedin, FaGithub, FaCode, FaEnvelope, FaWhatsapp, FaFileDownload } from "react-icons/fa";

export const Footer: React.FC = () => (
  <Container
    as={motion.footer}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <FooterContent>
      <FooterGrid>
        <Logo />

        <List title="Redes Sociais">
          <SocialLinks>
            <motion.a
              href="https://www.linkedin.com/in/matheusinfo/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin size={24} />
            </motion.a>
            <motion.a
              href="https://github.com/matheusinfo"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub size={24} />
            </motion.a>
            <motion.a
              href="https://leetcode.com/MaPx/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaCode size={24} />
            </motion.a>
          </SocialLinks>
        </List>

        <List title="Contato">
          <Hyperlink
            name="E-mail"
            path="https://mail.google.com/mail/?view=cm&fs=1&to=matheus.add12@gmail.com"
            icon={<FaEnvelope />}
          />
          <Hyperlink
            name="WhatsApp"
            path="https://web.whatsapp.com/send?phone=5544999555595&text=Olá, vim do seu portifólio. Podemos conversar?"
            icon={<FaWhatsapp />}
          />
          <Hyperlink
            name="Currículo"
            path="https://drive.google.com/file/d/14eJRbNcwgFzZxQYvoESPn-Kv3acDXGFm/view"
            icon={<FaFileDownload />}
          />
        </List>
      </FooterGrid>
    </FooterContent>
    <Copyright>© 2026 Matheus Andrade. Todos os direitos reservados.</Copyright>
  </Container>
);
