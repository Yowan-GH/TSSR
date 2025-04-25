# Manipulation des objets

## Le pipe `` | ``

Le **pipe** en PowerShell (représenté par le symbole `|`) permet de rediriger la sortie d'une commande vers une autre commande, en transmettant les objets produits par la première commande en entrée de la seconde. Cela permet de chaîner plusieurs commandes ensemble de manière fluide.

`PS > Get-Service | Get-Member`

**Le pipe** peut être utilisé à plusieurs reprises, tant que l'on dispose d'objets à traiter.
`PS > Get-EventLog -LogName « System » | Select-Object Name | Format-Table`
> Recupère les log système | ne recupère que le nom | le met dans un tableau

**Le pipe** utilise une variable réservée qui est `$PSItem`. Cela permet de cibler une propriété d'un objet.
``PS > Get-Process | Select Name, Id | Where { $PSItem.Id -gt 1500 -and $PSItem.Id -lt 2000 }``
Ici, la variable $PSItem contiendra "Name, ID" (Résultat du premier pipe). Le $PSItem.Id prendra uniquement le ID

*Exemple*
```powershell
get-service |select-object Name,Status |where { $psitem.status -eq "Running" }
```
> Execute la commande get-service
> 	Ne garde que les propriétés Name et Status
> 		Affiche uniquement les status = "running"

## ``Select-Object`` ou ``select``

**`Select-Object`** est une commande PowerShell qui permet de sélectionner des propriétés spécifiques d'un objet ou d'un ensemble d'objets, ou encore de manipuler des objets dans une collection en choisissant certaines informations. Il est souvent utilisé pour extraire certaines propriétés d'objets complexes

Syntaxe
```powershell
Select-Object [-Property] <String[]> [-First <Int32>] [-Last <Int32>] [-Skip <Int32>] [-Unique] [<CommonParameters>]
```
- **`-Property`** : Spécifie les propriétés à sélectionner parmi l'objet.
- **`-First`** : Sélectionne les premiers X objets.
- **`-Last`** : Sélectionne les derniers X objets.
- **`-Skip`** : Ignore les premiers X objets.
- **`-Unique`** : Retient seulement les objets uniques.
- ``*`` Permet d'afficher l'ensemble des paramètres si utilisé seul

## ``Sort-Object`` ou ``sort``

**`Sort-Object`** est une commande PowerShell utilisée pour trier des objets en fonction de l'une ou plusieurs de leurs propriétés. Cela permet de réorganiser les éléments d'une collection selon un ordre croissant ou décroissant, selon les besoins.

Syntaxe : 
```powershell
Sort-Object [-Property] <String[]> [-Descending] [<CommonParameters>]
```

- **`-Property`** : Spécifie la ou les propriétés selon lesquelles trier les objets. (ex : property Lenght pour trier par poids)
- **`-Descending`** : Trie les objets en ordre décroissant (par défaut, c'est l'ordre croissant).

*Exemple*
```powershell
# Affiche le nom et status des services par nom, ordre croissant
get-service |select Name,status |sort -property name
# Affiche le nom et status des services par nom, ordre decroissant
get-service |select Name,status |sort -property name -descending
```

## ``Measure-Object ``ou ``measure``

La commande **`Measure-Object`** en PowerShell est utilisée pour obtenir des informations statistiques sur un ensemble d'objets. Elle peut compter, sommer, obtenir la moyenne, et plus encore, selon les propriétés des objets que vous lui passez en entrée.

Syntaxe : 
```powershell
Measure-Object [-Property] <String> [-Minimum] [-Maximum] [-Average] [-Sum] [-Count] [<CommonParameters>]
```

- **`-Property`** : Spécifie la propriété des objets sur laquelle vous souhaitez effectuer des mesures (comme **Length**, **CPU**, etc.).
- **`-Minimum`** : Retourne la valeur minimale de la propriété spécifiée.
- **`-Maximum`** : Retourne la valeur maximale de la propriété spécifiée.
- **`-Average`** : Calcule la moyenne des valeurs de la propriété spécifiée.
- **`-Sum`** : Calcule la somme des valeurs de la propriété spécifiée.
- **`-Count`** : Compte le nombre d'objets (par defaut si rien n'est spécifié)

