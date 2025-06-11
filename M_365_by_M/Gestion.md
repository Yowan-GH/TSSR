# Gestion des utilisateurs, licences, invités et contacts

## 🧑‍💼 Déterminer le modèle d’identité utilisateur dans Microsoft 365

Choisir un **modèle d’identité** adapté à la taille, à l’infrastructure et aux besoins de sécurité de l’organisation.  
Trois modèles existent :

<!-- tabs:start --> 
### **☁️ Cloud Identity**

#### Définition :
- Le **compte utilisateur existe uniquement dans Microsoft Entra ID** (anciennement Azure AD)
- Créé directement dans le **Centre d’administration Microsoft 365**

#### Cas d’usage :
- 🔹 Petites organisations
- 🔹 Pas d’Active Directory local nécessaire

#### Avantages :
- ✅ Simplicité de gestion
- ✅ Aucun outil supplémentaire requis

#### Limites :
- 🔒 Authentification sans SSO
- 🔄 Gestion séparée si AD local également utilisé

---

### **🔁 Synchronized Identity**

#### Définition :
- Utilisateur présent à la fois dans **AD DS local** et **Microsoft 365**
- Synchronisation avec Microsoft Entra ID via :
  - Microsoft **Entra Connect Sync**
  - Microsoft **Entra Cloud Sync**

#### Cas d’usage :
- 🔹 Entreprises déjà équipées d’un **Active Directory local**
- 🔹 Transition vers un environnement cloud hybride

#### Avantages :
- ✅ **Same Sign-In** (identifiants cohérents)
- ✅ Administration centralisée dans l’AD local
- 🔐 Possibilité d’activer **Pass-Through Authentication (PTA)** pour une authentification locale

#### Limites :
- 🛠️ Dépendance à l’infrastructure locale
- ⚠️ Certaines modifications ne peuvent être faites que sur l’AD local

---

### **🤝 Federated Identity**

#### Définition :
- L’**authentification est déléguée à un fournisseur d’identité externe** (IdP), comme **AD FS** (**Active Directory Federation Services**)
- Microsoft Entra ID valide le **jeton d’authentification** émis par l’IdP

#### Cas d’usage :
- 🔹 Besoin de **Single Sign-On (SSO)**
- 🔹 Environnements avec **authentification spéciale** (badge, carte d’identité, Kerberos…)

#### Avantages :
- ✅ SSO avec authentification transparente pour les utilisateurs
- ✅ Gestion centralisée des politiques de mot de passe et de verrouillage dans l’AD local

#### Limites :
- ⚙️ Déploiement initial plus complexe (AD FS)
- 🌐 Dépendance à la **connectivité Internet** de l’infrastructure locale

---

### **🧩 Comparatif**

| Modèle                    | Cas idéal                                     | Avantage principal                                |
| ------------------------- | --------------------------------------------- | ------------------------------------------------- |
| **Cloud Identity**        | Petites structures sans AD local              | ✅ Simplicité de mise en œuvre                     |
| **Synchronized Identity** | Migration cloud avec AD existant              | ✅ Gestion centralisée avec identifiants cohérents |
| **Federated Identity**    | SSO ou exigence spécifique d’authentification | ✅ SSO + politiques locales de mot de passe        |
<!-- tabs:end --> 

### 🧠 Recommandations

- **Cloud Identity** : 👉 idéal pour démarrage rapide, TPE, startups
- **Synchronized Identity** : 👉 modèle hybride courant, plus facile à maintenir
- **Federated Identity** : 👉 recommandé si besoins SSO ou politiques de sécurité complexes

## 👥 Créer des comptes utilisateurs dans Microsoft 365

Provisionner des comptes utilisateurs via différentes méthodes selon les besoins de l’organisation :
- Création manuelle
- Importation en masse
- PowerShell
- Synchronisation avec Active Directory local

---

### 🧭 Méthodes de création disponibles

