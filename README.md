# OpusIA – Landing Page Estática

Este repositório contém a versão estática da landing page do OpusIA preparada para ser servida via GitLab Pages. Todo o conteúdo é escrito em HTML/CSS/JS vanilla e cada arquivo `.html` já traz o cabeçalho/rodapé completos, o que permite executar qualquer página de forma independente.

## Estrutura

```
├── *.html                # Páginas (Início, Sobre, Serviços, Contato, Login, Cadastro, layout base)
├── css/                  # Estilos globais e específicos
├── fonts/, images/, js/  # Assets utilizados na landing page
└── .gitlab-ci.yml        # Pipeline para gerar o site estático para o GitLab Pages
```

O arquivo `base.html` serve apenas como referência do layout global. Para manter a consistência entre as páginas, cada uma replica o cabeçalho, o rodapé e importa o script `js/nav.js`, responsável por animar o menu responsivo (hambúrguer).

## Desenvolvimento local

1. Clone o repositório e abra o diretório raiz.
2. Sirva os arquivos com qualquer servidor estático (ex.: `npx serve .`, `python -m http.server`) **ou** abra os `.html` diretamente no navegador — não há dependência de `fetch`, então tudo funciona em `file://`.
3. Acesse `inicio.html` e utilize o menu para navegar entre as demais páginas.

## Deploy no GitLab Pages

O arquivo `.gitlab-ci.yml` já prepara o projeto para o GitLab Pages:

```yaml
pages:
  stage: deploy
  script:
    - mkdir -p public
    - cp -r css fonts images js *.html public/
  artifacts:
    paths:
      - public
  only:
    - main
    - master
```

Basta criar o projeto no GitLab, adicionar este repositório e enviar o branch `main` ou `master`. A pipeline criará a pasta `public` com todos os arquivos necessários e o GitLab Pages publicará automaticamente em `https://<usuario>.gitlab.io/<projeto>/`.

## Personalização

- Atualize o layout global em `base.html` para refletir novas seções do menu ou CTAs.
- Adicione novas páginas criando um arquivo `.html` que importe `css/landing_page/base.css`, seus estilos específicos e o script `js/nav.js`.
- Inclua assets adicionais em `images/`, `css/` ou `js/` e eles serão copiados automaticamente para o deploy.

Sinta-se à vontade para adaptar cores, textos e animações conforme a evolução do projeto.
