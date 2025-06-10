# MDT – Microsoft Deployment Toolkit

## 🎯 Présentation

**MDT** est une solution gratuite de Microsoft permettant d’**automatiser** le **déploiement de systèmes d’exploitation**, d’applications, de pilotes, et de paramètres sur des postes clients.

➕ Avantages :
- Déploiement **automatisé ou semi-automatisé** (Lite Touch)
- Gestion centralisée des images, pilotes, applications, séquences de tâches
- **Gratuit** et compatible avec Active Directory
- Fonctionne **avec ou sans WDS**

|Fonctionnalité|**WDS** (Windows Deployment Services)|**MDT** (Microsoft Deployment Toolkit)|
|---|---|---|
|Type de déploiement|Manuel ou semi-automatisé|Automatisé (Lite Touch / Zero Touch avec SCCM)|
|Gestion des drivers/apps|❌ Non|✅ Oui|
|Interface graphique|Basique|Avancée (Deployment Workbench)|
|Séquences de tâches|❌ Non|✅ Oui|
|Réponse automatique (Unattend.xml)|Optionnel, peu souple|Oui, personnalisable par interface|
|Besoin d’AD|Recommandé mais non obligatoire|Idem|

> 👉 MDT peut **compléter** WDS pour offrir un **déploiement complet automatisé**.

## 🧩 Fonctionnement de MDT avec WDS 
<!-- tabs:start -->
### **Étape 1**
### Démarrage PXE via WDS

- Un poste **sans OS** envoie une requête **DHCP** avec **PXE Discover**.
- Le serveur **WDS** répond en envoyant une **image de démarrage** générée par **MDT** :  
    ➜ `LiteTouchPE_x64.wim` (ou x86 selon l’architecture)
- Ce fichier est transféré via **TFTP**.

📁 Ce fichier `.wim` est **généré dans MDT** puis copié dans WDS.

---

### **Étape 2**
### Exécution de WinPE + connexion au partage MDT

- Le poste démarre dans **WinPE**, l’environnement pré-OS fourni par MDT.
- Il affiche une **interface Lite Touch (LTI)** et **se connecte au partage MDT** :  
    ➤ Récupère :
    - L’**image `.wim` à déployer**
    - La **séquence de tâches**
    - Les **fichiers de réponses (unattend.xml)**

📂 Tout est hébergé dans le **"Partage de déploiement MDT"**.

---

### **Étape 3**
### Déploiement automatisé

- Grâce aux éléments précédents, le poste :
    - Formate les disques
    - Installe Windows
    - Installe les drivers, applications, rôles…
    - Applique des scripts personnalisés
    - Rejoint l’**AD si configuré**  
        ➤ **Aucune action utilisateur requise** si le déploiement est complet (Zero Touch avec ConfigMgr ou Lite Touch avec MDT seul)

### **Synthèse**

```logigram
[PC client sans OS]
        │
        ▼
[Requête DHCP avec PXE Discover]
        │
        ▼
[Serveur DHCP répond avec IP + infos WDS]
        │
        ▼
[Le client télécharge l’image de boot MDT (LiteTouchPE.wim) via WDS/TFTP]
        │
        ▼
[Le client démarre sous WinPE MDT]
        │
        ▼
[Connexion au partage MDT (déploiement)]
        │
        ▼
[Chargement de la séquence de tâches MDT]
        │
        ▼
[Exécution automatique des étapes configurées :]
        ├─ Formatage du disque
        ├─ Déploiement de l’image Windows (install.wim)
        ├─ Installation de pilotes
        ├─ Installation de logiciels
        ├─ Rejoint de domaine AD (si défini)
        └─ Configuration utilisateur/poste
        │
        ▼
[Poste prêt à l’usage avec ou sans intervention humaine]

```

🟢 **Avantages** :
- Automatisation complète (Lite Touch)
- Installation personnalisée
- Support des scripts, drivers, applis, fichiers de réponse
<!-- tabs:end -->

