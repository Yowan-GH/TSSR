# Les commandes indispensables
## Les commandes de base 

``ip a`` : Donne l’adresse IP de la machine

``who [option]``: Affiche les utilisateurs actuellement connectés au système avec des informations telles que le terminal, la date et l'heure de connexion.

**Options courantes :**
- ``-a`` : Affiche toutes les informations disponibles (utilisateurs, sessions, etc.).
- ``-b`` : Affiche l'heure du dernier démarrage du système.
- ``-u`` : Affiche l'heure de connexion et d'autres détails.
- ``-H`` : Affiche des en-têtes de colonnes pour une meilleure lisibilité.
- ``-q`` : Affiche uniquement les noms d'utilisateurs connectés.
- ``-T`` : Affiche des informations supplémentaires sur le type de terminal

``date [option]`` : Affiche ou définit la date et l'heure système du système Linux.
Options courantes :
- ``+FORMAT`` : Affiche la date et l'heure dans un format spécifique.
	- Directives de format courantes :
		- ``%a`` : Jour de la semaine en trois lettres (ex. : Mon, Tue).
		- ``%A`` : Jour de la semaine complet (ex. : Monday, Tuesday).
		- ``%b`` : Mois en trois lettres (ex. : Jan, Feb).
		- ``%B`` : Mois complet (ex. : January, February).
		- ``%d`` : Jour du mois (01 à 31).
		- ``%H`` : Heure au format 24h (00 à 23).
		- ``%I`` : Heure au format 12h (01 à 12).
		- ``%j`` : Jour de l'année (001 à 366).
		- ``%m`` : Mois (01 à 12).
		- ``%M`` : Minutes (00 à 59).
		- ``%p`` : AM ou PM.
		- ``%S`` : Secondes (00 à 59).
		- ``%U`` : Semaine de l'année (00 à 53, dimanche comme premier jour de la semaine).
		- ``%w`` : Jour de la semaine (0 à 6, où 0 est dimanche).
		- ``%Y`` : Année complète (ex. : 2025).
		- ``-u`` : Affiche l'heure en UTC (temps universel coordonné).

```bash
 date "+%A, %d %B %Y, %H:%M:%S" # Monday, 27 January 2025, 14:45:32
```

``cal`` : Affiche un calendrier sur le terminal, par mois ou par année.
Options courantes :
- ``-1`` : Affiche le calendrier d'un mois (par défaut).
- ``-3`` : Affiche le calendrier du mois courant, le mois précédent et le mois suivant.
- ``-y`` : Affiche le calendrier pour toute l'année.
- ``-m`` : Affiche le calendrier d'un mois spécifique. Par exemple, cal -m 5 pour mai.
- ``-A N`` : Affiche les N mois après le mois courant.
- ``-B N`` : Affiche les N mois avant le mois courant.
- ``-j`` : Affiche les jours de l'année au lieu des dates du mois (ex. : jour 1 = 1er janvier, etc.).

``cd [chemin]``: La commande cd (pour "change directory") permet de **naviguer entre les répertoires du système de fichiers.**
Options courantes :
- ``~`` : Représente le répertoire personnel de l'utilisateur actuel. Utilisé pour revenir rapidement au répertoire de base.
- ``..`` : Permet de remonter d'un niveau dans l'arborescence des répertoires.
- ``/`` : Utilisé pour aller directement à la racine du système de fichiers.

``cat`` :La commande cat (abréviation de "concatenate") est utilisée pour lire, afficher et fusionner le contenu de fichiers texte.
Options courantes :
- ``-n`` : Numérote toutes les lignes du fichier dans la sortie.
- ``-b ``: Numérote uniquement les lignes non vides.
- ``-s`` : Supprime les lignes blanches répétées dans la sortie.

*Exemple pour fusionner plusieurs fichiers en un seul*
```bash
cat fichier1.txt fichier2.txt > fichier3.txt
# cat : Affiche le contenu des fichiers 
# > redirige le résultat de la commande dans un fichier
```

``ls`` : La commande ls est utilisée pour lister les fichiers et répertoires dans un répertoire donné.
Options courantes :
- ``-l`` : Affiche les détails des fichiers (permissions, propriétaire, taille, date de modification, etc.).
- ``-a`` : Affiche tous les fichiers, y compris les fichiers cachés (ceux qui commencent par un .).
- ``-h`` : Affiche les tailles de fichiers dans un format lisible (Ko, Mo, etc.) lorsqu'il est utilisé avec -l.
- ``-R`` : Affiche récursivement les fichiers et sous-répertoires.
- ``-t`` : Trie les fichiers par date de modification, du plus récent au plus ancien.
- ``-S`` : Trie les fichiers par taille, du plus grand au plus petit.
- ``-1`` : Liste un fichier par ligne pour un affichage compact.
- ``-d`` : affiche uniquement les informations sur les répertoires spécifiés, sans lister leur contenu.

