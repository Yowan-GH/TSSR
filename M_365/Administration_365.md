# Administration Microsoft 365

## 👥 Gestion des utilisateurs

### 🔑 Types de comptes
- **Microsoft 365 local** : créé dans le cloud (non lié à AD local)
- **Compte synchronisé** : vient de l’AD local (et est transféré via Azure AD Connect)

### ➕ Méthodes de création
- Unitaire (Admin Center) : ``Ajouter un utilisateur`` dans ``Admin center``
- Import CSV : ``Admin center / Autres / Importer plusieurs utilisateurs ``
- PowerShell (`New-MsolUser`)
- Synchronisation AD (Azure AD Connect)
    
### 🛡️ Rôles assignables
- Utilisateur simple
- Admin général / personnalisé (Admin Exchange, Admin Power BI...)
- Délégation via **RBAC** (Role Based Access Control)

### 🔣 Gestion des utilisateurs en Powershell

<!-- tabs:start -->
##### **Installation et connexion**

##### Installer les modules nécessaires

```powershell
Install-Module MSOnline                  
Install-Module ExchangeOnlineManagement
Install-Module MicrosoftTeams
```
##### Connexion aux services cloud Microsoft 365

```powershell
# Azure Active Directory
Connect-MsolService

# Exchange Online
Connect-ExchangeOnline -UserPrincipalName "ton.compte@domaine.onmicrosoft.com" -ShowProgress $true

# SharePoint Online
Connect-SPOService -Url https://votredomaine-admin.sharepoint.com

# Teams
Connect-MicrosoftTeams

# Sécurité & conformité
Connect-IPPSSession -UserPrincipalName "ton.compte@domaine.onmicrosoft.com"
```
##### Vérifie les connexions

```powershell 
Get-MsolUser
Get-ExchangeOnlineUser
```
##### **Création d'un utilisateur o365**

```powershell
New-MsolUser `
  -UserPrincipalName "jdupont@tondomaine.onmicrosoft.com" ` # Login user
  -DisplayName "Jean Dupont" ` # Nom complet
  -FirstName "Jean" ` # PRénom
  -LastName "Dupont" ` # Nom
  -Password "MotDePasseFort123!" ` # Password temporaire
  -ForceChangePassword $true ` # Forcer le changement de password
  -UsageLocation "FR" # Forcer la langue FR
```

##### **Supression / Restauration d'un user o365**


```powershell
# Supprimer un user -> Gardé dans la corbeille Azure AD 30 jours 
Remove-MsolUser -UserPrincipalName "jdupont@tondomaine.onmicrosoft.com"

# Restaurer un user dans la corbeille
Restore-MsolUser -UserPrincipalName "jdupont@tondomaine.onmicrosoft.com"

# Voir les users supprimés 
Get-MsolUser -ReturnDeletedUsers

# Supprimer Définitivement un compte (hard delete)
Remove-MsolUser -UserPrincipalName "jdupont@tondomaine.onmicrosoft.com" -RemoveFromRecycleBin -Force

```

<!-- tabs:end -->
## 💳 Gestion des licences

### 🧰 Outils possibles

|Méthode|Avantages|
|---|---|
|**Portail Microsoft 365 Admin**|Interface graphique, simple à utiliser|
|**PowerShell (MSOnline / AzureAD)**|Rapide, automatisable, indispensable en entreprise|

### 📦 Plans Exchange Online

| Plan                  | Boîte mail | Office  | Archivage     | Fonctionnalités            | Cout HT Mensuel |
| --------------------- | ---------- | ------- | ------------- | -------------------------- | --------------- |
| **Business Basic**    | 50 Go      | Web     | 50 Go archive | Mail, Teams, OneDrive      | 5,60 €          |
| **Business Standard** | 50 Go      | Desktop | 50 Go archive | + Office complet           | 11,70 €         |
| **Business Premium**  | 50 Go      | Desktop | 50 Go archive | + Intune, Defender         | 20,60 €         |
| **M365 E3**           | 100 Go     | Desktop | Illimité      | Enterprise + sécurité      | 23,50 €         |
| **M365 E5**           | 100 Go     | Desktop | Illimité      | + téléphonie, audit avancé | 39.40 €         |

### 🧾 Gestion des licences 

<!-- tabs:start --> 
#### **Via PowerShell**

```powershell
# Identifier les licences disponibles 
Get-MsolAccountSku

