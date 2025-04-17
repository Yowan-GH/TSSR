
# Analyse du Langage

## Introduction

Un script est un ensemble de commande ``shell`` enchainé les unes à la suite des autres.

Avant la réalisation de celui-ci, il est vivement conseillé de : 
- Définir clairement l'objectif à atteindre : **Le besoin**
- Rédiger un cahier des charges : **Les contraintes**
- Traduction détaillée de l'ensemble des actions à réaliser pour parvenir à m'objectif : **La réflexion**
- Coder le script en langage shell : **La solution**

## Algorithme

Pour qu’un ordinateur réalise une tâche, qu’elle soit basique ou très complexe, il est nécessaire de lui indiquer dans les moindres détails toutes les actions à réaliser.

Un algorithme, c’est une description **complète et détaillée des instructions ordonnancées** dont l’exécution conduit à un résultat donné.

Eléments utilisés pour la réalisation d'un algorithme : 
- Des instructions 
- Des Variables
- Des tests 
- Des boucles 

On utilise le **<span style="color:rgb(255, 192, 0)">pseudo code</span>** comme outil de visualisation du code (transposition textuelle ou schématique pour la compréhension humaine)

*Exemple d'un pseudo code en forme textuel :*

```bash 
Lancement du script  
**log** ← /var/log/secure  
**nbdefault** ← 42

Si (nombre d’argument passé au script = 1)  
  alors **nb** ← argument  
Finsi

Si ((**nb** est nul) OU (**nb** n’est pas un entier))  
  alors la **nb** ← **nbdefault**  
Finsi

Afficher la liste des **nb** derniers échecs de connexion de **log**  
Journaliser « exécution de logonfails.sh »

Fin d’exécution du script
```

Convention utilisé pour définir un algorithme sous forme graphique :

| **Symbole**           | **Signification**                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⬭ **DÉBUT / FIN**     | L’ovale matérialise les étapes du **début** et de **fin** d’un programme.                                                                                                                                |
| ➝ **Flèche**          | La flèche indique le sens des flux.                                                                                                                                                                      |
| ▭ **ACTION**          | Le rectangle représente la réalisation d’une action ou d’un processus.                                                                                                                                   |
| ◇ **DÉCISION**        | Le losange est utilisé pour représenter une décision à prendre ; ou la vérification d’une condition. Il est parfois utile d’utiliser des formes plus complexes quand on a plus de 3 décisions à prendre. |
| ⬒ **ENTRÉE / SORTIE** | Entrée / Sortie                                                                                                                                                                                          |
*Exemple de pseudo code au format schématique :*
![[image-1.png]]

# Ecriture des scriptes 

## Généralités 

### Le shebang ou Hashbang

Afin d'éviter les erreurs, il est conseillé au début de chaque script de préciser le <span style="font-weight:bold; color:rgb(255, 192, 0)">SHEBANG</span>
Celui-ci : 
- Va préciser quel shell utilisé pour le script
- Doit être écrit sur la première ligne du script
- Il est matérialisé par le #! suivie du chemin du shell 
	- ➡️ ``#!/bin/bash`` pour bash
- On peut s'assurer du chemin du shell avec la commande ``which shell``

### Rendre Exécutable le script 

Il faut rendre votre script exécutable en changeant les permissions de celui-ci avec la commande : 
```bash
chmod +x ./script.sh              # Rend la commande executable par tous
chmod ug+x ./monscript.sh         # Rend la commande executable pour les utilisateurs et le groupe uniquement
```

### Les commentaires

Il est important de bien utiliser les commentaires lors de la réalisation des scripts.
Ceux-ci se font avec l'utilisation du ``# Mon commentaire ``

il est de bonne pratique d'également ajouter un ensemble de commentaire définissant vôtre script en début de script. Exemple : 

```bash
#!/bin/bash
#====================================================================
# FILE: ~toris.sh
# USAGE: ./~toris.sh
# DESCRIPTION: une cli pour la gestion des flux
# OPTIONS: ---
# REQUIREMENTS: ---
# BUGS: ---
# NOTES: ---
# AUTHOR: Penthium2, contact@viperr.org
# COMPANY: viperr
# CREATED: 05.03.2015
# REVISION: 02.08.2019
#====================================================================
```


