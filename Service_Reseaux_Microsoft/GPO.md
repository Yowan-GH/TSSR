# Les stratégies de groupes – GPO
## Définition

Une **GPO** (Objet de Stratégie de Groupe) est un ensemble de règles et de paramètres qui sont appliquées sur un **groupe d'ordinateurs** ou d'**utilisateurs** dans un environnement **Windows**. Les GPOs sont utilisées pour **gérer et configurer** les paramètres de sécurité, les permissions et d'autres aspects du système au niveau du réseau ou du domaine.

Plusieurs types de stratégie :
- Local (hors domaine, poste par poste)
- Groupe
- Domaine : En cas de conflits, elle l’emporte sur la stratégie locale

## Application d’une stratégie GPO

Elle se gère via les consoles **MMC**. Lors de la mise en place d’une GPO :

- **Par défaut toutes les 90 min** à plus ou moins 30 min près
- **Pour les contrôleurs de domaine**, toutes les **5 min**
- Possibilité de **passage en mode manuel**
  - Via la commande : `gpupdate` sur le poste visé par les stratégies

---

### Les stratégies par défaut :

#### 🔷 Default Domain Policy (DDP)
- Liée à la **racine du domaine**
- Définit les paramètres de sécurité pour les **utilisateurs du domaine**

#### 🔴 Default Domain Controller Policy
- Liée à l’**UO Domain Controllers**
- Définit les paramètres de sécurité pour les **contrôleurs de domaine**


### Le ciblage des stratégies

🧩 Application d’une stratégie de groupe (GPO)

#### 🧱 Objet de stratégie créé

> Le ciblage permet de définir le ou les objets soumis à cette règle.

---

#### 🔗 La liaison d’une stratégie se fait via les objets suivants :

- 🌐 Un site **Active Directory**
- 🏢 Un **domaine**
- 🗂️ Une **Unité d’Organisation** (OU)

---

#### 📥 Une fois liée, la stratégie s’applique sur :

- 🖥️ Les objets **ordinateurs** → pour les paramètres **ordinateur**
- 👤 Les objets **utilisateurs** → pour les paramètres **utilisateur**

---
⚠️ Attention

> 🛑 **Les GPO ne s’appliquent pas aux membres de groupes.**  
> Une stratégie ne peut être appliquée **qu’aux objets présents dans le conteneur auquel elle est liée** (ex. : utilisateurs ou ordinateurs d’une OU).  
> 👉 Les **groupes** ne peuvent pas recevoir de GPO directement.


### Console « Gestion de stratégie de groupe »

![Image](Environnement_MS_4.png)

🔁 Priorités et héritage des GPO

 Héritage
> 🧬 Les stratégies sont **héritées du parent vers l’enfant**.  
> ⏳ Les stratégies héritées sont **appliquées avant** celles du **conteneur courant**.
---
🔢 Priorité d’application
> 🔝 Les stratégies dont le **numéro d’ordre est le plus élevé** sont appliquées en **premier** *(au sein d’un même conteneur)*.  
> ✅ Les stratégies **marquées "Appliquées"** deviennent **prioritaires**, même si elles sont héritées.

Pour résumer :
- Les stratégies de groupe fonctionnent sur des UO (tous les objets hors groupe)
- Les stratégies sont héritables P->E, et sont appliquées avant celles du conteneur courant.
- Les stratégies appliquées sont prioritaires sur les héritées.
- L’ordre des stratégies est important dans un même conteneur
- Il y a possibilité de bloquer l’héritage.

Pour forcer la mise en place de la stratégie (et bypasser les 90 minutes classiques), utiliser la commande cmd ``gpupdate /force``

### Le Principe de redirection
Les dossiers du **profil utilisateur** sont stockés sur un **emplacement réseau**.

#### 📁 Dossiers concernés :
- Documents
- Bureau
- Menu démarrer
- Contacts

➡️ Ces dossiers sont redirigés vers un **serveur de fichiers**

#### 📌 Paramètres du dossier partagé :
- **Partage** : contrôle total pour les utilisateurs redirigés
- **Permissions NTFS** : liste du dossier + création et obtention de dossiers dans ce dossier seulement

---

### Paramètres & Options de redirection

| **Paramètres** | **Options** |
|----------------|-------------|
| **De base** : <br>Les dossiers redirigés de l’ensemble des utilisateurs seront stockés dans un **même emplacement réseau** | - Redirection vers le répertoire d’accueil de l’utilisateur <br> ➤ *Les nouveaux utilisateurs ne bénéficieront pas de redirection de dossiers* <br> - Créer un dossier pour chaque utilisateur sous le chemin d’accès racine <br> ➤ *Chaque utilisateur dispose de son propre sous-dossier* |
| **Avancé** : <br>En fonction de leur **appartenance à des groupes**, les dossiers des utilisateurs seront stockés dans des **emplacements réseau différents** | - Rediriger vers l’emplacement suivant <br> ➤ *Les dossiers redirigés des utilisateurs se trouveront dans ce même sous-dossier* <br> - Redirection vers l’emplacement du profil local <br> ➤ *Arrêt de la redirection* |
