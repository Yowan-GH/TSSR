# Publication d’applications – RemoteApp

## 🔗 Principe de fonctionnement
1. L’application est **hébergée** sur un serveur RD Session Host.
2. Elle est **publiée** via le Gestionnaire de serveur ou PowerShell.
3. L’utilisateur y accède :
    - depuis le **menu Démarrer** (via RemoteApp & Desktop Connections),
    - ou via le **portail RD Web Access** (`https://serveur/RDWeb`),
    - ou encore via un **fichier .RDP**.

🧠 Les données et traitements restent côté serveur. Seule l’interface est redirigée.

### ✅ Avantages pour l’entreprise
- 🛠️ **Facilité de mise à jour** : une seule instance de l’application à maintenir.
- 🔐 **Sécurité** : les fichiers de l’utilisateur restent sur le serveur.
- 🚀 **Performance** : même un poste peu puissant peut utiliser une application lourde.
- 🌍 **Mobilité** : accès à l’application depuis n’importe quel poste, même distant.

## 🛠️ Étapes de publication d'applications RemoteApp

Une fois la collection créée, tu peux publier des applications à distance via la fonction **RemoteApp**. Voici la procédure depuis l'interface graphique de Windows Server.

### ✅ Étape 1 : accéder à la collection

1. Ouvre le **Gestionnaire de serveur**.
2. Va dans **Services Bureau à distance > Collections**.
3. Sélectionne la **collection concernée**.
4. Dans la section **PROGRAMMES REMOTEAPP**, clique sur **Publier des programmes RemoteApp**.

### ✅ Étape 2 : choix des applications

1. L’assistant liste les programmes installés sur le serveur.
2. ✅ **Coche** les applications que tu souhaites publier.
3. ➕ Clique sur **Ajouter** pour aller chercher un exécutable qui **n'apparaît pas dans la liste** (ex : programme installé dans un répertoire personnalisé).

### ✅ Étape 3 : finalisation

- Les programmes sélectionnés seront automatiquement :
    - rendus disponibles via le portail **RD Web Access**,
    - **synchronisés** dans les connexions RemoteApp sur les postes clients si la source RDWeb est configurée.

🧠 **Bonnes pratiques** :
- Ne publier que les **applications nécessaires**.
- Vérifier que les utilisateurs ont les **droits NTFS** pour accéder aux exécutables.
- Prévoir un **certificat valide** pour éviter les avertissements lors de l’ouverture.

## 🧑‍💼 Mise à disposition des programmes publiés

Une fois les applications RemoteApp publiées sur le serveur RDS, l’utilisateur final peut y accéder de plusieurs manières simples et sécurisées. Voici les deux méthodes principales 👇

### 🌐 1. Accès via le portail web (RD Web Access)

- Le service **RDS Web Access** (RDS-Web-Access) doit être installé.
- Il repose sur **IIS** (Internet Information Services).
- Une fois configuré, l’utilisateur accède au portail via l’adresse suivante : ``https://nom_du_serveur/RDWeb`
- L'utilisateur s’authentifie avec ses identifiants AD.
- Il voit une interface **Work Resources** listant les applications publiées.
- Il peut lancer les applications directement depuis le navigateur.

> 🧠 Pratique pour un accès distant ou pour des utilisateurs nomades.


### 🖥️ 2. Connexions RemoteApp et Bureau à distance (Client local)

- Outil accessible depuis :
    - le **menu Démarrer**,
    - ou le **Panneau de configuration**.
- Il permet de configurer un **abonnement RemoteApp** via une URL du type :
  ``https://nom_FQDN_du_serveur/RDWeb/Feed/webfeed.aspx``
- 💡 Cette URL peut être déployée automatiquement via une **stratégie de groupe (GPO)**.

### 📂 Résultat utilisateur

- Les raccourcis vers les applications publiées apparaissent dans le menu Démarrer, sous un dossier nommé **"Work Resources (RADC)"**.
- L’utilisateur peut lancer les applis comme si elles étaient installées localement.


## ⚙️ Configuration avancée des collections RDS

Chaque **collection RDS** dispose d’un ensemble de **paramètres personnalisables** qui influencent l’expérience utilisateur, les droits d’accès, et les performances globales de la plateforme.
### 🧩 Paramètres globaux de la collection

