# La Gestion des Disques

## 🧩 Partitionnement des disques

**Partitionner** = diviser un disque physique en plusieurs **portions logiques** indépendantes.

Deux types de tables de partitions : 
- **MBR** (Master Boot Record) - Ancien format, limite à 4 partitions principales, 2.2 To max, stocké dans le premier secteur du disque.
- **GPT** (GUID Partition Table - Nouveau format, jusqu'à 128 partitions, taille max 256 To, utilisé avec UEFI (systèmes 64 bits modernes).

## 🧱 Types de partitions

**De base** : Jusqu'à 4 partitions principales, possibilité de créer une partition étendue + lecteurs logiques.
**Dynamique** : Volumes dynamiques extensibles sur plusieurs disques, gestion RAID possible.

## 🗃️ Systèmes de fichiers (FS)

Après partitionnement ➔ formatage ➔ installation d'un FS pour organiser les données : 
- NTFS - Standard Windows, sécurisé (ACL), chiffrement (EFS), compression intégrée, 256 To max.
- FAT16 / FAT32 - Historique, non sécurisé, limité en taille (4 Go max pour FAT32).
- **ReFS** (Resilient File System) - Nouveau, tailles très grandes, correction automatique des erreurs.
- Autres - Ext4 (Linux), VMFS (VMware), UDF (optique)…

## 🛠️ Outils de gestion du stockage

<!-- tabs:start --> 
### **GUI (Graphique)**

Outil : **diskmgmt.msc** (Gestion des disques)
Description : Partitionner, formater, attribuer des lettres de lecteurs.

### **CMD (Command Line)**

Outil : **diskpart** (outil en ligne de commande) :
Description : Plus puissant pour manipuler les partitions, scripts automatisés en production.

### **PowerShell**
| Cmdlet            | Description                              |
| ----------------- | ---------------------------------------- |
| `Get-Disk`        | Voir les disques disponibles             |
| `Initialize-Disk` | Initialiser un disque (GPT par défaut)   |
| `New-Partition`   | Créer une partition                      |
| `Set-Partition`   | Modifier une partition existante         |
| `Format-Volume`   | Formater une partition (NTFS par défaut) |

<!-- tabs:end --> 

## 📋 Recette finale pour configurer un stockage

- Installer le média (disque dur, SSD…)
- Initialiser le disque (GPT ou MBR).
- Partitionner le disque.
- Installer un système de fichiers (formatage).
- Attribuer une lettre de lecteur ou un point de montage.