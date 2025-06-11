# Exploration et configuration de votre Microsoft 365

## 🛠️ Explorer vos environnement cloud Microsoft 365

### 🧾 Plans et abonnements Microsoft 365

- **Plan** : ensemble de fonctionnalités/services offerts (ex. : E3, E5)
- **Abonnement** : droit d’accès payé pour un ou plusieurs plans

📌 Les deux termes sont souvent utilisés comme synonymes, mais :
- Le **plan** détermine ce que vous obtenez
- L’**abonnement** est l’acte d'achat et la durée d'accès

---

### ☁️ Fondation Cloud : Abonnement Microsoft 365 & Microsoft Entra Tenant

- L’achat d’un plan (E3, E5...) crée un **tenant Entra** (anciennement Azure AD)
- Le **tenant** est l’infrastructure d’identité (authentification, autorisation, gestion des comptes)
- Permet la gestion des services comme :
  - Microsoft Teams
  - Exchange Online
  - SharePoint Online
  - OneDrive for Business

🧠 Fun fact :
> Le tenant est souvent appelé « tenant Microsoft 365 », mais il s'agit bien d’un **Microsoft Entra tenant**

---

### 📦 Plans sans création automatique de tenant Entra

Certains plans n’entraînent pas la création d’un tenant complet, mais permettent une gestion limitée des identités :

| Plan | Description |
|------|-------------|
| EMS E5 | Sécurité & gestion avancée (souvent combiné à un plan 365) |
| Microsoft 365 Business Basic | Version web des apps Office + Teams, Exchange, SharePoint |
| Microsoft 365 Business Standard | Idem + apps Office installables sur 5 appareils |
| Microsoft 365 Apps | Apps Office en local uniquement |
| Office 365 F3 | Pour travailleurs en première ligne, apps web et mobiles |
| Microsoft 365 F1 | Version plus complète que F3, avec sécurité renforcée |

📌 Pour accéder aux **fonctionnalités avancées d’Entra ID**, il faut des plans comme E3 ou E5.

---

### 👥 Licences Microsoft 365

#### 📌 Étapes clés :
1. **Choisir un plan** adapté aux besoins
2. **Acheter** un nombre de licences (ex. 50 utilisateurs = 50 licences)
3. **Attribuer** les licences via l’interface d’administration
4. **Gérer** l’évolution : ajout/suppression selon les besoins

> ⚠️ Les modalités précises varient selon le plan et les éventuels services complémentaires.

---

### 🧩 Multi-tenants et abonnements multiples

Une organisation peut disposer de **plusieurs tenants**, chacun lié à un abonnement distinct :

#### ✅ Raisons courantes :
- **Besoins métiers différents** (RH vs Dev)
- **Flexibilité de licence** (employés, sous-traitants…)
- **Contraintes réglementaires**
- **Fusions & acquisitions** en cours

> ⚠️ La gestion multi-tenants implique une complexité supplémentaire lié à l'administration de chaque tenant de manière individuel.

---

### 🌐 Informations sur le tenant

- Lors de la création du tenant, Microsoft demande :
  - Nom d’entreprise
  - Pays
  - Nom de domaine (ex. `contoso.onmicrosoft.com`)
- L’**admin Microsoft 365** peut ensuite :
  - Gérer les utilisateurs, domaines, licences…
  - Ajouter jusqu’à **900 domaines** par tenant

📌 Un **abonnement = un tenant** (mais une organisation peut avoir plusieurs abonnements donc plusieurs tenants).

---

### 🧱 Bonnes pratiques pour concevoir un tenant Microsoft Entra

#### 🎯 Objectif : garantir sécurité, performance et expérience utilisateur optimale

### 🔧 Éléments à configurer :
- Plans & licences adaptés + suffisants
- DNS correctement configuré
- Réseau optimisé (VPN pour le télétravail)
- Synchronisation AD (si existant)
- Attribution correcte des licences
- Authentification forte (MFA, passwordless)
- Politiques d’accès conditionnel
- Gestion des appareils (Intune ou gestion de base)
  - Appareils pro
  - Appareils personnels

---

### 📊 Exemple d’un tenant bien conçu

- Microsoft 365 E5 + EMS E5
- Microsoft Teams, SharePoint, Exchange Online
- Intune pour la gestion des appareils
- MFA + politiques d’accès conditionnel
- Synchronisation avec AD local
- Licences bien réparties par profil utilisateur

---

> ✅ Cette configuration garantit une intégration fluide, une gestion centralisée et une sécurité renforcée dans un environnement cloud Microsoft 365.


