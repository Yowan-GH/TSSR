# Les sauvegardes

## 🔁 Rotation GFS (Grand-Père / Père / Fils)

### 🧠 Principe :

La stratégie **GFS (Grandfather-Father-Son)** est une méthode d’**archivage cyclique** des sauvegardes dans le temps, combinant **sauvegardes quotidiennes, hebdomadaires et mensuelles** pour un bon compromis entre conservation et espace disque.
### 🧩 Structure du modèle GFS :

- **👦 Fils (Son)**  
    ➤ Sauvegarde **quotidienne** (ex : du lundi au vendredi)  
    ➤ Remplacée chaque semaine
    
- **👨 Père (Father)**  
    ➤ Sauvegarde **hebdomadaire** (ex : chaque vendredi)  
    ➤ Remplacée chaque mois
    
- **👴 Grand-père (Grandfather)**  
    ➤ Sauvegarde **mensuelle** (ex : dernier vendredi du mois)  
    ➤ Conserve **l’archivage à long terme**

- Simple à mettre en place et automatiser
- Équilibre entre **fréquence de sauvegarde** et **espace occupé**
- Permet la **rétention historique** (1 jour, 1 semaine, 1 mois)

### Exemple 

<img src="Backup/images/image.png">

## 🌡️ Sauvegarde à chaud / à froid

<!-- tabs:start --> 

###  **🔥Sauvegarde à chaud**

- 📌 Réalisée pendant que le **système reste en fonctionnement** (services et utilisateurs actifs).
- Utilise des **technologies de snapshots** ou d’**agents applicatifs** pour garantir la cohérence.
- ➕ **Avantages** : pas d'interruption de service, idéale pour les serveurs critiques.
- ➖ **Inconvénients** : plus complexe, risque de fichiers en cours d’usage (non verrouillés).
- Exemples : sauvegarde de VM actives, bases SQL avec agent VSS.

###  **❄️ Sauvegarde à froid**

- 📌 Réalisée lorsque le **système ou les services sont arrêtés**.
- Offre une **cohérence totale des données**, sans besoin d’agent.
- ➕ **Avantages** : restauration fiable, moins de complexité.
- ➖ **Inconvénients** : nécessite une **interruption temporaire** de l’activité.
- Exemples : sauvegarde après arrêt planifié, hors ligne.

<!-- tabs:end --> 

## 📦Les méthodes de sauvegardes

### Les attributs

<!-- tabs:start --> 

#### **Méthode d'archivage Microsoft**

