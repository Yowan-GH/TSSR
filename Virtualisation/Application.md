# Les Applications de virtualisation

## 🛠️ Installation & Prérequis

- **Logiciel** : VMware Workstation 16 (préférer la dernière version, attention aux incompatibilités).
- **Matériel requis** :
    - Processeur avec **VT-x (Intel)** ou **AMD-V** 🚨 
    - RAM et **espace disque** suffisants.
- Utiliser les **paramètres par défaut** lors de l'installation.

🚨 Attention, certaines options sont à activer dans le bios en fonction des constructeurs (si disponible) : 
	- Intel : VT-x et VT-d
	- AMD : SVM Mode et IOMMU
	- Sur une VM dans Processors

## La gestion des VM - VM Workstation
### 🖥️ Console de gestion

- Affiche la **liste des VMs** (Library) et permet : 
    - La **création** ou l’**import** d’une VM.
    - Le **démarrage**, **l’arrêt**, ou la **configuration**.
    - L’**accès aux paramètres matériels** et aux **fichiers ISO**, disques, USB, etc.
    
### ⚙️ Étapes de création d'une VM

1. Choix de l’option : _“I will install the OS later”_.
2. Sélection de l’**OS invité** et de son **architecture**.
3. Nom de la VM + emplacement du dossier.
4. Choix de la **taille du disque virtuel** et du **mode de stockage** -     
	- ✅ Recommandé : _"Store virtual disk in a single file"_.
5. Personnalisation matérielle (_Customize Hardware_) :
    - CPU, RAM, lecteur ISO, réseau, périphériques.

📌 Pour reprendre la main, utiliser le combinaison de touche ``Ctlr`` + ``Alt``

### 🌐 Réseaux virtuels VMware

| Mode            | Description                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Bridged**     | Connecté au réseau physique (comme une vraie machine)<br>- VM exposée et peut présenter des risques de sécurité. |
| **NAT**         | Accès Internet via l’hôte (VMnet8)<br>- VM non exposée et donc sécurisée                                         |
| **Host-only**   | Réseau privé entre hôte et VM (VMnet1)                                                                           |
| **LAN segment** | Réseau isolé entre VMs déclarées                                                                                 |

✅ Services associés : **VMware DHCP** pour adresser mes VM en NAT.   
✅ Les cartes réseaux peuvent être modifiées / mappée dans **edit / Virtual network editor**  
✅ Power / Power on to firmware permet de booter sur le bios directement.  

### ⚠️ Problèmes fréquents & solutions

| Problème                  | Cause probable / Solution                        |
| ------------------------- | ------------------------------------------------ |
| Réseau aléatoire          | Désactiver/réactiver les cartes réseau physiques |
| Espace disque hôte saturé | Vérifier l’emplacement et déplacer la VM         |
| Disque invité saturé      | Ajouter un disque ou redimensionner              |