## 🏢 Configuration du profil d’organisation Microsoft 365

> 🎯 Seul un **Administrateur global** peut modifier le profil d’organisation.

### 🧾 Modifier le profil de l’organisation

#### Étapes :
1. Accéder au **Centre d’administration Microsoft 365**
2. Menu gauche → **Afficher tout (…**) → **Paramètres** → **Paramètres de l'organisation**
3. Onglet **Profil de l’organisation**
4. Sélectionner un groupe de paramètres (ex. : Informations, Thèmes personnalisés)
5. Modifier les valeurs, puis **Enregistrer**

> ⚠️ **Le champ Pays/Région ne peut pas être modifié ultérieurement** car il influence : 
> - Les services disponibles
> - La devise et la fiscalité
> - La localisation du **datacenter Microsoft**

> Le choix de la langue préféré détermine la langue des communications envoyées par Microsoft.
> Il affecte la langue de **SharePoint Online lors de l’inscription** qui ne sera pas modifiée en cas de changement de langue.
### 🎨 Personnalisation du thème de l’organisation

Un administrateur peut créer jusqu’à :
- **1 thème par défaut**
- **4 thèmes personnalisés** (appliqués à des groupes Microsoft 365)
#### Application :
- Thème par défaut : visible par tous les utilisateurs
- Thèmes personnalisés : assignés à des **groupes Microsoft 365** (pas à des utilisateurs individuels)
#### Étapes :
1. Centre d’admin → Paramètres > Paramètres de l'organisation → Profil de l’organisation
2. Sélectionner **Thèmes personnalisés**
3. Cliquer sur **Ajouter un thème** ou modifier un existant

---

### 🧩 Onglet Général (création ou modification)

- Nom du thème (sauf pour le thème par défaut, non renommable)
- Affectation à **jusqu’à 5 groupes Microsoft 365**
- Option : empêcher l’override utilisateur
- Option : afficher le **nom de l’utilisateur**
- **Enregistrer** les modifications

> 🧠 Si un utilisateur appartient à plusieurs groupes à thème : **le thème par défaut s’applique**

---
### 🖼️ Onglet Logos

#### Logos disponibles :
- **Logo par défaut**
- **Logo alternatif** (mode sombre)
#### Exigences :
- Format : SVG, PNG, JPG, GIF
- Taille :
  - SVG : 24 px de hauteur
  - Autres formats : 200 x 48 px
  - < 10 Ko pour upload
- **URL HTTPS obligatoire**, accessible sans authentification
#### Options :
- Ajouter un lien cliquable vers un site (ex. site vitrine)
- Supprimer un logo via la page d’administration

> 💡 Respect du contraste recommandé (4.5:1), mais pas obligatoire

---
### 🎨 Onglet Couleurs

Permet de définir l’identité visuelle de la barre de navigation supérieure :

- **Couleur de la barre de navigation**
- **Couleur du texte et des icônes**
- **Couleur d’accent** (liens, boutons sur fond clair)
- Option : **Réinitialiser** les couleurs

> 🧠 Le bandeau Microsoft 365 est **responsive**, donc un logo trop large peut être masqué.

## 💼 Gérer les abonnements de votre tenant Microsoft 365

**Assurer la bonne gestion des abonnements et licences** permet :
- D’éviter les **erreurs de provisionnement** (licences épuisées)
- De limiter les **dépenses excessives** (licences inutilisées)

### 📊 Suivi des licences dans le Centre d’administration Microsoft 365

#### 📍 Accès : Navigation gauche → **Facturation** → **Licences** → Onglet **Abonnements**

> ⚠️ L’achat de licences supplémentaires modifie la **date de facturation mensuelle** pour ces licences spécifiques (ex. achat le 14 et le 15 → échéances les 14 et 15 du mois suivant)

---
### 🧾 Pages clés du groupe **Facturation**

| Page                             | Fonction                                                            |
| -------------------------------- | ------------------------------------------------------------------- |
| **Acheter des services**         | Comparer jusqu’à 3 produits, et initier un achat                    |
| **Vos produits**                 | Voir et gérer tous les plans souscrits                              |
| **Licences**                     | Résumé des licences disponibles par plan                            |
| **Factures et paiements**        | Historique des factures, moyens de paiement, profils de facturation |
| **Comptes de facturation**       | Informations légales liées à la relation d’achat avec Microsoft     |
| **Moyens de paiement**           | Définir les cartes bancaires ou comptes utilisés                    |
| **Notifications de facturation** | Définir les destinataires et méthodes de réception des factures     |

## 🔗 Intégration de Microsoft 365 avec des applications d'engagement client

