# ✅ Test – Services MDT, WDS et RDS

---
## Question 1 :
Afin d'automatiser totalement le processus de déploiement de votre entreprise, vous avez installé MDT. Parmi les éléments suivants, lesquels doivent être configurés ?

- Une image de capture  
- Une zone de recherche directe  
- Une séquence de tâches  
- Un partage de déploiement  

**Réponse :**  
- ✅ Une image de capture : contient l’OS à déployer.  
- ✅ Une séquence de tâches : automatise les étapes du déploiement.  
- ✅ Un partage de déploiement : structure contenant tous les fichiers MDT.

---

## Question 2 :
Que faire pour que les modifications MDT soient répercutées dans WDS ?

- Mettre à jour la séquence de tâches depuis MDT  
- Remplacer l’image de déploiement WDS  
- Mettre à jour le partage de déploiement depuis MDT  
- Remplacer l’image de démarrage WDS  

**Réponse :**  
- ✅ Remplacer l’image de démarrage WDS : elle contient le WinPE personnalisé par MDT.

---

## Question 3 :
Quels fichiers sont utilisés par MDT pour la configuration ?

- CustomSettings.ini  
- MSDeploy.ini  
- Bootstrap.ini  
- WinPE.ini  

**Réponse :**  
- ✅ CustomSettings.ini : règle le comportement du déploiement.  
- ✅ Bootstrap.ini : configure l’accès initial au partage de déploiement MDT.

---

## Question 4 :
Que faut-il configurer après l'installation de MDT ?

- Créer un partage de déploiement  
- Ajouter une séquence de tâches  
- Adapter les fichiers de configuration  
- Configurer le service DHCP  

**Réponse :**  
- ✅ Créer un partage de déploiement : cœur de MDT.  
- ✅ Ajouter une séquence de tâches : indispensable pour déployer.  
- ✅ Adapter les fichiers de configuration : personnalisation et automatisation.

---

## Question 5 :
Quel est le prérequis à l'installation de MDT ?

- Le service WDS  
- La suite d’outils ADK  
- Le service WSUS  
- Le service RDS  

**Réponse :**  
- ✅ La suite d’outils ADK : fournit les outils nécessaires à MDT, notamment WinPE.

---

## Question 6 :
À quels niveaux peut-on restreindre l’accès aux applications publiées ?

- Propriétés du serveur hôte  
- Sur une collection  
- Au niveau du rôle RDS  
- Propriétés des applications publiées  

**Réponse :**  
- ✅ Sur une collection : on définit les utilisateurs autorisés à accéder aux applis.  
- ✅ Propriétés des applications publiées : filtrage plus fin par groupe ou utilisateur.

---

## Question 7 :
Qui peut accéder aux serveurs RDS après configuration par défaut ?

- Membres du groupe local "Utilisateurs du bureau à distance"  
- Aucun utilisateur  
- Membres du groupe global du domaine  
- Tous les utilisateurs du domaine  

**Réponse :**  
- ✅ Membres du groupe local "Utilisateurs du bureau à distance" : seuls les membres de ce groupe local ont les droits RDP par défaut.

---

## Question 8 :
Quelles affirmations sont vraies concernant RDS ?

- L'application est à installer sur le poste client  
- Elle consomme les ressources du client  
- Elle consomme les ressources du serveur  
- Elle est à installer sur un serveur  

**Réponse :**  
- ✅ Elle consomme les ressources du serveur : l’exécution a lieu côté hôte RDS.  
- ✅ Elle est à installer sur un serveur : les clients n’ont qu’une interface distante.

---

## Question 9 :
Quels éléments peuvent être fournis via RDS ?

- Partages d’imprimantes  
- Applications  
- Partages de fichiers  
- Bureaux distants  

**Réponse :**  
- ✅ Applications : via RemoteApp.  
- ✅ Bureaux distants : sessions complètes accessibles à distance.

---

## Question 10 :
Quel outil permet de gérer RDS graphiquement ?

- Console MMC  
- Panneau de configuration  
- Console de jeu PS5  
- Gestionnaire de serveur  