#  Attribuer une licence
Set-MsolUserLicense `
  -UserPrincipalName "jdupont@entreprise.fr" `
  -AddLicenses "TONTENANT:BUSINESS_PREMIUM"

# Retirer une licence
Set-MsolUserLicense `
  -UserPrincipalName "jdupont@entreprise.fr" `
  -RemoveLicenses "TONTENANT:BUSINESS_PREMIUM"

# Attribution en masse par filtre
Get-MsolUser -Department "Comptabilité" -UnlicensedUsersOnly | ForEach-Object {
  Set-MsolUserLicense -UserPrincipalName $_.UserPrincipalName -AddLicenses "TONTENANT:BUSINESS_PREMIUM"
}

# Vérifier les utilisateurs sans licence
Get-MsolUser -All | Where-Object {$_.isLicensed -eq $false}

# Lister les utilisateurs et leur plan actif
Get-MsolUser -All | Select-Object DisplayName, UserPrincipalName, Licenses

```

#### **Via Admin Center**

- Aller dans **Utilisateurs actifs**
- Sélectionner un utilisateur
- Cliquer sur **Licences et applications**
- Activer ou désactiver les **produits/services inclus**
- Valider
<!-- tabs:end --> 


## 🧭 Destinataires et permissions Exchange Online

- Accès Exchange Control Panel (ou EAC) via :  ``Admin Microsoft 365 > Exchange > Centre d’administration Exchange``
- Url directe : https://admin.exchange.microsoft.com/
- Via Powershell

<!-- tabs:start --> 

### **💻ECP / M365 Admin)**


#### 📦 Quota des boîtes aux lettres
- Accès via : **Centre d’administration Exchange (ECP)** > **Destinataires > Boîtes aux lettres**
- Sélectionner une boîte → Modifier → onglet **“Paramètres de boîte”**
- ✅ Modifier :
    - Quota d’avertissement
    - Quota d’envoi
    - Quota d’envoi et réception

#### 📂 Archivage
- ECP → Boîte à modifier → **Activer l’archivage**
- Crée une **boîte d’archive illimitée** (extensible par tranches de 100 Go)
- 📌 Nécessite **Exchange Online Plan 2** ou **M365 E3/E5**

#### 🧹 Rétention / Suppression
- ECP → **Stratégies de rétention** ou via **Compliance Center**
- Lien avec la **durée de conservation des éléments supprimés**
- Litige/hold : compliance.microsoft.com > Information Governance

#### 🧩 Les alias
- Accéder à `https://admin.exchange.microsoft.com/`
- Aller dans **Destinataires > Boîtes aux lettres**
- Sélectionner l’utilisateur
- Onglet **Adresse e-mail**
- Cliquer sur **Ajouter une adresse** :
    - Type : **SMTP**
    - Adresse : `alias@entreprise.fr`
- Valider (l’adresse principale reste en gras)

#### 🔁 Transfert de mail
- Menu **Destinataires > Boîtes aux lettres**
- Sélectionner l’utilisateur
- Onglet **Messagerie > Transfert**
- ✅ Activer le transfert
- Saisir l’adresse cible (interne ou externe)
- Option : **Conserver une copie** dans la boîte d’origine
#### 🧑‍🤝‍🧑 Gestion des BAL (Salle, Équipement, Partagée)
- Créer depuis ECP :
    - Boîtes partagées → accès collectif, sans licence si <50 Go
    - Salles / Équipements → pour réservation dans les agendas
        
- Permissions via l'onglet **“Délégations”** :
    - Accès complet (Full Access)
    - Envoyer en tant que (Send As)
    - Envoyer de la part de (Send on behalf)
#### ✉️ Autres types de BAL

- **Contacts de messagerie** : adresse externe, visible dans l’annuaire
- **Utilisateurs de messagerie** : utilisateurs externes **authentifiés**
- **Listes de distribution** : redirige vers plusieurs boîtes
- **Listes dynamiques** : membres calculés via des règles
- **Groupes de sécurité avec extension messagerie** : autorisations + réception mail

### **🔣 Via PowerShell**

