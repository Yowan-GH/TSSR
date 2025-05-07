# La redondance de données - RAID

## 🛡️ **Qu’est-ce que la redondance de données ?**

> C’est la duplication de composants ou données critiques d’un système pour **augmenter la fiabilité**.

### 💡 Mise en œuvre possible :
- **Matériel** ou **logiciel**
- Sur des **disques**, des **serveurs** (clustering), ou entre **sites** (multisite)

## 💽 **RAID – Redundant Array of Independent Disks**

Le RAID permet de répartir des données sur plusieurs disques pour :
- augmenter la tolérance aux pannes,
- sécuriser les données,
- améliorer les performances (selon le niveau choisi).

🧩 Le RAID peut être :
- **Logiciel** : géré par l’OS (souple et économique)
- **Matériel** : géré par un contrôleur dédié (plus performant)

### 🔢 **Principaux niveaux de RAID**

<!-- tabs:start --> 
####  **⚙️ RAID 0 – Striping**

- **Disques minimum** : 2
- **Fonctionnement** : les blocs sont répartis sur plusieurs disques
- **Avantage** : performances **élevées** en lecture/écriture
- ❌ **Aucune tolérance aux pannes**
- 👉 Usage : temporaire, traitement vidéo, swap rapide

####  **⚙️RAID 1 – Mirroring**

- **Disques minimum** : 2
- **Fonctionnement** : les données sont **dupliquées à l’identique**
- ✅ Tolérance à la **panne d’un disque**
- ⚠️ Performances **moyennes** en écriture
- 👉 Usage : système critique, OS, serveurs applicatifs
####  **⚙️RAID 5 – Parité répartie**

- **Disques minimum** : 3
- **Fonctionnement** : données + parité réparties
- ✅ Tolérance à **1 disque en panne**
- 📉 Écriture plus lente (calcul de parité)
- 👉 Usage : serveur de fichiers, sauvegarde, équilibre perf/sécurité
####  **⚙️ RAID 10 – Striping + Mirroring**

- **Disques minimum** : 4 (2 RAID 1 montés en RAID 0)
- ✅ Tolérance à **1 disque par sous-grappe**
- ✅ Très bonnes performances **lecture/écriture**
- ❌ Coût élevé (capacité divisée par 2)
- 👉 Usage : bases de données, applications critiques


####  **📊 Tableau comparatif RAID**

|Niveau|Disques min|Tolérance de panne|Perf. lecture|Perf. écriture|Capacité utile|
|---|---|---|---|---|---|
|RAID 0|2|Aucune|Élevée|Élevée|100 %|
|RAID 1|2|1 disque|Élevée|Moyenne|50 %|
|RAID 5|3|1 disque|Élevée|Faible|~67 à 94 %|
|RAID 10|4|1 disque par paire RAID 1|Élevée|Élevée|50 %|
<!-- tabs:end --> 