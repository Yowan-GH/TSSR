# Active Directory
## Présentation

### 🏢 Domaine Active Directory

❓ Pour quoi faire ?

- 🔐 Centraliser la gestion de l’**authentification**
- 👥 Centraliser les informations relatives aux **utilisateurs et ressources**
- 🖥️ Centraliser la gestion des **paramètres utilisateurs et ordinateurs**

Il repose sur 3 protocoles :
- DNS : Résolution d’adresse IP
- LDAP : Annuaire
- Kerberos : protocole d’identification reposant sur un mécanisme de clés secrètes et l’utilisation de tickets

### La forêt Active Directory
<img src="Service_Reseaux_Microsoft/images/Environnement_MS_24.png">

## Le domaine Active Directory et ses composantes

L’AD est un ensemble d’ordinateurs en réseau qui partagent une base de données commune. Il est administré comme un ensemble (règles et procédures communes).

Le contrôleur de domaine est le serveur qui assure la gestion du domaine. Il gère les tâches d’hébergement et de gestion de la base AD ainsi que l’authentification.

Site active directory : Composante logique du domine afin d’optimiser la replication, l’accès aux ressources. Il est composé d’un ou plusieurs sous réseaux TCP/IP

Avant de promouvoir un serveur en contrôleur de domaine, ces prérequis doivent être respectés :

### 🧩 Les composants de domaine : Rôles FSMO (Flexible Single Master Operations)

| 🌲 **Niveau** | 🎭 **Rôle**                        | 📝 **Description**                                                                                   |
|---------------|------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Forêt**     | **Maître de nom de domaine**       | Contacté :<br>• Lors de l’ajout ou suppression d’un domaine<br>• ⚠️ En cas de **renommage** de domaine |
|               | **Maître de schéma**               | Peut modifier le schéma de l’AD (décrit les objets)<br>Les autres contrôleurs de domaine accèdent en lecture |
| **Domaine**   | **Maître RID**                     | Alloue les blocs d’**Identificateurs Relatifs (RID)** aux autres CD, pour générer les **SID**        |
|               | **Maître d’infrastructure**        | Gère les objets référencés entre **domaines différents** de la forêt                                 |
|               | **Maître émulateur PDC**           | - Gère les **mots de passe**<br>- Gère les **GPO**<br>- **Synchronise les horloges**<br>- Joue le rôle de **contrôleur principal** dans les anciens domaines |
### ✅ Prérequis pour l’ajout d’un contrôleur de domaine (DC)
| 🧩 Prérequis                             | 📝 Description                                                                 |
|-----------------------------------------|--------------------------------------------------------------------------------|
| **Nom d’hôte du poste**                 | Le nom d’hôte et le suffixe DNS doivent être correctement définis.            |
| **Configuration réseau et adressage IP**| Ces paramètres doivent être opérationnels.                                    |
| **Composants Windows**                  | Les composants relatifs aux services **ADDS** doivent être installés.         |
| **Prise en compte de l’existant**       | Analyser l’infrastructure existante et déterminer les points essentiels.      |
| **Préparation de l’AD**                 | La forêt ou le domaine peut être préparé lors de l’ajout d’un DC.             |


## Mettre en place un AD

💻 Graphiquement, aller dans : Gérer / Ajouter un rôle / AD DS – Terminer la configuration  

📜En powershell via la commande : 
```powershell
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```
<img src="Service_Reseaux_Microsoft/images/Environnement_MS_34.png">

Lors du retour sur le dashboard, **une notification nous indique de promouvoir le serveur en contrôleur de domaine**.

💻 Graphiquement
1. Ajouter une nouvelle forêt – Donner un domaine racine
2. Choisir le niveau de la forêt
3. Choisir le mot de passe DSRM (en cas de crash de l’AD)
4. Indiquer le domaine NetBIOS (laisse par defaut)
5. Terminer la configuration.
6. Redémarrer