#### 📦 Quota BAL
```powershell
Set-Mailbox -Identity "user@domaine.fr" `
  -IssueWarningQuota 47GB ` # Avertissement
  -ProhibitSendQuota 48GB ` # Blocage Envoi
  -ProhibitSendReceiveQuota 49GB # Blocage total
``` 

#### 📂 Archivage
```powershell 
Enable-Mailbox -Identity "user@domaine.fr" -Archive

# Vérification :
Get-Mailbox -Identity "user@domaine.fr" | fl ArchiveStatus
```

#### 🧹 Rétention / Suppression
```powershell
# Durée de rétention des éléments supprimés (max 30j par défaut)
Set-Mailbox -Identity "user@domaine.fr" -RetainDeletedItemsFor 30
```

#### 🧩 Les alias

```powershell
# Ajouter un alias 
Set-Mailbox -Identity "prenom.nom@entreprise.fr" -EmailAddresses @{add="alias@entreprise.fr"}

# Vérifier les alias
Get-Mailbox -Identity "prenom.nom@entreprise.fr" | Select-Object -ExpandProperty EmailAddresses

# Supprimer un alias
Set-Mailbox -Identity "prenom.nom@entreprise.fr" -EmailAddresses @{remove="alias@entreprise.fr"}
```

#### 🔁 Transfert de mail dans Exchange Online
```powershell
Set-Mailbox -Identity "utilisateur@entreprise.fr" `
  -ForwardingSMTPAddress "cible@externe.com" # ForwardingAddress pour de l'interne
  -DeliverToMailboxAndForward $true # garde une copie dans la BAL
  
  # Supprimer un transfert
  Set-Mailbox -Identity "utilisateur@entreprise.fr" `
  -ForwardingSMTPAddress $null `
  -DeliverToMailboxAndForward $false
  
  ```

#### 🧑‍🤝‍🧑 BAL Salle / Équipement / Partagée

 **Création**
 ```powershell
 # BAL partagée
New-Mailbox -Shared -Name "Support" -DisplayName "Support Client" -Alias "support" -PrimarySmtpAddress "support@entreprise.fr"

# Salle
New-Mailbox -Room -Name "Salle Réunion A" -PrimarySmtpAddress "salleA@entreprise.fr"

# Équipement
New-Mailbox -Equipment -Name "Projecteur" -PrimarySmtpAddress "projecteur@entreprise.fr"

```

**👥 Ajouter des permissions**

```powershell
# Accès complet
Add-MailboxPermission -Identity "support@entreprise.fr" -User "jdupont" -AccessRights FullAccess

# Envoyer en tant que
Add-RecipientPermission -Identity "support@entreprise.fr" -Trustee "jdupont" -AccessRights SendAs

# Envoyer de la part de
Set-Mailbox -Identity "support@entreprise.fr" -GrantSendOnBehalfTo "jdupont"
```

#### ✉️ Autres types de destinataires

🔹 **Contact externe**

`New-MailContact -Name "Partenaire Externe" -ExternalEmailAddress "contact@externe.com"`

🔹 **Utilisateur de messagerie externe (authentifiable)**

`New-MailUser -Name "Prestataire" -ExternalEmailAddress "tech@ssii.com" -UserPrincipalName "tech@entreprise.fr" -Password (ConvertTo-SecureString -String "P@ssw0rd!" -AsPlainText -Force)`

**🔹 Liste de distribution**


`New-DistributionGroup -Name "Equipe RH" -PrimarySmtpAddress "rh@entreprise.fr" -Members user1, user2`

**🔹 Liste dynamique**

`New-DynamicDistributionGroup -Name "Tous les commerciaux" -RecipientFilter {(Department -eq "Commerce")}`

<!-- tabs:end -->


## 👥 Groupes dans Microsoft 365 / Exchange Online

### 🧩**Les types de groupes**

|**Type de groupe**|📧 Reçoit des mails|🤝 Collaboration (Teams, SharePoint...)|🔐 Gestion des droits (accès fichiers)|⚙️ Création via|
|---|---|---|---|---|
|**Groupe Microsoft 365**|✅ Oui|✅ Oui|❌ Non _(pas pour les permissions ACL)_|Portail M365|
|**Groupe de distribution**|✅ Oui|❌ Non|❌ Non|ECP / PowerShell|
|**Groupe de sécurité (classique)**|❌ Non (ou ✅ si mail-enabled)|❌ Non|✅ Oui|Azure AD / M365|

