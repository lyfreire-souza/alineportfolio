# Aline Freire — Portfolio

Personal portfolio website — Business Analyst & AI Automation Specialist, Dublin.
Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no external dependencies.

🔗 **Live:** https://SEU-USUARIO.github.io/

---

## ✨ Features

- Minimal, premium design inspired by Notion, Linear, Stripe and Vercel
- Light / dark mode (follows system preference, remembers your choice)
- Fully responsive (desktop, tablet, mobile)
- Scroll-reveal animations with Intersection Observer
- Animated skill bars
- Smooth scrolling and active-section navigation
- SEO, Open Graph (LinkedIn) and Twitter meta tags + JSON-LD
- Accessible: skip link, keyboard focus states, `prefers-reduced-motion` support
- Embedded SVG favicon

## 📁 Structure

```
/
├── index.html          # Content and structure (all sections)
├── styles.css          # Design tokens, layout, themes, animations
├── script.js           # Theme, menu, animations, small interactions
├── README.md
└── assets/
    ├── profile.jpg         # Profile photo (square, ~600×600)
    ├── og-image.png        # LinkedIn share preview (1200×630)
    ├── Aline-Freire-CV.pdf # CV for the "Download CV" button
    └── projeto-1.jpg ...   # (optional) project images
```

## ✏️ Como personalizar (checklist)

Procure e substitua no `index.html`:

| Procure                 | Troque por                                   |
|-------------------------|----------------------------------------------|
| `SEU-USUARIO`           | Seu usuário do GitHub                        |
| `SEU-PERFIL`            | Seu identificador do LinkedIn                |
| `SEU-EMAIL@exemplo.com` | Seu e-mail                                   |
| `YYYY — YYYY`           | Datas reais de cada experiência              |
| `Company name`          | Nome da empresa (PMO Support)                |
| `Certification name`    | Seus certificados reais                      |
| `href="#"`              | Links reais de demos e credenciais           |

- **Nova experiência:** copie um bloco `<li class="timeline__item">`.
- **Novo projeto:** copie um bloco `<article class="card project">`.
- **Imagem de projeto:** troque `<div class="project__art ...">…</div>` por `<img src="assets/projeto-1.jpg" alt="Descrição">`.
- **Nível de habilidade:** altere `data-level="85"` e o texto `85%`.
- **Cor de destaque:** altere `--accent` em `styles.css` (há um valor para o tema claro e outro para o escuro).

## 🚀 Run locally

Just open `index.html` in your browser, or serve the folder:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## 📄 License

© Aline Freire. All rights reserved.
