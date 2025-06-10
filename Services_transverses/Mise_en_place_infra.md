
# Rappel Infrastructure

## 🔧 Composants essentiels

Avant toute mise en œuvre des services de Bureau à distance (RDS), il est crucial de disposer des services réseau suivants :

- **🧑‍💼 Active Directory (AD)**  
    ➤ Gère centralement les utilisateurs, groupes, ordinateurs, politiques de sécurité, etc.
    
- **🌐 DNS (Domain Name System)**  
    ➤ Traduit les noms de domaine en adresses IP (résolutions directe et inverse, enregistrements, zones).
    
- **📦 DHCP (Dynamic Host Configuration Protocol)**  
    ➤ Assigne dynamiquement les adresses IP et autres paramètres réseau aux clients.
    
- **🖥️ Serveur de déploiement (WDS / MDT)**  
    ➤ Permet d’installer des systèmes d’exploitation Windows automatiquement sur les postes clients via le réseau (PXE), avec possibilité d’automatisation complète (scripts, réponses, séquences de tâches).
    
- **🧑‍💻 Services RDS (Remote Desktop Services)**  
    ➤ Permet aux utilisateurs d’accéder :
    - à un **bureau à distance complet**, ou
    - à des **applications spécifiques** via **RemoteApp**,  
        sans que ces applications soient installées localement sur leur poste.

> 🧠 **À retenir :** Ces services sont interdépendants dans une architecture Microsoft orientée domaine.


## 🏛️ Domaine Active Directory

Un domaine AD représente un **ensemble d'ordinateurs** partageant une **base de données commune** (comptes utilisateurs, ressources, stratégies...).

- Il est **géré comme une unité cohérente** (règles, sécurité, délégation).
- Un **contrôleur de domaine (CD)** est chargé de :
    - L’hébergement de la base AD (via ADDS)
    - L’authentification des utilisateurs
    - La gestion des objets du domaine

### Processus d’authentifications

- **Kerberos** → authentification sécurisée
- **LDAP** → interrogation de l’annuaire

## 🧾 Le bail DHCP

Le **bail DHCP** est le paquet d’informations qu’un serveur fournit à un client :
- 📅 Une **durée de validité**
- 🌐 Une **adresse IP**
- 🧮 Un **masque de sous-réseau**
- ⚙️ **D’autres paramètres** (passerelle, DNS, nom de domaine…)

> 💡 Le bail est renouvelé automatiquement à mi-parcours pour éviter les coupures.


## 🌍 Le DNS

**🔎 DNS Résolveur**
- Reçoit les requêtes des clients.
- Interroge d’autres serveurs DNS pour **trouver l’adresse IP**.
- **Ne possède pas** d’espace de noms propre.

**🏠 DNS Hébergeur**
- Gère un ou plusieurs espaces de noms (zones).
- Répond directement aux requêtes liées à son domaine.
- **Fait autorité** sur ses enregistrements.

### 🛠️ Outils d’administration

**🖱️ Interfaces graphiques :**
- Gestionnaire de serveur
- Centre d’admin. Active Directory
- Stratégies de groupe
- Consoles DNS et DHCP

**💻 PowerShell :**

```powershell
# Création d’une arborescence OU
New-ADOrganizationalUnit _Entreprise
$base = Get-ADOrganizationalUnit -Filter { name -like "_Ent*" }
New-ADOrganizationalUnit Groupes -Path $base
New-ADOrganizationalUnit Utilisateurs -Path $base
New-ADOrganizationalUnit Ordinateurs -Path $base
Get-ADOrganizationalUnit -filter * -SearchBase $base | ft name,DistinguishedName -AutoSize
```