# Microsoft Windows

## Installation
### 🗝️ Types de licences Windows

|Type|Description|
|---|---|
|OEM|Licence liée à la machine, vendue préinstallée.|
|Retail|Licence individuelle transférable entre machines.|
|MAK (Multiple Activation Key)|Une clé pour activer plusieurs PC.|
|VLK (Volume Licence Key)|Licence en volume pour entreprise via KMS.|
|CAL (Client Access License)|Droit d'accès à un serveur Microsoft.|
### 🛠️ Installation

Prérequis : 
	- Processeur 1 Ghz
	- RAM : 1 GO (32 bits) / 2 GO (64 bits)
	- Espace disque : 16 GO (32 bits) / 32 GO (64 bits)

 Supports d'installation possibles : 
- **DVD**
- **Clé USB bootable**
- **Image ISO**
- **Partage réseau / serveur de déploiement**

🔵 Tous ces supports doivent contenir le fichier **`install.wim`**.

**Remarque** :  
Un **mini-OS** contenu dans **`boot.wim`** est utilisé pour lancer l’installation.

 🔧 Processus d'installation : 
1. **Choix de l'édition** (Famille, Pro…)
2. **Partitionnement** et **formatage** du disque.
3. **Copie des fichiers** (depuis `install.wim`).
4. **Paramétrage automatique** ➔ 1 redémarrage.
5. **Premier démarrage** ➔ finalisation et configuration utilisateur.

## Utilisation

### 🖥️ Environnement graphique de Windows 10

- **Système multi-utilisateur**, **multitâche**.
- Éléments principaux :
    - **Bureau personnalisable**.
    - **Menu Démarrer** :
        - Clic gauche ➔ Tuiles (applications épinglées).
        - <span style="color:rgb(255, 0, 0)">Clic droit ➔ Accès rapide aux outils système.</span>
            
    - **Barre des tâches** et **zone de notification** :
                - Accès rapide au réseau, Bluetooth, mode tablette, paramètres.
    - **Bureaux virtuels** ➔ `Windows + Tab`.
    - **TimeLine** ➔ Historique des activités.
    - **Gestionnaire des tâches** ➔ Gestion des performances et applications ouvertes.

### 🛠️ Utilisation de la CLI (Command Line Interface)

- **CLI (interface en ligne de commande)** complémentaire à la GUI.
- Shells disponibles :
    - `command.com` ➔ MS-DOS.
    - `cmd.exe` ➔ Windows NT et suivants.
    - ``PowerShell`` ➔ Présent nativement depuis Windows Server 2008.

<!-- tabs:start --> 

#### **Cmd**

Sert à exécuter des commandes système.
Utilisation de l'aide intégrée : ``help <Commande>`` : 
- `help <commande> -examples` ➔ Affiche uniquement les exemples.
- `help <commande> -online` ➔ Ouvre l'aide Microsoft à jour dans le navigateur.
- `Update-Help` ➔ Mettre à jour l’aide locale.

#### **Powershell**

Sert à gérer le système, automatiser, manipuler des données
- **PowerShell** = Shell + Langage de script.
- Basé sur le framework **.NET**.
- **Orienté objet** : tout est un objet manipulable.
- Syntaxe : ``Verbe-Nom`` 
- Utilisation de l'aide intégrée : ``Get-Help``

<!-- tabs:end --> 

