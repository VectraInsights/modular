# HISTORICO — Planejador de Comodos (Oblíquo Studio)

Arquivo de continuidade: quem abrir este repositorio em outro PC comeca aqui.
Ultima atualizacao: 14/09/2026.

## 1. O que e

App de PC (Electron) **e** site (Vercel) para planejar comodos so digitando medidas.
Desenha a **planta 2D em escala** + **visao 3D** (Three.js), salva projeto em .json
e exporta PNG e **XLS (plano de corte)**. Feito para planejar o quarto da crianca
antes de comprar/mandar fazer os moveis.

- App de PC (Electron): `main.js` + `preload.js` + `index.html`
- Site (Vercel): o proprio `index.html` na raiz do repo (site estatico, sem build)
- Mesma base de codigo nos dois: o app Electron apenas adiciona o acesso ao disco.

## 2. O quarto real que originou o projeto

- Medidas: **3,00 m (parede da porta/direita) x 2,60 m (parede da janela/fundo) x 2,40 m altura** (~7,8 m2)
- **Porta: parede esquerda, no TOPO** (canto superior esquerdo), 0,80 m
- **Janela: parede de baixo** (2,60 m), ~1,50 m de largura
- Usuario: crianca de 10 anos — dormir + estudar + PC

### Layout fechado (nao mudar sem motivo)
| Moveis | Medida | Posicao |
|---|---|---|
| Box bau solteiro | 90 x 200 | Parede da porta, abaixo da porta; **cabeceira para a janela**, pe para a porta |
| Guarda-roupa porta de correr | 60 prof x 180 | Parede direita, encostado no fundo (max. 200) |
| Escrivaninha estudo + PC | 120 x 60, tampo a 75 cm | Embaixo da janela, centro-direita |
| Gaveteiro 4 gavetas (8/14/14/25 cm) | 40 larg, ate o chao | Embaixo da mesa, **lado da cama** |
| Monitor 22-24" | sobre a mesa, lado do guarda-roupa | Com suporte/base elevatoria |
| CPU em suporte com rodas | ~22 x 45 | No chao ao lado do guarda-roupa, 15 cm de respiro |

### Marcenaria da escrivaninha (fechado)
- Laterais em **chapa inteira** 60 x 72 (MDP/MDF 18 mm), sem pe
- Fundo **aberto** + **reguinha de 10 cm em pe** (de cutelo) embaixo do tampo
- Furo passa-cabo 60 mm no canto do monitor; canaleta + regua com interruptor
- Sapata niveladora/feltro sob as laterais

## 3. Evolucao do app (o que ja foi feito)

1. planejador-comodos.html (fora deste repo) — prototipo 2D em SVG, 1 arquivo.
2. **App de PC Electron**: main.js + preload.js + index.html (2D + 3D, estado compartilhado window.PLAN).
3. **Porta 3D corrigida**: folha vertical (2,05 m), batentes, macaneta, abertura para dentro.
4. **Teclado**: 1-9 seleciona, setas 1 cm (Shift=10 cm), R gira, Del exclui, Esc desseleciona.
5. **Template atualizado** com layout fechado (gaveteiro, monitor, CPU, mesa 3D, gaveteiro 4 frentes).
6. Atalho na area de trabalho (refazer em cada PC novo, ver §5).
7. **Cores por parede**: cor individual via color picker no painel lateral.
8. **Textura do chao**: canvas IIFE com padrao de tacos, CanvasTexture no Three.js.
9. **Macaneta 3D**: esfera metalica na porta (metalness 0.8).
10. **Edicao inline**: duplo-clique no 2D edita nome. Botao R gira 90°.
11. **Trava de paredes no 3D**: setas nao ultrapassam limites da sala.
12. **rebuild() seguro**: try/catch previne tela preta no 3D.
13. **Cache-busting no Electron**: ?v=Date.now() ao carregar index.html.
14. **Encoding UTF-8** forcado em todos os arquivos.
15. **Guarda-roupa — orientacao**: abre para frente (centro da sala), eixo dominante X/Z.
16. **Guarda-roupa — modal**: preview visual, posicoes individuais em mm, alturas por gaveta.
17. **Guarda-roupa — rodape**: checkbox, altura configuravel (mm), padrao 80mm.
18. **Guarda-roupa — varao**: posicao editavel (mm do chao), largura total do modulo.
19. **Botoes 3D**: "Paredes: solidas/fantasmas" (opacity 0) + "Moveis: livres/travados".
20. **Compatibilidade retro**: alturas[] antigo convertido para pos[] automaticamente.
21. **Trava de moveis com mouse** (2D e 3D) + deselecao ao clicar no chao.
22. **Botao D (duplicar movel)** na lista de moveis.
23. **Linhas divisorias** entre gavetas / prateleiras / portas (filete escuro).
24. **Botao "Ocultar nomes"** no 3D (toggle de sprites).
25. **Puxadores proporcionais**: gavetas 6 cm, portas centralizadas em 25% da altura, metalicos.
26. **Portas do guarda-roupa**: quantidade + posicao (mm) + altura (mm) individual por porta,
    sempre na face externa, com puxador espelhado no encontro das portas.
27. **Gaveteiro abre para o centro da sala** + frentes 25/14/14/8 cm.
28. **Rebrand "Obliquo Studio"**: productName, appId, titulo, menu "Sobre" e encoding.
29. **Textura por movel**: auto / liso / madeira / madeira-clara / carvalho /
    carvalho-escuro / freijo / ebano / tecido (texturas procedurais em canvas).
