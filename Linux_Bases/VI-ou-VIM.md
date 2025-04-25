# VI ou VIM - Éditeurs de texte en ligne de commande
## La commande 

Vi : L'éditeur de texte standard
vim = Une version améliorée de vi

Modifier du texte :
- ``i ``: Passer en mode insertion avant le curseur.
- ``a`` : Passer en mode insertion après le curseur.
- ``o`` : Créer une nouvelle ligne en dessous et entrer en mode insertion.
- ``O`` : Créer une nouvelle ligne au dessus et entrer en mode insertion.
- ``dd`` : Supprimer la ligne courante.
- ``yy ``: Copier la ligne courante (yank).
- ``p`` : Coller le texte copié ou coupé après le curseur.

Autres options : 
- ``u`` : Annuler la dernière modification.
- ``Ctrl + r`` : Refaire l'action annulée.
- ``/motif ``: Chercher "motif" dans le fichier.
- ``n`` : Passer à la prochaine correspondance de recherche.
- ``N ``: Passer à la précédente correspondance de recherche.
- ``:w`` : Sauvegarder le fichier.
- ``:q`` : Quitter le fichier (si aucune modification n'a été faite).
- ``:q!`` : Quitter sans enregistrer les modifications.
- ``:wq`` ou :x : Sauvegarder et quitter
- ``:set`` : Affiche les options personnalisées
- ``:set all`` : Affiche toute les options
- ``:set option`` : Active une option

Quelques options pour le .virmrc (personnalisation de VIM au démarrage de la session) :
```bash
set number  #  Affiche les numéros de ligne
set tabstop=4 #  Définit la largeur d'un tabulateur (en nombre d'espaces). Par exemple, 4 espaces pour chaque tabulation.
set showcmd # Affiche la commande en cours de saisie dans la barre de statut.
set cursorline # Met en surbrillance la ligne du curseur.
syntax enable # Active la coloration syntaxique.
```

## Power of G

``:g`` permet d'effectuer des opérations sur un groupe de lignes qui correspondent à un motif donné.

Les commandes utilisent globalement la forme ci-dessous : 
```bash
:<ligne> g/regex de recherche/commande de modif
# La pz 
```

Types de commandes de modification

| Commande                              | Action                                                                    | Exemple                   | Explication de l’exemple                                                          |
| ------------------------------------- | ------------------------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| `:g/pattern/d`                        | Supprime toutes les lignes contenant `pattern`                            | `:g/erreur/d`             | Supprime toutes les lignes contenant "erreur"                                     |
| `:g/pattern/s/old/new/g`              | Substitue `old` par `new` sur les lignes contenant `pattern`              | `:g/https/s/http/https/g` | Dans les lignes contenant "https", remplace "http" par "https"                    |
| `:g/pattern/m n`                      | Déplace les lignes contenant `pattern` après la ligne `n`                 | `:g/^#/m 0`               | Déplace toutes les lignes de commentaire (commençant par `#`) en début de fichier |
| `:g/pattern/yank` ou `:g/pattern/t n` | Copie (`yank`) ou duplique (`t n`) les lignes vers une autre ligne        | `:g/titre/t $`            | Duplique les lignes contenant "titre" à la fin du fichier                         |
| `:g!/pattern/d`                       | Supprime toutes les lignes **ne contenant pas** `pattern`                 | `:g!/TODO/d`              | Ne garde que les lignes contenant "TODO"                                          |
| `:v/pattern/d`                        | (équivalent de `:g!`) Inverse : agit sur lignes ne contenant pas le motif | `:v/OK/d`                 | Supprime les lignes qui ne contiennent pas "OK"                                   |


```bash
:g/pattern/d  # Supprimer les lignes contenant pattern
:g/pattern/p  # Afficher les lignes contenant pattern
:g/pattern/s/old/new/g # Remplacer old par new dans les lignes contenant pattern
:g/pattern!echo Hello # Exécuter une commande externe (ex. echo) sur chaque ligne correspondante
```


