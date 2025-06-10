# WDS

## 🖧 Présentation du service WDS 

**WDS** (Windows Deployment Services) est un rôle Windows Server permettant de **déployer des systèmes d’exploitation Windows à distance**, via le réseau, sans support physique.
### 🛠️ Fonctionnalités principales

- 📡 Fournit un **serveur PXE + TFTP** permettant l’amorçage réseau des clients.
- 💾 Permet d’héberger et diffuser :
    - des **images de démarrage** (boot.wim),
    - des **images d’installation** (install.wim).
- 🚛 Transmet les images aux postes clients via le réseau
- 🔌 Intègre aussi des **pilotes matériels** dans les images WIM si nécessaire.

### 🖥️ Interface d’administration

- WDS dispose d’une **console graphique** intégrée à Windows Server.
- Il est aussi **administrable via PowerShell** : `Get-Command -Module WDS`

> Cette double interface permet aussi bien une **gestion manuelle** qu’**automatisée** (scripts, GPO...).

## 🔧 Fonctionnement
<!-- tabs:start -->
### **✅ Prérequis**

Pour que **WDS fonctionne correctement**, certains services doivent être **déjà opérationnels** dans l’infrastructure réseau.
#### 🔧 Services indispensables

- **DHCP (Dynamic Host Configuration Protocol)**  
    Fournit dynamiquement une adresse IP aux clients PXE (démarrage réseau).  
    ➤ Obligatoire pour que les postes clients puissent **booter via le réseau**.
    
- **DNS (Domain Name System)**  
    Permet la **résolution des noms** (ex : `wds.entreprise.local`) et la bonne identification des serveurs.  
    ➤ Essentiel pour **l'intégration à Active Directory** et les services MDT associés.
    
- WDS est **généralement déployé dans un environnement Active Directory**.
	- Cela permet :
	    - l’**authentification sécurisée** des postes,
	    - la **préaffectation de machines** via leur adresse MAC,
	    - la configuration automatique de **stratégies de groupe (GPO)** post-déploiement.

> 💡 **Mais WDS peut aussi fonctionner en dehors d’un domaine**, en mode autonome (fonctionnalités plus limitées).
### **🔗 WDS et DHCP**

Pour qu’un poste client démarre automatiquement via le réseau (**boot PXE**) et reçoive l’image de déploiement, deux services doivent **coopérer** :
- **DHCP** attribue une adresse IP au poste.
- **WDS** fournit les **informations PXE** : nom du serveur TFTP et fichier de démarrage.

#### 🧭 Étapes du processus PXE

1. **DHCP DISCOVER**  
    Le poste client sans OS envoie une requête broadcast pour demander une IP.
    
2. **DHCP OFFER**  
    Le serveur DHCP répond avec :
    - une adresse IP disponible,
    - des **informations PXE supplémentaires** si configuré.
        
3. **DHCP REQUEST / ACK**  
    Le client accepte l’adresse et reçoit la confirmation.
    
4. **Contact avec WDS**  
    Le client utilise les options DHCP suivantes pour charger l’image :
    - `Option 66` : **Nom du serveur TFTP** (ex: `wds.domain.local`)
    - `Option 67` : **Nom du fichier de boot** (ex: `boot\x64\wdsnbp.com`)
        

> Ces paramètres sont soit gérés par le serveur **DHCP lui-même**, soit par **WDS** si les deux services sont sur la même machine (WDS peut écouter les requêtes DHCP de type PXE).

#### 🛠️ Options DHCP typiques

- `Option 6` : DNS Server
- `Option 15` : Domain Name
- `Option 66` : TFTP Host Name
- `Option 67` : Boot File Name

### **Synthèse**

```logigram
[PC client sans OS]
        │
        ▼
[Requête DHCP avec PXE Discover]
        │
        ▼
[Serveur DHCP répond avec IP + Option 66/67 (WDS)]
        │
        ▼
[Le client télécharge via TFTP l’image de boot (boot.wim)]
        │
        ▼
[WinPE se lance (environnement minimal)]
        │
        ▼
[L'utilisateur choisit une image à installer (install.wim)]
        │
        ▼
[Installation manuelle de Windows depuis WDS]
        │
        ▼
[Fin de l’installation – OS prêt à être utilisé]

```