L'objectif est d'étendre les capacités de Microsoft 365 en y intégrant des outils complémentaires tels que **Project Online**, **Visio**, **Microsoft Scheduler**, **Microsoft Stream** **Microsoft Purview**, **Discovery Premium**

<!-- tabs:start --> 
### **🛒 Page Acheter des services**

> 📍 Centre d’administration Microsoft 365 → Groupe **Facturation** → **Acheter des services**

#### Fonctions disponibles :
- Acheter de **nouveaux produits** (Business Premium, Business Standard, Apps for Business…)
- Ajouter des **services complémentaires** (Teams, Power BI, Project Online…)
- Gérer les **licences**
- Consulter l’**historique d’achat**
- Obtenir des **recommandations** personnalisées

---
#### 🔍 Comparer des produits

Fonction **Comparer** :
1. Cocher les produits souhaités
2. Cliquer sur **Comparer**

Affiche une page de comparaison détaillée :
- 🧩 **Présentation** des produits (public cible, bénéfices)
- 📊 **Comparaison des fonctionnalités** (productivité, sécurité, collaboration…)
- 💰 **Tarification** (par utilisateur/mois)
- ⚙️ **Spécifications techniques**
- ⭐ **Avis clients**

<img src="M_365_by_M/Images/image.png">


#### 🎫 Affecter un service acheté

Deux options :
1. Acheter → aller dans l’onglet **Utilisateurs** → affecter la licence
2. Ou cliquer sur **Affecter à** dès l’achat → sélectionner un utilisateur

---

### **🛍️ Azure Marketplace**

> 💡 Fournit une couche de gouvernance supplémentaire pour les apps tierces

#### Deux types :
| Type | Description |
|------|-------------|
| **Azure Marketplace** | Catalogue ouvert d'apps (Compute, AI, DevOps, etc.) |
| **Private Azure Marketplace** | Catalogue restreint et contrôlé par l’administrateur Marketplace |

---

#### ✅ Avantages comparés

| Fonctionnalité | Azure Marketplace | Private Azure Marketplace |
|----------------|-------------------|----------------------------|
| Découverte d’apps (Microsoft + partenaires) | ✅ | ✅ |
| Contrôle des déploiements d’apps partenaires | 🔶 Limité | ✅ Complet |
| Contrôle au niveau du plan/SKU | ❌ | ✅ |
| Collections personnalisées | ❌ | ✅ |
| Approbation manuelle des apps par les utilisateurs | ❌ | ✅ |

> ✅ Toutes les apps Microsoft + distributions Linux approuvées sont disponibles par défaut

---

### 🛠️ Créer et activer un Private Azure Marketplace

1. 🎫 Attribuer le **rôle Administrateur Marketplace**
2. ➕ Créer le **Marketplace privé** (initialement désactivé)
3. 📚 Créer des **collections** de produits autorisés (dont une *Default Collection*)
4. ✅ **Activer** le Marketplace privé

📌 La **Default Collection** :
- Est créée automatiquement
- Couvre toutes les souscriptions du tenant
- Est **non modifiable ni supprimable**

<!-- tabs:end --> 


## 🔐 Partage externe dans **SharePoint** et **OneDrive**

#### 🎯 Objectif

Permettre ou restreindre le **partage de contenus avec l'extérieur** (clients, partenaires, prestataires…), tout en assurant :
- 📁 Une gestion centralisée
- 🛡️ Un contrôle précis sur la sécurité
- 🔄 Une cohérence entre SharePoint et OneDrive

> Par défaut, le partage externe est autorisé sur Onedrive et Sharepoint. Il est **recommandé de Désactiver temporairement** le partage externe avant l’utilisation initiale.

---

### 🌐 Paramètres de partage à l’échelle de l’organisation

> 📍 Centre d’administration SharePoint → **Politiques** → **Partage**

#### 📌 Règle de priorité
> Le **niveau le plus restrictif** entre le paramètre du **tenant** et celui du **site** est appliqué

#### Types de partage disponibles :

| Option                               | Description                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| **Anyone**                           | Accès sans authentification via lien. Peut être limité (expiration, vue seule). |
| **New and existing guests**          | Authentification via compte Microsoft/365 ou code vérification.                 |
| **Existing guests**                  | Partage limité aux invités déjà enregistrés dans l’annuaire.                    |
| **Only people in your organization** | Partage externe désactivé.                                                      |

> ⚠️ OneDrive ne peut pas être plus permissif que SharePoint

---
### ⚙️ Paramètres supplémentaires de partage externe

