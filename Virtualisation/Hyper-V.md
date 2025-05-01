# L'hyperviseur Hyper-V
## 🖥️ Prérequis à l’installation

#### ✅ Matériel :
- Processeur **64 bits compatible** :
    - **Intel VT-x** ou **AMD-V**
    - **SLAT** requis pour Hyper-V client
- RAM et espace disque suffisants
#### ✅ Logiciel :
- Windows Server 2008+ ou Windows 8 Pro/Entreprise 64 bits
- **Hyper-V est un rôle à ajouter** (serveur) ou une **fonctionnalité à activer** (client
> ⚠️ L’installation nécessite **2 redémarrages**.

## ⚙️Fonctionnalités principales d’Hyper-V

| Fonction                     | Détail                                    |
| :--------------------------- | :---------------------------------------- |
| Console VM indépendante      | Chaque VM a sa propre fenêtre de contrôle |
| Paramétrage matériel complet | RAM, CPU, BIOS, périphériques             |
| Snapshots                    | Capture de l’état d’une VM à un instant T |
| Export / import              | Clonage ou déplacement d’une VM           |
| Services d'intégration       | Meilleure compatibilité entre hôte et VM  |
## 🌐 Types de réseaux virtuels Hyper-V

| Type de réseau    | Description                       |
| ----------------- | --------------------------------- |
| **Privé**         | Communication entre VM uniquement |
| **Interne**       | VM ↔ VM + VM ↔ Hôte               |
| **Externe**       | VM sur le réseau physique         |
| **Externe dédié** | Carte réseau réservée à une VM    |
| **VLAN**          | Identification logique de réseaux |

## 🖥️ Console de gestion Hyper-V

- Deux volets :
    - **Console de gestion globale** : liste des serveurs + VMs
    - **Console par VM** : fenêtre indépendante pour chaque machine
        
- Permet 
    - Démarrage / arrêt
    - Modification des paramètres
    - Surveillance de l’état
## 🧰 Création et configuration d’une VM

- **Assistant de création** ➔ _Nouveau > Ordinateur virtuel_
- Définir :
    - **Emplacement de stockage**
    - **Paramètres matériels**
    - Type de génération (Gen1 / Gen2)
        - Gen1 ➔ disque d’amorçage IDE
        - Gen2 ➔ UEFI, disque SCSI

## 📦 Importation et exportation de VM

|Action|Remarques importantes|
|---|---|
|Export|Obligatoire pour cloner ou déplacer une VM|
|Import sans duplication|Empêche de réimporter la même VM plusieurs fois|
|Import avec duplication|Copie tous les fichiers, réutilisable plusieurs fois|

### ✅ Procédure recommandée :
1. Exporter dans un dossier dédié
2. Copier ce dossier ailleurs si besoin
3. Importer avec ou sans duplication selon le besoin

> ⚠️ Bien sélectionner **le dossier racine** contenant tous les fichiers (config + disques).