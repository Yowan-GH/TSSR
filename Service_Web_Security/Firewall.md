# 🔥 Introduction au pare-feu

## 🔐 Qu’est-ce qu’un pare-feu ?

Un **pare-feu** (firewall) est un **système de sécurité réseau** qui :
- Contrôle le **trafic entrant et sortant**
- Applique des **règles prédéfinies**
- Protège une zone sécurisée d’une zone non sécurisée (ex : LAN ↔ Internet)

## 🧭 Étapes de mise en place d’un pare-feu

### 1️⃣ Analyser l’infrastructure réseau
- Cartographier la topologie du réseau
- Identifier les segments & zones de sécurité

### 2️⃣ Schématiser
- Créer un diagramme réseau clair
- Visualiser les **flux critiques** à protéger

### 3️⃣ Établir le contexte technique
- Inventorier les **systèmes, services et ports**
- Identifier les protocoles utilisés (TCP, UDP, ICMP…)

### 4️⃣ Définir la politique de sécurité
- Déterminer les **objectifs de sécurité**
- Établir les règles d’accès et de restriction

### 5️⃣ Préparer la documentation
- Rédiger une **stratégie claire**
- Créer des **modèles de documentation des règles**

## ⚙️ Critères d’application des règles

- Les **règles sont évaluées dans l’ordre** - Celui-ci est donc **très important**
- Une règle `Deny` **placée en haut** bloque tout ce qui suit
- Actions possibles :
    - ✅ **Permit** : laisse passer
    - ❌ **Block** : bloque sans réponse
    - 🚫 **Reject** : bloque avec réponse ICMP

### 📝 Exemple de tableau de règles (Pfsense / Opnsense) :

| #   | Permission | Protocole | Port | Source     | Destination |
| --- | ---------- | --------- | ---- | ---------- | ----------- |
| 1   | Permit     | SSH       | 22   | LAN CLIENT | LAN SERVER  |
| 2   | Permit     | TCP       | 443  | LAN CLIENT | LAN SERVER  |
| 3   | Permit     | UDP       | 53   | LAN CLIENT | LAN SERVER  |
| 4   | Permit     | TCP       | 53   | LAN CLIENT | LAN SERVER  |
| 5   | Deny       | ANY       | ANY  | LAN CLIENT | LAN SERVER  |
## 🧱Quelques Pare-feu

<!-- tabs:start -->
### **Windows**
- Intégré à tous les systèmes Windows
- Règles **par application**, **par port**, **par profil réseau**
- Gestion via :
    - **wf.msc** (interface graphique)
    - **netsh advfirewall** (ligne de commande)
    - **PowerShell** :
		-`` New-NetFirewallRule -DisplayName "Allow HTTP" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow``

### **Linux**

|Nom|Description|
|---|---|
|`iptables` / `nftables`|Contrôle bas niveau, puissant mais complexe|
|`firewalld`|Interface de gestion dynamique (Red Hat, CentOS…)|
|`ufw`|Simplifié pour Ubuntu (`ufw enable`, `ufw allow`)|
<!-- tabs:end -->


## 🔐 Ports réseau à connaître et surveiller (Windows / Linux / DMZ / pare-feu)

| 🔢 **Port(s)**       | 📌 **Nom du service**    | 💻 **Usage / Description**                         |
| -------------------- | ------------------------ | -------------------------------------------------- |
| **22**               | SSH                      | Accès distant sécurisé (Linux, équipements réseau) |
| **80 / 443 / 8080**  | HTTP / HTTPS / HTTP alt. | Serveurs web (IIS, Apache, Nginx, reverse proxy)   |
| **135**              | RPC                      | Appels distants (services Windows)                 |
| **137-139**          | NetBIOS                  | Partage de fichiers (ancien, désactivable)         |
| **445**              | SMB                      | Partage de fichiers Windows / Active Directory     |
| **3268 / 3269**      | CatalogGlobal            | Port du **Global Catalog** (AD LDAP/SSL)           |
| **389 / 636**        | LDAP / LDAPS             | Authentification / annuaire (AD)                   |
| **88 / 464**         | Kerberos                 | Authentification réseau (AD)                       |
| **67 / 68**          | DHCP / DHCPCLT           | Attribution IP (client et serveur)                 |
| **5985 / 5986**      | WinRM                    | Remote PowerShell (HTTP / HTTPS)                   |
| **3389**             | RDP                      | Bureau à distance Windows                          |
| **22 / 3389 / 5985** | RemoteAdmin              | Accès distant aux machines (admin / support)       |