Ces paramètres sont accessibles depuis :
> **Gestionnaire de serveur > RDS > Collections > Propriétés**

Voici ce que tu peux configurer 👇

- 👥 **Utilisateurs autorisés**  
    ➤ Définir précisément les groupes ou utilisateurs AD pouvant se connecter.
    
- 🔄 **Paramètres de session**  
    ➤ Durée d’inactivité, reconnexion automatique, expiration des sessions, etc.
    
- 🔐 **Paramètres de connexion**  
    ➤ Contrôles liés à la sécurité réseau, à l'authentification, aux redirections.
    
- 💾 **Disques de profil utilisateur**  
    ➤ Permet de **centraliser les profils utilisateurs** sur le serveur, tout en conservant leurs paramètres d’une session à l’autre.
    
### 🧠 Configuration par application

Chaque application RemoteApp peut aussi être configurée indépendamment :
- Délégation de droits,
- Restrictions d’accès spécifiques,
- Contrôle de l’expérience utilisateur.

> Cela permet une **granularité fine** dans la gestion des ressources partagées.


## 🔐 Filtrage et restrictions des programmes RemoteApp

Une fois les applications publiées, tu peux restreindre leur **visibilité** et **accessibilité** aux utilisateurs spécifiques, selon deux niveaux de configuration.

### 🎛️ Filtrage global depuis la collection

Depuis les **propriétés de la collection**, tu peux définir :
- les **groupes ou utilisateurs AD autorisés** à voir **tous les programmes RemoteApp** associés à cette collection.
    
👥 Exemple : seuls les membres du groupe `Utilisateurs_Bureautique` peuvent voir LibreOffice et Word.
### 🎯 Filtrage individuel par programme

Chaque programme publié via RemoteApp dispose aussi de **ses propres paramètres d'affectation**.

Depuis les **propriétés du programme**, tu peux :
- spécifier **quels utilisateurs/groupes** ont accès à **ce programme uniquement**,
- faire en sorte que seuls **certains utilisateurs voient l’icône** dans le portail RD Web ou le menu démarrer.

> 🔐 Cela permet de gérer des accès très ciblés : un utilisateur voit **uniquement** les applications qui le concernent.

### 🧠 Astuce pro

Tu peux **cumuler** les deux niveaux :
- collection = filtre large (ex : département RH),
- programme = filtre fin (ex : seuls certains membres du département).

## 🧭 Pour aller plus loin avec RDS

### 🔐 Authentification unique (SSO)

Le **Single Sign-On (SSO)** permet à l’utilisateur d’ouvrir une session distante **sans ressaisir son mot de passe**.

- 📜 Configuré via **stratégie de domaine** (GPO).
- 🔧 Activer le paramètre :  
    **"Autoriser la délégation d’informations d’identification par défaut"**.

🎯 Objectif : supprimer la **double authentification** à chaque ouverture de session RDS.

### 🪪 Gestion des licences (CAL RDS)

- Chaque utilisateur ou appareil doit disposer d’une **licence d’accès client (CAL)** spécifique à RDS.
- Le rôle **Gestionnaire de licences des services Bureau à distance** doit être installé.
- ⚠️ Une **période de grâce de 120 jours** permet l'utilisation sans licence.

> 🧠 En environnement pro, les CAL RDS sont souvent achetées par volume (Open License, CSP...).

### 🌍 Accès distant sécurisé – Rôle **RD Gateway**

- Permet aux utilisateurs d’accéder à RDS depuis **l’extérieur** sans VPN, via **HTTPS** (443).
- Nécessite :
    - un **certificat SSL** valide,
    - un **serveur dédié** (recommandé) pour la passerelle.

🔐 Avantage : l’accès est **filtré**, **journalisé** et **sécurisé** via le tunnel chiffré.
### 🔀 Répartition des connexions – Rôle **RD Connection Broker**

- Suit les **sessions ouvertes** des utilisateurs sur différents serveurs RDS.
- Permet de :
    - faire de la **répartition de charge**,
    - reconnecter un utilisateur à **sa session existante**, même s’il se reconnecte via un autre point d’entrée.

> 🧠 Recommandé en environnement à forte volumétrie d’utilisateurs.