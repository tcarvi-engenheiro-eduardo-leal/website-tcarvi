# Guia de Contribuição (CONTRIBUTING)

Este guia descreve como configurar o ambiente de desenvolvimento para contribuir com o projeto `website-tcarvi.com.br`.

## 1. Pré-requisitos

- Node.js (versão LTS recomendada)
- Angular CLI (v17 ou superior)

## 2. Configuração do Ambiente

O projeto utiliza uma arquitetura de micro-frontends com Module Federation, Server-Side Rendering (SSR) e Static-Site Generation (SSG) para otimização de performance e SEO. Siga os passos abaixo para recriar a estrutura do projeto.
### Passo 2.1: Criar o Workspace Vazio

Este comando cria a estrutura do workspace sem uma aplicação inicial, o que é ideal para a nossa arquitetura.

```bash
ng new website --ai-config=gemini --create-application=false --package-manager=npm --skip-git=true
cd website
ng new website-tcarvi --create-application=false
cd website-tcarvi
```

### Passo 2.2: Gerar a Aplicação Principal (Host)

Dentro do workspace, geramos a aplicação que servirá como "host" ou "shell".

```bash
ng generate application host-app --routing --style=scss 
```

### Passo 2.3: Configurar Module Federation e App Shell

Com a aplicação principal criada, configuramos o Module Federation para carregar micro-frontends e o App Shell para otimizar o carregamento inicial.

```bash
# Configura o host para Module Federation
ng generate module-federation --project=meu-projeto-principal --type=host
ng generate module-federation --project=website-tcarvi-host --type=host

# Adiciona o App Shell ao host
ng generate app-shell --project=meu-projeto-principal
ng generate app-shell --project=website-tcarvi-host
```
