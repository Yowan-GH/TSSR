# Titre Technicien Supérieur Systèmes et Réseaux

## Déroulement

<!-- tabs:start --> 
### **Jour 1 - Ecrit et Manipulation**

#### Partie 1 : MSP (Mises en Situation Professionnelles)

- **Durée** : 1h 30 mn

- **Objectif :**
  - Réaliser une série de manipulations techniques indiquées sur le sujet
  - Insérer **uniquement des preuves de réussite** (captures, commandes, logs) dans un fichier Word
  - Fichier Réponse à **imprimer et remettre** à la fin de l’épreuve avec vos brouillons et les sujets.

- **Matériel fourni :**
  - Un PC hôte avec plusieurs machines virtuelles :
    - Serveur Windows
    - Client Windows
    - Linux

- **Conditions de travail :**
	- Accès à Internet **autorisé**
	- Pas de Jury, vous êtes surveillé par des assistants pédagogiques. 
	- **Interdiction totale** d’utiliser des IA, forums ouverts ou tout outil assimilé  

---

#### Partie 2 : Questions écrites

- **Objectif** : 
	- Répondre aux questions données sur le sujet
	- Fichier Réponse à **imprimer et remettre** à la fin de l’épreuve avec vos brouillons et les sujets.
- **Nature des questions :**
  - Questions **ouvertes uniquement**
  - Basées sur les connaissances acquises en formation
- **Conditions de travail :**
	- Pas d'accès à internet
	- Aucune aide extérieure 


### **Jour 2 - Oral**

#### Étape 1 : Prise de connaissance du sujet

- **Durée** : 15 mn
- Présentation sur papier d’une **infrastructure théorique**
- Présentation du sujet des MSP
- Aucun accès informatique ou internet
---
#### Étape 2 : Mise en Situation Professionnelle

- **Durée** : 45 mn
- **Objectif :**
	- Répondre aux 3 MSP présentées dans le sujet (15 minutes chacune)
- **Matériel fourni :**
	- Infrastructure complète (Switch, routeur, firewall, Hyperviseur, VDM...) physique ou virtualisée
- **Surveillance active :**
  - Le jury observe en temps réel vos actions sur le PC (Écran du candidat retransmis sur un téléviseur)
  - Analyse de la **logique et du raisonnement** avant même la réussite technique (il faudra donc dire à haute voie ce que vous allez faire)
---
#### Étape 3 : Oral de connaissance (45 mn)

- **Durée :** 45 mn
- **Format :**
  - Questions posées directement par le jury
  - Réponses à donner **sans PC**
  - Utilisation du **tableau blanc**
- **Thématiques :**
  - Points faibles identifiés lors des MSP ou du questionnaire de la veille
  - Questions de la veille
  - Connaissances fondamentales du programme
- **Évaluation :**
  - Capacité de restitution
  - Clarté pédagogique
  - Pertinence technique
---
#### Étape 4 : Délibération

- **Durée :** 5mn
- Jury discute et note
- Décision sur la validation partielle ou complète du titre
---
#### Étape 5 : Échange libre (20 mn)

- **Durée :** 20 mn
-  **Objectifs :**
  - Présenter son parcours
  - Expliquer ses motivations
  - Répondre à des questions de mise en perspective professionnelle
- Discussion ouverte entre le candidat et le jury

<!-- tabs:end --> 

## Exemples de MSP


### Disclaimer
Les éléments ci-dessous ne constituent **pas** une liste officielle d’épreuves.  
Ils sont uniquement tirés :
- de témoignages de plusieurs candidats,
- de mon propre retour d’expérience.  

⚠️ Tous les sujets abordés lors de la formation peuvent être mobilisés pendant l’examen.  
Ces exemples servent uniquement de **support d’entraînement** et d’**illustration**.

Les éléments de résolution (scripts, commandes, preuves) ne sont pas fournis ici afin de favoriser l’entraînement.

---
**Windows**
L’utilisateur **Téo DORE** change de service pour passer de **Gestion** à **Finance**.  
- Il doit avoir :  
  - Accès **Lecture/Exécution** au dossier `Gestion`  
  - Accès **Modification** au dossier `Finance`  
- Un **script de connexion** doit mapper automatiquement le dossier `Finance` sur le lecteur **P:**.

1. Insérer les propriétés de l’utilisateur **Téo DORE** après modification ainsi que les accès à ses différents groupes. Insérer le script de mappage.  

2. Connectez-vous sous l’utilisateur **Téo DORE** et insérer les preuves de réussite du mappage et des accès à ses dossiers.

---
**Windows**
Le stagiaire **Hari COVER** va rejoindre le service Gestion.  
- Créer un groupe **Stagiaires** avec droits :  
  - **Lecture** sur le dossier `Gestion`  
  - **Lecture** sur le dossier `Stage`  
- Réaliser un mappage automatique du dossier `Stage` sur le lecteur **S:** pour tous les futurs stagiaires.

