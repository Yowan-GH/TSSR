# Tools

https://nivvlem.github.io/TSSR/#/

# MMC Locales

| Console / outil          | Utilité principale                                   |
| ------------------------ | ---------------------------------------------------- |
| lusrmgr.msc              | Gérer les utilisateurs et groupes locaux             |
| compmgmt.msc             | Gestion de l’ordinateur, accès à lusrmgr et diskmgmt |
| Panneau de configuration | Gestion orientée utilisateur des comptes             |
| sysdm.cpl                | Profils utilisateurs                                 |
| gpedit.msc               | GPO locale                                           |
# MMC AD

| Console / outil | Utilité principale                   |
| --------------- | ------------------------------------ |
| GPMC.msc        | Console principale                   |
| dsa.msc         | Groupes et Utilisateur               |
| gpmc.msc        | GPO / Gestion de stratégie de groupe |

# Se retrouver dans les GPO

## Politique de mot de passe (Password Policy)

Computer Configuration → Policies → Windows Settings → Security Settings → Account Policies → Password Policy

## Redirection de dossiers
User Configuration → Policies → Windows Settings → Folder Redirection

## Restriction d’accès aux panneaux de configuration et paramètres
User Configuration → Policies → Administrative Templates → Control Panel

## Appliquer des réglages de sécurité sur tous les postes.
Computer Configuration → Policies → Windows Settings → Security Settings

## Navigation

Deux principales branches : 
- Computer Configuration
- User Configuration  
- 
Chaque branche contient :
1. **Policies** → paramètres actifs pouvant être appliqués
2. **Preferences** → options “souples”, qui peuvent être modifiées par l’utilisateur après application

<!-- tabs:start -->
### **Computer Configuration**

- **Portée :** affecte les machines, indépendamment de l’utilisateur connecté.
    
- **Chemins principaux :**
    
|Sous-catégorie|Contenu / Utilité|
|---|---|
|**Policies → Windows Settings**|Paramètres de sécurité (firewall, compte, audit), scripts (startup/shutdown), redirection de dossiers, paramètres réseau|
|**Policies → Administrative Templates**|Paramètres système (Windows Update, contrôle de l’accès aux fonctionnalités, stratégie de disque, gestion du réseau)|
|**Preferences**|Modifications non strictes : lecteurs réseau, paramètres réseau, fichiers et dossiers, raccourcis|

**Exemples pratiques :**

- Appliquer une politique de mot de passe → `Policies → Windows Settings → Security Settings → Account Policies`
    
- Déployer un script au démarrage → `Policies → Windows Settings → Scripts (Startup/Shutdown)`

### **User Configuration**

- **Portée :** affecte les utilisateurs, peu importe l’ordinateur qu’ils utilisent.
    
- **Chemins principaux :**
    

|Sous-catégorie|Contenu / Utilité|
|---|---|
|**Policies → Windows Settings**|Scripts (logon/logoff), redirection de dossiers, paramètres Internet Explorer (si encore utilisé)|
|**Policies → Administrative Templates**|Restrictions utilisateur : panneau de configuration, menu démarrer, bureau, sécurité Windows, applications autorisées/interdites|
|**Preferences**|Modifications “souples” pour l’utilisateur : raccourcis bureau, imprimantes, mappage de lecteurs, options de registre|

**Exemples pratiques :**

- Interdire l’accès au panneau de configuration → `Policies → Administrative Templates → Control Panel → Prohibit access`
    
- Rediriger “Documents” vers un partage réseau → `Policies → Windows Settings → Folder Redirection → Documents`
<!-- tabs:end -->

## Tips AD

Pour qu'un PC puisse joindre l'AD, il faut mettre en DNS le DC.

Autoriser un user à se co sur le DC : Modifier la GPO 

Chemin : `Domain Controllers OU → GPO → Default Domain Controllers Policy`

`Computer Configuration → Windows Settings → Security Settings → Local Policies → User Rights Assignment → Allow log on locally`
En FR "Permettre l'ouverture d'une session locale" + gpupdate /force