| Méthode | Description |
|--------|-------------|
| **Admin center** | Interface web simple pour créer et gérer les comptes un par un |
| **Importation CSV** | Ajout en masse via fichier CSV (modèle fourni) |
| **PowerShell (Graph)** | Scriptable, adapté aux administrateurs avancés |
| **Synchronisation AD** | Gestion centralisée depuis un Active Directory local |

> 📌 **En cas de synchronisation AD**, la création de comptes doit se faire **depuis l'AD local**, pas depuis Microsoft 365

---
<!-- tabs:start --> 
### **🖱️ Admin center**

1. Se connecter à **https://admin.microsoft.com**
2. Menu **Utilisateurs** > **Utilisateurs actifs** > **Ajouter un utilisateur**
3. Renseigner :
   - Informations de base (nom, mot de passe, domaine)
   - Licence(s) à attribuer
   - Rôle(s) administratif(s) éventuels
4. Vérifier les données puis cliquer sur **Terminer l’ajout**

---

### **📂 Importation CSV**

1. Aller dans **Utilisateurs actifs** > **Ajouter plusieurs utilisateurs**
2. Télécharger le **modèle CSV** (ou utiliser un existant)
3. Compléter avec les données utilisateurs
4. Importer le fichier dans le portail
5. Spécifier :
   - Statut de connexion
   - Emplacement géographique
   - Licences
   - Adresse email pour recevoir les résultats (conseillé)

---

### **🧑‍💻 Powershell (graph)**

#### Prérequis :
```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
Import-Module Microsoft.Graph.Identity.DirectoryManagement
Connect-MgGraph -Scopes 'User.ReadWrite.All'
```

Exemple : 
```powershell
$PasswordProfile = @{ Password = 'User.pw1' }

New-MgUser `
  -UserPrincipalName AllanD@Adatum.onmicrosoft.com `
  -DisplayName 'Allan Deyoung' `
  -GivenName 'Allan' `
  -Surname 'Deyoung' `
  -PasswordProfile $PasswordProfile `
  -AccountEnabled `
  -MailNickName 'AllanD'