📜En powershell via la commande : 
```powershell 
Install-ADDSForest `
  -DomainName "domaine.local" `         # 	Nom FQDN du domaine (ex : domaine.local)
  -DomainNetbiosName "DOMAINE" `        #	Nom court du domaine (utilisé pour compatibilité et connexion réseau)
  -SafeModeAdministratorPassword (Read-Host -AsSecureString "Mot de passe DSRM") ` # Mot de passe du mode DSRM (récupération en cas de panne AD
  -InstallDns:$true `   # Installe aussi le rôle DNS (souvent nécessaire avec AD)
  -Force                # Évite les confirmations interactives

  ```

Apres le redémarrage, les infos visibles sur les users, groups, domain controller seront dans « Utilisateurs et ordinateurs active Directory »

**Vérifier la regle de pare-feu - Partage de fichiers et d’imprimantes (Demande d’écho - Trafic entrant ICMPv4) pour les ping.**

### Ajouter un ordinateur / serveur au domaine AD

Après avoir installé le contrôleur de domaine, entrer dans les ordinateurs et serveurs (future membre de l'AD)   
Puis changer le nom de l’ordinateur pour rejoindre le domaine :
Indiquer un Nom de user en domain\***** et le mot de passe correspondant (admin du CD)
<img src="Service_Reseaux_Microsoft/images/Environnement_MS_2.png">
<img src="Service_Reseaux_Microsoft/images/Environnement_MS_19.png">

ou 📜En powershell via la commande :

```powershell

Add-Computer `
  -DomainName "tondomaine.local" `
  -Credential (Get-Credential) `
  -Restart
  ```


## Les bases de gestion d’un domaine

### 📚 Objets de l’annuaire et outils de gestion

Dans un contexte de domaine AD, les tâches courantes de gestion sont liées à l’administration des **principaux objets de l’annuaire**.

#### 🔐 Entités de sécurité

- Utilisateur
- Ordinateur
- Groupe
#### 📦 Conteneurs

- Unité d’organisation
- Conteneur système  

Les utilisateurs :
Il est utile de faire des modèles d’utilisateurs génériques avec :
- Un nom clair
- Le plus grand nombre de caractéristique standard
- Compte inactif

Il faudra alors dupliquer ce modèle pour créer un nouveau user.

 ##### 📦 Conteneurs système par défaut dans un domaine Active Directory

| 🏷️ Nom de l’objet | 📝 Fonction                                                                                      |
|-------------------|--------------------------------------------------------------------------------------------------|
| **Builtin**       | Éléments (utilisateurs et groupes locaux) présents dans la base SAM des CD **avant leur promotion**. Une fois promus, ils sont déplacés dans ce conteneur. |
| **Computers**     | Emplacement de stockage **par défaut des comptes ordinateurs**.                                 |
| **System**        | Emplacement de stockage des éléments nécessaires au fonctionnement de **l’AD** et composants associés. |
| **Users**         | Emplacement des groupes et **utilisateurs par défaut** dans un domaine AD.                      |


## Les groupes dans Active Directory

Un groupe est un ensemble d'utilisateurs, d'ordinateurs ou d'autres groupes qui partagent les mêmes permissions ou droits d'accès. Il existe principalement deux types de groupes en AD :  
- Groupes de sécurité : utilisés pour gérer les autorisations d'accès aux ressources (ex: un dossier partagé).
- Groupes de distribution : utilisés pour envoyer des e-mails collectifs (ex: une liste de diffusion).  

Dans un contexte multi-domaines, il y a des niveaux de portée qui définissent comment un groupe peut être utilisé.

### 📌 Groupe global (Global Group - GG)
Contient : uniquement des utilisateurs ou groupes du même domaine.  
Utilisation : utilisé pour organiser les utilisateurs en fonction de leur rôle (ex: "Comptabilité", "IT", "RH").  
Peut être ajouté dans : des groupes de domaine locaux et des groupes universels.  
✅ Exemple : Un groupe "GG_Comptabilité" contient tous les comptables de l’entreprise.

### 📌 Groupe de domaine local (Domain Local Group - DLG)
Contient : des utilisateurs, des groupes globaux, universels de n'importe quel domaine.  
Utilisation : utilisé pour accorder des permissions sur une ressource spécifique (ex: accès à un dossier partagé).  
Peut être ajouté dans : Rien d’autre, il est utilisé uniquement dans son domaine.  
✅ Exemple : Un groupe "DLG_Accès_Compta" permet l'accès à un dossier partagé de comptabilité.  

### Comment ça s'articule ? (Principe AGDLP)
L’organisation des groupes suit souvent la règle AGDLP :
- A (Accounts) : Les utilisateurs sont ajoutés aux
- G (Groupes Globaux) : Regroupent les utilisateurs selon leur fonction.
- DL (Domain Local Groups) : Ont les permissions sur les ressources.
- P (Permissions) : Les groupes DL reçoivent les permissions d’accès.  

