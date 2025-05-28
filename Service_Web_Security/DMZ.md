
# 🧱 DMZ et sécurité 

## 🔎 Définition

> Une **DMZ (Demilitarized Zone)** est un **sous-réseau isolé** dans l’infrastructure réseau, conçu pour **héberger les services exposés à Internet**, tout en **protégeant le réseau interne (LAN)**.

## 🎯 Objectifs

- Ajouter une **barrière de sécurité** entre Internet et le réseau interne
- **Limiter l’exposition** des services publics sans ouvrir le LAN
- Permettre des accès **contrôlés et cloisonnés** aux services depuis l’extérieur


## 🧱 Représentation typique d'une DMZ

```
[Internet]
   ↓
[Routeur frontal / pare-feu extérieur]
   ↓
[DMZ] — Serveur web (accessible depuis l'extérieur)
   ↓
[Pare-feu interne]
   ↓
[LAN / Data center privé (non accessible depuis l’extérieur)]

```

### 🔄 Exemple de requête :

1. L’utilisateur tape `dmz.fr`
2. Le **DNS** renvoie l’adresse publique `x.x.x.x`
3. La requête atteint le **routeur WAN / pfSense**
4. Elle est redirigée via NAT vers le serveur web en **DMZ**
5. L’accès au **réseau interne est impossible**

## ✅ Avantages de la DMZ

|✅ Avantage|🧠 Pourquoi ?|
|---|---|
|🔐 Séparation des zones|Le réseau interne n’est **jamais directement exposé**|
|🧱 Couches de sécurité supplémentaires|**Pare-feu distincts** entre WAN, DMZ et LAN|
|🎯 Ciblage des services publics|On **isole les services exposés** (HTTP, SMTP…)|
|📉 Réduction de la surface d’attaque|Moins de risques pour les machines internes|
|🔍 Visibilité / contrôle des flux|Suivi des logs plus simple|

## ⚠️ Impacts et limites

|⚠️ Inconvénient|🧪 Détail|
|---|---|
|📈 Complexité réseau accrue|Plus de sous-réseaux, plus de règles NAT / firewall|
|🧯 Légère latence possible|Ajout d’un niveau de routage|
|🧩 Charge sur les pare-feu|Filtrage multi-niveaux|
|🛠️ Gestion technique plus exigeante|Nécessite une bonne segmentation et supervision|

## 📦 Services typiquement placés dans une DMZ

|🧩 Service|Rôle|
|---|---|
|🌐 Serveur Web|HTTP/HTTPS (ex : site vitrine ou extranet)|
|📧 Serveur Mail|SMTP (port 25), relay mail ou passerelle mail|
|📡 Serveur DNS|Résolution publique uniquement|
|📁 Serveur FTP|Transfert de fichiers depuis/vers l’extérieur|
|🔄 Broker de messages|Files d’attente, middleware (RabbitMQ, MQTT...)|
|🌍 Serveur Proxy|Contrôle d’accès au web (sortant) ou reverse proxy (entrant)|

## 🚨 Menaces et solutions en cybersécurité

### 🎯 Motivations des cyberattaques

|Objectif recherché|Exemple d’impact|
|---|---|
|💰 **Gain financier**|Rançon via ransomware, vol bancaire|
|🧨 **Perturbation / destruction**|Sabotage de services ou d’infrastructures|
|🎭 **Usurpation d’identité**|Phishing, fraude interne|
|🔓 **Vol de données sensibles**|Espionnage, revente sur le dark web|

### 🧨 Types d’attaques informatiques

Voir le cours [Cybersécurité](https://yowan-gh.github.io/TSSR/#/CyberSecurite/Les-menaces) 

### 🛡️ Systèmes de détection et de prévention

| Outil   | Fonction principale                                                   |
| ------- | --------------------------------------------------------------------- |
| **IDS** | Intrusion Detection System : détecte, alerte                          |
| **IPS** | Intrusion Prevention System : détecte **et bloque**                   |
| **EDR** | Endpoint Detection and Response : protection terminal                 |
| **XDR** | eXtended Detection and Response : protection centralisée multi-canal  |
| **MDR** | Managed Detection and Response : service géré 24/7 par un SOC externe |
#### 📌 IDS / IPS :

- ✅ Détection d’anomalies
- ✅ Alertes en temps réel
- ✅ Analyse de signature ou comportement
- ⚠️ IPS peut provoquer des faux positifs bloquants

### 🔐 ZTNA – Zero Trust Network Access

> "Ne jamais faire confiance, toujours vérifier."

|Fonction clé|Explication|
|---|---|
|🔍 Vérification continue|À chaque tentative d’accès|
|👤 Contrôle strict de l'identité|Authentification multi-facteur, appareils approuvés|
|🚪 Accès **granulaire**|Par ressource, selon le rôle ou l’état du poste|
|🔄 Intégration|Avec IAM, SIEM, EDR|
### 🧱 Bastion – Saut sécurisé obligatoire

|Caractéristique|Description|
|---|---|
|**Rôle**|Point d’accès unique et sécurisé|
|**Fonction**|Sert de **proxy** pour atteindre les systèmes critiques|
|**Avantages**|Journalisation, contrôle centralisé, réduction de la surface d’attaque|

🧠 Exemple : tous les accès SSH ou RDP passent par le **bastion**, qui loggue tout.