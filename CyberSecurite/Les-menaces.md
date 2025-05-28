# Les Menaces

<!-- tabs:start -->

### **🦠Virus**

✅ **Définition**  
Un virus est un programme malveillant qui s’attache à des fichiers (comme un `.exe` ou un document Word avec macro) pour se propager et endommager un système.

⚙️ **Méthode utilisée / Fonctionnement**  
Il se diffuse quand l’utilisateur exécute le fichier infecté. Il peut supprimer des fichiers, ralentir le système ou ouvrir des portes à d'autres attaques.

🛡️ **Détection / Prévention**
- **Antivirus** (ex : Windows Defender, Avast)
- **EDR** pour surveiller les comportements anormaux
- Éviter d’ouvrir des pièces jointes douteuses ou des exécutables inconnus
### **🪱 Ver (worm)**

✅ **Définition**  
Un ver est un programme qui se **propage automatiquement** d’un ordinateur à l’autre sans action de l’utilisateur.

⚙️ **Méthode utilisée / Fonctionnement**  
Il utilise des failles réseau (comme SMB ou RDP) pour se copier sur d'autres machines. Il peut bloquer un réseau entier en quelques minutes (ex : **WannaCry**).

🛡️ **Détection / Prévention**
- IDS réseau pour détecter des flux anormaux
- Patchs de sécurité à jour
- Isolation des machines sensibles (VLAN)
### **🐴Cheval de Troie (Trojan)**

✅ **Définition**  
Un cheval de Troie est un programme qui semble utile ou inoffensif mais qui **cache un logiciel malveillant**.

⚙️ **Méthode utilisée / Fonctionnement**  
Souvent intégré à un faux outil, il permet à un attaquant d’installer un espion, un enregistreur de frappe, ou d’ouvrir une porte dérobée (backdoor).

🛡️ **Détection / Prévention**
- EDR et antivirus
- Vérification des sources des logiciels installés
- Restreindre les droits utilisateurs
### **🔐Ransomware**

✅ **Définition**  
Un ransomware **chiffre les fichiers** de la victime et demande une rançon (souvent en Bitcoin) pour les déverrouiller.

⚙️ **Méthode utilisée / Fonctionnement**  
Se propage via mails frauduleux ou RDP mal sécurisé. Ex : **Locky**, **Ryuk**. Il chiffre `.docx`, `.jpg`, `.sql`, etc. en rendant les données inaccessibles.

🛡️ **Détection / Prévention**
- EDR avec détection de chiffrement massif
- Sauvegardes régulières **déconnectées**
- MFA + désactivation des ports RDP inutilisés
### **🌐 DDoS (Déni de service distribué)**

✅ **Définition**  
Le DDoS vise à **saturer un service ou un serveur** avec un très grand nombre de requêtes pour le rendre indisponible.

⚙️ **Méthode utilisée / Fonctionnement**  
L’attaquant utilise un **botnet** (réseau de machines zombies) pour surcharger une cible (ex : site web, serveur de jeu).

🛡️ **Détection / Prévention**
- Mitigation DDoS (Cloudflare, OVH, firewall UTM)
- Limitation de débit (rate limiting)
- Surveillance de bande passante
### **🎣Phishing**

✅ **Définition**  
Le phishing vise à **tromper un utilisateur** pour lui voler ses identifiants ou données confidentielles.

⚙️ **Méthode utilisée / Fonctionnement**  
Mail frauduleux imitant un site connu (banque, Microsoft) avec un lien vers une **fausse page de connexion**. Ex : “Votre compte est bloqué, cliquez ici !”

🛡️ **Détection / Prévention**
- Antispam + analyse des liens (sandbox)
- Sensibilisation des utilisateurs
- Activation du **MFA**
### **👥Ingénierie sociale**

✅ **Définition**  
C’est une attaque qui cible **l’humain plutôt que la machine**, en jouant sur la confiance ou la peur.

⚙️ **Méthode utilisée / Fonctionnement**  
Exemples :
- **Faux président** : usurpation d’un dirigeant pour ordonner un virement
- **Faux support IT** : demander un mot de passe par téléphone
    

🛡️ **Détection / Prévention**
- Formation des salariés
- Procédures de vérification d’identité
- Politique de double validation (ex : appels de confirmation)
### **👀Man-in-the-middle (MITM)**

✅ **Définition**  
L’attaquant **intercepte une communication** entre deux parties pour espionner ou modifier les données.

⚙️ **Méthode utilisée / Fonctionnement**  
Il s’interpose entre un utilisateur et un serveur (ex : sur un Wi-Fi public non chiffré) et capture les identifiants ou modifie les réponses.

🛡️ **Détection / Prévention**
- VPN sur les réseaux publics
- HTTPS obligatoire
- IDS réseau
### **💉Injection SQL**

✅ **Définition**  
C’est une attaque qui permet à un pirate d’**exécuter des requêtes SQL** non autorisées dans une base de données via une application web.

⚙️ **Méthode utilisée / Fonctionnement**  
Il insère du code malveillant dans un champ (ex : login) pour afficher ou modifier des données (ex : `' OR 1=1 --`).

🛡️ **Détection / Prévention**
- Validation des champs utilisateur
- Requêtes préparées (PDO, ORM)
- WAF (Web Application Firewall)

### **🖼️ Défiguration de site**

✅ **Définition**  
Une attaque qui modifie l’apparence ou le contenu d’un site web.

⚙️ **Méthode utilisée / Fonctionnement**  
Le pirate remplace la page d’accueil d’un site par un message politique, religieux ou moqueur (souvent via FTP ou CMS vulnérable).

🛡️ **Détection / Prévention**
- CMS et plugins à jour
- Accès FTP restreint + journalisé
- WAF + vérification d'intégrité des fichiers
### **📶Attaque Wi-Fi**

✅ **Définition**  
Un attaquant tente de s’introduire dans un réseau Wi-Fi, souvent public ou mal sécurisé.

⚙️ **Méthode utilisée / Fonctionnement**  
Rogue AP (faux point d’accès), attaque brute-force sur WPA, écoute de paquets via sniffer Wi-Fi (Wireshark, Aircrack).

🛡️ **Détection / Prévention**
- WPA3 + mot de passe fort
- Isolation des clients
- Tunnel VPN obligatoire sur Wi-Fi public
  

### **🧠Attaque par tête de pont**

✅ **Définition**  
L’attaquant pénètre une machine peu protégée pour **étendre son accès vers des cibles plus sensibles** dans le réseau.

⚙️ **Méthode utilisée / Fonctionnement**  
Ex : un poste utilisateur est compromis → l’attaquant **pivote** pour atteindre les serveurs (mouvement latéral).

🛡️ **Détection / Prévention**
- EDR (analyse des mouvements sur le réseau)
- Segmentation réseau (DMZ, VLAN)
- Pare-feux internes
### **🧑‍💻 Fraude interne**

✅ **Définition**  
Un collaborateur légitime utilise ses droits d’accès pour **voler, modifier ou supprimer des données**.

⚙️ **Méthode utilisée / Fonctionnement**  
Vol de données clients, sabotage, revente d’infos, installation de portes dérobées. Souvent lié à des conflits internes.

🛡️ **Détection / Prévention**
- SIEM (analyse centralisée des logs)
- Séparation des privilèges
- Journalisation + alertes sur actions sensibles

<!-- tabs:end -->