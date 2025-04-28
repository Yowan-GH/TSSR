# L'écriture d'un script Powershell

## 🧠 Avant d'écrire un script

- **Déterminer** l'utilité du script.
- **Décrire** le fonctionnement attendu.
- **Formaliser un algorithme** : étapes claires et ordonnées.

## 🛠️ Structurer un script proprement

- **Ecrire sur papier** :
    - Actions
    - Tests
    - Boucles
    - Vérifications
- **Commenter** toutes les étapes du script pour la clarté et la maintenance.
- **Tester ligne par ligne** et améliorer progressivement.

## 🖥️ Outils de développement PowerShell

|Outil|Avantages|
|---|---|
|**PowerShell ISE**|- Présent par défaut sur Windows  <br>- Auto-complétion (IntelliSense)  <br>- Coloration syntaxique  <br>- Débogueur simple|
|**Visual Studio Code (VS Code)**|- Multiplateforme (Windows, Linux, MacOS)  <br>- Léger, fluide  <br>- Extensions nombreuses (PowerShell, GitHub...)  <br>- Débogueur avancé|
## 📝 Les commentaires dans un script

- **Simple** : `# Ceci est un commentaire`
- **Après une commande** : ``Get-Process # Liste les processus``
- Pour un bloc complet : ``<# Script #>``

## 🔄 Enchaînement de commandes et saut de ligne

- **Point-virgule `;`** pour exécuter plusieurs commandes sur une seule ligne :
	- ``Get-Process; Get-service``
- Il est **préférable de séparer les blocs** logiques sur plusieurs lignes pour la lisibilité.

## ❗Gestion des erreurs

| Méthode                  | Description                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `$Error`                 | Variable tableau stockant les erreurs courantes.                                                                                               |
| `-ErrorVariable`         | Redirige l'erreur d'une commande spécifique dans une variable définie.                                                                         |
| `-ErrorAction`           | Contrôle l'action en cas d'erreur (`Continue`, `Stop`, `Ignore`, `Inquire`, `Suspend`).<br>- ``SilentlyContinue ``Mode silencieux sans erreurs |
| `$ErrorActionPreference` | Définit globalement le comportement du Shell en cas d'erreur.                                                                                  |

Options de ErrorAction

| Option                      | Comportement                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------ |
| **Continue** _(par défaut)_ | Affiche l'erreur mais continue l'exécution du script                                 |
| **SilentlyContinue**        | Ignore l'erreur **sans afficher** de message, mais stocke dans `$Error`              |
| **Stop**                    | Stoppe immédiatement l'exécution de la commande et passe dans un `Catch` s'il existe |
| **Ignore**                  | Ignore complètement l'erreur, **ne l'affiche PAS et NE la stocke PAS**               |
| **Inquire**                 | Met le script en **pause** et demande à l'utilisateur ce qu'il veut faire            |
| **Suspend**                 | Suspend le workflow en cours (cas spécifique aux workflows PowerShell)               |

**Exemples :**
- `Get-ChildItem C:\ -ErrorAction SilentlyContinue`
- `$Error[0]` ➔ Voir la dernière erreur.

## 🛡️ Bloc Try / Catch / Finally

- **Try** : exécute une commande.
- **Catch** : attrape une erreur si Try échoue.
- **Finally** : exécute toujours, que l'erreur ait eu lieu ou non.

```powershell
Try {
  Get-Item "C:\DossierInexistant"
} Catch {
  Write-Host "Erreur rencontrée."
} Finally {
  Write-Host "Fin du traitement."
}
```

## 🧩 Fonctions en PowerShell

- **Pourquoi utiliser des fonctions ?**
    - Réutiliser du code.
    - Rendre le script plus clair et plus maintenable.
```powershell
Function Adition {           # Declaration de la fonction
param ( $a, $b)              # Declaration des paramètres (si nécéssaires)
	$c = $a + $b             # Script
return $c
}
# Appel de la fonction
adition 1 2                  # $a=1, $b=2
```
> ✅ Mettre les fonctions **en haut de script ou dans un fichier externe**

```powershell
Function Dire-Bonjour {
    Param (                           # Declaration de paramètre
        [Parameter(Mandatory=$true)]  # Rend le parametre obligatoire
        [String]$Prenom               # Donne un type de paramètre
    )
    Write-Host "Bonjour $Prenom !"
}
# Appel :
Dire-Bonjour
# ➔ Te demandera : "Entrer une valeur pour le paramètre 'Prenom'"
```

## 🌍 Remoting PowerShell (accès distant)

- **Objectif** : exécuter des commandes sur des **machines distantes** via **WS-MAN** (port 5985).
- **Service utilisé** : **WinRM**, protocole WS-man (get-service winRM)

| Action                                      | Commande                                         |
| ------------------------------------------- | ------------------------------------------------ |
| Activer Remoting <br>(désactivé par defaut) | `Enable-PSRemoting`                              |
| Se connecter à distance                     | `Enter-PSSession -ComputerName @Nom              |
| Quitter la session                          | `Exit-PSSession`                                 |
| Créer une PSSession persistante             | `$session = New-PSSession -ComputerName Serveur` |
| Déconnecter une session                     | `Disconnect-PSSession -Session $session`         |
| Reconnecter une session                     | `Connect-PSSession -Session $session`            |
| Supprimer une session                       | `Remove-PSSession -Session $session`             |
## 🚀Invoke-Command (commandes parallèles)

- Permet d'envoyer une commande **sur plusieurs machines en même temps** :
```powershell
Invoke-Command -ComputerName PC1, PC2 -ScriptBlock { Get-Service }
```

