# Vulnérabilité, Menace et Attaque en Cybersécurité

En cybersécurité, ces trois concepts sont liés mais distincts :
- Vulnérabilité : Une faiblesse ou faille dans un système qui peut être exploitée.
- Menace : Un danger potentiel qui pourrait exploiter une vulnérabilité.
- Attaque : L’exploitation réelle d’une vulnérabilité par un acteur malveillant.

## Vulnérabilité (Faiblesse du système)

📌 Définition :  
Une vulnérabilité est une faille dans un système, une application ou une configuration qui peut être exploitée pour compromettre la sécurité.  

🚨 Exemples de vulnérabilités :  
Logicielle : Bug dans un programme (ex. buffer overflow).  
Matérielle : Processeur vulnérable (ex. Spectre/Meltdown).  
Humaine : Mauvaise gestion des mots de passe (ex. "123456").  
Configuration : Port SSH ouvert sans restriction.  

✅ Solutions :  
Appliquer des mises à jour et correctifs (patch management).  
Renforcer les politiques de sécurité (authentification forte, MFA).  
Auditer et tester régulièrement avec des scanners de vulnérabilités (Nessus, OpenVAS).  

---
## Menace (Le danger potentiel)

📌 Définition :  
Une menace est un acteur ou un événement qui pourrait exploiter une vulnérabilité pour causer un dommage.  

🚨 Exemples de menaces :  
Cybercriminels : Hackers cherchant à voler des données.   
Malwares : Virus, ransomwares, chevaux de Troie.  
Erreurs humaines : Employé envoyant un email à la mauvaise personne.  
Catastrophes naturelles : Panne électrique, incendie impactant un datacenter.  

✅ Solutions :  
Mettre en place un pare-feu (firewall) et un antivirus.  
Former les utilisateurs pour éviter les erreurs humaines.  
Élaborer des plans de continuité (PCA/PRA).  

---
## Attaque (L’action réelle)

📌 Définition :  
Une attaque est une action malveillante qui exploite une vulnérabilité pour causer un dommage.  

🚨 Exemples d’attaques :  
Phishing : Email frauduleux pour voler des identifiants.  
Injection SQL : Piratage d’une base de données via une requête malveillante.  
Ransomware : Logiciel qui chiffre les fichiers et demande une rançon.  
Déni de service (DDoS) : Saturation d’un serveur pour le rendre indisponible.  

✅ Solutions :  
Détecter et bloquer les attaques avec des SIEM et IDS/IPS.  
Appliquer une segmentation réseau pour limiter l’impact.  
Sauvegarder régulièrement les données pour se protéger des ransomwares.  
