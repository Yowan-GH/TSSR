# Deploiement d'un OS
## 🖥️ Le poste de travail, point d’entrée du SI

Le poste de travail est l'interface principale entre l'utilisateur et le **Système d'Information (SI)** de l'entreprise.
### 🧩 Définition
Un poste de travail peut être :
- un **ordinateur de bureau ou portable**,
- ou tout autre périphérique : tablette, smartphone, etc.

Il permet d'accéder aux ressources du SI : applications métiers, fichiers, serveurs...

### ✅ Avantages d’un poste bien géré
- **Ergonomie** : facilité d’usage pour l’utilisateur final.
- **Robustesse** : fiabilité et résistance dans un contexte pro.
- **Coût total de possession réduit (TCO)** : facilité de maintenance, homogénéité logicielle.

## ⚙️ Déploiement des postes : pourquoi et comment ?

### 📌 Objectif

Pour être fonctionnels, les postes doivent être **préparés** avec :
- un **système d’exploitation configuré** (Windows, Linux, etc.),
- les **applications de l’entreprise**,
- les bons **paramètres réseau**, **comptes**, **droits**, etc.

> Le **déploiement de poste** permet d’automatiser cette préparation à grande échelle.

### 🔁 Processus de déploiement

1. 🛒 **Poste neuf** (sans configuration)
2. ⚙️ **Déploiement automatisé** (WDS, MDT...)
3. ✅ **Poste opérationnel** (prêt à l’emploi pour l’entreprise)

### 🏢 Déploiement selon le type d’entreprise

Les besoins varient selon la taille :

|Type d’entreprise|Besoins typiques|
|---|---|
|TPE|Simplicité, rapidité, outil unique|
|PME|Flexibilité, configuration multi-profil, applications variées|
|Grand compte|Intégration à l’AD, automatisation massive, sécurité|
🔍 Attentes générales 
- Processus simple et rapide 🕒
- Prise en charge de **plusieurs environnements**
- Installation de **systèmes + applications**
- Solution **évolutive et adaptable**

## 🧱 Images

Le **déploiement de postes** repose sur l’utilisation d’**images systèmes**. Deux types d’images sont principalement utilisés pour déployer Windows.
<!-- tabs:start --> 
### **💾 Image de partition**

- Il s’agit d’un **clonage complet** d’une partition système (format souvent propriétaire selon l’outil utilisé : Ghost, Clonezilla, etc.).
    
- Nécessite que tous les postes cibles aient **les mêmes caractéristiques matérielles** :
    - carte mère,
    - pilotes,
    - configuration disque (MBR/GPT...).

❌ **Très rigide**, peu adapté aux parcs hétérogènes.

### **🗂️ Image d’installation (format WIM)**

- Format utilisé nativement par Microsoft : **Windows Imaging Format (.wim)**.
- Contient les **fichiers d’installation** extraits ou capturés.
- Fonctionne avec un processus de **détection matérielle à l’installation** :
    - chargement des pilotes,
    - adaptation à l’environnement cible.

✅ **Une seule image WIM** peut être déployée sur **plusieurs types de matériels différents** (portable, tour, constructeur varié...).

### **🧠 À retenir**

| Critère                    | Image de partition                 | Image d’installation (WIM)               |
| -------------------------- | ---------------------------------- | ---------------------------------------- |
| 📦 Contenu                 | Clonage brut                       | Fichiers d’installation                  |
| ⚙️ Adaptabilité matérielle | Faible (matériel identique requis) | Élevée (grâce à la détection matérielle) |
| 🔄 Flexibilité             | Limité à un parc homogène          | Compatible multi-modèles                 |
| 🧰 Utilisé avec            | Clonezilla, Ghost...               | WDS, MDT, DISM...                        |
<!-- tabs:end --> 

## 🧰 Solutions de déploiement de postes

Pour automatiser et industrialiser le déploiement des systèmes d’exploitation dans une organisation, plusieurs solutions logicielles existent.
### 🔧 Outils couramment utilisés

