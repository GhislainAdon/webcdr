# WebCDR
## interface de promotion de CDR et d'écoute des enregistrements d'appels pour Asterisk

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

### Opportunités

- Visualisation CDR, filtrée par heure, numéro de téléphone, statut, direction des appels
- lecteur HTML5 / flash intégré pour écouter les enregistrements d'appels
- télécharger les enregistrements d'appels un par un et en groupe dans une archive zip
- exporter vers Excel (xlsx)
- statistiques sur les appels entrants par jour de la semaine / heure de la journée, regroupées par tranches de numéros, avec exportation vers Excel
- interface d'administration pour la gestion des utilisateurs
- restreindre l'accès des utilisateurs aux données sur les numéros de poste individuels
- facultatif - autorisation de l'utilisateur via ActiveDirectory

### la mise en oeuvre

Côté serveur - node.js, API REST sur express.js. 
Côté client - une application d'une seule page sur Backbone / Marionette, dépendances via npm / bower, construite à l'aide de Browserify.

### Configuration requise

La partie client a été testée sur les versions actuelles de Safari, Firefox, Chrome. Le travail dans IE n'a pas été testé, le support n'est pas garanti.

Configuration requise pour le serveur: io.js 3.0+, npm. Le travail sur node.js 0.10+ n'a pas été testé. SGBD - MySQL 5.1+.

### TODO

- ajouter un installateur
- ajouter des instructions détaillées pour configurer Asterisk
- paquets deb / rpm
- rendre la liste des groupes pour les rapports configurable
- implémenter une prise en charge complète des fuseaux horaires
- ajouter le support i18n
