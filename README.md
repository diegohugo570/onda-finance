# Onda Finance 🌊

Bem-vindo ao repositório do **Onda Finance**, um aplicativo bancário moderno desenvolvido para demonstrar excelência em Arquitetura de Software, Clean Code e Experiência do Usuário (UX).

## 1. Descrição do Projeto
O **Onda Finance** é uma aplicação completa que simula um banco digital moderno. O sistema permite acesso via autenticação (mockada), visualização de saldos reais e mockados através de um Dashboard elegante, e a realização de transferências (Pix/Depósito) com atualizações de saldo e transações em tempo real.

O foco primordial deste projeto é a *engenharia e arquitetura*:
- Separação de responsabilidades
- Gerenciamento de estado otimizado
- Otimização de renderização
- Interface acessível seguindo os padrões do Radix UI

## 2. Tecnologias Utilizadas
A stack do projeto foi rigorosamente selecionada visando escalabilidade e mercado atual:
- **Core**: React 18, TypeScript, Vite
- **Estilização**: TailwindCSS, Class Variance Authority (CVA), shadcn/ui (Radix UI)
- **Roteamento**: React Router DOM v6
- **Gerenciamento de Estado**: 
  - *Server State/Assincronia*: TanStack Query (React Query)
  - *Client/Global State*: Zustand (com persistência via localStorage)
- **Formulários e Validação**: React Hook Form, Zod
- **Networking**: Axios e Mocks de Promises
- **Testes**: Vitest, React Testing Library

## 3. Como Rodar Localmente

Siga o passo a passo abaixo para executar o projeto:

\`\`\`bash
# 1. Clone ou baixe este projeto
# 2. Navegue até o diretório raiz
cd /onda-finance

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
\`\`\`
O app estará disponível em `http://localhost:5173`.

**Dados de Mock para Login:**
- **E-mail:** `user@onda.finance`
- **Senha:** `123456`

## 4. Decisões Técnicas

- **Por que Zustand?**
  Zustand oferece uma API enxuta e livre do forte boilerplate exigido pelo Redux. Foi utilizado para gerenciar a camada global do *usuário*, persistindo facilmente a sessão com o middleware `persist`. Isso se alinha perfeitamente com a intenção de ter um estado global performático.

- **Por que React Query?**
  Apesar de usarmos mocks, o React Query é o padrão-ouro para buscar, sincronizar e atualizar dados vindos de servidores. Ele cuida do cache, dos estados de *loading*, *error* e permite a fácil re-busca de transações assim que uma nova transferência é realizada com `mutation`.

- **Estrutura de Pastas (Feature-Sliced Design leve):**
  Agrupar componentes e lógicas por domínio (ex: `/features/auth`, `/features/transfer`) em vez de puramente por tipo (apenas `/components` ou `/hooks`) garante que a app continue fácil de manter conforme se expande.

## 5. Melhorias Futuras
Embora o escopo demonstre uma arquitetura sólida, eis alguns pontos de evolução:
- Integração com API real via Axios Interceptors.
- Autenticação JWT real usando cookies httpOnly.
- Dark mode escalável (a base Tailwind já suporta `--dark`).
- Adição de animações robustas utilizando Framer Motion nas trocas de tela.
- Expansão de testes End-to-End (E2E) com Playwright ou Cypress.

## 6. Segurança (Boas Práticas e Documentação)
Embora os dados deste app sejam *mocks*, um banco de dados e APIs reais requerem rígidas políticas de segurança.

1. **Proteção contra engenharia reversa:**
   O build com Vite aplica **Minificação** e **Code Splitting** automáticos. Para proteger lógicas sensíveis do lado do cliente (o que idealmente seria delegado sempre ao backend), práticas de **obfuscação** profunda podem ser aplicadas durante o CI/CD (usando integradores como terser ou javascript-obfuscator).

2. **Proteção contra vazamento de dados:**
   - **HTTPS obrigatório:** Para prevenir ataques *man-in-the-middle*, garantindo a criptografia dos payloads em trânsito.
   - **Armazenamento Seguro:** Jamais persistir senhas (mesmo geradas) ou tokens de longo prazo no `localStorage`. Idealmente, utilize **HttpOnly Cookies** mitigando ataques de XSS.
   - **Variáveis de Ambiente (.env):** Onde chaves de API secretas e endereços de servidores de homologação/produção não são incluídos no repositório.

## 7. Instruções para Deploy (Vercel)

1. Faça o commit de seus arquivos para um repositório no GitHub.
2. Acesse sua conta e importe o projeto na plataforma **Vercel**.
3. O Vercel detectará automaticamente que é um projeto Vite.
4. Framework Preset: `Vite`
5. Variáveis de ambiente: Nenhuma é necessária para o mock atual.
6. Clique em **Deploy**.

**Sugestão de Domínio:** `app.ondafinance.com.br` ou `dashboard.ondafinance.cloud`.
