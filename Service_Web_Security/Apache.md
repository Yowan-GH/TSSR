## 🔍 Apache en bref

- Serveur web **open source** issu du projet **HTTPD**.
- Créé par la **Apache Foundation** en 1995
- Nom = « A Patchy Server » (jeu de mots !).
- Le plus utilisé au monde.

---
## ⚙️ Installation d’Apache

```bash
apt-get install apache2
```

🔎 **Vérification :**
- Navigateur → `http://localhost` ou `http://@IP`
- Apache écoute par défaut sur le port **80** (HTTP) et **443** (HTTPS).

---
### 🗂️ Répertoires & fichiers clés

| Répertoire                          | Contenu                     |
| ----------------------------------- | --------------------------- |
| `/etc/apache2`                      | Répertoire racine de config |
| `apache2.conf`                      | Fichier principal           |
| `ports.conf`                        | Ports d'écoute*             |
| `envvars`                           | Variables d’environnement   |
| `conf-available` / `conf-enabled`   | Configs complémentaires     |
| `mods-available` / `mods-enabled`   | Modules disponibles/activés |
| `sites-available` / `sites-enabled` | Sites dispo/publiés         |

💡 **Astuce :** Tous les `*-enabled` sont des **liens symboliques** vers les `*-available`.
#### 🧱 Fichier ports.conf et listen

Il configure **l’interface réseau et le port** sur lesquels Apache accepte les connexions.
Fichier : `/etc/apache2/ports.conf`

Syntaxe : `Listen [adresse_IP:]port`

| Syntaxe                  | Explication                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `Listen 80`              | Écoute sur **toutes les interfaces** (0.0.0.0) sur le port 80 |
| `Listen 443`             | Écoute sur le port 443 (HTTPS)                                |
| `Listen 192.168.1.10:80` | Écoute sur l’adresse IP 192.168.1.10 uniquement               |
| `Listen [::1]:443`       | Écoute sur l’adresse IPv6 locale en HTTPS                     |

#### 📄 Fichier DirectoryIndex 

La directive **`DirectoryIndex`** permet à Apache de **choisir quel fichier afficher par défaut** lorsqu’un utilisateur accède à un répertoire sans spécifier de fichier (ex. : `http://monsite/`).

Par défaut, la directive est définie dans : ``/etc/apache2/mods-enabled/dir.conf``

```apache
<IfModule mod_dir.c>
    DirectoryIndex index.php index.html index.htm
</IfModule>
```

🧠 Si le fichier `index.php` existe, il est servi en priorité, sinon, Apache tente `index.html`, puis `index.htm`, etc.

---
## 🎧 Gestion du service

<!-- tabs:start --> 
### **systemctl**

`systemctl start|stop|restart|reload|status apache2`

Quelques commandes : 

```bash
sudo systemctl start apache2       # Démarre le service
sudo systemctl stop apache2        # Stoppe le service
sudo systemctl restart apache2     # Redémarre avec coupure
sudo systemctl reload apache2      # Recharge la config sans couper les connexions
sudo systemctl enable apache2      # Active le démarrage auto au boot
sudo systemctl disable apache2     # Désactive le démarrage auto
sudo systemctl status apache2      # Affiche l’état du service
```

📌``restart`` = redémarrage immédiatement même avec des connexions actives
### **apache2ctl**

`apache2ctl start|stop|restart|graceful|configtest|-S|-l`

Quelques commandes : 

```apache
apache2ctl start             # Démarre Apache
apache2ctl stop              # Stoppe Apache
apache2ctl restart           # Redémarre avec vérification de config
apache2ctl reload            # Recharge sans interruption
apache2ctl graceful          # Redémarrage "en douceur"
apache2ctl graceful-stop     # Arrêt "propre" du service
apache2ctl status            # État du serveur
apache2ctl fullstatus        # État détaillé (nécessite `mod_status` + `lynx`)
apache2ctl configtest        # Vérifie la syntaxe des fichiers de conf
apache2ctl -S                # Liste les hôtes virtuels actifs
apache2ctl -l                # Affiche les modules compilés statiquement
apache2ctl -?                # Affiche l’aide
```

📌 `graceful` = redémarrage sans interrompre les connexions.

<!-- tabs:end --> 

---
### 🧩 Activation modules et sites

```apache
a2enmod nom_module    # Active le module
a2dismod nom_module   # Desactive le module

a2ensite monsite.conf  # Publie le site
a2dissite monsite.conf # Stoppe la publication du site
```

📌 Après chaque modification, il faut redemarrer le site apache (et non le reload)

---


## 🏗️ Configuration de site 

