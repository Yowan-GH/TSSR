
# Présentation

## Historique

### 🛠️ **Origines et création (2002-2006)**

- **Début du projet (2002)** : Le projet commence sous le nom de code **Monad**, porté par **Jeffrey Snover**, un architecte de Microsoft. Il part du constat que l’invite de commande Windows (cmd.exe) est trop limitée pour la gestion moderne des systèmes.
    
- **Philosophie** : Contrairement aux shells traditionnels basés sur du texte (comme Bash), PowerShell manipule des **objets .NET**, ce qui le rend beaucoup plus puissant pour l’automatisation.
    
- **Lancement officiel (2006)** : PowerShell 1.0 est publié avec Windows XP SP2, Windows Server 2003 et Windows Vista.

### 📈 **Évolution majeure**

- **PowerShell 2.0 (2009)** : Intégré à Windows 7 et Windows Server 2008 R2. Ajoute les **scripts à distance**, les **modules**, le **débogage**, et une meilleure prise en charge d’IntelliSense via l’ISE.
    
- **PowerShell 3.0 (2012)** : Apporte des améliorations pour l’automatisation à grande échelle avec Windows 8/Server 2012, comme les **workflows** et une meilleure intégration WMI.
    
- **PowerShell 4.0 (2013)** : Introduit **Desired State Configuration (DSC)** pour la gestion de configuration.
    
- **PowerShell 5.0/5.1 (2016)** : Ajoute **classes personnalisées**, **OneGet**, **PackageManagement**, et le **support de l’Open Source**. Version installée par défaut sur Windows 10, Windows serveur 2019.

### 🌍 **Passage à l’open source : PowerShell Core**

- **PowerShell Core 6 (2018)** : Première version **cross-platform** (Windows, Linux, macOS), basée sur **.NET Core**. Rebaptisé **PowerShell Core** pour le distinguer de Windows PowerShell.
    
- **PowerShell 7 (2020)** : Successeur de PowerShell Core, revient à l’appellation **PowerShell** tout court. Fusionne les atouts de PowerShell Core avec la compatibilité étendue de Windows PowerShell 5.1.
    
- **PowerShell 7.x (2020–aujourd’hui)** : En constante évolution avec un rythme de mises à jour régulier. Intègre des fonctionnalités modernes, supporte mieux les modules Windows existants et renforce la communauté open source.


## PowerShell vs powerShell Core

**PowerShell** est la version classique, uniquement disponible sur Windows, basée sur le .NET Framework. Elle est souvent utilisée dans les environnements d’entreprise pour l'administration système, mais elle n’est plus activement développée (dernière version : 5.1).

**PowerShell Core** (et PowerShell 7+) est la version moderne, **open source** et **multiplateforme** (Windows, Linux, macOS), basée sur .NET Core/.NET 5+. Elle est plus performante, évolutive, et adaptée aux environnements hétérogènes.

| Système         | PowerShell Core 7 | PowerShell Core 6.1 |
|-----------------|-------------------|----------------------|
| MacOS           | 10.13             | 10.12+               |
| Red Hat         | 8                 | 7                    |
| CentOS          | 8                 | 7                    |
| Oracle Linux    | 7                 | -                    |
| Fedora          | 32                | 27,28                |
| Debian          | 9,10              | 8.7+, 9              |
| Ubuntu          | 20.04             | 18.10                |
| Open SUSE       | 42.2+             | 42.2+                |

## La protection pour les scripts 

Par defaut, MicrosoftPW, interdit l'exécution de script sur tous les système Microsoft tant que le niveau de sécurité n'aura pas été modifié. 

A partir du moment ou un script : 
- N'a pas été signé numériquement par microsoft
- Ne dispose pas d'un certificat de sécurité
Il ne sera pas executé.

Afin de pouvoir executer les scripts, on peut abaisser le niveau de sécurité via la commande : 
``set-executionpolicy -executionpolicy Unrestricted `` en **mode administrateur**

## Les modules 

Chaque Cmdlet provient d'un **module** powershell. Ils permettent d'ajouter des commandes en fonction d'une famille ou d'un besoin du système d'exploitation. 

Pour voir la liste de module ``(format .PSM1)`` : ``get-module``

Il est possible d'ajouter manuellement des modules à la console PowerShell. Pour cela, il faut récupérer le fichier .PSM1 et le déposer dans un emplacement lisible par la console PS.