*Exemple*
```powershell
Get-childItem -file | measure -property Length -Average
# Permet d'avoir la taille moyenne des fichiers du dossier file
```


## ``Where-object`` ou ``where``

La cmdlet **`Where-Object`** va nous permettre de tester les conditions de chaque objets afin de réaliser un filtrage plus fin. Elle est appliquée sur les propriétés de l'objet.


Syntaxe : 
```powershell
Where-Object [-FilterScript] <ScriptBlock> [-Property <String>] [-Value <Object>] [<CommonParameters>]
```

- **`FilterScript`** : Permet de spécifier un script qui détermine si un objet doit être inclus dans la sortie. C'est la façon la plus courante d'utiliser **`Where-Object`**.
- **`-Property`** et **`-Value`** : Ces paramètres sont utilisés pour une syntaxe plus simple pour les comparaisons entre une propriété d'un objet et une valeur donnée.
- - **Filtrage d'objets** : Vous utilisez **`Where-Object`** pour filtrer les objets en fonction de conditions basées sur les propriétés de ces objets.
- **Expression logique** : Vous pouvez spécifier une condition avec des expressions logiques comme `-eq` (égal), `-gt` (plus grand que), `-lt` (plus petit que), `-ne` (différent de), etc
### Opérateur de comparaisons

|Comparaison|Insensibilité à la casse|Sensibilité à la casse|
|---|---|---|
|Égalité|`-eq`|`-ceq`|
|Inégalité|`-ne`|`-cne`|
|Supérieur à|`-gt`|`-cgt`|
|Supérieur ou égal à|`-ge`|`-cge`|
|Inférieur à|`-lt`|`-clt`|
|Inférieur ou égal à|`-le`|`-cle`|
|Comparaison d’égalité d’expression|`-like`|`-clike`|
|Comparaison d’inégalité d’expression|`-notlike`|`-cnotlike`|
**Si on applique plusieurs conditions à la commande** `Where-Object`, **on va utiliser les expressions logiques** `ET` : ``-and`` **et** `OU` : ``-or``

- Dans le cas d’un **ET** logique, les deux conditions doivent être valides pour que l’objet soit retenu.
- On peut réduire la syntaxe de `$PSItem` par `$_`.

*Exemple*
```powershell
Get-process |Select Name,ID |Where -filterscript{$_.ID-gt1500-and$_.ID-lt2000}
# Affiche le nom et ID des processus ou ID est entre 1500 et 2000.
```

Lors de l'utilisation d'une double condition -or - and, on utilisera des parenthèse : 
``where -filtrerscript { (test1-ortest2)-andtest3}``

## ``Format-Table`` ou ``ft``

`Format-Table` permet de **présenter les données en format tabulaire** (en colonnes) dans la console PowerShell. Elle est souvent utilisée pour afficher proprement les propriétés d’un ou plusieurs objets (résultats de commandes comme `Get-Process`, `Get-Service`, etc.).

Syntaxe : 
```powershell
Format-Table [[-Property] <Object[]>] [-AutoSize] [-Wrap] [-GroupBy <Object>] [-HideTableHeaders] [<CommonParameters>]
```

| Paramètre                          | Description                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `-Property`                        | Liste des propriétés à afficher sous forme de colonnes. Peut inclure des expressions calculées. |
| `-AutoSize`                        | Ajuste automatiquement la largeur des colonnes pour une meilleure lisibilité.                   |
| `-Wrap`                            | Permet de couper le texte sur plusieurs lignes si nécessaire.                                   |
| `-GroupBy`                         | Regroupe les objets selon une propriété donnée.                                                 |
| `-HideTableHeaders`                | Masque les en-têtes de colonnes.                                                                |
| `@{Label="Nom"; Expression={...}}` | Syntaxe d'une colonne personnalisée : permet de renommer et transformer les données affichées.  |
*exemple*
```powershell
Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 5 |
Format-Table Name, Id, @{Label="Mémoire (Mo)"; Expression = { [math]::Round($_.WorkingSet / 1MB, 2) }} -AutoSize
```
> Donnera : 

