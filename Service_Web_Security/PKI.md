
# 🔐 Gestion des PKI sous Windows Server

## 🧾 Qu’est-ce qu’une PKI ?

Une **PKI** (_Public Key Infrastructure_) permet :
- De **générer, délivrer et gérer** des certificats numériques
- De garantir la **confiance**, l’**authenticité** et le **chiffrement** dans les échanges
- D’être utilisée pour : 🔐 HTTPS, 📧 mail chiffré, 🖥️ authentification réseau

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

## 📄 Délivrance d’un certificat Serveur Web (HTTPS) via PKI interne

<!-- tabs:start --> 
### **🧩 Préparation côté PKI**
#### Créer un modèles de certificats IIS

1. Dans la console **“Autorité de certification”**
2. Cliquer sur la clé privée correspondant à notre besoin
3. Clique droit sur **Modèles de certificats** → **Gérer**
4. Clique droit sur **Serveur Web** → **Dupliquer**
5. Nomme et configure le nouveau modèle (ex : `Web-IIS-Cert`)
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
6. Renseigne le **FQDN du site** (ex : `glpi.tssr.lcl`)
7. Finalise la demande → le certificat est émis et stocké localement

#### **Via IIS Manager**

- Clique sur le **nom du serveur** dans IIS
- Va dans **Certificats de serveur**
- Clique sur **Créer une demande de certificat…**
- Remplis les infos (CN, orga, etc.)
- IIS génère un fichier CSR (``.req``)

🎯 Tu dois ensuite :
- **Envoyer la CSR** à une **autorité de certification (interne ou publique)**
- Puis **revenir dans IIS** → **Terminer la demande** avec le fichier `.cer` reçu
<!-- tabs:end --> 

## **🔒 Liaison dans IIS**

1. Ouvre le **Gestionnaire IIS**
2. Va sur ton site web → clique sur **Liaisons**
3. Clique sur **Ajouter...**
    - Type : `https`
    - Port : `443`
    - Certificat SSL : choisis le certificat nouvellement délivré
4. Valide

<!-- tabs:end --> 

## 📌 Bonnes pratiques professionnelles

- Toujours utiliser des **clés RSA ≥ 2048 bits** et SHA256 ou plus
- Protéger l’accès à la **CA racine** (hors ligne, sauvegardée)
- Documenter chaque certificat émis (nom, date, usage, durée, CA utilisée)
- Automatiser le **renouvellement** via scripts ou GPO
- Privilégier l’usage de **modèles de certificats** adaptés à chaque rôle
- Mettre en place un système de **supervision de l’expiration des certificats**