ils sont visibles via la variable : ``$env:PSModulePath``
Ces emplacements sont : 
- Pour tous les users : C:\Program Files\WindowsPowerShell\Modules
- Pour l'utilisateur courant : C:\Users\<TonNom>\Documents\WindowsPowerShell\Modules
- Pour le Système : C:\Windows\System32\WindowsPowerShell\v1.0\Modules
Après la copie du module, on le charge via la commande ``import-module -name "Dossier"``
On peut vérifier l'import via : ``get-command -module "Modulename"``

## La personnalisation de la console

Il est possible de modifier les propriétés de la console powershell : 
- Via le clic droit sur la fenetre / propriété 
- En créant un profil personnalisé via la commande ``New-item -path $profil -tyle file - force`` - Ce fichier se nommera Microsoft.PowerShell_profil et sera situé dans document/WindowsPowerShell ==> Permet l'execution de commande à l'ouverture du shell. 

![[TSSR/Scripting_powershell/images/image.png]]


# Les premières commandes

## Les Cmdlets

Les Cmdlets sont des commandes constituées de deux parties : Verbe - Nom
**<span style="color:rgb(255, 0, 0)">Le nom sera toujours au singulier</span>**

*Exemple*
```powershell
Get-Childitem
Get-Process
```

Les commandes PS disposent de paramètres nécessaires au bon fonctionnement des commandes. Il est systématiquement indiqué avec un tiret. Une commande peut disposer de plusieurs paramètres. 
```powershell
Get-Localuser -name "User" #User = argument
Get-LocalGroupMember -Group "groupe" -Member "user"
```

Lors de l'utilisation ''une Cmdlet, l'affichage contiendra des colonnes. Chaque colonne possèdera une entête, appelable via un argument.

*Exemple*
```powershell
Get-Service
```
Donnera 

|           | Status  | Name          | DisplayName                       |
| --------- | ------- | ------------- | --------------------------------- |
| Service 1 | Stopped | AarSvc_85a2ee | Agent Activation Runtime_85a2ee   |
| Service 2 | Stopped | AJRouter      | AllJoyn Router Service            |
| Service 3 | Stopped | ALG           | Application Layer Gateway Service |

```powershell
Get-Service -Displayname "Agent*"
```
Donnera

|                | Status   | Name            | DisplayName                             |
|----------------|----------|-----------------|------------------------------------------|
| Service 1      | Stopped  | AarSvc_85a2ee   | Agent Activation Runtime_85a2ee         |
## Les propriétés et valeurs 
### Les propriétés 

- Les **propriétés** d’un objet PowerShell sont **définies par le type d’objet**.
- La **valeur des propriétés** peut être de **différents types**.

|**Contenus acceptés**|**Type de valeurs**|
|---|---|
|De « a » à « Z » plus la ponctuation|STRING « Chaîne de caractères Unicode »|
|De -2 147 483 648 et 2 147 483 647 inclus.|INT « Integer »|
|« $FALSE », « $TRUE », « $NULL »|BOOL « Boolean »|
|Un tableau contient des valeurs facilement identifiables par un jeu de coordonnées.|Array « Tableau »|
|Une propriété peut contenir un objet complet.|Object « Objet »|

Un **objet PowerShell** est une structure composée de :
- Plusieurs **propriétés**
- Chaque propriété ayant une **valeur**

En PowerShell, tu peux **modifier la valeur d’une propriété** d’un objet avec une commande dont le **verbe commence par `Set`**.

*Exemple*
Modifier le nom affiché d’un service
```powershell
Set-Service -Name wsearch -DisplayName "Service de recherche Windows"
```

### Les méthodes 

Les méthodes effectuent des actions sur la totalité de l'objet ou sur la valeur d'une ou plusieurs propriétés de l'objet. 

*Exemple*
```powershell
get-date > Mercredi 23 Avril 2025
```
La liste des méthode est disponible dans ``get-date |gm`` , membertype method. 
Il est possible d'utiliser une méthode, par exemple : AddDays(x)

```powershell
(get-date).AddDays(1) # Affiche la date et ajoute un jour
> Jeudi 24 Avril 2025
```








## Les commandes clés

Pour avoir la liste des verbes disponibles : ``get-verb``

