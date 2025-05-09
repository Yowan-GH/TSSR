# DNS autoritaire
## Définition

 🧭 **DNS Autoritaire**

C’est un serveur DNS qui détient la version **officielle** d’un (ou plusieurs) nom de domaine (avec ses enregistrements). Il répond aux requêtes **concernant les domaines qu’il gère**.
Il sera **interrogé** par les serveurs **DNS résolveurs** Il peut héberger des zones primaires ou secondaires.

Une zone est un ensemble d’information ayant une caractéristique commune :
- Partie d’un nom de domaine
- Reseau IP d’appartenance

Zone direct : Répertorie avec le nom de domaine  
Zone indirect : Répertorie avec l’adresse IP  

### Zone primaire :
Mis en place sur un serveur autoritaire  
Source d’info et source de modif (lecture et ecriture)  
Maitre  

### Zone secondaire :
Copie de la zone primaire donc ne fonctionne qu’en lecture  
Serveur esclave  
La notion de primaire et secondaire est à paramétrer au niveau de chaque zone.  


## Configuration d’un DNS faisant autorité

Les zones sont à paramétrer dans /etc/bind/named.conf.local

**Configuration pour une zone primaire direct :**
```shell
zone ‘’eni.demo’’  {		        # Nom de la zone
type master ;		                # Indique le type primaire
file ‘’db.eni.demo’’ ;	            # Les informations de zone seront dans le fichier db.eni.demo
allow-transfer { 10.11.0.53 ; } ;	# Autorise le transfert de zone vers 10.11.0.53
} ;
```
**Configuration pour une zone primaire invers :**
```shell
zone ‘’42.168.192.in-addr.arpa’’ {  # Nom de la zone
type master;                        # Indique le type primaire
file ‘’db.192.168.42.inv’’;         # Les informations de zone seront dans le fichier db.eni.demo
};
```
**Configuration pour une zone secondaire direct :**
```shell
zone ‘’eni.demo’’  {			    # Nom de la zone
type slave ;			            # Indique le type secondaire
masters {10.5.3.10 ; } ;		    # Indique le maitre
file ‘’db.eni.demo’’ ;	            # Les informations de zone seront dans le fichier db.eni.demo
allow-query { any; } ;	            # Autorise les requêtes clients
} ;
```

Le fichier de zone est db.eni.demo. On va distinguer 3 parties :   
*; point-virgule = commentaire en début / en cours de ligne*  

Attention, ce fichier doit se trouver dans le repertoire indiqué dans **/etc/bind/named.conf.option**

### 1. Définir deux variables :
```shell
$ORIGIN eni.ecole.bzh.		# Définit le nom du domaine
$TTL 86400		            # Définit le time to live (durée de conservation dans le cache DNS
```

### 2.Enregistrements des SOA (Nom du serveur maitre) et NS (Serveur faisant autorité pour la zone)

```dns
@  SOA dns1.eni-ecole.bzh. hostmaster.eni-ecole.bzh. (
        2019100253 ; serial
        86400      ; refresh 1 day
        7200       ; retry 2 hours
        3600000    ; expire
        3600 )     ; negative TTL
;

@  NS dns1.eni-ecole.bzh.
@  NS dns2.eni-ecole.bzh.
```
Avec

```shell
@ SOA dns1.eni-ecole.zsh.		# FQDN du DNS principal de la zone
Hostmaster.eni-ecole.bzh.	    # Email admin zone

Serial                          # sous le format AAAAMMJJxx  Doit être modifié à chaque modif
Refresh                         # Mise à jour tous les x
Retry                           # Si mon secondaire n’arrive pas à accéder à mon primaire, tous les cb doit il reesayer ?
Expire                          # Si mon serveur secondaire n’a pas réussit à requeter la primaire, expiration des infos

@ NS dns1.eni-ecole.bzh. 	    # Indique un serveur DNS gérant la zone
```

**Autres enregistrements de zone direct :**  

```dns
// Sous domaine 	/	Type d’enregistrement	/	Valeurs

dns1    A       44.0.5.3
dns1    AAAA    2001:0db8::ec01:e
dns2    AAAA    2001:0db8::ec01:e53

www     A       44.0.0.80
rdsgw   A       35.12.13.15
smtp    A       44.0.0.25

ww      CNAME   www.eni-ecole.bzh.
wwww    CNAME   www.eni-ecole.bzh.

@       MX 10   smtp.eni-ecole.bzh.
@       MX 20   mx0.mail.ovh.net.
```

Avec 

| Type d’enregistrement |     Contenu                                                              |
|------------------------|----------------------------------------------------------------------|
| SOA                    | nom FQDN du serveur DNS disposant de la zone en **écriture**         |
| NS                     | serveur(s) **faisant autorité** pour la zone                         |
| A                      | Hôte IPv4                                                            |
| AAAA                   | Hôte IPv6                                                            |
| CNAME                  | Alias                                                                |
| MX                     | Serveur de messagerie                                                |
| SRV                    | Services                                                             |


Commencer par les correspondances avec nos serveur DNS (ici 1 et 2).  
Pour les @MX, le chiffre indique le poids. Le plus petit sera interrogé en premier. Smtp = mail  

<img src="Service_Reseaux_Linux/images/Environnement_Linux_2.png">



## En pratique

On utilisera le IN (bonne pratique DNS) :  
@ IN SOA
@ IN NS
IN A
IN AAAA

Pour vérifier la syntaxe du fichier, exécuter la commande ``named-checkzone eleve.local /var/cache/bind/db.eleve.local``  
``rndc reload`` pour recharger la config de bind  
tester avec la commande ``dig elevel.local``.

Protocole complet :

1. Creation de la zone dans /etc/binf/named.conf.local

<img src="Service_Reseaux_Linux/images/Environnement_Linux_11.png">

2. Creation du fichier db.tssr.eni dans /var/cache/bind

<img src="Service_Reseaux_Linux/images/Environnement_Linux_7.png">

3. Test de la syntaxe de la configuration de zone
<img src="Service_Reseaux_Linux/images/Environnement_Linux_3.png">

4. Reload de la zone
<img src="Service_Reseaux_Linux/images/Environnement_Linux_14.png">

En cas d’erreur, vérifier dans le service bind9 avec systemctl status bind9.service.  
Sur le serveur DHCP, ajouter le suffixe DNS via « option domain-name ‘’tssr.eni’’  
Relancer le service DHCP et faire un ``flush`` sur la carte réseau du client et un ``dhclient `` 

**<span style="color:red"> Lors de la configuration d'un DNS secondaire, il est inutile de créér le fichier de zone. Celui-ci sera créé à partir du serveur maitre (export) et sera difficilement lisible (binaire brut)</span>**