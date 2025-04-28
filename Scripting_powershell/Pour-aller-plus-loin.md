# Pour aller plus loin

## 🔐 S’authentifier avec PowerShell

- **Problème** :
    - Pour des raisons de **sécurité**, on travaille avec des **comptes à privilèges réduits**.
    - Certaines **opérations administratives** nécessitent des **droits élevés**.
- **Solution simple** : ➔ Lancer ton script **avec ton compte normal**,  
    ➔ Puis **demander une authentification** spécifique à l’intérieur du script au moment où c’est nécessaire.

## 🛠️ Commande principale pour l'authentification

```powershell
$Cred = Get-Credential
```

- **`Get-Credential`** ouvre une **fenêtre de saisie sécurisée** demandant :
    - Nom d’utilisateur
    - Mot de passe
- Le résultat est stocké dans la variable `$Cred` et peut être utilisé ensuite dans ton script pour t’authentifier.

## 🎨 Personnaliser la fenêtre d'authentification

Tu peux **pré-remplir** le champ "Nom d'utilisateur" et **ajouter un message** :
```powershell
$Cred = Get-Credential -Message "Entrez votre login Admin du Domaine" -UserName "eni\Administrator"
```

- **`-Message`** ➔ Affiche un message personnalisé dans la pop-up.
- **`-UserName`** ➔ Préremplit le champ utilisateur.

# 📢 Utilisation classique après récupération des identifiants

Tu pourras utiliser `$Cred` pour :
- Se connecter à un serveur distant
- Exécuter des commandes administratives
- Monter des connexions réseau sécurisées...

*Exemple*
```powershell
Invoke-Command -ComputerName Serveur1 -Credential $Cred -ScriptBlock { Get-Process }
```

# 🧠 Points de vigilance :

- **Ne jamais stocker un mot de passe en clair** dans ton script !
- **`$Cred`** est un **objet sécurisé** (`System.Management.Automation.PSCredential`).
- Toujours **tester** que `$Cred` n'est pas `$null` avant de l'utiliser.
- Attention à bien protéger ton script et ton poste si tu manipules des identifiants sensibles.