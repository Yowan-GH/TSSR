# La gestion du stockage 

- L’infrastructure dépend de **services** eux-mêmes dépendants des **données**.
## 🧱 Concepts fondamentaux

### 📚 Les 3 facteurs de l'accès aux données en environnement virtualisé

<!-- tabs:start --> 
#### **🔌La connectique physique**

📌 Définition :
> C’est la **manière matérielle** dont le stockage est **physiquement relié** à l’hôte (ESXi ou autre).

🔹 Exemples :

|Type|Description|
|---|---|
|**SATA / SAS / SSD**|Disques connectés directement à l’hôte (stockage local)|
|**USB / NVMe**|Connexions ponctuelles ou haute performance (local)|
|**Ethernet (RJ45)**|Connexion réseau pour NAS / iSCSI (mutualisé)|
|**Fibre Channel (SFP, LC)**|Connexion fibre optique haut débit (SAN, datacenter)|

#### **🌐Le protocole utilisé**

📌 Définition :
> C’est la **langue de communication** entre l’hôte et le stockage pour échanger les données.
> Il est le lien entre l'OS et le périphérique de stockage - Dépendant de la couche de liaison.

🔹 Quelques protocoles 

<!-- tabs:start --> 

##### **🧱 Protocoles de type bloc**

> Les données sont vues comme des **blocs bruts** (comme un disque local).  
> Nécessitent un formatage par l’hôte (ex : VMFS, NTFS…).

<!-- tabs:start --> 

###### **SCSI**

- Small Computer System Interface
- **Type** : Bloc
- **Connexion** : Interne ou externe (historiquement en câble parallèle)
- **Spécificité** : Ajout d'un contrôleur SCSI (Carte qui pilote les échanges entre l’hôte et les périphériques SCSI) afin de fluidifier les échanges entre l'OS et le stockage dans la couche transport du modèle OSI (sous forme de commande, dans un canal spécifique). 
- **Utilisation** : Disques durs internes, serveurs anciens
- **Fonctionnement** : 
```java
Application (OS invité)
   ↓
Système de fichiers (ex : NTFS / VMFS)
   ↓
Contrôleur SCSI (virtuel ou physique)
   ↓
Bus SCSI (local)
   ↓
Disque dur / périphérique de stockage
```

>- Le système d’exploitation envoie des **commandes SCSI** au contrôleur.
>- Les données sont transférées en **mode bloc**, directement via un **bus local** (physique ou virtuel).
>- **Le stockage est directement connecté** à l’hôte (local ou via carte SAS/Fibre Channel).
>- Utilisé pour le **stockage interne ou en SAN via Fibre Channel**.

###### **iSCSI**

- Internet SCSI
- **Type** : Bloc
- **Connexion** : **Via réseau IP (Ethernet)**
- - **Avantages** :
    - Facile à déployer (réseau classique)
    - Très utilisé dans les environnements vSphere pour **datastores partagés**
        
- **Composants** :
    - **Initiator** : le client (ESXi)
    - **Target** : le serveur (baie SAN)
- **Fonctionnement :**
```java
Application (VM / OS invité)
   ↓
Système de fichiers
   ↓
Initiateur iSCSI (logiciel ou matériel)
   ↓
Réseau IP (Ethernet)
   ↓
Cible iSCSI (baie SAN, NAS iSCSI)
   ↓
Stockage distant (LUN)
```
    
>- Le protocole **iSCSI encapsule les commandes SCSI dans du TCP/IP**.
>- Le **réseau Ethernet** (RJ45) remplace le bus SCSI ➔ c’est donc un **SAN sur IP**.
>- Le disque apparaît comme **local pour l’hôte**, mais est en fait hébergé **à distance**.
>- iSCSI est très utilisé dans les environnements **vSphere, Hyper-V ou Proxmox** pour **mutualiser le stockage**.


###### **SAS**

-  Serial Attached SCSI
- **Type** : Bloc
- **Connexion** : Interne (ou externe via boîtier SAS)
- **Utilisation** : Stockage **local professionnel** ou **baie directe**
- **Avantages** : Rapide, fiable, prise en charge du multipathing
- **Fréquence** : Très courant dans les serveurs physiques


###### **Fibre Channel**

- **Type** : Bloc
- **Connexion** : Via fibre optique (connectique SFP+ ou LC)
- **Utilisation** : SAN **haut de gamme** dans les datacenters
- **Avantages** : Très faible latence, bande passante élevée (8–32 Gb/s)
- **Limites** : Nécessite un réseau dédié + équipement coûteux (HBA, switch FC)

###### **FCoE**

-  Fibre Channel over Ethernet
- **Type** : Bloc
- **Connexion** : Via Ethernet (10 Gb/s mini)
- **Utilisation** : Alternative à FC, mais sur réseau convergé
- **Avantages** :
    - Moins de câbles
    - Mutualisation du réseau
    
- **Limites** : Plus complexe à configurer, moins utilisé aujourd’hui
<!-- tabs:end --> 

##### **📁 Protocoles de type fichier**

<!-- tabs:start --> 
###### **NFS**
- Network File System
- **Type** : Fichier
- **Connexion** : IP (TCP/UDP)
- **Utilisation** : **NAS** pour datastores partagés dans vSphere
- **Avantages** :
    - Simplicité de configuration
    - Accès multi-hôtes facile
    
- **Limites** :
    - Moins performant que les protocoles bloc
    - Moins de granularité de gestion

