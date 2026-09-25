# Omilía Restaurante

Projeto independente para o Omilía Restaurante, na Vila da Serra, Nova Lima/MG.

## Tecnologias

- React 19 e TypeScript com verificação estrita.
- HTML pré-renderizado no build, com hidratação React para as interações.
- CSS responsivo, navegação por teclado e respeito à preferência de movimento reduzido.
- esbuild para compilar e otimizar o JavaScript e o CSS.
- Dados estruturados Restaurant (JSON-LD).
- Estado de abertura calculado em America/Sao_Paulo, com teste das transições de horário.

## Desenvolvimento

Use Node.js 22 ou mais recente:

```bash
npm ci
npm run build
npm test
npm run preview
```

O preview usa o servidor estático do Python 3. Abra a porta 4173. Edite `App.tsx`, `business.ts` e `styles.css` e execute o build novamente.

## Estrutura e publicação

- `App.tsx`: componentes e apresentação.
- `business.ts`: dados do restaurante, contatos e horários.
- `client.tsx` / `server.tsx`: hidratação e geração do HTML.
- `styles.css`: identidade visual e estilos responsivos.
- `build.mjs`: geração do site estático.
- `index.html`: página pronta para publicação, com CSS e JavaScript compilados.
- `cozinha-mineira.webp`: imagem editorial original, ilustrativa.
- `hours.test.mjs`: validação dos limites de abertura e fechamento.

O GitHub Pages publica a branch `main`, pasta `/(root)`. Depois de editar o código, execute `npm run build` e envie também o `index.html` atualizado. O arquivo compilado fica versionado para não depender de um serviço de backend ou de uma etapa de build remota.

## Informações e limites

Contatos, endereço, horários e referência de prato foram consultados em 25/09/2026 no perfil público fornecido: https://business.google.com/v/_/03237735454575065719/d585/_?caid=23826497955&agid=195039500854

As reservas e as consultas de cardápio são encaminhadas ao WhatsApp divulgado pelo restaurante. A reserva depende de confirmação da equipe; o site não registra nem confirma agendamentos. Pedidos são encaminhados ao iFood. Não há coleta de dados pessoais, analytics, painel administrativo ou credenciais no projeto.

A imagem é uma criação ilustrativa e não uma fotografia de um prato real servido pelo restaurante. Nenhum preço ou disponibilidade de item é presumido. Horários em feriados devem ser confirmados com a equipe.

Projeto de apresentação independente; a publicação não comprova vínculo ou aprovação pelo estabelecimento. A biblioteca React e suas dependências mantêm suas próprias licenças.
