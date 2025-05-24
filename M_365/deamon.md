# Services complémentaires

## 🧰 Déploiement du pack Office

### 📦 Produits inclus :

- Office 365 ProPlus (désormais **Microsoft 365 Apps for Enterprise**)
- Word, Excel, PowerPoint, Outlook (Web et desktop)
- SharePoint Designer, Visio, Project, apps mobiles

### ✨ Fonctionnalités :

- Co-authoring (coédition en temps réel)
- Intégration OneDrive et Teams
- Support multiplateforme
- Priorisation des mails dans Outlook
### 🔄 Mises à jour (3 canaux) :

| Canal                   | Fréquence         | Usage typique             |
| ----------------------- | ----------------- | ------------------------- |
| Canal mensuel           | Tous les mois     | Nouvelles fonctionnalités |
| Canal semi-annuel       | Janvier / Juillet | Stabilité en entreprise   |
| Canal semi-annuel ciblé | Mars / Septembre  | Test pilotes              |
### 🖥️ Installation de Microsoft 365 Apps

#### 🔹 Gestion par utilisateur
- Depuis **Paramètres > Services et compléments**
- Ou depuis le portail Microsoft 365
    

#### 🔹 Installation locale via ODT (Office Deployment Tool)
1. Télécharger `setup.exe` : [https://config.office.com](https://config.office.com)
2. Créer un partage réseau `\\SM01\office_365`
3. Générer un `Configuration.xml`
4. Exécuter :
```
.\setup.exe /download \\SM01\office_365\Configuration.xml   
.\setup.exe /configure \\SM01\office_365\Configuration.xml
```

#### 🔹 Déploiement par GPO (stratégie de groupe)
- Créer une **OU dédiée**
- Créer une **GPO avec script CMD** dans Ordinateur / `Startup Scripts`
	- Script CMD : lance le ``.\setup.exe /configure \\SM01\office_365\Configuration.xml``
- Utiliser `gpupdate /force` après redémarrage

## ☁️ Administration OneDrive

### 🔒 Fonctions principales :
- Gestion du **partage**
- **Sécurisation des liens externes**
- **Définition des plages IP** ou des appareils autorisés à se synchroniser 
- Suivi de la **synchronisation client**
- Support de la **synchronisation différentielle**

## 📂Administration SharePoint

### 🎯 Usages principaux :
- Bibliothèques de documents
- Listes internes
- Création de sites intranet
- **Socle de Teams**

### 🔐 Points clés :
- Gestion fine des **permissions**
- Attention aux **fichiers métiers lourds** (Photoshop, AutoCAD...)
- Maîtrise des **droits de création de sites**

### 🔁 Synchronisation & sécurité :
- Limiter la synchronisation massive d’une bibliothèque
- **Préférer la simplicité** dans la gestion des accès

### 📊 Limites SharePoint selon licence :

|Élément|Business / Premium|E3 / E5|
|---|---|---|
|Stockage global|1 To + 10 Go/licence|Idem|
|Stockage par site|25 To|25 To|
|Collections de sites|2 millions|2 millions|
|Utilisateurs max|300|500 000|
## 💬Administration Teams

### 🚀 Adoption massive :
- Outil incontournable de **collaboration**
- +115 millions d’utilisateurs actifs/jour

### 🧩 Fonctionnalités majeures :
- Création d’équipes et de canaux
- Réunions en un clic
- Partage de fichiers / notes / tâches

### ⚠️ Risques :
- **Multiplication des équipes non maîtrisées**
- **Fuites de données** via partage externe
- **Surcharge de création** = perte de contrôle

### 🛡️ Bonnes pratiques d’administration Teams

|Action|Objectif|
|---|---|
|Créer un **groupe autorisé** à créer des équipes|Éviter les dérives|
|Script PowerShell pour restreindre|Sécurité + gouvernance|
|Paramétrer la **confidentialité** des équipes|Public / privé|
|Gérer les **applications tierces** (Dropbox, Google Drive…)|Limiter les risques|
### 🛠️ Gestion des réunions
- Stratégies par **groupe d’utilisateurs**
- Contrôle :
    - Caméra / micro
    - Partage d’écran
    - Accès invité
    - Enregistrement