# Environnement Microsoft

## Administration windows serveur.

Deux familles de système d’exploitation :
-	Serveur 
-	Client

Plusieurs versions pour le serveur : 

![alt text](image.png) 

Services pris en charge par WS : 
| Service       | Description                                       |
|---------------|---------------------------------------------------|
|ADDS           |Gestion Active Directory                           |
|DNS            |Service de résolution de nom d’hôte                |
|DHCP           |Service d’adressage IP                             |
|Hyper-V        |Virtualisation                                     |
|Deploiement WDS|Déploiement OS Windows dans le réseau              |
|WSUS           |Prise en charge centralisée mise à jour Microsoft  |
|Service        |d’impression et numérisation de document           |

Possibilité d’installer WS : 
- Mode standard : Mode graphique – Demande de ressource modérée
- Mode Core : CLI powershell uniquement – Demande peu de ressource  

### Installation OS
---
Lors de l’installation : 
-	Standard = Mode core
-	**Standard (Expérience de bureau) = Mode graphique**  

![alt text](image-1.png)

Type d’installation : 
-	**Personnalisée (installer uniquement windows)**  
<br>
Pour le reste installation classique.  
Lors de l’arrivée sur le bureau – Le dashboard apparait automatiquement.  
Renommer la machine et faire la config IP.  
Config IP : Panneau de config / réseaux / Modifier paramètre de la carte / IPV4 / Configurer l’adressage IP  
Renommage PC : Explorateur / clic droit, propriété sur PC / Modifier les paramètre / Changer et redémarrer 

### Installation des composants 
---
![alt text](image-2.png)

Gérer (en haut à droite) / Ajouter des rôles et fonctionnalités 
1.	Installer un rôle et une fonctionnalité
2.	Sélectionner le serveur
3.	Sélectionner le rôle à installer 
4.	Ajouter des fonctionnalités
5.	Redémarrage automatique puis installer  

Pour accéder aux outils d’administration : Windows / outils d’administration Windows

### Gestion du stockage 
---
Deux types de tables de partitions : 
-	**MBR (historique)** : Pour les systèmes en 32 bits, legacy  
    - Faible tolérance à la panne
-	**GPT (recent)** : Pour les systèmes en 64 bits, UEFI  
    - Meilleure tolérance aux pannes  
  
Configuration des disques : 
-	Config de base  
    - Simplifie la gestion de disque  
    - Toutes les données sont inscrites dans les partitions  
    - Sur un seul disque physique   
  
-	Config Dynamique  
    - Système de volume pouvant être sur plusieurs disques
    - Nécessaire pour le raid. 

### Partitionnement d’un disque et RAID
---

Partitionnement d’un disque de base = 4 partitions principales ou 3 principales + 1 étendue (logique)  
Partitionnement d’un disque dynamique = Volumes <span style="color:red">(Ne peut pas héberger un OS) </span>  
- Volume simple = 1 volume par disque  
- Volume fractionné = un ou plusieurs volumes sur plusieurs disques  
- Volume agrégé par bande = RAID 0 = Ecriture du fichier sur plusieurs disques en simultané  
  - Rapide mais pas de tolérance de panne    
- Raid 1 : Volume miroir = Copie d’un disque sur le 2eme.   
  - Tolérance aux pannes   
- Raid X : Redondance des volumes  
- Raid 5 : Volume agrégé par bandes avec parité  
  - 3 disques mini  
  - 1 disque (espace d’une bande) alloué à la tolérance de panne  
  - Meilleur compromis vitesse / sécurité    


Ici le fichier à enregistré est composé de A, B et C  
Chaque information A et B est copiée sur un disque et le Ap permet un contrôle sur le 3eme disque.   
Il y a donc écriture fractionnée + redondance + contrôle.  
Sur 3 x 100 GO, seulement 2 x 100GO seront exploitables   

![alt text](image-3.png)

### Formatage 
---

Ordre de mise en place d’un disque/volume :   
1. Montage
2. Partitionnement
3. Formatage 
   
<br>

![alt text](image-4.png)  

<br>
Système de fichier dispo : 
-	FAT32 : Windows 9 
-	NTFS : Le plus utilisé   
      - Taille maxi : 256 TO
      - Taille partition maxi : 256 TO

Les outils : 
-	Gestion de disque diskmgmt.msc
-	Commande diskpart sur cmd
-	Commandes PowerShell

## Active Directory

### Présentation
---

A quoi sert un Active Directory (AD)  
- Centraliser la gestion de l'authentification
- Centraliser les infos relatives aux users et ressources 
- Centralier la gestion des paramètres users et PC
- Fournir une base de fonctionnement aux services et outils Microsoft

