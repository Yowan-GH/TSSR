# DNS résolveur
## Définition

🔍 **DNS Résolveur** (ou client DNS)

C’est le composant qui interroge les serveurs DNS pour traduire un nom de domaine (ex : `google.com`) en adresse IP.

Il permet la correspondance entre un FQDN et une adresse IP
Pour plus d'information, voir le cour DNS résolveur Windows
## Mise en place

Utilisation du paquet ``bind9`` (service bind9) + ``dnsutils`` (commande de résolution DNS, optionnel)  

- Commandes du fichier /etc/bind/named.conf  
```shell
named-checkconf                         # Vérifie le fichier de configuration
named-checkzone                         # Vérifie le fichier de zone
rndc reload ou systemctl restart bind9  # Recharger la config
``` 

- Option du fichier **/etc/bind/named.conf**

```conf
// rsxclts = réseaux des postes clients de l’entreprise
acl rsxclts { 127.0.0.0/8; 192.168.53.0/24; 192.168.1.0/24; };

include /etc/bind/named.conf.options ;
include /etc/bind/named.conf.local ;
include /etc/bind/named.conf.default-zones ;
```

- Option du fichier «named.conf.options»  

```shell
forward only;                 #  Bind n’utilisera QUE les serveurs spécifiés dans forwarders, et pas la résolution récursive classique.
forwarders {@IP;};            # permet une redirection des requetes DNS vers l’IP spécifiée
allow-query {@IP;};           # permet la réponse depuis le serveur DNS à une liste d’IP spécifique (ACL)
allow-recursion {@IP;};       # restriction des hôtes autorisés à adresser des requêtes récursives
listen on v6 : none           # Desactive l'écoute sur IPv6
dnssec-enable no ;            # Le serveur n’utilisera pas DNSSEC pour signer ses zones.
dnssec-validation no;         #  Il ne validera pas les réponses signées par d’autres serveurs.
```

- Exemple de configuration named.conf.options
```conf
options {
    // Répertoire de travail de Bind9
    directory "/var/cache/bind";

    // Redirection exclusive (pas d’appel aux racines en cas d’indisponibilité)
    // vers les serveurs Quad9
    forward only;
    forwarders { 9.9.9.9; };

    // Restriction des hôtes auxquels répond le serveur
    allow-query { rsxclts; };

    // Restriction des hôtes autorisés à adresser des requêtes récursives
    allow-recursion { rsxclts; };

    // Communication DNSSEC désactivée
    dnssec-enable no;
    dnssec-validation no;

    // Information de version non communiquée
    version none;
};
```
## En pratique

Lorsque le DNS est configuré, l’adresse IP du DNS (nameserver) se trouve dans ``/etc/resolv.conf``  
Si le résultat est une ipv6, il est possible de la désactiver en allant dans ``/etc/sysctl.conf`` et ajouter :  
``net.ipv6.conf.all.disable_ipv6 = 1`` puis ``sysctl -p`` pour valider.  

*Lors de longue reponse, rajouter le | more pour faire defiler les pages* 

Commande :  
``dig `` = ``tracert`` avec le paquet **dnsutils**
