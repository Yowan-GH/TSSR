
# 🧰 Commandes Réseau

## 🧰 Netstat
<!-- tabs:start --> 
### **🪟 netstat sous Windows**

|🔍 Affichage dynamique|💻 Commande Windows|
|---|---|
|Connexions TCP actives et ports TCP/UDP en écoute|`netstat -a`|
|Processus liés aux connexions TCP/UDP|`netstat -b`|
|Connexions par protocole (TCP, UDP, TCPv6…)|`netstat -p proto`|
|Statistiques Ethernet (octets, paquets)|`netstat -e`|
|Table de routage|`netstat -r`|
|Statistiques par protocole|`netstat -s`|

###  **🐧 ss sous Debian**

|📋 Affichage des infos réseau|💻 Commande Debian|
|---|---|
|Connexions TCP et UDP actives|`ss -ut`|
|Toutes les connexions en écoute et établies|`ss -a`|
|IP et ports en format numérique|`ss -n`|
|Processus liés aux connexions|`ss -p`|
|Sockets en écoute uniquement|`ss -l`|

### **🐧 netstat sous Linux**

Nécessite l'installation du paquet ``sudo apt install net-tools

|📋 Informations à afficher|💻 Commande|
|---|---|
|Connexions TCP actives|`netstat`|
|Table de routage|`netstat -r`|
|Table d’interfaces réseau|`netstat -i`|
|PID / programme liés aux sockets|`netstat -p`|
|Connexions masquées (firewall, etc.)|`netstat -M`|
<!-- tabs:end --> 


## 📍 Tracer les routes réseau (Windows / Debian)

### 🪟 Windows :
`tracert @IP/site tracert -4 www.google.fr        # Forcer l’usage d’IPv4`

### 🐧 Debian :
`traceroute @IP/site traceroute -4 www.google.fr     # Forcer l’usage d’IPv4`

🔎 Ces commandes montrent **les routeurs traversés** jusqu'à destination  
(utile pour identifier un point de blocage)


## 🌐 Scanner le réseau avec Nmap

|📋 Type de scan|💻 Commande|
|---|---|
|Scan de base d’une IP ou d’un hôte|`nmap 192.168.100.100`|
|Scan de ports spécifiques|`nmap -p 80,443 192.168.100.100`|
|Scan de tous les ports|`nmap -p- 192.168.100.100`|
|Scan avec détection de l’OS|`nmap -O 192.168.100.100`|
