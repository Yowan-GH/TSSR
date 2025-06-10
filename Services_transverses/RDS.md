# Services de Bureau à Distance (RDS)

## 🧱 Environnement de base

- **ADDS** (Active Directory) : gestion des utilisateurs et stratégies.
- **DNS** : résolution des noms (zones directes/inverses).
- **DHCP** : attribution automatique d’adresses IP (baux, étendues, exclusions).
    
💡 Ces services sont interdépendants pour le bon fonctionnement de RDS.


## 🖥️ Client lourd vs Client léger
<!-- tabs:start -->
### **🧱 Modèle Client Lourd**

#### 🔍 Définition :
Chaque poste utilisateur possède :
- ses propres ressources matérielles (CPU, RAM, stockage),
- les **applications installées localement**,
- une gestion individualisée.

---

#### ✅ Avantages :
- 💪 Meilleure performance locale pour des applications exigeantes (ex : CAO, traitement vidéo).
- 🧍‍♂️ Autonomie complète du poste, même hors ligne.
- 📂 Possibilité de personnalisation forte du poste utilisateur.

---

#### ❌ Inconvénients :
- 📦 Gestion lourde : chaque poste doit être maintenu à jour manuellement.
- 🔧 Support technique chronophage (interventions physiques).
- 🔓 Risques de sécurité accrus : les données locales peuvent être compromises.
- 🧩 Hétérogénéité : différences de versions et de configuration entre postes.

### **☁️ Modèle Client Léger**

#### 🔍 Définition :
Le poste utilisateur agit comme un terminal simple : il se connecte à un serveur distant pour exécuter les applications et accéder au bureau.
- Aucun traitement local intensif.
- Utilisation des **Remote Desktop Services (RDS)** ou solutions comme **Citrix**, **VMware Horizon**, etc.
- Les ressources (CPU/RAM) sont centralisées sur les serveurs.

---
#### ✅ Avantages :
- 🛠️ **Centralisation de la gestion** : une seule instance serveur à maintenir.
- 💸 **Réduction des coûts** :
    - matériel plus simple et moins coûteux,
    - moins de pannes matérielles,
    - consommation électrique réduite.

- 🔐 **Sécurité renforcée** :
    - aucune donnée locale,
    - limitation de la propagation des malwares.

- 🚀 **Déploiement et support simplifiés** 
    - déploiement rapide de nouveaux postes,
    - maintenance quasi exclusivement côté serveur.
        

---
#### ❌ Inconvénients :
- ⚡ Forte dépendance au **réseau** :
    - indisponibilité du serveur = perte d'accès pour tous.
        
- ⚙️ Les **performances dépendent du serveur** :
    - surcharge possible si mal dimensionné.
        
- 🚫 Moins adapté aux postes ayant besoin d’applications locales lourdes (ex : montage vidéo, traitement 3D).

- 🧠 Demande un **accompagnement du changement** :
    - les utilisateurs doivent s’habituer à un environnement virtualisé.

➡️ Le client léger permet un **gain de temps**, **réduction des coûts** et **meilleure sécurité**.

<!-- tabs:end -->
## 🔐 Services RDS : principes et composants

- **Remote Desktop Services (RDS)** : **rôle** installé sur **Windows Server** qui permet : 
	- De mettre à disposition de l'utilisateur un bureau complet et applications déportées
	- Une ou plusieurs machines virtuelles hébergées (VDI)
	- Il est : 
		- **🧍‍♂️ Multi-utilisateurs** : plusieurs utilisateurs peuvent accéder **en même temps** à un serveur RDS.
		- **📂 Multisession** : chaque utilisateur dispose d’une **session isolée**, avec son propre espace de travail.
		- Les ressources serveur sont **mutualisées** entre les utilisateurs.
	- Il utilise le **Remote Desktop Protocol (RDP)** : **protocole** d’accès distant.

### 🧰 Solutions pour une architecture client léger

|💻 Solution|🏢 Éditeur|🧾 Description rapide|
|---|---|---|
|**Citrix Virtual Apps and Desktops**|Citrix|Référence historique du secteur, très personnalisable, très robuste.|
|**Remote Desktop Services (RDS)**|Microsoft|Solution native Windows Server, simple à mettre en œuvre.|
|**Parallels Remote Application Server**|Parallels|Solution hybride orientée PME, facile à déployer.|
|**VMware Horizon**|VMware|Puissante solution de VDI, intégrée à l’écosystème VMware.|
## ⚙️ Déploiement RDS

### 🧠 Réflexion préalable

