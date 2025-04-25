# Le DHCP (Dynamic Host Configuration Protocol)
## Définition

📦 **DHCP** (Dynamic Host Configuration Protocol)

 Protocole qui attribue automatiquement une adresse IP et d’autres paramètres réseau (comme la passerelle ou le DNS) aux appareils d’un réseau.
## Utilité d’un DHCP

Le DHCP permet de configurer un certain nom d’information pour les clients avec adresse dynamique donc il s’occupe d’attribuer une adresse tel que :  
✅ Adresse IP : assignée dynamiquement à partir d’une plage d’adresses définie.  
✅ Masque de sous-réseau : permet de définir la taille du réseau.  
✅ Passerelle par défaut (Gateway) : l’adresse du routeur permettant la communication hors du réseau local.  
✅ Serveurs DNS : pour la résolution des noms de domaine en adresses IP.  
✅ Durée du bail (Lease Time) : définit la durée pendant laquelle l’IP est attribuée avant d’être renouvelée.  
✅ Serveur WINS (Windows Internet Name Service) : utilisé dans les environnements Windows pour la résolution de noms NetBIOS.  
✅ Autres options spécifiques : comme les informations sur le serveur NTP (Network Time Protocol) ou encore le serveur TFTP pour le boot PXE.  

Le bail DHCP (lease) correspond à la durée pendant laquelle une adresse IP est attribuée dynamiquement à un client.  

## Processus DORA (Discover, Offer, Request, Ack)

Comment un PC fait il pour se connecter au bon serveur DHCP ?  
- Le PC arrive sur le réseau et fait une requête ``DHCP discover`` dans le domaine de diffusion en broadcast (255.255.255.255)  
- Le serveur DHCP répond avec une requête ``DHCP offer `` 
- Le PC accepte avec une requête ``DHCP REQUEST  ``
- Le DHCP envoi les paramètres réseaux avec une requête ``DHCP ACK  ``
- 
Le bail ayant une durée, le client demandera un renouvellement de bail automatiquement à 50% et 7/8eme de la durée de celui-ci    
En cas de plusieurs DHCP offer (si plusieurs serveur DHCP), le client prend toujours le plus rapide (avec le moins de latence)    

Pour mettre fin à un bail (Release), il faut, via cmd taper la commande ``ipconfig /release `` 
``ipconfig /renew`` pour  déclencher DORA de nouveau

## L’étendue (ou scope d’un serveur DHCP)

L’étendue est caractérisée par :
- Une plage d’adresse IP Utilisable
- Un nom (ex : LAN_SERVEUR)
- Une durée de bail
- Des exclusions d’adresse IP

La réservation permet, avec l’adresse MAC d’un client, de lui attribuer toujours la même IP. Il est lié à un conteneur parent (ex : Etendue LAN_SERVEUR)


## Configuration d’un serveur DHCP

💻Graphiquement : 
- Gérer / Ajouter des rôles / Serveur DHCP (il faut que le serveur hébergeant le serveur DHCP ai une adresse IP statique).
- Cliquer sur le flag pour terminer la configuration du serveur DHCP.
- Nouvel outil d’administration « DHCP ».

- Pour ajouter une étendue  Clic droit / Ajouter une étendue
- Configurer les options puis activer l’étendue  Clic droit / activer

En Powershell📜
```powershell
# Installer le rôle DHCP
Install-WindowsFeature -Name DHCP -IncludeManagementTools

# Valider la configuration post-installation
Install-DhcpServerInDC -DnsName "nomduserveur.domaine.local" -IPAddress 192.168.1.10

#Créer une étendue DHCP
Add-DhcpServerv4Scope -Name "Etendue-LAN" -StartRange 192.168.1.100 -EndRange 192.168.1.200 -SubnetMask 255.255.255.0 -State Active
```
### Les options de configuration

Elles complètent la configuration IP. Quelques exemples :
- Définir une gateway
- Définir un serveur DNS
- Définir un suffixe DNS…

Les options peuvent être configurée pour :
- Le serveur
- Une étendue
- Une réservation

Pour les configurer 💻 Graphiquement :  Clic droit / Définir une option

En powershell 📜

```powershell
# Configuration des options d'étendues 
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -Router 192.168.1.1
Set-DhcpServerv4OptionValue -ScopeId 192.168.1.0 -DnsServer 192.168.1.1 -DnsDomain "domaine.local"
Set-DhcpServerv4Scope -ScopeId 192.168.1.0 -State Active
```

## Agent relais DHCP

Il est utile lors de plusieurs domaines de diffusion pour un seul serveur DHCP.  
Il s’active sur Pfsense avec DHCP relay.

## Le DHCP dans un domaine

En premier lieu, dans un domaine, le serveur DHCP doit être autorisé à démarrer.  
Les opérations de gestion de la base DHCP :  
- Stocker les données dans une base
- Sauvegarder cette base de manière Synchrone ou Asynchrone

Le fractionnement d’étendue = Fractionnement automatisé d’une étendue sur deux serveurs.

![Image](Environnement_MS_17.png) 

Répartition de la charge :  
- Si plusieurs serveurs DHCP sont utilisés dans un réseau, la fragmentation d'étendue permet de répartir la charge entre eux. Par exemple, un serveur peut gérer la moitié des adresses disponibles et un autre serveur l'autre moitié.
- Redondance et tolérance aux pannes :  
En configurant des plages d'adresses IP sur plusieurs serveurs DHCP, on améliore la disponibilité du service en cas de panne d'un serveur.
- Segmentation des adresses pour différents usages :  
On peut attribuer des plages spécifiques à différents types d'appareils (ex. : PC, imprimantes, téléphones IP) ou à différents sous-réseaux.
- Gestion optimisée des adresses :  
Si un réseau évolue, la fragmentation d'étendue permet d'ajouter des nouvelles plages d'adresses sans perturber la distribution actuelle.
- Éviter les conflits d'adresses :  
Lorsqu’un réseau contient plusieurs serveurs DHCP, il est important que leurs étendues ne se chevauchent pas pour éviter d’attribuer la même adresse IP à plusieurs appareils.



