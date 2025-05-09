# Le service DNS 
## Définition

Le DNS (Domain Name System) est un système qui traduit les noms de domaine compréhensibles par les humains (comme exemple.com) en adresses IP compréhensibles par les machines (comme 192.168.1.1). Il agit comme un annuaire téléphonique d’Internet.  

## Mécanismes de résolution DNS

| **Mécanismes**        | **Utilité** |
|------------------------|-------------|
| **Le cache DNS**       | - Contient des correspondances entre noms d’hôtes déjà résolus et leurs adresses IP.  <br> - Conserve aussi les réponses négatives aux requêtes du client. <br> - Se gère avec la commande **`ipconfig`**. |
| **Le service DNS**     | - Les clients DNS interrogent leur(s) serveur(s) DNS pour leurs requêtes de résolution. |
| **Le fichier hosts**   | - Les modifications (ajout/suppression d’entrées) dans ce fichier sont reportées dans le cache DNS **dès l’enregistrement** du fichier. |


Le fichier hosts est un fichier système qui associe manuellement des noms de domaine à des adresses IP, sans passer par un serveur DNS.   
Il permet de rediriger des sites web localement sur un ordinateur.  
Ses informations sont donc prioritaires par rapport à l’interrogation du service DNS.  

📂 Emplacement du fichier hosts :
Windows : ``C:\Windows\System32\drivers\etc\hosts``  
Linux / macOS : ``/etc/hosts``

La syntaxe de ce fichier est la suivante :
```
Adresse_IP 	Nom
8.8.8.8		google.com
172.17.0.0	srv01, srv01.monentreprise.local
```

## Nom d’hôte et de domaine

**Nom d’hôte (Hostname)**  
Le nom d’hôte est le nom unique attribué à un ordinateur ou un périphérique sur un réseau. Il permet d’identifier une machine localement.

Le nom de domaine est une adresse lisible par l’homme qui identifie un site web sur Internet. Il est géré par le DNS (Domain Name System) et suit une hiérarchie.

Nom du PC = Nom netbios.  
Nom du PC dans un domaine = netbios dans un domaine = Name_netbios.domain.local = FQDN (fully Qualified Domain Name).

Le DNS peut résoudre des FQDN.

<img src="Service_Reseaux_Microsoft/images/Environnement_MS_8.png">

Pour être résolvable, tout hôte doit être identifiable via un nom pleinement qualifié unique à l’échelle mondiale.  
On peut utiliser des espaces de nom :  
- Privé : Pour des noms interne uniquement – Déconseillé de choisir des noms référencés sur internet
- Public : Référencé sur internet

## Hiérarchisation des espaces de nom

<img src="Service_Reseaux_Microsoft/images/Environnement_MS_45.png">

Dans le DNS, on lit les noms de domaine de droite à gauche car chaque niveau délègue au suivant.
📌 Décomposition de www.france.education.gouv.fr
L'adresse complète est www.france.education.gouv.fr. (avec le point final représentant la racine, souvent omis).

La résolution des DN externe à l’entreprise nécessite un DNS résolveur
La mise en place de nommage interne (AD par ex) nécessite un serveur DNS hébergeur.
L’hébergeur et résolveur peuvent être assurés par un serveur ou deux distincts.

## DNS résolveur (ou DNS Client)

**Fonctionnement du DNS avec un résolveur**  

Lorsqu'un utilisateur tape www.exemple.com dans son navigateur, voici ce qui se passe :  
- L’ ordinateur interroge le DNS résolveur
  - 📌 Si l’adresse IP est déjà en cache (mémorisée), le résolveur répond directement.
  - 📌 Sinon, il suit le processus suivant :
- Le résolveur interroge les serveurs DNS
  - 🔹 Serveur racine (.) → Donne l'adresse des serveurs TLD .com
  - 🔹 Serveur TLD (.com) → Donne l'adresse du serveur de exemple.com
  - 🔹 Serveur DNS de exemple.com → Donne l'adresse IP finale
- Le résolveur renvoie l’IP à l’ordinateur
  - 📌 Le navigateur peut maintenant se connecter à l'adresse IP et afficher la page web.
  - 📌 L'IP est mise en cache temporairement pour accélérer les prochaines requêtes.


Deux types de requêtes peuvent être adressés à un serveur DNS :

1. Requête Récursive (Full Service DNS) ✅  
📌 Le résolveur DNS fait tout le travail pour le client.  

