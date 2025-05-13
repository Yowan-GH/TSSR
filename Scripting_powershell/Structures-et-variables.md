# Structures et variables
## Les variables $

Les variables nous permettent de stocker des objets ou informations dans la mémoire vive pour permettre de de les réutiliser plus tard.

- **Déclaration** : Commencent par `$`
- **Assignation** : Utilisent `=`
- **Types automatiques** : `Int`, `String`, `Array`, `Object`, etc.
- Les variables disparaissent à **la fermeture de la console**.

```powershell
$name = "Hello World"       # Variable de type string
Write-host $name                 # Affichage de la variable
```

Pour voir les variables déclarées : ``get-variable``

 > ✅Bonnes pratiques : pour le nommage des variables : $PlusieursMots -> Majuscule à chaque mot
## 🔥 Les types de variables

|Type|Exemple de contenu|Détection automatique ?|Précision|
|---|---|---|---|
|**String** (texte)|`"Bonjour"`|Oui|Entre guillemets `" "` ou `' '`.|
|**Int** (entier)|`42`|Oui|Nombres sans décimale.|
|**Double** (réel)|`3.14`|Oui|Nombres à virgule.|
|**Boolean**|`$true`, `$false`|Oui|Valeur vrai/faux.|
|**Array** (tableau)|`@(1,2,3)`|Oui|Liste de valeurs.|
|**Hashtable** (dictionnaire)|`@{clé="valeur"}`|Oui|Clé/valeur associées.|
|**Object** (objet)|Ex: `[System.DateTime]::Now`|Oui|Objets complexes (dates, fichiers...).|
> ✅ Bonne pratique : toujours entourer les appels de variables avec `"` pour éviter des effets inattendus (sauf variable Int).
> Il est possible de faire un get-member sur les variables pour voir les propriétés et méthodes associés.
### 🔎 Quelques variables automatiques utiles

| Variable          | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| `$PSVersionTable` | Contient la version de PowerShell.                                                  |
| `$args`           | Liste des arguments passés au script.                                               |
| `$_`              | Représente **l'objet courant** dans un pipeline (`ForEach-Object`, `Where-Object`). |
| `$null`           | Représente **l'absence de valeur** (équivalent `NULL` ailleurs).                    |

### Commandes liées aux variables
- `Get-Variable` ➔ Voir toutes les variables existantes.
- `$var.GetType()` ➔ Connaitre le type d'une variable.
- `$var | Get-Member` ➔ Lister propriétés et méthodes de l'objet contenu.

### Spécificités
- **Concaténation de texte** : Utiliser `+` pour assembler deux chaînes.
- **Addition/Soustraction sur des Int** : Utiliser `+`, `-`.
- **Accès aux éléments d'un tableau** : **`[index]`, en commençant par 0 (donc 3 correspond au 4ème index)**
- **Accès à une propriété d'un objet** : `$objet.Propriété`.

Lire une entrée utilisateur
```powershell
$a = Read-Host "Entrez votre nom"
Write-Host "Bonjour $a"
```





### `[math]` en PowerShell

- Il permet d’utiliser **des fonctions mathématiques** directement sans devoir tout reprogrammer.

```powershell
[Math]::Méthode(paramètres)
```

| Fonction `[math]::` | Description                       | Exemple                           |
| ------------------- | --------------------------------- | --------------------------------- |
| `Abs(x)`            | Valeur absolue                    | `[math]::Abs(-5)` ➔ `5`           |
| `Round(x)`          | Arrondi à l'entier le plus proche | `[math]::Round(3.6)` ➔ `4`        |
| `Floor(x)`          | Arrondi à l'entier inférieur      | `[math]::Floor(3.9)` ➔ `3`        |
| `Ceiling(x)`        | Arrondi à l'entier supérieur      | `[math]::Ceiling(3.1)` ➔ `4`      |
| `Sqrt(x)`           | Racine carrée                     | `[math]::Sqrt(9)` ➔ `3`           |
| `Pow(x,y)`          | Puissance (x exposant y)          | `[math]::Pow(2,3)` ➔ `8`          |
| `Max(x,y)`          | Maximum de deux valeurs           | `[math]::Max(2,7)` ➔ `7`          |
| `Min(x,y)`          | Minimum de deux valeurs           | `[math]::Min(2,7)` ➔ `2`          |
| `Sin(x)`            | Sinus (en radians)                | `[math]::Sin([math]::PI/2)` ➔ `1` |
| `Cos(x)`            | Cosinus (en radians)              | `[math]::Cos(0)` ➔ `1`            |
| `Tan(x)`            | Tangente (en radians)             | `[math]::Tan(0)` ➔ `0`            |
| `PI`                | Constante Pi (π)                  | `[math]::PI` ➔ `3.141592...`      |
| `E`                 | Constante e (2,718...)            | `[math]::E` ➔ `2.718281...`       |
## 🛠️ Tableaux (Array) et Tableaux dynamiques (ArrayList)