```
> 🔐 Le mot de passe doit respecter les exigences de sécurité définies dans `PasswordPolicies`

### **🔁 Synchronisation AD**

Utiliser :
- **Microsoft Entra Connect Sync** _(déployé sur serveur local)_
- ou **Microsoft Entra Cloud Sync**

> 📌 Ces outils synchronisent les objets AD locaux vers Microsoft Entra ID  
> ❗ Impossible d’ajouter des utilisateurs depuis le portail dans ce mode

<!-- tabs:end -->

### 🧠 Bonnes pratiques
- Attribuer les licences **au moment de la création**
- Limiter les rôles élevés (ex. : Global Admin) aux utilisateurs strictement nécessaires
- Garder une **trace des identifiants temporaires** si création manuelle ou en masse

## 🔧 Gérer les paramètres des comptes utilisateurs dans Microsoft 365

#### 🧭 Vue d’ensemble

Selon le modèle d’identité choisi (💨 cloud ou 🔗 hybride), la gestion des comptes s’effectue :
- soit depuis l’interface Microsoft 365,
- soit depuis l’**Active Directory local** (en cas de synchronisation via Entra Connect/Cloud Sync),
- ou encore par **PowerShell** pour automatiser les actions.

---

### ⚙️ Outils de gestion disponibles

| Outil | Détails |
|------|---------|
| **Microsoft 365 Admin Center** | Interface graphique pour gérer comptes, rôles, licences, etc. |
| **PowerShell (Graph)** | Gestion scriptée, utile pour modifications en masse |
| **Import CSV** | Création groupée d’utilisateurs (non compatible avec SSO) |
| **Microsoft Entra ID** | Gestion des identités, SSPR, customisation de l’écran de connexion |
| **Directory Sync (Entra Connect)** | Synchronisation avec AD local ; nécessaire pour SSO et scénarios hybrides |

---

### 🧑‍💼 Paramètres utilisateur gérables

Que l’utilisateur ait été créé via le portail, PowerShell ou import CSV, les éléments suivants sont gérables via le Microsoft 365 Admin Center ou PowerShell :

- 📍 **Emplacement géographique**
- 🧾 **Licences et apps**
- 👤 **Rôles d’administration**
- 🔐 **Statut de connexion**
- 💼 **Appareils liés (via Intune)**
- 📫 **Boîte mail** : redirection, droits d’accès, réponses automatiques, archivage, visibilité dans l’annuaire global
- ☁️ **OneDrive** : accès aux fichiers, quotas, partage externe

---

### ✏️ Modifier un compte utilisateur

1. Aller dans **Utilisateurs > Utilisateurs actifs**
2. Cliquer sur un utilisateur pour ouvrir son **volet de gestion**
3. Accéder aux différents onglets :

| Onglet                      | Contenu                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| **Compte**                  | Aliases, rôles, groupes, MFA, déconnexion, historique de connexions |
| **Appareils**               | Vue des appareils gérés via Intune                                  |
| **Licences & applications** | Attribution de licences et activation d’apps spécifiques            |
| **Mail**                    | Gestion de la messagerie Exchange                                   |
| **OneDrive**                | Fichiers de l’utilisateur, quota, gestion du partage                |

> ⚠️ Sans licence, l’utilisateur pourra se connecter mais n’accédera à aucun service.

<img src="M_365_by_M/Images/image_1.png">

---

### 📌 Bonnes pratiques

- Toujours **spécifier le pays** pour chaque utilisateur (impacte la légalité de certains services)
- Attribuer les **rôles avec parcimonie** (ex. : rôle Global Admin uniquement si nécessaire)
- Activer **MFA** et configurer la stratégie de sécurité (ex. : Conditional Access)

## 🧾 Gérer les licences utilisateurs dans Microsoft 365

#### 🎯 Objectif

Chaque utilisateur Microsoft 365 doit disposer d'une **licence valide** pour accéder aux services cloud (Outlook, SharePoint, Teams, etc.).  
Ces licences peuvent être gérées via :
- Le **Microsoft 365 admin center**
- **PowerShell** (module Microsoft Graph)
- Le **portail Microsoft Entra**

### 👥 Attribution et suppression des licences

- Seuls les rôles **Global Admin** et **User Management Admin** peuvent attribuer/supprimer des licences.
- La suppression d'une licence entraîne la **suppression des données associées après 30 jours**.

#### 🛠️ Méthodes d’attribution

| Méthode                | Avantages                                           |
| ---------------------- | --------------------------------------------------- |
| **Admin Center**       | Interface intuitive (individuel ou multiple)        |
| **PowerShell (Graph)** | Automatisation & traitement en masse                |
| **Portail Entra**      | Gestion avancée centralisée des identités et droits |
<!-- tabs:start -->

### **⚙️ Admin Center**
### 📌 Visualiser les licences disponibles

- Aller dans **Facturation > Licences** pour voir :
  - Nombre de licences disponibles
  - Licences attribuées par abonnement
- Pour identifier les utilisateurs non licenciés :
  - **Utilisateurs > Utilisateurs actifs > Filtrer > Utilisateurs sans licence**

---
### 🧑‍💻 Attribuer une licence à plusieurs utilisateurs

1. Sélectionner les utilisateurs dans **Utilisateurs actifs**
2. Cliquer sur **Gérer les licences de produit**
3. Choisir :
   - **Remplacer** (désassigne et assigne)
   - **Assigner plus** (ajoute à l’existant)
   - **Tout désassigner**

---
### **⚙️ PowerShell Graph**

#### 🔐 Connexion & droits requis
```powershell
Connect-MgGraph -Scopes User.ReadWrite.All, Organization.Read.All
```

#### 📄 Voir les abonnements disponibles
```powershell
Get-MgSubscribedSku
```

#### 🔍 Trouver les comptes sans licence
```powershell
Get-MgUser -Filter 'assignedLicenses/$count eq 0' -All
```

#### 🌍 Définir la région d’usage (obligatoire)
```powershell
Update-MgUser -UserId "user@domain.com" -UsageLocation "FR"
```

#### ✅ Assigner une licence à un utilisateur
```powershell
$sku = Get-MgSubscribedSku -All | Where SkuPartNumber -eq 'SPE_E5'
Set-MgUserLicense -UserId "user@domain.com" -AddLicenses @{SkuId = $sku.SkuId} -RemoveLicenses @()
```

### 🚫 Exclure certains services dans la licence

Par exemple, pour désactiver **Sway** et **Forms** :

```powershell
# Récupérer l'ID des services à désactiver
$e5Sku = Get-MgSubscribedSku -All | Where SkuPartNumber -eq 'SPE_E5'
$disabledPlans = $e5Sku.ServicePlans | `
    Where ServicePlanName -in ("SWAY", "FORMS_PLAN_E5") | `
    Select -ExpandProperty ServicePlanId

