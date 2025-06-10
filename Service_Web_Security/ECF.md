
# ECF Réseaux et Sécurité (non corrigé)

## Questions de Correspondance (Relier les bonnes définitions)

### Question 1 : Matrice de flux, DMZ, IDS, Firewall, VPN, Proxy

* **Matrice de flux** : Représentation tabulaire des communications autorisées entre différentes zones ou systèmes d'un réseau.
* **DMZ** : Zone réseau isolée entre le réseau interne et externe, hébergeant les services accessibles publiquement.
* **IDS** : Dispositif qui surveille le trafic réseau pour détecter les activités suspectes ou malveillantes.
* **Firewall** : Système de sécurité qui contrôle et filtre le trafic réseau entrant et sortant selon des règles prédéfinies.
* **VPN** : Une connexion chiffrée et sécurisée entre un appareil et un serveur distant, masquant l'adresse IP et protégeant les données de l'utilisateur sur Internet.
* **Proxy** : Serveur intermédiaire qui relaie les requêtes entre un client et un serveur, offrant des fonctions de filtrage et de mise en cache.

### Question 2 : Types de NAT (Network Address Translation)

* **Redirige le trafic entrant d'un port spécifique de l'interface WAN vers une IP et un port interne** : Transfert de port (Port Forward)
* **Modifie l'adresse IP source du trafic sortant, généralement pour permettre aux réseaux privés d'accéder à Internet** : NAT Sortant (Outbound NAT)
* **Mappe une adresse IP publique à une adresse IP privée, redirigeant tout le trafic entre elles** : 1:1 NAT

### Question 3 : Configuration Apache2

* **Fichier de configuration principal d'Apache2, contenant les paramètres globaux du serveur.** : `apache.conf`
* **Commande pour vérifier la syntaxe des fichiers de configuration d'Apache2.** : `apache2ctl configtest`
* **Répertoire contenant les liens symboliques vers les configurations de sites actifs.** : `sites-enabled`
* **Répertoire contenant les fichiers de configuration des sites web virtuels disponibles.** : `sites-available`
* **Commande pour activer un module Apache en créant un lien symbolique dans mods-enabled.** : `a2enmod`
* **Commande pour désactiver un site web virtuel en supprimant le lien symbolique dans sites-enabled.** : `a2dissite`
* **Commande pour activer un site web virtuel en créant un lien symbolique dans sites-enabled.** : `a2ensite`

### Question 4 : Cryptographie et Sécurité SSL/TLS

* **Employée pour le chiffrement rapide des données de la session.** : Chiffrement Symétrique
* **Protocoles essentiels pour la sécurisation des communications.** : SSL/TLS
* **Vérification de l'identité du serveur et, dans certains cas, du client.** : Authentification
* **Utilisée principalement pour l'échange sécurisé de clés et l'authentification.** : Chiffrement Asymétrique
* **Protection des données échangées contre les interceptions non autorisées.** : Confidentialité
* **Garantie que les messages transmis n'ont pas été altérés en transit.** : Intégrité

### Question 5 : Numéros de port par défaut

* **22** : SSH
* **389** : LDAP
* **53** : DNS
* **443** : HTTPS
* **3389** : RDP
* **636** : LDAPS

### Question 6 : Étapes de validation de certificat

1.  Le client initie une connexion HTTPS.
2.  Le serveur Web demande un certificat au CA.
3.  Le serveur Web obtient un certificat du CA.
4.  Le serveur Web envoie son certificat au client.
5.  Le client utilise la chaîne de certification pour remonter au CA de confiance.
6.  Le CA confirme l'identité du serveur Web et le valide au client.
7.  Le client établit une connexion sécurisée avec le serveur web.

## Questions à Choix Multiples (QCM)

### Question 7 : Types d'attaques informatiques courantes

* **Réponses correctes** : Phishing, DDoS, Man-In-The-Middle
* **Justification** : "DestroyMan" et "VigyPirate" ne sont pas des noms génériques ou largement reconnus de types d'attaques informatiques.

### Question 8 : Composants du gestionnaire `certsrv`

* **Réponses correctes** : Certificats délivrés, Demandes en attente, Demandes ayant échoué, Modèles de certificats, Certificats révoqués.
* **Justification** : "Demandes délivrées", "Demandes supprimées" et "Certificats occupés" ne sont pas des catégories standard dans l'interface de gestion de `certsrv`.

### Question 9 : Systèmes de détection et de prévention