Avant de commencer l'installation du service RDS, il est **indispensable de bien planifier** le déploiement en amont.
#### ⚙️ Type de déploiement

|🔧 Type|📝 Description|
|---|---|
|**Déploiement standard**|Permet de répartir les rôles RDS sur plusieurs serveurs. Idéal pour la **scalabilité** et la **haute disponibilité**.|
|**Démarrage rapide**|Installe tous les rôles RDS sur un **seul serveur**. Utilisé pour les environnements **test**, **démo** ou petites structures.|
#### 🧑‍💻 Scénarios de déploiement

|🖥️ Scénario|📌 Description|
|---|---|
|**Bureaux basés sur une session**|Fournit un bureau Windows mutualisé sur un **serveur partagé**. Utilisation typique avec RemoteApp ou bureau distant.|
|**Bureaux basés sur un ordinateur virtuel (VDI)**|Met à disposition une **VM complète dédiée** à chaque utilisateur. Convient aux besoins spécifiques ou aux environnements cloisonnés.|

### ⚙️ Processus d'installation des services RDS

Le **rôle RDS** est structuré autour de **six services de rôle**. Ils peuvent être installés sur un **seul serveur** (environnement de test, petite structure) ou être **répartis sur plusieurs serveurs** pour des infrastructures plus importantes (production, haute disponibilité).

|🧩 Rôle|📌 Description|
|---|---|
|**RD Session Host**|Héberge les sessions utilisateurs (bureaux distants ou RemoteApp)|
|**RD Connection Broker**|Gère la répartition des connexions, les reconnexions aux sessions actives|
|**RD Web Access**|Permet l’accès via navigateur aux applications/bureaux publiés|
|**RD Gateway**|Permet un accès sécurisé depuis l’extérieur via HTTPS|
|**RD Licensing**|Gère les licences d’accès RDS (CAL)|
|**RD Virtualization Host**|Requis pour les infrastructures **VDI** (Virtual Desktop Infrastructure)|

> 🧠 Pour un déploiement de bureaux distants ou RemoteApp, les **4 services suivants sont indispensables** :  
> `RD Session Host`, `RD Connection Broker`, `RD Web Access`, `RD Licensing`.

---
#### 🛠️ Étapes principales

> Points d’attention
> - Nécessite un **serveur membre du domaine** (sauf Gateway autonome)
>  - RD Licensing obligatoire après 120j de période de grâce

1. **Ajout du rôle "Services Bureau à distance"** sur les serveurs RDS via :
    - le **Gestionnaire de serveur**, ou
    - **PowerShell** (``Install-WindowsFeature -Name RDS-RD-Server -IncludeAllSubFeature -IncludeManagementTools``).
        
2. **Sélection des services de rôle souhaités** :
    - Minimum requis : `Session Host`, `Broker`, `Licensing`, `Web Access`.
        
3. **Choix du type de déploiement** (Ajouter des rôles / Bureau à distance):
    - `Démarrage rapide` : tous les rôles sur un seul serveur.
    - `Déploiement standard` : répartition des rôles sur plusieurs machines.
        
4. **Définition du scénario de déploiement** :
    - Session-based : bureaux/applications partagés.
    - VDI : bureaux virtualisés dédiés (avec Hyper-V).

> - 💡 Toujours planifier **qui héberge quoi** : rôle RD Gateway sur une DMZ, Broker en haute dispo, etc.
    - 📦 Prévoir **la gestion des certificats** si accès via RDWeb ou Gateway.
    - 🔁 Les rôles peuvent être ajoutés ou déplacés **après le déploiement initial**, selon les besoins.

## 🛠️ Outils de gestion du service RDS
<!-- tabs:start -->
### **🖥️ Interface graphique (GUI)**

Depuis **Windows Server 2012**, les outils de gestion RDS sont **intégrés directement au Gestionnaire de serveur**.  
Tu y trouveras notamment :
- les **collections** de bureaux/applications publiés,
- l’état des serveurs RDS,
- les sessions utilisateur actives,
- les options de déconnexion/forçage.

📌 Ce mode est simple à prendre en main et permet une **gestion visuelle efficace**, surtout pour :
- publier une application,
- surveiller les connexions actives,
- gérer les droits utilisateurs.

### **💻 PowerShell – Module RemoteDesktop**

Le module `RemoteDesktop` offre une **gestion fine et scriptable** du service RDS. Très utile pour :
- l’automatisation,
- les déploiements massifs,
- les environnements non-GUI.

Voici les principales **cmdlets** utiles :

