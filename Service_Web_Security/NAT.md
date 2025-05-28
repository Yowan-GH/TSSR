# 🔁 Le NAT – Traduction d’Adresse Réseau

## 📌 Définition du NAT

> Le **NAT (Network Address Translation)** est un mécanisme permettant de **convertir une adresse IP en une autre**, généralement pour faire transiter du trafic entre un réseau privé (LAN) et un réseau public (WAN).

### 🎯 Objectifs du NAT :
- Permettre aux machines **d’un réseau privé d’accéder à Internet**
- **Masquer** les adresses internes (sécurité)
- **Économiser les adresses IPv4 publiques**

## 🧩 Rappels : plages d’adresses IPv4 privées

|Classe|Plage d’adresses|CIDR|Taille approximative|
|---|---|---|---|
|A|10.0.0.0 – 10.255.255.255|/8|16 millions d’adresses|
|B|172.16.0.0 – 172.31.255.255|/12|1 million d’adresses|
|C|192.168.0.0 – 192.168.255.255|/16|65 536 adresses|

> Ces adresses ne sont **pas routables sur Internet**.

## 🔄 Types de NAT

<!-- tabs:start --> 
### **🔧NAT statique (Destination NAT)**

> Associe **de façon permanente** une adresse publique à une adresse privée.

### 📌 Cas d’usage : publication d’un **serveur mail** ou web depuis l’extérieur.

#### 🔁 Exemple :

|Direction|Détail|
|---|---|
|**Entrant**|PubA → port 25 → PubR1 (routeur) → **Privé SRV2**|
|**Sortant**|Privé SRV2 → PubR1 (source) → PubA (destination)|

✅ L’adresse **publique du client ne change pas**, mais la **destination est mappée**.

### **🔁 NAT dynamique (Source NAT / PAT)**

> Permet à **plusieurs machines internes** de partager une **seule adresse IP publique** (celle du routeur) via PAT (Port Adress Translation)

### 📌 Cas d’usage : sortie vers Internet depuis un LAN

#### 🔁 Exemple :

|Direction|Détail|
|---|---|
|**Sortie**|Privé A → port quelconque → PubR1 (routeur) → Pub SRV1 (port 80)|
|**Retour**|Pub SRV1 → port 80 → PubR1 → **Privé A** (via table de translation)|

✅ Le **routeur conserve un tableau NAT** pour faire correspondre les ports et IP internes/externes.

> C’est le comportement par défaut dans pfSense, box Internet, routeurs NAT.

<!-- tabs:end --> 
## 🔁 Le NAT dans pfSense – Redirections & stratégies

### 🔎 Qu’est-ce que le NAT dans pfSense ?

Le **NAT (Network Address Translation)** permet de :
- **Traduire** des adresses IP privées vers des adresses publiques (ou l’inverse)
- **Rediriger les flux entrants** vers les bonnes machines internes (via port ou IP)
- **Contrôler la sortie** des machines internes vers Internet

<!-- tabs:start --> 

### **🔄 Le transfert de port (Port Forwarding)**

#### 🎯 Objectif :

Rediriger un port public vers une machine interne privée spécifique.

#### 🧱 Exemple :

| Situation réelle          | Traduction pfSense                      |
| ------------------------- | --------------------------------------- |
| Requête HTTPS vers dmz.fr | IP publique `92.66.31.250` → port `443` |
| pfSense NAT               | Redirige vers serveur web local en DMZ  |
| Requête RDS (port `3389`) | Redirigée vers le serveur RDS interne   |
#### ⚙️ Paramétrage :
- **Menu** : `Pare-feu > NAT > Transfert de port`
- **Interface** : WAN
- **Famille IP** : IPv4
- **Protocole** : TCP/UDP
- **Destination** : adresse WAN publique
- **Redirection** : IP locale + port (ex : 3389 vers serveur RDS)

### **🌐Le NAT WAN-WAN (1:1 Mapping)**

#### 🎯 Objectif :

Associer **une adresse publique complète** à **une machine interne**.

#### 🧱 Exemple :

|Requête entrante|Traduction pfSense|
|---|---|
|Requête vers `IP publique 31250`|Redirigée **entièrement** vers machine interne|
|Tous les ports sont redirigés|Pas uniquement un port spécifique|
#### ⚙️ Paramétrage :
- **Menu** : `Pare-feu > NAT > 1:1`
- **Interface** : WAN
- **Adresse externe** : IP publique allouée
- **Adresse interne** : IP de la machine locale
    
✅ Utilisé pour des serveurs avec **plusieurs services** accessibles depuis l’extérieur (web, FTP, mail...)

## **🔁Le NAT sortant (Outbound NAT)**

#### 🎯 Objectif :

Gérer comment les machines internes accèdent à Internet.
#### 📦 Par défaut :
- pfSense est configuré en **mode automatique**
- Tous les réseaux privés sortent via **l’adresse WAN de pfSense**

#### ⚙️ Modes disponibles :

|Mode|Détail|
|---|---|
|**Automatique**|pfSense génère toutes les règles nécessaires|
|**Hybride**|Auto + Ajout manuel d’exceptions|
|**Manuel**|Toutes les règles sont **entièrement personnalisées**|
<!-- tabs:end --> 
### 🧠 Résumé des types de NAT dans pfSense

|🔁 Type|🎯 But|📍 Emplacement menu|
|---|---|---|
|**Port Forward**|Rediriger un **port spécifique**|NAT > Transfert de port|
|**NAT 1:1 (WAN-WAN)**|Associer **1 IP publique à 1 IP privée**|NAT > 1:1|
|**NAT sortant**|Gérer **comment les réseaux sortent**|NAT > Sortant|