| Cmdlet        | Rôle                                                                              | Exemple d’usage              | Quand l’utiliser                                                       |
| ------------- | --------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------- |
| `Get-Command` | Trouver une **commande disponible**                                               | `Get-Command Get-*`          | Quand tu cherches une cmdlet ou veux savoir **si une commande existe** |
| `Get-Help`    | Obtenir **la documentation** d’une commande                                       | `Get-Help Get-Process -Full` | Quand tu veux **comprendre comment utiliser une commande**             |
| `Get-Member`  | Explorer les **propriétés et méthodes d’un objet**<br>uniquement sur commande GET | `Get-Process                 | Quand tu veux avoir** les propriétés et méthodes d’un objet**`         |
### Get-Command

`Get-Command` permet d’afficher toutes les **commandes disponibles** dans la session PowerShell. Cela inclut :
- les cmdlets (commandes natives PowerShell),
- les fonctions,
- les alias,
- les scripts,
- les exécutables (.exe, .bat, etc.).

C’est super utile pour **trouver** une commande dont on ne connaît pas le nom exact, ou pour **savoir ce qui est dispo** dans ton environnement.

 **Syntaxe**
```powershell
Get-Command [-Name] <string>] [-CommandType <type>] [-Module <string>]
```

| Paramètre             | Description                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-Name <string>`      | (optionnel car positionnel) Permet de spécifier le **nom exact ou partiel** d'une commande. Tu peux utiliser des **wildcards** (`*`, `?`) pour faire une recherche partielle. |
| `-CommandType <type>` | Filtre selon le **type** de commande. Par exemple : `Cmdlet`, `Function`, `Alias`, `Application`, `Script`, etc.                                                              |
| `-Module <string>`    | Affiche uniquement les commandes qui viennent d’un **mo**                                                                                                                     |
La commande ``get-command`` exécutée seule, nous renverra une liste de toute les commandes disponibles (sous forme de colonne et d'entête) avec : 
- CommandType -> ``[-CommandType <type>]``
- Name -> ``[-Name] <string>]``
- Version
- Source -> `[-Module <string>]`

*Exemple*
```powershell
Get-Command -Name *service* -CommandType Cmdlet -Module Microsoft.PowerShell.Management
```
- 🔎 Recherche les commandes contenant "service"
- 🎯 Filtre pour ne garder que les **cmdlets**
- 📦 Et seulement celles du **module** `Microsoft.PowerShell.Management`

### Get-Help

`Get-Help` affiche l'aide intégrée d'une commande PowerShell. C’est **l’équivalent du `man` en Linux**, et c’est l’un des outils les plus utiles pour apprendre en direct depuis la console.

Tu peux l’utiliser pour :
- Comprendre ce que fait une commande,
- Voir sa syntaxe exacte,
- Découvrir ses paramètres,
- Obtenir des exemples concrets.

Syntaxe : 
```powershell
Get-Help [-Name] <string> [-Examples] [-Full] [-Detailed] [-Online] [-Parameter <string>]
```

|Paramètre|Description|
|---|---|
|`-Name <string>`|Le nom de la commande pour laquelle tu veux l’aide.|
|`-Examples`|Affiche **seulement des exemples d’utilisation**.|
|`-Full`|Affiche **toute l’aide disponible**, y compris les remarques détaillées et techniques.|
|`-Detailed`|Affiche une aide plus détaillée que par défaut, mais moins complète que `-Full`.|
|`-Online`|Ouvre l’aide **en ligne dans ton navigateur** (si disponible).|
|`-Parameter <name>`|Affiche l’aide spécifique à un **paramètre** d’une commande.|
*Exemple*
```powershell
Update-Help # Mettre à jour la commande get-help
Get-Help Get-Process -Full # Voir l’aide complète d’une commande
Get-Help Get-Item -Examples # Voir les exemples d'une commande
Get-Help Get-Command # Affiche l'aide de la commande get-command
Get-Help Get-Item -showwindow # Affiche l'aide dans une fenetre separée 