### 👥 Créer un groupe
<!-- tabs:start -->
#### **Graphiquement**
##### 🖱️ Depuis le centre d’administration Exchange (ECP)
- **Liste de distribution**
- **Groupe de sécurité avec extension de messagerie**
- **Groupe dynamique**

##### 🖱️ Depuis le portail M365 
- **Groupes Microsoft 365**
- **Groupe de sécurité sans mail**
#### **Via Powershell**

```powershell
# Liste de diffusion 
New-DistributionGroup -Name "Support IT" -PrimarySmtpAddress "support@entreprise.fr"

# Groupe de sécurité mail-enabled
New-DistributionGroup -Name "Accès Projets" -PrimarySmtpAddress "projets@entreprise.fr" -Type Security

# Groupe de distribution dynamique 
New-DynamicDistributionGroup -Name "Tous les RH" -RecipientFilter {(Department -eq "Ressources Humaines")}

# Lister les groupes 
Get-DistributionGroup
```

```powershell
# Ajouter des membres 
Add-DistributionGroupMember -Identity "Support IT" -Member "jdupont@entreprise.fr"

# Retirer des membres 
Remove-DistributionGroupMember -Identity "Support IT" -Member "jdupont@entreprise.fr"

# Voir les membres 
Get-DistributionGroupMember -Identity "Support IT"
```
<!-- tabs:end -->


## 📬 Administration Exchange Online 

### 🌐 **Les domaines acceptés**

- Un **domaine** est l’équivalent DNS de ton organisation (ex : `entreprise.fr`)
- Types :
    - **Faisant autorité** : tous les mails entrants pour ce domaine sont **gérés par Microsoft 365**
    - **Relais interne** : Microsoft 365 **relaye le message** vers un autre serveur (nécessite connecteurs)

### 📩 **Suivi des messages**

Utilisé par les admins pour :
- Retrouver la **trace d’un message** (envoyé, reçu, bloqué, filtré…)
- Diagnostiquer les problèmes de flux
- Accès via **ECP > Suivi des messages**

### 📜 **Règles de transport (mail flow rules)**

Permettent d’imposer des **politiques de messagerie** :

|Exemple d’usage|Explication|
|---|---|
|Bloquer les `.exe`|Empêcher la réception de certaines pièces jointes|
|Ajouter une signature|Modifier les en-têtes ou contenu du message|
|Rediriger vers un responsable|Examiner les mails sensibles avant livraison|
|Journaliser les échanges avec un client|Archive automatique pour conformité|

🛠️ Composées de :
- **Conditions** (ex : si pièce jointe `.exe`)
- **Actions** (ex : bloquer ou rediriger)
- **Exceptions** (ex : pas pour le DG)
💡 Priorité = ordre de traitement (0 = plus prioritaire)


### 🔗 **Connecteurs Exchange**

Utilisés pour :
- 🔁 Faire le lien avec un **serveur Exchange local**
- 📠 Permettre aux **copieurs, applis, imprimantes** d’envoyer des mails
- 📩 Accepter les mails d’un **partenaire externe**
- 🔐 Appliquer un **chiffrement spécial** selon domaine cible
🧠 Par défaut → **aucun connecteur requis**, mais **nécessaire dès qu’on sort de l’usage standard**


### 📤 **Relais SMTP (cas d’usage courant)**

Exemple : tu veux qu’un **copieur multifonction** envoie des scans par mail.

→ Créer un **connecteur sortant** :
- Sans authentification si usage interne
- Limite le nombre de machines qui peuvent envoyer du SMTP
- Évite de surcharger les entrées DNS (SPF)

### 📶 **Protocoles & ports supportés**

|Protocole|Port sécurisé|Usage|
|---|---|---|
|HTTP / HTTPS|443|Webmail / Autodiscover|
|POP3|995|Clients mail classiques (peu recommandé)|
|IMAP4|993|Thunderbird / Linux|
|MAPI / HTTPS|443|Outlook|
|ActiveSync|443|Téléphones mobiles|
|SMTP (sortant)|587 / 465|Envoi de mail|