### Debugger son script

**Les erreurs dans les scripts ne sont pas toujours faciles à repérer. Plusieurs méthodes peuvent être utilisées afin de les identifier.**

- L'exécution du script en mode `trace` permet d'exécuter une à une les commandes de celui-ci tout en les affichant précédées du signal plus (+).
    
```bash
$ bash -x monscript.sh + echo Hello world 

Hello world
```

L'intégration dans le script de commandes de débogage se traduit par l'ajout temporaire de commandes permettant d'analyser une situation.

```bash
echo "tapez votre nom"
read nom

## echo de debug avec pause :
echo "valeur de la variable nom : $nom"
read  # pause avant de poursuivre le déroulement du script
## fin du debug

echo "Bienvenue $nom sur la machine $HOSTNAME"
```

<span style="color:rgb(255, 0, 0)">Pensez à bien commenter les instructions et commandes de debug avant la mise en production du script </span>


## Les commandes

### La commande echo

`echo` permet d'afficher du texte

 Syntaxe :
`echo [option] "expression"`

Si l'**expression** contient des caractères spéciaux, il faut la protéger avec des doubles guillemets et lui ajouter l'option `-e`.

On peut de plus utiliser des options de mise en forme :

- `\c` : inhibe le changement de ligne en fin de commande
- \n` : nouvelle ligne
- `\t` : tabulation horizontale
- `\\` : le caractère `\`

### La commande exit

La commande `exit` est utilisée pour **arrêter** un script (ou un programme).

 Syntaxe :
`exit [n]

L'expression **``n``** est la valeur retournée au shell père dans la variable ``$?``