1. Insérer les propriétés de l’utilisateur **Hari COVER** après modification ainsi que les accès à ses différents groupes. Indiquer comment vous avez fait le mappage.  

2. Connectez-vous sous l’utilisateur **Hari COVER** et insérer les preuves de réussite du mappage et des accès à ses dossiers.

---
**Windows**

Soit le script ci-dessous 

```powershell
######################################
Import-Module ActiveDirectory
######################################
$users = Import-Csv -Path "C:\users.csv"
######################################
foreach ($user in $users) {
    $FirstName = $user.FirstName ##############
    $LastName = $user.LastName #############
    $Sam = $user.SamAccountName ###########
    $OU = $user.OU ###########
    $Password = (ConvertTo-SecureString $user.Password -AsPlainText -Force) ###########
    
    New-ADUser ` ###############
        -Name "$FirstName $LastName" `
        -GivenName $FirstName `
        -Surname $LastName `
        -SamAccountName $Sam `
        -UserPrincipalName "$Sam@mondomaine.local" `
        -Path $OU `
        -AccountPassword $Password `
        -Enabled $true
}
```

1. Commentez les ### présents dans le script
2. Réalisez un script d'export du résultat dans un fichier csv avec un délimiteur ";"

---
**Linux**
Un nouvel utilisateur **Jean BON** rejoint l’entreprise comme technicien.  
Caractéristiques du compte :  
- Identifiant : `jbon`  
- UID : `1020`  
- Groupes : `tech`, `junior`, `support`  
- Groupe principal : `tech`  
- Home : `/home/tech/jbon`  
- Shell : `bash`

1. Insérer la preuve de création de l’utilisateur et des groupes si nécessaires. Insérer le contenu du fichier qui contient les utilisateurs et groupes où apparaît **Jean BON**.  

2.  Créez le mot de passe "Tssr.examen" pour l'utilisateur Jean BON et insérez les preuves de la création.

3. Insérer les preuves d’accès au dossier et les droits du dossier. Insérer la preuve que l’utilisateur **Jean BON** peut créer et supprimer des fichiers dans ce dossier.
---
**Linux**
L’utilisateur **Jean BON** doit avoir accès au dossier partagé `/home/tech/share`.

1. Insérer la preuve des droits du dossier `/home/tech/share` et des permissions configurées.  

2. Connectez-vous en tant que **Jean BON** et insérer les preuves qu’il peut créer et supprimer des fichiers dans ce dossier.


## Exemples de questions

### Disclaimer
Les questions ci-dessous sont uniquement des **exemples tirés de retours d’expérience**.  
Elles ne constituent pas une liste officielle et ne couvrent pas l’ensemble du programme.  
Elles ont pour seul objectif de servir de **support d’entraînement**.

**Linux**
- Comment ajouter un utilisateur à un groupe existant sans modifier son shell ni son home ?  
- Quelle commande permet de monitorer en temps réel les logs ? 
- Quelle est la commande pour régler les permissions d’un dossier ?  
- Citez deux commandes pour lister les disques et leurs partitions.  
- Citez deux commandes pour lister les processus.  
- Quelle commande permet de contrôler la configuration réseau ?  
- Où se trouvent les fichiers contenant les utilisateurs, groupes et mots de passe ?  

**Réseaux, protocoles, virtualisation**
- Citez les ports (numéro) et types (TCP/UDP) des protocoles suivants :  
  FTP, SSH, SMTP, DNS, DHCP, TFTP, POP3, IMAP, IMAPS, POP3S, HTTP, HTTPS, SMB, SNMP, RDP, LDAP, Kerberos, NTP 

- Quelles sont les différences entre les protocoles **POP3** et **IMAP** ?  

- Vous avez une photo d’une infrastructure avec plusieurs PC, routeur et switch…  
  - Quelles sont les commandes pour que **PC1** et **PC3** puissent communiquer ?  
  - Indiquez les commandes **ip route** en IPv4 et IPv6.  

- Qu’est-ce qu’un **VLAN** ?  

- Vous avez un réseau en `192.168.0.0/16`. Vous devez créer **60 sous-réseaux**.  
  - Pour le premier, le deuxième et le dernier sous-réseau, indiquez :  
    - Adresse logique / CIDR  
    - Plage d’adresses utilisables  
    - Adresse de broadcast  

- Quelle est la différence entre un NAS et un SAN ?
- Vous avez sur un site distant, plusieurs PC que vous souhaitez relier à votre site principale. Quelle solution mettre en place ? Quel sont les étapes de mise en place de cette solution ?
- Quelle est la différence entre TCP et UDP et dans quel cas utiliser chaque protocole ?  
- Quelle est la différence entre un hyperviseur de type 1 et Type 2 ? Citez 2 exemples de chaques. Citez une fonctionnalité que l'hyperviseur de Type 1 peut faire contrairement au Type 2. 
- Qu'est-ce le VDI ?  Quel sont ses avantages ? 
- Qu'est-ce que le modèle OSI ? TCP/IP ? Quels sont leurs différences ? 