## 🚀 Déploiement OS Windows avec MDT

### 📌 1. Prérequis techniques

Avant de débuter :
- ✅ Installer **Windows ADK** et **WinPE** depuis Microsoft.
- ✅ Installer **MDT (Microsoft Deployment Toolkit)**.


---

### 📌 2. Création du partage de déploiement (Deployment Share)

1. Ouvrir **Deployment Workbench**.
2. Clic droit sur **Deployment Shares** → **New Deployment Share**.
3. Définir :
    - Chemin de stockage (ex : `D:\MDTDeploymentShare`).
    - Nom explicite et descriptif.
4. Configurer les options (multicast, monitoring).

---

### 📌 3. Importation des systèmes d'exploitation

- Dans **Operating Systems**, importer une image OS :
	- Dans Deployment Workbench, clic droit sur **Operating Systems** ➡️ **Import**.
    - Média d’installation ISO.
    - Fichier WIM existant.
    - Image provenant du serveur WDS.
    - Supprime les éventuelles images inutiles pour garder uniquement celles pertinentes.

---

### 📌 4. Configuration initiale : fichiers Bootstrap et CustomSettings

Configurer les fichiers essentiels pour automatiser le déploiement.

<!-- tabs:start -->
### **🔑Bootstrap.ini**

Accès initial au partage MDT depuis WinPE.

```ini
[Settings]
Priority=Default

[Default]
DeployRoot=\\ServeurMDT\DeploymentShare$
UserID=AdminMDT
UserDomain=domaine.local
UserPassword=Password123
KeyboardLocale=fr-FR
SkipBDDWelcome=YES
```

⚠️ **Après chaque modification**, mets à jour ton partage de déploiement depuis MDT pour régénérer les images LiteTouch.
### **⚙️CustomSettings.ini**

Automatisation du processus de déploiement :

```ini
SkipTaskSequence=YES
TaskSequenceID=OS-Deploy01
SkipComputerName=YES
OSDComputerName=PC-Client01
SkipDomainMembership=YES
JoinDomain=domaine.local
DomainAdmin=AdminMDT
DomainAdminPassword=Password123
SkipLocaleSelection=YES
KeyboardLocale=040C:0000040C
SkipBitLocker=YES
```

<!-- tabs:end -->

---

### 📌 5. Création d’une séquence de tâches

- Dans Deployment Workbench, clic droit sur **Task Sequences** ➡️ **New Task Sequence**.
- Sélectionne un modèle adapté (ex : Standard Client Task Sequence).
- Sélectionne l’image d’OS à déployer et configure les options demandées.
- Vérifie et édite la séquence pour affiner tes besoins spécifiques.

⚠️ Chaque séquence génère automatiquement les fichiers :
- `Unattend.xml`
- `ts.xml`

---

### 📌 6. Génération des images de démarrage (WinPE LiteTouch)

- Dans Deployment Workbench, clic droit sur ton **Deployment Share** ➡️ **Update Deployment Share**.
- Une fois générée, récupère l’image `LiteTouchPE_x64.wim` située dans le dossier `Boot` du partage.
        

---

### 📌 7. Intégration de l’image LiteTouch dans WDS

Sur ton serveur WDS :
1. Ouvre la console **WDS** ➡️ **Boot Images**.
2. Ajoute l'image `LiteTouchPE_x64.wim` créée par MDT :
    - Clic droit ➡️ **Add Boot Image**.
    - Sélectionne l’image MDT précédemment générée.

---

### 📌 8. Création et intégration des fichiers de réponse (Unattend.xml)

MDT génère automatiquement un fichier de réponse initial (`Unattend.xml`). Il est possible de l'éditer pour personnaliser davantage :
1. Dans MDT, éditer le fichier via **Properties** → **OS Info**.
2. Adapter selon les besoins spécifiques (automatisation complète).

