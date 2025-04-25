# Adressage réseau
## Configuration de l'adresse IP

Interface looback (lo) : ``127.0.0.1``  

Trois manières de configurer l'adressage sur une carte réseau :
- La commande IP
  - Configuration dynamique (prise en compte immédiatement)
  - Configuration non stabilisée (non conservée au redémarrage)
- Le fichier interfaces
  - Configuration stabilisée
  - Configuration non dynamique
- Via le network manager

### La commande IP
``ip ``[ OPTIONS ] OBJECT { COMMAND | help }

OBJECT := { link | addr | addrlabel | route | rule | neigh | ntable | tunnel | tuntap |
            maddr | mroute | mrule | monitor | xfrm | netns | l2tp }

🧠 Explication rapide :  
- ip : commande principale
- OPTIONS : options globales (ex : -4 pour IPv4, -6 pour IPv6)
- OBJECT : type d’objet sur lequel on agit (ex : link pour les interfaces, addr pour les adresses IP)
- COMMAND : action à exécuter (ex : show, add, del, etc.)


```shell
ip a                                # liste les interfaces réseaux et voir leurs configurations.
ip a add @IP @Interface             # Ajouter une adresse - ex :  ip a add 10.11.12.13/24 dev ens33
ip a del @IP @Interface             # Retrait adresse IP
ip a flush ens33                    # flush la config de l’interface ens33
ip link set ens33 down              # Désactive l’interface ens33
ip link set ens33 up                # Active l’interface ens33
ip r                                # Affiche la table de routage
```

### Le fichier Interfaces
Disponible dans /etc/network/interfaces
```bash
auto en33                           # Démarrage auto de l’interface au démarrage de la machine
iface ens33 inet static             # Configuration statique pour l’interface ens33
iface ens33 inet dhcp               # Configuration dynamique via DHCP
```
Nécessite un redémarrage du service networking.

### Network manager

Commande nmcli ou nmtui avec interface graphique.  
Modification d’une IP avec nmcli : ``nmcli connection modify Wired\ connection\ 1 ipv4.adresse 192.168.66.6/24``
```shell 
# Modifie la connexion nommée Wired connection 1 pour lui attribuer l’adresse IP statique 192.168.66.6/24
nmcli connection modify Wired\ connection\ 1 ipv4.addresses 192.168.66.6/24 
# Spécifie que la configuration IPv4 doit être manuelle (et non automatique via DHCP). Obligatoire pour que l’adresse définie soit prise en compte.
nmcli connection modify Wired\ connection\ 1 ipv4.method manual
# Ajoute une seconde adresse IP (alias) sur la même interface. Le + permet d’ajouter sans écraser l’adresse précédente.


nmcli connection modify Wired\ connection\ 1 +ipv4.addresses 192.168.1.1/24
```` 


## Configuration de la gateway

Avec NM (network manager) : ``nmcli connection modify Wired\ connection\ 1 ipv4 gateway 192.168.1.1  ``  
Dans le fichier interface : ``Ajouter la ligne « gateway 192.168.1.1 »  ``  
Avec la commande ip :
```shell 	  
ip r add default via 192.168.1.1        # Ajoute une route par défaut  
ip r change default via xxxx            # Change la route par défaut  
```

## Configuration du Nom d’hôte
Il peut être définit en temps que nom court ou nom FQDN.  
Le nom d’hôte se trouve dans :  
/etc/hostname  
/etc/hosts  Pour pouvoir le résoudre localement sans serveur DNS  
Commande ``hostname`` pour voir le nom de la machine.  

## Configuration du DNS

Dans le fichier /etc/resolv.conf  : Emplacement du serveur DNS de la machine  
L’ordre de résolution est défini dans le fichier /etc/nsswitch.conf  

Pour indiquer un serveur DNS à utiliser :  
NM : ``nmcli connection modify Wired\ connection\ 1 ipv4.dns 192.168.1.1``  

Resolv.conf :  
```shell
search ad.campus-eni.fr demo.eni 	# Définition des suffixes DNS
domaine ad.campus-eni.fr 	        # Définition du nom de domaine principal
nameserver 10.0.0.3	                # Serveur DNS
nameserver 10.100.0.3	            # Serveur DNS
```

En DHCP, cette config est gérée via le serveur DHCP.
