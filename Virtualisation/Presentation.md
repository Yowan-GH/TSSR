
# 💻 📦 La virtualisation
## 📅 La virtualisation en 8 dates clés

|Date|Événement|
|:--|:--|
|**Années 60/70**|IBM expérimente la virtualisation sur **Mainframes** (test, puis production).|
|**Milieu des années 90**|Apparition des **émulateurs** en micro-informatique (ex : Atari, Amiga, consoles…).|
|**Début des années 2000**|**VMware** développe et démocratise la virtualisation logicielle sur x86.|
|**2006**|Les **CPU** prennent en charge nativement les **instructions de virtualisation** (Intel VT-x, AMD-V).|
|**2007**|**XenSource** est racheté par **Citrix**.|
|**2007**|**KVM** (Kernel-based Virtual Machine) est intégré au **noyau Linux**.|
|**2007**|VMware lance les **VDI** (Virtual Desktop Infrastructure).|
|**2009**|On compte **plus de serveurs virtuels que physiques** ; KVM est devenu un standard Linux.|
## 📚 Les cas d'utilisation de la virtualisation

| Cas d'utilisation                            | Objectif principal                                           | Bénéfices                                        |
| :------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------- |
| **Consolidation de serveurs**                | Mutualiser plusieurs serveurs sur une seule machine physique | Réduction des coûts, gain d'espace et d'énergie  |
| **Tests et développement**                   | Créer des environnements isolés et temporaires               | Rapidité, sécurité pour expérimenter sans risque |
| **Haute disponibilité / PRA**                | Assurer la continuité des services après panne               | Sauvegarde rapide, redémarrage facile            |
| **Virtualisation du poste de travail (VDI)** | Accéder à un bureau distant virtualisé                       | Gestion centralisée, mobilité utilisateur        |
| **Cloud computing**                          | Fournir des ressources IT dynamiques et évolutives           | Flexibilité, facturation à la consommation       |
## 💻 Le secteur de la virtualisation

<!-- tabs:start --> 
### **🛠️ Virtualisation classique**

- **Virtualisation d'environnements sur un poste de travail**
- **Virtualisation d'applications** (Virtual Desktop Infrastructure)
- **Virtualisation de serveurs** (PaaS)
- **Virtualisation de stations de travail**
### **🎯 Virtualisation spécialisée**

On retrouve aussi la virtualisation dans des domaines plus ciblés 
- **Le réseau** (SDN – Software Defined Network)
- **Le stockage** (SAN/NAS virtuels)
- **Les services** (cloud, microservices)

<!-- tabs:end --> 
## 🪟 Les Solutions

<!-- tabs:start --> 
### **Grands Editeurs**

| Éditeur / Projet | Description                                         | Poste de travail           | Serveur                       |
| :--------------- | :-------------------------------------------------- | :------------------------- | :---------------------------- |
| **VMware** 🟦    | Leader de la virtualisation professionnelle         | VMware Player, Workstation | vSphere (ESXi)                |
| **Microsoft** 🪟 | Solution intégrée dans Windows                      | Virtual PC, Hyper-V Client | Hyper-V<br>(Windows Serveur)  |
| **Oracle** 🔴    | Solution libre et multi-OS grand public             | VirtualBox                 | Oracle VM Server              |
| **Citrix** 🟠    | Spécialiste VDI et cloud d’entreprise               | —                          | XenServer (Citrix Hypervisor) |
| **Red Hat** 🎩   | Distribution Linux pro avec virtualisation intégrée | —                          | KVM via RHEL                  |
### **Open Source**

| Éditeur / Projet               | Description                                        | Poste de travail  | Serveur                |
| :----------------------------- | :------------------------------------------------- | :---------------- | :--------------------- |
| **GNU/Linux / Open source** 🐧 | Communauté du libre, solutions techniques avancées | QEMU              | KVM, Proxmox VE        |
### **Autres Solutions**

