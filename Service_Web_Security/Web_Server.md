# **Découverte et installation de serveurs web**  
**Services web et sécurité**  

## 🌐 **Fonctionnement d'un serveur web**  
### 📌 **Définition**  
Un serveur web est une machine qui :  
- Héberge du contenu (HTML/CSS/JS) 📂  
- Répond aux requêtes **HTTP/HTTPS** via un navigateur 🌍  
- Fonctionne sur un réseau **public (Internet)** ou **privé (Intranet)**  

### 🛠️ **Serveurs populaires**  
- **Apache** : Historique, modulaire 🏗️  
- **NGINX** (engine X): Performant, léger ⚡  
- **IIS** : Solution Microsoft 🖥️  

### 🔄 **Processus d'accès à un site**  
1. **Utilisateur** saisit une URL (FQDN ou adresse IP) 
2. Le **navigateur** interroge un **serveur DNS** pour résoudre l'adresse IP 🕵️♂️
3. Le **navigateur** interroge le serveur web via l'adresse IP
4. Le **serveur web** renvoie la page demandée (ex: `index.html`) 📄  
5. On peux acceder à un site via : 
	- FQDN
	- IP
	- FQDN ou IP + Port

---

## 🔒 **Certificats et HTTPS**  
### 📜 **Qu'est-ce qu'un certificat ?**  
- **Carte d'identité numérique** du serveur 🆔  
- **Contient** :  
  - Nom du titulaire, autorité de certification (AC), numéro de série, dates de validité 📅  
  - Clé publique, algorithme de chiffrement 🔑  

### 🔄 **Fonctionnement HTTPS**
1. Le client (navigateur) demande une ressource en HTTPS.
2. Le serveur envoie son certificat.
3. Le navigateur vérifie la validité du certificat (via une autorité de certification).
4. Si valide ➜ communication sécurisée.

### 🔐 **Rôles du certificat**  
- **Authentifie** le serveur (évite les attaques "man-in-the-middle") 🛡️  
- **Active le HTTPS** : Chiffre les données échangées 💳  

### 🏷️ **Types de certificats**  
| Type            | Usage            | Avantages/Inconvénients             | Durée de validité                                        |
| --------------- | ---------------- | ----------------------------------- | -------------------------------------------------------- |
| **Autosigné**   | Tests internes � | Gratuit, mais non reconnu ❌         | **1 jour à 10 ans** (déconseillé)                        |
| **AC Interne**  | Entreprises 🏢   | Contrôle total, limité au réseau 🔒 | **1 à 3 ans** ⚠️                                         |
| **AC Publique** | Sites publics 🌐 | Reconnu universellement ✅           | **90 jours** (Let's Encrypt) à **398 jours** (autres AC) |
 
## 🔐 **Protocoles SSL/TLS**  
### ⏳ **Évolution**  
- **SSL** (Secure Socket Layer) (1994-1996) : Déprécié �  
- **TLS** (Transport Layer Secure) (1999→) : Versions 1.0 → **1.3** (le plus sécurisé) 🛡️  

### 🎯 **Fonctions clés**  
1. **Authentification** via certificat - vérification de l'identité du serveur 
2. **Chiffrement** des données (AES) - Assure la confidentialité 
3. **Intégrité** (algorithme de hash)  - Garantie de la validité des données

### 🔒 **SSL vs TLS : Protocoles de Sécurité Web**

<!-- tabs:start --> 
####  **🛡️SSL (Secure Socket Layer)**
- **Fonction principale** :  
  - Chiffrement des données échangées  
  - Authentification des serveurs  
- **Statut** : **Déprécié** ❌ (vulnérabilités connues)  
- **Usage historique** :  
  - Sécurisation des transactions bancaires en ligne 🏦  
  - Protection des formulaires de connexion 🔑  

####  **🚀 TLS (Transport Layer Security)**
- **Évolution** : Successeur direct de SSL (plus sécurisé)  
- **Améliorations** :  
  - Correctifs des failles SSL  
  - Algorithmes de chiffrement renforcés 🔐  
- **Recommandation** : **Toujours privilégier TLS** ✅  
<!-- tabs:end --> 
## 🛠️ **ProTips pour l'entreprise**  
- **Prioriser NGINX** pour les hautes performances (load balancing inclus) ⚡  
- **Automatiser le renouvellement** des certificats avec Let's Encrypt + Cron 🚀  
- **Désactiver SSL/TLS 1.0/1.1** dans les configurations serveur (PCI DSS l'exige) 🛑  
	- **Désactivez SSL** dans vos serveurs web :  
		- Apach : ``SSLProtocol all -SSLv2 -SSLv3``
- **Utiliser OpenSSL** pour vérifier un certificat :  
	-   ``openssl x509 -in certificat.pem -text -noout``