###### **CIFS / SMB**
- Common Internet File System / Server Message Block
- **Type** : Fichier
- **Connexion** : IP
- **Utilisation** : Partages de fichiers Windows (stockage secondaire, ISO, backups…)
- **Remarques** :
    - Peu utilisé pour **les datastores principaux**
    - Pas pris en charge comme datastore VMFS sous vSphere
<!-- tabs:end -->
<!-- tabs:end --> 

##### 🧠 Comparatif express

| Protocole         | Type    | Usage typique          | Support VMware ESXi                 |
| ----------------- | ------- | ---------------------- | ----------------------------------- |
| **SAS**           | Bloc    | Stockage local         | ✅                                   |
| **SCSI**          | Bloc    | Stockage ancien/local  | ✅                                   |
| **iSCSI**         | Bloc    | SAN IP                 | ✅                                   |
| **Fibre Channel** | Bloc    | SAN optique            | ✅                                   |
| **FCoE**          | Bloc    | SAN convergé           | ✅                                   |
| **NFS**           | Fichier | NAS / stockage partagé | ✅                                   |
| **CIFS/SMB**      | Fichier | Partage de fichiers    | ⚠️ limité (pas datastore principal) |
#### **📦Le mode d'accès**

📌 Définition :
> C’est la manière dont les données sont **présentées à l’hyperviseur** ou au système d’exploitation.

<!-- tabs:start --> 
##### **Bloc**
Le stockage bloc divise les données en blocs de taille fixe et les stocke séparément avec un identifiant unique. Le système d'exploitation gère ensuite l'organisation de ces blocs.
En **stockage bloc**, le serveur (ou le PC) peut accéder à **plusieurs blocs en parallèle**

> Offre **de hautes performances** et une **grande flexibilité**.  
> Utilisé souvent avec des bases de données ou des machines virtuelles.  

##### **Fichiers**
Le stockage fichier conserve les données sous forme de fichiers organisés dans une arborescence (dossiers/sous-dossiers), accessibles via un protocole réseau.

> Plus simple à utiliser, car structuré comme un dossier sur un ordinateur.  
> Idéal pour le partage de documents ou de médias entre utilisateurs.

<!-- tabs:end --> 
<!-- tabs:end --> 
### 📦 Les 3 types de stockage (en virtualisation)

<!-- tabs:start --> 
#### **Local (hôte)**

📌 Définition :
Le stockage est directement connecté **au serveur physique (hôte ESXi)**, via des disques internes (SATA, SSD, NVMe...).

🔹Caractéristiques :
- Accessible **uniquement par l’hôte local**.
- **Aucune mutualisation
- possible** entre plusieurs serveurs.
- Performant mais **non partagé**.
- Accès en mode bloc.

✅ Avantages :
- Simple à mettre en place
- Coût faible
- Bonne performance locale

❌ Inconvénients :
- Pas de redondance ni de migration possible (pas de vMotion)
- Pas adapté à la haute disponibilité

#### **Mutualisé (réseau partagé)**

 📌 Définition :
Le stockage est **partagé entre plusieurs hôtes** via le réseau (NAS ou SAN).

🔹 Caractéristiques :
- Chaque hôte accède au **même espace de stockage** (datastore).
- Utilisé pour **les fonctions avancées** comme **HA**, **vMotion**, **DRS**.

✅ Avantages :
- Mutualisation des ressources
- Migration de VMs possible entre hôtes
- Compatible avec les fonctionnalités avancées de vSphere

❌ Inconvénients :
- Plus complexe à configurer
- Coût supérieur
- Dépend du réseau

<!-- tabs:start --> 
##### **💽 SAN**

- SAN (Storage Area Network)
- **Définition** : Réseau dédié au stockage qui fournit des disques virtuels aux serveurs. 
	- **✅ SAN = Disques partagés + Serveur externe pour la gestion**
- **Type d'accès** : Basé sur les **blocs** (block-level).
- **Protocole** : **iSCSI**, **Fibre Channel**, **FCoE**.
- **Avantages** :
    - Très haute performance.
    - Faible latence, idéal pour serveurs critiques.
    - Bonne scalabilité.
        
- **Inconvénients** :
    - Coûteux.
    - Complexe à déployer et maintenir.
        
- **Exemple d'utilisation** : Stockage pour bases de données, environnements virtualisés (VMware, Hyper-V).

##### **📦 NAS**

- NAS (Network Attached Storage)
- **Définition** : Système de stockage connecté au réseau permettant de partager des fichiers. 
	- ✅ **NAS = Serveur + Disque + Gestion intégrée**
- **Type d'accès** : Basé sur les **fichiers** (file-level).
- **Protocole** : **SMB/CIFS**, **NFS**, **AFP**.
- **Avantages** :
    - Facile à installer et gérer.
    - Coût faible.
    - Accessible via réseau local.
        
- **Inconvénients** :
    - Moins performant.
    - Dépendant du trafic réseau.
        
- **Exemple d'utilisation** : Sauvegarde de fichiers, partage de documents dans une PME.

<!-- tabs:end --> 
#### **Centralisé (SAN/NAS)**

📌 Définition :
Le stockage est **entièrement dissocié des hôtes** et centralisé dans un système unique (baie SAN/NAS ou cluster de stockage).

🔹 Caractéristiques :
- Accès via réseau à un système **dédié** et **répliqué**.
- Hautement disponible, souvent avec **sauvegarde, redondance**, **RAID**, etc.
- Typiquement utilisé dans les **datacenters**.

✅ Avantages :
- Très haute fiabilité
- Centralisation de l'administration
- Réplication possible entre sites (DR, PRA)

❌ Inconvénients :
- Coût élevé
- Déploiement technique complexe
<!-- tabs:end --> 

## vSphere et le stockage..

