# Gestion du stockage

## 🧱 **Infrastructure de Sauvegarde**

#### 🔧 Composantes matérielles :
- **Supports de sauvegarde** (bandes, disques, cloud, etc.).
- **Lecteurs / robots de sauvegarde** : pour automatiser la lecture/écriture sur support.
    
#### 💻 Composantes logicielles :
- **Logiciel de sauvegarde** : gère la stratégie, les jeux de sauvegarde, la restauration.
- **Ordonnanceur** : déclenche automatiquement les tâches aux horaires définis.

## 📌 **Critères de Choix des Supports**

- **Capacité de stockage**
- **Fiabilité** (taux d'erreurs, durée de vie)
- **Temps d’accès** (lecture/écriture)
- **Consommation énergétique**
- **Sécurité des données

<!-- tabs:start --> 

#### **💽 Comparatif des supports**
 
| Support                | Atouts                            | Limites                                        |
| ---------------------- | --------------------------------- | ---------------------------------------------- |
| CD/DVD                 | Peu coûteux, portable             | Faible capacité, durée de vie limitée          |
| Blu-Ray                | Plus grande capacité              | Idem, peu utilisé aujourd'hui                  |
| Disque dur HDD         | Abordable, simple à utiliser      | Fragile (chocs)                                |
| Disque SSD             | Résistant, rapide                 | Plus cher                                      |
| Clé USB                | Compact, résistante               | Capacité limitée                               |
| Carte mémoire          | Idem clé USB                      | Peu adaptée au stockage long terme             |
| **Bandes magnétiques** | Longue durée de vie, grand volume | Manipulation délicate                          |
| Technologie RDX        | Facile à utiliser                 | Fragilité, erreurs possibles                   |
| NAS                    | Facile à configurer, RAID intégré | Encombrement réseau                            |
| SAN                    | Sécurisé, haute performance       | Complexe et coûteux                            |
| **Cloud**              | Accessible partout, sécurisé      | Vitesse dépend de la connexion, coût récurrent |
#### **🎞️ Les bandes magnétiques**

🧠 **Définition**
> Support historique de stockage de données depuis les années 1950, encore utilisé aujourd’hui pour la **sauvegarde à long terme** dans les datacenters.

🧲 **Fonctionnement**
- Stockage **séquentiel** des données.
- Lecture/écriture linéaire.
- Nécessite un **lecteur de bande** (Drive).
- Automatisation possible avec **robots de sauvegarde** (autoloaders, libraries).

📦 **Avantages**
- 📁 **Grande capacité de stockage**
- 🕒 **Longue durée de vie** (jusqu’à 30 ans si bien stockées).
- 💰 **Coût au Go très bas** pour l’archivage.
- 🔁 **Facilement automatisable** avec des systèmes robotisés.

🛠️ **Technologies associées**
- **DLT (Digital Linear Tape)** : ancien format, remplacé par LTO.
- **SDLT (Super DLT)** : amélioration du DLT.
- **LTO (Linear Tape Open)** : **standard ouvert**, le plus utilisé aujourd'hui.

📊 **Types et Générations de Bandes**

| 📎 Format           | 📥 Capacité native | 📤 Capacité compressée |
| ------------------- | ------------------ | ---------------------- |
| **DDS-3 (DAT)**     | 12 Go              | 24 Go                  |
| **DDS-4 (DAT)**     | 20 Go              | 40 Go                  |
| **DAT 160**         | 80 Go              | 160 Go                 |
| **DLT VS1**         | 80 Go              | 160 Go                 |
| **SDLT 1**          | 160 Go             | 320 Go                 |
| **SDLT 2**          | 300 Go             | 600 Go                 |
| **SDLT 3 / DLT-S4** | 800 Go             | 1,6 To                 |
| **LTO-5**           | 1,5 To             | 3 To                   |
| **LTO-6**           | 2,5 To             | 6,25 To                |
| **LTO-7**           | 6 To               | 15 To                  |
| **LTO-8**           | 12 To              | 30 To                  |
| **LTO-9**           | 18 To              | 45 To                  |
| **LTO-10 à 12**     | Jusqu'à 192 To     | Jusqu’à 480 To         |
<!-- tabs:end --> 


## 🎛️ **Solutions de Stockage**

<!-- tabs:start --> 
#### **🔌DAS (Direct Attached Storage)**

- Périphérique connecté directement à un serveur/station.
- Souvent utilisé pour **les bandes** ou disques USB.
- Solution simple mais non mutualisable.

#### **🖧 NAS (Network Attached Storage)**

- Appareil en réseau gérant son **propre système de fichiers**.
- Protocoles : CIFS/SMB (Windows), NFS/SAMBA (Unix/Linux).
- Facile à partager entre utilisateurs.    

<img src="Backup/images/NAS.png" width="400">
#### **🌐 SAN (Storage Area Network)**

- Réseau dédié entre serveurs et disques.
- Le serveur **gère le système de fichiers**.
- Connexion rapide (Fibre Channel, iSCSI).
- Très performant, mais complexe à déployer.

<img src="Backup/images/SAN.png" width="400">

#### **NAS vs SAN**

|Critère|NAS (Network Attached Storage)|SAN (Storage Area Network)|
|---|---|---|
|🎯 **Fonction principale**|Partage de fichiers|Stockage de blocs bruts|
|📡 **Connexion**|Réseau Ethernet (TCP/IP)|Fibre Channel / iSCSI / FCoE|
|📁 **Niveau d’accès**|Fichiers (niveau OS)|Blocs (niveau bas)|
|⚙️ **Système de fichiers**|Géré par le NAS lui-même|Géré par le serveur|
|📂 **Protocole**|SMB/CIFS (Windows), NFS (Unix/Linux)|SCSI, iSCSI, Fibre Channel|
|🧩 **Interopérabilité**|Facile (multi-OS)|Parfois limité|
|💰 **Coût**|Moins cher, plus simple|Plus cher, complexe à gérer|
|🔄 **Utilisation typique**|Petites/moyennes entreprises|Datacenters, environnements critiques|
<!-- tabs:end --> 

## 📍 **Local vs Distant (Externalisé)**

#### 📁 **Sauvegarde locale** :
- Données restent **sur site** (bande, disque réseau…).
- Moins coûteux mais vulnérable (incendie, vol).
    
#### ☁️ **Sauvegarde distante / Cloud** 
- Données **hors site**, accessibles à distance.
- Nécessite une connexion sécurisée.
- Avantage : protection contre les sinistres physiques.



