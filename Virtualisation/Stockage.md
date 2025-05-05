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

💡Il est conseillé, lors de l'utilisation de ce protocole;, d'augmenter la valeur MTU à 9000.

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

## 📦 vSphere et le stockage..

Dans une infrastructure **VMware vSphere**, le stockage repose sur deux éléments clés :

|Élément|Rôle|
|---|---|
|**Adaptateurs de stockage**|Permettent à l’hôte ESXi de **se connecter** à des supports de stockage locaux ou distants.|
|**Banques de données (datastores)**|Espace de stockage **logique et structuré** dans lequel les **VMs sont hébergées** (disques VMDK, ISO, snapshots…).|

---
### 📦Choix d’une solution de stockage

Ce choix dépend de plusieurs critères : 

| Critère                 | Question à se poser                                                |
| ----------------------- | ------------------------------------------------------------------ |
| **Dédié ou mutualisé**  | Le stockage est-il lié à un seul hôte ou partagé entre plusieurs ? |
| **Protocole d’accès**   | Quel protocole sera utilisé ? (iSCSI, NFS, FC…)                    |
| **Support physique**    | Disque local, NAS, SAN, baie…                                      |
| **Mode d’accès**        | Bloc ou fichier ?                                                  |
| **Système de fichiers** | VMFS, NFS, ou autre ?                                              |

<img src="Virtualisation/images/Solution_stockage.png" width="600">


### 📦Solution de stockage iSCSI
  

<img src="Virtualisation/images/iSCSI.png" width="600">

Cette illustration montre **comment un hôte ESXi accède à un espace de stockage distant**, via le protocole **iSCSI**, à travers un **réseau IP**. Elle contient : 
<!-- tabs:start -->
#### **🧱SAN – Storage Area Network**

- Un **réseau spécialisé dédié au stockage**.
- Dans ce cas, c’est un **SAN iSCSI**, donc utilisant **IP + iSCSI** pour transporter des commandes SCSI.
- Il permet à plusieurs hôtes d’accéder à un ou plusieurs **espaces disques centralisés**, sans passer par un partage de fichiers (comme NFS).
#### **📦LUN – Logical Unit Number**

- Un **volume logique** d’une baie de disques.
- Il s’agit d’un **disque ou d’un espace disque virtuel**, exposé par la baie (ou cible iSCSI) à l’hôte.
- Chaque LUN (ex : LUN0, LUN1) est vu par ESXi comme un **disque brut**, que l’on peut formater en VMFS.
#### **🔌HBA – Host Bus Adapter**

- C’est l’**adaptateur de stockage** du côté ESXi.
- Il existe deux types :
    - **HBA physique** : carte réseau ou fibre installée dans l’ESXi.
    - **HBA logiciel** : émulé dans ESXi, permet de faire de l’iSCSI **sans carte dédiée**.
- Le HBA permet de **communiquer avec la cible iSCSI**.
#### **🎯iSCSI Target**

- C’est le **serveur de stockage**, ou l’élément qui fournit le disque distant.
- Il expose un ou plusieurs **LUNs** via le protocole iSCSI.
- Il peut être :
    - Une **baie SAN**
    - Un **NAS iSCSI**
    - Un **serveur avec un service iSCSI activé**
#### **🚀iSCSI Initiator**

- C’est le **client iSCSI**, ici le **serveur ESXi**.
- Il initie une connexion vers la cible iSCSI pour accéder aux disques (LUNs).
- L’initiator s’appuie sur un HBA (logiciel ou physique) pour établir la communication.
<!-- tabs:end -->

#### 🔁 **Résumé**

1. ESXi utilise un **HBA (logiciel ou physique)**
2. L’**Initiator iSCSI** envoie une requête au **Target iSCSI**
3. Le **réseau IP** transporte les commandes iSCSI (encapsulées en TCP/IP)
4. Le **Target** fournit l’accès aux **LUNs**
5. L’ESXi voit les LUNs comme **disques** (stockage bloc)
6. Ils sont ensuite formatés (ex : en VMFS) pour accueillir des machines virtuelles

### 💾 Les Datastores

#### 🧱 Qu’est-ce qu’un **datastore** ?

> Un **datastore** est une **unité logique de stockage** dans vSphere.  
> Il représente un **espace disque formaté** (locale ou distant) que l’hyperviseur **ESXi** peut utiliser pour :

- stocker des **fichiers de VMs** (VMDK, VMX, logs…),
- monter des **images ISO**,
- héberger des **snapshots** ou **templates**.

#### 📂 Types de datastores

