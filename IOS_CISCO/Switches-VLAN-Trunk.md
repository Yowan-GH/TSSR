# Switches - VLAN & Trunk

Les switches segmentent un réseau en plusieurs VLANs et transportent ces VLANs via des trunks.  

## Les VLANs
Un VLAN (Virtual LAN) permet de séparer logiquement un réseau physique en plusieurs sous-réseaux indépendants.  
✔ Isolation du trafic (Ex: VLAN 10 pour les Admins, VLAN 20 pour les Étudiants)  
✔ Meilleure sécurité et réduction des collisions  
✔ Optimisation du trafic  

💡 Commandes de base pour créer et attribuer un VLAN :  

```bash
enable	
configure terminal
vlan 10         				# Création du VLAN 10
name Admin               		# Nommage du VLAN
exit
interface FastEthernet 0/1 		# Sélection du port
switchport mode access 			# Définit le mode accès
switchport access vlan 10 		# Assigne le VLAN 10 au port
no shutdown						# Activer le VLAN
exit
```


## Trunking : Communication entre VLANs
Les VLANs sur un switch ne peuvent pas communiquer entre eux sans un routeur ou un switch de niveau 3.  
Le trunking permet de transporter plusieurs VLANs sur un même lien entre deux switches.  
💡 Commandes pour configurer un Trunk :  

interface GigabitEthernet 0/1  
switchport mode trunk                	# Active le mode trunk  
switchport trunk allowed vlan 10,20  	# Autorise VLAN 10 et 20  
no shutdown  
exit  