❗ **Le port 25 est souvent bloqué** chez les FAI → préférer 587 ou relais interne

### 🧠 Autodiscover (découverte automatique)

- Permet à Outlook de **configurer automatiquement le profil**
- Repose sur un enregistrement **CNAME** dans le DNS :
```shell
Alias : autodiscover
Cible : autodiscover.outlook.com
```
### 📁 Types de fichiers Outlook

| Extension     | Description                                      |
| ------------- | ------------------------------------------------ |
| `.pst`        | Données locales (POP3)                           |
| `.ost`        | Fichier de cache Mode hors ligne (Exchange/IMAP) |
| `.nst`        | Conversations de groupes Outlook                 |
| `spscoll.dat` | Suggestions de mails dans le champ “À”           |

## 📱 Gestion des appareils mobiles

### 🧩 Concepts clés

|Terme|Signification|Exemple concret|
|---|---|---|
|**MDM**|Mobile Device Management|Appliquer des stratégies sur un mobile (chiffrement, mot de passe, effacement à distance)|
|**MAM**|Mobile Application Management|Contrôler uniquement **les applications pro** (Outlook, OneDrive…) sans gérer l’appareil|
|**BYOD**|Bring Your Own Device|L’utilisateur utilise son smartphone perso|
|**COPE**|Corporate Owned, Personally Enabled|Appareil fourni par l’entreprise, usage mixte|
|**CYOD**|Choose Your Own Device|L’utilisateur choisit un appareil dans une liste validée|
### 🔐 Que peut-on imposer avec MDM / Intune ?

|Fonction|Exemple|
|---|---|
|🔒 Mot de passe complexe|Code PIN requis pour accéder aux apps pro|
|🔐 Chiffrement du téléphone|Interdiction d’accéder aux données si l’appareil n’est pas chiffré|
|🧼 Effacement à distance|Wipe total (MDM) ou **selective wipe** (MAM)|
|📵 Blocage du copier/coller|Empêche de copier des infos de Outlook vers WhatsApp|
|📧 Restriction des apps mail|Autoriser uniquement Outlook pour les mails pro|
|📍 Géorestriction / conformité|Refus d'accès si appareil rooté / jailbreaké|

### ☁️ Microsoft Intune

