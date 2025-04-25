# Routeurs - Inter-VLAN, RIP & Autres Protocoles

## Inter-VLAN Routing (Routage entre VLANs)
Un switch ne peut pas faire communiquer plusieurs VLANs.  
Solution :
- Router-on-a-stick : Un routeur utilise une seule interface en trunk pour gérer plusieurs VLANs.
- Switch L3 (MLS - Multi-Layer Switching) : Un switch de niveau 3 effectue le routage.

💡 Configuration Router-on-a-stick
```bash 
interface GigabitEthernet 0/0
no shutdown
interface GigabitEthernet 0/0.10      	# Sous-interface VLAN 10
encapsulation dot1Q 10
ip address 192.168.10.1 255.255.255.0
interface GigabitEthernet 0/0.20      	# Sous-interface VLAN 20
encapsulation dot1Q 20
ip address 192.168.20.1 255.255.255.0
exit 
```

## Protocole de Routage RIP
RIP (Routing Information Protocol) est un protocole de routage dynamique basé sur la distance.  
Il permet lorsqu’il y a plusieurs routeurs de toujours choisir le chemin le plus court.   
🚨 Limite : Convergence lente, métrique max de 15 sauts.  

💡 Configuration RIP v2  
```bash
router rip
version 2
network 192.168.10.0
network 192.168.20.0
no auto-summary
exit
```

![Image](Commandes_CISCO_1.png)  


## NAT (Network Address Translation)

Le **NAT (Network Address Translation)** est une technique utilisée pour **modifier les adresses IP dans les en-têtes des paquets** de données lorsqu'ils traversent un routeur ou un pare-feu.   
Elle permet de **résoudre des problèmes liés à la pénurie d'adresses IPv4** en masquant les adresses privées du réseau interne derrière une adresse publique.  


### Pourquoi utiliser le NAT ?
- Économiser des adresses IP publiques : Le NAT permet à plusieurs appareils sur un réseau privé de partager une seule adresse IP publique pour se connecter à Internet. Cela est particulièrement utile car les adresses IPv4 sont limitées.
- Sécuriser les réseaux privés : Le NAT masque les adresses IP privées des utilisateurs internes, rendant le réseau interne moins vulnérable aux attaques externes.
- Faciliter la gestion des réseaux : Le NAT permet de configurer un réseau interne sans avoir à gérer des adresses IP publiques pour chaque appareil.  

### Types de NAT
**Static NAT (NAT statique)**  
C'est une traduction un à un entre une adresse IP privée et une adresse IP publique. Elle est utilisée lorsque tu veux que certains hôtes du réseau interne aient une adresse IP publique fixe.  

Exemple : Un serveur web interne avec une adresse privée 192.168.1.10 peut être mappé de manière statique à une adresse publique 203.0.113.10 pour que les utilisateurs externes puissent y accéder.  

Commandes :  
```bash
enable
configure terminal
ip nat inside source static 192.168.1.10 203.0.113.10  						# Associe 192.168.1.10 à 203.0.113.10
```

**Dynamic NAT (NAT dynamique)**  

Le Dynamic NAT associe une adresse IP privée à une adresse IP publique d'un pool d'adresses. Ce type de NAT est utilisé lorsque tu as plusieurs hôtes internes qui doivent accéder à Internet, mais que tu ne veux pas leur attribuer une adresse publique fixe.  

📌 Exemple : Si tu as un réseau avec plusieurs ordinateurs internes, le NAT dynamique va les traduire à partir d'un pool d'adresses publiques disponibles pour l'accès à Internet.  

Commandes :  
```bash
enable
configure terminal
ip nat pool public-pool 203.0.113.10 203.0.113.20 netmask 255.255.255.0  	# Déclare un pool d'IP publiques
ip nat inside source list 1 pool public-pool  								# Utilisation du pool pour la traduction
access-list 1 permit 192.168.1.0 0.0.0.255  								# Définir les adresses privées autorisées
```


**PAT (Port Address Translation)**, aussi appelé NAT Overload

Le PAT permet de traduire plusieurs adresses IP privées en une seule adresse IP publique mais avec des numéros de port différents. Cela permet à plusieurs hôtes internes de partager une même adresse publique pour l'accès à Internet.  

📌 Exemple : Tous les ordinateurs dans un réseau local peuvent partager une seule adresse IP publique pour accéder à Internet, mais chaque connexion sortante aura un numéro de port unique.  

Commandes de configuration :  
```bash
enable
configure terminal
ip nat inside source list 1 interface Ethernet0 overload  					# Utilise l'interface externe et active le PAT
access-list 1 permit 192.168.1.0 0.0.0.255  								# Définir les adresses privées autorisées
```