```

### Get-member

`Get-Member` permet d’explorer les **propriétés** et **méthodes** d’un objet en PowerShell. C’est une commande de **découverte** qui t’indique **ce que tu peux faire avec un objet**.

Elle peut être raccourcie en ``gm``

C’est très utile quand tu manipules un objet retourné par une autre commande, et que tu veux savoir quelles informations tu peux extraire (propriétés) ou quelles actions tu peux effectuer dessus (méthodes).

Syntaxe : 
```powershell
Get-Member [-InputObject <Object>] [-Name <String[]>] [-MemberType <MemberTypes[]>] [-Force]
```

Composantes courantes :
- `-InputObject` : l'objet à examiner (rarement utilisé directement, car on passe l'objet via le pipeline).
- `-MemberType` : permet de filtrer les membres affichés (ex : Properties, Methods, Events, etc.).
- `-Name` : affiche uniquement les membres dont le nom correspond.
- `-Force` : inclut les membres cachés.

*Exemple*
```powershell
# Affiche toutes les propriétés et méthodes des objets retournés par `Get-Process`. Tu pourras voir des propriétés comme `Name`, `Id`, `CPU`, etc.
Get-Process | Get-Member
```

## Commandes divers

La variable ``$psversiontable`` nous indique la version de notre powershell

### Update-Help

`Update-Help` permet de **télécharger et installer la dernière version de l’aide** pour les cmdlets PowerShell, depuis Microsoft.  
C’est très utile car, par défaut, l’aide installée est **souvent incomplète** ou absente.


# Manipulation des objets

Le **pipe** en PowerShell (représenté par le symbole `|`) permet de rediriger la sortie d'une commande vers une autre commande, en transmettant les objets produits par la première commande en entrée de la seconde. Cela permet de chaîner plusieurs commandes ensemble de manière fluide.

## Le pipe `` | ``
**Le pipe** permet de passer un ou plusieurs objets à la commande qui suit.
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
``Add-Content -path \\CD01\Partage\Exports\CSV\user.csv -Value Get-ADComputer -Filter *``
# Structures et variables

## Les variables $

Les variables nous permettent de stocker des objets ou informations dans la mémoire vive pour permettre de de les réutiliser plus tard.

Pour assigner une valeur à une variable, on utilise le =

$A=1 donnera une variable Int (vu que 1 est une valeur int) de valeur 1
$A="Hello World" donnera une variable String de valeur Hello World
$User=Get-Aduser -filter * donnera une variable de type objet avec pour valeur la commande entrée. 

Pour voir les variables déclarées : ``get-variable``
Bonnes pratiques pour le nommage des variables : $PlusieursMots -> Majuscule à chaque mot

#### Read-host et Write-host

Il est également possible de récupérer dans une variable une information entrée par l'utilisateur : 
``$a=Read-host "Veuillez saisir votre commande"``

On pourra également restitué cette saisie via la commande ``Write-Host "Vous avez saisit $a"``
(uniquement pour les variables String et Int)
#### Les variables objets

Lorsqu'une variable est de type objet : ``$user=get-Aduser -filter *``, Il est possible d'effectuer un certain nombre de manipulation sur celle-ci : 

- **Accéder à une propriété**  
    `$user.Name`  
    `# Affiche le nom de l'utilisateur`
    
- **Modifier une propriété (si possible)**  
    `$computer.Description = "PC bureautique"`  
    `# Modifie localement la description (nécessite ensuite un Set-AD*)`
    
- **Afficher toutes les propriétés**  
    `$user | Format-List *`  
    `# Affiche toutes les propriétés de l'objet`
    
- **Passer l'objet dans une commande**  
    `$user | Disable-ADAccount`  
    `# Désactive l'utilisateur`
    
- **Filtrer une liste d’objets avec Where-Object**  
    `$users | Where-Object { $_.Enabled -eq $true }`  
    `# Filtre les utilisateurs activés`
    
- **Trier une liste d’objets**  
    `$users | Sort-Object Department`  
    `# Trie par département`
    
- **Grouper par propriété**  
    `$users | Group-Object Department`  
    `# Regroupe les utilisateurs par département`
    
- **Créer une propriété calculée**  
    `$user | Select-Object Name, @{Name='NomMaj'; Expression={ $_.Name.ToUpper() }}`  
    `# Affiche le nom en majuscules`
    
- **Exporter vers un CSV**  
    `$users | Export-Csv "export.csv" -NoTypeInformation`  
    `# Sauvegarde la liste d’utilisateurs en CSV`
    
- **Convertir en JSON**  
    `$user | ConvertTo-Json`  
    `# Affiche l'objet au format JSON`
    
- **Afficher en tableau**  
    `$user | Format-Table Name, Department`  
    `# Affiche en tableau avec deux colonnes`
    
- **Afficher une méthode disponible**  
    `$user | Get-Member`  
    `# Affiche les propriétés et méthodes disponibles`