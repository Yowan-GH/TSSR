# L'hyperviseur ESXi

## Installation ESXi

### 🔧 **Matériel requis (minimum)**

|Élément|Configuration minimale|
|---|---|
|**Processeur (CPU)**|x64 (64 bits), 2 cœurs min.  <br>Compatible Intel VT-x / AMD-V|
|**RAM**|4 Go (8 Go recommandé)|
|**Stockage**|1 disque local ou USB de 32 Go min.  <br>(Recommandé : 120 Go SSD ou plus)|
|**Carte réseau (NIC)**|Compatible avec ESXi (Intel e1000/e1000e ou vmxnet3 très fiables)|
### ⚙️ **Fonctionnement de VMware ESXi**

### Qu’est-ce qu’ESXi ?
- **ESXi** est un **hyperviseur de type 1** (bare-metal) de VMware.
- Il s’installe **directement sur le matériel** (pas besoin d’OS en dessous).
- Il permet de créer et gérer plusieurs **machines virtuelles (VMs)**.


## 🖥️ Installer une VM sur ESXi

### 🔧 **Prérequis**

- ESXi est déjà installé et accessible via un navigateur (IP de l’hôte ESXi).
- Tu disposes d’un **fichier ISO** de l’OS à installer (Windows, Linux…).

### 🪜 **Étape par étape**

 1. **Accéder à l’interface web d’ESXi**
	- Ouvre ton navigateur.
	- Va à l’adresse : `https://[IP_de_ton_ESXi]` 
	- Connecte-toi avec `root` et ton mot de passe.

2. Contrôler la banque de donnée
	- Aller dans Stockage puis vérifier qu'il y a une banque de donnée
	- Si elle n'est pas existante, cliquer sur ``Nouvelle Banque de Données / VMFS``
	
3. Uploader l'image ISO du système sur la banque de donnée
	- Explorateur de banque de données
	- Cliquer sur vôtre banque de donnée puis télécharger
	- Sélectionner l'ISO à charger 

4. Création de la VM
	- Aller dans machine virtuelle
	- Créer une machine virtuelle

>💡 Pour simuler le contrôle + alt + suppr : Clic droit / SE invité / Envoyer les touches 