✅ Exemple concret :  
Les utilisateurs "Jean" et "Paul" sont dans "GG_Comptabilité" (groupe global).  
"GG_Comptabilité" est ajouté dans "DL_Accès_Compta" (groupe de domaine local).  
"DL_Accès_Compta" reçoit les permissions sur le dossier partagé "Comptabilité".  

Les unités d’organisation OU / UO = Dossier avec des objets à l’intérieur
> ⚠️ **Il n’est pas conseillé de conserver les comptes ordinateurs du domaine dans le conteneur `Computers`.**  
> Il en va de même pour les comptes utilisateurs dans le conteneur `Users`.

### Importation de masse
Pour l'importation d'un grand nombre d'utilisateur et afin de s'assurer de la fiabilité de l'import, nous utiliserons :

1️⃣ Préparer un fichier CSV  
Crée un fichier utilisateurs.csv avec le contenu suivant :  
``GivenName,Surname,Name,SamAccountName,UserPrincipalName,OU
Jean,Durand,jdurand,jdurand,jdurand@domaine.local,"OU=Utilisateurs,DC=domaine,DC=local"
Marie,Martin,mmartin,mmartin,mmartin@domaine.local,"OU=Utilisateurs,DC=domaine,DC=local"``

2️⃣ Script PowerShell d'importation 📜
```powershell
Import-Csv -Path "C:\Scripts\utilisateurs.csv" | ForEach-Object {
    New-ADUser `
        -GivenName $_.GivenName `
        -Surname $_.Surname `
        -Name $_.Name `
        -SamAccountName $_.SamAccountName `
        -UserPrincipalName $_.UserPrincipalName `
        -Path $_.OU `
        -AccountPassword (ConvertTo-SecureString "Motdepasse@123" -AsPlainText -Force) `
        -Enabled $true
}
```

## Les autorisations NTFS

Elles permettent de définir des privilèges d’accès.   
Des autorisations de base et avancées.  
Les permissions NTFS sont soumises à héritage.  


### ✅ Autorisations **de base**

| 🟦 Lecture | 🟦 Liste de contenu | 🟦 Lecture + exécution | 🟦 Écriture | 🟦 Modification | 🟦 Contrôle total |
|-----------|--------------------|------------------------|------------|----------------|------------------|

---

### 🔒 Autorisations **avancées**

| Appropriation | Création de fichiers | Création de dossiers | Écriture des attributs étendus |
|---------------|-----------------------|-----------------------|-------------------------------|
| Lecture des attributs étendus | Modifier les autorisations | Suppression | Suppression de sous-dossiers et fichiers |




## Partage de fichiers

Le partage vient en complément des autorisations NTFS.
Comme pour les autorisations NTFS, le refus explicite est prioritaire sur le reste.

Lorsqu’un user se connecte sur un dossier partagé, il est soumis :
1. Aux autorisations de partage en premier
2. Aux autorisations NTFS en second
3. Les privilèges les plus restrictifs prévalent

**Il est indispensable de publier le partage dans l’AD afin de pouvoir le retrouver facilement**

<img src="Service_Reseaux_Microsoft/images/Environnement_MS_36.png">

## Stratégie d’imbrication des groupes

Afin de gérer efficacement l’accès aux ressources partagés, Microsoft préconise l’imbrication des groupes globaux et locaux


<img src="Service_Reseaux_Microsoft/images/Environnement_MS_6.png">

Les groupes locaux servent à définir les autorisations.  
Exemple :
- Le groupe GG_marketing est membre du groupe partage_marketing_CT
- Le groupe partage_marketing_CT a le contrôle total sur le dossier de partage
- Les membres du groupe GG_marketing auront l’accès total au dossier partagé

Tous se fait via le partage avancé des dossiers.

## Le service d’impression

Nécessite le rôle de serveur d’impression.
Permet l’accès à l’outil Outil d’administration/Gestion de l’impression

Pour ajouter une imprimante :
- Définir le port TCP/IP
- Ajouter l’imprimante et lui attribuer le port
- Clic droit sur l’imprimante et ajouter à l’annuaire pour l’ajouter à l’AD.
