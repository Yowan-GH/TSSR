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

