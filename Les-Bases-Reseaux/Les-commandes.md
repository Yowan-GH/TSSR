# Les premières commandes 

<!-- tabs:start --> 
#### **🪟 Windows**
|Commande Windows|Description|
|---|---|
|`ipconfig`|Affiche les adresses IP.|
|`ipconfig /all`|Affiche toutes les infos réseau détaillées (IP, MAC, DNS…).|
|`ipconfig /renew`|Renouvelle un bail DHCP.|
|`ipconfig /release`|Libère une IP DHCP.|
|`ipconfig /displaydns`|Affiche le cache DNS.|
|`ipconfig /flushdns`|Vide le cache DNS.|
|`ping @IP`|Envoie 4 paquets ICMP. (CTRL+C pour arrêter)|
|`ping -n X @IP`|Envoie X paquets ICMP.|
|`ping -t @IP`|Ping en continu.|
|`arp -a`|Affiche la table ARP (IP ↔ MAC).|
|`arp -s IP MAC`|Ajoute une entrée ARP statique.|
|`arp -d`|Supprime une entrée ARP.|
|`tracert @IP`|Affiche les routeurs traversés jusqu'à la destination.|
|`netstat -a`|Connexions TCP/UDP actives et ports en écoute.|
|`netstat -b`|Affiche les processus associés aux connexions.|
|`netstat -r`|Affiche la table de routage IP.|
|`netstat -s`|Statistiques par protocole réseau.
#### **🐧Linux**
|Commande Linux|Description|
|---|---|
|`ip a` ou `ip addr`|Affiche les adresses IP.|
|`ip a`|Affiche toutes les infos réseau détaillées (IP, MAC, DNS…).|
|`dhclient`|Renouvelle un bail DHCP.|
|`dhclient -r`|Libère une IP DHCP.|
|`systemd-resolve --flush-caches`|Vide le cache DNS.|
|`ping @IP`|Ping en continu (CTRL+C pour arrêter).|
|`ping -c X @IP`|Envoie X paquets ICMP.|
|`arp -n` ou `ip neigh`|Affiche la table ARP (IP ↔ MAC).|
|`ip neigh add IP lladdr MAC dev ethX`|Ajoute une entrée ARP statique.|
|`ip neigh del IP dev ethX`|Supprime une entrée ARP.|
|`traceroute @IP`|Affiche les routeurs traversés jusqu'à la destination.|
|`ip addr add @IP/CIDR dev eth0`|Attribue une IP manuellement à une interface.|
|`ip link set dev eth0 up/down`|Active/désactive une interface réseau.|
|`ss -a`|Connexions TCP/UDP actives et ports en écoute.|
|`netstat -r` ou `ip route show`|Affiche la table de routage IP.|
|`netstat -s`|Statistiques par protocole réseau.|
|`netstat -i`|Statistiques Ethernet (interfaces).|
|`ss -t`|Affiche les connexions TCP uniquement.|
|`ss -u`|Affiche les connexions UDP uniquement.|

<!-- tabs:end -->
## Diagnostic réseau 🛡️
 

| 🧠 Bon réflexe                                  | 🪟🐧 Commande utile                                                       | ✅ Résultat attendu                                                |
| ----------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Vérifier son adresse IP, son masque, sa gateway | `ipconfig` (Windows) / `ip a` (Linux)                                     | Affiche l'IP, le masque, la passerelle, la carte réseau.          |
| Tester la carte réseau localement               | `ping 127.0.0.1`                                                          | Confirme que la pile réseau locale fonctionne.                    |
| Tester la connectivité au réseau local          | `ping @IP_passerelle`                                                     | Vérifie que la connexion LAN jusqu'au routeur fonctionne.         |
| Tester l'accès Internet sans DNS                | `ping 8.8.8.8`                                                            | Vérifie que l'accès Internet fonctionne même sans résolution DNS. |
| Tester l'accès Internet avec DNS                | `ping www.google.com`                                                     | Vérifie que la résolution DNS fonctionne.                         |
| Renouveler une IP dynamique (DHCP)              | `ipconfig /renew` (Windows) / `dhclient` (Linux)                          | Redemande une IP au serveur DHCP.                                 |
| Libérer une IP (forçage DHCP)                   | `ipconfig /release` (Windows) / `dhclient -r` (Linux)                     | Libère l'adresse IP actuelle.                                     |
| Vider le cache DNS                              | `ipconfig /flushdns` (Windows) / `systemd-resolve --flush-caches` (Linux) | Vide les anciennes résolutions DNS.                               |
| Voir les connexions réseau actives              | `netstat -a` (Windows) / `ss -a` (Linux)                                  | Liste toutes les connexions TCP/UDP en cours.                     |
| Vérifier la table ARP (IP ↔ MAC)                | `arp -a` (Windows) / `ip neigh` (Linux)                                   | Liste les correspondances IP <-> MAC connues.                     |
| Vérifier la table de routage                    | `netstat -r` ou `ip route show`                                           | Affiche comment sont routées les IP.                              |
| Tracer le chemin vers une IP distante           | `tracert @IP` (Windows) / `traceroute @IP` (Linux)                        | Montre les routeurs traversés jusqu'à la destination.             |