|Name|Id|Mémoire (Mo)|
|---|---|---|
|chrome|1234|300.45|
|code|5678|280.30|
|...|...|...|

## ``Format-wide`` ou ``fw``

`Format-Wide` est utilisée pour **afficher une seule propriété par objet** sur plusieurs colonnes **horizontalement**. Elle est pratique pour des listes simples comme les noms de fichiers, noms de processus, etc.

Syntaxe : 
```powershell
Format-Wide [[-Property] <String>] [-Column <Int>] [-AutoSize] [-Force] [<CommonParameters>]
```

|Paramètre|Description|
|---|---|
|`-Property`|Spécifie la propriété à afficher (par défaut, c’est `ToString()` de l’objet).|
|`-Column`|Définit le nombre de colonnes dans l'affichage.|
|`-AutoSize`|Ajuste automatiquement le nombre de colonnes à la largeur de la console.|
|`-Force`|Force l'affichage même si PowerShell considère qu’il ne convient pas.|
*exemple*
```powershell
Get-Process | Format-Wide -Property Name -Column 4
```
chrome     explorer    powershell  svchost
notepad    code        Teams       dllhost

## ``Format-list`` ou ``fl``

`Format-List` permet d’afficher les **propriétés d’un ou plusieurs objets verticalement**, avec **chaque propriété sur une ligne**.  
C’est idéal pour **voir tous les détails** d’un objet, surtout quand il y a beaucoup d’informations.

Syntaxe :
```powershell
Format-List [[-Property] <Object[]>] [-GroupBy <Object>] [-Force] [<CommonParameters>]
```

|Paramètre|Description|
|---|---|
|`-Property`|Spécifie les propriétés à afficher (ou `*` pour toutes).|
|`-GroupBy`|Regroupe l'affichage selon une propriété.|
|`-Force`|Affiche aussi les propriétés "cachées" ou non publiques.|
## Exporter / Importer / Convertir des objets

Il existe plusieurs commandes d'exports / d'imports et de conversion nous permettant de récupérer et manipuler le résultat de nos commandes.

### Export-Csv

**Export-Csv** : Exporte des objets PowerShell vers un fichier lisible par Excel au format CSV.

**Syntaxe de base :**
```powershell
Export-Csv -Path <chemin> [-NoTypeInformation] [-Encoding <type>] [-Delimiter <caractère>]
```

**Principaux paramètres / arguments :**
- `-Path` : chemin du fichier CSV à créer.
- `-NoTypeInformation` : empêche l’ajout de la ligne de type d’objet en première ligne.
- `-Encoding` : spécifie l’encodage (UTF8, ASCII, etc.).
- `-Delimiter` : permet de changer le séparateur (`,` par défaut, `;` en Europe souvent).
*Exemple :* ``Get-Process | Export-Csv -Path "processus.csv" -NoTypeInformation -Encoding UTF8 -Delimiter ";"``

### Export-Clixml

**Export-Clixml** : Sauvegarde des objets complets au format XML, réimportables dans PowerShell.

Syntaxe de base : 
```powershell
Export-Clixml -Path <chemin> [-Depth <n>]
```
**Principaux paramètres / arguments :**
- `-Path` : chemin du fichier XML à générer.
- `-Depth` : niveau de profondeur à inclure pour les objets complexes/imbriqués.
*Exemple : * ``Get-Service | Export-Clixml -Path "services.xml"``


### ConvertTo-Json + Out-File 

**ConvertTo-Json + Out-File** : Convertit un objet en JSON et l’enregistre dans un fichier.

**Syntaxe de base :**

```powershell
<objet> | ConvertTo-Json [-Depth <n>] [-Compress] | Out-File -FilePath <chemin> [-Encoding <type>]
```

**Principaux paramètres / arguments :**
- `-Depth` : profondeur d’objets à convertir (valeur par défaut : 2).
- `-Compress` : génère du JSON  minifié sans indentation.
- `Out-File` : redirige la sortie JSON  dans un fichier texte.
*Exemple :* ``Get-ChildItem | ConvertTo-Json -Depth 3 | Out-File "fichiers.json" -Encoding UTF8

### ConvertTo-Html + Out-File

 **ConvertTo-Html + Out-File** : Génère un rapport HTML à partir d’objets PowerShell avec un rendu de type tableau.

