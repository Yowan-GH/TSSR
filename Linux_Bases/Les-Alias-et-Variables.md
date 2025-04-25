# Les Alias et Variables
## Les Alias 

``Alias`` : Les alias sont utilisés pour créer des raccourcis pour des commandes ou des séquences de commandes dans le terminal, ce qui permet de simplifier les commandes fréquemment utilisées.

Options courantes :
- ``alias`` : Affiche la liste de tous les alias définis.
- ``alias <nom_alias>='<commande>'`` : Crée un alias pour une commande spécifique.
- ``unalias <nom_alias>`` : Supprime un alias spécifique.
- ``unalias -a`` : Supprime tous les alias définis.
**
Utilisation des alias dans ``.bashrc ``ou ``.zshrc`` :

Les alias sont généralement définis dans le fichier ``~/.bashrc (pour Bash) ou ~/.zshrc (pour Zsh), ``afin de les rendre persistants à chaque session.

## Les variables 

Les ``variables`` en shell sont utilisées pour stocker des valeurs

Options courantes :
- ``<nom_variable>=<valeur>`` : Définit une variable.( ex : ``nom="sophie"``)
- ``$<nom_variable>`` : Accède à la valeur d'une variable. (ex : ``cat $nom`` donnera sophie)
- ``export <nom_variable>`` : Rend une variable disponible à tous les sous-shell
- ``unset <nom_variable>`` : Supprime une variable

**Variables courantes d'environnement :**
- ``$HOME`` : Le répertoire personnel de l'utilisateur.
- ``$PATH`` : Liste des répertoires dans lesquels le système recherche les commandes exécutables.
- ``$USER`` : Le nom d'utilisateur actuel.
- ``$PWD`` : Le répertoire de travail actuel.
- ``$SHELL`` : Le chemin de l'interpréteur de commandes utilisé (par exemple, /bin/bash).

Un ``INOD (ou inode``) sous Linux (et dans les systèmes de fichiers Unix en général) est une structure de données utilisée pour stocker des informations sur un fichier ou un répertoire, à l'exception de son nom et de son contenu. Chaque fichier ou répertoire dans un système de fichiers Linux a un inode associé.

Les informations stockées dans un inode incluent :
1. Les métadonnées du fichier :
- Taille du fichier
- Date de création, de dernière modification et de dernier accès
- Propriétaire du fichier (UID)
- Groupes associés (GID)
- Permissions d'accès (lecture, écriture, exécution)
- Nombre de liens (c'est-à-dire combien de noms de fichiers pointent vers ce même inode)

2. Les pointeurs vers les blocs de données :

Un inode contient des pointeurs vers les blocs où sont stockées les données du fichier (en fonction de la taille et de la configuration du système de fichiers).