# Assigner la licence avec services désactivés
$addLicenses = @(
    @{
        SkuId = $e5Sku.SkuId
        DisabledPlans = $disabledPlans
    }
)

Set-MgUserLicense -UserId "user@domain.com" -AddLicenses $addLicenses -RemoveLicenses @()
```

>ℹ️ Utilisez `Select -Unique` pour éviter les doublons dans les plans désactivés.

<!-- tabs:end -->
### 🧠 Bonnes pratiques

- Toujours définir le champ **UsageLocation** (`FR`, `US`, etc.)
- Nettoyer régulièrement les **utilisateurs sans licence**
- Surveiller les quotas de licences depuis le **centre d’administration**

## ♻️ Restaurer des comptes utilisateurs supprimés dans Microsoft 365

Dans Microsoft 365, lorsqu’un utilisateur quitte l’organisation, son compte doit être supprimé pour garantir la **sécurité**.  
Cependant, il est possible de restaurer un compte supprimé **dans un délai de 30 jours**.

<!-- tabs:start -->
### **🗑️ Suppression d’un compte utilisateur**

<!-- tabs:start -->
#### **📍Admin Center**

1. Aller dans **Utilisateurs > Utilisateurs actifs**
2. Sélectionner les utilisateurs à supprimer
3. Cliquer sur **Supprimer l’utilisateur**
4. Confirmer la suppression

👉 La licence associée redevient disponible immédiatement.

#### **💻PowerShell Graph**

```powershell
Remove-MgUser -UserId 'ID_utilisateur'
```

<!-- tabs:end -->
### 🛑 Conséquence de la suppression
- Le compte passe en **état inactif ("soft deleted")** pendant **30 jours**
- Passé ce délai, il est **définitivement supprimé**
- Le compte ne peut plus se connecter aux services Microsoft 365

### **🔁 Restauration d’un compte supprimé**

<!-- tabs:start -->
#### **📍Admin Center**
1. Aller dans **Utilisateurs > Utilisateurs supprimés**
2. Sélectionner l’utilisateur à restaurer
3. Cliquer sur **Restaurer l’utilisateur**
4. Définir les options de mot de passe
5. Valider la restauration

#### **💻PowerShell Graph**

```powershell
Restore-MgDirectoryDeletedItem -DirectoryObjectId 'ID_utilisateur'
```

<!-- tabs:end -->
<!-- tabs:end -->

### ✅ Bonnes pratiques
- Supprimer les comptes des utilisateurs inactifs pour libérer des licences
- Toujours noter l’**ID d’objet** (`ObjectId`) si vous prévoyez une restauration via PowerShell
- Rappeler que **la récupération n’est possible que pendant 30 jours**
## 👥 Maintenance en masse dans Microsoft Entra ID

#### 🎯 Objectif

Permettre la **création**, la **suppression** et la **restauration** d’utilisateurs en masse à l’aide de fichiers **CSV** depuis le **Microsoft Entra Admin Center** ou via **PowerShell**.

### 📋 Rôles nécessaires

- Administrateur général (**Global Administrator**)  
- Administrateur des utilisateurs (**User Administrator**)

<!-- tabs:start -->
### **➕ Création en masse**

#### 📌 Étapes

1. Aller dans **Admin Center > Microsoft Entra > Utilisateurs > Tous les utilisateurs**
2. Cliquer sur **Bulk operations > Bulk create**
3. Télécharger le modèle CSV
4. Remplir avec :
   - `displayName`, `userPrincipalName`, `passwordProfile`, `accountEnabled`
5. Importer le fichier et valider
6. Lancer l’import → jusqu’à **50 000 utilisateurs** créés

#### 📍 Vérification

- Via Entra Admin Center (liste des utilisateurs)
- Via PowerShell :

```powershell
Connect-MgGraph -Scopes 'User.Read.All'
Get-MgUser -Filter "UserType eq 'Member'"
```

### **🗑️ Suppression en masse**

#### 📌 Étapes
1. Aller dans **Microsoft Entra > Utilisateurs > Tous les utilisateurs**
2. Cliquer sur **Bulk operations > Bulk delete**
3. Télécharger le modèle CSV
    - Contient uniquement : `userPrincipalName`
4. Remplir, importer et valider

### **🔁 Restauration en masse**

#### 📌 Étapes
1. Aller dans **Microsoft Entra > Utilisateurs > Utilisateurs supprimés**
2. Cliquer sur **Bulk restore**
3. Télécharger le modèle CSV
    - Contient uniquement : `objectId` 
4. Remplir, importer et valider

🕒 **Délai maximal de restauration : 30 jours**

### **💻 Création via PowerShell**

#### Préparation
```powershell
Install-Module Microsoft.Graph -Scope CurrentUser
Import-Module Microsoft.Graph.Identity.DirectoryManagement
Connect-MgGraph -Scopes 'User.ReadWrite.All'
```

#### CSV d’exemple
```powershell
UserPrincipalName,FirstName,LastName,DisplayName,UsageLocation,AccountSkuId,Password
jdoe@contoso.com,John,Doe,John Doe,FR,contoso:ENTERPRISEPACK,User@123
```

#### Commande d'import :
```powershell
Import-Csv -Path "C:\Chemin\Fichier.csv" | foreach {
    New-MgUser -DisplayName $_.DisplayName `
               -GivenName $_.FirstName `
               -Surname $_.LastName `
               -UserPrincipalName $_.UserPrincipalName `
               -UsageLocation $_.UsageLocation `
               -LicenseAssignmentStates $_.AccountSkuId `
               -PasswordProfile @{Password = $_.Password}
} | Export-Csv -Path "C:\Chemin\Résultats.csv"
```

<!-- tabs:end -->

## 👥 Gérer les utilisateurs invités avec la collaboration B2B

#### 📌 Définition
La **collaboration B2B** de Microsoft Entra External ID permet à des utilisateurs externes (sans compte Entra ID) d’accéder aux ressources de l’organisation via leur propre identité. Une fois invités, ces utilisateurs sont ajoutés à l’annuaire Microsoft Entra comme objets `Guest`.

#### 🧑‍💼 Types d’utilisateurs B2B
| Type d’utilisateur | Authentification | Niveau d’accès | UserType |
|--------------------|------------------|----------------|----------|
| External guest     | Fournisseur externe (Entra ID ou autres) | Accès invité | Guest |
| External member    | Fournisseur externe, mais accès membre (cas multi-tenants) | Accès complet | Member |
| Internal guest     | Identité interne, mais UserType = Guest | Accès limité | Guest |
| Internal member    | Employé de l’organisation | Accès complet | Member |

---
#### 📂 Applications prenant en charge les invités
- **Microsoft Teams**
- **SharePoint / OneDrive / Lists**
- **Planner**
- **Microsoft 365 Groups**
- **Power Apps**
- **Yammer**
- **Fichiers Word, Excel...** selon l'emplacement (Teams, SharePoint, etc.)

---
#### ⚙️ Paramètres de collaboration externe
- 🔐 **Définir l’accès invité :**
  - Même accès que les membres
  - Accès limité *(par défaut)*
  - Accès restreint *(profil uniquement)*
- 📮 **Qui peut inviter ?**
  - Tous les utilisateurs
  - Administrateurs uniquement (Guest Inviter, User Admin, etc.)
- 🌐 **Limiter les domaines** : autoriser ou bloquer des domaines invités
- 🧾 **UserType** : `Guest` ou `Member` (n’affecte pas le mode de connexion)

---
#### 📨 Processus d’invitation
1. L’administrateur invite un utilisateur externe.
2. L’utilisateur reçoit un email avec un lien de **rédemption**.
3. Un objet utilisateur est créé dans Entra ID avec UPN contenant `#EXT#`.
4. L’état est `PendingAcceptance` jusqu’à la première connexion.

