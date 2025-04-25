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

