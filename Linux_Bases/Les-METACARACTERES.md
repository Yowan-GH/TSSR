# Les-METACARACTERES

## 🔹 Métacaractères standards

|Métacaractère|Description|Exemple|Explication de l’exemple|
|---|---|---|---|
|`*`|Zéro ou plusieurs caractères|`ls *.txt`|Liste tous les fichiers se terminant par `.txt`|
|`?`|Un seul caractère|`ls fichier?.txt`|Liste `fichier1.txt`, `fichierA.txt`, etc. (un seul caractère après `fichier`)|
|`[]`|Un caractère parmi ceux spécifiés|`ls fichier[1-3].txt`|Liste `fichier1.txt`, `fichier2.txt`, `fichier3.txt`|
|`{}`|Liste ou plage de valeurs|`mkdir dossier{1..3}`|Crée `dossier1`, `dossier2`, `dossier3`|
|`|`|Redirige la sortie vers une autre commande|`ls|
|`>`|Redirige (écrase) la sortie vers un fichier|`echo "Hello" > fichier.txt`|Écrit "Hello" dans le fichier (en écrasant)|
|`>>`|Redirige (ajoute) la sortie vers un fichier|`echo "World" >> fichier.txt`|Ajoute "World" à la fin du fichier|
|`<`|Utilise un fichier comme entrée|`wc -l < fichier.txt`|Compte les lignes du fichier en le passant comme entrée à `wc`|
|`&`|Exécute une commande en arrière-plan|`sleep 10 &`|Lance `sleep 10` en tâche de fond|
|`;`|Sépare plusieurs commandes|`mkdir test; cd test`|Crée un dossier puis s’y déplace|
|`$`|Référence une variable|`echo $HOME`|Affiche la valeur de la variable d’environnement `HOME`|
|`\`|Échappe un métacaractère|`echo "Bonjour\*"`|Affiche "Bonjour*" sans interpréter `*` comme un motif|
|`"`, `'`|Délimitent les chaînes (comportement différent selon guillemets)|`"Mon répertoire est $HOME"`|Affiche le répertoire personnel avec les guillemets doubles qui conservent `$`|

---

## 🔹 Métacaractères avancés (glob extended - nécessite `shopt -s extglob`)

| Métacaractère | Description                                  | Exemple                | Explication de l’exemple                                                |
| ------------- | -------------------------------------------- | ---------------------- | ----------------------------------------------------------------------- |
| `!(...)`      | Tout sauf ce qui est spécifié                | `ls !(important.txt)`  | Liste tous les fichiers sauf `important.txt`                            |
| `?()`         | Zéro ou une occurrence                       | `ls fichier?(.txt)`    | Liste `fichier` et `fichier.txt`                                        |
| `*()`         | Zéro ou plusieurs occurrences                | `ls *.@(jpg            | png)`                                                                   |
| `+()`         | Une ou plusieurs occurrences                 | `ls +(*.txt)`          | Liste les fichiers `.txt` (au moins un match)                           |
| `@(...)`      | Exactement une occurrence                    | `ls @(file1            | file2)`                                                                 |
| `[...]`       | Un caractère dans une classe spécifiée       | `ls fichier[a-c].txt`  | Liste `fichiera.txt`, `fichierb.txt`, `fichierc.txt`                    |
| `[^...]`      | Un caractère **hors** de la classe spécifiée | `ls fichier[^a-c].txt` | Liste tous les fichiers sauf ceux avec `a`, `b`, ou `c` après `fichier` |