🔄 Fonctionnement :
L'ordinateur de l'utilisateur demande l'adresse IP de www.exemple.com à un résolveur récursif.  
Le résolveur interroge les serveurs DNS hiérarchiques (racine → TLD → domaine final).  
Une fois l'IP trouvée, le résolveur la retourne à l'utilisateur.  

🌟 Avantages :  
✅ Simple et rapide pour l'utilisateur → Pas besoin de gérer la résolution DNS.  
✅ Réduction du trafic réseau → Seule une requête est envoyée par le client.  
✅ Utilisé par les FAI et DNS publics (Google DNS, Cloudflare, etc.).  

⚠️ Inconvénients :  
❌ Charge élevée pour le résolveur → Il doit traiter toutes les requêtes.  
❌ Vulnérable aux attaques DNS (ex: DNS poisoning).  


2. Requête Itérative (Step by Step) 🔄  

📌 Le client (ou résolveur) interroge chaque serveur DNS séparément, étape par étape.

  🔄 Fonctionnement :
L'ordinateur de l'utilisateur demande l'IP de www.exemple.com à un serveur DNS.  
Si ce serveur ne sait pas, il ne cherche pas lui-même la réponse, mais dit :  
"Je ne sais pas, mais demande aux serveurs racine (.)"  
L'ordinateur interroge alors un serveur racine, qui lui dit :  
"Demande aux serveurs TLD (.com)."  
L'ordinateur interroge le serveur TLD, qui lui dit où trouver le serveur de exemple.com.  
Finalement, le serveur de exemple.com répond avec l’IP.  

🌟 Avantages :  
✅ Répartition de la charge → Chaque serveur ne fait qu’une partie du travail.  
✅ Moins vulnérable aux attaques DNS → Chaque serveur répond de manière indépendante.  

⚠️ Inconvénients :  
❌ Plus long pour l’utilisateur → Chaque étape prend du temps.  
❌ Plus de trafic réseau → Chaque serveur doit être interrogé séparément.  

👉 En pratique :  
Ton ordinateur utilise un résolveur récursif (ex: Google DNS 8.8.8.8).  
Ce résolveur effectue ensuite des requêtes itératives vers les serveurs racine, TLD, etc.  

## La Redirection

Lorsqu'on met en place un DNS externe, la redirection non conditionnelle DNS permet d’envoyer les requêtes non résolues par le DNS interne vers un serveur DNS externe (comme Google DNS, Cloudflare, ou celui d’un FAI).  

Un redirecteur conditionnel (Conditional Forwarder) permet à un serveur DNS d'envoyer des requêtes vers un DNS spécifique en fonction du domaine demandé.  
💡 Contrairement à une redirection classique, qui envoie toutes les requêtes non résolues vers un DNS externe, le redirecteur conditionnel applique une règle ciblée.

🖥️ Exemple d’un réseau d’entreprise  
Imaginons une entreprise avec :  
🌐 Un domaine interne : intranet.entreprise.local  
📡 Un partenaire externe : partenaire.com  
🌍 Internet (public)  

Tous les résultats des requêtes DNS sont enregistrés dans un cache et la durée de conservation est propre à chaque enregistrement (Time To Live).  
Attention, les réponses négatives sont aussi enregistrées :  
Par exemple : Impossible de joindre google.com  
Il ne sera pas possible de résoudre google.com durant la durée de vie de l’enregistrement de la requête  
Il faudra alors purger le cache ou attendre.  

*NB : La RFC 2308 recommande un TTL maximum de 900 secondes (15 minutes) pour les réponses négatives.*  


## Installation d’un serveur DNS

Graphiquement 🖥️ : 
- Ajouter un rôle / serveur DNS
- Nouvel outil d’administration DNS.
- Commande cmd pour tester la résolution : ``nslookup NOMDUSITE``

Pour spécifier un redirecteur (si requête non résolue), clic droit sur DNS/Propriété/Redirecteur

Afficher le cache DNS : 	``ipconfig /displaydns``
Purger le cache DNS : 	``ipconfig /flushdns``

En powershell 📜
```powershell
# Ajouter un role DNS 
Install-WindowsFeature -Name DNS -IncludeManagementTools

# Commande DNS 
Get-Command -Module DnsServer

# Ajouter un redirecteur 
Add-DnsServerForwarder -IPAddress "8.8.8.8"

# Voir les redirecteurs
Get-DnsServerForwarder

# Voir le DNS local
Get-DnsClientCache

# Vider le DNS local
Clear-DnsClientCache

```
## Le DNS hebergeur