- 🔐 **Limiter par domaine** : autoriser ou bloquer certains domaines (max 5000)
- 👥 **Limiter aux utilisateurs de groupes de sécurité spécifiques**
- 📧 **Exiger que les invités utilisent le compte sur lequel l’invitation a été envoyée**
- 🔁 **Autoriser les invités à repartager les éléments** (par défaut : nécessite contrôle total)
- ⏳ **Expiration automatique de l’accès invité** (ex : 30 jours)
- 🔄 **Réauthentification obligatoire après X jours** pour accès via code

> 💡 Certains paramètres nécessitent que **Microsoft Entra B2B Collaboration** soit activé

---
### 🔗 Paramètres par défaut des liens de partage

Définit le **type de lien proposé par défaut** lors du partage :

| Option | Utilisation recommandée |
|--------|--------------------------|
| **Specific people** | Partage ciblé, le plus restrictif |
| **Only people in your organization** | Pour partage large en interne |
| **Anyone with the link** | Pour collaboration fluide (⚠️ non traçable) |

> ⚠️ Si OneDrive/Site est plus restrictif, l’option par défaut est ajustée automatiquement

---
### ⏱️ Paramètres avancés pour les liens « Anyone »

- **Expiration des liens** (ex. : 30 jours max)
- **Permissions limitées** : vue seule ou édition
- Obligatoire si vous utilisez les **demandes de fichiers**

---
### 👁️ Autres paramètres d’affichage

- ✅ **Afficher les noms des personnes ayant consulté un fichier dans OneDrive**
  - Active la **fiche de fichier** (hover) avec stats de consultation
- ✅ **Permettre aux propriétaires de sites d’activer l’affichage des lecteurs**
  - Activé au niveau orga par défaut, désactivé pour les sites existants
- 🔗 **Utiliser des liens courts** : utile pour intégration ou lisibilité

> 📌 L’historique des vues est conservé même si l’option est temporairement désactivée

## 🛠️ Paramètres au niveau du tenant pour **Microsoft Teams**

En tant qu'administrateur Microsoft 365, vous pouvez définir des paramètres globaux pour Teams, affectant :
- L’accès des utilisateurs et invités
- Les politiques de réunion
- Les applications autorisées
- Les rapports et l’analyse d’usage

<!-- tabs:start -->
### **⚙️Centre d’administration Teams**

> 📍 Admin Center Teams

| Paramètre                        | Description                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Accès invité**                 | Activer/désactiver l'accès Teams aux utilisateurs externes (chats, réunions, canaux). Vous pouvez limiter les domaines autorisés et les fonctionnalités accessibles aux invités. |
| **Mise à niveau Teams**          | Définir les modes de coexistence avec Skype for Business (ex. : Teams only, Islands…).                                                                                           |
| **Paramètres Teams**             | Gérer les politiques : configuration d’apps, réunions, messagerie, événements en direct, voix, périphériques.                                                                    |
| **Applications Teams**           | Gérer les apps disponibles pour les utilisateurs (approbation, blocage, installation, épinglage).                                                                                |
| **Analytique et rapports Teams** | Suivre l’adoption, l’usage et la qualité des appels (ex. : rapports d’activité, qualité des réunions…).                                                                          |

---

### **📅 Politiques de réunion**

> 📍 Admin Center Teams → Réunions → **Politiques de réunion**

| Option | Fonction |
|--------|----------|
| **Autoriser les réunions privées** | Oui/non pour créer des réunions sans canal |
| **Autoriser Meet now dans les canaux** | Lancer une réunion immédiate dans un canal |
| **Autoriser la planification de réunions de canal** | Oui/non pour planifier dans les canaux |
| **Autoriser la vidéo IP** | Activer/désactiver la vidéo |
| **Partage d’écran** | Autoriser ou non le partage d’écran ou d’apps |
| **Transcription** | Générer une transcription en direct |
| **Enregistrement dans le cloud** | Enregistrer la réunion dans OneDrive/SharePoint |
| **Sous-titres en direct** | Affichage en direct des dialogues en texte |
| **Débit média (Kbps)** | Limiter l’utilisation de bande passante |
| **Autoriser les événements en direct** | Organiser des événements jusqu’à 10 000 participants |

---

### **🛠️ Configuration de réunion**

> 📍 Admin Center Teams → Réunions → **Paramètres de réunion**

