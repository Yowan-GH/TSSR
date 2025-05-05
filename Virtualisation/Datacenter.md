# La gestion du datacenter

## ⚙️ Gestion des ressources

- vSphere autorise de **surcharger** un hôte (plus de VMs que de ressources).
- Pour garantir que certaines VMs aient **toujours accès aux ressources**, on peut :
	- Réserver des ressources (CPU, RAM..)
	- Partager des ressources
	- Limiter des ressources via un plafond de consommation

## 🧩 Pools de ressources

Objets logiques affectés à un **groupe de VMs**, permettant :
- Réservation ou restriction de ressources (ex : environnement de test vs production)
- Application de règles à un **ensemble**, pas juste à une VM
- Hiérarchisation possible (pool dans un pool)


## 🖥️vCenter et le contexte datacenter

### Avantages d’utiliser vCenter :
- Création d’un **datacenter logique** contenant des hôtes. Possibilité de les regrouper en entité.
- Mutualisation des **objets réseau et stockage**
- Activation des fonctionnalités avancées : **vMotion** (déplacement à chaud), **HA**, **DRS**
- Centralisation de la gestion, via **vSphere Web Client**

### Types d’installations :

| Version                      | Limites                | Avantages                             | Installation                                                     |
| ---------------------------- | ---------------------- | ------------------------------------- | ---------------------------------------------------------------- |
| **vCenter Server (Windows)** | 1000 ESXi<br>10 000 VM | Meilleurs capacité de prise en charge | Sur une VM hébergée sur un hyperviseur autonome                  |
| **VCSA (Appliance)**         | 5 ESXi<br>50 VM        | Simple, rapide, conseillé             | Sur une VM ou une machine physique indépendante d'un hyperviseur |
### Accès :

|Port|Usage|
|---|---|
|`443`|Interface de gestion vSphere|
|`5480`|Interface admin du VCSA|
|`9443`|Interface embarquée (ancienne version)|
### En pratique 

1. Récupérer l'image iso de l'Appliance VCSA
2. Attendre la ``fin d'installation`` / ``entrer un mot de passe root`` et se ``connecter sur l'adresse IP et le port indiqué``
3. ``Configurer`` / ``vCenterServer Appliance`` / ``Entrer le nom de domaine (ou laisser par defaut)`` / ``Définir password admin`` / ``Terminer``
	🚨En cas d'erreur, il faudra redeployer toute la VM 
4. Se connecter à l'appliance avec : 
	1. ID : administrator@Nomdomaine
	2. Mot de passe défini 
5. Se connecter sur la même IP mais avec le port 443 pour l'administration
6. Créer un centre de donné : ``Clic droit ``sur nôtre VCSA / ``Nouveau centre de donné`` 
7. Ajouter les hôtes dans les Datacenter : ``Clic droit / Ajouter un hôte `` et ajouter les hyperviseur

## 📦Modèles de machines virtuelles

Un DATACENTER va pouvoir gérér des machines à partir de modèles pouvant être sous deux formats : 

<!-- tabs:start --> 
### **VMTX**

- **Critère :**  
    **Utilisé dans la suite VMware vSphere**, dans un environnement de datacenter.

- **Actions possibles :**  
    Clonage d’une VM vers un template, duplication, déploiement de nouvelles VMs depuis le template, personnalisation (nom, IP, SID…).


- **Contexte d’utilisation :**  
    Sert de base pour la mise en œuvre d’un système d’exploitation prêt à l’emploi, avec ses configurations, correctifs, et logiciels intégrés.

- Fonctions :
	- Cloner une VM en modèle
	- Déployer une VM depuis un modèle
	- **Conversion possible** entre VM ⇄ Template : 
		  VM -> config (VMtools, logiciel pro...) -> sysprep -> conversion)
	- Possibilité de personnalisation (IP, nom, SID...)

- Outils nécessaires :
	- **VMware Tools**
	- **Sysprep** (intégré à Windows ou fourni au vCenter)
### **OVF / OVA**

- **Critère :**  
    Prise en charge par** toutes les solutions VMware** (Player, Workstation, vSphere), ainsi que VirtualBox et XenServer.  

- **Actions possibles :**  
    Possibilité d’import et d’export de la machine virtuelle.  

- **Contexte d’utilisation :**  
    Utilisé pour toute mise à disposition d’une VM portable ou transférable, notamment lors de migrations ou de partages entre plateformes.
<!-- tabs:end --> 

## 🔐 Utilisateurs, rôles et privilèges

- Gestion possible au niveau :
    - de l’**ESXi seul**
    - ou du **vCenter** (centralisé)

Méthodologie : 
- Créer des users
- Créer des groupes et leurs affecter les users
- Créer des rôles, leurs affecter des privilèges
- Sélectionner l'objets d'inventaire sur lequel affecter les privilèges ; Lui associer groupe et rôle correspondant

 💡Conseils :
- Utiliser des **groupes** (pas des utilisateurs directs)
- Définir les privilèges **au niveau le plus haut** (héritage)
- Dupliquer les rôles pour ajuster les permissions

## 🚀Déplacement de machines virtuelles

| Fonction            | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| **vMotion**         | Déplacement **à chaud** d’une VM vers un autre hôte                |
| **Storage vMotion** | Déplacement **à chaud du disque** d’une VM vers un autre datastore |
Prérequis :
- **Fonction vMotion activée** sur les vSwitchs
- Hôtes dans le **même domaine de diffusion**
- **Stockage accessible** aux deux hôtes
- Port Group présent sur l’hôte de destination
- Aucun ISO ou snapshot bloquant

### 🛠️En pratique 

#### Déplacement de VM à chaud

1. Ajouter une carte réseau LAN segment sur les hyperviseur ou auront lieux les déplacement (Réseau dédié)
2. Redémarrer les ESXi
3. Construction du réseau vMotion : VSS pour chaque ESXi avec un VMkernel vMotion et adressé 
4. Se connecter au vCenter / Aller sur la VM à déplacer et ``supprimer le Lecteur CD`` (bug de transfert sinon)
5. Créer un VDS  : ``Clic droit ``datacenter / ``Nouveau Distributed Switch`` / ``Nombre de liaison`` (1 par ESXi mini) / ``Créer le GP associé `` 
6. Les deux éléments créés sont disponibles sur l'objet réseau (VDS et GP)
7. ``Ajouter les hôtes au groupe de port`` / Sélectionner les ``liaisons montantes`` / ``Selectionner les cartes réseaux disponibles `` / ``Migrate VM networking`` / ``Selectionner la VM et attribuer le GP``
8. Vérifier une banque de stockage ISCSI présente dans stockage et vérifier que le stockage de la VM est sur cette banque de donnée 
9. ``Clic droit`` sur la VM / ``Migrer`` / ``Sélectionner l'hyperviseur de destination`` / ``Valider``