**Syntaxe de base :**
```powershell
<objet> | ConvertTo-Html [-Property <propriétés>] [-Head <html>] [-Title <titre>] | Out-File <chemin>
```
**Principaux paramètres / arguments :**
- `-Property` : permet de choisir les colonnes à afficher.
- `-Head` : insère du HTML personnalisé dans le `<head>` (ex. CSS).
- `-Title` : définit le titre de la page.
- `Out-File` : enregistre le code HTML généré dans un fichier.
*Exemple :* ``Get-Process | ConvertTo-Html -Property Name, Id, CPU -Title "Liste des Processus" | Out-File "processus.html"
### Out-File

**Out-File** : Écrit la sortie textuelle d'une commande dans un fichier.

**Syntaxe de base :**
```powershell
Out-File -FilePath <chemin> [-Encoding <type>] [-Append] [-Width <largeur>]
```
**Principaux paramètres / arguments :**
- `-FilePath` : chemin du fichier de sortie.
- `-Encoding` : type d'encodage (UTF8, ASCII...).
- `-Append` : ajoute au fichier existant au lieu de l’écraser.
- `-Width` : ajuste la largeur de texte dans le fichier avant un saut de ligne. (width 80 = 80 mot + saut de ligne)
*Exemple :* ``Get-Date | Out-File -FilePath "date.txt" -Encoding UTF8

### Set-Content

**Set-Content** : Écrit ou remplace le contenu d’un fichier avec une chaîne ou une variable.

**Syntaxe de base :**
```powershell
Set-Content -Path <chemin> -Value <texte> [-Encoding <type>] [-Force]
```
**Principaux paramètres / arguments :**
- `-Path` : chemin du fichier à écrire.
- `-Value` : contenu à écrire (texte ou données).
- `-Encoding` : spécifie l'encodage du fichier.
- `-Force` : crée le fichier s’il n'existe pas.
*Exemple:* ``Set-Content -Path "note.txt" -Value "Bonjour le monde"

### Add-Content

**Add-Content** : Ajoute du texte à la fin d’un fichier existant sans le remplacer.

**Syntaxe de base :**
```powershell
Add-Content -Path <chemin> -Value <texte>
```
**Principaux paramètres / arguments :**
- `-Path` : fichier auquel ajouter le contenu.
- `-Value` : texte à ajouter à la fin du fichier.
*Exemple :* ``Add-Content -Path "note.txt" -Value "Ligne ajoutée."

### Get-content

Lit le contenu d’un fichier ligne par ligne — utile pour afficher ou surveiller un fichier texte.

Syntaxe de base :
```powershell
Get-Content -Path <chemin> [-Encoding <type>] [-TotalCount <n>] [-Tail <n>] [-Wait]
```

**Principaux paramètres / arguments :**
- `-Path` : chemin du fichier à lire.
- `-Encoding` : spécifie l’encodage du fichier (UTF8, ASCII...).
- `-TotalCount` : lit seulement les _n_ premières lignes.
- `-Tail` : lit les _n_ dernières lignes du fichier.
- `-Wait` : continue de lire les nouvelles lignes ajoutées au fichier (utile pour surveiller un log en temps réel).
- *Exemple :* ``Get-Content -Path "log.txt" -Tail 10 -Wait

### Import-CSV

Lit un fichier CSV  et CLIXML et transforme chaque ligne en **objet PowerShell avec des propriétés**.

Syntaxe de base :
```powershell
Import-Csv -Path <chemin> [-Delimiter <caractère>] [-Encoding <type>]
```
**Principaux paramètres / arguments :**
- `-Path` : chemin du fichier CSV à importer.
- `-Delimiter` : définit le séparateur (`,` par défaut, `;` souvent en Europe).
- `-Encoding` : type d'encodage (UTF8, ASCII…).
- *Exemple :* ``Import-Csv -Path "employes.csv" -Delimiter ";" | New -AdUser


### Exemple d'utilisation

Importer une base de donnée d'utilisateur AD.

