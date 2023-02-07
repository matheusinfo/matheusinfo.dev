import Image from "next/image";
import MyProfile from "../../public/me.png";
import { Container, LinkCard, WrapperInfo, Text } from "./styles";

export const Help: React.FC = () => (
  <Container>
    <WrapperInfo>
      <Image src={MyProfile} alt="Minha foto de perfil"/>
    </WrapperInfo>

    <LinkCard>
      <Text href="https://mail.google.com/mail/?view=cm&fs=1&to=matheus.add12@gmail.com" target="_blank">E-mail</Text>
    
      <Text href="https://web.whatsapp.com/send?phone=5544999555595&text=Olá, vim do seu portifólio. Podemos conversar?" target="_blank">WhatsApp</Text>
    
      <Text href="https://www.linkedin.com/in/mapx/" target="_blank">LinkedIn</Text>
    
      <Text href="https://github.com/matheusinfo" target="_blank">GitHub</Text>
    </LinkCard>
  </Container>
);