### 🏗️ Structure d’un fichier de site

📁 Emplacement : `/etc/apache2/sites-available/monsite.conf`  
📂 Dossier du site : `/var/www/monsite`

```apache
<VirtualHost *:80>                 # * peut être remplacé par une ipv4, ipv6 ou FQDN
    DocumentRoot /var/www/monsite  # Repertoire des documents du site 
    ServerName www.monsite.lcl     # Nom d'hote de domaine
</VirtualHost>
```

**Les Section de configuration** permettent de gérer l'accès à des éléments du site : 

```
<VirtualHost *:80>   
    <Directory /var/www/monsite>   
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>
```

- ``<Directory>`` pour un dossier ou ``<Files>`` **pour des fichiers
- ``<Location>`` pour gérer l'accès à des éléments utilisés par le site web

Les sections sont traitées dans l'ordre ou elles apparaissent. Il faut donc bien structurer le fichier.conf : 

```apache
<Directory> </Directory>
<Files> </Files>
<Location> </Location>
```

### 🔒 Gestion des accès

<!-- tabs:start --> 
#### **Simples**

```apache
Require all granted     # Autorise tout le monde
Require all denied      # Refuse tous le monde
Require ip 192.168.1.0  # Autorise un IP ou un réseau
Require host tssr.lcl   # Par suffixe DNS
Require local           # Autorise les IP locals
```

#### **Multiples**

```apache
<RequireAll>      # ET logique -> Autorise une IP ET refuse une autre 
    Require ip 192.168.1
    Require not ip 192.168.1.100
</RequireAll>

<RequireAny>      # OU logique -> Autorise une IP OU l'autre
    Require ip 192.168.1
    Require ip 192.168.2
</RequireAny>

<RequireNone>     # NON logique -> Refuse 
    Require ip 192.168.10
</RequireNone>
```

<!-- tabs:end -->

### 🧱 Directive Options utiles

Dans le fichier de configuration global du serveur : apache2.conf

|Option|Utilité|
|---|---|
|`Indexes`|Affiche le contenu si pas de fichier d’accueil|
|`FollowSymlinks`|Autorise les liens symboliques|
|`MultiViews`|Affichage selon le navigateur|
|`All`|Active toutes sauf `MultiViews`|

---
## 📂 Organisation des fichiers du site

- Tous les fichiers → `/var/www/www.monsite.lcl`
- Fichier de démarrage → dépend de `DirectoryIndex` (ex : `index.html`, `index.php`…)
- Fichier de config → ``/etc/apache2/sites-available/www.monsite.lvl.conf``
	- Contenu du fichier : 
```apache
	<VirtualHost *:80>                        # Ecouter toute les IP sur le port 80
		Documentroot /var/www/www.monsite.lcl # Va cherche les données dossier
		ServerName www.monsite.lcl            # Nom de domaine 
		  
    <Directory /var/www/www.monsite.lcl>      # Règles sur dossier spécifié 
        Options MultiViews FollowSymLinks     # Autoriser lien Symbolique
        AllowOverride None                    # Refus d'écriture pour tous le monde
        Require all granted                   # Tous le monde y accède 
    </Directory>
</VirtualHost>
``` 


---
## 🔐 Certificats autosignés

### 📁 Arborescence à créer

```bash
/etc/ssl/
├── certs-auto       # Certificats auto-signés
├── private          # Clés privées
└── reqs             # Demandes de certificat
```

### 🔑 Étapes
1. Générer la clé privée :
```bash
openssl genrsa -des3 -out /etc/ssl/private/www.tssr.tld.key 2048
# -des3 : Oblige une phrase passe pour utiliser la clé
# -out chemin : chemin et nom du stockage de la clé privée 
# 2048 : longueur de la clé en bit
```

2. Créer la demande de certificat :
```bash
openssl req -new -key /etc/ssl/private/www.tssr.tld.key \ -out /etc/ssl/reqs/www.tssr.tld.request.csr
# req : Request
# -new : Nouvelle demande
# -key chemin_private_key : Clé privée à utiliser
# -out chemin_fichier_demande : Fichier contenant la demande de certificat
```

3. Générer le certificat autosigné :
```bash
openssl x509 -req -days 90 \ -in /etc/ssl/reqs/www.tssr.lcl.request.csr \ -signkey /etc/ssl/private/www.tssr.lcl.key \ -out /etc/ssl/certs-auto/www.tssr.lcl.cert
# man x509
# x509 : Gestion des certificat
# -req : demande de chiffrement de certificat
# -days XXX : Durée de validitée du certificat en jour
# -in chemin_fichier_demande : Chemin de la demande de certificat 
# -signkey : chemin de la clé privée
# -out : nom et emplacement du certificat
```