```powershell
# On supprimer les anciens users - Hors Admin, guest et krbtgt qui sont protégés
Get-aduser -filter * | remove-aduser *

# Import des nouveaux users via CSV puis création - Hors Admin, guest et krbtgt qui sont déjà présent
Import-CSV -delimiter ";" -path C:/import/user.csv | New-aduser 
```


## Les propriétés calculées 

Permettent d’afficher ou d’exporter des **valeurs personnalisées** en calculant ou formatant les données directement dans la commande.

Syntaxe : 

```powershell
@{n = 'NomDeLaColonne' ; e = { <scriptblock> } }# e=Expression, n=Name ou Label
```

*Exemple pour modifier le nom d'une propriété*
```powershell
Import-CSV -Delimiter ";" -path C:/user.csv |Select Givenname,@{n='Name' ; e=$_.nom} } | New-Aduser -Name $_.Name -Givenname $_.Givenname

# Ici, dans le fichier d'import, le nom des users est donné par la propriété "Nom" et pour la création sur Powershell, nous avons besoin de "Name"
# Explication de la commande : 

# Import CSV  avec ; comme délimiteur
# Récupération des information Givenname et conversion de nom en Name
# Creation des users
```

*Exemple pour modifier le format de sortie d'une valeur*
```powershell
Get-childitem -File | Select Name,@{n='Taille' ; e={'{0:N2}' -f ($_.Length / 1MB) } }
# Get-childitem -file : Liste tous les fichiers dans le repertoire courant
# Selection du Name et calcule d'une propriété taille
# '{0:N2}' veut dire que l'on formate le résultat avec 2 décimale
# -f : On formate, ($_.Lenght / 1MB) : Les valeurs de la propriété Lenght en Megaoctet (MegaByte).
```

### Quelques Scriptblock courants

Conversion de taille 
```powershell
@{Name='Taille (Go)'; Expression={ "{0:N2}" -f ($_.Length / 1GB) }}
@{Name='Taille (Mo)'; Expression={ "{0:N2}" -f ($_.Length / 1MB) }}
@{Name='Taille (Ko)'; Expression={ "{0:N1}" -f ($_.Length / 1KB) }}
```

Formatage de date
```powershell
@{Name='Date-heure'; Expression={ $_.LastWriteTime.ToString("yyyy-MM-dd HH:mm") }}
@{Name='Année'; Expression={ $_.CreationTime.Year }}
```

Calcul ou arrondi
```powershell
@{Name='Durée arrondie'; Expression={ [math]::Round($_.Duration.TotalMinutes, 1) }}
```

Conditions (if/else)
```powershell
@{Name='État'; Expression={ if ($_.Status -eq 'Running') { '🟢' } else { '🔴' } }}
@{Name='Taille'; Expression={ if ($_.Length -gt 1MB) { 'Gros' } else { 'Petit' } }}
```

Concaténation de chaine
```powershell
@{Name='Nom complet'; Expression={ "$($_.prenom) $($_.nom)" }}
@{Name='Fichier'; Expression={ "$($_.DirectoryName)\$($_.Name)"
```

Condition Booléen
```powershell
@{Name='Admin'; Expression={ if ($_.IsAdmin) { 'Admin' } else { 'User' } }}
```

Valeur par défaut si null
```powershell
@{Name='Téléphone'; Expression={ if ($_.Phone) { $_.Phone } else { "Non renseigné" } }}
```

## Exemple de manipulation d'objet (TP)

1.  Affichez la liste des utilisateurs ActiveDirectory avec la propriété GivenName, Name,
Enabled Department City : 

`` Get-ADUser -filter * -Properties * |Select GivenName,Name,Enabled,Department,City 

2.  Affichez les cinq premiers utilisateurs Active Directory 
`` Get-ADUser -filter * -Properties * |Select GivenName,Name,Enabled,Department,City -First 5

3.  Sélectionnez les utilisateurs Active Directory par leurs propriétés City puis par leur propriété Department 

``Get-ADUser -filter * -Properties * |Select GivenName,Name,Enabled,Department,City |sort -Property City 

4. Affichez les utilisateurs Active Directory avec les propriétés Name, Enabled, Department, City puis triez par la propriété City et department. Ne selectionner que les Name contenant un "r"

