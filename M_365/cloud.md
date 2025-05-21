# ☁️ Les composantes du Cloud et de Microsoft 365
## ☁️ Qu’est-ce que le Cloud ?

Le Cloud (nuage 🌥️) désigne l’**accès à des ressources informatiques via Internet** :
- 💻 Puissance de calcul (CPU, RAM, GPU)
- 📦 Stockage
- 🧰 Applications

### 🔐 Avantages du cloud computing

- Haute disponibilité (infra, électricité, climatisation…)
- Matériel **géré par le fournisseur**
- **Facturation à l’usage** (maîtrise des coûts)
- Accès à du matériel **haut de gamme** sans achat

## 📦 Le modèle SPI – **SaaS / PaaS / IaaS**

<!-- tabs:start --> 
### **SaaS ✅**

- **SaaS** (Software as a Service)
- Niveau de contrôle : Aucun – l’utilisateur consomme l’application
- Usage typique : Microsoft 365, Google Workspace
- Avantages : pas de gestion, accessible, évolutif
- Inconvénients : dépendance à l’éditeur, confidentialité des données ?, Internet requis, Return On Investisment :  4 ans 
    

### **PaaS ⚙️**

- **PaaS** (Platform as a Service)
- Niveau de contrôle : Gestion des apps + environnements
- Usage Typique : Azure WebApp, Heroku, apache, SQL Server
- Avantages : flexibilité, déploiement rapide, sécurité assurée
- Inconvénients : dépendance à l’Internet, confidentialité des données ? 
    

### **IaaS 🖥️**

- **IaaS** (Infrastructure as a Service)
- Niveau de contrôle : Contrôle total sur les machines virtuelles
- Usage typique : AWS EC2, Azure VM
- Avantages : maîtrise complète, évolutivité, hautes performances
- Inconvénients : gestion plus technique, toujours tributaire de l’accès réseau, confidentialité des données ? 

<!-- tabs:end --> 

## ☁️ Types de Cloud

| Critère                    | **On-Premise** 🔌              | **Cloud Privé** 🛡️         | **Cloud Public** 🌐                    | **Cloud Hybride** ⚙️           |
| -------------------------- | ------------------------------ | --------------------------- | -------------------------------------- | ------------------------------ |
| 💾 **Matériel**            | Propriété de l’entreprise      | Dédié mais externalisé      | Mutualisé chez un fournisseur          | Mix local + cloud              |
| 🛠 **Maintenance**         | Gérée en interne               | Gérée partiellement (infra) | Gérée par le fournisseur               | Mix des deux                   |
| 💰 **Coût**                | Investissement initial élevé   | Abonnement ou location      | Paiement à l’usage                     | Flexible selon l’usage         |
| 🔒 **Isolation**           | ✅ Totale (physique et logique) | ✅ Forte                     | ❌ Logique seulement (virtualisation)   | ⚖️ Variable selon les services |
| 📶 **Dépendance Internet** | ❌ Faible (local)               | ✅ Forte                     | ✅ Totale                               | ✅ Variable selon les apps      |
| 📈 **Scalabilité**         | ❌ Limitée (matériel physique)  | ⚠️ Limitée selon infra      | ✅ Très forte (ressources à la demande) | ✅ Flexible                     |
| 🔐 **Sécurité & contrôle** | ✅ Maximum                      | ✅ Fort                      | ⚠️ Moins contrôlé                      | ⚖️ Mix des deux                |

## 🧪 Garanties de disponibilité (SLA)

|**Niveau**|**Disponibilité annuelle**|**Temps d’arrêt max/an**|
|---|---|---|
|Niveau 1|99,67 %|28,8 h|
|Niveau 2|99,75 %|22 h|
|Niveau 3|99,982 %|1,6 h|
|Niveau 4|99,995 %|26,3 min|
## 📧 La messagerie dans le Cloud

### 📜 Historique Microsoft Exchange

- Première messagerie 1970
- Exchange 4.0 (1996) → X.400
- Exchange 2000 → intégration à Active Directory
- Exchange 2010 → OWA, DAG, PowerShell
- Office 365 → Microsoft 365 (Cloud)
    

### 📬 Mécanismes d'envoi d'un mail

| Acronyme | Nom complet               | Rôle dans le cycle du mail                                               | Exemple concret                      |
| -------- | ------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| **MUA**  | **Mail User Agent**       | Interface utilisateur pour **rédiger, envoyer et recevoir** des mails    | Outlook, Thunderbird, Gmail Web      |
| **MSA**  | **Mail Submission Agent** | Reçoit les mails du MUA et les **transmet au MTA**, en les authentifiant | Le serveur SMTP utilisé pour l’envoi |
| **MTA**  | **Mail Transfer Agent**   | **Transfère les mails** . C'est le serveur de messagerie                 | Postfix, Sendmail, Exchange (SMTP)   |
| **MDA**  | **Mail Delivery Agent**   | **Dépose le mail dans la boîte de réception** de l’utilisateur           | Dovecot, procmail, Exchange Mailbox  |

<img src="M_365/images/mail.png">

## 🌐 DNS & Messagerie

- **SOA** : serveur maître de zone
- **NS** : serveur autoritaire
- **A / AAAA** : résolution nom/IP
- **SRV** : service (ex : LDAP)
- **MX** : serveur de messagerie
- **SPF** : protection de l’envoi (anti-spam)
- **SNAT** : Règle de post-routage pour transformer une IP privée en IP Public 
- **DNAT** : Inverse du SNAT

📦 Important pour l’intégration d’Exchange Online / Microsoft 365

## 🔐 Création d’un Tenant Microsoft 365

1. Sélection d’un plan
2. Création du tenant `@votreentreprise.onmicrosoft.com`
3. Ajout d’un domaine personnalisé (ex : `votreentreprise.fr`) : Domaines / Ajouter un domaine
4. Enregistrements DNS (TXT, MX, CNAME…)
5. Vérification & test.