4. Modifier le fichier de site pour activer SSL :
```apache
<VirtualHost *:443>     
	DocumentRoot /var/www/monsite     
	ServerName www.monsite.lcl     
	SSLEngine on     
	SSLCertificateFile /etc/ssl/certs-auto/www.monsite.lcl.cert
	SSLCertificateKeyFile /etc/ssl/private/www.monsite.lcl.key 
</VirtualHost>
```


---

## 💼 ProTips – En entreprise

🔧 **Maintenance facilitée** : Utilise toujours `apache2ctl configtest` avant un redémarrage.
🔐 **SSL par défaut** : Même en interne, génère systématiquement des certificats autosignés pour sécuriser l'accès.
📁 **Organisation propre** : Crée un répertoire par site avec le même nom que le `.conf` correspondant.
🧩 **Modularité** : Active uniquement les modules nécessaires (ex : `rewrite`, `ssl`, `headers`...).
📄 **Logs utiles** :
- Accès : `/var/log/apache2/access.log`
- Erreurs : `/var/log/apache2/error.log`


## En pratique 

Il convient d'avoir une fenêtre de navigateur ouverte avec l'adresse du serveur en parallèle pour contrôler l'installation de apache 

1. Installer apache2 : ``apt install apache2``
	1. Le répertoire de apache : ``/etc/apache2/``
	2. La page par défaut affichée dans le navigateur : ``/var/www/html/index.html``


2. Contrôler la bonne installation de apache2 avec l'url : ``127.0.0.1`` ou ``localhost`` ou ``@IP SRVWEB``
	1. Possibilité d'installer un navigateur ligne de commande : ``apt install lynx``
		1. Accès via lynx 127.0.0.1

3. Configuration de apache2 pour le site "tssr.tld"
	1. Créer l'arborescence du site : ``/var/www/tssr.tld``
	2. Créer l'index du site : ``/var/www/tssr.tld/index.html``
	3. Créer le fichier ``tssr.tld.conf`` dans`` /etc/apache2/sites-available``
	```apache
	<VirtualHost *:80>                       # Ecouter toute les IP sur le port 80
	ServerName tssr.tld                      # Nom de domaine
	ServerAdmin webmaster@tssr.tld           # Email admin
	ErrorLog /var/log/apache2/tssr.tld.error # Fichier de log erreur
	TransferLog /var/log/apache2/tssr.transfer.log # Fichier de log transfert
	DocumentRoot "/var/www/tssr.tld"             # Directory des données
		<Directory "/var/www/tssr.tld">          # Option du dossier html
			Options Indexes FollowSymLinks   # Autorisation lien symbolique
			Allowoverride All
			Require all granted
		</Directory>
	</VirtualHost>
	```

	 4. Activer le site : a2ensite ``tssr.tld.conf``
	 5. Redémarrer apache2 : ``systemctl restart apache2``
	 6. Vérifier l'activité du service apache2 : ``systemctl status apache2``
	  ⚠️ Pour accéder au site, pensez à supprimer ou renomme l'index.html initiale 
	  
	 7. Faire les enregistrements sur le serveur DNS -> A tssr.tld @IP
	 8. Attention, bien renseigner le serveur DNS sur les postes Windows et Debian :
		 - ``/etc/resolv.con``f - ``nameserver @IP_SRV_DNS``

4. Créer les certificats 
	1. Générer la clé privée :
		-  ``openssl genrsa -des3 -out /etc/ssl/private/www.tssr.tld.key 2048``
		- Entrer la passe phrase
		
	2. Créer la demande de certificat : 
		- ``openssl req -new -key /etc/ssl/private/tssr.tld.key -out /etc/ssl/reqs/www.tssr.tld.request.csr``
		
	3. Générer le certificat autosigné : 
		- ``openssl x509 -req -days 90 -in /etc/ssl/reqs/www.tssr.tld.request.csr  -signkey /etc/ssl/private/www.tssr.tld.key -out /etc/ssl/certs-auto/www.tssr.tld.cert``
	4. Active le ssl : ``a2enmod ssl``
	5. Modifier le fichier de site pour activer SSL :
```apache
<VirtualHost *:443>     
DocumentRoot /var/www/monsite     
ServerName www.monsite.lcl     
SSLEngine on     
SSLCertificateFile /etc/ssl/certs-auto/www.monsite.lcl.cert
SSLCertificateKeyFile /etc/ssl/private/www.monsite.lcl.key 
</VirtualHost>
```

	