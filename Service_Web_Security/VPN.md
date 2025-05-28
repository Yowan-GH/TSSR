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


## **Open VPN**
### 🔧 Mise en place d' **Open VPN** sur **pfSense**

#### 1. **Créer une Autorité de Certification (CA)**

- Permet de générer des certificats - - **Système > Cert. Manager > Authorities** > Ajouter
- Utilisé pour chiffrer les échanges VPN
    
#### 2. **Configurer LDAP pour l’authentification**

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

#### 3. **Tester l’authentification LDAP**

- Diagnostics → Authentification
- Test avec identifiants AD

#### 4. **Configurer la résolution DNS** dans Pfsense

- **Système > Configuration générale**
- Nom de domaine : `domaine.tld`
- DNS : IP du serveur AD-DNS (ex : `192.168.159.121`)
- Décocher : "Utiliser les serveurs DNS fournis par le FAI"

### 🔐 Configuration d’OpenVPN sur pfSense

#### 📥 Assistant OpenVPN Remote Access :

- **VPN > OpenVPN > Assistants** > **OpenVPN Remote Acces Serveur** > Lancer l’assistant
- Choix du backend : **LDAP** / **AD**
- Générer un **certificat serveur** / **add** / **Create new certificate**
- Interface : WAN / Protocole : UDP ou TCP / Port : 1194 ou 443
    
#### ⚙️ Paramètres du tunnel OpenVPN :

- Tunnel : `10.0.8.0/24`
- Dans paramètrage du client, activer IP Dynamique
- Local Network : `192.168.159.0/24` (réseau LAN interne)
- Cocher : **Rediriger la passerelle par défaut** (tout le trafic passe dans le VPN)
- Authentification des clients : via LDAP
- Topologie : **Subnet**
- DNS : spécifier IP AD-DNS + serveur de temps / WINS si souhaité
- Cocher Firewall Rule et OpenVPN rule

### 📋 Règles de pare-feu (pfSense)

#### 📌 À ajouter manuellement :

- 🔐 **Client → serveur VPN** : autoriser connexions entrantes OpenVPN
	- **Interface WAN** : autoriser les connexions entrantes sur le port VPN
- 🌐 **Client → réseau interne** : autoriser le routage à travers le VPN
	- **Interface OpenVPN** : autoriser trafic vers LAN

## **WireGuard**

### 🧱 **1. Installation de WireGuard sur pfSense**

1. Va dans **System → Package Manager → Available Packages**.
2. Recherche **WireGuard** et clique sur **Install**.
3. Une fois installé, va dans **VPN → WireGuard**.

### 🔧 **2. Création d’un tunnel WireGuard (sur pfSense)**

1. Clique sur **Tunnels**, puis sur **Add Tunnel**.
2. **Activer** : coche `Enable WireGuard`.
3. **Description** : par exemple `Tunnel-TP8`.
4. **Listen Port** : laisse `51820` (par défaut).
5. Clique sur **Generate** :
    - La **clé privée** sera générée automatiquement (non visible).
    - La **clé publique** s’affichera → **copie-la**, elle sera utilisée côté client.
6. **Address** : ex. `172.40.200.1/24` → c’est l’IP que prendra le pfSense dans le VPN.
💾 Clique sur **Save**.

### 👤 **3. Ajout du client (Peer)**

1. Va dans l’onglet **Peers** → **Add Peer**.
2. **Enable Peer** : coche.
3. **Tunnel** : sélectionne le tunnel précédemment créé.
4. **Description** : ex. `Client-Linux`.
5. **Public Key** : colle la clé publique du client (à créer dans l’étape suivante).
6. Laisse `Dynamic Endpoint`, `Keep Alive` si nécessaire.
💾 Clique sur **Save**.

### 🖥️ **4. Configuration du client Linux**

1. Installe WireGuard : 
    `sudo apt install wireguard`
    
2. Génére les clés :
    `wg genkey | tee privatekey | wg pubkey > publickey`
    
3. Crée le fichier `/etc/wireguard/wg0.conf` :

```bash
  [Interface]
Address = 10.200.200.2/24
PrivateKey = <contenu de privatekey>
ListenPort = 51820

[Peer]
PublicKey = <clé publique du pfSense>
Endpoint = <IP_publique_pfSense>:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
  
```
    
4. Active le routage (si nécessaire) :
    
```bash
echo 'net.ipv4.ip_forward=1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### ▶️ **5. Démarrage et vérification**

Démarre le tunnel :
```bash
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0

# Vérifier l'état
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

### 🔥 **6. Firewall & NAT (pfSense)**

1. Va dans **Firewall → Rules → WAN**.
2. Ajoute une règle pour autoriser le port UDP `51820`.

### ✅ **7. Test de connectivité**

- Depuis le client Linux, ping une IP de ton LAN interne via le tunnel.
- Vérifie que tu peux accéder à un service dans ta DMZ ou réseau local sécurisé.

## **Tunnel VPN Site à site** avec IPSEC

### 🛠 **1. Phase 1 – Tunnel IKE (Internet Key Exchange)**

#### 📍Objectif :

Négocier les paramètres de sécurité (algorithmes, méthodes d’authentification...) et établir des clés de session.
#### 🔧 Étapes :
1. Aller dans `VPN > IPsec > Tunnels`
2. Cliquer sur **"Ajouter P1"**
3. Renseigner :
    - **Description** : TunnelA
    - **Version de l’échange de clés** : IKEv2
    - **Protocole Internet** : IPv4
    - **Interface** : WAN
    - **Passerelle distante** : IP publique de l’autre site (ex. 192.168.150.200)
4. Authentification :
    - **Méthode** : PSK mutuel
    - **Mon identifiant** : Mon adresse IP
    - **Identifiant pair** : Adresse IP distante
    - **Clé pré-partagée** : Générer une clé ou en définir une manuellement (ex: `P@ssw0rd`), **doit être identique sur les deux routeurs**
5. Laisser les autres paramètres par défaut, puis cliquer sur **"Enregistrer"**

### 🛠 **2. Phase 2 – Tunnel IPsec (le tunnel de données)**

#### 📍Objectif :

Utiliser les clés de la phase 1 pour chiffrer les données, assurer l’intégrité et fournir une authentification.
#### 🔧 Étapes :
1. Sur la ligne de votre tunnel P1 nouvellement créé, cliquer sur **"Ajouter P2"**
2. Renseigner :
    - **Description** : TunnelAIpse
    - **Mode** : Tunnel IPv4
    - **Phase 1** : TunnelA
3. Configuration réseau :
    - **Réseau local** : LAN local (ex. LANSERVER subnet)
    - **Réseau distant** : LAN distant (ex. 172.20.200.128/26)
4. Authentification :
    - **Protocole P2** : ESP
    - **Transformations P2** : AES 128 bits (ou AES128-GCM selon vos besoins)
    - **Méthode d’authentification** : SHA256
5. Enregistrer.

### 🔥 **3. Pare-feu – Autoriser le trafic**
1. Aller dans `Pare-feu > Règles > IPsec`
2. Créer une règle :
    - **Source** : sous-réseau distant (ex. 172.20.200.128/26)
    - **Destination** : LAN local (ex. LANSERVER subnet)
    - Action : **Passer**

### 📊 **4. Vérification**

1. Réaliser la **même configuration** sur l’autre routeur avec les IP inversées.
2. Aller dans `Status > IPsec > Vue d'ensemble`
3. Vérifier que les tunnels sont **"Connectés"**