**Windows, WDS et Active Directory**
- Soit le script suivant : (Script WDS) - Indiquez ce que celui-ci fait.
- Quelle commande PowerShell permet de lister tous les utilisateurs d’un OU spécifique ?  
- Quelle commande permet de forcer la mise à jour de la stratégie de groupe sur un client ?  
- Vous devez faire une mise à jour via **WSUS** sur un parc de 1 000 postes. Quelles sont les principales étapes ?  
- Quel est le système permettant aux salariés d’utiliser leurs **appareils personnels** dans le cadre d’un domaine professionnel ?  
  - Citez une solution permettant cela  
  - Citez deux fonctionnalités de cette solution  

**Sécurité**
- Expliquez la différence entre authentification forte et authentification classique.  
- Citez trois menaces/attaques
- Qu'est-ce qu'un PCI ? Un PRI ? 

**Cloud et Services**
- Indiquez les **3 modèles "as a Service" (aaS)** et donnez un exemple pour chacun.  
- Qu’est-ce que l’**hyperconvergence (HCI)** ? Expliquez le principe de cette pratique et citez 3 exemples de logiciels HCI.  

**Documentation et Communication**
- Une page de documentation en anglais est fournie. Vous devez répondre à un utilisateur qui pose une question sur cette documentation.  
  - Rédigez votre réponse en anglais. 

---

> Beaucoup de sujet sont abordés lors des questions, il est alors primordiale de bien maitriser l'intégralité du programme. 

## Exemple de MSP avec le Jury

Soit une infrastructure composée de 2 hypervieurs, 8 VM donc 3 linux, un firewall, un switch, un routeur ... Vous avez une feuille de schéma avec toute l'infra, les Vlan, les IP... que vous pourrez garder le temps de l'épreuve. 

Demande n°1 : 

Un ticket GLPI vous a été attribué, vous devez résoudre le problème de l'utilisateur

> Ici les tickets peuvent être variés: 
> 	Problème de mappage de lecteur
> 	Pas de connexion internet
> 	Impossibilité de se connecter à l'ordinateur ...


Demande n°2 : 

- Exemple 1 : Le PDG d'une entreprise souhaite pouvoir filtrer sur son client de messagerie ses emails par sujet. Vous devez donc le guider afin qu'il puisse par la suite reproduire la manœuvre seule. Sur votre poste le client n'est pas installé, vous devrez donc lui indiquer comment faire avec vos connaissance
- Exemple 2 : Le PDG d'une entreprise souhaite créer un dossier partagé entre lui et sa secrétaire nommé "PANAMA PAPER". Il vous demande comment faire et souhaite le faire lui même.

Demande n°3 : 
- Vous disposez d'un cluster d'hyperviseur avec le logiciel Vsphere. 

- Exemple 1 : Faite une snapshot de la VM SDX01 et ajoutez un nouveau disque dure
- Exemple 2 : Activer la HA sur la VM SDX01 et contrôlez le bon fonctionnement
- Exemple 3 : Faite un clone de la VM SDX01 et modifier son Vlan d'appartenance du Vlan 10 au Vlan 99.

> Les MSP peuvent être très variées mais en général vous aurez une demande assistance utilisateur (via GLPI), une demande d'un salarié, technicien ou supérieur hiérarchique et une intervention sur un Vcenter ou équivalent.

## Le questionnement des Jury

> Ici, les jury vont simplement vous questionnez que des éléments du programmes et en particulier sur les éléments sur lesquels vous avez eu des difficultés la veilles (MSP et Questionnaire). **Je vous conseil donc de noter les éléments qui vous ont posé problème et les réviser.**

> Dans l'ensemble, le Jury est bienveillant et est la pour vous aider. Pas vous enfoncer. 

## Notation du titre

### Principe
La particularité du Titre TSSR est **l’absence de notation chiffrée**.  
La décision de validation est **entièrement laissée au jury**.

### Critères pris en compte par le jury
- **DP (Dossier Professionnel)** : qualité, complétude et pertinence des documents produits pendant la formation.  
- **EPCF (Épreuves Professionnelles de Contrôle en Formation)** : réussite aux exercices pratiques et mises en situation.  
- **MSP, questionnaire et oraux** :  
  - Capacité à résoudre des problèmes techniques  
  - Compréhension et restitution des connaissances  
  - Méthodologie et rigueur observées pendant les épreuves  
  - Qualité des explications et de la communication avec le jury  

### Possibilités de décision

- **Obtention totale**
	- Le candidat **obtient le titre TSSR**.    
- **Obtention partielle**
	- Le titre est validé **partiellement**.  
	- Le candidat devra **repasse les modules ou épreuves manquants** pour obtenir le titre complet.  
- **Refus**
	- Le titre **n’est pas attribué**.  
	- Le candidat devra **repasser l’intégralité du titre** pour obtenir la certification.