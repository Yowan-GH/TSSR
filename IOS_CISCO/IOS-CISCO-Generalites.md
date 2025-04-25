# IOS CISCO - Generalités

## Qu'est-ce que IOS ? 

Cisco IOS (Internetwork Operating System) est le système d'exploitation des équipements Cisco (switches, routeurs, firewalls). Il permet de :  
✔ Configurer et gérer les équipements réseau.  
✔ Superviser le trafic et diagnostiquer les pannes.  
✔ Appliquer des politiques de sécurité et de routage.  

## Modes d’IOS

Cisco IOS fonctionne en plusieurs modes :

Quelques commandes de bases :  

|									|											|
|---------------------------------------|---------------------------------------|
|``show running-config  ``					|# Voir la config en cours  |
|``show startup-config `` 					|# Voir la config de démarrage  |
|``copy running-config startup-config``  	|# Sauvegarde la config  |
|``erase startup-config `` 					|# Supprime la config de démarrage  |
|``reload `` 								|# Redémarre l’équipement  |
|``show ip interface brief ``				|# Affiche le résumé des IP  |
|``show interfaces status ``				|# Affiche l’état des interfaces  |
|``show interfaces ``						|# Affiche les interfaces  |

## Sécurisation des lignes physiques et distantes

Mise en place d’un mot de passe sur la ligne physique (port console) 0 :   
```bash
line console 0 
password ####   
login  
end
```
Possibilité de faire la même chose pour une connexion telnet ou ssh (VTY)  
```bash
line console vty 0 15  
password ####   
login  
end 
```
Mise en place d’un mot de passe sur le mode privilège (enable)
```bash
configure terminal  
enable secret ####  
exit
```
Chiffrer les mots de passes de la config globale  
```bash
configure terminal  
service password-encryption
```

## Port VTY (Virtual Teletype) sur Cisco
Le port VTY est utilisé pour les connexions à distance sur un équipement Cisco via Telnet ou SSH.  
📌 Ce qu'il permet :  
✔ Accéder à un routeur ou un switch à distance.  
✔ Gérer plusieurs sessions simultanées (0 à 15).  
✔ Renforcer la sécurité avec un mot de passe ou SSH.  

Configuration de base des ports VTY  
Par défaut, Cisco autorise 16 ports VTY (VTY 0 à 15), mais seuls VTY 0 à 4 sont activés.  
Configuration des ports VTY avec SSH (Sécurisé 🔐)  
Attention, par défaut, les ports VTY utilisent le telnet, non sécurisé  
Étapes pour sécuriser l'accès avec SSH :
- Activer SSH sur le switch/routeur.  
- Configurer un nom de domaine et une clé RSA.
- Restreindre les ports VTY à SSH uniquement.  

```bash
enable
configure terminal							# Entre en mode configuration globale
hostname Switch           					# Définition d'un nom (obligatoire pour SSH)
ip domain-name monreseau.com				# Définition d'un domaine
crypto key generate rsa 	 				# Génération de la clé RSA (1024 bits minimum)
username admin privilege 15 secret Cisco123	# Création d'un utilisateur avec un mot de passe

line vty 0 15
login local               					# Utilisation de l'authentification locale
transport input ssh         				# Désactive Telnet, active SSH uniquement
exit										# Sort du mode courant 
```

 <span style="color:rgb(255, 0, 0)">Remplace le mot de passe définit en vty (telnet) ne remplace pas le mot de passe privilège</span> 
 
**Vérifier et gérer les connexions VTY**  

💡 Vérifier les connexions en cours : 
```bash
show users  # Affiche les utilisateurs connectés en VTY  
show line vty 0 4  # Infos sur l'état des sessions VTY  
```


💡 Forcer la déconnexion d'un utilisateur :  
```bash
clear line vty 2  			# Déconnecte l'utilisateur sur le port VTY 2
```
