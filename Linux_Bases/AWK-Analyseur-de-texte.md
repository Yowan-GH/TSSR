# AWK - Analyseur de texte
## La commande 

`awk` est un **langage de traitement de texte** en ligne de commande.  
Il permet d'analyser, filtrer, transformer et formater des fichiers ligne par ligne.

Syntaxe
```bash
awk [options] 'pattern { action }' fichier
```

- `pattern` : condition (facultatif)
- `action` : ce qu'on fait si le pattern est vrai (ex: `print`, `calcul`, etc.)

Options principales

|Option|Description|
|---|---|
|`-F`|Définit le **séparateur de champ** (par défaut : espace ou tab)|
|`-v var=val`|Passe une variable shell à `awk`|
|`-f fichier`|Lit un script `awk` depuis un fichier|

---
Adresses (Patterns)

|Pattern|Description|Exemple|
|---|---|---|
|`/motif/`|Ligne contenant le motif|`/404/ { print $0 }`|
|`NR == 1`|Première ligne|`NR == 1 { print }`|
|`NF > 3`|Lignes avec plus de 3 champs|`NF > 3 { print $1 }`|
|`NR % 2 == 0`|Lignes paires|`NR % 2 == 0 { print }`|

---
Actions / Commandes

| Action   | Description                    |
| -------- | ------------------------------ |
| `print`  | Affiche un ou plusieurs champs |
| `printf` | Affichage formaté              |
| `next`   | Passe à la ligne suivante      |
| `exit`   | Arrête le traitement           |

---
Variables intégrées

| Variable        | Description                           |
| --------------- | ------------------------------------- |
| `$0`            | La ligne complète                     |
| `$1`, `$2`, ... | Les champs individuels                |
| `NR`            | Numéro de ligne en cours              |
| `NF`            | Nombre de champs sur la ligne         |
| `FS`            | Field Separator (séparateur d’entrée) |
| `OFS`           | Output Field Separator (en sortie)    |

Exemples : 
```bash
# Afficher la première colonne de chaque ligne :
awk '{ print $1 }' fichier.txt
# Utiliser : comme séparateur
awk -F':' '{ print $1, $3 }' /etc/passwd
# Afficher les lignes contenant "erreur"
awk '/erreur/ { print }' journal.log
# Afficher les lignes avec plus de 3 champs
awk 'NF > 3' fichier.txt
# Afficher des colonnes avec formatage (`printf`)
awk '{ printf "Nom: %s - ID: %s\\n", $1, $3 }' fichier.txt
# Ce que ça fait :
# - Affiche la colonne 1 (`$1`) comme un nom 
# - Affiche la colonne 3 (`$3`) comme un identifiant 
# - Utilise `printf` pour **formater proprement** l'affichage, comme en langage C
```

