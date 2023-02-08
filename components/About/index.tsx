import {
  Container,
  Content,
  ExperienceCard,
  ProjectsCard,
  SkillsCard,
} from "./styles";
import Image from "next/image";

export const About: React.FC = () => (
  <Container>
    <Content>
      <Image
        src="https://svgshare.com/i/q85.svg"
        alt="SalvandoVidasMaringá Logo"
        width={200}
        height={200}
      />
      <p>
        Sempre fui muito ligado a tecnologia desde criança e quando comecei na
        faculdade em 2018 a ligação apenas ficou mais forte e sem nenhuma dúvida
        de que é isso que eu gostaria de fazer. Busco aprender e me aperfeiçoar
        um pouco mais a cada dia. Durante meus 2+ anos de experiência de
        mercado, participei de diversos times e tive contato com diversas áreas
        de negócio dos quais me fizeram evoluir cada dia mais.
      </p>

      <h1>Minha experiência</h1>

      <ExperienceCard>
        <h1>GazinTech</h1>
        <h2>Desenvolvedor FullStack</h2>
        <span>06/2021 - ATUAL</span>

        <p>
          Participei de diversos times internos, na criação de sites
          promocionais (Pintando7 e Outubro10), e- commerce b2b, time
          responsável pela logistica e meu time atual que está realizando a
          criação do GazinBank, o banco interno da gazin.
        </p>
      </ExperienceCard>

      <ExperienceCard>
        <h1>Saura Consultoria</h1>
        <h2>Técnico T.I</h2>
        <span>04/2019 - 05/2021</span>

        <p>
          Durante a maior parte do tempo, dei manutenção e suporte a usuários.
          Nesse período tive a oportunidade e começar a atuar junto ao time de
          desenvolvimento na manutenção do sistema interno da empresa (ERP).
        </p>
      </ExperienceCard>

      <h1>Minhas habilidades</h1>

      <SkillsCard>
        <div>
          <span>•</span> <small>React, Next.js e Remix </small>
        </div>

        <div>
          <span>•</span>{" "}
          <small>NestJS, Laravel, Node.js, .NET core e .NET framework </small>
        </div>

        <div>
          <span>•</span> <small>ReactNative e Flutter </small>
        </div>

        <div>
          <span>•</span>{" "}
          <small>Postgres, MySQL, Elasticsearch e Firebase </small>
        </div>

        <div>
          <span>•</span> <small>Jest, Mocktail e Cypress </small>
        </div>

        <div>
          <span>•</span>
          <small>
            {" "}
            Kafka, Websocket, Docket, Git, Microserviços, CI/CD, Clean
            Architecture, testes e2e, testes unitários...
          </small>
        </div>
      </SkillsCard>

      <h1>Meus projetos</h1>

      <ProjectsCard>
        <p>
          Todos meus projetos realizados para empresas a qual trabalhei são
          privados e respeita a política de privacidade da empresa. Entretanto,
          possuo projetos públicos que podem ser acessados no meu{" "}
          <a
            target="_blank"
            href="https://github.com/matheusinfo"
            rel="noreferrer"
          >
            GitHub
          </a>
          .
        </p>
      </ProjectsCard>

      <span>@matheusinfo</span>
    </Content>
  </Container>
);
