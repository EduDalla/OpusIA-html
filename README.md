# OpusIA – Landing Page Institucional

Projeto estático em HTML/CSS/JS que apresenta o OpusIA, destacando seu produto de PDI guiado por IA. Cada página possui cabeçalho e rodapé completos, o que permite abrir qualquer arquivo `.html` de forma independente (inclusive diretamente via `file://`).

## Principais seções

- **Início (`inicio.html`)** – hero com CTA, métricas, vídeo, vitrine de funcionalidades e depoimentos.
- **Sobre, Serviços e Contato** – páginas dedicadas com o mesmo layout global (`base.html` como referência).
- **Cadastro/Login** – telas estáticas para fluxo de autenticação básico.
- **Formulários com EmailJS** – hero e página de contato disparam e-mails diretamente para `eduardodallabella@gmail.com`.

## Tecnologias

- HTML semântico e responsivo.
- CSS modular (arquivos em `css/landing_page/...`).
- JavaScript vanilla para navegação (`js/nav.js`), formulário do hero (`js/hero-form.js`) e formulário de contato (`js/contact-form.js`).
- EmailJS para envio de leads e mensagens sem backend.

## Estrutura do projeto

```
├── *.html                 # Páginas independentes (Início, Sobre, Serviços, Contato etc.)
├── css/
│   └── landing_page/...   # Base global + estilos específicos das páginas
├── js/
│   ├── nav.js             # Menu responsivo
│   ├── hero-form.js       # Formulário do hero em inicio.html
│   └── contact-form.js    # Formulário da página de contato
├── images/, fonts/        # Assets estáticos
└── .gitlab-ci.yml         # Pipeline para publicar no GitLab Pages
```

## Executando localmente

1. Clone o repositório e acesse a raiz.
2. Sirva com qualquer servidor estático (`npx serve .`, `python -m http.server`) **ou** abra os `.html` diretamente no navegador.
3. Inicie por `inicio.html` e navegue pelas demais páginas pelo menu.

## Configurando o EmailJS

1. Crie um serviço no painel do [EmailJS](https://www.emailjs.com/) (ex.: Gmail ou SMTP próprio).
2. Crie dois templates (um para o hero e outro para o contato) ou reutilize o mesmo, certificando-se de expor os campos:
   - `from_name`, `from_email`, `reply_to`, `hero_message` (hero)  
   - `contact_subject`, `contact_message`, `to_email` (contato)
3. Copie os IDs do serviço, template e `publicKey` gerados.
4. Atualize os atributos `data-email-service`, `data-email-template` e `data-email-public-key` nos formulários:
   - Hero: `inicio.html`, linhas 63–67.
   - Contato: `contato.html`, linhas 50–79 (também aceita `data-recipient-email`).
5. Publique as alterações. Os scripts `js/hero-form.js` e `js/contact-form.js` já cuidam da validação, feedback visual e envio.

## Deploy no GitLab Pages

O arquivo `.gitlab-ci.yml` copia automaticamente `*.html`, `css`, `js`, `images` e `fonts` para a pasta `public`. Basta enviar o branch `main`/`master` para o GitLab que a pipeline publica o site em `https://<usuario>.gitlab.io/<projeto>/`.

## Personalizações rápidas

- Ajuste navegação/global em `base.html`.
- Crie novas páginas duplicando um `.html` existente e atualizando o CSS específico.
- Substitua textos, imagens e CTAs conforme a evolução do produto.
