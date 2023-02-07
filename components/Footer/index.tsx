import React from "react";
import { Logo } from "./Logo";
import { List } from "./List";
import { Hyperlink } from "./Hyperlink";
import { Container } from "./styles";

export const Footer: React.FC = () => (
  <Container>
    <div>
      <Logo />
      <List title="Minhas redes">
        <Hyperlink name="LinkedIn" path="https://www.linkedin.com/in/mapx/" />
        <Hyperlink name="GitHub" path="https://github.com/matheusinfo" />
        <Hyperlink name="LeetCode" path="https://leetcode.com/MaPx/" />
      </List>
      <List title="Sobre mim">
        <Hyperlink blank={false} name="Minha experiência" path="/about" />
        <Hyperlink blank={false} name="Meus projetos" path="/about" />
        <Hyperlink blank={false} name="Minhas habilidades" path="/about" />
      </List>
      <List title="Contato">
        <Hyperlink
          name="E-mail"
          path="https://mail.google.com/mail/?view=cm&fs=1&to=matheus.add12@gmail.com"
        />
        <Hyperlink
          name="WhatsApp"
          path="https://web.whatsapp.com/send?phone=5544999555595&text=Olá, vim do seu portifólio. Podemos conversar?"
        />
        <Hyperlink
          name="Baixar currículo"
          path="https://drive.google.com/file/d/14eJRbNcwgFzZxQYvoESPn-Kv3acDXGFm/view"
        />
      </List>
    </div>
    <footer>
      Copyrights ® 2023 Matheus Andrade. Todos direitos reservados.
    </footer>
  </Container>
);
