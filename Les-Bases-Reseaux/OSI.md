# Le modèle OSI

## ✅ L'essentiel

Le **modèle OSI** (Open Systems Interconnection) décrit **7 couches** pour structurer les communications réseau et faciliter l'interopérabilité entre matériels et logiciels.

| N°  | Couche                 | Rôle (résumé)                                                           | Protocoles et Ports                                                                       | Matériels concernés   |
| --- | ---------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- |
| 7   | **Application**        | Interface avec l'utilisateur, services réseaux aux applis               | FTP (21), HTTP (80), HTTPS (443), SMTP (25), IMAP (143), LDAP (389), RDP (3389), DNS (53) | PC, Serveur, Pare-feu |
| 6   | **Présentation**       | Traduction des données (format, chiffrement, compression)               | SSL/TLS, codages JPEG, MPEG                                                               | PC, Serveur           |
| 5   | **Session**            | Gestion de la session de communication (ouverture, maintien, fermeture) | NetBIOS, PPTP, RPC, SMB                                                                   | PC, Serveur           |
| 4   | **Transport**          | Transport fiable (TCP) ou rapide sans contrôle (UDP), segmentation      | TCP, UDP                                                                                  | PC, Serveur           |
| 3   | **Réseau**             | Acheminement des paquets entre réseaux (adressage IP)                   | IP, ICMP, ARP (IPv4, IPv6)                                                                | Routeur, Pare-feu     |
| 2   | **Liaison de données** | Transmission locale, adressage MAC, détection d'erreurs                 | Ethernet (IEEE 802.3), Wi-Fi (IEEE 802.11), ARP, VLAN                                     | Switch, Ponts         |
| 1   | **Physique**           | Transmission de bits sur le support physique                            | Câbles (RJ45, fibre), Bluetooth, Wi-Fi                                                    | Hub, Répéteur         |

## 🛡️ Bonnes pratiques professionnelles

- Toujours **vérifier les couches basses (1 à 3)** avant d’accuser les applications.
- **Connaître les ports associés** pour configurer efficacement pare-feu, NAT, règles de sécurité.
- **Savoir lire un flux TCP/IP** (wireshark, tcpdump) en reliant les couches OSI aux entêtes visibles.
- **Documenter les flux** réseau en schématisant les couches traversées.
- Toujours **documenter l’adressage IP et MAC** utilisé
- Surveiller les **tableaux ARP** et les **logs de routage** en entreprise
- Utiliser Packet Tracer ou GNS3 pour **tester des configurations sans risques**
-
## ⚠️ Pièges à éviter

- **Oublier que tout problème réseau commence souvent au niveau 1 ou 2** : câble débranché, switch défaillant...
- **Ne pas associer les bons matériels aux bonnes couches** (exemple : un switch travaille en couche 2, un routeur en couche 3 !).
- **Sous-estimer les problématiques de formatage des données (présentation)** qui peuvent bloquer SSL/TLS, par exemple.

## Exemples 
### 🌐 Exemple : Accès à un site web – Traversée des couches OSI

|Couche OSI|Ce qui se passe réellement|
|---|---|
|7 – Application|Ton navigateur (Chrome, Firefox, Edge) prépare une requête HTTP (ou HTTPS) pour demander une page web.|
|6 – Présentation|Si le site est en HTTPS, les données sont chiffrées avec SSL/TLS avant d’être envoyées.|
|5 – Session|Une session TCP est créée entre ton PC et le serveur web pour maintenir la connexion.|
|4 – Transport|TCP segmente la requête HTTP en petits paquets et assure la fiabilité de l’envoi (accusés de réception).|
|3 – Réseau|IP encapsule les paquets TCP pour qu’ils soient routés vers l'adresse IP du serveur (grâce au DNS qui traduit `www.example.com` en IP). ICMP pourrait être utilisé pour tester la connectivité (ping).|
|2 – Liaison de données|Sur ton réseau local, Ethernet encapsule les données IP pour les envoyer sur le bon chemin (vers ton box/routeur par ex.).|
|1 – Physique|Les bits sont transmis via câble Ethernet, fibre ou Wi-Fi jusqu’au routeur, puis à travers Internet.|
🔥 Résumé visuel du trajet