* **Réponses correctes** : IDS/MDR, IDS/IPS, EDR/XDR/MDR
* **Justification** : Bastion, ZTNA (Zero Trust Network Access), et DDoS (qui est un type d'attaque) ne sont pas des systèmes de détection/prévention à part entière.

### Question 10 : Avantages d'une DMZ (Demilitarized Zone)

* **Réponses correctes** : Contrôle d'accès amélioré, Tampon pour les services publics, Sécurité renforcée.
* **Justification** : L'amélioration de la vitesse du réseau n'est pas un avantage direct de la DMZ.

### Question 11 : Définition d'un socket TCP/IP

* **Réponse correcte** : Une combinaison d'une adresse IP et d'un numéro de port.

### Question 12 : Regroupement d'éléments réseau

* **Réponse correcte** : Un Alias.
* **Justification** : Un alias permet de regrouper plusieurs éléments réseau (IP, plages, ports) sous un nom unique.

### Question 13 : Signification de PKI

* **Réponse correcte** : Public Key Infrastructure (Infrastructure à Clé Publique).

### Question 14 : Signification de VPN

* **Réponse correcte** : Virtual Private Network (Réseau Privé Virtuel).

### Question 15 : Signification de SSL et TLS

* **Réponses correctes** :
    * **SSL** signifie **Secure Sockets Layer**.
    * **TLS** signifie **Transport Layer Security**.

### Question 16 : Port d’écoute par défaut du proxy Squid

* **Réponse correcte** : 3128.

### Question 17 : Service Windows pour gérer les certificats dans un environnement Active Directory

* **Réponse correcte** : Certificates Services (Certsrv).
* **Justification** : Également connu sous le nom d'Active Directory Certificate Services (AD CS).

### Question 18 : Type d'attaque visant à rendre un service indisponible

* **Réponse correcte** : DDoS.

### Question 19 : Commande Windows pour afficher les connexions TCP actives et les ports TCP/UDP en écoute

* **Réponse correcte** : `netstat -a`.

### Question 20 : Principale différence entre un certificat auto-signé et un certificat émis par une autorité de certification

* **Réponse correcte** : La confiance établie par une tierce partie.
* **Justification** : Un certificat CA est validé par une entité de confiance reconnue, contrairement à un certificat auto-signé.

### Question 21 : Serveurs web couramment utilisés sous Linux

* **Réponses correctes** : Apache, Nginx.
* **Justification** : IIS est un serveur web Microsoft, et HttpSurf n'est pas un serveur web courant.

### Question 22 : Avantages de l'utilisation d'une matrice de flux

* **Réponses correctes** : Documenter les communications autorisées, Faciliter la configuration du pare-feu, Identifier les anomalies de trafic.
* **Justification** : L'amélioration de la vitesse du réseau n'est pas un avantage direct.

### Question 23 : Modes de fonctionnement d'IPsec

* **Réponses correctes** : Mode transport, Mode tunnel.
* **Justification** : Ces deux modes définissent comment IPsec protège les paquets IP.

### Question 24 : Principaux avantages de l'outil Nmap

* **Réponses correctes** : Détecter les systèmes d'exploitation, Scanner le réseau, Découvrir les ports ouverts.
* **Justification** : Créer des certificats SSL n'est pas une fonctionnalité de Nmap.

### Question 25 : Commande Debian remplaçant `netstat` pour afficher les statistiques des sockets

* **Réponse correcte** : `ss`.

## Énigmes

### Énigme 1 : Tunnel invisible pour la navigation sécurisée

* **Réponse** : VPN (Virtual Private Network).

### Énigme 2 : Boîte à outils open source pour sécuriser les communications, associée à TLS/SSL

* **Réponse** : OpenSSL.

### Énigme 3 : Méthode subtile de manipulation pour obtenir des informations, jouant sur la confiance

* **Réponse** : L'Ingénierie Sociale.

### Énigme 4 : Gardien invisible des réseaux, transformant les adresses et protégeant la communication

* **Réponse** : NAT (Network Address Translation).

### Énigme 5 : Né de la confiance et de la vérité, gardien des échanges en ligne

* **Réponse** : Le Certificat Numérique (ou Certificat X.509).

### Énigme 6 : Gardien des océans numériques, mi-céphalopode, mi-sentinelle électronique, filtrant les requêtes web

* **Réponse** : Squidguard.

## Questions Vrai ou Faux

### Question 34 : Le tunnel IKE est responsable du transfert sécurisé des données entre les entités.

* **Réponse** : Faux.
* **Justification** : Le tunnel IKE est responsable de l'établissement et de la gestion de l'association de sécurité (SA). Le transfert sécurisé des données est géré par les protocoles IPsec (AH ou ESP).

### Question 35 : Le tunnel IPSec est responsable du transfert sécurisé des données entre les entités.

* **Réponse** : Vrai.
* **Justification** : IPsec fournit l'authentification, l'intégrité et la confidentialité des communications IP en chiffrant et/ou authentifiant les paquets de données.

### Question 36 : OpenVPN nécessite d’un certificat de confiance ?

* **Réponse** : Vrai.
* **Justification** : Pour une sécurité robuste, OpenVPN est très couramment utilisé avec des certificats X.509 délivrés par une autorité de certification.

### Question 37 : WireGuard nécessite d’un certificat de confiance ?

* **Réponse** : Faux.
* **Justification** : WireGuard n'utilise pas de certificats X.509 mais s'appuie sur la cryptographie à clé publique basée sur l'échange de clés de courbe elliptique (Curve25519) et l'échange de clés publiques/privées.