# Teste Técnico – Frontend (EdTech)

Página interativa de EdTech implementada em **HTML5, CSS e JavaScript vanilla**, sem frameworks de CSS ou JS, a partir do layout do Figma.

## Como rodar

O projeto é estático, sem build. Há duas formas:

**Abrir direto:** basta abrir o arquivo `index.html` no navegador (duplo clique). Os scripts são carregados como scripts clássicos, então funcionam via `file://` sem servidor.

**Com um servidor local (recomendado):** garante que áudio, vídeo e fontes carreguem sem restrições de origem.

```bash
# Python 3
python -m http.server 8000
# depois acesse http://localhost:8000
```

Ou, no VS Code, a extensão **Live Server**.

> Vídeo (YouTube), áudio, imagens (picsum.photos) e a fonte Inter (Google Fonts) são carregados da web, então é preciso conexão à internet para vê-los.

## Decisões técnicas

- **Sem frameworks.** HTML semântico, CSS puro com custom properties e JavaScript vanilla organizado em módulos por responsabilidade.
- **Design tokens.** Todas as cores, tipografia, espaçamentos, raios e sombras do Figma ficam em `css/tokens.css` como variáveis CSS, então a página inteira deriva de um único ponto de verdade.
- **Tipografia fluida.** Títulos usam `clamp()` para escalar entre mobile e desktop sem múltiplos breakpoints.
- **Scripts clássicos (IIFE) em vez de ES modules.** Cada arquivo se auto-inicializa no `DOMContentLoaded` e é isolado num IIFE. Optei por isso em vez de `import/export` para que o `index.html` também abra direto por `file://` (módulos ES esbarram em CORS nesse cenário).
- **Player de vídeo (facade).** Mostra um poster com botão de play e só injeta o `<iframe>` do YouTube (domínio `youtube-nocookie`) no clique. Melhora a performance inicial e evita cookies antes da interação.
- **Player de áudio custom.** UI própria (play/pause, barra de progresso clicável, tempo e volume) controlando um `<audio>` nativo, para bater com o visual do Figma mantendo o comportamento nativo.
- **Slider do zero.** Prev/next, dots gerados dinamicamente, navegação por seta do teclado e estado `disabled` automático nas pontas (primeiro/último slide).
- **Atividades do zero + persistência.** Sem plugin. Cada atividade é uma pequena máquina de estados; o estado completo (texto/opção, feedback exibido e situação dos botões) é serializado no `sessionStorage` a cada mudança e restaurado no load. A objetiva compara com a alternativa correta (`data-correct` no HTML) e mostra o feedback de sucesso ou de "tente novamente".
- **FAQ com `<details>`/`<summary>` nativos.** Acessível e sem JS; o destaque em verde e a rotação da seta no estado aberto são só CSS (`[open]`).
- **Acessibilidade.** HTML semântico, `label` associado aos inputs, foco visível em todos os controles, navegação por teclado, `role`/`aria-*` no carrossel e nos feedbacks (`role="status"`), e respeito a `prefers-reduced-motion`.

## Estrutura do projeto

```
.
├── index.html          # markup semântico de toda a página
├── css/
│   ├── tokens.css      # design tokens (cores, tipografia, espaçamento…)
│   ├── base.css        # reset, tipografia base, botões, foco
│   └── styles.css      # estilos dos componentes + responsividade
├── js/
│   ├── storage.js      # wrapper de sessionStorage (window.Store)
│   ├── main.js         # inicializações gerais (ano do footer)
│   ├── videoPlayer.js  # facade do player de vídeo (YouTube)
│   ├── audioPlayer.js  # player de áudio custom
│   ├── slider.js       # slider do zero
│   ├── cards.js        # cards que expandem/recolhem
│   └── activities.js   # atividades discursiva e objetiva + persistência
└── assets/             # (imagens locais, se necessário)
```

## Componentes

| Componente | Onde | Observação |
|---|---|---|
| Player de vídeo | seção "Aula em vídeo" | YouTube, responsivo 16:9, facade |
| Imagem lateral | card após o vídeo | vira coluna no mobile |
| Slider | card com galeria | do zero, estados normal/hover/disabled |
| Player de áudio | seção "Versão em áudio" | UI custom sobre `<audio>` |
| Destaque | bloco escuro | responsivo |
| Cards interativos | grid de 2 cards | Abrir/Fechar independentes |
| Atividade discursiva | card | textarea + feedback, persistido |
| Atividade objetiva | card | escolha única + feedback, persistido |
| FAQ | accordion | `<details>` nativo, destaque em verde |

Para testar a persistência: preencha as atividades, responda, e recarregue a página (F5) — o conteúdo, o feedback e o estado dos botões voltam como estavam.