# Infrastructure vSphere

## ⚙️ Description

 **vSphere** est le **nom de la solution globale** de VMware pour virtualiser, gérer et superviser des infrastructures IT.  
Elle regroupe plusieurs composants, dont :

- **ESXi** ➔ hyperviseur (le moteur)
- **vCenter Server** ➔ gestion centralisée (le cerveau)
- Outils clients ➔ Web Client, vSphere Client…

## 🧱 Composants de l'infrastructure vSphere

| Élément                            | Rôle                                                                                                            |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Hyperviseur**                    | ESXi / ESX : logiciel installé sur les hôtes physiques pour exécuter les machines virtuelles.                   |
| **Client d'administration**        | vSphere Client / vSphere Web Client : pour créer, gérer et superviser les VMs.                                  |
| **vCenter**                        | Serveur centralisé de gestion des hôtes et VM, indispensable pour les fonctionnalités avancées (vMotion, DRS…). |
| **VMs**                            | Machines virtuelles hébergées sur les hyperviseurs ESXi.                                                        |
| **Console de service (supprimée)** | Présente dans ESX, supprimée dans ESXi au profit d’une architecture plus légère.                                |
> 📌 **Attention** : Les versions de tous ces composants doivent être compatibles entre elles.

## 🚀 Fonctionnalités principales - avec vCenter (VMM)

| Fonction                   | Description                                                                      |
| -------------------------- | -------------------------------------------------------------------------------- |
| **vMotion**                | Migration "à chaud" d’une VM entre deux hôtes.                                   |
| **Storage vMotion**        | Migration d’un disque virtuel d’un datastore vers un autre sans arrêter la VM.   |
| **DRS**                    | Répartition automatique des VMs selon les ressources disponibles.                |
| **Storage DRS**            | Répartition automatique des VMs sur les datastores selon l’espace/disponibilité. |
| **DPM**                    | Mise en veille automatique des hôtes inutilisés pour économiser l’énergie.       |
| **HA** (High Availability) | Redémarrage automatique des VMs en cas de défaillance d’un hôte.                 |
| **FT** (Fault Tolerance)   | Tolérance aux pannes **sans interruption** : double exécution d’une VM critique. |
>📌 **Attention** : Les fonctionnalités avancés nécessite d'avoir au moins 3 hyperviseurs identiques

## 💰 Licences vSphere et coûts (2021)

| Édition             | Fonctionnalités incluses                                                      | Prix TTC (indicatif)    | Cible                                                                    |
| :------------------ | :---------------------------------------------------------------------------- | :---------------------- | :----------------------------------------------------------------------- |
| **ESXi Free**       | Hyperviseur seul, sans vCenterPas de gestion centraliséePas de sauvegarde API | **0 €**                 | Environnement de test, labo, formation                                   |
| **Essentials**      | Jusqu’à 3 hôtes (6 CPU max)vCenter Essentials (limité)Pas de vMotion ni HA    | **574,13 €**            | Très petites entreprises (TPE)/PME, sites isolés                         |
| **Essentials Plus** | vMotion, HA, vSphere Replication, vCenter Essentials3 hôtes max               | **2525,00 €**           | PME ayant besoin de haute dispo & réplication                            |
| **Standard**        | 1 CPU, vCenter StandardPas de DRS/FTPas de limitation RAM                     | **1262,14 € (par CPU)** | PME/Grandes entreprises avec besoin de gestion centralisée plus flexible |
| **Enterprise Plus** | Toutes fonctionnalités (DRS, FT, DPM, Host Profiles, vDS...)1 CPU             | **4326,23 € (par CPU)** | Grandes entreprises, datacenters                                         |
| **Platinum**        | Fonctions Enterprise Plus + sécurité AppDefense, cryptage VM, etc.            | **NC (sur devis)**      | Environnements sensibles : secteur public, finance, défense              |