| Solution       | Description rapide                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **WDS / MDT**  | Solutions Microsoft intégrées à Windows Server / AD. Utilisées pour un déploiement automatisé ou semi-automatisé via le réseau. |
| **FOG**        | Outil open source basé sur Linux, orienté clonage d’images.                                                                     |
| **Ghost**      | Solution historique de Symantec, basée sur des images de partition.                                                             |
| **Clonezilla** | Outil libre de clonage, très utilisé en environnement hétérogène.                                                               |

## 🧰 Trois solutions Microsoft pour le déploiement

Microsoft propose **trois outils complémentaires** pour la gestion et le déploiement des postes de travail. Chacun a son rôle et son niveau de complexité.
<!-- tabs:start --> 
### **🖧 WDS**

**Windows Deployment Services**

- 🧩 Inclus dans **Windows Server**.
- 📡 Fournit un **service PXE** pour démarrage réseau.
- 📦 Permet de **déployer des images Windows** via TFTP.
- ⚙️ Utilisé pour :
    - envoyer une **image de boot** (WinPE),
    - installer un OS à distance sur un PC vierge.

> 🔧 Souvent couplé à MDT pour un déploiement automatisé.


### **🛠️ MDT**

**Microsoft Deployment Toolkit**

- Ensemble d’outils **téléchargeables gratuitement** sur le site Microsoft.
- Permet :
    - la **création de séquences de tâches**,
    - l’**automatisation du déploiement**,
    - l’ajout d’applications, pilotes, scripts.
        
- Fonctionne avec ou sans WDS :
    - déploiement par clé USB (LiteTouch ISO),
    - ou par réseau (LiteTouch WIM injecté dans WDS).

> 📁 Stocke les ressources dans un **Deployment Share** (OS, apps, scripts…).

### **🧑‍💼 ConfigMgr**

**Configuration Manager**

- Anciennement connu sous le nom **SCCM**, aujourd’hui intégré à **Microsoft Endpoint Manager**.
- Outil **haut de gamme** pour :
    - le **suivi**, le **déploiement**, la **mise à jour** et la **maintenance** des systèmes sur toute leur durée de vie.
- Nécessite une **infrastructure importante** (SQL, AD, etc.).

> Utilisé par les grandes entreprises pour **industrialiser la gestion de parc**.

<!-- tabs:end --> 
### **📊 Comparatif rapide**

| Critère             | WDS                   | MDT                          | ConfigMgr                |
| ------------------- | --------------------- | ---------------------------- | ------------------------ |
| Installation        | Windows Server        | Téléchargement               | Infrastructure complète  |
| Fonction principale | Démarrage PXE + image | Déploiement automatisé       | Gestion de parc complète |
| Automatisation      | ❌ Manuelle            | ✅ Séquences, scripts, GPO... | ✅ Très poussée           |
| Cible               | PME, établissements   | TPE/PME, administrations     | Grandes entreprises      |
|                     |                       |                              |                          |

## 🚚 Scénarios de déploiement

Le processus de déploiement peut être **adapté à différents contextes** techniques et besoins métiers. Voici les principaux **scénarios pris en charge par MDT/WDS** :
<!-- tabs:start --> 
### **🆕 Bare-metal**

- Déploiement d’un système sur un **poste vierge** ou sur un poste existant avec **écrasement total** du système précédent.
- Toutes les données existantes sont **perdues**.

🧩 Utilisé lors de : 
- l’arrivée de nouveaux équipements,
- la **remise à zéro** de postes en production.
    

### **🔁 Wipe-and-Load**

- Réinstallation de Windows **par-dessus un OS existant**, avec conservation :
    - des **données utilisateur**,
    - des **applications**,
    - ou des **paramètres** si configuré via des scripts ou profils.
        

🛠️ Utilisé pour :
- **repartir sur une base propre** tout en gardant les données.
    

### **🔄 Replace**

- Le **poste source** est remplacé par un nouveau.
- Les **données de l’ancien poste** sont :
    - sauvegardées puis
    - **restaurées** sur le nouveau.

📦 Permet un **renouvellement matériel** transparent pour l’utilisateur.

### **⬆️ In-place upgrade**

- Application d’une **nouvelle version de Windows** (ex : nouvelle build de Windows 10).
- L’environnement, les applications, les paramètres **restent intacts**.

💡 Exemple : passage de Windows 10 1809 à 22H2.

<!-- tabs:end --> 