# Structures et variables
## Les variables $

Les variables nous permettent de stocker des objets ou informations dans la mémoire vive pour permettre de de les réutiliser plus tard.

Pour assigner une valeur à une variable, on utilise le =

$A=1 donnera une variable Int (vu que 1 est une valeur int) de valeur 1
$A="Hello World" donnera une variable String de valeur Hello World
$User=Get-Aduser -filter * donnera une variable de type objet avec pour valeur la commande entrée. 

Pour voir les variables déclarées : ``get-variable``
Bonnes pratiques pour le nommage des variables : $PlusieursMots -> Majuscule à chaque mot

### Read-host et Write-host

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