```rust
Navigateur web -> HTTP/HTTPS (7) -> Chiffrement SSL/TLS (6) -> Session TCP (5)
-> Transport TCP/UDP (4) -> Adresse IP (3) -> Encapsulation Ethernet (2)
-> Transmission bits sur câble ou Wi-Fi (1)
```

### 🔐 Exemple : Connexion SSH à un serveur – Traversée des couches OSI

(SSH = Secure Shell, utilisé pour accéder en ligne de commande à distance à un serveur.)

| Couche OSI             | Ce qui se passe réellement                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| 7 – Application        | Le client SSH (ex : `Putty`, `OpenSSH`) prépare la commande de connexion (login/password ou clé publique). |
| 6 – Présentation       | Le chiffrement SSH s’applique pour sécuriser la session (négociation d'algorithmes de cryptage).           |
| 5 – Session            | Une session SSH est créée pour maintenir la communication sécurisée (authentification + gestion des flux). |
| 4 – Transport          | TCP segmente les données SSH pour assurer leur livraison fiable (port TCP 22).                             |
| 3 – Réseau             | IP encapsule les paquets TCP pour atteindre l'adresse IP du serveur distant.                               |
| 2 – Liaison de données | Ethernet ou Wi-Fi encapsulent les paquets IP dans des trames réseau locales.                               |
| 1 – Physique           | Transmission des bits (électriques ou radio) sur câble Ethernet, fibre ou Wi-Fi.                           |

🔥 Résumé visuel du trajet

```rust
[7] Application         : Client SSH lance la connexion
[6] Présentation        : Chiffrement SSH des données
[5] Session             : Ouverture de session SSH
[4] Transport           : TCP port 22
[3] Réseau              : IP source → IP serveur
[2] Liaison de données  : Adresse MAC source → MAC destination (sur LAN)
[1] Physique            : Transmission des bits sur câble/Wi-Fi
```

## 📚 Glossaire des acronymes

| Acronyme | Signification                         | Description rapide                                                                    |
| -------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| TCP      | Transmission Control Protocol         | Protocole de transport fiable (contrôle d’erreurs, accusés de réception).             |
| UDP      | User Datagram Protocol                | Protocole de transport rapide sans contrôle d’erreurs.                                |
| ICMP     | Internet Control Message Protocol     | Protocole de diagnostic réseau (ex : ping).                                           |
| ARP      | Address Resolution Protocol           | Permet de retrouver l'adresse MAC correspondant à une IP dans un réseau local.        |
| HTTP     | HyperText Transfer Protocol           | Protocole utilisé pour transférer des pages web (non sécurisé).                       |
| HTTPS    | HTTP Secure                           | Version sécurisée de HTTP utilisant SSL/TLS.                                          |
| FTP      | File Transfer Protocol                | Protocole de transfert de fichiers sur un réseau.                                     |
| SMTP     | Simple Mail Transfer Protocol         | Protocole d'envoi d'e-mails.                                                          |
| SSL      | Secure Sockets Layer                  | Ancien protocole de chiffrement pour sécuriser les communications (remplacé par TLS). |
| TLS      | Transport Layer Security              | Standard actuel pour le chiffrement sécurisé des communications sur Internet.         |
| SSH      | Secure Shell                          | Protocole sécurisé pour accès distant aux serveurs via ligne de commande.             |
| NetBIOS  | Network Basic Input/Output System     | Service d’identification et de communication dans les réseaux Windows.                |
| VLAN     | Virtual Local Area Network            | Réseau local virtuel isolant logiquement des équipements sur un même réseau physique. |
| LDAP     | Lightweight Directory Access Protocol | Protocole d'accès aux annuaires (ex : Active Directory).                              |
| RPC      | Remote Procedure Call                 | Appel de procédure distante, utilisé pour que deux programmes puissent communiquer.   |