---
#### 👤 Propriétés clés d’un utilisateur invité
- **UPN** : contient `#EXT#`
- **UserType** : `Guest` ou `Member`
- **Identities** : méthode de connexion (ex. `ExternalAzureAD`, `google.com`, `mail`…)

---
#### 🧑‍🔧 Ajouter un invité manuellement
1. Aller dans **Admin Center > Identity > Microsoft Entra**.
2. Naviguer vers **Users > All Users > + New user > Invite external user**.
3. Renseigner : adresse email, nom, message, assignations (groupes, rôles…).
4. Cliquer sur **Review + Invite**.

---
#### 👥 Ajouter un invité à un **groupe**
1. Aller dans **Entra > Groups > All Groups**.
2. Choisir un groupe ou en créer un.
3. Aller dans **Members > +Add members**.
4. Rechercher un invité existant ou inviter un nouveau.

---
#### 💻 Ajouter un invité à une **application**
1. Aller dans **Entra > Enterprise Applications > [Nom de l’app]**.
2. Sélectionner **Users and groups > Add user/group**.
3. Rechercher ou inviter l’utilisateur.
4. Sélectionner et assigner un rôle (ex. Default Access ou spécifique).

---
#### 🛡️ Astuces & limitations
- Les invitations **n’expirent pas**.
- Les adresses avec `+` ne sont **pas supportées**.
- Les utilisateurs invités apparaissent dans **Admin Center > Users > Guest users**.
- Il n’y a **aucun prérequis de licence** pour restreindre les accès invités.

