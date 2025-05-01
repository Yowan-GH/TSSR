# Les DICP

Les critères DICP sont des principes fondamentaux en cybersécurité qui permettent d'assurer la protection des données et des systèmes informatiques. L'acronyme DICP signifie :  
- Disponibilité (D)
- Intégrité (I)
- Confidentialité (C)
- Preuve (P) (ou Traçabilité)

<!-- tabs:start --> 
## **Disponibilité (D)**

📌 Définition :  
La disponibilité signifie que les systèmes, services et données doivent être accessibles aux utilisateurs autorisés quand ils en ont besoin.  

🚨 Menaces :  
Attaques par Déni de Service (DoS/DDoS) : Inondation du réseau pour rendre un service inaccessible.  
Pannes matérielles ou logicielles : Défaillance des serveurs, crash de bases de données.  
Erreurs humaines : Mauvaise configuration entraînant des interruptions.  

✅ Solutions :  
Redondance et sauvegardes (RAID, sauvegardes régulières).  
Plans de reprise d’activité (PRA) et de continuité (PCA).  
Protection contre les attaques DDoS (firewalls, filtrage de trafic).  
## **Intégrité (I)**

📌 Définition :  
L’intégrité garantit que les données ne sont ni modifiées ni altérées de manière non autorisée.

🚨 Menaces :  
Attaques par injection SQL : Modification de bases de données par des commandes malveillantes.  
Altération de fichiers : Modification de logs ou de fichiers sensibles.  
Erreur humaine ou logicielle : Mauvaise manipulation des données.  

✅ Solutions :  
Hachage des données (SHA-256, MD5 avec sel pour vérifier l'intégrité).  
Contrôles d'accès stricts (ACL, permissions sur fichiers).  
Signature numérique et certificats (pour garantir l’authenticité des fichiers).  
## **Confidentialité (C)**

📌 Définition :  
La confidentialité assure que seules les personnes autorisées peuvent accéder aux informations sensibles.  

🚨 Menaces :  
Espionnage, vol de données (exfiltration de données sensibles).  
Attaques par phishing (vol d’identifiants).  
Mauvaise gestion des permissions (accès non autorisé aux fichiers).  

✅ Solutions :  
Chiffrement des données (AES, RSA, TLS pour protéger les communications).  
Authentification forte (MFA, cartes à puce, biométrie).  
Segmentation des accès (Zero Trust, principe du moindre privilège).  
## **Preuve / Traçabilité (P)**

📌 Définition :  
La traçabilité garantit qu’il est possible de retrouver l'origine d'une action et de prouver qui a fait quoi et quand.  

🚨 Menaces :  
Effacement des logs pour masquer des actions frauduleuses.  
Usurpation d’identité sans possibilité d’en retrouver l’origine.  
Absence de supervision et d’audit permettant aux menaces de passer inaperçues.  

✅ Solutions :  
Journaux et logs sécurisés (Syslog, SIEM pour centraliser et analyser les logs).  
Contrôle des accès avec horodatage (audit des connexions).  
Gestion des identités et authentification forte (IAM, SSO).  

<!-- tabs:end -->
## Récapitulatif des Critères DICP en Cybersécurité

Exemple d'Évaluation DICP en Cybersécurité  
Lors d’un audit de sécurité, une évaluation DICP est réalisée pour analyser la protection des données et des systèmes d’information. Voici un exemple d'évaluation pour un serveur web hébergeant des données sensibles.  

📌 Contexte

Entreprise : Société de e-commerce  
Système analysé : Serveur web (Apache) hébergeant des données clients  
Objectif : Évaluer la sécurité selon les critères DICP  

📊 Évaluation des critères DICP  

🔍 Rapport Final et Actions Correctives  
🔴 Problèmes critiques détectés :  
- Absence de protection DDoS ➝ Vulnérabilité aux attaques par saturation du service.  
- Connexion en HTTP non sécurisé ➝ Risque d’interception des identifiants clients.  
  
🟢 Actions recommandées :  
- ✅ Activer un pare-feu anti-DDoS et un CDN.
- ✅ Appliquer des politiques strictes de chiffrement (forcer HTTPS).
- ✅ Mettre en place un SIEM pour la centralisation des logs.  
  

📌 Conclusion  
L’évaluation DICP a permis d’identifier des faiblesses majeures en confidentialité et disponibilité. L’entreprise doit renforcer la sécurité pour prévenir les cyberattaques et la perte de données.  
Tu veux un exemple détaillé sur un autre type de système (routeur, cloud, base de données) ? 🔥  
4o