``mkdir`` : Permet de créer des répertoires (dossiers) dans le système de fichiers.
Options courantes :
- ``-p`` : Crée un répertoire parent et tous les sous-répertoires nécessaires (pas d'erreur si les répertoires existent déjà).
- ``-v ``: Affiche un message pour chaque répertoire créé.

``rmdir`` : Permet de supprimer **un répertoire vide**. Si le répertoire contient des fichiers ou sous-répertoires, la suppression échoue.
Options courantes :
- ``-p`` : Supprime un répertoire et, récursivement, ses parents s'ils sont vides.
- ``-v`` : Affiche un message pour chaque répertoire supprimé.

```bash
 rmdir mon_dossier # Suprimme mon_dossier
 rmdir -p parent/sous_dossier # Supprimer parents et sous_dossier
 # idem mkdir
```

``rm`` : La commande rm est utilisée pour supprimer des fichiers et/ou des répertoires dans le système Linux.
Options courantes :
- ``-f`` : Force la suppression sans demander de confirmation, même pour des fichiers protégés en écriture.
- ``-r ou -R`` : Supprime les répertoires et leur contenu de manière récursive (nécessaire pour les dossiers non vides).
- ``-i`` : Demande une confirmation avant de supprimer chaque fichier.
- ``-I`` : Demande confirmation avant de supprimer plusieurs fichiers ou un répertoire non vide.
- ``-v`` : Affiche les fichiers ou répertoires supprimés (mode "verbose").

<span style="font-style:italic; color:rgb(255, 0, 0)">Attention</span><span style="color:rgb(255, 0, 0)">, ne jamais utiliser les argument -r (récursive) et -f(force) ensemble car -fr ou -rf = forcer la suppression de tous les fichiers et dossier contenu dans le dossier choisit.</span>


``ln ``: Créer des liens symboliques ou physiques entre des fichiers ou répertoires
Options courantes :
- ``-s`` : Crée un lien symbolique (soft link).
- ``-v`` : Affiche les actions effectuées (mode verbose).
- ``-f`` : Force la création du lien en supprimant un lien existant au même emplacement.
- ``-i`` : Demande confirmation avant d'écraser un lien existant.
- ``-t`` : Indique le répertoire cible où le lien doit être créé.
- 
![Illustration](Les_Principales_commandes_2.png)


*Exemple pour créer un lien symbolique vers un répertoire :*
```bash
ln -s /chemin/vers/repertoire lien_vers_repertoire
```


``wc`` : La commande wc (word count) permet de compter le nombre de lignes, mots et caractères dans un fichier ou une entrée standard.
Options courantes :
- ``-l`` : Affiche le nombre de lignes.
- ``-w`` : Affiche le nombre de mots.
- ``-c`` : Affiche le nombre de caractères.
- ``-m`` : Affiche le nombre de caractères (en tenant compte de l'encodage multioctets).
- ``-L`` : Affiche la longueur de la ligne la plus longue.

Exemple :  
```bash
wc -l fichier.txt  # Affiche le nombre de ligne d’un fichier
```

## Compression / Décompression

``tar ``: La commande tar permet de créer, extraire et manipuler des archives de fichiers (souvent utilisées pour la sauvegarde).

Options courantes :
- ``-c`` : Crée une nouvelle archive.
- ``-x`` : Extrait le contenu d'une archive.
- ``-v`` : Affiche les fichiers traités (mode verbeux).
- ``-f`` : Spécifie le nom de l'archive.
- ``-z ``: Compresse ou décompresse l'archive avec gzip.
- ``-j`` : Compresse ou décompresse l'archive avec bzip2.
- ``-J`` : Compresse ou décompresse l'archive avec xz.
- ``-t`` : Affiche le contenu d'une archive sans l'extraire
- ``-r`` : Ajoute des fichiers à une archive non compressée.
- ``-u`` : Ajoute des fichiers à une archive compressée (gzip, bzip2, xz).

*Exemples :*
```bash
tar -cvf archive.tar dossier/    # Créer une archive sans compression
tar -czvf archive.tar dossier/   # Créér une archive avec compression
tar -rvf ‘fichier_a_ajouter.txt  # Ajouter un fichier à une archive non compressée
tar -xvf archive.tar             # Decompression de l'archive 
tar -tvf archive.tar             # Voir le contenu d'une archive sans extraire
```

## Gestion des processus en arrière-plan

``&`` : Lancer une commande en arrière plan
``jobs`` : Voir les commandes en arrières plan (``-l`` pour voir les PID)
Passer un processus en avant plan : ``bg PID``
Pour relancer un processus : ``fg PID``

```bash
./backup.sh &     # Lancera le script en arrière plan
tar -czvf archive.tar.gz /mon/dossier & #Compresser un fichier en arrière plan
```

## Redirections de flux

✅ Sortie standard (`stdout`) :
```bash
commande1 > fichier.txt      # Ecrit le resultat de la commande1 dans fichier

commande2 > fichier.txt      # Ecrase commande1 par commande2
commande2 >> fichier.txt     # Ajoute le résultat de commande2 sous commande1
```

❗ Sortie d’erreur (`stderr`)
```bash
commande 2> errors.log        # renvoi les erreurs (2) dans un fichier en ecrasant
commande 2>> errors.log       # renvoi les erreurs (2) dans un fichier en ajoutant
commande 2>/dev/null          # renvoi les erreurs (2) dans le néant
```

🔁 Rediriger `stderr` vers `stdout` (tout dans le même fichier)
```bash
commande > fichier.log 2>&1  # Renvoi tout vers un fichier en écrasant
commande >> fichier.log 2>&1 # Renvoi tout vers un fichier en ajoutant

```

📺 Doubler la sortie avec `tee` (écran + fichier)
```bash
# Afficher à l’écran **et** enregistrer dans un fichier
commande | tee fichier.txt     
# Même chose mais en ajoutant à la fin du fichier
commande | tee -a fichier.txt
```
