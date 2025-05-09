# 🌐 L’adressage IPv4

## 🧩 Composition d'une adresse IPv4

- **Format** : 32 bits, répartis en **4 octets** (ex : `192.168.1.10`).
- **Deux parties** :
    - **ID Réseau** : Identifie le réseau logique
    - **ID Hôte** : Identifie un appareil (hôte) spécifique sur ce réseau.

## 🏷️ Classes IPv4

| Classe | Intervalle IP               | Masque par défaut   | Nombre max d'hôtes       |
| ------ | --------------------------- | ------------------- | ------------------------ |
| **A**  | 0.0.0.0 à 127.255.255.255   | 255.0.0.0 (/8)      | 2²⁴ - 2 = **16 777 214** |
| **B**  | 128.0.0.0 à 191.255.255.255 | 255.255.0.0 (/16)   | 2¹⁶ - 2 = **65 534**     |
| **C**  | 192.0.0.0 à 223.255.255.255 | 255.255.255.0 (/24) | 2⁸ - 2 = **254**         |
| **D**  | 224.0.0.0 à 239.255.255.255 | —                   | Non applicable           |
| **E**  | 240.0.0.0 à 255.255.255.255 | —                   | Non applicable           |

📌 Pourquoi **-2** dans les calculs ? ➔ On retire **1 adresse réseau** (ex : 192.168.1.0) et **1 adresse de diffusion** (ex : 192.168.1.255).  
📌 Les adresses en **127.x.x.x** sont réservées à la **boucle locale** (loopback).  
📌 Les adresses en 169.254.0.0/16 sont des adresses APIPA (Automatic Private IP Addressing)   assigné automatiquement par Windows si aucun DHCP n'est trouvé.  

## 🖊️ Notation CIDR

**CIDR** (Classless Inter-Domain Routing) : notation compacte du masque.

- Exemple : `/24` signifie 24 bits à 1 dans le masque ➔ 255.255.255.0
- Autre exemple : `/26` ➔ 255.255.255.192

**Comment convertir CIDR ➔ Masque :**  
Nombre de bits à 1 ➔ Compléter avec des 0 en binaire sur 32 bits.

## 📚 Calcul d'adresse 

<!-- tabs:start --> 
###  **🛠️ Adresse Réseau**

On fait un **ET logique** (`AND`) entre l’**adresse IP** et le **masque de sous-réseau** en binaire.  


```code
IP      :    192  .  168   .   1   .    10
Masque  :    255  .  255   .  255  .    0

IP      : 11000000.10101000.00000001.00001010
Masque  : 11111111.11111111.11111111.00000000
ET (AND): 11000000.10101000.00000001.00000000 ➔ 192.168.1.0
```

###  **📢 Adresse de Diffusion (Broadcast)**

On prend **l’adresse réseau** et on **met tous les bits hôtes à 1**.

```code
IP : 192.168.1.0
Masque : 255.255.255.0 ou /24 -> Il reste les 8 derniers bits à mettre à 1
Broadcast : 192.168.1.255
```

###  **👥 Adresses d’Hôtes**

Les adresses d’hôtes sont toutes les adresses **entre** l’adresse réseau et l’adresse de diffusion.
- 1er hôte : Adresse réseau + 1
- Dernier hôte : Adresse de diffusion - 1
```code
Adresse réseau 192.168.1.0
  -> 1er hôte 192.168.1.1
  -> Dernier hôte 192.168.1.254
Adresse de diffusion 192.168.1.255
```

###  **🧠 Nombre d'hôtes possibles**

- Formule : **2ⁿ – 2** (n = nb de bits pour les hôtes)
-
*Exemple : **255.255.255.0 = /24**
- 32 bits (adresse IP totale) - 24 bits (réseau) = **8 bits pour les hôtes**.
- Nombre d'hôtes = 28−2=2542^8 - 2 = 25428−2=254 hôtes utilisables.

###  **🧠Calcul de sous-réseau à partir d'un `/X`**

| Étape | Description                                                                                                                                                                                                                                                                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Calculer le nombre de bits pour les hôtes : 32 - valeur CIDR <br>(ex: /26 ➔ 32-26 = 6 bits pour les hôtes)                                                                                                                                                                                                                                                |
| 2     | Calculer le nombre total d'adresses : 2 puissance nombre de bits hôtes <br>(ex: 2⁶ = 64 adresses)                                                                                                                                                                                                                                                         |
| 3     | Calculer le nombre d'hôtes utilisables : nombre total d'adresses - 2 <br>ex: 2⁶ = 64 adresses - 2 = 62 adresses).                                                                                                                                                                                                                                         |
| 4     | Déterminer la taille d'un sous-réseau : 256 ÷ nombre total de sous réseaux<br>ex: 256 ÷ 64 = 4 sous réseaux                                                                                                                                                                                                                                               |
| 5     | Lister les plages d'adresses : <br>SSR 192.168.1.0/26      de 192.168.1.1     à 192.168.1.62 -   BC 192.168.1.63<br>SSR 192.168.1.64/26    de 192.168.1.65   à 192.168.1.126 - BC 192.168.1.127<br>SSR 192.168.1.128/26  de 192.168.1.129 à 192.168.1.190 - BC 192.168.1.191<br>SSR 192.168.1.192/26  de 192.168.1.193 à 192.168.1.254 - BC 192.168.1.255 |
| 6     | Identifier : adresse réseau, premier hôte, dernier hôte, adresse de broadcast                                                                                                                                                                                                                                                                             |
**Règle simple :**
👉 À chaque fois que **tu ajoutes 1 bit** (donc que tu passes de `/X` ➔ `/X+1`),  
➡️ **le nombre de sous-réseaux double**.
- De **/24** ➔ **/25** ➔ **2 sous-réseaux**
- De **/24** ➔ **/26** ➔ **4 sous-réseaux**
- De **/24** ➔ **/27** ➔ **8 sous-réseaux**
- De **/24** ➔ **/28** ➔ **16 sous-réseaux**
- De **/24** ➔ **/29** ➔ **32 sous-réseaux**
- De **/24** ➔ **/30** ➔ **64 sous-réseaux**

<!-- tabs:end --> 