⚠️ L’image dans WDS peut pointer directement vers ce fichier pour une installation sans assistance.

---

### 📌 9. Restriction de l’accès au partage de déploiement

Pour sécuriser le partage MDT 
- Restreindre l'accès au partage via les autorisations NTFS :
    - Créer un compte de service dédié (ex : `MDTService`).
    - Affecter des droits spécifiques à ce compte sur le dossier du partage.

⚠️ Modifier ensuite `Bootstrap.ini` pour refléter ce compte de service :

```ini
DeployRoot=\\ServeurMDT\DeploymentShare$
UserID=MDTService
UserDomain=domaine.local
UserPassword=SecurePassword123
```


---

### 📌 10. Intégration et déploiement des applications

- MDT permet d’installer automatiquement des applications :
    1. Clic droit **Applications** → **New Application**.
    2. Indiquer l’installeur et commande d'installation silencieuse.
    3. Ajouter ces applications dans la séquence de tâches correspondante.

---

### 📌 11. Activation du monitoring des déploiements

Pour suivre le déploiement en temps réel 
- Depuis Deployment Workbench :
    - Ouvrir **Properties** du Deployment Share → Onglet **Monitoring**.
    - Activer l’option.

---

### 📌 12. Déploiement effectif via PXE (réseau)

- Configurer les postes clients pour démarrer via le réseau (PXE boot).
- Le poste récupère automatiquement l’image WinPE LiteTouch depuis WDS.

---

### 📌 13. Analyse des problèmes et dépannage

En cas d’erreurs, consulter les journaux :
- Accéder à l’invite commande (`Shift + F10`) durant le déploiement pour ouvrir `notepad`.
- Vérifier les fichiers journaux :
```lua
X:\MININT\SMSOSD\OSDLOGS\BDD.log
C:\Windows\Panther\setuperr.log
C:\Windows\Panther\setupact.log
```

---

### 📌 14. Mise à jour régulière des modifications MDT vers WDS

Après chaque modification dans MDT :
- Générer une nouvelle image LiteTouch (clic droit → Update Deployment Share).
- Actualiser l’image correspondante dans WDS pour que les postes utilisent les dernières modifications.

---

### 📌 15. Scénarios complémentaires de déploiement

**Types courants :**
- **Nouvelle installation (Bare-Metal)** : Nouveau poste ou effacement complet.
- **Actualisation (Wipe-and-Load)** : Conservation données/applications existantes.
- **Remplacement (Replace)** : Migration vers nouveau poste.
- **Mise à niveau (In-Place Upgrade)** : Passage à une nouvelle build sans perte des données.

---

### 📌 16. Paramètres avancés supplémentaires (si nécessaire)

**Quelques paramètres utiles supplémentaires à connaître dans CustomSettings.ini :**
- Activation automatique Windows via serveur KMS :

```ini
SkipProductKey=YES
ProductKey=XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
```

- Configuration avancée locale :
    
```ini
SkipTimeZone=YES
TimeZoneName=Romance Standard Time
UserLocale=fr-FR
```

---

### 📌 Résumé synthétique des opérations dans l’ordre logique

```ini
Préparation prérequis (ADK, WinPE, MDT)
    ↓
Création Deployment Share
    ↓
Importation OS
    ↓
Fichiers configuration (Bootstrap.ini, CustomSettings.ini)
    ↓
Création Séquence de tâches
    ↓
Génération images WinPE (LiteTouchPE)
    ↓
Intégration WDS (Boot image WDS)
    ↓
Fichier réponse Unattend.xml (Automatisation avancée)
    ↓
Restriction accès partage MDT (Compte de service)
    ↓
Déploiement Applications (post-install)
    ↓
Monitoring des déploiements (console MDT)
    ↓
Déploiement effectif via PXE
    ↓
Analyse des problèmes (logs BDD.log, setupact.log)
    ↓
Mise à jour régulière MDT → WDS
```