Il repose sur trois protocoles :  
- Le DNS : Résolution d'adresse IP et Résolution inverse
- LDAP : Annuaire
- Kerberos : Le protocole d'identification reposant sur un mécanisme de clés secrètes et l'utilisations de tickets

### La forêt Active Directory
---
![alt text](image-6.png)

### Le domaine Active Directory et ses composantes
---
L’**AD** est un ensemble d’ordinateurs en réseau qui partagent une base de données commune. Il est administré comme un ensemble (règles et procédures communes). 

**Le contrôleur de domaine** est le serveur qui assure la gestion du domaine. Il gère les tâches d’hébergement et de gestion de la base AD ainsi que l’authentification. 

**Site active directory** : Composante logique du domine afin d’optimiser la replication, l’accès aux ressources. Il est composé d’un ou plusieurs sous réseaux TCP/IP

Avant de promouvoir un serveur en contrôleur de domaine, ces prérequis doivent être respectés : 
![alt text](image-7.png)

Les composants de domaine : 5 rôles FSMO (Flexible Single Master Operations)

![alt text](image-8.png)

### Mettre en place un AD

Gérer / Ajouter un rôle / AD DS – Terminer la configuration

>Lors du retour sur le dashboard, une notification nous indique de promouvoir le serveur en contrôleur de domaine.

1. Ajouter une nouvelle forêt – Donner un domaine racine
2. Choisir le niveau de la forêt
3. Choisir le mot de passe DSRM (en cas de crash de l’AD)
4. Indiquer le domaine NetBIOS (laisse par defaut)
5. Terminer la configuration.
6. Redémarrer

Apres le redémarrage, les infos visibles sur les users, groups, domain controller seront dans « Utilisateurs et ordinateurs active Directory »

<span style="color:red">Vérifier la regle de pare-feu - Partage de fichiers et d’imprimantes (Demande d’écho - Trafic entrant ICMPv4) pour les ping. </span>  

### Ajouter un ordinateur / serveur au domaine AD

Après avoir installé le contrôleur de domaine, connectez-vous sur les PC/serveurs à ajouter, puis changer le nom de l’ordinateur pour rejoindre le domaine : 