### Array (fixe) 

- Creation : ``$array = "PC1","PC2","PC3"
- Accès : ``$array[1] # PC2
- Remplacement :`` $array.replace("PC1","PC11")``
- **Limitation** : Taille fixe ➔ Pas d'ajout ou de suppression facile.

### ArrayList (dynamique)

- Création + Typage : ``$machines = New-Object System.Collections.ArrayList
- Ajout : ``$machines.Add("PC4")
- Suppression : ``$machines.Remove("PC2")
- **Avantage** : Ajout/Suppression sans recréer tout le tableau.

📌 : Il est possible de créer, typer et d'indiquer les valeurs en une seul commande avec :
``[System.Collections.ArrayList]$variable= "Hello","world"``
📌 Pour avoir toute les méthodes lièés à une variable : ``$variable | get-member``

## 🔄Les structures

### IF / ELSE / ELSEIF

- **If** : Exécute si la condition est vraie.
- **Else** : Exécute si la condition est fausse.
- **ElseIf** : Tester plusieurs conditions successives.

```powershell
If ($x -eq 10) {
Write-host "x vaut 10"
}                              
ElseIf ($x -gt 10) {
 Write-host "x est supérieur à 10"
}
Else {
 Write-host "x est inférieur à 10"
}
```

### WHILE

- Boucle **tant que** la condition est **vraie**.
- Nécessite d'**initialiser la variable avant**.

```powershell
$x = ""
While ($x -ne "q") {
  $x = Read-Host "Entrez un choix (q pour quitter)"
}
# Si le user entre q, alors le script s'arrête
```

Ici, nous sommes obligé de déclarer une première fois la valeur de $x pour initier la boucle

### DO WHILE et DO UNTIL

- **Do While** ➔ teste après la première exécution.
- **Do Until** ➔ s'exécute jusqu'à ce que la condition soit vraie.

```powershell
Do {                            # Faire
  $x = Read-Host "Votre choix" 
} While ($x -ne "q")            # Tant que
####
Do {                            # Faire
  $x = Read-Host "Votre choix"
} Until ($x -eq "q")            # Jusqu'à ce que
```

### FOREACH

- Parcourt chaque élément d'un tableau Array ou ArrayList.
- Utilise `$i` comme variable temporaire.

```Powershell
$liste = "PC1", "PC2", "PC3"
Foreach ($i in $liste) {
 Write-host "Machine : $i"
}

$Liste = get-Aduser -filter *
Foreach ($i in $liste) {
Write-host "Nom : $i.name"
Write-host "Prénom : $i.surname"
}

```
- **Méthodes spéciales** :
    - `{continue}` ➔ passe à l'élément suivant sans exécuter le reste.
    - `{break}` ➔ quitte la boucle immédiatement.

```Powershell
$liste = "PC1", "PC2", "PC3"
Foreach ($i in $liste) {
  If ($i -eq "PC2")
	  {break}                # Fera sortir de la boucle arrivé à PC2
	  {continue}             # Sautera la boucle PC2 et continura le script
	  Write-host "Machine : $i"
}
```

### SWITCH

- Permet de tester une valeur contre plusieurs cas possibles.

```powershell
Switch ($Adgroup) {
  "User" { Write-host "Utilisateur" }
  "Admin" { Write-host "Administrateur" }
  "Default" { Write-host "Non reconnu" } #Si les deux premiers tests ont échoués
}
```
**Méthodes dans Switch** :
- `continue` ➔ passe au test suivant.
- `break` ➔ quitte le Switch.

### 🧱 Imbrication des Structures

- On peut imbriquer plusieurs **If**, **Switch**, **While** dans un autre bloc.
- Chaque bloc doit être clairement **délimité par `{}`**.
- **Exemple** de boucle imbriquée avec Switch :

