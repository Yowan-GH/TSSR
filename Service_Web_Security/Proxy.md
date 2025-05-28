# 🌐 Le proxy – Filtrage et sécurisation de la navigation web

## ✅ Qu’est-ce qu’un proxy ?

Un **proxy** est un serveur intermédiaire qui fait **l’interface entre un utilisateur interne et Internet**.  
Il agit comme un **filtre** permettant de :
- Contrôler les accès web (via **blacklists / whitelists**)
- Améliorer la vitesse de navigation (via le **cache**)
- Journaliser les connexions (respect de la **réglementation**)

## ⚙️ Fonctionnement général

1. 👤 Un utilisateur tape `https://eni-campus.fr`
2. La requête passe d’abord par le **proxy**
3. Le proxy vérifie :
    - ✅ Si le site est autorisé → accès autorisé
    - ❌ Si le site est dans une **liste noire** → accès refusé avec message d’erreur
4. En cas d'autorisation, le proxy **télécharge la page** et la fournit à l'utilisateur

## 🧠 Fonctions complémentaires

### 🗂️ **Cache des URL**
- Le proxy garde en mémoire les pages déjà visitées.
- Cela permet un **accès plus rapide** et une **réduction de la bande passante** à la prochaine visite.

## 🛠️ Types de proxys

|Type de proxy|Fonctionnement|Pour l'utilisateur|
|---|---|---|
|**Proxy transparent**|Aucune configuration manuelle requise|Invisible, automatique|
|**Proxy explicite**|Nécessite configuration IP/port dans le navigateur ou via une GPO|Visible / Paramétrable|

> ⚙️ En entreprise, le proxy est souvent **automatisé** via des stratégies de groupe ou PAC/WPAD.


## 🧭 **Squid Proxy** (Intégré à pfsense)

Squid est un logiciel **open source** qui fonctionne comme :
- **Serveur proxy** : filtre et mise en cache du trafic sortant (HTTP/HTTPS)
- **Reverse proxy** : redirection de trafic vers des serveurs internes
    
Il est compatible avec FTP, HTTP, HTTPS, Gopher…  
💡 Très utilisé dans les entreprises via **pfSense**.

### 🛠️ Procédure de configuration du proxy Squid
#### 🔹 1. Installation des paquets

`Système > Gestionnaire de paquets > Paquets disponibles`

- **squid** : serveur proxy + cache
- **squidGuard** _(optionnel mais recommandé)_ : filtrage par blacklist

#### 🔹 2. Configuration du cache

`Parquet > Proxy Server > Cache Management > Local Cache`

- **Hard Disk Cache Size** : `1024` → 1 Go de cache disque
- **Memory Cache Size** : `1024` → 1 Go de cache RAM
- `ufs` en type de cache

📝 Ces réglages optimisent la vitesse de navigation via stockage local des contenus.

#### 🔹 3. Activation du proxy

Parquet > Proxy Server > General Settings > General`

✅ À cocher / remplir :
- **Enable Squid Proxy**
- **Keep Settings/Data** : permet de conserver les réglages lors des mises à jour
- **Listen IP Version** : `IPv4`
- **Proxy Interface(s)** : `LANCLIENT` _(ou interface utilisée par les clients internes)_
- **Port du mandataire** : `3128` _(port standard du proxy HTTP)_

#### 🔹 4. Options réseau et certificats

Toujours dans _General Settings_ :
- ✅ **Allow Users on Interface** : autorise automatiquement les clients du LAN à utiliser le proxy
- ✅ **Resolve DNS IPv4 First** : évite les erreurs sur sites HTTPS avec IPv6
- **Extra Trusted CA** : choisir ici un **certificat d’autorité locale** pour le filtrage HTTPS

#### 🔹5. Interception HTTPS (SSL)

`Parquet > Proxy Server > General Settings > SSL Filtering`

 ✅ À activer :
- **Enable SSL Interception**
- **SSL/MTIM Mode** : `Splice All`
- **SSL Intercept Interface(s)** : `LANCLIENT`
- **SSL Proxy Port** : `3129` _(port spécifique pour HTTPS)_
- AC : Certificat

🎓 **But** : inspecter le contenu même des pages en HTTPS (ex : bloquer YouTube)

#### 🔹 6. Activer la journalisation

`Parquet > Proxy Server > Logging Settings`

✅ À cocher :
- **Enable Access Logging**   : Les journaux seront stockés dans `/var/squid/logs`

🧠 Obligatoire pour répondre aux obligations légales (article L34-1).

#### 🔹 7. Personnalisation de l’interface

`Parquet > Proxy Server > General Settings > Headers`
- **Visible Hostname** : `proxy.entreprise.local` Nom de domaine
- **Administrator Email** : `admin@entreprise.fr` Responsable Proxy
- **Error Language** : `fr` _(messages d’erreur en français)_

#### 🔹 8. Configuration du contrôle d’accès

#### 📍 Accès :

`Services > Proxy Server > ACL (Access Control Lists)`
- **Allowed Subnets** : `172.20.200.0/25` _(réseau autorisé à utiliser le proxy)_
- **Blacklist** :
      `facebook.fr fr-fr.facebook.com`
    
🔒 Permet de bloquer certains sites selon les besoins de l’entreprise.

#### 🔄 9. Redémarrer Squid

#### 📍 Accès :
`Status > Services > redémarrer le service Squid`
✔️ Cela applique et active toute la configuration.

#### ✅ Test final

> Essayez d’accéder à un site bloqué (ex : Facebook).  
> Vous devez voir un **message d’erreur personnalisé** provenant du proxy, indiquant que le site est interdit.


### 🛠️ Procédure de configuration du proxy Squidguard

#### 🧩 Qu’est-ce que SquidGuard ?

**SquidGuard** est un **plugin complémentaire** à Squid. Il permet de filtrer les accès aux sites web à partir de **listes noires (blacklists)**, organisées par **catégories** (pornographie, réseaux sociaux, jeux d'argent, etc.).

#### 🔄 Quelle différence avec Squid ?

|Fonction|Squid|SquidGuard|
|---|---|---|
|Rôle principal|Proxy HTTP/HTTPS + cache|Filtrage avancé d’URL par catégories|
|Journalisation|Activité web|Journaux de blocages liés aux catégories|
|Blocage par domaine|Manuel|Automatisé par listes (ex : blacklist d'UT Capitole)|
#### 🛠️ Procédure de configuration

###### 🔹1. Activer SquidGuard
📍 `Paquet > Proxy filter SquidGuard > General settings`

- ✅ **Activer** : cochez la case pour démarrer le service
- ✅ L’état doit passer à **STARTED**

###### 🔹 2. Activer la journalisation
📍 Toujours dans _General settings_
- ✅ **Enable GUI log** : log des connexions à l’interface
- ✅ **Enable log** : journalisation des **actions de filtrage**
- ➕ (optionnel) : **Enable log rotation** pour faire tourner les logs

###### 🔹 3. Définir l’URL de la blacklist
📍 `General settings > Blacklist Options
- ✅ **Blacklist** : cochez pour activer l’utilisation d’une liste externe
- Listes : https://dsi.ut-capitole.fr/blacklists/download/

