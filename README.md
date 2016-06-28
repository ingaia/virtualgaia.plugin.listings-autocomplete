#Plugin Listings Autocomplete para VirtualGaia

##Instalação

## Node e Bower
Verifique se está instalado em seu computado o Node e o Bower. Caso não estiver:

### Instale Node e Bower no seu computador
 1. Instale o  [NodeJS](https://nodejs.org/en/)
 2. Após, instale o bower com `npm install bower -g`

## Verificar se há o bower.json no site
Se não haver o arquivo `bower.json`  na raiz do site:
```shell
bower init
```
Siga os passos e seja feliz.

## Instale o plugin de Listings Autocomplete
-  Rode `bower install virtualgaia.plugin.listings-autocomplete -D`
-   Adicione as referências necessárias:
```html
	<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/typeahead.js/dist/typeahead.jquery.min.js"></script>
	<script type="text/javascript" src="bower_components/typeahead.js/dist/bloodhound.min.js"></script>
	<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
	<script type="text/javascript" src="bower_components/angular-typeahead/angular-typeahead.min.js"></script>
	<script type="text/javascript" src="dist/listings.autocomplete.min.js"></script>
```
-  Adicione o módulo de `virtualgaia` na tag `html` se há não tiver:
```html
<html lang="pt-br" ng-app="virtualgaia">
```
-  Inclua na busca lateral o html:
```html
<listings-autocomplete
	query-string="{cidade2: 85,dorm:4}"
	remote="/api/neighborhoods"
></listings-autocomplete>
```

## Atributos
A tag `<listings-autocomplete>` suporta os atributos:

***key(string)**:  chave da query string. Ex: `cidade2`. Default: `null`
***remote(string)**: endpoint de consulta da API. Ex: `/api/cities`. Default: `null`
**query-string(object)**: query string em formato de objeto JS. Ex: `{cidade2: 85,dorm:3}`. Default: `{}`
**destination(string)**: URL destino. Ex: `listagem.aspx`. Default: `""`
**css(string)**: Classe css. Ex: `listagem.aspx`. Default: `form-control`