#### 🛡️ Utilisation typique de ces ports

| 🎯 **Contexte**              | 🧩 **Ports à ouvrir**              |
| ---------------------------- | ---------------------------------- |
| 🔐 **DMZ / Serveur Web**     | 80, 443, 8080                      |
| 🎮 **AD / Authentification** | 88, 389, 636, 464, 3268, 3269, 445 |
| 🌐 **Partage de fichiers**   | 445, 135, 137-139                  |
| 🛠️ **Remote admin**         | 3389, 5985, 22                     |
| 🌍 **DHCP client/serveur**   | 67 (serveur), 68 (client)          |

## 🛡️Pfsense

### 📁 Les alias dans pfSense

Les **alias** permettent de :
- Regrouper IP, ports ou réseaux
- Simplifier les règles
- Faciliter la maintenance et la documentation

> Exemple :  
> `SRVDMZ = 172.30.10.10`  
> `PORTX = 222, 223, 225, 552`

### 🌐 Les IPs virtuelles

IP virtuelle = **IP supplémentaire** sur une interface réseau.  
Utilisée pour la **HA**, la redondance, ou l’exposition de plusieurs services.

### 🔧 Types :

|Type|Fonction|
|---|---|
|**IP Alias**|IP secondaire sur interface|
|**CARP**|(High Availability) IP partagée entre plusieurs pfSense|
|**Proxy ARP**|Répond à ARP pour une IP non assignée à l’interface directement|

**🧠 Utilisations des IPs virtuelles**
- **Haute disponibilité (CARP)** : failover automatique d’un pfSense à l’autre
- **Publication multi-services** : plusieurs IPs publiques → plusieurs services exposés même via une seule interface WAN

### 🕒 La fonctionnalité planning

Permet d’**activer ou désactiver des règles selon un horaire**.

|Avantages|
|---|
|Règles valides sur plages horaires|
|Automatisation des politiques|
|Renforcement hors heures de bureau|
### ⚙️ Fonctionnalités des règles de pare-feu dans pfSense

|Fonction|Détail|
|---|---|
|🎯 Filtrage granulaire|Par IP, port, protocole|
|🌐 Interface ciblée|Règles spécifiques par interface|
|🔁 Ordre des règles|Traité séquentiellement (de haut en bas)|
|🔄 Aliases intégrés|IP/ports personnalisés pour simplifier la lecture|
|⏱️ Règles planifiées|Heures/jours spécifiques|
|🌐 NAT intégré|Routage & redirections|
|📊 Journalisation|Suivi des règles déclenchées|
|🛠️ Flexibilité maximale|Règles custom très avancées|
### 📡 Gestion des flux par interface
- 🎯 Gestion des priorités
- 📈 QoS (Quality of Service)
- ⚖️ Répartition de la bande passante
- 🔁 Segmentation et allocation dynamique

### ⚙️ Services disponibles dans pfSense

|🔧 Service|📄 Fonction|
|---|---|
|DNS Dynamique|Mise à jour auto des enregistrements DNS|
|DNS Forwarder|Redirige requêtes DNS|
|NTP|Synchronisation de l’heure|
|Portail captif|Authentification sur accès réseau (WiFi/Hotspot)|
|Proxy IGMP|Gestion du multicast|
|Relais DHCP|Redirige DHCP entre segments|
|Résolveur DNS|DNS local avec cache|
|Sauvegarde|Sauvegarde/restauration de la config|
|Serveur DHCP|Attribution IP aux clients|
|RA DHCPv6 / Serveur IPv6|Gestion adresses IPv6 + surveillance|
|UPnP / NAT-PMP|Redirections de ports auto|
|Wake-on-LAN|Réveil distant d’ordinateurs|