|Cmdlet|Utilité|
|---|---|
|`New-RDSessionDeployment`|Déploiement initial du rôle RDS avec les services nécessaires (Session Host, Broker, etc.)|
|`New-RDSessionCollection`|Création d’une collection (groupe logique de serveurs et sessions)|
|`New-RDRemoteApp`|Publication d’une application RemoteApp spécifique dans une collection|

> 🧠 Ces commandes sont détaillées plus loin dans le module RemoteApp, mais peuvent déjà être utilisées dans des scripts automatisés ou des environnements sans interface graphique.

<!-- tabs:end -->

## 📦 Création d’une collection

> Une fois les rôles RDS installés, la **création d’une collection** est une étape indispensable pour activer les services RDS.

### 🧠 Qu’est-ce qu’une collection RDS ?

Une **collection** regroupe un ou plusieurs serveurs **RD Session Host** destinés à fournir :
- soit un **bureau à distance** (session-based desktop),
- soit des **applications RemoteApp**.
    
La collection définit donc :
- les utilisateurs autorisés,
- les programmes publiés,
- les paramètres de session et de connexion.

> 🧩 **Sans collection**, aucun service RDS ne sera effectif pour les utilisateurs.

### 🛠️ Création depuis le Gestionnaire de serveur

1. Ouvrir le **Gestionnaire de serveur**.
2. Aller dans **Services Bureau à distance > Collections**.
3. Cliquer sur **Tâche** /  **Créer une collection**.
4. Suivre l’assistant pour :
    - nommer la collection,
    - sélectionner les serveurs RD Session Host,
    - ajouter les utilisateurs/groupes autorisés,
    - spécifier les applications publiées (le cas échéant).

### ✅ La collection est nécessaire pour :

- Fournir un **bureau distant** aux utilisateurs.
- Publier des **applications RemoteApp**.
- Gérer les **droits d’accès**, **ressources**, **profils utilisateurs** et **restrictions**.


## 🖥️ Clients d’accès aux services RDS

Pour accéder aux bureaux distants ou applications publiées, les utilisateurs utilisent différents **clients d’accès**. Ces clients permettent d'établir une session à distance via le protocole **RDP (Remote Desktop Protocol)**.

L’outil **Connexion Bureau à distance** (`mstsc.exe`) est intégré **par défaut** dans tous les systèmes Windows.

> C’est le **client RDP natif** utilisé pour se connecter à un serveur ou une session RDS.

### ⚙️ Fonctionnalités principales

En cliquant sur **Afficher les options**, l'utilisateur peut personnaliser sa connexion avec des paramètres avancés :
- 📂 **Utilisation des ressources locales** :
    - disques locaux redirigés,
    - imprimantes, presse-papiers, ports COM/USB...
- 🖥️ **Affichage sur plusieurs écrans** (multi-moniteurs).
- 💾 Enregistrement d’un **fichier .RDP** personnalisé.
- 🎨 Ajustement des performances en fonction de la bande passante (expérience graphique allégée).
### Autres clients disponibles

- 🌐 **Accès Web (RD Web Access)** : via navigateur (`https://serveur/RDWeb`).
- 📲 **Clients RDP mobiles** (iOS, Android).
- 🧑‍💻 **Client RemoteApp intégré** dans le panneau de configuration Windows.

> 🧠 L’expérience utilisateur peut varier selon le client utilisé (ex : redirections locales plus limitées sur mobile).


## 👥 Gestion des connexions RDS

Une fois les utilisateurs connectés aux services RDS, l’administrateur peut **superviser et interagir** avec leurs sessions via le **Gestionnaire de serveur**.

### 📍 Accès à la supervision
1. Ouvrir le **Gestionnaire de serveur**.
2. Accéder à **Services Bureau à distance > Collections**.
3. Sélectionner la **collection cible**.
4. Accéder à l’onglet **Connexions**.

### 👀 Informations affichées

Dans la vue _Connexions_, tu peux voir :
- Le **nom du serveur RDS** où est hébergée la session.
- Le **nom d'utilisateur** connecté.
- L’**état de la session** (actif, déconnecté…).
- L’**heure d’ouverture** de la session.

### 🛠️ Actions disponibles (clic droit)
- **Déconnexion** de l’utilisateur.
- **Envoi de message** (ex : annonce de maintenance).
- **Cliché instantané** :
    - permet une **visualisation** ou une **prise en main distante** de la session.
- **Fermeture de session** forcée.

> 🧠 Le cliché instantané est très utile pour **aider un utilisateur à distance** sans passer par un outil externe.


