# 🌐 L’adressage IPv6

## 🧩 Composition d'une adresse IPv6

- IPv6 = **Internet Protocol version 6**.
- Conçue pour **remplacer IPv4** (pénurie d'adresses IPv4).
- **Longueur** : **128 bits** (ex : 2001:0db8:85a3:0000:0000:8a2e:0370:7334)

- Simplification :
	- Les **zéros non significatifs** peuvent être supprimés :
	    - `0db8` ➔ `db8`
	- Une **séquence continue de zéros** peut être remplacée par `::` **(une seule fois)** :
	    - `0000:0000:0000` ➔ `::`

## 🛠️ Types d'adresses IPv6

<!-- tabs:start --> 
### **📬 Monodiffusion (Unicast)**

|Type d'adresse|Préfixe|Utilisation|Routable ?|
|---|---|---|---|
|**Boucle locale**|`::1/128`|Test local sur l’hôte (équivalent `127.0.0.1` en IPv4).|❌|
|**Lien-local**|`FE80::/10`|Auto-configuration locale (équivalent APIPA IPv4).|❌|
|**Locale unique**|`FD00::/8`|Réseaux internes, manuelles (équivalent IPv4 privé 192.168.x.x).|❌|
|**Globale unique**|`2000::/3`|Routable sur Internet.|✅|
### **📢 Multidiffusion (Multicast)**

|Plage|Exemples|Utilisation|
|---|---|---|
|`FF00::/8`|`FF02::1`, `FF02::2`|Tous les nœuds (FF02::1) / Tous les routeurs (FF02::2) sur le lien local.|
|`FF02::1:2`|—|Tous les serveurs DHCP sur lien local.|
|`FF01::FB`|—|Multicast DNS (mDNS).|
### **🛤️ Anycast (rappel rapide)**

- **Anycast** = même adresse affectée à plusieurs hôtes ➔ l'**hôte le plus proche** répond.
- **Utilisé pour** : équilibrage de charge, redondance (ex: serveurs DNS publics Anycast).

<!-- tabs:end --> 
### 📬 Types spéciaux d'adresses IPv6

| Adresse                   | Utilité                                                           | Exemple     |
| ------------------------- | ----------------------------------------------------------------- | ----------- |
| **Adresse de loopback**   | Se pinguer soi-même.                                              | `::1`       |
| **Adresse link-local**    | Communication sur un lien local (sans routeur).                   | `fe80::/10` |
| **Adresse globale**       | Utilisée sur Internet.                                            | `2000::/3`  |
| **Adresse unique locale** | Usage interne à une entreprise (remplace le 192.168.x.x en IPv4). | `fc00::/7`  |
## 📌 Points clés à retenir
- **FE80::/10** ➔ Lien local ➔ Toujours attribué automatiquement (pas besoin de DHCP).
- **FD00::/8** ➔ Adresses internes privées (entreprise, local).
- **2000::/3** ➔ Adresses publiques pour Internet.
- **Multicast** est **très utilisé** en IPv6 (plus que le broadcast supprimé).