| Éditeur / Projet               | Description                                         | Poste de travail           | Serveur                       |
| :----------------------------- | :-------------------------------------------------- | :------------------------- | :---------------------------- |
| **Parallels** 🍎               | Solution macOS pour faire tourner Windows/Linux     | Parallels Desktop          | —                             |
| **Proxmox** ⚙️                 | Plateforme open-source de virtualisation complète   | —                          | Proxmox VE (KVM + LXC)        |
| **Docker** 🐳                  | Conteneurisation légère (apps, microservices)       | —                          | Docker Engine                 |
<!-- tabs:end --> 

## 🛠️ Les outils 

### 🧩 Composants principaux

|Outil|Rôle|
|---|---|
|**L’hyperviseur**|Cœur du système de virtualisation : il gère l'exécution des machines virtuelles.|
|**Console de gestion**|Interface centrale pour créer, modifier, surveiller et administrer les VM.|
|**Consoles d’accès aux VM**|Interfaces d'accès direct aux VM (affichage, clavier, souris).|
|**Composants complémentaires**|Pilotes, outils invités, agents, extensions réseau/stockage spécifiques.|
### 📐 Principes de base à connaître

- **Paramétrage matériel** : architecture, BIOS/UEFI, CPU, RAM, disque...
- **Gestion des médias** :
    - Support **ISO**, **USB**, **disquette** (ex : FLP, IMG).
        
- **Réseaux virtuels** :
    - Interne, NAT, pont (bridge), LAN dédié.
        
- **Formats de disque selon la solution** :
    - `VHD` (Microsoft), `VMDK` (VMware), `VDI` (VirtualBox).
        
- **Fichiers de configuration** :
    - Format spécifique : `XML`, `VMX`, `VBOX`...

## 🌐  Les hyperviseurs

- ### 🧠 Qu’est-ce qu’un hyperviseur ?

Un **hyperviseur** est un logiciel (ou firmware) qui permet d’**exécuter plusieurs machines virtuelles** (VM) sur un même hôte physique.
Il agit comme une **couche d’abstraction entre le matériel physique et les systèmes d’exploitation virtuels**.

- ### ⚙️ Les deux types d’hyperviseurs

| Type                    | Description                                                                                        | Exemples                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Type 1** (bare-metal) | Fonctionne **directement sur le matériel** sans OS hôte. Il a son propre OS. Très performant.      | VMware ESXi, Microsoft Hyper-V (core), Xen, KVM, Proxmox    |
| **Type 2** (hosted)     | S’exécute **au-dessus d’un OS hôte** comme une application. Moins performant mais plus accessible. | VirtualBox, VMware Workstation, Hyper-V (client), Parallels |
### 🧩Rôle de l’hyperviseur

- Allouer les ressources physiques (CPU, RAM, disque, réseau) aux VM.
- Isoler les VM les unes des autres.
- Permettre la gestion, le démarrage, la pause et l'arrêt des machines virtuelles.
- Gérer les snapshots, la migration (vMotion...), les disques virtuels, etc.

### 🔐 Sécurité & Isolation

- Chaque VM est **indépendante**, même si elles partagent le même hôte.
- L’hyperviseur assure l’**isolation** entre les systèmes.


## 📚 Virtualisation VS Paravirtualisation

| Aspect         | **Virtualisation** (complète)                     | **Paravirtualisation**                          |
| :------------- | :------------------------------------------------ | :---------------------------------------------- |
| Fonctionnement | Le système invité **ignore** qu’il est virtualisé | Le système invité **sait** qu’il est virtualisé |
| Hyperviseur    | Émule entièrement le matériel                     | Fournit une **interface logicielle optimisée**  |
| Performances   | Moins bonnes (plus d’abstraction)                 | Meilleures performances (moins d’overhead)      |
| Compatibilité  | Peut faire tourner des OS non modifiés            | Nécessite un OS **modifié** (pilotes spéciaux)  |
| Communication  | Passent par un **module de translation binaire**  | Utilisent directement des **Hypercalls**        |
| Exemples       | VMware ESXi, VirtualBox, Hyper-V                  | Xen (avec OS modifié), KVM avec VirtIO          |
 > En résumé :
 > 	- **Virtualisation** = le système invité **croit être sur un vrai matériel**.
 > 	- **Paravirtualisation** = le système invité **sait qu’il est dans une VM** et **collabore** avec l’hyperviseur via des appels optimisés.
 
 