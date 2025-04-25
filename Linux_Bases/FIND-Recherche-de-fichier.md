# FIND - Recherche de fichier

## La commande 

``find ``: Recherche de fichiers et répertoires

Syntaxe : 
``find [répertoire] [critères] [action]
``
La syntaxe de base de la commande est la suivante. On spécifie un répertoire à partir duquel démarrer la recherche, suivi des critères de recherche, puis de l'action à effectuer sur les fichiers trouvés.

Options de bases : 
- ``-name`` : Recherche des fichiers dont le nom correspond au motif spécifié.
- ``-type`` : Recherche des fichiers ou répertoires en fonction de leur type.
- ``f ``: Fichiers réguliers.
- ``d`` : Répertoires.
- ``l`` : Liens symboliques.
- `` -size ``: Recherche des fichiers dont la taille correspond à un critère spécifique.
	``+`` : Plus grand que.
	``-`` : Moins que.
	``c`` : Taille en octets.
	``k`` : Taille en kilooctets.
	``M`` : Taille en mégaoctets.
- ``-exec`` : Exécute une commande sur les fichiers trouvés.

 📦 Options spéciales

| Option   | Description                                                    | Exemple                                         | Explication de l’exemple                                     |
| -------- | -------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| `-exec`  | Exécute une commande sur les fichiers trouvés                  | `find /home/user/ -name "*.log" -exec rm {} \;` | Supprime tous les fichiers `.log` trouvés dans `/home/user/` |
| `-empty` | Recherche les fichiers ou répertoires vides                    | `find /var/log -empty`                          | Affiche les fichiers/répertoires vides dans `/var/log`       |
| `-user`  | Recherche les fichiers appartenant à un utilisateur spécifique | `find /home/user/ -user john`                   | Affiche les fichiers appartenant à l'utilisateur `john`      |
| `-group` | Recherche les fichiers appartenant à un groupe spécifique      | `find /srv/ -group www-data`                    | Affiche les fichiers appartenant au groupe `www-data`        |

🧪 Exemples combinés

| Objectif                                 | Commande                                        |
| ---------------------------------------- | ----------------------------------------------- |
| Supprimer tous les fichiers `.log`       | `find /home/user/ -name "*.log" -exec rm {} \;` |
| Lister les fichiers vides                | `find /home/user/ -empty`                       |
| Rechercher les fichiers d’un utilisateur | `find /home/user/ -user username`               |
| Rechercher les fichiers d’un groupe      | `find /home/user/ -group devs`                  |