## 🤝 Collaborer avec des invités sur un site SharePoint

Les sites SharePoint modernes connectés à des groupes Microsoft 365 permettent de collaborer efficacement avec des utilisateurs externes (invités) sur des documents, des données et des listes.

---
<!-- tabs:start --> 
#### **✅ Étape 1**
#### Configurer la collaboration externe dans Microsoft Entra ID

1. Se connecter à [entra.microsoft.com](https://entra.microsoft.com)
2. Menu de gauche : **External identities** > **External collaboration settings**
3. Vérifier qu’au moins une des options suivantes est cochée :
   - `Member users and users assigned to specific admin roles can invite guest users`
   - `Anyone in the organization can invite guest users including guests and non-admins`
4. Vérifier la section **Collaboration restrictions** pour s'assurer que les domaines invités ne sont pas bloqués
5. (Optionnel) Pour restreindre l’accès au répertoire :
   - `Guest users have limited access to properties and membership of directory objects`
   - ou `Guest user access is restricted to properties and memberships of their own directory objects`

---

#### **✅ Étape 2**
#### Activer les paramètres invités pour les groupes Microsoft 365

1. Dans le **Microsoft 365 admin center** :
   - **Settings** > **Org settings** > **Microsoft 365 Groups**
2. Cocher les deux options suivantes :
   - `Let group owners add people outside your organization to Microsoft 365 Groups as guests`
   - `Let guest group members access group content`

---

#### **✅ Étape 3**
#### Configurer les paramètres de partage au niveau de l’organisation SharePoint

1. Accéder au **SharePoint admin center**
2. **Policies** > **Sharing**
3. Pour SharePoint :
   - Choisir `Anyone` pour permettre le partage sans authentification
   - ou `New and existing guests` pour exiger l’authentification

📌 **Remarque** : Les paramètres de site ne peuvent pas être plus permissifs que ceux de l'organisation.

---

#### **✅ Étape 4**
#### Créer un site SharePoint

1. Dans le **SharePoint admin center** > **Sites** > **Active sites** > **Create**
2. Sélectionner **Team site**
3. Renseigner :
   - Nom du site
   - Nom du propriétaire
   - Visibilité : *public* ou *privé*
4. Finaliser avec **Finish**

---

#### **✅ Étape 5**
#### Configurer le partage au niveau du site

1. **Active sites** > sélectionner le site créé
2. Onglet **Settings** > **More sharing settings**
3. Choisir un niveau de partage :
   - `New and existing guests` si l’authentification est requise
   - `Anyone` si autorisé au niveau de l’organisation

📌 **Remarque** :
- Le site ne peut pas être partagé avec des personnes non authentifiées, mais les fichiers et dossiers peuvent l’être.
- Les **sensitivity labels** peuvent restreindre le partage externe.

---

#### **✅ Étape 6**
#### Inviter des utilisateurs

1. Se rendre sur le site SharePoint
2. Cliquer sur le lien **Members** (en haut à droite)
3. Sélectionner **Add members**
4. Entrer les noms ou emails des utilisateurs à inviter > **Save**

⚠️ Pour inviter un **invité externe**, il doit d’abord être ajouté au groupe Microsoft 365 associé via le **Microsoft 365 admin center**.

📌 Pour limiter les risques de fuites de données lors du partage :
Consulter la documentation : *Limit accidental exposure to files when sharing with people outside your organization*

---

<!-- tabs:end --> 

## 📇 Créer et gérer des contacts externes dans Microsoft 365

Les **contacts externes** sont des personnes en dehors de votre organisation que vous souhaitez rendre visibles à vos utilisateurs via le carnet d’adresses global (GAL). Ils sont utiles pour l’envoi d’emails à des fournisseurs, partenaires ou clients sans leur créer de compte utilisateur.

#### 🧾 Différences entre Mail Contact et Mail User

| Élément        | Mail Contact                          | Mail User                                 |
|----------------|----------------------------------------|--------------------------------------------|
| Email          | Externe à l’organisation               | Interne à l’organisation                   |
| Compte local   | ❌ Pas de compte dans Entra ID         | ✅ Compte dans Entra ID                    |
| Utilisation    | Pour envoi d’email uniquement          | Pour collaboration et email                |

---
#### 🔐 Permissions nécessaires

Pour créer des contacts dans l’admin center Microsoft 365, vous devez disposer d’un des rôles suivants :

- Global Administrator
- Exchange Administrator
- Directory Writers


<!-- tabs:start --> 
#### **➕ Créer un contact via Admin center**

1. **Admin center** > **Users** > **Contacts**
2. Cliquez sur **Add a contact**
3. Remplissez les champs requis :
   - *First name*, *Last name*
   - *Display name* (par défaut = Prénom + Nom)
   - *Email* (doit être externe)
   - Optionnel : informations de profil (téléphone, entreprise, etc.)
   - Optionnel : **Hide from GAL**
4. Cliquez sur **Add** puis **Close**

⏱️ *Délai de propagation : environ 30 minutes*

---
#### **🗑️ Supprimer un contact via Admin center**

1. **Users** > **Contacts**
2. Sélectionner le contact
3. Cliquer sur **Delete contact**
4. Confirmer avec **Delete** puis **Close**

⚠️ La suppression ou l’édition en masse n’est pas encore disponible dans l’admin center, utiliser PowerShell ou l’EAC classique.

---
#### **🧪 Créer un contact via PowerShell**

```powershell
New-MailContact -Name "Debra Garcia" `
  -ExternalEmailAddress dgarcia@tailspintoys.com `
  -Alias dgarcia
```

#### **❌ Supprimer un contact via PowerShell**

```powershell
Remove-MailContact -Identity "Nestor Wilke"
```

<!-- tabs:end --> 