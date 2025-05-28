
# 🔐 Gestion des PKI sous Windows Server
## 🌍 Certificats publics vs internes

**Certificat numérique** : Fichier contenant : clé publique, nom du sujet, période de validité, signature de l’AC

**AC (Autorité de Certification)** : Entité de confiance qui signe les certificats (ex : DigiCert, Let's Encrypt, interne)

<!-- tabs:start --> 
###  **🌐 Certificats publics**
- Émis par une **autorité de certification (CA) publique** (ex : Sectigo, DigiCert, Let’s Encrypt)
- Reconnu par les navigateurs sans action côté client
- 💰 Souvent payant, sauf Let’s Encrypt
    

###  **🏢 Certificats internes (PKI d’entreprise)**
- Émis par ton propre **serveur d’autorité de certification interne (AC)**
- ⚙️ Intégré à l’Active Directory (déploiement automatique du certificat racine)
- ❌ Non utilisables en dehors du réseau interne sans configuration spécifique
<!-- tabs:end --> 

## 🧾 Qu’est-ce qu’une PKI ?

Une **PKI** (_Public Key Infrastructure_) permet :
- De **générer, délivrer et gérer** des certificats numériques
- De garantir la **confiance**, l’**authenticité** et le **chiffrement** dans les échanges
- D’être utilisée pour : 🔐 HTTPS, 📧 mail chiffré, 🖥️ authentification réseau

## 🛠️ Installation d’une PKI Microsoft (AD CS)

L'AD CS permet de générer des certificats qu'on pourra utiliser pour tous les services internes (web, exchange...)
### Prérequis :
- Serveur Windows avec AD
### Étapes :

1. 🎯 **Ajout du rôle** :
    - Service de certificats Active Directory (AD CS)
    - Fonctionnalités associées (par défaut)
    
2.  **Sélection des services ADCS**
	- **Autorité de certification** (obligatoire) ✅
	- (Facultatif selon besoin) : Web Enrollment ✅, Online Responder
		
3. ⚙️ **Configuration post-installation** :
    - Choix de type :
        - **AC d’entreprise** (avec AD) ✅
        - **AC autonome** (sans AD)
            
    - Choix du rôle :
        - **AC racine** (principale)
        - **AC secondaire** (de secours)
            
    - Génération ou import de la **clé privée
	    - Choix du chiffrement et longueur de clé (RSA 2048+ bits, SHA256)
	    - Spécifier le **nom de l'AC** (si AC autonome)
	    - **Durée de validité** du certificat racine

4. ✅ **Vérification via MMC** :
    - `certsrv.msc` (console AC)
	- Console : **Certification Authority** → vérifier le service et les modèles de certificats disponibles

**Le service est disponible sur :**  `http://<nom_du_serveur>/certsrv`

## 📄 Délivrance d’un certificat Serveur Web (HTTPS) via PKI interne sous IIS

<!-- tabs:start --> 
### **🧩 Préparation côté PKI**
#### Créer un modèles de certificats IIS

1. Dans la console **“Autorité de certification”**
2. Cliquer sur la clé privée correspondant à notre besoin
3. Clique droit sur **Modèles de certificats** → **Gérer**
4. Clique droit sur **Serveur Web** → **Dupliquer**
5. Nomme et configure le nouveau modèle (ex : `Web-IIS-Cert`)
	 - Dans général : Indiquer le FQDN du serveur web / publier dans l'AD
	 - Dans sécurité : Ajouter le serveur membre en lecture et inscrire
6. Valider
#### Publier le modèle

1. Retourne dans **certsrv.msc**
2. Clique droit sur **Modèles de certificats** → **Nouveau** → **Certificat à délivrer**
3. Sélectionne le modèle créé (`Web-IIS-Cert`) → OK

### **🌐 Demande et installation depuis IIS**

<!-- tabs:start --> 
#### **Méthode via console MMC (recommandé)**

1. `mmc.exe` → **Ajouter un composant logiciel enfichable**
2. Sélectionne **Certificats** → pour **Compte d’ordinateur**
3. Va dans **Personnel → Certificats**
4. Clique droit → **Toutes les tâches → Demander un nouveau certificat**
5. Sélectionne le modèle `Web-IIS-Cert` (apparaît automatiquement si PKI bien configurée)
6. Renseigne les informations : 
	1. **FQDN du site** (ex : `glpi.tssr.lcl`) dans nom commun
	2. Renseigner le **DNS** 
	3. Indiquer un nom convivial dans l'onglet général
7. Finalise la demande → le certificat est émis et stocké localement

#### **Via IIS Manager**

- Clique sur le **nom du serveur** dans IIS
- Va dans **Certificats de serveur**
- Clique sur **Créer une demande de certificat…**
- Remplis les infos (CN, orga, etc.)
- IIS génère un fichier CSR (``.req``)

🎯 Tu dois ensuite :
- **Envoyer la CSR** à une **autorité de certification (interne ou publique)** via : 

<!-- tabs:start --> 
##### **Interface Web Certsrv**

> Requiert que le **service "Service Web de l’autorité de certification"** soit installé sur le serveur PKI.

 Étapes :

1. Ouvre ton navigateur sur **SRV_IIS**
2. Accède à l'URL suivante : http://SRV_PKI/certsrv
3. Identifie-toi avec un compte AD autorisé
4. Clique sur **"Demander un certificat"**
5. Clique sur **"Soumettre une requête avancée"**
6. Ouvre la CSR générée par IIS (fichier `.req` ou `.txt`) avec Notepad
7. Copie-colle le contenu dans le champ de saisie
8. Sélectionne un **modèle de certificat** (si requis)
9. Clique sur **Soumettre**

➡️ La PKI te délivre le **certificat `.cer`** immédiatement ou après validation par un administrateur.
##### **Méthode manuelle**

- Transférer la CSR à un admin PKI par **email**
- Déposer la CSR sur un **partage réseau**
- Utiliser une clé USB (sur réseau isolé)

<!-- tabs:end --> 

- Puis **revenir dans IIS** → **Terminer la demande** avec le fichier `.cer` reçu

<!-- tabs:end --> 

### **🔒 Liaison dans IIS**

1. Ouvre le **Gestionnaire IIS**
2. Va sur ton site web → clique sur **Liaisons**
3. Clique sur **Ajouter...**
    - Type : `https`
    - Port : `443`
    - Certificat SSL : choisis le certificat nouvellement délivré
4. Valide

<!-- tabs:end --> 

## 🔐 Délivrance d’un certificat HTTPS via PKI interne sous Apache

### 🧰 Pré-requis

- Un serveur Apache fonctionnel sur Linux
- Une autorité de certification interne Windows (PKI)
- Le port HTTPS (443) ouvert
- Le FQDN (nom DNS) résolu correctement par le client
- Le module `mod_ssl` activé sous Apache

### 1️⃣ Création du fichier de configuration de la CSR

```ìni
[ req ]
default_bits        = 2048
distinguished_name  = dn
prompt              = no
default_md          = sha256
req_extensions      = req_ext

[ dn ]
C                   = FR
L                   = Nantes
O                   = ENI
CN                  = intra.rouliere.eni

[ req_ext ]
subjectAltName      = @alt_names

[ alt_names ]
DNS.1               = intra.rouliere.eni
```

📌 _⚠️ Le champ `CN` et `DNS.1` doivent correspondre au FQDN du site déclaré dans ton DNS interne !_

### 2️⃣ Générer la clé privée (si pas encore faite)
```bash
openssl genrsa -out intra.rouliere.eni.key 2048
```

### 3️⃣ Générer la demande de certificat (CSR)

```bash
openssl req -new -key intra.rouliere.eni.key -out intra.rouliere.eni.pem -config fic.txt
```

### 4️⃣ Soumettre la CSR à la PKI interne

1. Ouvre un navigateur sur un PC dans le domaine
2. Va sur : `http://<AD-CA>/certsrv`
3. Clique sur **"Demander un certificat" → Demande avancée**
4. Colle la CSR (contenu de `intra.rouliere.eni.pem`)
5. Sélectionne le modèle de certificat **Serveur Web**
6. Clique sur **Envoyer**
### 5️⃣ Télécharger le certificat et le copier sur le serveur apache

- Choisir **Codage Base 64**
- Télécharger le certificat → `intra.rouliere.eni.cer`
- Renomme le fichier pour plus de lisibilité
- Depuis Windows, envoie-le vers le serveur Apache :

```bash
scp .\intra.rouliere.eni.cer user@linux:/tmp
```

### 6️⃣ Installer le certificat sur le serveur Apache

```bash
mv /tmp/intra.rouliere.eni.cer /etc/ssl/intra.rouliere.eni/
```

### 7️⃣ Modifier la configuration Apache

Dans le fichier : /etc/apache2/sites-available/intra.rouliere.eni.conf

```apache
<VirtualHost *:443>
    ServerName intra.rouliere.eni

    SSLEngine on
    SSLCertificateFile /etc/ssl/intra.rouliere.eni/intra.rouliere.eni.cer
    SSLCertificateKeyFile /etc/ssl/intra.rouliere.eni/intra.rouliere.eni.key

    DocumentRoot /var/www/intra.rouliere.eni
</VirtualHost>
```

### 8️⃣ Vérification et redémarrage Apache

```apache
apache2ctl configtest
# Doit répondre : Syntax OK

systemctl reload apache2
```

### 9️⃣ Installer le certificat racine de la PKI sur le client

Depuis le navigateur :
1. Accède à `http://<AD-CA>/certsrv`
2. Clique sur **"Télécharger un certificat d’autorité"**
3. Installe-le dans le magasin **Autorités de certification racines de confiance**

## 🔐 Mise en place d’un certificat émanant d’un PKI Windows pour pfSense

### 🧩 **Étape 1 : Exporter le certificat de l’autorité de certification**

1. Aller sur le serveur Windows avec la **PKI AD CS**.
2. Ouvrir **certsrv.msc**, clic droit sur l’AC → **Propriétés**.
3. Onglet **Affichage du certificat** → Exporter :
    - Format : **X.509 encodé en base 64** (`.cer`)
    - Nom : `ca.cer`
4. Ouvrir ce fichier avec le **Bloc-notes**.
5. Copier **tout le contenu** depuis `-----BEGIN CERTIFICATE-----` jusqu’à `-----END CERTIFICATE-----`.

### 🔐 **Étape 2 : Ouvrir le port 636 (LDAPS)**

1. Sur le **pare-feu Windows** du serveur AD :
    - Autoriser une **règle entrante TCP sur le port 636**.
        
2. Vérification :
    - Lancer `ldp.exe`
    - Connexion → Serveur = `fqdn_serveur_AD`, Port = `636`, cocher **SSL**
    - Le message "Established connection..." doit s'afficher.


### ⚙️ **Étape 3 : Configurer pfSense**

##### 🧭 A. Vérifier la configuration DNS
1. Dans **Systeme > General Setup** :
    - **Hostname** : ex. `router`
    - **Domain** : ex. `rouliere.eni`
    - **DNS** : IP de votre **serveur AD** (ex. `172.20.200.150`)

##### 🛡️ B. Importer l’autorité de certification

1. Aller dans **System > Cert. Manager > Authorities**.
2. Cliquer sur **Add** :
    - **Descriptive name** : `SRV-CD.rouliere.eni`
    - **Method** : _Import an existing certificate authority_
    - Coller le **contenu copié du certificat CA** dans le champ correspondant.
    - Cocher **Add this CA to the OS trust store**.
    - Enregistrer.

### 📡 **Étape 4 : Créer une liaison LDAPS vers l’Active Directory**

1. Aller dans **System > User Manager > Authentication Servers** → Add :
    - **Name** : `SRV-CD.rouliere.eni`
    - **Type** : LDAP
    - **Hostname / IP** : `srv-cd.rouliere.eni`
    - **Port value** : `636`
    - **Transport** : `SSL/TLS Encrypted`
    - **Peer Certificate Authority** : sélectionner le **CA précédemment importé**
2. **Base DN** : `DC=rouliere,DC=eni`
3. **Bind credentials** 
    - DN : `CN=Administrateur,CN=Users,DC=rouliere,DC=eni`
    - Password : mot de passe de l’utilisateur
4. **User naming attribute** : `samAccountName
5. **Group naming attribute** : `cn`
6. Enregistrer.

### ✅ **Étape 5 : Tester la liaison LDAP**

1. Aller dans **Diagnostics > Authentication**.
2. Choisir le **serveur LDAP configuré**.
3. Entrer un **utilisateur AD valide** + mot de passe.
4. Cliquer sur **Test**.
    - Le message "authentifié avec succès" doit s’afficher.


### 📜 **Étape 6 : Générer une demande de certificat dans pfSense**

1. Aller dans **System > Cert. Manager > Certificates**.
2. Cliquer sur **Add/Sign** :
    - **Method** : Create a Certificate Signing Request
    - **Descriptive name** : `router.rouliere.eni
    - **Common Name** : `router.rouliere.eni` (important)
    - **Type** : Server Certificate
    - **SAN** : ajouter si besoin
3. Enregistrer, puis **copier la demande de signature (CSR)** affichée.

### 🌐 **Étape 7 : Générer le certificat sur la PKI**

1. Accéder à l’interface web de votre PKI interne (ex: `http://srv-cd/certsrv`).
2. Choisir **demande avancée** → coller la **CSR** générée.
3. Sélectionner **Modèle : Serveur Web** → Valider.
4. Télécharger le certificat généré **en Base 64 (.cer)**.
5. Ouvrir avec Bloc-notes → copier tout le contenu `BEGIN CERTIFICATE`.

### 🧩 **Étape 8 : Importer le certificat final dans pfSense**

1. Retourner dans **System > Cert. Manager > Certificates**.
2. Modifier le certificat `router.rouliere.eni` → coller le contenu du certificat signé dans **"Certificate data"**.
3. Enregistrer.

### 🔒 **Étape 9 : Activer HTTPS avec le certificat dans pfSense**

1. Aller dans **System > Advanced > Admin Access**.
2. Sélectionner :
    - **Protocol** : HTTPS
    - **SSL Certificate** : `router.rouliere.eni`
3. Vider les sessions SSL si nécessaire → **se reconnecter avec le cadenas sécurisé**.




















## 📌 Bonnes pratiques professionnelles

- Toujours utiliser des **clés RSA ≥ 2048 bits** et SHA256 ou plus
- Protéger l’accès à la **CA racine** (hors ligne, sauvegardée)
- Documenter chaque certificat émis (nom, date, usage, durée, CA utilisée)
- Automatiser le **renouvellement** via scripts ou GPO
- Privilégier l’usage de **modèles de certificats** adaptés à chaque rôle
- Mettre en place un système de **supervision de l’expiration des certificats**