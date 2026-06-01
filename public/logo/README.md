# Logo

Coloque os arquivos da logo aqui. Tudo dentro de `public/` é servido a partir da raiz do site.

## Como referenciar

Um arquivo salvo como `public/logo/logo.svg` fica acessível em `/logo/logo.svg`.
No template (ex.: header), use o caminho **sem** `public/` e **sem** barra inicial:

```html
<img src="logo/logo.svg" alt="Seeds Genetics SR" />
```

## Arquivos sugeridos

- `logo.svg` — logo principal (preferir SVG por ser vetorial/nítido em qualquer tela)
- `logo-mark.svg` — apenas o símbolo/ícone (para o header compacto e favicon)
- `logo-white.svg` — versão clara, para usar sobre o fundo escuro do tema
- `logo.png` — fallback em PNG (use 2x/3x se for raster, ex.: 512px)

> Dica: como o site usa tema dark, garanta uma versão da logo legível sobre fundo escuro (`logo-white.svg`).
