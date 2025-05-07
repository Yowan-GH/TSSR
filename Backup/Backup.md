# 🔁 **Restauration**

## 🎯 **Objectif de la restauration**

> "On n’a jamais de problème de sauvegarde… seulement de restauration !"

- La restauration est la **finalité réelle** d’un plan de sauvegarde.
- Une sauvegarde n’est **valable** que si sa restauration a été **testée avec succès** à intervalles réguliers.
- Tests = vérification **pratique** de la récupération de fichiers, systèmes ou bases.

## 🛠️ **Types de restauration**

<!-- tabs:start --> 
####  **📂 Restauration à la demande**

- 🔹 Utilisée pour des fichiers ou données **perdus, corrompus ou effacés**.
- 🔸 Trois options de restauration :
    - **Sur l’emplacement d’origine** :
        - Risque d’écraser des fichiers existants.
            
    - **Sur un emplacement différent** :
        - Sécurisé, permet des comparaisons avant de remplacer.
    
    - **Sur un autre système (temporaire ou test)** :
        - Idéal pour **vérifier** ou **isoler** un environnement avant retour en production.
            
    - **Restauration de versions précédentes** via un **versioning**.

#### **🖥️Restauration d’un système complet**

- Utilisation d’une méthode de type **Bare Metal Recovery (BMR)**.
    
- 🔧 Conditions nécessaires :
    1. **Architecture identique** (matériel ou VM).
    2. **Image système** à restaurer (OS, pilotes, configuration…).
    3. **Restauration du delta** : données modifiées entre la création de l’image et le moment de restauration.
- Utile lors de **panne totale** (serveur HS, disque remplacé, etc.).
    

####  **🧮 Restauration d’une base de données**

- Chaque type de BDD a ses propres procédures de restauration.
##### Exemples :
- **SQL Server** :
    - Restauration via **SQL Server Management Studio**.
        
- **MySQL** :
    - Import d’un fichier DUMP :
        `mysql --user=mon_user --password=mon_pass < fichier_source.sql`
        
- **Oracle** :
    - Méthodes :
        - **Restauration à froid** (copie directe de fichiers).
        - **Import DataPump**.
        - **RMAN** (Recovery Manager) pour restaurer à partir d’une sauvegarde complète/incrémentale.
<!-- tabs:end --> 
