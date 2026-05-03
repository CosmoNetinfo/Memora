# 📘 Documentazione Funzionale: Memora 🧠

Benvenuti nella documentazione dettagliata di **Memora**, l'ecosistema digitale progettato per supportare l'assistenza e la socialità nel mondo dell'Alzheimer.

---

## 👥 1. Ruoli e Permessi
L'applicazione è strutturata su quattro tipologie di utenti, ognuna con un'interfaccia e funzionalità specifiche:

### **A. Il Paziente**
L'interfaccia è semplificata, con icone grandi e testi leggibili.
- **Agenda di Oggi**: Visualizza le attività quotidiane (farmaci, pasti, esercizi).
- **Mood Tracker**: Registra il proprio stato d'animo con un click.
- **SOS**: Accesso immediato ai numeri di emergenza e assistenza tecnica.
- **Messaggi Vocali**: Può comunicare con i familiari senza dover scrivere.

### **B. Il Familiare (Caregiver)**
- **Monitoraggio Remoto**: Può gestire l'agenda del paziente dal proprio telefono.
- **Cloud Sync**: Aggiunge impegni che appaiono istantaneamente sul telefono del paziente.
- **Social Feed**: Partecipa alla community condividendo foto e pensieri.

### **C. Il Medico (Operatore Sanitario)**
- **Clinical Dashboard**: Monitora l'andamento degli umori dei pazienti tramite grafici.
- **Verifica Agenda**: Controlla se il paziente sta seguendo correttamente il piano terapeutico.
- **Note Cliniche**: Registra osservazioni mediche sincronizzate sul cloud.

### **D. L'Amministratore**
- **Gestione Utenti**: Può promuovere utenti a medici o moderatori.
- **Moderazione**: Supervisiona il feed social e gestisce eventuali ban.

---

## 🛠️ 2. Moduli Principali

### 📅 Agenda Cloud (Real-time)
A differenza di una normale todolist, l'agenda di Memora è **bidirezionale**.
- Se un familiare aggiunge "Prendere pillola rossa alle 16:00", il paziente riceve l'aggiornamento live.
- Quando il paziente spunta l'attività, il familiare vede il completamento in tempo reale.

### 🎙️ Sistema di Messaggistica "Vocal-First"
- **Chat Privata**: Supporta testo e messaggi vocali.
- **Conferma di Lettura**: I messaggi cambiano stato quando vengono letti.
- **Storage Sicuro**: Tutti i vocali sono salvati su Supabase Storage con crittografia.

### 📈 Monitoraggio Umore & Clinico
- **Auto-Healing**: Se un profilo manca nel DB, l'app lo ricrea automaticamente al primo login.
- **Algoritmo Alert**: Se un paziente registra "Triste" per più di 2 giorni consecutivi, la dashboard medica segnala un'allerta visiva al dottore.

### 📸 MemoraBook (Feed Social)
- Un vero e proprio social network interno e protetto.
- Caricamento immagini con compressione lato client per non consumare dati.
- Possibilità di mettere "Mi Piace" (in arrivo) e commentare.

---

## 🔐 3. Sicurezza e Presenza
- **Stato Online**: Indicatori visivi (verde/rosso) basati sull'ultima attività rilevata.
- **Row Level Security (RLS)**: Ogni utente può leggere solo i messaggi a lui destinati.
- **SOS Integrato**: Pulsante rapido per chiamate di emergenza pre-configurate.

---

## 📱 4. Tecnologia PWA
L'app è una **Progressive Web App**:
- Può essere installata su Android e iOS senza passare dagli store.
- Funziona a tutto schermo, come un'app nativa.
- Supporta le notifiche push (tramite integrazione OneSignal).

---

## 🚀 5. Visione Futura
- **Geofencing**: Avvisi se il paziente esce da una zona sicura.
- **AI Memory**: Suggerimenti basati sui ricordi caricati nel feed.

---
*Documentazione aggiornata al: 3 Maggio 2026*
*Sviluppato da Cosmonet*
