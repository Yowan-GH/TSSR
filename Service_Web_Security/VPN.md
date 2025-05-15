# 🔐 Module VPN

## 🌍 Introduction

Un **VPN (Virtual Private Network)** est un **tunnel chiffré** qui garantit :
- La **confidentialité des données** échangées
- L’**authentification** des utilisateurs
- L’**intégrité** des communications
    
Il existe deux grands cas d’usage :
- **VPN site à site** : relie deux réseaux distants
- **VPN nomade** : permet à un utilisateur distant d’accéder au réseau interne

## 🛠️ Types de VPN

<!-- tabs:start --> 
### **🧩 PPTP (Peu sécurisé)**

- Port : TCP 1723
- Authentification par mot de passe uniquement
- Faible sécurité (non chiffré)
- Facile à configurer, multiplateforme
- Couche 2 du modèle OSI

### **🧩 SSL VPN**

- Port : 443 (HTTPS)
- Aucun client à installer (navigateur web)
- Privilégié pour les accès nomades
- Multiples méthodes d’authentification
- Couche session du modèle OSI

### **🧩 L2TP/IPSec**

- Ports UDP 1701 (service), 500 (clé de chiffrement), et protocole 50 (chiffrement IPSec)
- Séparation tunnel (L2TP) et chiffrement (IPSec)
- Plus sécurisé mais parfois bloqué sur les réseaux publics
- L2TP utilise la couche de liaison OSI et IPsec la couche réseau. 
    

<!-- tabs:end --> 

## 🏢 VPN Site à Site (IPSec)

### 🔒 Il offre 4 garanties :

1. **Confidentialité** : chiffrement des données
2. **Authentification** : vérifie l'identité des deux parties
3. **Intégrité** : empêche les altérations de données
4. **Anti-rejeu** : évite les duplications malveillantes

## ⚙️ Fonctionnement en deux phases

<!-- tabs:start --> 
###  **🔄 Phase 1 : Authentification et négociation initiale**

- Établit un **canal sécurisé pour l’échange de clés**
- Authentifie les partenaires (clé prépartagée ou certificats)
- ⚠️ Aucun trafic utilisateur ne passe encore
- Utilise le **mode Main** (IP publique ↔ IP publique)

```IPSec
           🔒 SITE A                                  🔒 SITE B
     --------------------                      ---------------------
    |  Certificat A      |     --->           |    Certificat B    |
    |  Clé privée A      |               ---> |    Clé privée B    |
    |                    |  <---              |                    |
     --------------------                      ---------------------

    📤 Envoi Certificat A*                    📤 Envoi Certificat B*
    📥 Réception Certificat B                 📥 Réception Certificat A

    🔏 Vérification CA commune                🔏 Vérification CA commune
    🔐 Signature des échanges                 🔐 Signature des échanges
    🔑 Échange de clés Diffie-Hellman         🔑 Échange de clés DH

    🔐 Authentification mutuelle réussie → ✅ Tunnel IKE sécurisé établi

```

* Les certificats A et B ne sont pas demandé à chaque connexion. ils sont, en général, demandé une première fois lors du paramétrages des postes. Les certificats ne varient donc pas. 
* Nativement, Pfsense intègre un VPN (deamon StrongSwan)
### **🔐 Phase 2 : Tunnel de données**

- Crée le **tunnel chiffré réel**
- Définit les réseaux à interconnecter (ex : 192.168.1.0/24 ↔ 192.168.2.0/24)
- Le trafic est encapsulé et chiffré entre les deux sites

```css
[LAN SITE A] → [pfSense A] ⇄ TUNNEL IPSec ⇄ [pfSense B] ← [LAN SITE B]
```

<!-- tabs:end --> 
## 🔧 Mise en place d’un VPN sur **pfSense**

### 1. **Créer une Autorité de Certification (CA)**

- Permet de générer des certificats - - **Système > Cert. Manager > Authorities** > Ajouter
- Utilisé pour chiffrer les échanges VPN
    
### 2. **Configurer LDAP pour l’authentification**

- Lier pfSense à l’**Active Directory**
- Système → Gestionnaire d’usagers → Serveurs d’authentification → Ajouter
- Paramètres importants :
	- Type LDAP
    - FQDN ou IP de l'AD
    - Port : 389 (port LDAP) - Défaut
    - Protocole de transport : TPC - Défaut
    - Autorité de certification de paire (AC)
	    - Importer une autorité
	    - Coller le contenu du certificat
	    - Coller la clé privée du certificat
    - Base DN :  `OU=groupe,dc=domaine,dc=tld`(pour domaine.tld)
    - Attributs : `sAMAccountName`, `memberOf`, etc.

### 3. **Tester l’authentification LDAP**

- Diagnostics → Authentification
- Test avec identifiants AD

### 4. **Configurer la résolution DNS** dans Pfsense

- **Système > Configuration générale**
- Nom de domaine : `domaine.tld`
- DNS : IP du serveur AD-DNS (ex : `192.168.159.121`)
- Décocher : "Utiliser les serveurs DNS fournis par le FAI"

## 🔐 Configuration d’un VPN OpenVPN sur pfSense

### 📥 Assistant OpenVPN Remote Access :

- **VPN > OpenVPN > Assistants** > **OpenVPN Remote Acces Serveur** > Lancer l’assistant
- Choix du backend : **LDAP** / **AD**
- Générer un **certificat serveur** / **add** / **Create new certificate**
- Interface : WAN / Protocole : UDP ou TCP / Port : 1194 ou 443
    
### ⚙️ Paramètres du tunnel OpenVPN :

- Tunnel : `10.0.8.0/24`
- Dans paramètrage du client, activer IP Dynamique
- Local Network : `192.168.159.0/24` (réseau LAN interne)
- Cocher : **Rediriger la passerelle par défaut** (tout le trafic passe dans le VPN)
- Authentification des clients : via LDAP
- Topologie : **Subnet**
- DNS : spécifier IP AD-DNS + serveur de temps / WINS si souhaité
- Cocher Firewall Rule et OpenVPN rule

## 📋 Règles de pare-feu (pfSense)

#### 📌 À ajouter manuellement :

- 🔐 **Client → serveur VPN** : autoriser connexions entrantes OpenVPN
	- **Interface WAN** : autoriser les connexions entrantes sur le port VPN
- 🌐 **Client → réseau interne** : autoriser le routage à travers le VPN
	- **Interface OpenVPN** : autoriser trafic vers LAN