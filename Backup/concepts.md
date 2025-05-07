# Concepts enjeux et définitions 

## Concepts
<!-- tabs:start --> 
### **💾 La sauvegarde**

- 🎯 Objectif principal :  
	- Assurer la **pérennité des données** et garantir la **reprise rapide** de l’activité en cas d’incident ou de sinistre.

- 📌 Enjeux majeurs :  
	- **Prévenir la perte de données** (panne, erreur humaine, suppression, ransomware)  
	- **Se prémunir des sinistres** (incendie, inondation, vol…)  
	- **Répondre à des exigences légales** (durée de rétention, RGPD…)  
	- **Maintenir l'activité** grâce à un **plan de continuité ou de reprise  **
	- **Renforcer la sécurité** face aux cyberattaques  

- Quelques bonnes pratiques :   
	- Création d'un compte dédié à la sauvegarde sur l'AD (aucune permission NTFS sur les   dossiers à save, meilleur tracabilité des logs)  
	- Utiliser le gorupe opérateur de sauvegarde pour les utilisateurs Windows   
	- Renseigner et générer un plan de sauvegarde   

### **♻️ La restauration**

- 🎯 Objectif :
	- Permettre de **rétablir un système ou des données** à un état fonctionnel, après une perte, un incident ou un sinistre.  

- 📌 Enjeux majeurs :  
	- **Sécurité** : protéger les données contre les pertes, pannes, erreurs ou attaques
	- **Continuité** : garantir une reprise rapide après incident (PRA/PCA)
	- **Conformité** : respecter les obligations légales (RGPD, archivage)
	- **Économie** : éviter les pertes financières liées à l’interruption d’activité
	- **Réversibilité** : pouvoir restaurer ou migrer les données à tout moment
	
<!-- tabs:end --> 
## 🔁 La règle des 3 - 2 - 1 

🧠 Principe :
Une bonne stratégie de sauvegarde repose sur **3 copies, 2 supports, 1 emplacement distant** :

- **3** copies des données  (1 originale + 2 copies de sauvegarde)
- **2** types de supports différents (Ex : disque dur + NAS, ou cloud + bande)
- **1** copie hors site  (dans le cloud ou sur un site distant)

✅ Objectif - Limiter les risques liés  : 
- à la défaillance d’un support,
- à un sinistre local (incendie, vol),
- ou à une erreur humaine.

## 🛡️ PCA - PRA - PS

<!-- tabs:start --> 

### **PCA**

- **Plan de Continuité d’Activité** : Il regroupe les **mesures mises en place avant, pendant et après une crise** pour garantir le **maintien minimal de l'activité**.

🔹 Il comprend :
- Le rétablissement du système d'information
- La communication interne/externe en situation de crise
- Le repli physique des utilisateurs
- La gestion de la sécurité, des risques sanitaires
- La gouvernance de la cellule de crise

🎯 Objectif : maintenir **le fonctionnement critique de l’organisation**, même en mode dégradé
- Exemple : serveurs redondants, double connexion internet, haute dispo (HA).

### **PRA**

- **Plan de Reprise d’Activité** : Ensemble des procédures pour **restaurer l’activité après un incident majeur**.

🔹 Il inclut 
- Le **plan ou la politique de sauvegarde**
- La gestion des **stockages nécessaires à la restauration**
- Les **procédures techniques de restauration** (systèmes, données, applications)
- Les **licences logicielles nécessaires**
- C’est une **composante du PCA**, axée sur la reprise IT après interruption.

🎯 Objectif : **relancer le système d’information** et réduire les temps de coupure (RTO, RPO).

### **PS**

- **Plan de sauvegarde** : Document **technique et opérationnel** décrivant **comment les sauvegardes sont mises en œuvre**.