###### 🔹 4. Télécharger la blacklist

📍 `Paquet > SquidGuard > Blacklists`

- 📥 Collez à nouveau l’URL si besoin
- ✅ Cliquez sur **Download**
- Vérifiez que la ligne `Completed` apparaît dans les logs

###### 🔹 5. Créer les règles de filtrage (ACL)

📍 `SquidGuard > Common Access Control List (ACL)`

- Dans **Target Rules List**, cliquez sur ➕ pour créer une règle
- Sélectionnez les catégories à bloquer (ex : `blk_blacklists_porn`, `agressif`)
- Pour chaque ligne : choisissez `access: deny`
- Pour **Default Access** (accès par défaut si aucune règle ne correspond) :
    - `allow` (laisser passer ce qui n’est pas dans une règle)
    - ou `deny` (bloquer tout sauf ce qui est whitelisté)

###### 🔹 6. Options complémentaires

📍 Toujours dans ACL
- ✅ **Do not allow IP addresses in URL** : empêche les contournements via IP directe
- ✅ **Use SafeSearch engine** : active le mode SafeSearch sur les moteurs (Google, Bing, etc.)
- ✅ **Journalise** : active la journalisation spécifique à l’ACL
- 💬 **Redirect mode** : page d'erreur personnalisée ou message

###### 🔹 7. Créer une blacklist personnalisée

📍 `SquidGuard > Target Categories`

- Renseignez :
    - **Nom** : `MaBlackList`
    - **Order** : même nom ou ordre dans la liste
    - **Domain List** : exemple `netflix.com`, `twitch.tv`
- ✅ Cochez **Journalise**

Ensuite, **retournez dans l’ACL** et ajoutez cette catégorie personnalisée à vos règles (`access: deny`).

###### 🔁 8. Appliquer les changements

📍 `SquidGuard > General Settings`
- 🔄 Cliquez sur **Apply**
- Assurez-vous que l'état reste **STARTED**
- ✅ Testez le fonctionnement en allant sur un site blacklisté 

## 🌐 Portail Captif – Accès Wi-Fi contrôlé avec page d'interaction

### ✅ Qu’est-ce qu’un portail captif ?

Un **portail captif** est une **page web intermédiaire** à laquelle un utilisateur est automatiquement redirigé dès qu’il se connecte à un **réseau Wi-Fi ouvert** ou non authentifié.

🎯 Objectif :  
**Forcer l'utilisateur à interagir** avec une page avant d'obtenir un accès complet à Internet.

### 🔄 Fonctionnement en 4 étapes

|**Étape**|**Explication**|
|---|---|
|Connexion au réseau|L'utilisateur se connecte à un réseau Wi-Fi public (ex : `WiFi_GUEST`)|
|Redirection|Toute tentative d'accès web est **redirigée** vers la page du portail captif|
|Interaction|L'utilisateur doit s’identifier ou **accepter les conditions d’utilisation**|
|Accès accordé|Une fois validé, l'utilisateur accède au réseau avec une adresse IP attribuée|

### 💡 Contenu habituel d’un portail captif
- 🖼️ Logo de l’établissement
- 📜 Conditions générales d’utilisation
- 📢 Publicités ou informations locales
- 🔐 Formulaire d’identification (mot de passe / SMS / numéro de chambre / ticket imprimé…)

### ⚙️ En environnement pro

- 👨‍💻 Les employés utilisent un **Wi-Fi sécurisé (WPA2-Enterprise)** ou des **certificats** pour s’authentifier automatiquement
- 🎫 Les visiteurs passent **par le portail captif**, avec une durée d’accès limitée