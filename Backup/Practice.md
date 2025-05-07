
# En pratique 

<!-- tabs:start --> 
## **Veritas Backup Exec**

### 🔹Installation de Backup Exec 

1. Lancer l’installeur `BackupExec` fourni
2. Choisir :
    - Langue : **Français**
    - Type : **Personnalisée**
    - Installation locale complète
    - **Accepter les avertissements**
    - Activer l’option **Advanced Disk-based Backup**
    - **Activer NDMP**
    - Compte de service : **Administrateur du domaine**
    - Instance SQL : **locale (SQL Express)**
---

### 🔹 Connexion d'un disque iSCSI 

1. Lancer **Initiateur iSCSI** sur le poste ou se trouve le disque
2. Onglet **Découverte** → Ajouter @IP du NAS
3. Onglet **Cible** → Connexion
4. Aller dans **Gestion des disques** → Initialiser & formater le disque iSCSI (80 Go)

---

### 🔹 Ajouter le stockage dans Backup Exec

1. Ouvrir **Backup Exec** → onglet **Stockage**
2. Cliquer sur **Configurer un stockage**
    - Type : **Stockage basé sur disque**
    - Nom : `backup`
    - Description : `backup sur nas`
    - Cible : disque iSCSI
    - Écriture simultanée : 4
---

### 🔹 Ajouter les serveurs à sauvegarder (Créer des jobs de sauvegarde)

#### 🔸 a) `SRV-AD1`

- Ajouter un **serveur Microsoft Windows**
- Accepter la mise à jour d’agent
- Créer un **job de sauvegarde** :
    - Type : **Complète puis incrémentale**
    - Méthode : **Agent**
    - Coche : “sauvegarde complète initiale”
    - Valider le job (il démarre après validation)
        

#### 🔸 b) `SRV-FIC1`
- Ajouter le serveur
- Créer un **job de sauvegarde complète**

Pour effectuer la sauvegarde complète ou incrémentale, clic droit sur le job. Executer.
Le contrôle et l'avancement des sauvegardes se trouve dans le ``Moniteur de travaux``


### 🔹Restauration granulaire
1. Dans Backup Exec, ouvrir le **job de restauration**
2. Restaurer uniquement l’utilisateur supprimé (**restauration granulaire AD**)
3. Tester une connexion avec l’utilisateur restauré


### 🔹 Préparation de la duplication vers `SRV-FIC1`

#### 🔸 a) Sur `SRV-FIC1`
1. Ajouter un **disque de 45 Go**
2. Formater en NTFS
3. Créer un dossier **`backup-fic1`**
4. Le **partager** :
    - Nom du partage : `backup-fic1`
    - **Droits de partage** :
        - Ajouter le **compte de service utilisé par Backup Exec** (Administrateur)
        - Accorder **Contrôle total**
    - **Droits NTFS** : idem, ajouter le compte et donner écriture
        

---

#### 🔸 b) Sur `SRV-BACKUP
1. Dans **Backup Exec**, aller dans **Stockage > Configurer**
2. Ajouter un **stockage sur disque distant**
    - Chemin : `\\SRV-FIC1\backup-fic1`
    - Compte : le compte de domaine avec droits
    - Valider



## **Veeam Backup & Réplication**

### 🔹Préparation – SRV-HyperV

1. ⚠️ **Ouvrir le port 445**
    - Aller dans le **pare-feu Windows** > Règles entrantes
    - Activer ou créer la règle **“Accès réseau (NP-in)”**
    - Vérifier que le port TCP **445** est **autorisé**

### 🔹Installer VEEAM Backup & Replication

1. Lancer l’installeur de **VEEAM 12**
2. Choisir **Backup & Replication**
3. Accepter les options par défaut
4. Créer une instance SQL Express si proposé
5. Attendre la fin de l’installation

### 🔹Ajouter SRV-HyperV dans VEEAM

1. Ouvrir **VEEAM B&R**
2. Aller dans le menu **“Inventory”**
3. Cliquer sur **“Add Server”**
4. Choisir : **Microsoft Hyper-V Server (Standalone)**
5. Renseigner :
    - **Nom** : `SRV-HyperV` ou ``adresse IP``
    - Type : ``Standalone``
    - **Identifiants** : `SRV-HyperV\Administrateur`
    - **Mot de passe** 
    - Laisser **Task Limit = 4**
6. Valider l’ajout

#### 🔎 Vérification : les VMs doivent apparaître dans VEEAM :
- `SRV-AD1`
- `SRV-FIC1`


### 🔹Créer un job de sauvegarde de SRV-FIC1

1. Aller dans l’onglet **Home**
2. Cliquer sur **“Backup Job” > Virtual Machine**
3. Renseigner :
    - **Nom** : `SVGD-FIC1`
    - Ajouter la machine virtuelle `Srv-Fic1`
    - **Storage** : laisser **Default Backup Repository**
    - **Task Limit** : 4
4. Valider et lancer le job immédiatement

#### 🧪 Vérifier la sauvegarde

- Vérifie qu’il n’y a **aucune erreur**
- La VM `srv-fic1` est bien sauvegardée

## 🔄 Restauration complète

1. Supprimer la VM **`srv-fic1`** depuis **Hyper-V Manager**
    - Arrêter > Supprimer la machine
    - Supprimer le disque associé (facultatif)
2. Depuis VEEAM 
    - Aller dans **Home > Backups**
    - Clic droit sur le backup de `srv-fic1` > **Restore entire VM**
    - Suivre l’assistant :
        - Choisir **restore to original location** ou **new name**
        - Démarrer automatiquement après restauration


## ✅  Vérifications post-restauration

- La VM restaurée doit :
    - Avoir la même **IP et hostname**
    - Être **joignable en ping**
    - Pouvoir **ouvrir une session avec les anciens comptes**
    - Être **de nouveau visible dans Hyper-V**

<!-- tabs:end --> 