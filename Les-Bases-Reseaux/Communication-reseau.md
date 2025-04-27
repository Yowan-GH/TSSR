# La communication réseau


## 🖥️ Communication dans le **même réseau logique**

- **Vérification réseau :**
    - Le PC source applique un **AND** logique entre son IP et son masque.
    - Il applique aussi un **AND** à l'adresse IP de destination.
    - Si les deux résultats sont identiques ➔ **même réseau**.
        
- **Résolution de l’adresse MAC :**
    - Le PC source cherche dans sa **table ARP** l’adresse MAC correspondant à l'IP destination.
    - ➔ Si l’adresse MAC est **déjà connue** ➔ il envoie directement la trame.
    - ➔ Sinon ➔ il envoie une **requête ARP** (broadcast).
        
- **Échange ARP :**
	- L'appareil cible répond avec son adresse MAC.
	- La table ARP est mise à jour sur le PC source.
        
- **Envoi de la trame Ethernet :**
    - Le PC source encapsule les données IP dans une trame Ethernet avec l’adresse MAC de destination.
    - ➔ Transmission directe **sans passer par un routeur**.
        
- **Réception et traitement :**
    - Le PC cible reçoit la trame, extrait les données IP, puis traite la requête.

## 🌐 Communication entre **deux réseaux différents**

- **Vérification réseau :**
    - Le PC source applique un **AND** logique avec son masque.
    - Le résultat est différent pour l'IP destination ➔ **réseaux différents**.
        
- **Passage par la gateway (passerelle) :**
    - Le PC source n’essaie pas de trouver la MAC de l’IP destination.
    - Il utilise la **gateway configurée** (passerelle par défaut).
        
- **Résolution ARP de la gateway :**
    - Le PC source vérifie dans sa table ARP l’adresse MAC de la gateway.
    - ➔ Si connue ➔ OK.
    - ➔ Sinon ➔ envoie une requête ARP pour obtenir la MAC de la gateway.
        
- **Envoi vers la gateway :**
    - Le paquet IP est encapsulé dans une trame Ethernet **à destination de la MAC de la gateway**.
        
- **Routage :**
    - La gateway lit l'adresse IP de destination.
    - Elle **routage** le paquet vers le bon réseau (directement ou via d'autres routeurs).
        
- **Transmission finale :**
    - Le paquet continue son chemin jusqu'à la machine cible.

## 🚦 Notion de **routage**

- **Routage** = acheminer un paquet IP d’un réseau à un autre.
- Les **routeurs** analysent l'**adresse IP de destination** et **choisissent la meilleure route** selon leur **table de routage**.

### 🗺️ Table de routage

- Une **table de routage** contient :
    - Des réseaux connus
    - Des passerelles (next hop) pour atteindre d’autres réseaux
    - Les interfaces de sortie
- Chaque PC ou routeur consulte sa **table de routage** pour savoir **où envoyer** un paquet IP.


## 🛤️ Gateway (Passerelle)

- **Définition** : Appareil (souvent un routeur) qui permet à un appareil de sortir de son réseau local pour atteindre d’autres réseaux.
- Si l'IP de destination n'est pas sur le même réseau ➔ envoi vers la **gateway**.
- La gateway fait ensuite le travail de routage.

## 🧠 Domaine de diffusion

Un **domaine de diffusion** est l'ensemble des équipements qui **reçoivent directement** un **message de broadcast** envoyé sur le réseau.
- Quand un appareil envoie un **broadcast** (message pour tout le monde), **tous les équipements du même domaine de diffusion** le reçoivent.
- **Un routeur coupe les domaines de diffusion** ➔ il isole les réseaux.