Quelle utilité ?
- **Stopper un script quand quelque chose ne va pas** : Si tu veux qu'un script arrête son exécution en cas d'erreur (par exemple, si un fichier nécessaire n'existe pas), tu peux utiliser `exit` pour arrêter immédiatement le script.
    
- **Retourner un message de succès ou d'erreur** : Le script peut aussi **dire à l'ordinateur s'il a réussi ou échoué** en renvoyant un **code** (généralement un nombre). Un code `0` signifie que tout s'est bien passé. Un nombre différent de `0` signifie qu'il y a eu un problème.

### La commande set

La commande ``set`` permet d'affecter des valeurs aux variables réservés ($1 $2 $3...)

```shell
set "$LOGNAME" $(uname -n) 
# Definit deux variables : "$LOGNAME">$1 et $(uname-n)>$2

echo "$1 $2" # Revient à faire un echo "$LOGNAME $(uname-n)"
```
### La commande read

La commande ``read`` est utilisée pour affecter un contenu saisi par l'utilisateur à une variable

Syntaxe : 
``read [option] <variables>``

Utilisation :
```shell
echo "Veuillez entrer votre nom :"  # Demande d'action du user
read nom     # Enregistre la frappe de l'utilisateur en temps que variable nom
echo "Bonjour $nom" # Restitu la variable nom
```

Il est possible via la commande read -p de saisir un prompt avant la lecture et l'enregistrement de la variable tapée par l'utilisateur : 

```shell
read -p "Veuillez entrer votre nom : " nom
```

Il est possible de read plusieurs paramètres mais le nombre de variable à définir doit être en concordance avec le résultat attendu : 

```bash
read -p "Veuillez entrer votre nom et prénom : "nom prenom tampon
unset tampon
> Johnny Silverhand The Boss
# Va enregistrer Johnny dans nom, Silverhand dans prenom et the boss dans tampon.
# La variable tampon ne sert qu'à stocker le surplus d'informations et ne sera pas réutilisée. Elle est d'ailleurs déchargée via le unset tampon
echo "Bienvenu $nom $prenom"
> Bienvenu Jonny Silverhand 
```
## Les variables

Les **variables** sont des éléments permettant de stocker temporairement des informations au cours du déroulement du script. 
Ces informations peuvent ensuite être réutilisées dans d'autres commandes ou affichées. 

### Fonctionnement 

```bash
# Definition de la variable $prenom, stockée dans la memoire
prenom=romain

# Lecture de la variable (extraite de la mémoire)
echo $prenom      # Affichera Romain
		
# Modification de la variable, écrase l'ancienne valeur en mémoire
prenom=sofia      # Affichera sofia lors de la commande 

#Libérer la mémoire 
unset prenom
```

Les variables peuvent être rangées en 4 catégories : 

- Variables locales : en minuscule, utiliser les doubles quotes pour séparer "les mots"
- Variable d'environnement : Variables systèmes (comme $HOME)
- Variable réservée : Utilisée par le shell et donc inutilisable 
- Les constantes : Variables en lectures seule lors de la definition de celle-ci (donc impossible à changer). leurs noms sont en MAJUSCULE. Utilisation du _ pour séparer LES_MOTS.

### Les variables locales 

Pour affecter un contenu à une variable : nom=valeur 
Exemple :
```bash 
errormsg="Une erreur est survenue, contactez votre administrateur système"
logdir="/var/log"
```

Pour réutiliser le contenu de la variable, on utilise le $ devant son nom.

```bash 
echo "$errormsg" 
> Une erreur est survenue, contactez votre administrateur système

mkdir -p "$logdir" 2>/dev/null 
# Création des dossiers /var et /var/log
# Erreur non affichée (renvoyées vers /dev/null)
```

### Les variables réservées

**Variables réservées dans le Shell :**

| **Variable** | **Description**                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `$$`         | Numéro du processus en cours.                                                                                        |
| `$?`         | Code retour (0 si vrai, différent de 0 si faux). Par exemple, `exit 2` provoque la sortie avec le code retour `2`.   |
| `$!`         | Numéro du dernier processus lancé en arrière-plan.                                                                   |
| `#$`         | Nombre de paramètres reçus par le script.                                                                            |
| `$1 à $9`    | Paramètres de la commande (1 pour le premier, 2 pour le deuxième, etc.).                                             |
| `$0`         | Nom de la commande ou du script.                                                                                     |
| `$$` ou `$*` | Valeurs des paramètres reçus encadrés par des guillemets. Certaines versions Unix concatènent les valeurs avec `$*`. |
- Ces variables sont automatiquement remplies par le Shell et permettent de récupérer diverses informations sur le script ou les commandes en cours d'exécution.
    
- Elles sont particulièrement utiles dans les **scripts** et lors de l'enchaînement de commandes, car elles fournissent des données comme le numéro de processus, les paramètres donnés au script, ou le code de retour d'une commande.

Exemple : 

```bash 
./monscript.sh valun valdeux valtrois 
# $1=valun $2=valdeux $3=valtrois
# $#=nombre de parametres reçu. Ici $#=3
# $0 contient la valeur avec laquelle on a appelé le script a $0./script.sh
# $@ contient la concaténation des autres parametres

```


### Les variables d'environnement 

Une variable d'environnement est une variable qui est héritée dans tous les sous-shell
Pour créer une variable d'environnement, on peut : 
	- Exporter une variable locale : ``export NOMVAR``
	- Créer ou modifier et exporter une nouvelle variable : ``export NOMVAR=valeur``



## Les enchainements de commandes 

Deux types d'enchainements : 
- Conditionnel
- Inconditionnel 

### Enchainement inconditionnel 

L'enchainement sans condition se fait via le ``;`` . L'enchainement se fait même en cas d'erreur ou d'erreurs en chaine. 

```bash
$ mkdir /data ; touch /data/file1 ; cat /home/bonjour.txt
mkdir: cannot create directory ‘/data’: Permission denied
touch: cannot touch ‘/data/file1’: No such file or directory
Bonjour le monde !
```

Dans cet exemple, l’utilisateur n’a pas le droit de créer un répertoire à la racine (mkdir en erreur).
La commande de création d’un fichier dans le répertoire échoue aussi (touch en erreur).
La dernière commande (sans lien avec les précédentes) aboutit.

Cela montre que dans un script, le traitement des commandes est **<span style="color:rgb(255, 192, 0)">séquenciel.</span>**
Lors de l'exécution, le shell interprète les ``;``comme des retours à la ligne.

### Enchainement conditionnel 

#### Le ET LOGIQUE &&
L'opérateur ``&&`` conditionne l'enchainement des commandes. 
Cette structure peut être traduite par : 
	- Si la commande 1 aboutit, alors je fais la suivante
*Exemple*
```shell
mkdir ./data && touch ./data/file1.txt
# Créé un dossier data dans le répertoire courant 
# Créé un fichier file1.txt dans le dossier data créé précédement si la création a réussit
```

Le ``&&`` (ou **ET LOGIQUE**) s'appui sur le code de retour de la commande précédente (stocké dans la variable réservé ``$?``).
- Si ``$? ``= 0 (pas d'erreur), alors la commande suivante est exécutée
- Si ``$?`` = une autre valeur, alors la commande suivante n'est pas exécutée 

#### Le OU LOGIQUE | | 
L'opérateur | | conditionne l'enchainement des commandes à l'échec d'exécution de la commande précédente. 
Cette structure peut être traduite par : 
	- Si la commande n'a pas abouti alors je fais la suivante 
*Exemple*
```bash
mkdir ./data 2>/dev/null || echo "Erreur dans la création du dossier"
> Erreur dans la création du dossier
```

Le || (**OU LOGIQUE**) s'appui sur le code de retour de la commande précédente (stocké dans la variable réservé ``$?``).
- Si ``$? ``= 0 (pas d'erreur), alors la commande suivante n'est pas exécutée 
- Si ``$?`` = une autre valeur, alors la commande suivante est exécutée 

## Les regroupements de commandes

Pour regrouper nos commandes dans un environnement enfant, on utilisera la syntaxe suivante : 
``$ (cmd1 ; cmd2)``

*Exemple*
```bash
$ (ls /bin ; ls /usr/bin) | wc -l
# Compte le nombre de ligne des commande ls /bin et ls /usr/bin avec la commande wc -l
```

Attention, ici, l'environnement étant enfant, l'ensemble des variables ne sera pas disponible (sous-shell)

Pour regrouper nos commandes dans un environnement courant, on utilisera la syntaxe suivante : 
``$ {cmd1 ; cmd2 ; cmd3 ;}``

Il est conseillé, lors de la réalisation de script d'utiliser le retour à la ligne :
```shell
{
cmd 1
cmd 2
cmd 3
}
```

## Le formatage dans le shell

**Il est possible d’utiliser quelques couleurs dans le Shell ou dans les scripts.** Les couleurs peuvent être utiles pour mettre en valeur des informations importantes.

| Couleur    | Caractères | Fond | Attribut des caractères |
| ---------- | ---------- | ---- | ----------------------- |
| Noir       | 30         | 40   | 0 : aucun               |
| Rouge      | 31         | 41   | 1 : gras                |
| Vert       | 32         | 42   | 4 : souligné            |
| Jaune      | 33         | 43   | 7 : inversé             |
| Bleu       | 34         | 44   | 8 : invisible           |
| Magenta    | 35         | 45   | 9 : barré               |
| Cyan       | 36         | 46   |                         |
| Gris clair | 37         | 47   |                         |

Pour coloriser une information, les codes couleurs seront à encadrer pour : 
- Annoncer la couleur : ``\033`` ou ``\e[``
- Finir la définition de couleur ``m``
- Remettre la valeur initiale ``\033[0m``

*Exemple*
```bash
echo -e "\033[1;32mFC\e[4;33mNantes\033[0m"
# Active la colorisation avec me -e de echo
# Demarrage de la colorisation \033[
# 1 = gras, 32 = vert, m = fin de config
# FC texte à afficher en gras vert
# \e[ Demarrage de la colorisation
# 4  = souligné, 33 = jaune, m = fin de config
# Nantes texte à afficher en souligné jaune
# \033[0m fin de colorisation
```


## L'Exécution conditionnelle 
### Structure
Pour réaliser une exécution conditionnelle, nous allons utiliser la structure de contrôle ``if ``.
Le `if` sert à **tester une ou plusieurs condition** et à **exécuter un bloc de code** en fonction des résultats des conditions. 

Structure pour tester une condition avec`` if ``simple : 
```bash
if [ condition ];
then
  # commandes si la condition est vraie
fi
```

Structure pour tester deux condition avec ``if`` et ``else`` : 
```bash
if [ condition ];
then
  action_1
else
  action_2
fi
```

Structure pour tester de multiples conditions avec`` if, elif, else`` : 
```bash
if [ condition ]; # Si test
then # alors
  action_1
elif [ condition 2 ]; # sinon, test 2
then # alors
  action_2
else # sinon
  action_3
fi
```

### L'évaluation des tests

Lors de l'évaluation d'une condition, les critères d'évaluations sont liés au type d'élément à évaluer. Ils peuvent être : 
- Un entier (chiffre ou nombre)
- Une chaine (mot ou phrase)
- Une composante du système de fichier (fichier, répertoire, extention...)
#### Les opérateurs 

🔸 **Chaînes de caractères** (`[ ... ]`, `[[ ... ]]`)

| Opérateur | Signification                | `[ ... ]` | `[[ ... ]]` | `(( ... ))` |
| --------- | ---------------------------- | --------- | ----------- | ----------- |
| `=`       | Égalité                      | ✅         | ✅           | ❌           |
| `!=`      | Différent                    | ✅         | ✅           | ❌           |
| `<`, `>`  | Ordre alphabétique           | ❌         | ✅           | ❌           |
| `-z`      | Chaîne vide                  | ✅         | ✅           | ❌           |
| `-n`      | Chaîne non vide              | ✅         | ✅           | ❌           |
| `=~`      | Expression régulière (regex) | ❌         | ✅           | ❌           |
🔸 **Nombres (entiers uniquement)** (`[ ... ]`, `(( ... ))`)

| Opérateur | Signification     | `[ ... ]` | `[[ ... ]]` | `(( ... ))` |     |
| --------- | ----------------- | --------- | ----------- | ----------- | --- |
| -eq       | Égal              | ✅         | ✅           | ❌ (→ `==`)  |     |
| -ne       | Différent         | ✅         | ✅           | ❌ (→ `!=`)  |     |
| -lt       | Inférieur         | ✅         | ✅           | ❌ (→ `<`)   |     |
| -le       | Inférieur ou égal | ✅         | ✅           | ❌ (→ `<=`)  |     |
| -gt       | Supérieur         | ✅         | ✅           | ❌ (→ `>`)   |     |
| -ge       | Supérieur ou égal | ✅         | ✅           | ❌ (→ `>=`)  |     |

🔸 **Tests sur fichiers (`[ ... ]`, `[[ ... ]]`)**

| Opérateur | Signification               | `[ ... ]` | `[[ ... ]]` | `(( ... ))` |
| --------- | --------------------------- | --------- | ----------- | ----------- |
| -f        | Fichier régulier            | ✅         | ✅           | ❌           |
| -d        | Répertoire                  | ✅         | ✅           | ❌           |
| -e        | Existe (fichier ou dossier) | ✅         | ✅           | ❌           |
| -r        | Lisible                     | ✅         | ✅           | ❌           |
| -w        | Écriturable                 | ✅         | ✅           | ❌           |
| -x        | Exécutable                  | ✅         | ✅           | ❌           |
| -s        | Taille non nulle            | ✅         | ✅           | ❌           |

🔸 **Logique booléenne**

| Opérateur | Signification       | `[ ... ]` | `[[ ... ]]` | `(( ... ))` |
| --------- | ------------------- | --------- | ----------- | ----------- |
| !         | NON logique         | ✅         | ✅           | ✅           |
| -a        | ET logique (ancien) | ✅         | ❌           | ❌           |
| -o        | OU logique (ancien) | ✅         | ❌           | ❌           |
| &&        | ET logique propre   | ❌ (*)     | ✅           | ✅           |
| \|\|      | OU logique propre   | ❌ (*)     | ✅           | ✅           |
| ( )       | Regroupement        | ❌         | ✅           | ✅           |
(*) `&&` et `||` sont valides **en dehors** de `[ ... ]` pour enchaîner deux tests 

🔸**Opérations arithmétiques (`(( ... ))` uniquement)**

| Opérateur     | Signification      | `(( ... ))` |
| ------------- | ------------------ | ----------- |
| +, -, *, /, % | Opérations de base | ✅           |
| **            | Puissance          | ✅           |
🔸 **Comparateurs arithmétiques (`(( ... ))` uniquement)**

| Opérateur | Signification               | `(( ... ))` |
| --------- | --------------------------- | ----------- |
| ==        | Égal                        | ✅           |
| !=        | Différent                   | ✅           |
| < / >     | Inférieur / supérieur       | ✅           |
| <= / >=   | Inf. ou égal / sup. ou égal | ✅           |
🔸 **Affectations et raccourcis (`(( ... ))` uniquement)**

| Syntaxe   | Signification         | `(( ... ))` |
| --------- | --------------------- | ----------- |
| x++ / x-- | Incrément / Décrément | ✅           |
| x += n    | Ajouter n à x         | ✅           |
| x *= n    | Multiplier x par n    | ✅           |
| x /= n    | Diviser x par n       | ✅           |
| x %= n    | Reste de la division  | ✅           |
#### Les métacaractères

Les expression de test sont interprétées par le shell, il est donc possible d'utiliser des caractères spéciaux : 
-`` * ``= 0 à n caractère
-`` ? `` = 1 caractère quelconque
-``[...]`` = 1 caractère parmi ceux entre crochet
-``[^...] ou [!...]`` = 1 caractère autre que celui entre crochet 

 Facteurs d’occurrence (expressions régulières étendues) - Ne fonctionne qu'avec l'option ``extglob`` (``shopt`` pour vérifier si l'option est présente et ``shopt -s extglob`` pour l'ajouter)
- `?(...)` = 0 à 1 fois l’expression
- `*(...)` = 0 à n fois l’expression
- `+(...)` = 1 à n fois l’expression
- `@(...)` = exactement 1 fois l’expression
- `!(...)` = 0 fois l’expression
- `*(...|...)` = 0 à n fois l’expression 1 **ou** l’expression 2  
    _Valable aussi pour les caractères `?`, `*`, `+`, `@`, `!`_











#### `[ ... ]` – Test POSIX classique (aussi appelé `test`) 

 ✅ Utilisé pour :
- Comparaisons de **chaînes de caractères**
- Tests de **fichiers**
- Comparaisons **arithmétiques simples** (avec `-eq`, `-gt`, etc.)
    
 📌 Syntaxe stricte :
- Variables doivent être **entre guillemets** (`"$var"`)
- Toujours un **espace autour des crochets et des opérateurs**

❗ Risque courant :
- Si `$var` est vide et pas entouré de guillemets → **erreur** !

```bash 
if [ "$nom" = "Alice" ]; then # Exemple de test avec un nom
	if [ "$age" -ge 18 ]; then # Exemple de comparaison avec opérateur 
if [ -f "fichier.txt" ]; then # Exemple comparaison type de fichier
  echo "Bonjour Alice"
fi
```

#### `[[ ... ]]` – Test avancé **spécifique à Bash**

✅ Utilisé pour :
- Comparaisons de **chaînes** (avec `==`, `!=`)
- Opérateurs logiques (`&&`, `||`)
- **Expressions régulières** (`=~`)
- Tests **plus sûrs** (pas besoin de guillemets

📌 Avantages : 
- Ne plante pas si variable vide
- Plus lisible et plus souple
- Gère les jokers (`*`) sans les interpréter comme des fichiers

❗ Attention :
- **Ne fonctionne que dans Bash** (et Zsh)
- Pas compatible avec `/bin/sh` (scripts POSIX)

```bash
# Pas besoin de guillemets
if [[ $nom == A* ]]; then
# Avec logique booléenne
if [[ $utilisateur == "admin" || $utilisateur == "root" ]]; then
# Avec regex
if [[ $email =~ ^[a-z]+@[a-z]+\.[a-z]{2,4}$ ]]; then
  echo "Email valide"
fi
```

#### `(( ... ))` – Test et opérations **arithmétiques**
✅Utilisé pour :
- Comparaisons numériques avec opérateurs classiques (`>`, `<`, `==`)
- Incréments, décréments
- Affectations (`+=`, `*=`, etc.)

 📌 Avantages :
- Syntaxe **très naturelle** (comme en C ou Python)
- **Pas besoin de `$`** pour les variables internes à `(( ))`
- Évite les `-eq`, `-lt`, etc.

❗ Limite :
- Ne fonctionne que pour des **nombres entiers**

```bash 
x=5
y=3

# Test numérique
if (( x > y )); then
  echo "x est plus grand que y"
fi

# Incrément
(( x++ ))

# Affectation
(( y += 2 ))
```

#### 🧠 Tableau récapitulatif

| Syntaxe     | Pour quoi ?                  | Avantages                             | Inconvénients               | Exemples             |
| ----------- | ---------------------------- | ------------------------------------- | --------------------------- | -------------------- |
| `[ ... ]`   | Tests POSIX (base)           | Très compatible, simple               | Syntaxe stricte, peu souple | `[ "$x" -eq 5 ]`     |
| `[[ ... ]]` | Tests Bash avancés           | Plus sûr, expressions logiques, regex | Bash-only                   | `[[ $x == "test" ]]` |
| `(( ... ))` | Calculs et comparaisons nums | Très lisible, opérations naturelles   | Que pour les nombres        | `(( x >= 10 ))`      |

### La structure case

La commande `case` permet de tester **plusieurs cas** de manière **plus propre et lisible** que plusieurs `if...elif...else`.
Il est très utilisé pour les **menus en ligne de commande**
```bash
case $variable in
  motif1)
    action 1
    action 2# commandes si motif1
    ;;
  motif2)
    action 3 # commandes si motif2
    ;;
  *)
    action 4# commandes par défaut (comme else)
    ;;
esac
```

*Exemple d'utilisation*
```bash
echo "Menu :"
echo "1. Lister"
echo "2. Installer"
echo "3. Quitter"
read -p "Votre choix : " reponse

case $reponse in
  1) echo "Liste des fichiers" ;;
  2) echo "Installation en cours..." ;;
  3) echo "Au revoir !" ;;
  *) echo "Choix invalide" ;;
esac

```
`
# Exemple de script

```bash 
# Script afin d'afficher les caracteristiques d'un fichier
# Author : YMU
# TP M4
# Mise en place des variables
# Mise à jour : 16.04.2025

rep="$(pwd)" # Assignation de la vatiable rep à la commande pwd
extension="txt" # Assignation de la vatiable extension .txt
# Début du script

echo "Répertoire de travail : $rep"
echo ""
echo "Fichiers pouvant être traités :"
echo ""
ls -l $rep | grep .$extension # Liste les fichiers ayant pour extension $extention

echo "" # Saut de ligne
read -e -p "Quel fichier voulez vous traiter ? " fic trash # read -p pour ajouter un prompt et -e pour activer l'autocomplétion
unset trash # Supprimer le contenu de la variable trash
nblign=$(cat $fic | wc -l)  # nombre de ligne du fichier fic
debut=$(cat $fic | head -n 2)  # Affiche les deux premières lignes de fic
fin=$(cat $fic | tail -n 2)  # Affiche les deux dernières lignes de fic

echo "CARACTERISTIQUES DE $fic"
echo "Nombre de ligne du fichier : $nblign"
echo "Début du fichier :$debut"
echo "Fin du fichier :" $fin

# Fin du script

```


```bash
#!/bin/bash
# TP M6
# Script d'enchaînement conditionnel
# Author : YMU
# Update : 16.04.2025
#

nbarg=$# # Donne le nombre d'argument à la variable $nbarg

#test nbarg > 1

if [[ $nbarg -gt 1 ]]; then

        echo -e " Le script $0 s'utilise avec le nom d'utilisateur comme argument  :\n$0 \033[1;34m<nom>\033[0m "
        exit 1
fi # Fin de boucle nbarg > 1

#test nbarg = 1
if [[ $nbarg -eq 0 ]]; then
                read -p "Merci de saisir votre nom d'utilisateur : " nom trash #variable trash présente pour récupérer les frappes supplémentaires

				if [[ -z $nom ]] ; then # -z $nom => Vérifie si $nom est vide
                        nom="invité"
                fi
        else
                nom=$1
fi

# test nom = root

if [[ $nom == root ]]; then

        echo -e "\033[1;31;41mUtilisation de l'utilisateur $nom interdit!\033[0m."

        exit 4 # Fin avec erreur 
fi # Fin de boucle nom = root

# test nom = invité

if [[ $nom == "invité" ]]; then

                echo "Vous avez été redirigé sur le compte invité"
        else
                echo "Bonjour $nom, bienvenue sur la machine $HOSTNAME "

fi # Fin de boucle nom = invité 

echo "Fin du script"
exit 0
# Fin du script
```