30. **Rodizios em 4 cantos** (checkbox por movel).
31. **Divisoria do maleiro evidenciada** (filete preto + filete claro).
32. **Exportar XLS — plano de corte**: 1 linha por peca (laterais, topo, fundo, rodape,
    prateleiras, gavetas, portas), cabecalho completo (Quantidade, Comprimento, Largura,
    Funcao, Fita C1/C2, Fita L1/L2, Complemento), separacao por TAB e sem aspas.
33. **Fix do bloco duplicado** que quebrava o JS na funcao exportXLS (commit 8f67d9d).

## 4. Estrutura dos arquivos

```
modular/
├── package.json     # scripts: start | dist | dist:installer
├── main.js          # janela Electron, menu, salvar/abrir .json e PNG no disco
├── preload.js       # ponte segura (window.pcApi)
├── index.html       # app inteiro: CSS + logica 2D + 3D (Three.js via CDN) + modal guarda-roupa
├── historico.md     # ESTE ARQUIVO
├── vercel.json      # configuracao Vercel (site estatico)
├── meu-comodo.json  # exemplo de projeto salvo
└── .gitignore       # ignora node_modules/ e dist_electron/
```

Detalhes tecnicos:
- Estado global em `window.PLAN.state` (`room`, `openings`, `furn`, `wallColors`).
- Altura dos moveis no 3D e inferida pelo nome (hFor()) ou vem do campo `fH`.
- Itens gaveteiro|monitor ignorados no alerta de sobreposicao 2D.
- Persistencia dupla: localStorage + arquivo .json.
- O 3D baixa o Three.js do CDN na 1a vez; o 2D e 100% offline.
- O guarda-roupa guarda a config em `f.wardConfig` (gavetas/prateleiras/varao/maleiro/rodape/porta).

## 5. Como continuar em outro PC

```bash
git clone https://github.com/VectraInsights/modular.git
cd modular
npm install --no-audit --no-fund
node node_modules/electron/install.js   # baixa o binario do Electron (postinstall bloqueado pelo npm 11)
npm start
```

Rodar no site (Vercel): o repo e estatico, `index.html` na raiz ja e o site.
`vercel.json` so define `cleanUrls`.

## 6. Fluxo de trabalho Git (IMPORTANTE)

- O app e **deployado via Vercel** a partir do branch `main` deste repo.
- **Toda alteracao precisa de `git commit` + `git push`** para aparecer no site.
- Antes de mexer: `git pull` para pegar o estado mais recente do repo.
- Fluxo padrao usado neste projeto:
  ```bash
  git pull
  # ... alteracoes ...
  git add -A
  git commit -m "fix: descricao curta do que mudou"
  git push
  ```
- O `historico.md` deve ser atualizado junto com as mudancas relevantes.

## 7. Proximos passos sugeridos (nao feitos)

- [ ] Altura editavel por moveis no 2D (hoje usa `fH` + inferencia por nome)
- [ ] Empacotar o Three.js local (3D 100% offline)
- [ ] Icone proprio do app (.ico)
- [ ] Medir e exibir passagem minima em tempo real no 3D
- [ ] Biblioteca de pecas (beliche, criado-mudo, prateleira) em 1 clique
- [ ] Otimizar fechaduras de portas/corredicas no 3D
- [ ] Item de menu "Exportar XLS" no menu do Electron (o renderer ja sabe tratar 'xls')

## 8. Registro de sincronizacoes

| Data | Onde | O que foi feito |
|---|---|---|
| 08/09/2026 | PC Eduarda | Projeto inicial subido ao repositorio (app 2D+3D completo). |
| 11/09/2026 | PC Eduarda | Correcoes encoder, cores por parede, chao textura, macaneta 3D, edicao inline, trava de paredes, rebuild seguro. |
| 11/09/2026 | PC Eduarda | Guarda-roupa: orientacao para frente, modal com preview, posicoes/alturas individuais, rodape, varao editavel. |
| 11/09/2026 | PC Eduarda | Botoes 3D: esconder paredes (opacity 0) + travar moveis. Cache-busting Electron. Compatibilidade retro alturas[]. |
| 11/09/2026 | Vercel | Move para a raiz do repo. Texturas de madeira procedurais. Porta(s) configuravel(is) com posicao/altura individual. |
| 11/09/2026 | Vercel | Puxadores proporcionais (gavetas 14cm, portas 15% alt). Linhas divisorias entre gavetas/prateleiras/portas. Botao ocultar nomes 3D. |
| 11/09/2026 | Vercel | Trava de moveis com mouse (2D+3D). Deselecao ao clicar no chao. Botao D duplicar movel. |
| 12/09/2026 | Vercel | Rebrand "Obliquo Studio" (productName/appId/titulo/Sobre). Textura por movel (auto/liso/madeira/madeira-clara/tecido) + rodizios 4 cantos. |
| 12/09/2026 | Vercel | Puxadores proporcionais e espelhados. Portas do guarda-roupa na face externa com posicao/altura individual. Divisoria do maleiro evidenciada. Gaveteiro abre para o centro. |
| 12/09/2026 | Vercel | Novas texturas de madeira: carvalho, carvalho-escuro, freijo e ebano. |
| 14/09/2026 | Vercel | Exportacao XLS do plano de corte (1 linha por peca, cabecalho completo, sem Material/Girar, colunas corretas). |
| 14/09/2026 | Vercel | Remocao de bloco duplicado que quebrava o JS na funcao exportXLS. |
| 10/11/2026 | PC Eduarda | Repo clonado, dependencias instaladas (npm install + install.js do Electron) e app verificado abrindo sem erro. `historico.md` atualizado e workflow de commit+push documentado. |
