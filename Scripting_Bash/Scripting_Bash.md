
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

 