Indiquer un Nom de user en DOMAIN \ USER et le mot de passe correspondant (admin de l'AD)

![alt text](image-9.png)![alt text](image-10.png)

### Les bases de gestion d’un domaine
---
![alt text](image-11.png)  

**Les utilisateurs :**   
Il est utile de faire des modèles d’utilisateurs génériques avec : 
-	Un nom clair
-	Le plus grand nombre de caractéristique standard
-	Compte inactif  

Il faudra alors dupliquer ce modèle pour créer un nouveau user.  

Les plusieurs types de profils : 

![alt text](image-12.png)  

**Les groupes dans Active Directory**

Un groupe est un ensemble d'utilisateurs, d'ordinateurs ou d'autres groupes qui partagent les mêmes permissions ou droits d'accès. Il existe principalement **deux types de groupes en AD** :  
- Groupes de sécurité : utilisés pour gérer les autorisations d'accès aux ressources (ex: un dossier partagé).  
- Groupes de distribution : utilisés pour envoyer des e-mails collectifs (ex: une liste de diffusion).  

Dans un **contexte multi-domaines**, il y a des niveaux de portée qui définissent comment un groupe peut être utilisé.

**📌 Groupe global (Global Group - GG)**  
- Contient : uniquement des utilisateurs ou groupes du même domaine.
- Utilisation : utilisé pour organiser les utilisateurs en fonction de leur rôle (ex: "Comptabilité", "IT", "RH").
- Peut être ajouté dans : des groupes de domaine locaux et des groupes universels.
  - ✅ Exemple : Un groupe "GG_Comptabilité" contient tous les comptables de l’entreprise.
<br>  

📌 **Groupe de domaine local (Domain Local - DL)**
- Contient : des utilisateurs, des groupes globaux, universels de n'importe quel domaine.
- Utilisation : utilisé pour accorder des permissions sur une ressource spécifique (ex: accès à un dossier partagé).
- Peut être ajouté dans : Rien d’autre, il est utilisé uniquement dans son domaine.
  - ✅ Exemple : Un groupe "DL_Accès_Compta" permet l'accès à un dossier partagé de comptabilité.

**Comment ça s'articule ? (Principe AGDLP)**  
L’organisation des groupes suit souvent la règle AGDLP :
- A (Accounts) : Les utilisateurs sont ajoutés aux groupes globaux
- G (Groupes Globaux) : Regroupent les utilisateurs selon leur fonction.
- DL (Domain Local Groups) : Ont les permissions sur les ressources.
- P (Permissions) : Les groupes DL reçoivent les permissions d’accès.
  - ✅ Exemple concret :
    1.	Les utilisateurs "Jean" et "Paul" sont dans "GG_Comptabilité" (groupe global).
    2.	"GG_Comptabilité" est ajouté dans "DL_Accès_Compta_X" (groupe de domaine local).
    3.	"DL_Accès_Compta_X" reçoit les permissions sur le dossier partagé "Comptabilité
        -  DL_Accès_Compta_W : Ecriture
        -  DL_Accès_Compta_R : Lecture
        -  DL_Accès_Compta_CT : Contrôle total

**Les conteneurs systèmes** 
![alt text](image-13.png)

![alt text](image-14.png)

Les unités d’organisation OU / UO = Dossier avec des objets à l’intérieur 

### Les autorisations NTFS
---

Elles permettent de définir des privilèges d’accès. Des autorisations de base et avancées.  
Les permissions NTFS sont soumises à héritage. 

![alt text](image-15.png)

### Partage de fichiers
---

Le partage vient en complément des autorisations NTFS.  
Comme pour les autorisations NTFS, le refus explicite est prioritaire sur le reste. 

Lorsqu’un user se connecte sur un dossier partagé, il est soumis : 
-	Aux autorisations de partage en premier 
-	Aux autorisations NTFS en second
-	Les privilèges les plus restrictifs prévalent   

![alt text](image-16.png)

Il est indispensable de publier le partage dans l’AD afin de pouvoir le retrouver facilement

![alt text](image-17.png)

### Stratégie d’imbrication des groupes 
---

Afin de gérer efficacement l’accès aux ressources partagés, Microsoft préconise l’imbrication des groupes globaux et locaux 

![alt text](image-18.png)

Les groupes locaux servent à définir les autorisations.  
Ex : 
-	Le groupe GG_marketing est membre du groupe partage_marketing_CT
-	Le groupe partage_marketing_CT a le contrôle total sur le dossier de partage
-	Les membres du groupe GG_marketing auront l’accès total au dossier partagé 

Tous se fait via le partage avancé des dossiers.

### Le service d’impression 
---

Nécessite le rôle de serveur d’impression.
- Permet l’accès à l’outil Outil d’administration/Gestion de l’impression

Pour ajouter une imprimante : 
-	Définir le port TCP/IP
-	Ajouter l’imprimante et lui attribuer le port
-	Clic droit sur l’imprimante et ajouter à l’annuaire pour l’ajouter à l’AD.


## Les stratégies de groupes – GPO

GPO = Group Policy Object = Stratégie de groupe

Plusieurs types de stratégie : 
-	Local (hors domaine, poste par poste)
-	Groupe (Domaine)
    - En cas de conflits, elle l’emporte sur la stratégie locale

Elle se gère via les consoles MMC.  

Lors de la mise à place d’une GPO, celle-ci est mise à jour sur les postes du domaines toute les 90 min plus ou moins 30 mn. Toute les 5 mn pour les contrôleurs de domaine.

Il y a possibilité de la forcer avec ``gpupdate /force``

Deux stratégies sont configurées par défaut : 
- Default Domain Policy (DDP) : 
  - Lié à la racine du domaine
  - Définit les paramètres de sécu pour les users du domaine
- Default Domain Controller Policy : 
  - Lié à l'UO Domain COntrollers
  - Définit les paramètres de sécu pour les contrôleurs du domaine


 Étapes de fonctionnement des GPO :
1. Objet de stratégie créé
- Le ciblage permet de définir les objets (utilisateurs/ordinateurs) soumis à la stratégie.
2. Liaison de la stratégie
- Une stratégie est liée à un :
  - Site Active Directory
  - Domaine
  - Unité d’Organisation (OU)

3. Application de la stratégie
- Une fois liée, la stratégie s’applique :
  - Aux objets ordinateurs pour les paramètres "ordinateur"
  - Aux objets utilisateurs pour les paramètres "utilisateur"

<span style="color:red">**Les GPO ne s’appliquent pas aux groupes.  
Elles s’appliquent aux objets (utilisateurs ou ordinateurs) présents dans le conteneur (OU, domaine, etc.) auquel la GPO est liée.**</span>

### Console « Gestion de stratégie de groupe »
---

![alt text](image-20.png)

Pour résumer : 
-	Les stratégies de groupe fonctionnent sur des UO (tous les objets hors groupe) 
-	Les stratégies sont héritables P->E, et sont appliquées avant celles du conteneur courant.
-	Les stratégies appliquées sont prioritaires sur les héritées.
-	L’ordre des stratégies est important dans un même conteneur

Il y a possibilité de bloquer l’héritage.
 
Pour forcer la mise en place de la stratégie (et bypasser les 90 minutes classiques), utiliser la commande cmd ``gpupdate /force``

### La redirection de dossier
---
Les dossiers des documents peuvent être délocalisé

![alt text](image-21.png)

## Le Routage