- Plateforme **MDM/MAM Cloud** intégrée à Microsoft 365
- Permet une **gestion centralisée** des appareils
- Accessible via :  
    [https://endpoint.microsoft.com](https://endpoint.microsoft.com)
    💼 Inclus dans certaines licences

### 📋 Enregistrement DNS pour l’enrôlement

Pour permettre l’enregistrement automatique des appareils dans l’organisation 

|Enregistrement DNS|Cible|
|---|---|
|`EnterpriseEnrollment`|`EnterpriseEnrollment.manage.microsoft.com`|
|`EnterpriseRegistration`|`EnterpriseRegistration.windows.net`|

### 🧭 Comment ça se passe pour un utilisateur ?

1. 📲 Il télécharge **Portail d’entreprise Intune**
2. 🔐 Se connecte avec ses **identifiants M365**
3. 🔧 L’app configure l’appareil selon les **règles MDM**
4. ✅ Il peut accéder à Outlook, OneDrive, Teams…
5. 🔒 Si l’appareil est non conforme → **bloqué automatiquement**

## 🔗 Azure AD

C'est un service **cloud** de gestion des identités et des annuaires.
Il permet : 
- Gestion des utilisateurs
- Gestion des appareils
- Se connecter à un AD local

### ⚙️ Fonctionnement

| Élément                            | Rôle                                                                 |
| ---------------------------------- | -------------------------------------------------------------------- |
| **Active Directory local (AD DS)** | Source des comptes utilisateurs (on-prem)                            |
| **Azure AD**                       | Annuaire cloud utilisé par Microsoft 365 (indépendant de l'AD Local) |
| **Azure AD Connect**               | L’agent intermédiaire qui synchronise les deux environnements        |
| Microsoft 365                      | S'appui sur Azure AD pour valider les accès aux services M365        |

🧠 Azure AD Connect peut synchroniser :
- Les **utilisateurs**
- Les **groupes**
- Les **attributs** (mail, phone, etc.)
- Les **mots de passe** (optionnel)

### 🔁 Types de synchronisation

| Mode de synchro                       | Description                                                          |
| ------------------------------------- | -------------------------------------------------------------------- |
| **Uni-directionnelle** (standard)     | AD local → Azure AD                                                  |
| **Avec Writeback**                    | Azure AD peut écrire **vers l’AD local** (nécessite licence premium) |
| **Password Hash Sync**                | Les mots de passe sont hachés puis synchronisés vers Azure AD        |
| **Pass-through Authentication (PTA)** | Authentification directe via un agent, le mot de passe reste local   |
### 🔧 Installation de Azure AD Connect

- L’outil est installé sur **un serveur Windows membre du domaine**
- Le compte AD utilisé doit avoir **des droits d’administration**
- Le domaine doit être **vérifié dans Azure AD** (via Microsoft 365 admin)

#### 1️⃣ Créer un suffixe UPN compatible

- Aller dans **Domaines et approbations Active Directory**
- Clic droit / Propriété / Ajouter un suffix DNS 
    👉 Exemple : `entreprise.local` ❌ → ajouter `entreprise.fr` ✅

#### 2️⃣ Modifier le suffixe UPN des utilisateurs

- Pour chaque utilisateur AD, remplace le suffixe `@domaine.local` par `@domaine.fr`
- Cette étape est cruciale pour que la **synchronisation fonctionne** correctement avec Azure AD

Script de modification en masse : 
```powershell
# Import du module Active Directory
Import-Module ActiveDirectory

# Modifier tous les utilisateurs dont le UPN se termine par @domaine.local
Get-ADUser -Filter * -SearchBase "OU=Utilisateurs,DC=entreprise,DC=local" -Properties UserPrincipalName, mail | ForEach-Object {
    $upn = $_.UserPrincipalName
    if ($upn -like "*@domaine.local") {
        $newUPN = $upn -replace "@domaine.local", "@domaine.fr"
        $newMail = $newUPN

        Write-Host "Mise à jour : $upn → $newUPN et $($_.mail) → $newMail"

        Set-ADUser $_ `
            -UserPrincipalName $newUPN `
            -EmailAddress $newMail `
            -Replace @{mail = $newMail}
    }
}
```

Ou Selectionner tous les ``users / Clic droit / propriété /  Compte / Suffixe UPN``
Compléter les adresse email de chaque user
#### 3️⃣ Créer un **compte de service dédié** à la synchronisation

- Ce compte **AD** doit :
    - Être dédié **exclusivement à Azure AD Connect**
    - Avoir les **droits requis** pour lire/écrire dans l’AD local
    - Être **protégé** (pas utilisé pour d’autres tâches)
- Éviter d’utiliser un **compte admin standard** → ❌ **mauvaise pratique**
- En pratique, on fait une **copie du compte admin** que l'on renommera **SRV-ADCONNECT** avec un **password qui n'expire jamais** pour éviter les soucis lors du renouvellement de mot de passe 

- **Refaire la même manipulation sur M365 Admin Center** - **SRV-AZUREAD**
	- Ajouter ce nouvel user aux admins dans : rôle / Administrateur général / Ajouter
#### 4️⃣ Vérifier que ton domaine est **vérifié dans Microsoft 365**

👉 Connecte-toi à [https://admin.microsoft.com](https://admin.microsoft.com)
> **Centre d’administration Microsoft 365 > Paramètres > Domaines**
- Assure-toi que le domaine `entreprise.fr` est bien **ajouté et validé**
- Cela garantit que les **UPN synchronisés** seront reconnus comme valides

#### 5️⃣ Télécharger et lancer l’installeur Azure AD Connect

🔗 Téléchargement officiel :  
[https://www.microsoft.com/en-us/download/details.aspx?id=47594](https://www.microsoft.com/en-us/download/details.aspx?id=47594)

- Exécute le fichier `AzureADConnect.msi` sur le serveur dédié
- Lance l’assistant d’installation

#### 6️⃣ Choisir le type d’installation

 ➤ **Installation Express** (recommandée pour les tests)
- Tout est configuré automatiquement
- Synchro de **tous les utilisateurs + tous les attributs**
    
➤ **Installation Personnalisée** ✅ **(recommandée en entreprise)**
- Rentrer le Compte de domaine MONDOMAINE\SRV-ADCONNECT
- Connexion à azure AD : Utiliser le compte SRV-AZUREAD
- Ajouter un annuaire : Creer un compte AD : MONDOMAINE\SRV-ADCONNECT
- Ajouter la foret du domaine 
- Nom d'utilisateur principal : UPN
- ✅ Continuer sans faire correspondre tous les suffixes UPN
- Laisser le reste par defaut

Si les utilisateurs n'ont pas de licences, ``les selectionner / ... / Gérer les licences de produits / remplacer / Cocher la licence et enregistrer 
#### 7️⃣ Authentification et connexion``

L’assistant va te demander :
- 🔐 Un compte **Azure AD / Microsoft 365** → doit être **Global Administrator**
- 👤 Un compte **AD local** → doit avoir **droits en lecture sur les objets utilisateurs**

> 💡 Tu peux créer un compte spécifique pour chaque rôle, avec délégation fine

#### 8️⃣ Choisir la méthode d’authentification

|Option|Description|Remarques|
|---|---|---|
|**Password Hash Synchronization** ✅|Les mots de passe hachés sont synchronisés|Le plus simple à maintenir|
|**Pass-Through Authentication (PTA)**|Auth locale via agent|Nécessite agent toujours en ligne|
|**Federation avec AD FS**|Authentification via AD FS local|Complexe, rarement utilisé aujourd’hui|

👉 Pour TSSR et PME, **Password Hash Sync** est généralement **la meilleure option**

#### 9️⃣ Sélection des OU à synchroniser

- Tu peux **exclure certaines OU** (ex : comptes de test, comptes machine…)
- Cela **réduit la charge** et évite de synchroniser des comptes inutiles

#### 🔟 Finaliser la configuration

- Vérifie le résumé
- Laisse cochée l’option **“Lancer la synchronisation initiale”**
- Clique sur **Installer**

#### ✅ Étapes post-installation

- Lancer manuellement une synchro si besoin : `Start-ADSyncSyncCycle -PolicyType Initial`
- Ouvrir l’outil graphique : `Synchronization Service Manager`

## 🛡️ RBAC – Role-Based Access Control

Donner aux utilisateurs (ou admins) **les droits dont ils ont besoin**, ni plus, ni moins.
🔐 Tu ne donnes **pas des droits directs** (comme sur un fichier), mais tu **assignes un rôle à un utilisateur ou groupe**.

### 🧩 Structure de RBAC dans Exchange Online

|Élément|Rôle|
|---|---|
|**Rôle (Role)**|Décrit un ensemble d’**actions autorisées**|
|**Groupe de rôles (Role Group)**|Contient un ou plusieurs rôles|
|**Membre du groupe**|Un **utilisateur ou groupe** qui hérite des rôles|

### 🗂️ Exemples de rôles

| Rôle                                | Ce qu’il permet de faire                         |
| ----------------------------------- | ------------------------------------------------ |
| `Mail Recipients`                   | Gérer les boîtes aux lettres                     |
| `Transport Rules`                   | Gérer les règles de flux (mail flow)             |
| `View-Only Organization Management` | Voir la configuration Exchange                   |
| `Mailbox Search`                    | Effectuer des recherches eDiscovery              |
| `Compliance Management`             | Gérer l’audit, les stratégies de rétention, DLP… |
### 📁 Exemples de groupes de rôles

| Groupe de rôles           | Utilisateurs typiques                               |
| ------------------------- | --------------------------------------------------- |
| `Organization Management` | Admin global Exchange                               |
| `Recipient Management`    | Admin RH ou helpdesk (gestion utilisateurs)         |
| `Compliance Management`   | DSI, RSSI (stratégies, audits, DLP)                 |
| `Records Management`      | Archivage, étiquettes                               |
| `Help Desk`               | Support de niveau 1 (réinitialisation mot de passe) |
### Quelques commandes PowerShell

```powershell
Get-MsolRole # Liste des rôles
Get-MsolUserRole # Voir les rôles des users
Add-MsolROleMembrer # Ajouter des membres à un role
```