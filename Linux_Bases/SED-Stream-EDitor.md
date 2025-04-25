# SED (Stream EDitor)
## La commande 

`sed` est un **éditeur de texte en ligne de commande** non interactif. Il traite ligne par ligne un fichier ou une entrée standard, permettant des modifications comme la substitution, suppression, ou insertion de texte.

 Syntaxe
```bash
`sed [options] 'commande' [fichier]`
```

Liste des options

| Option | Description                                          |
| ------ | ---------------------------------------------------- |
| `-n`   | Ne rien afficher sauf si demandé (avec `p`)          |
| `-e`   | Permet d’enchaîner plusieurs commandes `sed`         |
| `-i`   | Édite le fichier **en place** (modification directe) |
| `-f`   | Lit les commandes `sed` depuis un fichier            |

---

Liste des **adresses**

|Adresse|Description|Exemple|
|---|---|---|
|`3`|Ligne 3 uniquement|`3d` → supprime la ligne 3|
|`1,5`|Lignes de 1 à 5|`1,5d`|
|`/motif/`|Toutes les lignes contenant "motif"|`/Erreur/d`|
|`/debut/,/fin/`|Plage entre deux lignes contenant "debut" et "fin"|`/BEGIN/,/END/d`|
|`$`|La dernière ligne|`$d`|
|`~2`|Une ligne sur deux (à partir de la première)|`1~2d`|

---

🔧 Liste des **commandes**

|Commande|Nom|Description|Exemple|
|---|---|---|---|
|`s`|Substitution|Remplace un motif par un autre|`s/ancien/nouveau/`|
|`d`|Delete|Supprime la ligne ciblée|`/erreur/d`|
|`p`|Print|Affiche explicitement la ligne|`s/OK/BON/p` avec `-n`|
|`a`|Append|Ajoute une ligne **après** la ligne ciblée|`3a\\Texte ajouté`|
|`i`|Insert|Insère une ligne **avant** la ligne ciblée|`3i\\Début de bloc`|
|`c`|Change|Remplace entièrement la ligne|`/titre/c\\Nouveau titre`|
|`y`|Translate|Traduit caractère par caractère|`y/abc/ABC/`|
|`=`|Numérote|Affiche le numéro de ligne|`/Erreur/=`|
|`!`|Négation|Applique la commande aux lignes **ne contenant pas** le motif|`!/erreur/d`|
|`{}`|Bloc|Permet d’exécuter plusieurs commandes sur une même adresse|`/debut/,/fin/ { s/foo/bar/; d }`|

---
Liste des Arguments (exemples pour `s` et `y`)

| Commande            | Argument                       | Explication                            |
| ------------------- | ------------------------------ | -------------------------------------- |
| `s/ancien/nouveau/` | Motif à remplacer par un autre | Substitue `ancien` par `nouveau`       |
| `s/.../.../g`       | Global (sur toute la ligne)    | Remplace **toutes** les occurrences    |
| `s/.../.../1`       | 1re occurrence seulement       | (identique au comportement par défaut) |
| `y/abc/ABC/`        | Change a→A, b→B, c→C           | Traduction caractère par caractère     |

Exemples courants 
```bash
# Remplace la **1ère occurrence** de "erreur" par "OK" sur chaque ligne.
sed 's/erreur/OK/' fichier.txt
# Remplace **toutes les occurrences** de "erreur" par "OK" dans chaque ligne.
sed 's/erreur/OK/g' fichier.txt
# N’affiche que les lignes **où une substitution a eu lieu**.
sed -n 's/erreur/OK/p' fichier.txt
# Supprime toutes les lignes vides du fichier.
sed '/^$/d' fichier.txt
# Supprime toutes les lignes **commençant par `#`** (commentaires), et  toutes les **lignes vides**
sed -e '/^#/d' -e '/^$/d' fichier.txt


```

