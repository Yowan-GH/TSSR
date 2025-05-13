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
![[TSSR/Les-Bases-Reseaux/Images/image-1.png]]
