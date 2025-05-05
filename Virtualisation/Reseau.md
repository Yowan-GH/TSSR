# La gestion du réseau

## 🧊 Représentation graphique

<img src="Virtualisation/images/Reseau.jpg">

## 🧩 VLAN (Virtual LAN)

### 🧠Définition
- Un **VLAN** est un **réseau logique indépendant** créé au sein d’une même infrastructure physique.
- Permet de **segmenter le trafic**, **isoler** les équipements, **prioriser certains flux**.
### ✅Avantages
- Sécurité accrue
- Réduction du domaine de broadcast
- Meilleure gestion des flux et de la bande passante
### 🔧Prise en charge
- Gérée via les **switchs (802.1Q)** ou **les équipements terminaux** (OS, téléphones IP…).
- 3 niveaux d’affectation au niveau du modèle OSI :
    - **Niveau 1** (couche 2) : par port de switch
    - **Niveau 2** (couche 2) : par adresse MAC
    - **Niveau 3** (couche 3) : par adresse IP
### 🔄Trunking

- Permet à un port de transporter **plusieurs VLANs**.
	- Port en type Access : Pour communiquer avec un equipement terminal (Un VLAN)
	- Port en type Trunk : Liaison entre commutateur (Plusieurs VLAN)
- Utilisé pour les liaisons entre switchs ou entre switch et hôte ESXi.

<img src="Virtualisation/images/TRUNK.png">


## 🌐Les Switchs vSphere

<!-- tabs:start --> 
### **vSphere Standard Switch (VSS)**

- Crée **localement sur chaque hôte ESXi** (donc lié à un hyperviseur)
- Gère les connexions VM ↔ réseau, gestion ESXi…
- Relié à une ou plusieurs cartes physiques (**VMNICs**)

| Type      | Correspond à...                                              | Niveau          |
| :-------- | :----------------------------------------------------------- | :-------------- |
| **VMNIC** | Carte réseau **physique** sur le serveur ESXi                | Niveau **hôte** |
| **vNIC**  | Carte réseau **virtuelle** vue par la machine virtuelle (VM) | Niveau **VM**   |
#### En pratique 

Un VSS est créé par défaut avec l'ESXi. Il est trouvable dans l'onglet ``Mise en Réseau`` / ``Commutateur Virtuel".
- En cliquant sur ce switch, on trouve deux groupes de ports : 
	- VM Network : Ports Virtuels ou seront reliés nos VM
	- Management Network : Adresse IP permettant la configuration du switch VSS
	- Adaptateur Physique relié à l'ESXi

##### Ajouter des cartes réseaux

+ Arrêter l'ESXi
+ Ajouter la carte réseau (VM)
+ Onglet ``Mise en Réseau`` / ``Commutateur Virtuel`` / ``Ajouter un commutateur virtuel standard`` / ``Choisir et nommer la carte réseau à utiliser``
+ Il faut ensuite, pour que la carte réseau soit fonctionnelle, ajouter un groupement de port. 
	+ ``Groupes de ports`` / ``Ajouter un groupe de ports`` / ``Selectionner le switch et les ports``
		+ Ajoute des ports destinés aux VM
	+  ``NIC VMkernel`` / ``Ajouter un NIC VMKernel`` / ``Selectionner le switch et les ports``
		+ Lié à un service disponible via une IP configurable 
### **vSphere Distribué Switch (VDS)**

- Crée et géré depuis **vCenter** (donc dépendant de aucun hyperviseur mais lié à tous les hyperviseur)
- Utilisable sur **plusieurs hôtes simultanément**
- Nécessite la licence **Enterprise Plus**
- Permet migration sans coupure, cohérence réseau, tolérance à la panne..

#### En Pratique

Un VDS se gère directement sur le VCenter.

Pour le monitoring : 
- ``Logo de mise en réseaux`` - Possibilité de voir tous les groupements de ports de mes ESXi
	- `` Clic droit ``sur le datacenter / ``Distributed Switch`` / ``Nouveau``
	-  Compléter le nombre de carte réseau montante (mini 1X nombre d'ESXi)
		-  Cocher ``Créer un groupe de ports par défaut`` (pour relier des VM à ce VDS)
	- Ajouter les ESXi : ``Clic droit sur le VDS`` / ``Ajouter, gérer des hôtes``
		- Nouveaux hôtes
		- Sélectionner les ESXi et cliquer sur une carte réseau non utilisée
		- Attribuer la liaison montante 
		-  Attribuer des VMkernel si besoin
		-  Terminer la configuration

<!-- tabs:end --> 
## 🛠️ Groupements de ports (Port Groups)

|Type|Rôle|
|---|---|
|**VM Network**|Connecter les machines virtuelles au réseau|
|**VMkernel**|Pour les fonctions ESXi (vMotion, iSCSI, gestion, FT…)|
- Chaque **port group** peut être **lié à un VLAN**.
- Les machines reliées à des port groups **différents** sur un même vSwitch **ne peuvent pas communiquer** sans routage.

## 🔌Interfaces physiques et logiques

<!-- tabs:start --> 
### **VMNIC / pNIC**

- Carte réseau **physique** de l’hôte.
- Liée à un ou plusieurs vSwitch.
### **vNIC**

- Carte réseau **virtuelle** visible depuis la VM.
- Connectée à un port group du vSwitch.

<!-- tabs:end --> 

## 🔀 Teaming (regroupement de cartes réseau)

Permet de :
- Regrouper plusieurs carte physique (pNIC) en un seul objet logique (donc en un seul port sur le Vswitch) pour : 
	- **pNIC Actif / pNIC Passif** ➔ redondance (failover)
	- **pNIC Actif / pNIC Actif** ➔ Débit cumulé 
	- **pNIC Actif / pNIC Actif** ➔ répartition de charge :
		- Besteffort : Par défaut, le plus rapide
		- Par VM
		- Par MAC source
		- Par paquet (algorithme)
		
On peut également utiliser plusieurs VMNIC pour : 
	- La gestion des infrastructure et le déplacement des VM (Réseau séparé d'internet et dédié à l'administration)
	- Le Flux iSCSI : Stockage en réseau - Mode trunk entre l'hôte et la solution de stockage externe

## 🏗️ Affectation des VLANs en vSphere

Les VLANs peuvent être définis à plusieurs niveaux :
- Sur le **vSwitch**
- Sur les **groupements de ports**
- Sur les **vNICs**

> ⚠️ Si l’ESXi gère le VLAN, le **switch physique doit être en mode trunk**, avec tous les VLANs nécessaires autorisés.