Il gère un ou plusieurs espaces de nom.  
Les zones contiennent un ensemble d’enregistrement d’un espace de nom.  
Plusieurs types de zones :  
- Directe : Permet de résoudre un nom en adresse IP (CLI-00  192.168.0.6)
- Inverse : Permet de résoudre les adresses IP en nom (192.168.0.6  CLI-00)

Il existe également des serveurs maitres et esclaves : 

📊 Serveur maître vs Serveur esclave (DNS)

| **Caractéristiques**         | **Serveur maître**       | **Serveur esclave**     |
|-----------------------------|--------------------------|--------------------------|
| **Type de zone hébergée**    | Zone principale           | Zone secondaire          |
| **Autorisation d’accès**     | Lecture / écriture        | Lecture                  |
| **Fait autorité pour la zone** | Oui                     | Oui                      |




Le contenu d’une zone : 
- Un SOA (Start Of Authority) : Nom FQDN du serveur DNS disposant de la zone en écriture
- Serveur Maitre
- Un ou des NS (Name Server) : serveurs faisant autorité pour la zone
- Serveur maitre ou esclave

Pour une zone directe : 

| **Type d’enregistrement** | **Contenu**                                                                 |
|---------------------------|------------------------------------------------------------------------------|
| **SOA**                   | Nom FQDN du serveur DNS disposant de la zone en **écriture**                |
| **NS**                    | Serveur(s) **faisant autorité** pour la zone                                 |
| **A**                     | Hôte IPv4                                                                    |
| **AAAA**                  | Hôte IPv6                                                                    |
| **CNAME**                 | Alias (nom canonique)                                                        |
| **MX**                    | Serveur de messagerie                                                        |
| **SRV**                   | Services (utilisé pour localiser des services spécifiques dans un domaine)   |

Pour une zone inverse : 

| **Type d’enregistrement** | **Contenu**                                                                 |
|---------------------------|------------------------------------------------------------------------------|
| **SOA**                   | Nom FQDN du serveur DNS disposant de la zone en **écriture**                |
| **NS**                    | Serveur(s) **faisant autorité** pour la zone                                 |
| **PTR**                   | Pointeur (utilisé pour la résolution **inverse** d’adresse IP → nom DNS)     |
### Les mises à jour et enregistrement dynamique
Utile pour les postes clients adressé par DHCP

Le transfert de zone :
1. Le serveur secondaire interroge le serveur maitre
2. Comparaison avec le serveur principale
3. Transfert et mise à jour de zone.


Pour mettre à jour automatique le serveur DNS et incrémenter les nouveaux postes de manière graphique 🖥️ : 
- Clic droit/propriété / Mise à jour dynamique/ Non sécurisé et sécurisé
- Lorsqu’un hôte viendra scanner, il sera intégré
- Pour initier un transfert de zone, clic droit sur la zone/propriété/transfert de zone sur le serveur DNS maitre
- Sur l’esclave, créer une zone secondaire / indiquer le serveur maitre
- Clic droit sur la zone créé et transfert de la nouvelle copie à partir du maitre

En powershell 📜

```powershell
# Autoriser la mise à jour dynamique 
Set-DnsServerPrimaryZone -Name "domaine.local" -DynamicUpdate NonsecureAndSecure

# Activer le transfert de zone sur le serveur DNS maître
Set-DnsServerZoneTransfer -Name "domaine.local" -AllowZoneTransfer $true -SecondaryServers "192.168.1.20"

# Créer une zone secondaire sur l’esclave
Add-DnsServerSecondaryZone -Name "domaine.local" -ZoneFile "domaine.local.dns" -MasterServers "192.168.1.10" -ComputerName "NomDuServeurEsclave"

# Forcer le transfert de zone manuellement (depuis l’esclave)
Invoke-DnsServerZoneTransfer -Name "domaine.local" -ComputerName "NomDuServeurEsclave"
```

### Les sous domaines et délégation

Pour créer un sous-domaine, il faut que le sous-domaine possède un serveur dns enfant.  
mazone.local  DNS parent  
exemple.mazone.local  DNS enfant  

Pour créer une délégation de zone 🖥️ : 
-  clic droit sur la zone / nouvelle délégation / entrer le domaine délégué puis ajoutez l’ip du serveur DNS enfant.

En powershell 📜

```powershell
Add-DnsServerZoneDelegation -Name "sousdomaine" -ZoneName "domaine.local" -NameServer "dns.sousdomaine.domaine.local" -IPAddress "192.168.1.100"

```