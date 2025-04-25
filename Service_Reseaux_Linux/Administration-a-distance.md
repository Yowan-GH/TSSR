# Administration à distance
## Protocole SSH

### Installation du paquet

Paquet à installer coté serveur : **openssh-client**  
Coté client, on peut installer : **Putty, mRemoteNG ou MobaXterm**

### Commande SCP

Copier des fichiers en ssh avec la commande :
``scp user@ip:/chemininitial /chemindestination``

### Accès par clé ssh

Lors de transfert / connexion régulière à une machine distante, il peut être dérangeant de toujours devoir se log avec user et mdp.  
Ces clés ssh peuvent nous permettre :  
- De nous connecter plus rapidement
- Automatiser le transfert de fichier entre machine

Pour générer ces clés, on va utiliser le commande ``ssh-keygen``  
Obtention d’une paire de clé :
- Privée (stockée en local et à backuper)
- Public à installer sur les serveurs pour se connecter  
Lorsque la clé est créée, il faut copier la clé publique avec la commande
``ssh-copy-id user@ip``

Il est impossible de se connecter en ssh avec root mais il est possible de le faire avec une clé ssh. Pour cela :
1. Vérifier que le répertoire .ssh existe dans ``/root``
2. Faire un ``chmod 700 ``sur le repertoire ``.ssh``
3. Ajouter la clé authorized_key dans le repertoire ssh
Par defaut, la clé se trouve dans le $HOME/.ssh du user ayant copié la clé  
Je peux me connecter sur ma machine distante avec root