🔹 Il détaille :  
- Le **périmètre** : ressources concernées
- Les **contraintes**
- Les **types de sauvegarde** utilisés (complète, diff, incrémentale…)
- La **fréquence**
- Les **supports et lieux de stockage**
- Les **procédures de tests de restauration**
- La **destruction sécurisée** des supports usagés    

🎯 Objectif : assurer **la disponibilité des données** selon les besoins métier, et **contribuer à la stratégie de reprise**.

<!-- tabs:end --> 

### Exemple - Coupure d'électricité 

Dans le PRA, il est utile de document le sens d'extinction et de redémarrage des serveur après une coupure de courant 
#### 🔻 En cas d’arrêt (extinction planifiée ou coupure) -  **Ordre d’arrêt recommandé :**

1. **Machines virtuelles (VMs)**  
    ➤ Pour éviter les corruptions de fichiers ou d'applications en cours d’exécution.
2. **Services hébergés (base de données, AD, messagerie, etc.)**  
    ➤ Certains doivent être arrêtés proprement (ex : Exchange, SQL Server).
3. **Serveurs applicatifs**  
    ➤ Pour éviter des blocages ou des accès invalides.
4. **Serveur vCenter / SCVMM** (console de gestion centralisée)
5. **Hôtes physiques (Hyperviseurs : ESXi, Hyper-V…)**
6. **Baies de stockage / SAN**
7. **Équipements réseau (si requis)**
---
#### 🔼 En cas de redémarrage (après coupure) -  **Ordre de redémarrage  :**

1. **Équipements réseau** (switchs, routeurs, firewalls)  
    ➤ Indispensables pour que tout le reste communique.
2. **Baies de stockage / NAS / SAN**  
    ➤ Doivent être disponibles avant que les serveurs y accèdent.
3. **Hôtes hyperviseurs (ESXi / Hyper-V)**  
    ➤ Pour accueillir les VM.
4. **Serveur de gestion (vCenter, SCVMM…)**  
    ➤ Permet de piloter les clusters, le réseau virtuel, les templates…
5. **Serveurs applicatifs et services critiques**
6. **Machines virtuelles restantes**

## Editeurs de solutions de sauvegarde

<!-- tabs:start --> 
### **🟨 Veritas Backup Exec**
- Solution de sauvegarde **historique** pour les **environnements Windows** (serveurs, fichiers, bases, machines virtuelles).
- Compatible avec **VMware**, **Hyper-V**, **SQL Server**, **Exchange**, **SharePoint**, etc.
- Supporte la **sauvegarde sur bande**, disque ou cloud (AWS, Azure, Google Cloud).
- Interface centralisée avec planification, compression, déduplication, **chiffrement** et **restauration granulaire**.
- Très utilisé dans les **PME** et collectivités.

Pour sauvegarder un serveur : 
1. Définir le stockage - ``Stockage`` / ``Configurer le stockage``


### **🟦Veeam Backup & Replication**

- Solution de **sauvegarde, restauration et réplication** orientée **environnements virtualisés** (VMware vSphere, Microsoft Hyper-V, Nutanix AHV).
- Prise en charge des **VM, serveurs physiques, bases de données, NAS**, et **workloads cloud** (Microsoft 365, AWS, Azure).
- Fonctions avancées :
    - **Instant VM Recovery** (redémarrage immédiat depuis une sauvegarde)
    - **SureBackup** (test automatisé de restauration)
    - **Réduction de données** : compression, déduplication
    - **Monitoring & reporting** avec Veeam ONE
- Restauration **granulaire** (fichiers individuels, objets AD/Exchange/SQL)

- <span style="color:rgb(255, 0, 0)">Un Réplica ne doit pas être démarré manuellement mais via la console Veeam.</span>
	- Une fois la VM endommagé remise en état, les deux VM peuvent être merges. 

Pour sauvegarder un serveur : 
1. Définir les différents supports de stockages - ``Backup Repositories`` 
2. Mise en place des ``jobs`` et ``notifications par mail``

<!-- tabs:end --> 