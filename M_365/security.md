# Sécurité & conformité Microsoft 365

## ☠️ La messagerie : principal vecteur d’attaque

|🧨 **Type d’attaque**|🎯 **Objectif de l’attaquant**|🛡️ **Réponse adaptée**|
|---|---|---|
|**Spam**|Saturer la boîte, faire passer de la pub ou du phishing|Filtres antispam (EOP), listes de blocage, sensibilisation|
|**Phishing**|Voler des identifiants via faux liens ou mails piégés|MFA, sensibilisation, filtre lien cliquable, simulation d’attaque|
|**Malware (virus, ransomware)**|Chiffrer ou compromettre les données|Antivirus cloud, sandbox, pièces jointes désactivées (.exe)|
|**Scam**|Obtenir de l’argent (arnaque à l’émotion, au président…)|Sensibilisation renforcée, détection d’usurpation|
|**Spear Phishing**|Attaquer une cible précise (ex : DG, RH)|MFA, vérification des droits d'accès, alertes sur comportements|
|**Usurpation de domaine**|Envoyer des mails depuis un faux nom de domaine|Configuration SPF, DKIM, DMARC|
|**Piratage de compte**|Accéder à Microsoft 365 ou à la boîte Exchange|MFA obligatoire, rotation mot de passe, alertes de connexion|
## 🧭 Centre de sécurité & conformité M365

Accessible via :  
🔗 [https://security.microsoft.com](https://security.microsoft.com)

### ✨ Fonctions principales :
- Stratégies DLP (Data Loss Prevention)
- Archivage et gouvernance des données
- Analyse des menaces (tableaux de bord)
- Revue des quarantaines
- Alertes sécurité (fuites, anomalies)
- Surveillance des flux SMTP, transferts auto, usage SMTP

## 📂 Archivage & Gouvernance

- 📥 Importation de fichiers PST
- 📦 Archivage en ligne (auto-expansion)
- 🧭 Quotas : 50 Go / 100 Go + archive illimitée
- ⚠️ Attention :
    - Archivage pas accessible sur mobile
    - Ralentissement possible des recherches
    - Confusion possible chez les utilisateurs ("mails disparus") avec l'archivage automatique

## 🔐 Authentification & gestion des mots de passe

### 🔑 Recommandation ANSSI et Microsoft
- Mots de passe : 
	- **Uniques**
	- **Longs** : 12 caractères minimum / Idéalement phrase passe
	- **Complexe** : majuscules, minuscules, chiffres et caractères spéciaux
	- **Non personnels** 
- Utiliser l'**Authentification multifacteur (MFA)**
- Éviter la rotation systématique (sauf doute)
- Désactiver l’enregistrement automatique dans les navigateurs
- Ne jamais envoyer ses mots de passe par mail
- Ne pas stocker ses mots de passes en clair 

La gestion des stratégies de sécurité peut se faire via le menu "**Sécurité et Confidentialité**" ou en powershell via les commandes : 

```powershell
Set-MsolPasswordPolicy –ValidityPeriod 90 –NotificationDays 85
Set-MsolUser –UserPrincipalName user@domain.com –PasswordNeverExpires $true
Set-MsolUserPassword –UserPrincipalName user@domain.com –ForceChangePassword
Set-MsolUserPassword –UserPrincipalName user@domain.com –NewPassword "Mot2PasseSûr!"
```
### 🔐 Authentification multifacteur (MFA)
- Requiert au moins **2 facteurs** parmi :
    - 🔑 Mot de passe ✅ - **Obligatoire**
    - 🔢 OPT ✅✅
    - 📱 Notification push / SMS / appel ✅
    - 🧬 Donnée biométrique ✅✅
    - 🔌Clé usb ✅✅
        
- Activée **par défaut depuis 2021**
- Gérée dans **Azure AD / Microsoft Entra ID**
- Compatible avec **Microsoft Authenticator**

## 🔑 Renforcer la sécurité autour de Microsoft 365

### ✉️ Sécurisation de la messagerie : SPF / DKIM / DMARC

| Mécanisme | Fonction principale                                                                       |
| --------- | ----------------------------------------------------------------------------------------- |
| **SPF**   | Déclare les IP autorisées à envoyer des mails pour un domaine                             |
| **DKIM**  | Ajoute une **signature chiffrée** dans l'en-tête des mails                                |
| **DMARC** | Vérifie l’alignement entre SPF/DKIM et l'adresse "From"<br>DMARC = SPF + DKIM + politique |

📌 Tout cela se configure dans la **zone DNS publique** du domaine.

### 🦠 Protection contre les malwares et le spam

- **Filtres antimalware** :
    - Analyse lors de l’envoi / réception
    - Suppression ou mise en quarantaine
    - Notification à l’admin ou expéditeur
        
- **Antispam** :
    - Listes d'expéditeurs sûrs / bloqués
    - Règles personnalisées
    - Critères : pays, domaines, en-têtes SMTP…
        
- **Microsoft EOP (Exchange Online Protection)** : filtrage standard inclus
- **Microsoft Defender for Office 365 (ATP)** : protection avancée (licence E5)

### 💽 Sauvegarde : un aspect souvent négligé

- ☁️ Microsoft **n’offre pas de vraie sauvegarde** (seulement de la haute dispo)
- ❌ Pas de restauration garantie si :
    - suppression malveillante
    - dépassement du délai de rétention
        
### ✅ Solutions tierces recommandées :
- Veeam, SkyKick, Acronis…
- Sauvegarde :
    - Exchange Online
    - SharePoint, Teams, OneDrive
    - Groupes M365
- Sauvegarde possible **dans Azure ou en local**

### 📦 Autres services externes (2FA, MDM, Antispam)
- Des éditeurs tiers comme **Fortinet, Stormshield, Duo, Sophos**…
- Intégration API avec M365
- Coût moyen : **3€/utilisateur/mois**
- Pas de changement de MX requis