| Option | Fonction |
|--------|----------|
| **Mode de présentation désigné** | Qui peut être présentateur : Tout le monde, Organisation uniquement, Fédérés inclus, Organisateur uniquement |
| **Contournement du lobby** | Qui rejoint directement la réunion sans attendre |
| **Annoncer les entrées/sorties** | Son émis quand un participant rejoint/quitte |
| **Contournement pour les appels téléphoniques** | Les utilisateurs par téléphone évitent ou non le lobby |
| **Admission automatique** | Définir qui est admis automatiquement (ex. : orga + fédérés) |
| **Autoriser les utilisateurs anonymes** | Participants non connectés peuvent-ils rejoindre |
| **Discussion privée pendant les réunions** | Oui/non pour permettre le chat privé |
| **Envoi de réactions** | Emoji pendant la réunion (👍❤️😂...) |
| **Accès aux notes partagées** | Voir/modifier les notes de réunion en direct ou après |

---
<!-- tabs:end -->
### 🧠 Recommandations

- Appliquer des **politiques différentes selon les profils utilisateurs** (direction, production, partenaires…)
- Utiliser les **rapports d'activité et qualité d'appel** pour surveiller les usages
- Vérifier la **cohérence entre les politiques Teams et les paramètres Microsoft Entra**

## 🧾 Journalisation d’audit unifiée (Unified Audit Logging) 

Suivre et enregistrer les activités des utilisateurs et administrateurs sur l’ensemble des services Microsoft 365 (Exchange, SharePoint, OneDrive, Teams, Entra ID, etc.) pour :

- 🔐 Renforcer la sécurité et la conformité
- ⚙️ Améliorer l’efficacité opérationnelle
- 📊 Analyser les comportements utilisateurs

---
### 📦 Activités prises en charge par l’audit unifié

- Administration des applications (ex. : modification d’apps dans Entra ID)
- Activités dans Microsoft Defender for Identity
- Téléchargements de fichiers, connexions, partages, actions d’administration, etc.
- Historique consultable via des **recherches personnalisées** dans le portail Purview

---
### 📍 Accès à l’audit

> Portail : **Microsoft Purview compliance portal** → **Audit**

🧩 Les activités sont organisées par service, facilitant la recherche et la génération de rapports ou d’alertes.

---

### 📅 Rétention des journaux d’audit

| Type | Durée de conservation |
|------|------------------------|
| **Audit (Standard)** | 180 jours (après le 17 oct. 2023) |
| **Avant le 17 oct. 2023** | 90 jours |

📝 La durée peut être étendue (jusqu'à 1 an) avec une **politique de rétention personnalisée** selon les licences.

---

### 🔍 Vérifier l’état d’activation de l’audit

Exécuter dans **Exchange Online PowerShell** :

```powershell
Get-AdminAuditLogConfig | Format-List UnifiedAuditLogIngestionEnabled
```

## ✅ Finaliser la configuration de votre tenant Microsoft 365

### 📋 Tâches courantes de configuration du tenant

| Domaine | Action recommandée |
|--------|--------------------|
| 👤 **Utilisateurs & Boîtes mail** | Migrer tous les utilisateurs + données associées |
| 🛠️ **Ressources système & permissions** | Configurer les autorisations nécessaires |
| 🌐 **Configuration des domaines** | Transférer et valider les domaines personnalisés |
| 💻 **Gestion des appareils** | Enrôler les appareils Windows 10/11 via Intune |
| 📱 **Gouvernance mobile** | Appliquer des politiques MDM appropriées |
| ✉️ **DNS & flux mail** | Vérifier et mettre à jour les enregistrements DNS |
| 🔁 **Synchronisation d’identité** | Configurer Entra Connect (Azure AD Connect) |
| 🔐 **Authentification multifacteur (MFA)** | Activer MFA pour tous les utilisateurs |
| 🛡️ **Sécurité & conformité** | Mettre en place les accès conditionnels, désactiver l’authentification héritée, activer l’audit |
| 📦 **Protection des données** | Déployer les politiques DLP + Azure Information Protection |
| 📊 **Suivi & rapports** | Utiliser **Microsoft Secure Score** pour mesurer la posture sécurité |
| 🔄 **Revue régulière** | Analyser et mettre à jour les paramètres de sécurité périodiquement |

---

### 🔍 Vérification de l’état de préparation

| Outil | Usage |
|-------|-------|
| 🧪 **Microsoft Remote Connectivity Analyzer** | Vérifie DNS et flux de messagerie |
| 🛠️ **Microsoft SARA** | Diagnostique les problèmes de connectivité courants |

---

### 🧠 Bonnes pratiques

- Suivre une **checklist structurée** pour ne rien oublier
- Effectuer des **revues régulières de la sécurité**
- Utiliser les **outils Microsoft** pour auditer et corriger en continu les failles potentielles

