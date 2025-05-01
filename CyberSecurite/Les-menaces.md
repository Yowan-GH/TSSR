# Les Menaces

<!-- tabs:start -->
#### **🎣 Phishing**

📌 Définition :  
Le phishing (hameçonnage) est une technique où un attaquant usurpe une identité (banque, entreprise, service en ligne) pour tromper la victime et lui voler des informations sensibles (identifiants, mots de passe, numéros de carte bancaire).  

🎭 Méthodes utilisées :  
Email frauduleux (ex. : "Votre compte PayPal est bloqué, cliquez ici pour le réactiver").  
Faux sites web imitant des pages officielles pour récupérer des identifiants.  
SMS ou appels téléphoniques (smishing et vishing).  
#### **🧠 Ingénierie Sociale**

📌 Définition :  
L’ingénierie sociale est une technique de manipulation psychologique utilisée par les hackers pour pousser une personne à révéler des informations sensibles ou à exécuter une action compromettante.  

🎭 Méthodes utilisées :  
Prétexte convaincant : Se faire passer pour un collègue ou un technicien IT.  
Exploitation de la peur ou de l’urgence : "Votre compte va être désactivé si vous ne répondez pas immédiatement".  
Attaque en personne : Un individu entre dans une entreprise en prétendant être un technicien et branche une clé USB infectée.  
#### **⚓ Attaque par Tête de Pont**

📌 Définition :  
L’attaque par tête de pont consiste à compromettre un premier système faible, puis à l’utiliser comme un point d’accès pour attaquer d’autres parties du réseau.  

🔍 Fonctionnement :  
Compromission d’une machine peu sécurisée (ex. un PC mal protégé).  
Prise de contrôle par un attaquant qui installe un malware ou un outil d’accès distant.  
Déplacement latéral : Il explore et attaque d’autres systèmes internes (serveurs, bases de données).  
## **🕵️ Fraude Interne**

La fraude interne désigne les actes malveillants commis par un employé, un prestataire ou une personne interne à l’organisation pour détourner des ressources, manipuler des informations ou compromettre la sécurité.  

🚨 Pourquoi est-elle dangereuse ?  
Contrairement aux cyberattaques externes, la fraude interne est plus difficile à détecter car l’attaquant a déjà des accès légitimes au système.  

1️⃣ Types de Fraudes Internes  

Facteurs Favorisant la Fraude Interne  
✅ Accès trop larges : Les employés ont plus de droits que nécessaire.  
✅ Absence de surveillance : Pas de journalisation ou d’audit des actions sensibles.  
✅ Manque de formation : Les employés ignorent les règles de cybersécurité.  
✅ Motivations personnelles : Revanche, besoin d’argent, pression externe (chantage).  

- **80%** des domaines Active Directory sont compromis en 2 heures
- **75%** des domaines Active Directory contiennent au moins 1 compte privilégié avec un mot de passe trivial
- **50%** des entreprises sont affectées par un défaut de cloisonnement de ses réseaux
- **80%** des tests d’intrusion ne sont pas détectés par les équipes IT

---
## **🦠 Virus Informatique**

Un virus informatique est un programme malveillant conçu pour infecter, endommager ou perturber un système informatique. Il se propage en s’attachant à des fichiers ou programmes légitimes et s’active lorsque l’utilisateur exécute l’hôte infecté.  
🚨 Différence avec un malware ?  
🔹 Un malware (malicious software) est un terme général pour tous les logiciels malveillants (virus, ransomware, trojan, etc.).  
🔹 Un virus est un type spécifique de malware qui se réplique en infectant des fichiers.


Caractéristiques d’un Virus Informatique  
✅ Se propage en infectant des fichiers légitimes (ex. documents, exécutables).  
✅ S’active lorsque l’utilisateur exécute le fichier infecté.  
✅ Peut modifier, supprimer ou chiffrer des fichiers.  
✅ Peut ralentir un système ou le rendre inutilisable.  

### Types de Virus Informatiques  

Comment un Virus se Propage ?  
📂 Fichiers infectés (ex. un email contenant un fichier malveillant).  
💾 Supports amovibles (ex. clé USB contaminée).  
🌐 Sites web compromis (ex. téléchargement d’un faux logiciel).  
📩 Emails et pièces jointes (ex. document Word contenant un virus macro).  
🔗 Réseaux P2P et torrents (ex. faux cracks de logiciels).  
## **🌊 Attaque DDoS**

Une attaque DDoS (Déni de Service Distribué) vise à saturer un serveur, un réseau ou un site web en générant un trafic massif et artificiel, empêchant les utilisateurs légitimes d’y accéder.  

🚨 Différence entre DoS et DDoS  
- DoS (Denial of Service) : Attaque provenant d’une seule machine.
- DDoS (Distributed Denial of Service) : Attaque menée par plusieurs machines infectées (réseau de bots ou botnet).

### Fonctionnement d’une Attaque DDoS 

🔗 Étapes d’une attaque DDoS :  
1️. Création d’un Botnet 🦠 : L’attaquant infecte des milliers d’ordinateurs/objets connectés (IoT, PC, serveurs) avec un malware.  
2️. Commande d’attaque 📡 : L’attaquant envoie un ordre aux machines infectées (zombies).  
3️. Saturation de la cible 🔥 : Le botnet envoie des millions de requêtes pour épuiser les ressources du serveur cible.  

<!-- tabs:end -->