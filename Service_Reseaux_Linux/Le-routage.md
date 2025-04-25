# Le routage

Trois types de route :  
- Route d’hôte pour attendre une machine spécifique
- Route de réseau (sur les routeurs)
- Route par défaut

Commande : ``ip route / ip r``

Par defaut une machine linux ne fait pas routeur mais cette option peut être activée dans /etc/sysctlconf en indiquant ``net.ipv4.ip_forward=1``  
Puis lancer la commande ``sysctl=p``

Sur PF sense, vérifier que le NAT est bien sur **outbound**
