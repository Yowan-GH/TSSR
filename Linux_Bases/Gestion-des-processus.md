# Gestion des processus

## Les commandes

``ps`` : Affiche les processus en cours d'exécution sur le système, avec des informations détaillées sur leur état et leurs ressources

Options courantes :
- ``-e`` ou ``-A`` : Affiche tous les processus du système.
- ``-f`` : Affiche les informations détaillées sur les processus (format complet).
- ``-u`` : Affiche les processus d'un utilisateur spécifique.
- ``-x`` : Inclut les processus sans terminal (processus de fond).
- ``-l`` : Affiche les processus sous forme de liste détaillée.
- ``-p <PID>`` : Affiche les informations d'un processus spécifique, en utilisant son PID
- ``-C <command>`` : Affiche les processus correspondant à une commande spécifique. 
- ``-aux`` : Affiche tous les processus avec des informations détaillées sur le système.
- ``--sort`` : Trie les processus selon un critère (par exemple, utilisation mémoire, PID, etc.).

Les commandes composées :
- ``ps -ef`` : Affiche les processus en cours
- ``ps – faux`` : affiche tous les processus sous forme d’arbre 

``kill ``: Envoie un signal à un ou plusieurs processus pour les terminer ou leur demander d'exécuter une action spécifique.

``time`` : Mesure et affiche le temps d'exécution d'une commande ou d'un programme, en indiquant le temps CPU utilisé et le temps réel écoulé.
