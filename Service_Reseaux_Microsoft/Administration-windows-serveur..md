# Administration windows serveur.

## Les systèmes d'exploitation serveurs

Deux familles de système d’exploitation :
- Serveur
- Client
## Comparatif des éditions Windows Server

| Édition                                  | Standard                                                                                                                  | Datacenter                                                                                                                | Essentials                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Prise en charge matérielle (minimum)** | 512 Mo de RAM en mode Core<br>2 Go de RAM avec expérience utilisateur<br>CPU 1,64 GHz 64 bits<br>32 Go de stockage disque | 512 Mo de RAM en mode Core<br>2 Go de RAM avec expérience utilisateur<br>CPU 1,64 GHz 64 bits<br>32 Go de stockage disque | 2 Go de RAM<br>1,4 GHz 64 bits<br>160 Go de stockage avec une partition système de 60 Go |
| **Droits à la virtualisation**           | 2 VM + 1 hôte Hyper-V par licence                                                                                         | Nombre illimité de VM + 1 hôte Hyper-V par licence                                                                        | Hyper-V non disponible                                                                   |
| **Mode de licence**                      | Basé sur les cœurs CPU                                                                                                    | Basé sur les cœurs CPU                                                                                                    | Licence serveur                                                                          |

Services pris en charge par WS :  
- ADDS 		-> Gestion Active Directory
- DNS 		-> Service de résolution de nom d’hôte
- DHCP 		-> Service d’adressage IP
- Hyper-V 		-> Virtualisation
- Deploiement WDS 	-> Déploiement OS Windows dans le réseau
- WSUS		-> Prise en charge centralisée mise à jour Microsoft
- Service d’impression et numérisation de document

Possibilité d’installer WS :
- Mode standard : Mode graphique – Demande de ressource modérée
- Mode Core : CLI powershell uniquement – Demande peu de ressource


## Installation OS

<img src="Service_Reseaux_Microsoft/images/Environnement_MS_23.png">  
Lors de l’installation :
Standard = Mode core
Standard (Expérience de bureau) = Mode graphique

Type d’installation :
Personnalisée (installer uniquement windows)

Pour le reste installation classique.

Lors de l’arrivée sur le bureau – Le dashboard apparait automatiquement.
Renommer la machine et faire la config IP.
Config IP : Panneau de config / réseaux / Modifier paramètre de la carte / IPV4 / Configurer l’adressage IP
Renommage PC : Explorateur / clic droit, propriété sur PC / Modifier les paramètre / Changer et redémarrer

### 🎯 Les rôles et fonctionnalités

#### 🔧 Des composants peuvent être ajoutés par :
- Le gestionnaire de serveur  
- Des commandes PowerShell

#### 🧩 Deux types de composants :
- **Les rôles** : correspondent généralement à un **service que l’on fournit à des clients**
- **Les fonctionnalités** : correspondent généralement à un outil/composant **utile sur l’élément sur lequel on l’ajoute**

Pour ajouter un rôle : 
1. Gérer (en haut à droite) / Ajouter des rôles et fonctionnalités  
2. Installer un rôle et une fonctionnalité  
3. Sélectionner le serveur  
4. Sélectionner le rôle à installer  
5. Ajouter des fonctionnalités  
6. Cocher redémarrage automatique puis installer  

Pour accéder aux outils d’administration : ``Windows / outils d’administration Windows``  


## Gestion du stockage

Deux types de tables de partitions :
- MBR (historique) : Pour les systèmes en 32 bits, legacy
  - Faible tolérance à la panne
- GPT (recent) : Pour les systèmes en 64 bits, UEFI
  - Meilleure tolérance aux pannes

**Configuration des disques **:
- Config de base
  - Simplifie la gestion de disque
  - Toutes les données sont inscrites dans les partitions
  - Sur un seul disque physique
- Config Dynamique
  - Système de volume pouvant être sur plusieurs disques
  - Nécessaire pour le raid.

## Partitionnement d’un disque et RAID

### 📦 Partitionnement

- **Disque de base** :  
  ➤ 4 partitions principales **ou** 3 principales + 1 étendue (logique)

- **Disque dynamique** :  
  ➤ Utilise des **volumes dynamiques** (⚠️ **ne peut pas héberger un OS**)

---

### 📁 Types de volumes

- 📄 **Volume simple** : 1 volume par disque  
- 🧩 **Volume fractionné** : Un ou plusieurs volumes répartis sur plusieurs disques  
- 🚀 **Volume agrégé par bande (RAID 0)** :  
  ➤ Écriture **simultanée** du fichier sur plusieurs disques  
  ➤ ✅ **Rapide**  
  ➤ ❌ **Aucune tolérance de panne**

---

### 🛡️ RAID – Tolérance de panne

- 🪞 **RAID 1 – Volume miroir** :  
  ➤ Copie exacte d’un disque sur un second  
  ➤ ✅ Tolérance aux pannes

- 🧬 **RAID X – Redondance personnalisée**

- ⚖️ **RAID 5 – Agrégé par bandes avec parité** :
  - Besoin de **3 disques minimum**
  - 1 disque (ou son espace équivalent) est réservé pour la **parité** (= tolérance de panne)
  - ✅ **Bon compromis** entre **performance** et **sécurité**
  

🗂️ Schéma de répartition RAID 5 (exemple avec 3 disques)

|         | 💽 Disque 1 | 💽 Disque 2 | 💽 Disque 3 |
|---------|-------------|-------------|-------------|
| Bloc 1  | A1          | A2          | Ap (parité) |
| Bloc 2  | Bp (parité) | B1          | B2          |
| Bloc 3  | C1          | Cp (parité) | C2          |

---

#### 🧠 Explication

- Le fichier à enregistrer est composé des blocs **A**, **B** et **C**.
- Chaque information est répartie sur **plusieurs disques**.
- **Ap**, **Bp**, **Cp** sont des blocs de **parité** : ils permettent de **reconstruire les données** si un disque tombe en panne.

---

#### ✅ Avantages

- ✅ **Performance** : lecture/écriture répartie (presque comme RAID 0)
- ✅ **Sécurité** : 1 disque peut tomber en panne sans perte de données
- ✅ **Contrôle** : grâce à la **parité**

---

#### 📉 Limite

- Sur **3 disques de 100 Go**, seule la capacité de **2 disques est exploitable**.  
  ➤ **100 Go = utilisés pour la parité**

---

#### 💡 Résumé RAID 5 :
- 🔁 **Écriture fractionnée**
- 🛡️ **Redondance**
- ✅ **Contrôle via parité**

## Formatage

💽 Étapes de préparation d’un disque

1. 🌀 **Disque brut**  
   ➤ Disque sans aucune structure, inutilisable tel quel.

2. 🧩 **Partitionnement**  
   ➤ Découpe logique du disque en **partitions** (primaires, étendues, logiques).

3. 🧼 **Formatage**  
   ➤ Application d’un **système de fichiers** (ex : NTFS, ext4, FAT32…).

4. 📂📄 **Stockage de fichiers**  
   ➤ Le disque est maintenant prêt à **accueillir des fichiers et dossiers**.

Système de fichier dispo :
- FAT32 : Windows 9
- NTFS : Le plus utilisé
  - Taille maxi : 256 TO
  - Taille partition maxi : 256 TO

Les outils :
- Gestion de disque ``diskmgmt.msc``
- Commande ``diskpart`` sur cmd
- Commandes PowerShell

