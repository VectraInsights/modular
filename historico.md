# HISTÓRICO — Planejador de Cômodos

Arquivo de continuidade: quem abrir este repositório em outro PC começa daqui.
Última atualização: 08/09/2026.

## 1. O que é

App de PC (Electron) para planejar cômodos só digitando medidas.
Desenha a **planta 2D em escala** + **visão 3D** (Three.js), salva projeto em `.json`
e exporta PNG. Feito para planejar o quarto da criança antes de comprar/mandar fazer os móveis.

## 2. O quarto real que originou o projeto

- Medidas: **3,00 m (parede da porta/direita) × 2,60 m (parede da janela/fundo) × 2,40 m altura** (~7,8 m²)
- **Porta: parede esquerda, no TOPO** (canto superior esquerdo), 0,80 m
- **Janela: parede de baixo** (2,60 m), ~1,50 m de largura
- Usuário: criança de 10 anos — dormir + estudar + PC

### Layout fechado (não mudar sem motivo)
| Móvel | Medida | Posição |
|---|---|---|
| Box baú solteiro | 90 × 200 | Parede da porta, abaixo da porta; **cabeceira para a janela**, pé para a porta |
| Guarda-roupa porta de correr | 60 prof × 180 | Parede direita, encostado no fundo (máx. 200; acima disso fecha a passagem de 1,10 m) |
| Escrivaninha estudo + PC | 120 × 60, tampo a 75 cm | Embaixo da janela, centro-direita |
| Gaveteiro 4 gavetas (8/14/14/25 cm) | 40 larg, até o chão | Embaixo da mesa, **lado da cama** |
| Monitor 22–24" | sobre a mesa, lado do guarda-roupa | Com suporte/base elevatória |
| CPU em suporte com rodas | ~22 × 45 | No chão ao lado do guarda-roupa (fora da mesa), 15 cm de respiro |

### Marcenaria da escrivaninha (fechado)
- Laterais em **chapa inteira** 60 × 72 (MDP/MDF 18 mm), sem pé
- Fundo **aberto** + **réguinha de 10 cm em pé** (de cutelo) embaixo do tampo, no fundo, parafusada nas laterais e no tampo
- Furo passa-cabo 60 mm no canto do monitor; canaleta + régua com interruptor embaixo do tampo
- Sapata niveladora/feltro sob as laterais

## 3. Evolução do app (o que já foi feito)

1. `planejador-comodos.html` (fora deste repo) — protótipo 2D em SVG, 1 arquivo.
2. **App de PC Electron** (`planejador-comodos-pc/`): `main.js` + `preload.js` + `index.html`
   (2D + 3D no mesmo arquivo, estado compartilhado `window.PLAN`, mesma chave de
   template do quarto 2,60 × 3,00).
3. **Porta 3D corrigida**: a folha saía como placa deitada; agora é vertical (2,05 m),
   com batentes, maçaneta e abertura para dentro (corrigido após print do usuário).
4. **Teclado**: 1–9 seleciona · setas movem 1 cm (Shift = 10 cm) com trava nas paredes ·
   R gira · Del exclui · Esc desseleciona. Vale no 2D e no 3D.
5. **Template atualizado** com o layout fechado acima (gaveteiro, monitor sobre a mesa,
   CPU com rodinhas; mesa 3D com chapas laterais + réguinha; gaveteiro com 4 frentes).
6. Atalho na área de trabalho do PC original (aponta para o `electron.exe` local —
   **refazer em cada PC novo**, ver §5).

## 4. Estrutura dos arquivos

```
planejador-comodos-pc/
├── package.json     # scripts: start | dist | dist:installer
├── main.js          # janela Electron, menu, salvar/abrir .json e PNG no disco
├── preload.js       # ponte segura (window.pcApi)
├── index.html       # app inteiro: CSS + lógica 2D (script clássico) + 3D (módulo Three.js via CDN)
├── historico.md     # ESTE ARQUIVO
└── .gitignore       # ignora node_modules/ e dist_electron/
```

Detalhes técnicos relevantes:
- Altura dos móveis no 3D é inferida pelo nome (`hFor()`): cama/guarda-roupa/mesa/torre/
  gaveteiro/monitor/CPU. Nomeou diferente, renderiza como caixa genérica de 0,90 m.
- Itens `gaveteiro|monitor` são ignorados no alerta de sobreposição 2D (ficam sobre/embaixo da mesa).
- Persistência dupla: `localStorage` (automático) + arquivo `.json` (Arquivo → Salvar).
- O 3D baixa o Three.js do CDN na 1ª vez (precisa de internet); o 2D é 100% offline.

## 5. Como continuar em outro PC

```bash
git clone https://github.com/VectraInsights/modular.git
cd modular
npm install --no-audit --no-fund
node node_modules/electron/install.js   # baixa o binário do Electron
npm start                                # abre o app
```

Opcional:
- `npm run dist` → gera o `.exe` portátil em `dist_electron/`
- Atalho manual: criar `.lnk` na área de trabalho com destino
  `.../modular/node_modules/electron/dist/electron.exe`, argumentos `.`,
  pasta inicial `.../modular`.

## 6. Próximos passos sugeridos (não feitos)

- [ ] Altura editável por móvel (hoje é inferida pelo nome no 3D)
- [ ] Empacotar o Three.js local (3D 100% offline)
- [ ] Ícone próprio do app (`.ico`) + atalho criado pelo instalador
- [ ] Medir e exibir a passagem mínima em tempo real no 3D
- [ ] Biblioteca de peças (beliche, criado-mudo, prateleira) em 1 clique

## 7. Registro de sincronizações

| Data | Onde | O que foi feito |
|---|---|---|
| 08/09/2026 | PC Eduarda | Projeto inicial subido ao repositório (app 2D+3D completo). |
