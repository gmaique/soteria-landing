# Landing Page — como usar e publicar

## 1. Preencher os dados (abra `index.html` num editor e troque)
| Placeholder | O que colocar | Onde aparece |
|---|---|---|
| `Ginmaique dos Reis` | Seu nome | topo, rodapé, títulos |
| `208582/D` | Nº do CREA-PR | header, autoridade, rodapé |
| `{{MTE}}` | Nº do registro MTE | autoridade, rodapé |
| `5541985058491` | WhatsApp só números: `5541999998888` (55 + DDD + número) | **no script, é o que faz o botão funcionar** |
| `(41) 98505-8491` | Telefone formatado p/ ler: `(41) 99999-8888` | rodapé |
| `{{EMAIL}}` | Seu e-mail | rodapé |

> O mais importante é o `5541985058491` no `<script>` — sem ele os botões não abrem o WhatsApp.

## 2. Testar
- Dê duplo clique no `index.html` → abre no navegador.
- Clique nos botões de WhatsApp e envie o formulário pra ver a mensagem montada.

## 3. Publicar (grátis ou quase)
- **Mais fácil:** arraste a pasta em [app.netlify.com/drop](https://app.netlify.com/drop) → site no ar em segundos (grátis).
- **Alternativas grátis:** Vercel, Cloudflare Pages, GitHub Pages.
- **Domínio próprio** (recomendado p/ Google Ads): registre algo como `segurancadotrabalho{{cidade}}.com.br` no Registro.br (~R$ 40/ano) e aponte pro Netlify.

## 4. Conectar ao Google Ads
- Crie a campanha apontando pra essa URL.
- Use as palavras-chave de `../aquisicao-online-e-automacao.md`.
- Adicione o **Google Tag / Pixel** no `<head>` pra medir conversões (cada clique no WhatsApp).

## Notas de design
- Tema industrial: charcoal + amarelo de segurança + faixa de perigo (hazard tape).
- Fontes Archivo Black (títulos) + IBM Plex Sans (texto) — carregam do Google Fonts.
- Responsivo (funciona no celular), com animações de entrada e botão flutuante de WhatsApp.
- 100% estático: 1 arquivo, sem servidor, sem custo de hospedagem.