<!-- tabs:end -->

## 🧰 Installation et configuration du rôle WDS
<!-- tabs:start -->
### **🧱 Installation**

Le rôle peut être installé via :
- 🖱️ **Le Gestionnaire de serveur** (ajout de rôles),
- 💻 **PowerShell** avec : ``-Install-WindowsFeature -Name WDS``

Lors de l’installation, deux **sous-services** sont disponibles :
1. **Serveur de déploiement**  
    ➤ Indispensable pour la gestion des images et le démarrage PXE.
2. **Serveur de transport**  
    ➤ Utilisé pour les transferts en **multicast** (cas non abordé ici).

🧠 **Si l’objectif est le déploiement de postes**, **les deux services doivent être installés**.

> Bonne pratique : Dédier un serveur pour le service de déploiement WDS

---
### **⚙️ Configuration initiale**

#### 🧭 Lancement de la configuration

Après l'installation :
1. Ouvre la **console WDS**.
2. Clic droit sur le nom du serveur.
3. Sélectionne **"Configure Server"**.

#### 📋 Paramètres à renseigner
- **Contexte** : intégration ou non à un domaine Active Directory.
- **Répertoire de stockage** des images (prévoir un espace disque suffisant).
- **Réponse PXE** :
    - activer ou non le service PXE (Preboot eXecution Environment).
    - définir s’il répond à tous les clients ou uniquement à des machines connues (non configuré dans le cours).
- Il est possible de modifier les paramètres en faisant un **clic droit** sur le serveur de déploiement, **propriété** dans la **console WDS**

---
### **⚙️ Configuration globale**

#### 🛠️ Paramètres DHCP dans WDS

Quand **DHCP et WDS sont installés sur le même serveur**, il faut éviter les conflits de ports :
- ✅ Cocher **"Do not listen on DHCP ports"**  
    ➤ Pour éviter que WDS n’écoute les ports 67/68 déjà utilisés par DHCP.
- ✅ Cocher **"Configure DHCP options to indicate this is also a PXE server"**  
    ➤ WDS envoie alors les **options 60/66/67** nécessaires au boot PXE.

> ❗ Si DHCP est sur **un autre serveur**, **ne coche pas** ces options dans WDS.

#### 👟 Comportement du boot PXE

Dans l’onglet **PXE Response**, tu peux configurer comment les postes client réagissent au démarrage réseau.

Pour les clients connus :
- 🟢 **Always continue the PXE boot** → démarrage automatique sans interaction

Pour les clients inconnus :
- 🟢 Même option, ou autre selon stratégie (ex : validation manuelle, appui touche F12…)


> Cela permet un déploiement totalement **automatisé**, utile pour les salles de formation ou les déploiements en masse.

<!-- tabs:end -->

## 🗂️ Images de démarrage

WDS fonctionne à partir d’une structure organisée contenant deux types d’images distinctes, chacune ayant un rôle spécifique dans le processus de déploiement.

### ⚙️ Fonctionnement

<!-- tabs:start -->
### **📦 1. Boot Image**
- Il s’agit d’une image contenant **WinPE** (_Windows Preinstallation Environment_), un système minimaliste temporaire.
- Son rôle : **lancer l’environnement d’installation** sur le poste client via le réseau.
- Transmise via **TFTP** après démarrage PXE.

🧠 Elle ne contient pas Windows complet, uniquement les outils pour démarrer l’installation.

---
### ⚙️ **Ajout d'une image de demarrage**

Elle doit être ajoutée manuellement à WDS.

- **Ouvrir la console WDS**.
- Dans le nœud **"Boot Images"**, clic droit → **"Ajouter une image de démarrage"**.
- Naviguer jusqu’au fichier **`boot.wim`** (Sources\boot.wim)

> Il convient de monter une image ISO en premier avant de pouvoir trouver les boot.vim et Install.vim à l'intérieur

### **💽 2. Install Image**
- Contient la **version complète de Windows** à déployer (ex : Windows 10 Pro).
- Transmise après chargement de WinPE.
- Elle est extraite d’un fichier **`install.wim`** (souvent présent dans les ISO de Windows).

---
### ⚙️ **Ajout d'une image d'installation**

