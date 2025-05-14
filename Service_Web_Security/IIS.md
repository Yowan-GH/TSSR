
# 🌐 IIS

## 🚀 Introduction

**IIS** (Internet Information Services) est un serveur web développé par Microsoft. Il permet d’héberger des sites web, des services web, et des applications. Il fonctionne uniquement sur les systèmes d’exploitation Windows.

🔍 **Versions majeures** :
- IIS 6.0 (Windows Server 2003)
- IIS 7.5 (Server 2008 R2 / Windows 7)
- IIS 10.0 (Windows Server 2016 / Windows 10)

---
## ⚙️ Installation

### Depuis le gestionnaire de serveur :
- Accès à **Ajouter des rôles et fonctionnalités**
- Sélection du **rôle IIS**
- Ajouter les **fonctionnalités** recommandées (gestion web, compatibilité avec les versions précédentes, compression, etc.)

### Vérification dans un navigateur :
```http
http://localhost
http://127.0.0.1
http://@IP
```

### Répertoires :
- Dossier racine : `C:\inetpub\`
- Site par défaut : `C:\inetpub\wwwroot\`

### Fonctions supplémentaires d’IIS

Quelques **fonctionnalités utiles** à ajouter : 
- **Répertoires virtuels** : Utilisés pour mapper un dossier externe à une URL
	- Dans IIS : clic droit sur site > Ajouter un répertoire virtuel
- **Journaux (Logs)** : Par défaut dans C:\inetpub\logs\LogFiles
- **Compression** :  Active la compression statique et dynamique pour les contenus web
	- **Gain de bande passante**

---
## 🛠️ Configuration

Voici les principaux éléments à configurer dans le Gestionnaire des services Internet (IIS) :

- **Documents par défaut**
    - Liste des fichiers de démarrage (ex : index.html)
        
- **Authentification**
    - Anonyme, Windows, Basic, Digest, etc.
        
- **Gestion des certificats**
    - Création de certificats autosignés
    - Liaison de certificats SSL
        
- **Exploration de répertoires**
    - Activation/désactivation de l’affichage du contenu d’un dossier
        
- **Gestion des sites web**
    - Création, suppression, édition, liaisons IP/port/FQDN

## 🌐 Création et sécurisation d’un site web

1. Accéder au Gestionnaire IIS
2. Clic droit → **Ajouter un site web**
3. Remplir les champs :
    - Nom du site
    - Répertoire local (ex : `C:\inetpub\MON_SITE`)
    - Adresse IP (si spécifique)
    - Port (ex : 80)
    - FQDN (nom de domaine)

## 🧰 Web Plateforme Installer (WebPI)

Le **Web Platform Installer** (WPI) est un outil Microsoft intégré à IIS permettant :
- D’installer des **composants web** (PHP, MySQL, ASP.NET…)
- De déployer rapidement des **applications open source** (WordPress, Joomla!...)

Pour y accéder : 
- **Gestionnaire des services Internet (IIS)**
- Clique sur **le nom de ton serveur** (niveau racine dans l’arborescence de gauche)
- Dans le panneau central, tu verras l’icône **“Web Platform Installer”** (si installé)
- Clique dessus pour l’ouvrir


## 🔐 Certificats SSL et HTTPS

<!-- tabs:start --> 
### **🔧 Certificat autosigné**

Dans le **gestionnaire IIS** :
1. Va dans **"Certificats de serveur"**
2. Clique sur **"Créer un certificat autosigné"**
3. Donne un nom (ex : `www.tssr.lcl`)
4. Choisis le **magasin de certificats** : _Hébergement Web_

✔️ Le certificat est alors disponible pour une liaison HTTPS.

### **📌 Certificat de domaine**

#### Créer une **demande de certificat (CSR)**
1. Ouvre **Gestionnaire des services IIS**
2. Clique sur **le nom du serveur** (niveau racine)
3. Clique sur **Certificats de serveur**
4. À droite, clique sur **Créer une demande de certificat...**
5. Remplis les infos :
    - Nom commun (FQDN du site, ex : `www.monsite.lcl`)
    - Organisation, unité, pays, etc.
        
6. Sélectionne :
    - Cryptographie : RSA, 2048 bits (par défaut)
    - Fichier de sortie (ex : `C:\Temp\ma_demande.csr`)

👉 Ce fichier `.csr` est à **envoyer à la CA** (Let’s Encrypt, OVH, etc.).

#### Installer un **certificat de domaine** (fourni par une CA)

1. Tu reçois un fichier `.cer` ou `.crt` de la CA
2. Retourne dans **Certificats de serveur**
3. Clique sur **Terminer la demande de certificat...**
4. Sélectionne le fichier reçu
5. Indique un nom convivial
6. Choisis le magasin **“Web Hosting”** (ou “Personnel” si besoin)

👉 Le certificat est maintenant **installé dans IIS**, prêt à être lié à ton site (via liaisons HTTPS).

### **🌐 Liaison du certificat au site**

1. Va sur le site dans le gestionnaire IIS
2. Clique sur **"Liaisons"**
3. Clique sur **Ajouter...**
4. Paramètres :
    - **Type** : `https`
    - **Port** : `443`
    - **Nom de l’hôte** : `glpi.tssr.lcl`
    - **Certificat SSL** : sélectionne le certificat 

Le site est désormais accessible en **http** et **https**

<!-- tabs:end --> 

## ✅ ProTips TSSR

💡 Utilise PowerShell pour automatiser l’installation IIS :
```powershell
Install-WindowsFeature -name Web-Server -IncludeManagementTools
```

💡 Pour les tests internes :
- Utilise `localhost` ou `127.0.0.1`
- Vérifie toujours le port (80 pour http, 443 pour https)

💡 IIS est utile pour simuler des **serveurs web en entreprise** (tests d'intranet, GLPI, sites internes...)

💡 Pense à la sécurité :
- Désactive l’exploration de répertoire
- Crée des **certificats valides** pour éviter les alertes navigateur