```powershell
Do {
  If ($x -gt 10) {
    Switch ($x) {
      '11' { Write-host "Valeur 11" }
      '12' { Write-host "Valeur 12" }
    }
  } Else {
    $x = Read-Host "Saisir une valeur > 10"
  }
} While ($x -lt 100)
```

### Quelques exemples de scripts

Créer un script qui dans un premier temps demande la saisie de la date de naissance d’un utilisateur, puis dans un second temps demande à l’utilisateur de trouver cette date de naissance en indiquant si la valeur saisie est supérieure ou inférieure.  Si la date saisie est correcte, la boucle s’arrête et l’utilisateur est félicité. Indiquez le nombre d’essais effectués par l’utilisateur.

```powershell
Do {

$DOB = Read-Host "Entrez votre date de naissance au format (jj/mm/aaaa)"

if ($DOB -notmatch "\d{2}/\d{2}/\d{4}$") { # Vérifie le format de la date
write-host "Format de la date invalide, Entrez votre date de naissance au format (jj/mm/aaaa)" }
} While ($DOB -notmatch "^\d{2}/\d{2}/\d{4}$")

Write-Host "Maintenant un petit jeu, Devinez la dâte qui a été rentrée (format jj/mm/aaaa)"

Do {
    $i = $i + 1
    $Entry = Read-Host "Entrez votre date de naissance au format (jj/mm/aaaa)"
    if ($Entry -notmatch "\d{2}/\d{2}/\d{4}$") { # Vérifie le format de la date
        write-host "Format de la date invalide, Entrez votre date de naissance au format (jj/mm/aaaa)" }

    if ($Entry -gt $DOB) {
        Write-Host "C'est moins" }

    if ($Entry -lt $DOB) {
        Write-Host "C'est plus" }

    } while ($Entry -ne $DOB)

Write-Host "Felicitation, vous avez reussi en $i essais"
```

Créer un script qui générera deux variables de tableaux $UserActif et $SUserInactif ; dans chacune sera stockée la liste des utilisateurs actifs et inactifs de votre serveur Active Directory. Avec If et ForEach

```powershell
$users = Get-ADUser -Filter *
$UserActif = New-Object System.Collections.ArrayList
$UserInactif = New-Object System.Collections.ArrayList

Foreach ($i in $users) {
    if ($i.Enabled -eq $true) {
        $UserActif.Add($i)
    }
    else {
        $UserInactif.Add($i)
    }
}
Write-Host "Voici le nombre d'utilisateurs actifs est de : $(($UserActif | Measure-Object).Count)"

Write-Host "Voici le nombre d'utilisateurs inactifs est de : $(($UserInactif | Measure-Object).Count)"
```

Réalisez un menu à choix multiples, voici l'affichage attendu :

Bienvenue dans l'outil d'inventaire, faites votre choix parmi les menus suivants :
1) Affichage des ordinateurs du domaine.
2) Affichage des groupes de domaines  locaux
3) Importation des utilisateurs « AD » à partir d’un fichier « CSV »
4) Quitter
Entrez votre choix :

```powershell
Do {
    Write-Host "Bienvenue dans l'outil d'inventaire,"
    Write-Host "Faites votre choix parmi les menus suivants :"
    Write-Host "1) Affichage des ordinateurs du domaine"
    Write-Host "2) Affichage des groupes de domaines locaux"
    Write-Host "3) Importation des utilisateurs AD à partir d'un fichier CSV"
    Write-Host "4) Quitter"

    $choix = Read-Host "Veuillez faire un choix"

    if ($choix -notin 1, 2, 3, 4) {
        Write-Host "Votre choix est incorrect"
    }

    Switch ($choix) {
        "1" {
            $computer = Get-ADComputer -Filter *
            Write-Host "Voici les ordinateurs du domaine :" $computer.Name -ForegroundColor Green
        }
        "2" {
            $group = Get-ADGroup -Filter * | Where-Object {$_.GroupScope -eq "DomainLocal"}
            Write-Host "Voici les groupes de domaine locaux :" $group.Name -ForegroundColor Yellow
        }
        "3" {
            $path = Read-Host "Veuillez indiquer le chemin du fichier CSV"
            Import-Csv -Path $path -Delimiter ";" | New-ADUser
        }
        "4" {
            Write-Host "Sortie du programme"
        }
    }
} While ($choix -ne 4)
```