- **Ouvrir la console WDS**.
- Clic droit sur le nœud **"Install Images"** → **"Ajouter une image d'installation"**.
- Indiquer le **chemin du fichier `.wim`**

### 🗂️ Groupe d’images
- Chaque image d’installation doit être rattachée à un **groupe d’images**.
- Si aucun groupe n’existe, l’assistant te propose d’en créer un.

🧠 Cela permet d’organiser différentes éditions ou versions (ex : Win10 Éducation, Win11 Pro).

Un même fichier `install.wim` peut contenir **plusieurs éditions** de Windows (Home, Pro, Education...).

✅ Tu peux :
- n’en importer **qu’une partie**,
- ou **toutes les éditions**.

> Cela permet à l’utilisateur final de **choisir l'édition** à installer pendant le déploiement.
### **🔄 3. Fonctionnement résumé**
1. 🟢 Le client boote en PXE → reçoit l’**image de démarrage** (`boot.wim`).
2. ⚙️ WinPE s’exécute → sélectionne une **image d’installation** (`install.wim`) disponible dans WDS.
3. 💾 Le système est **installé sur le poste client**.
<!-- tabs:end -->

---

## 🧰 Pour aller plus loin 
<!-- tabs:start -->
### **Image de capture📸**

|**Étape**|**Description**|
|---|---|
|🧰 **1. Préparer le poste de référence**|Installer Windows + configurer logiciels, comptes, paramètres réseau... **Exécuter `Sysprep`** : `sysprep /oobe /generalize /shutdown` pour généraliser l’OS (nettoie SID, etc.)|
|🛠 **2. Créer une image de capture dans WDS**|Dans WDS : clic droit sur une **image de démarrage (boot.wim)** → _Créer une image de capture_ → Donner un nom et un chemin de stockage (ex : `Capture10-Prod.wim`)|
|🚀 **3. Démarrer le poste via le réseau (PXE)**|Boot PXE (F12 ou automatique selon config) sur l’**image de capture**|
|📸 **4. Assistant de capture**|Sélectionner le volume à capturer (souvent `C:\`)Définir un **nom d'image** et un chemin de stockage sur un partage réseau ou local|
|🗂 **5. Ajouter cette image dans WDS**|Depuis WDS → clic droit sur _Images d’installation_ → _Ajouter une image_ → pointer vers le fichier `.wim` capturé|

> ✅ Cette image `.wim` peut ensuite être utilisée pour déployer des machines avec un Windows déjà préconfiguré.


### **Fichier de réponse 📄**

#### 🧷 1. Lier un fichier de réponse à l’image de **démarrage (boot)**

|Élément|Détail|
|---|---|
|📂 **Fichier `unattend.xml`**|Contient au minimum la section `1 windowsPE`|
|📁 **Répertoire cible**|`WDSClientUnattend` dans le partage WDS|
|🔧 **Configuration dans WDS**|Dans l’onglet **Client** du serveur WDS → Affecter un fichier unattend par architecture (`x64`, `x86`)|
|🎯 **Effet**|Automatisation de la phase de préinstallation : langue, partitionnement, mode de connexion au domaine, etc.|

#### 🧷 2. Lier un fichier de réponse à l’image **d’installation**

|Élément|Détail|
|---|---|
|🧾 **Fichier unattend.xml**|Doit contenir les sections `2 offlineServicing` à `7 oobeSystem`|
|⚙️ **Lien avec l'image**|Dans WDS → clic droit sur une image d’installation → _Propriétés_ → onglet **Général** → cocher _Permettre l’installation sans assistance_|
|🛠 **Fichier XML à renseigner**|Affecter le bon fichier `.xml` via _Select File_|
|🎯 **Effet**|L’installation complète de Windows se fait sans intervention : nom du PC, domaine, mot de passe admin, activation automatique, etc.|

#### 🔧 Création des fichiers `unattend.xml` :

Outils possibles :
- **WSIM (Windows System Image Manager)** – recommandé pour l’interface visuelle
- Ou **PowerShell** : `New-ShieldingDataAnswerFile` (moins courant)
- Ou **fichier modèle** édité à la main

💡 **Conseil** :

> En entreprise, on combine souvent **WDS + fichiers de réponse** pour automatiser **le déploiement de centaines de postes** sans intervention humaine.


<!-- tabs:end -->