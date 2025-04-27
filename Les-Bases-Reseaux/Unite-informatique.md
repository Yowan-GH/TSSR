# Les unités informatique

## 🔢 Les bases numériques 

|Système|Base|Valeurs utilisées|Exemples|Préfixes|
|---|---|---|---|---|
|**Binaire**|2|0, 1|`1010` (2) = 10 en décimal|kibi (Ki), mebi (Mi), gibi (Gi)|
|**Octal**|8|0,1,2,3,4,5,6,7|`12` (8) = 10 en décimal|Rare en usage moderne|
|**Décimal**|10|0 à 9|`10` (10) = 10 en décimal|kilo (k), méga (M), giga (G)|
|**Hexadécimal**|16|0-9 + A-F|`A` (16) = 10 en décimal, `1F` (16) = 31 décimal|Utilisé en mémoire, réseaux (ex: adresses MAC)|

## 🔁 2. Conversion rapide entre bases

|Conversion|Comment faire|Exemple|
|---|---|---|
|**Binaire ➔ Décimal**|Additionner les puissances de 2 pour chaque bit à 1 (de droite à gauche).|`1010` (binaire) = (1×2³) + (0×2²) + (1×2¹) + (0×2⁰) = 8 + 0 + 2 + 0 = **10** en décimal|
|**Décimal ➔ Binaire**|Diviser successivement par 2 et noter les restes (de bas en haut).|10 ÷ 2 = 5 reste 0 ; 5 ÷ 2 = 2 reste 1 ; 2 ÷ 2 = 1 reste 0 ; 1 ÷ 2 = 0 reste 1 → en lisant à l'envers : **1010**|
|**Binaire ➔ Hexadécimal**|Regrouper les bits **4 par 4** (en partant de la droite) et convertir chaque groupe.|`10101100` ➔ `1010` (A) et `1100` (C) ➔ **AC** en hexadécimal|
|**Hexadécimal ➔ Binaire**|Convertir chaque chiffre hexa en 4 bits binaires.|`AC` ➔ A = `1010`, C = `1100` ➔ Résultat : **10101100**|
|**Octal ➔ Binaire**|Chaque chiffre octal se transforme en **3 bits** binaires.|`7` (octal) = `111` (binaire), `5` (octal) = `101` (binaire) → donc `75` (octal) = `111101` (binaire)|
|**Binaire ➔ Octal**|Regrouper les bits **3 par 3** (de droite à gauche) et convertir.|`111101` (binaire) ➔ `111` (7) et `101` (5) ➔ donc **75** (octal)|

## 📏 3. Unités de mesure en informatique

|Unité|Abréviation|Valeur (en bits/octets)|Utilisation|
|---|---|---|---|
|**Bit**|b|1 bit|La plus petite unité (0 ou 1).|
|**Octet**|o ou B|8 bits|1 octet = 8 bits (ex : un caractère ASCII).|
|**Kilooctet**|ko (ou KB)|1 024 octets (2¹⁰)|Taille de petits fichiers texte.|
|**Mégaoctet**|Mo (ou MB)|1 024 ko = 1 048 576 octets|Images, musiques.|
|**Gigaoctet**|Go (ou GB)|1 024 Mo|Clés USB, disques durs.|
|**Téraoctet**|To (ou TB)|1 024 Go|Gros stockages (NAS, serveurs).|
## 🧠 À bien comprendre !

- **1 Ko ≠ 1 000 octets** dans l'informatique stricte (c’est **1 024** octets, car basé sur 2¹⁰), mais pour le marketing (disques durs, SSD) **1 Ko est vendu pour 1 000 octets**.
    
- **1 Byte (B) = 8 bits (b)** ➔ Attention aux majuscules : `B` pour Byte, `b` pour bit !