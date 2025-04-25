# DHCP

## Définition 

📦 **DHCP** (Dynamic Host Configuration Protocol)

> Protocole qui attribue automatiquement une adresse IP et d’autres paramètres réseau (comme la passerelle ou le DNS) aux appareils d’un réseau.

Le PC arrive sur le réseau et commence le Discover Offer Resquest Ack pour obtenir une adresse IP du serveur DHCP  
Pour mettre en place le serveur DHCP, il y a deux solutions majeures :  
- isc-dhcp-server – Le plus utilisé, le plus vieux
- kea – Le plus recent, pas encore très utilisé

## Relai DHCP

Un **relais DHCP** est un service qui **transmet les requêtes DHCP** des clients d’un réseau local à un **serveur DHCP situé sur un autre réseau**.

Paquet ``isc-dhcp-relay``

Configuration du Fichier **/etc/default/isc-dhcp-relay**
```bash
# vi /etc/default/isc-dhcp-relay

# Defaults for isc-dhcp-relay initscript

# What servers should the DHCP relay forward requests to?
SERVERS="192.168.42.2"

# On what interfaces should the DHCP relay (dhrelay) serve DHCP requests?
INTERFACES="ens33 ens35"

# Additional options that are passed to the DHCP relay daemon?
OPTIONS=""
```

## Installation en pratique

Installation du paquet ``isc-dhcp-server``.  
Après l’installation, aucune configuration n’est encore mise en place, le service sera donc en erreur, ce qui est normal.  

Il faut faire la configuration des fichiers suivants :  
**etc/default/isc-dhcp-server**  

Ajouter les interfaces sur lesquels on veut proposer des adresses IP
Etc/dhcp/dhcpd.conf :  
```shell
option domain-name-servers 192.168.10.12 ; 	    # Adresse de DNS
default lease-time et max-lease-time;		    # Durée et intervalles des baux
authoritative ; 					            # Active l’autorité du serveur
log-facility local7 ; 			                # Redirige les log en local. Il faudra aussi modifier stslog.conf
subnet 192.168.10.0 netmask 255.255.255.0 {} 	# Active l’écoute sur le réseau 192.168.10.0
subnet 172.18.10.0 netmask 255.255.255 {		# Active l’écoute sur le réseau 172.18.10.0
Range 172.18.10.100 182.18.10.200 ;		        # Donne une plage d’adresse IP à fournir
option routers 172.18.10.254 ; }			    # Donne le routeur à utiliser
```

Valider la configuration et ``dhcpd -t`` pour tester la configuration. 
Activer le service avec ``systemctl start isc-dhcp-server``.    
Lors du changement de config client (static -> dhcp), faire un ``ip a flush ens36`` pour purger l’ancienne configuration puis un ``dhclient ens36 ``pour faire le **Discover de dora**.  
Les informations des baux sont stockées dans **/var/lib/dhcp/dhcpd.leases**