``Get-ADUser -Filter * -Properties * | Select Name, Enabled, Department, City | Sort -Property Department,City |where -FilterScript {$_.name -like "*r*"}``

5. Désactiver les utilisateurs dont le nom commence par un D.
``Désactiver les utilisateurs dont le nom commence par un D.

6. Affichez la liste des utilisateurs Active Directory dont le compte est actif.
``Get-ADUser -Filter * -Properties * |Where -FilterScript {$_.enabled -eq "Enabled"} |Select Name

7. Conditionnez le résultat pour ceux qui ont un nom qui débute par un A ou un F. et dont le compte est actifQuelle commande avez-vous utilisée ?
``
``Get-ADUser -Filter * -Properties * |Where -FilterScript {($_.enabled -eq "Enabled")-and(($_.name -like "a*")-or($_.name -like "f*"))} |Select Name``

8. En reprenant la commande précédente, comptez le nombre d’utilisateurs actifs et le
nombre d’utilisateurs inactifs.

``Get-ADUser -Filter * | Where-Object Enabled -like $True | measure 
``Get-ADUser -Filter * | Where-Object Enabled -like $False | measure ``

9. Affichez tous les fichiers du répertoire \\CD01\Partage.
``Get-ChildItem \\CD01\Partage\ -File -Recurse ``

10. Reprenez la commande précédente puis affichez la taille moyenne des fichiers 
``Get-ChildItem \\CD01\Partage\ -File -Recurse |measure -average Length``

11.  Reprenez les commandes précédentes et indiquez les fichiers dont la taille est supérieure à 10 Mo et inférieure à 100 Mo

``Get-ChildItem \\CD01\Partage\ -File -Recurse |where -FilterScript {$_.Length -lt 100000 -and $_.Length -gt 10000}``

12. Affichez le résultat avec les propriétés Name, Length et mode et effectuez un tri descendant sur le nom.

``Get-ChildItem \\CD01\Partage\ -File -Recurse -Filter * |where -FilterScript {$_.Length -lt 100000 -and $_.Length -gt 10000} |Select Name,Length,mode |sort -Property Name``

13. Affichez la liste des utilisateurs Active Directory sur cinq colonnes.
``Get-ADUser -Filter * | Format-Wide -Column 5``

14. Affichez la liste des utilisateurs Active Directory qui sont actifs, en format tableau, avec les propriétés : Name, Enabled, Department, City 

``Get-ADUser -Filter * -Properties * |Select Name, Enabled, Department, City |Format-Table``

15.  Affichez la liste des groupes Active Directory sous forme de tableau avec leurs noms,
leurs descriptions ainsi que la date de création. Puis regroupez-les par type de groupe. 

``Get-ADGroup -Filter * -Properties * |select Name,Created,grouptype,description |sort -Property grouptype |format-list -GroupBy Grouptype``

 16. Affichez la liste des ordinateurs du domaine sous forme de liste avec les propriétés : Nom, NomdDns, Distinguishedname, AdresseipV4 puis regroupez-les par système d’exploitation.

``Get-ADComputer -Filter * -Properties * | select Name,DNShostname,distinguishedname,ipv4address | sort -Property OperatingSystem |fl -GroupBy OperatingSystem``

17. Affichez tous les événements du journal system avec les propriétés : Time, Index, 
Message. 

``Get-EventLog system | select time,index,message ``

18. Faites en sorte que le contenu du message soit affiché en totalité sur la console. Quelle 
commande avez-vous utilisée ? 

``Get-EventLog system | fl -property timewritten,index,message ``

19. Exportez les utilisateurs Active Directory dans un fichier CSV \\CD01\Partage\Exports\Csv. 
``Get-ADUser -filter * |Export-Csv -Path \\CD01\Partage\Exports\CSV\user.csv``

20. Répétez la commande précédente mais dans le format HTML puis dans le dossier \\CD01\Partage\Exports\CSV\. 

``Get-ADUser -filter * -Properties * | ConvertTo-Html -Property * |Out-File \\CD01\Partage\Exports\CSV\html.html``

21. Ajoutez à la suite du fichier CSV les Ordinateurs Active Directory 
``Add-Content -path \\CD01\Partage\Exports\CSV\user.csv -Value Get-ADComputer -Filter *