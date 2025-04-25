# GREP - Recherche dans un fichier
## La commande 

La commande 🔍 ``grep`` est très utile pour chercher des informations dans un fichier texte

Syntaxe 
```bash
grep [option] "motif" fichier
```
Options courantes :
- ``-i`` : Ignore la casse (majuscule/minuscule).
- ``-v ``: Inverse la recherche, affichant les lignes qui ne correspondent pas au motif.
- ``-r ou -R`` : Recherche récursive dans les sous-répertoires.
- ``-l`` : Affiche seulement les noms des fichiers contenant le motif.
- ``-n`` : Affiche le numéro de ligne avant chaque ligne correspondante.
- ``-c`` : Affiche le nombre de correspondances par fichier.
- ``-w`` : Recherche le motif comme un mot entier (pas une sous-chaîne).
- ``-x`` : Correspond exactement à la ligne (la ligne entière doit correspondre).
- ``-e`` : Permet de spécifier plusieurs motifs à rechercher.
- ``-E`` : Permet l’utilisation de REGEX
- ``-a ``: Traite les fichiers binaires comme des fichiers texte (lors d’une erreur de binaire)
- ``--color`` : Met en couleur le motif trouvé


*Quelques exemples :*
```bash
grep -r "erreur" /var/log/    # Recherche récursive dans un dossier
grep "erreur" *.log /var/log  # Recherche les erreur dans tous les fichiers .log
cat fichier | grep erreur # grep "erreur" fichier

```
## Expressions régulières (REGEX)

Les expressions régulières REGEX permettent de faire des recherches très puissantes et précises dans du texte.

 🔹**Caractères généraux**

| Caractère | Description                                     | Exemple                     | Explication de l’exemple                                   |
| --------- | ----------------------------------------------- | --------------------------- | ---------------------------------------------------------- |
| `.`       | N'importe quel caractère sauf retour à la ligne | `grep "a.b" fichier.txt`    | Correspond à "a" suivi d’un caractère quelconque, puis "b" |
| `^`       | Début de ligne                                  | `grep "^motif" fichier.txt` | Affiche les lignes commençant par "motif"                  |
| `$`       | Fin de ligne                                    | `grep "motif$" fichier.txt` | Affiche les lignes se terminant par "motif"                |

---

🔹 Quantificateurs

|Caractère|Description|Exemple|Explication de l’exemple|
|---|---|---|---|
|`*`|0 ou plusieurs occurrences|`grep "a*b" fichier.txt`|Correspond à "b", "ab", "aab", "aaab", etc.|
|`+`|1 ou plusieurs occurrences (avec `-E` ou `-P`)|`grep -E "a+b" fichier.txt`|Correspond à "ab", "aab", "aaab", etc.|
|`?`|0 ou 1 occurrence|`grep "a?b" fichier.txt`|Correspond à "b" ou "ab"|
|`{n,m}`|Entre n et m occurrences|`grep "a{2,4}b" fichier.txt`|Correspond à "aab", "aaab", ou "aaaab"|
|`{n}`|Exactement n occurrences|`grep "a{3}b" fichier.txt`|Correspond uniquement à "aaab"|

---

 🔹 Classes de caractères

|Caractère|Description|Exemple|Explication de l’exemple|
|---|---|---|---|
|`[abc]`|Un caractère parmi ceux listés|`grep "[aeiou]" fichier.txt`|Correspond à toute ligne contenant une voyelle|
|`[^abc]`|Tout caractère **sauf** ceux listés|`grep "[^aeiou]" fichier.txt`|Affiche les lignes avec des caractères autres que les voyelles|
|`[a-z]`|Une lettre minuscule|`grep "[a-z]" fichier.txt`|Affiche les lignes contenant au moins une lettre minuscule|
|`[A-Z]`|Une lettre majuscule|`grep "[A-Z]" fichier.txt`|Affiche les lignes contenant au moins une lettre majuscule|
|`[0-9]`|Un chiffre|`grep "[0-9]" fichier.txt`|Affiche les lignes contenant au moins un chiffre|

---

🔹 Opérateurs logiques

|Caractère|Description|Exemple|Explication de l’exemple|
|---|---|---|---|
|`|`|OU logique (avec `-E`)|`grep -E "motif1|
|`()`|Grouper des motifs (`-E` ou `-P`)|`grep -E "(motif1|motif2)" fichier.txt`|
|`[]`|Classe ou plage de caractères|`grep "[a-z]" fichier.txt`|Recherche un caractère dans la plage de a à z|

---

🔹 Assertions avancées (avec `grep -P`)

|Caractère|Description|Exemple|Explication de l’exemple|
|---|---|---|---|
|`\b`|Limite de mot (début ou fin)|`grep -P "\bword\b" fichier.txt`|Correspond exactement au mot `word`|
|`\B`|Pas une frontière de mot|`grep -P "a\Bb" fichier.txt`|Correspond à "ab", mais pas à un mot isolé|
|`\d`|Chiffre (`[0-9]`)|`grep -P "\d+" fichier.txt`|Recherche une ou plusieurs occurrences de chiffres|
|`\D`|Non-chiffre (`[^0-9]`)|`grep -P "\D+" fichier.txt`|Recherche une ou plusieurs occurrences de caractères non numériques|
|`\w`|Lettre, chiffre ou underscore (`[a-zA-Z0-9_]`)|`grep -P "\w+" fichier.txt`|Recherche des séquences de caractères de mot|
|`\W`|Caractère non alphanumérique (`[^a-zA-Z0-9_]`)|`grep -P "\W+" fichier.txt`|Recherche des symboles ou ponctuations|
