# Infrastructure Hyper-V (Microsoft)

## ⚙️ Description

**Hyper-V** est la solution de virtualisation complète proposée par **Microsoft**, intégrée nativement à **Windows Server** et disponible en version allégée ou autonome.

Elle comprend :

- **Hyper-V (l’hyperviseur)** ➔ installé comme rôle dans Windows Server ou comme fonctionnalité sur Windows Client.
- **Hyper-V Manager** ➔ console de gestion locale de VMs.
- **System Center Virtual Machine Manager (SCVMM)** ➔ solution de gestion centralisée (équivalent de vCenter).
- **Failover Cluster Manager** ➔ haute disponibilité sur plusieurs nœuds.

> Hyper-V est un **hyperviseur de type 1**, natif, même s’il est installé **au sein d’un OS hôte**.

---

## 🧱 Composants de l'infrastructure Hyper-V

| Élément                       | Rôle                                                                 |
|------------------------------|----------------------------------------------------------------------|
| **Hyperviseur Hyper-V**      | Exécute et isole les VMs sur l’hôte physique                        |
| **Hyper-V Manager**          | Console graphique locale pour créer, configurer, démarrer les VMs   |
| **SCVMM**                    | Outil centralisé de gestion des hôtes, clusters et bibliothèques de VM |
| **Failover Cluster Manager** | Outil Windows pour gérer la haute disponibilité (HA)                |
| **VMs**                      | Machines virtuelles hébergées et isolées                             |

---

## 🚀 Fonctionnalités principales (avec SCVMM et cluster)

| Fonction                   | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| **Live Migration**         | Déplacement à chaud de VMs entre hôtes (cluster requis)                    |
| **Storage Migration**      | Déplacement du stockage d’une VM en fonctionnement                        |
| **Replica**                | Réplication d’une VM sur un autre hôte à des fins de reprise d’activité    |
| **Failover Clustering**    | HA : relance automatique de VMs en cas de panne d’un hôte                  |
| **Shielded VM**            | Protection renforcée des VMs (chiffrement, démarrage sécurisé…)           |
| **Snapshots / Checkpoints**| Sauvegarde d’un état instantané d’une VM                                   |

> 📌 Ces fonctionnalités avancées nécessitent généralement un environnement **Windows Server Datacenter**, un **cluster**, et SCVMM.

---

## 🧠 À retenir

| Composant | Fonction |
|----------|----------|
| **Hyper-V** | Hyperviseur type 1 installé sur Windows Server |
| **Hyper-V Manager** | Console locale simple (1 hôte, 1 VM à la fois) |
| **SCVMM** | Gestion centralisée multi-hôtes et fonctionnalités avancées |
| **Failover Cluster** | Infrastructure de haute disponibilité |

