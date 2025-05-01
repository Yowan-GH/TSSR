# La virtualisation de server

## Le choix du serveur 

<!-- tabs:start --> 

### **🖥️ Serveur Tour (Tower Server)**

<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">

  <div style="flex: 1; min-width: 300px;">
    <ul>
      <li><strong>Description :</strong><br>
        - Format vertical, encombrant.<br>
        - Composants accessibles facilement.
      </li>
      <li><strong>Avantages :</strong><br>
        - Coût faible.<br>
        - Évolutif facilement.<br>
        - Faible nuisance sonore.
      </li>
      <li><strong>Inconvénients :</strong><br>
        - Prend beaucoup de place.<br>
        - Peu adapté aux grands volumes.
      </li>
      <li><strong>Cas d’usage :</strong><br>
        - Petites structures.<br>
        - Environnements de test ou dev.
      </li>
    </ul>
  </div>

  <div style="flex: 0 0 auto; padding-top: 0.3rem;">
    <img src="Virtualisation/images/S_tour.png" alt="Serveur tour" width="300" style="display: block;">
  </div>

</div>


### **📦Serveur Rack (Rack Server)**

<div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">

  <div style="flex: 1; min-width: 300px;">
    <ul>
      <li><strong>Description :</strong><br>
        - Format horizontal standardisé (1U, 2U...).<br>
        - Installation dans une baie 19 pouces.
      </li>
      <li><strong>Avantages :</strong><br>
        - Gain de place vertical.<br>
        - Bonne densité de serveurs.<br>
        - Gestion simplifiée via baie.
      </li>
      <li><strong>Inconvénients :</strong><br>
        - Moins évolutif qu’un tour.<br>
        - Bruyant.<br>
        - Nécessite baie spécifique.
      </li>
      <li><strong>Cas d’usage :</strong><br>
        - PME/ETI.<br>
        - Datacenter moyen/grand.
      </li>
    </ul>
  </div>

  <div style="flex: 0 0 auto; padding-top: 0.3rem;">
    <img src="Virtualisation/images/S_Rack.png" alt="Serveur rack" width="300" style="display: block;">
  </div>

</div>

### **🛠️ Châssis + Serveurs Lames (Blade Servers)**

<div style="display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">

  <div style="flex: 1; min-width: 300px;">
    <ul>
      <li><strong>Description :</strong><br>
        - Un châssis unique contenant plusieurs lames.<br>
        - Ressources centralisées (alim, réseau...).
      </li>
      <li><strong>Avantages :</strong><br>
        - Densité maximale.<br>
        - Gestion centralisée.<br>
        - Optimisation de l'espace et de la consommation.
      </li>
      <li><strong>Inconvénients :</strong><br>
        - Coût élevé.<br>
        - Complexité d’admin.<br>
        - Dépendance au fabricant.
      </li>
      <li><strong>Cas d’usage :</strong><br>
        - Grands datacenters.<br>
        - Cloud privé.<br>
        - Très forte densité de virtualisation.
      </li>
    </ul>
  </div>

  <div style="flex: 0 0 auto;">
    <img src="Virtualisation/images/S_Lame.png" alt="Châssis lame" width="400" style="display: block;">
  </div>

</div>

<!-- tabs:end --> 

## 🔥 Processeurs & support matériel

- La virtualisation matérielle est optimisée grâce à des technologies embarquées :

| Fabricant | Technologies                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------- |
| Intel     | **VT-x** (Virtualization Technology) + **EPT** (Extended Page Tables)                             |
| AMD       | **AMD-V** (AMD Virtualization) + **NPT/RVI** (Nested Page Tables / Rapid Virtualization Indexing) |

✅ **SLAT** (Second Level Address Translation) est essentiel pour la performance sur hyperviseurs modernes. Elle évite un double adressage de la RAM (et donc évite la double consommation). 

## 🛠️Composants d'une infrastructure de virtualisation

| Niveau                            | Rôle détaillé                                                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Utilisateur (User)**            | Utilise une interface (GUI ou CLI) pour interagir avec l’infrastructure de virtualisation.                                                                         |
| **Virtual Machine Manager (VMM)** | Interface graphique ou en ligne de commande utilisée par l'utilisateur pour **gérer les hyperviseurs et VMs** (ex: vSphere Client, Virt-Manager, Hyper-V Manager). |
| **Hyperviseur**                   | **Logiciel** qui se charge de **créer**, **faire fonctionner** et **allouer des ressources** aux VMs. (ex: KVM, ESXi, Hyper-V, VirtualBox).                        |
| **Machines Virtuelles (VMs)**     | **Ordinateurs simulés** (systèmes invités) qui tournent sur l’hyperviseur avec leur propre OS et applications.                                                     |
```bash
                          👤 Utilisateur/machine hôte
                                        ↓
                         🖥️ Virtual Machine Manager (VMM)
                                        ↓
                                ⚙️ Hyperviseur
                                        ↓
            _______________________________________________________
            ↓                           ↓                         ↓
          🖥️ VM                       🖥️ VM                     🖥️ VM

```


## 🏢 Gestion centralisée de la virtualisation

- Pour gérer **plusieurs hôtes et VMs** :

| Outil                                             | Plateforme             |
| ------------------------------------------------- | ---------------------- |
| **vCenter**                                       | VMware                 |
| **SCVMM (System Center Virtual Machine Manager)** | Microsoft Hyper-V      |
| **Proxmox VE Web UI**                             | Proxmox                |
| **oVirt / RHEV**                                  | Red Hat Virtualization |

**Gestion centralisée** ➔ fonctionnalités avancées :
- Déplacement de VMs à chaud (vMotion / Live Migration).
- Réplication de VMs.
- Sauvegarde/restauration.
- Planification automatique des ressources.

## ⚙️Installation d'un Hyperviseur (ESXi)

### 📋 Prérequis matériels

- Processeur 64 bits compatible VT-x/AMD-V - (2 core, 2 processors)
- 8 Go de RAM minimum
- Disque dur > 40 Go - Single file
- Clé USB ou ISO pour l’installation
- Accès à l’interface de gestion via un autre poste (navigateur)

### 🧰 Matériel nécessaire
- 💿 ISO ESXi (téléchargeable sur [vmware.com](https://www.vmware.com/))
- 🖥️ Machine physique ou virtuelle (VM) pour l’hyperviseur
- 🧩 Optionnel : VMware Workstation/VirtualBox pour tests locaux

### 🛠️ Étapes d’installation

1. **Installation de la VM (VMware ESX) (Installation simple)**
2. **Démarrage depuis le support d’installation (clé USB ou ISO)**
    - Choisir le périphérique de démarrage dans le BIOS/UEFI.
2. **Chargement de l’installateur ESXi**
    - Patientez pendant le chargement des modules.
3. **Acceptation du contrat de licence**
4. **Choix du disque d’installation**
    - Sélectionner le disque dur ou SSD.
5. **Choix de la langue et du clavier**
6. **Définir un mot de passe root**
7. **Finalisation**
    - Installation → redémarrage
    - Retirer le support de démarrage

## VMM (Virtual Machine Manager)

**Virtual Machine Manager (VMM)** est une **interface graphique** permettant de :
- Créer, gérer et superviser des **machines virtuelles**.
- Contrôler les hyperviseurs comme **KVM**, **QEMU**, ou **libvirt**.
- Visualiser les ressources (CPU, RAM, réseau, disques) utilisées par les VMs.


## Synthèse

<img src="Virtualisation/images/Synt.png">