**Réponse :**  
- ✅ Gestionnaire de serveur : outil graphique principal pour la gestion des rôles Windows Server, dont RDS.

---

## Question 11 :
Quel protocole est utilisé pour les échanges entre un poste client RDS et le serveur ?

- RDP  
- RDS  
- NTP  
- DNS  

**Réponse :**  
- ✅ RDP : Remote Desktop Protocol, utilisé pour les sessions distantes.

---

## Question 12 :
Quels rôles sont nécessaires pour une infrastructure RDS d'applications distantes ?

- RDS Licensing  
- RDS Media Gateway  
- RDS Host Session  
- RDS Hyper-V Host  
- RDS Connection Broker  
- RDS Web Access  

**Réponse :**  
- ✅ RDS Licensing : pour la gestion des CAL RDS.  
- ✅ RDS Host Session : héberge les sessions/applications.  
- ✅ RDS Connection Broker : redirige et répartit les connexions.  
- ✅ RDS Web Access : accès aux RemoteApps via un portail web.

---

## Question 13 :
Quelle est l'URL d’accès par défaut au portail web RDS ?

- https://serveur.domaine.ad/rds  
- https://serveur.domaine.ad/rdp  
- https://serveur.domaine.ad/iis  
- https://serveur.domaine.ad/rdweb  

**Réponse :**  
- ✅ https://serveur.domaine.ad/rdweb : URL par défaut du portail RD Web Access.

---

## Question 14 :
Sur quel objet RDS configure-t-on la publication d'une application ?

- La collection  
- Le bureau distant  
- La session distante  
- Les propriétés du serveur hôte de session  

**Réponse :**  
- ✅ La collection : c’est l’unité logique dans laquelle on publie des RemoteApps.

---

## Question 15 :
Vous ne parvenez pas à ajouter les RemoteApps via l’assistant, bien que l’accès Web fonctionne. Pourquoi ?

- Problématique de certificat  
- Problématique DNS  
- Problématique DFS  
- Problématique d’authentification AD  

**Réponse :**  
- ✅ Problématique de certificat : le client RemoteApp exige un certificat valide pour fonctionner.

---

## Question 16 :
Quelles sont les caractéristiques applicables à WDS ?

- C’est un service qui requiert MDT  
- Il gère les mises à jour Microsoft  
- Il fournit un adressage IP  
- Il peut être mis en œuvre dans un domaine AD  
- Il permet de déployer des images WIM  

**Réponse :**  
- ✅ Il peut être mis en œuvre dans un domaine AD : cas d’usage courant.  
- ✅ Il permet de déployer des images WIM : fonction principale de WDS.

---

## Question 17 :
Quelle commande PowerShell installe le rôle WDS ?

- Install-WindowsFeature AD-Domain-Services  
- Install-WindowsFeature WDS  
- Install-WindowsFeature RDS-Services  
- Install-WindowsFeature WDS-MDT  

**Réponse :**  
- ✅ Install-WindowsFeature WDS : installe le rôle WDS sur Windows Server.

---

## Question 18 :
Quels services sont nécessaires pour WDS dans un domaine AD ?

- RDS  
- DHCP  
- ADDS  
- DNS  
- MDT  

**Réponse :**  
- ✅ DHCP : fournit les IP pour le boot PXE.  
- ✅ ADDS : requis pour WDS en mode intégré.  
- ✅ DNS : nécessaire à la résolution de nom dans un domaine.

---

## Question 19 :
Quels types d’images peuvent être configurés dans WDS ?

- Image de partition  
- Image d'installation  
- Image de disque  
- Image de démarrage  

**Réponse :**  
- ✅ Image d'installation : OS à déployer.  
- ✅ Image de démarrage : permet de lancer l’environnement WinPE.

---

## Question 20 :
Quelle contrainte s’applique au service WDS ?

- Il requiert RDS  
- Il peut être implémenté sur Windows 10  
- Il requiert des CAL spécifiques  
- Il est pris en charge nativement par Windows Server 2019  

**Réponse :**  
- ✅ Il est pris en charge nativement par Windows Server 2019 : WDS est inclus comme rôle serveur.

---