| Type                           | Description                                                                                                  | Mode d’accès      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------- |
| **VMFS** (vSphere File System) | Système de fichiers propriétaire VMware utilisé sur les volumes en mode bloc (disques locaux, SAN iSCSI, FC) | **Bloc**          |
| **NFS** (v3 / v4.1)            | Montage d’un partage réseau (NAS) sur ESXi, en mode fichier                                                  | **Fichier**       |
| **RDM** (Raw Device Mapping)   | LUN mappé directement à une VM, avec le VMFS                                                                 | **Bloc (direct)** |

#### 📦 VMFS – détails

| Version    | Max volume | Format | Particularités                                      |
| ---------- | ---------- | ------ | --------------------------------------------------- |
| **VMFS 3** | 64 To      | MBR    | Obsolète                                            |
| **VMFS 5** | 64 To      | GPT    | Alignement automatique, recommandé depuis vSphere 5 |
| **VMFS 6** | 64 To      | GPT    | Auto-defrag, support du 512e, gestion temps réel    |

✅ Le **formatage VMFS est requis sur les disques en mode bloc**.

### 🧊 Les disques de VM

<!-- tabs:start --> 
#### **📦Le format VMDK**

> Un disque de machine virtuelle dans vSphere est stocké dans un fichier au format **.vmdk**  
> (**Virtual Machine Disk Format**)

Fonctionnement : 
- Le disque est représenté par un fichier unique avec pour possibilité de le déplacer, copier ...

Limite : 
- Taille maximale de 2TO, au dela, il faudra utiliser le format RDM

**🧱 Types de provisionnement (provisioning) du VMDK**

| Mode     | Description                                                      | Avantages               | Inconvénients                |
| -------- | ---------------------------------------------------------------- | ----------------------- | ---------------------------- |
| **Thick  | L’espace est alloué et **zéro rempli** dès la création           | Meilleures performances | Long à créer, espace réservé |
| **Thin** | L’espace est alloué **à la demande**, selon la croissance réelle | Gain de place           | Risque de **sur-allocation** |

#### **📦 Le format RDM (Raw Device Mapping)**

Fonctionnement : 
-  Accès direct d’une VM à un **LUN SAN**, sans passer par un VMDK.

Utilité : 
- Accès à un disque SAN spécifique : Clustering Windows, réplication applicative
- Contournement du système de fichiers ESXi : Stockage de très hautes performances, grande capacité de stockage (>2TO)

<!-- tabs:end --> 

### 🛠️ En Pratique

Pour cette démonstration, les machines suivantes seront utilisées : 
- ESXi
- WS2019 avec fonction iSCSI

1. S'assurer que les machines sont sur le même réseau
2. Créer un vSwitch (VSS) sur l'ESXi
3. Créer un GP VMKernel relié à ce vSwitch et lui attribuer une adresse IP (dans le réseau réservé à l'échange de bloc de donnés) - @IP1
4. Tester depuis le WS2019 l'accès à @IP1
5. Il faut ensuite Créer les Target iSCSI sur le WS. Elles vont permettre aux hyperviseur de venir chercher les périphériques sur ce serveur
	1. ``File and storage Services``
	2. ``iSCSI``
	3. ``Install Target iSCSI``
		1. Sélectionner la fonctionnalité ``iSCSI target server ``
	4. ``Create iSCSI virtual disk``
		1. Définir l'emplacement 
		2. Le nommer
		3. Indiquer la taille et la laisser Dynamique 
		4. New target iSCSI
		5. Indiquer l'IP de l'ESXi
		6. Possibilité de rajouter une authentification si nécéssaire
		7. ``Create ``
		8. La target est disponible
6. Retourner sur les ESXi dans ``stockage`` / ``Adaptateur`` / ``iSCSI logiciel`` /`` Activer``
	1. Ajouter une liaison de port - Ajouter le GP correspondant
	2. Ajouter la cible dynamique - @IP du WS
7. ``Actualiser`` puis aller contrôler la découverte du disque dure dans ``Périphériques``
❗Ne pas tenir compte de l'état dégradé de ce disque.

8. Pour exploiter ce nouveau disque, nous allons ``créer une nouvelle banque de donnée``
	✅Le faite de créer cette banque de donnée reliée à un ESXi créera cette banque sur tous les ESXi sur le même réseau (et autorisé à y acceder)

9. Je peux ensuite déplacer ma VM de l'ESXi vers le SAN. Pour cela : 
	1. Eteindre la VM
	2. Aller dans le Datastore hebergeant la VM
	3. Cliquer sur Déplacer
	4. Sélectionner le nouveau DATAstore
10. La VM n'est donc plus dépendante de l'ESXi mais bien du SAN WS