L’attribut **archive** (ou bit d'archive) est un **indicateur caché** placé sur un fichier par le système d’exploitation lorsqu’il est **modifié ou créé**. Il est utilisé uniquement avec les système Microsoft.

👉 Il sert à **identifier quels fichiers doivent être sauvegardés** lors d’une sauvegarde **incrémentale** ou **différentielle**.

⚙️ Fonctionnement : 
- Lorsqu’un fichier est **créé ou modifié**, le bit d’archive passe à `1` (activé).
- Lorsqu’un logiciel de sauvegarde le copie, il peut :
    - **le laisser activé** (méthode différentielle)
    - **le remettre à 0** (méthode incrémentale ou complète)

<!-- tabs:start --> 

####  **🟢Sauvegarde complète**

- 🔁 **Copie tous les fichiers**, qu’ils soient modifiés ou non.
- ✅ **Base** de toute stratégie de sauvegarde.
- ⚙️ Fonctionnement :
    - Ne se base **pas** sur l’attribut d’archive (Microsoft) ou la date (Unix).
    - **Réinitialise l’attribut d’archive** à la fin.
- ➕ Restauration simple et fiable, permet de supprimer les anciennes sauvegardes
- ➖ Gourmande en espace disque.
---

####  **🟠Sauvegarde différentielle (ou T1)**

- 🔁 Copie tous les fichiers **modifiés depuis la dernière sauvegarde complète**.
- ⚙️ Fonctionnement :
    - Sauvegarde les fichiers avec **bit archive = 1**.
    - **Ne remet pas à zéro** l’attribut → méthode **cumulative**
- ➕ Restauration rapide (1 complète + 1 différentielle), temps de sauvegarde modéré
- ➖ Taille croissante chaque jour. Plus lent er couteux qu'une sauvegarde incrémentiel
---

####  **🔵Sauvegarde incrémentale**

- 🔁 Copie **les fichiers modifiés depuis la dernière sauvegarde** (complète ou incrémentale).
- ⚙️ Fonctionnement :
    - Sauvegarde les fichiers avec **bit archive = 1**.
    - **Réinitialise l’attribut** à 0 après la sauvegarde.
- ➕ Très rapide et légère.
- ➖ Restauration plus complexe (chaînée).

####  **📊 Tableau Comparatif des Méthodes**

| Méthode        | Données sauvegardées                    | Temps de sauvegarde | Temps de restauration | Espace disque | Avantages                    | Limites                                   |
| -------------- | --------------------------------------- | ------------------- | --------------------- | ------------- | ---------------------------- | ----------------------------------------- |
| Complète       | Toutes                                  | Long                | Rapide                | Élevé         | Fiabilité, simplicité        | Gourmande en espace                       |
| Incrémentale   | Modifiées depuis la dernière sauvegarde | Court               | Long à modéré         | Faible        | Gain de temps et d’espace    | Restauration complexe                     |
| Différentielle | Modifiées depuis la dernière complète   | Moyen               | Rapide                | Moyen         | Compromis fiabilité/rapidité | Volume de données croissant avec le temps |
<!-- tabs:end --> 

---
**Les différents attribues disponibles**

| Attribut          | Lettre | Description                                                  |
| ----------------- | ------ | ------------------------------------------------------------ |
| **Archive**       | `A`    | Fichier modifié récemment (bit utilisé pour les sauvegardes) |
| **Lecture seule** | `R`    | Le fichier ne peut pas être modifié                          |
| **Système**       | `S`    | Indique que le fichier est un fichier système                |
| **Caché**         | `H`    | Le fichier ne s'affiche pas dans l'explorateur par défaut    |
| **Compressé**     | `C`    | Le fichier est compressé par le système NTFS                 |
| **Indexé**        | `I`    | Ne pas indexer ce fichier par le moteur de recherche Windows |
| **Temporaire**    | `T`    | Fichier utilisé temporairement                               |
#### **Méthode d'archivage Linux**

Sur Linux, il **n'existe pas d'attribut d’archive standard**. À la place, les logiciels de sauvegarde se basent sur **la date de dernière modification** et **horodatage de la dernière sauvegarde** stocké dans une base ou un fichier log.

Les méthodes de sauvegarde reposent sur **les métadonnées du système de fichiers** comme :
- `mtime` → **date de dernière modification du fichier**
- `ctime` → date de modification de l’**inode** (droits, nom, etc.)
- `atime` → dernière date d’accès (souvent désactivée pour optimiser les perfs)

**Comment Linux gère l’archivage ?**

- 🧮 **Par date**
	- Les outils de sauvegarde comparent la date du fichier à la **dernière sauvegarde connue**.
	- S'il est plus récent → il est sauvegardé.  
	    Ex : `rsync`, `tar`, `find`, `backup-manager`  
      
- 🔍 **Par empreinte (hash)**
	- Certains outils (ex : `borg`, `restic`) comparent les **blocs modifiés** à l’aide de hachage (SHA256).
	- Très utile pour l’**incrémental intelligent**.  
      
- 📄 **Par base de données**
	- Outils comme **Déjà Dup**, **Duplicity** ou **UrBackup** gardent une base de métadonnées locale pour suivre les fichiers déjà sauvegardés.

<!-- tabs:end --> 


## 🛢️Sauvegarde des bases de données 

#### Définition
- Ensemble structuré de données géré par un **SGBD** (Système de gestion de Base de Donnés) (PostgreSQL, MySQL, Oracle…). 
- Objectifs : intégrité, sécurité, disponibilité.
- Déploiement possible en local, en datacenter ou dans le cloud.

Méthodes spécifiques par type de base :
- **SQL Server** :
	- Utilisation de **SQL Server Management Studio**.
- MySQL : 
	- Export via `mysqldump` : ``mysqldump -u username -p password database_name > dumpfile.sql``
- **Oracle** :
	- Utilisation de **RMAN** : ``RMAN> backup incremental level 0 section size 512m database plus archivelog;``

>📋 Remarque importante : Il **n’existe pas de méthode universelle** pour toutes les BDD. Chaque moteur a ses outils et ses contraintes.
