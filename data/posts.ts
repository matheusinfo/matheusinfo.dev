export interface Post {
  slug: string;
  title: string;
  resume: string;
  content: string;
  date: string;
  readTime: string;
}

export const posts: Post[] = [
  {
    slug: "clean-architecture-react",
    title: "Clean Architecture no React: Organizando seu código para escalar",
    resume:
      "Aprenda como aplicar os princípios de Clean Architecture em projetos React para criar aplicações mais testáveis, manuteníveis e escaláveis.",
    date: "05 Fev 2026",
    readTime: "8 min",
    content: `
# Clean Architecture no React: Organizando seu código para escalar

A Clean Architecture é um conceito introduzido por Robert C. Martin (Uncle Bob) que nos ajuda a criar sistemas mais organizados e fáceis de manter.

## Por que usar Clean Architecture?

Quando trabalhamos com projetos grandes, a organização do código se torna crucial. Sem uma estrutura clara, o código pode se tornar um "espaguete" difícil de entender e modificar.

### Benefícios principais:

- **Independência de frameworks**: A lógica de negócio não depende do React
- **Testabilidade**: Facilita a criação de testes unitários
- **Manutenibilidade**: Código mais fácil de entender e modificar
- **Escalabilidade**: Permite que a aplicação cresça de forma organizada

## Estrutura de pastas sugerida

\`\`\`
src/
  domain/
    entities/
    usecases/
  data/
    repositories/
    services/
  presentation/
    components/
    pages/
    hooks/
\`\`\`

## Exemplo prático

Vamos criar um caso de uso simples para buscar usuários:

\`\`\`typescript
// domain/usecases/GetUserUseCase.ts
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}
\`\`\`

Desta forma, separamos completamente a lógica de negócio da camada de apresentação.

## Conclusão

Implementar Clean Architecture pode parecer trabalhoso no início, mas os benefícios a longo prazo são enormes. Comece aos poucos e vá adaptando conforme a necessidade do seu projeto.
    `,
  },
  {
    slug: "typescript-tips-2026",
    title: "10 Dicas de TypeScript para 2026",
    resume:
      "Descubra as melhores práticas e recursos avançados do TypeScript que vão elevar a qualidade do seu código.",
    date: "01 Fev 2026",
    readTime: "6 min",
    content: `
# 10 Dicas de TypeScript para 2026

TypeScript continua evoluindo e trazendo recursos incríveis. Aqui estão 10 dicas que vão melhorar seu código.

## 1. Use satisfies para validação de tipos

\`\`\`typescript
const config = {
  api: "https://api.example.com",
  timeout: 5000,
} satisfies Config;
\`\`\`

## 2. Template Literal Types

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;
// "onClick", "onChange", etc.
\`\`\`

## 3. Const assertions para valores literais

\`\`\`typescript
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"
\`\`\`

## 4. Discriminated Unions

\`\`\`typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
\`\`\`

## 5. Utility Types nativos

Use Pick, Omit, Partial, Required, Record para manipular tipos existentes.

## 6. Type Guards personalizados

\`\`\`typescript
function isUser(value: unknown): value is User {
  return typeof value === "object" && value !== null && "id" in value;
}
\`\`\`

## 7. Generics com constraints

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## 8. Inferência com infer

\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
\`\`\`

## 9. Strict mode sempre ativo

Configure "strict": true no tsconfig.json para pegar mais erros em tempo de compilação.

## 10. Use Zod para validação runtime

TypeScript só valida em tempo de compilação. Para validação runtime, use Zod ou bibliotecas similares.

## Conclusão

Dominar TypeScript leva tempo, mas essas dicas vão acelerar seu aprendizado e melhorar a qualidade do seu código.
    `,
  },
  {
    slug: "docker-para-devs",
    title: "Docker para Desenvolvedores: Um Guia Prático",
    resume:
      "Um guia completo para entender e usar Docker no seu dia a dia como desenvolvedor. Do básico ao avançado.",
    date: "28 Jan 2026",
    readTime: "10 min",
    content: `
# Docker para Desenvolvedores: Um Guia Prático

Docker revolucionou a forma como desenvolvemos e deployamos aplicações. Vamos entender como usar essa ferramenta poderosa.

## O que é Docker?

Docker é uma plataforma que permite criar, testar e implantar aplicações rapidamente através de containers.

## Conceitos básicos

### Imagem vs Container

- **Imagem**: Template read-only com instruções para criar um container
- **Container**: Instância executável de uma imagem

## Dockerfile básico

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

## Comandos essenciais

\`\`\`bash
# Construir uma imagem
docker build -t minha-app .

# Rodar um container
docker run -p 3000:3000 minha-app

# Listar containers
docker ps

# Parar container
docker stop <container_id>
\`\`\`

## Docker Compose

Para aplicações com múltiplos serviços:

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
\`\`\`

## Boas práticas

1. Use imagens Alpine para menor tamanho
2. Aproveite o cache de layers
3. Não rode containers como root
4. Use multi-stage builds
5. Mantenha imagens atualizadas

## Conclusão

Docker é uma ferramenta essencial para desenvolvedores modernos. Comece com projetos pequenos e vá expandindo seu conhecimento gradualmente.
    `,
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts;
}
