# Gérer les groupes dans Microsoft 365

## 📂 Examiner les groupes dans Microsoft 365

Microsoft 365 permet d’organiser les utilisateurs via différents types de groupes pour gérer les accès, les permissions et la collaboration à travers les applications de l’écosystème.

---

### 🔸 Types de groupes dans Microsoft 365

| Type de groupe                    | Description                                                                 | Utilisation recommandée                                             | Lieux de création                                                   |
|----------------------------------|-----------------------------------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------|
| **Microsoft 365 group**          | Groupe avec boîte mail, calendrier, fichiers, conversations, etc.          | Collaboration complète (Teams, Outlook, SharePoint, etc.)           | M365 admin center, Entra, Exchange, Outlook                         |
| **Distribution group**           | Liste de diffusion (envoi d’emails à plusieurs personnes)                  | Notification uniquement                                              | M365 admin center, Exchange admin center                            |
| **Mail-enabled security group**  | Groupe de sécurité avec adresse email                                      | Attribution de droits + envoi d’emails                              | M365 admin center, Exchange admin center                            |
| **Security group**               | Groupe pour gérer les autorisations uniquement                             | Attribution d’accès (SharePoint, OneDrive…)                         | M365 admin center, Entra admin center                               |
| **Dynamic distribution group**   | Groupe dont les membres sont ajoutés automatiquement selon des règles      | Notification automatisée selon attributs (département, etc.)        | Exchange admin center uniquement                                    |
| **Shared mailbox**               | Boîte mail partagée entre plusieurs utilisateurs                            | Ex : support, accueil, contact@entreprise                           | M365 admin center, Entra admin center                               |

---
### 🔸 Fonctionnement des Microsoft 365 Groups

- Basé sur un objet dans Microsoft Entra ID
- Contient une liste de membres et est couplé à des services collaboratifs :
  - 📧 Boîte de réception Outlook
  - 📅 Calendrier partagé
  - 🗂️ Site SharePoint
  - 📁 Bibliothèque de documents
  - ✅ Planner
  - 📊 Power BI
  - 🧠 Viva Engage (ex-Yammer)
  - 📌 Team (si créé depuis Teams)
  - 📍 Roadmap (si Project for the Web est utilisé)

---
### 🔸 Services provisionnés selon la source de création

|Création depuis...|Boîte mail|Teams|SharePoint + OneNote|Viva Engage|Planner|
|---|---|---|---|---|---|
|Microsoft Entra ID|🟦|⚫|🟦|⚪|🟦|
|Microsoft 365 admin|🟦|⚫|🟦|⚪|🟦|
|Outlook|🟦|⚫|🟦|⚪|🟦|
|Teams|⚫|🟦|🟦|⚪|🟦|
|SharePoint|🟦|⚫|🟦|⚪|🟦|
|Planner|🟦|⚫|🟦|⚪|🟦|
|Viva Engage|⚫|⚪|🟦|🟦|🟦|
|Project for web|🟦|⚫|🟦|⚪|🟦|
|Roadmap|🟦|⚫|🟦|⚪|🟦|

>🟦 = Auto-provisionné = Le service (ex. boîte mail, SharePoint, Planner...) est automatiquement **créé** en même temps que le groupe Microsoft 365, sans action manuelle requise
>
>⚫ = Auto-provisionné mais masqué = Le service est bien créé automatiquement, mais **n'est pas visible** directement dans certaines interfaces (comme Outlook). Il est accessible en arrière-plan ou via une commande (ex. PowerShell).
>
>⚪ = Non disponible = Le service **n'est pas créé du tout** lorsqu'on crée le groupe depuis cette application. Impossible de l’utiliser directement via cette méthode de création.

---
### 🔸 Gestion des membres

- Supprimer un utilisateur d’un groupe = suppression immédiate dans Teams
- Retrait via M365 admin ou Entra = délai de 2h pour suppression Teams
- 📌 **Bonnes pratiques** : toujours gérer les membres directement depuis Teams pour synchronisation rapide

---
### 🔸 Suppression de groupes ou de Teams

- Supprimer un groupe supprime :
  - Le site SharePoint (marqué pour suppression)
  - La boîte mail et les alias
- Délai de 20 minutes pour disparition dans Outlook
- Supprimer un **Team** = disparition immédiate pour les membres
- Si membres supprimés du groupe, le Teams associé disparaît après ~2h pour eux

Pour en savoir plus :
- 🔗 [Fin de cycle de vie d’un groupe Microsoft 365](https://learn.microsoft.com/fr-fr/microsoft-365/admin/create-groups/delete-groups)
- 🔗 [Archiver ou supprimer un Team](https://learn.microsoft.com/fr-fr/microsoftteams/archive-or-delete-a-team)

---
