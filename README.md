📄 Onda Finance — Banking App

Aplicação frontend que simula um banco digital moderno, com foco em arquitetura escalável, gerenciamento de estado e experiência do usuário (UX).

O sistema permite autenticação (mockada), visualização de saldo, histórico de transações e realização de transferências com atualização em tempo real.

Este projeto foi desenvolvido com foco em boas práticas de engenharia de software, organização de código e padrões modernos do ecossistema React.

---

🚀 Tecnologias Utilizadas

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui (Radix UI)
- React Router DOM
- TanStack Query (React Query)
- Zustand
- React Hook Form
- Zod
- Axios
- Vitest
- React Testing Library

---

⚙️ Como Rodar o Projeto Localmente

1️⃣ Clonar o Repositório

```
git clone <url-do-repositorio>
cd onda-finance
````
2️⃣ Instalar Dependências
```
npm install
```
3️⃣ Rodar o Projeto
```
npm run dev
```
---

A aplicação estará disponível em:
```
http://localhost:5173
```
🔑 Dados de Acesso (Mock)

Email: user@onda.finance

Senha: 123456

---

🧠 Decisões Técnicas

- React + TypeScript foram escolhidos para garantir tipagem forte, escalabilidade e maior segurança no desenvolvimento.
- Vite foi utilizado como bundler pela sua alta performance e tempo de build extremamente rápido.
- Zustand foi adotado para gerenciamento de estado global por sua simplicidade, baixa complexidade e fácil persistência de dados.
- React Query (TanStack Query) foi utilizado para controle de dados assíncronos, cache e sincronização eficiente com simulação de backend.
- React Hook Form + Zod foram escolhidos para formulários performáticos com validação robusta e tipada.
- TailwindCSS + shadcn/ui (Radix UI) foram utilizados para garantir consistência visual, acessibilidade e velocidade no desenvolvimento da interface.
- Arquitetura baseada em features foi aplicada para organizar o projeto por domínio (auth, transfer, dashboard), facilitando manutenção e escalabilidade.

O projeto segue princípios de Clean Code, separação de responsabilidades e componentes reutilizáveis, garantindo legibilidade e facilidade de evolução.

---

🚀 Melhorias Futuras

- Integração com backend real (API REST)
- Implementação de autenticação JWT com cookies httpOnly
- Modo escuro (Dark Mode)
- Animações com Framer Motion
- Testes End-to-End (E2E) com Cypress ou Playwright
- Integração com serviços financeiros reais (Open Finance)

---

🔐 Segurança (Boas Práticas)

Mesmo sendo um projeto com dados mockados, boas práticas foram consideradas:

- Uso de HTTPS em ambiente real
- Evitar armazenamento sensível em localStorage
- Separação de variáveis sensíveis via .env
- Preparação para uso de cookies httpOnly
- Build otimizado com minificação via Vite

---
