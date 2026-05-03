# Memora 🧠

Un'applicazione mobile premium progettata per supportare i pazienti affetti da Alzheimer, i loro caregiver e il personale medico, offrendo strumenti intelligenti per la gestione quotidiana, la memoria e la socialità in tempo reale.

## 🚀 Novità & Funzionalità Avanzate

### 🎙️ Messaggi Vocali Intelligenti
Abbiamo integrato un sistema di messaggistica vocale per abbattere le barriere della tastiera.
- **Registrazione One-Tap**: Registra e invia messaggi audio istantaneamente.
- **Player Integrato**: Ascolta i messaggi direttamente nella chat con un'interfaccia pulita.
- **Cloud Storage**: Audio salvati in modo sicuro su Supabase Storage.

### 📅 Cloud Agenda (Sincronizzazione Real-time)
L'agenda non è più solo locale, ma vive nel cloud.
- **Sincronizzazione Multi-dispositivo**: Un caregiver può aggiungere un impegno dal suo telefono e il paziente lo vedrà apparire istantaneamente sul proprio.
- **Aggiornamenti Live**: Spunta le attività concluse e aggiorna tutti i dispositivi collegati in tempo reale.

### 👨‍⚕️ Dashboard Medica Professionale
Un centro di controllo per i dottori per monitorare i pazienti a distanza.
- **Monitoraggio Umore**: Grafici interattivi basati sullo storico degli stati d'animo registrati dal paziente.
- **Verifica Attività**: I medici possono controllare se il paziente sta seguendo l'agenda quotidiana (medicine, attività fisica, ecc.).
- **Note Cliniche Cloud**: Sistema di note professionali condivise tra lo staff medico.

### 🟢 Community & Presenza
- **Indicatori di Stato**: Visualizza in tempo reale chi è online (punto verde) o offline (punto rosso).
- **Chat Privata Evoluta**: Messaggistica istantanea con conferma di lettura e supporto multimediale.

## 🎨 Design & Branding
L'applicazione segue l'identità visiva ufficiale di **Airalzh Onlus**.
- **Palette Colori**: Viola Vibrante (`#9C69A7`), Prugna Scuro (`#4A304F`) e Lilla Chiarissimo (`#F7F3FA`).
- **Accessibilità**: Design mobile-first stile iOS, ottimizzato per ipovedenti con testi grandi e icone chiare.

## 🛠️ Stack Tecnologico
- **Frontend**: React + Vite + Framer Motion (per animazioni fluide).
- **Database & Backend**: Supabase (PostgreSQL + Real-time + Auth + Storage).
- **PWA**: Configurazione completa per installazione su Android e iOS come App nativa.

## 📦 Installazione Locale

```bash
# Clona il repository
git clone https://github.com/CosmoNetinfo/AlzheimerApp.git

# Entra nella cartella
cd AlzheimerApp

# Installa le dipendenze
npm install

# Avvia l'app in modalità sviluppo
npm run dev
```

### 🗄️ Configurazione Database
Per configurare correttamente Supabase (Tabelle, RLS e Storage), consulta la **[Guida Supabase](GUIDA_SUPABASE.md)** e i file SQL nella cartella `sql_updates`.

---

## 👥 Per i Collaboratori
Se stai lavorando a questo progetto, è **fondamentale** seguire queste regole:
1. Leggi sempre il file **[PROGETTO_RECAP.md](PROGETTO_RECAP.md)** per conoscere lo stato attuale dei lavori.
2. Ogni volta che fai un push, aggiorna la sezione **Changelog** in fondo a `PROGETTO_RECAP.md`.

*Sviluppato con dedizione da **Daniele Spalletti** ([cosmonet.info](https://www.cosmonet.info)) per migliorare la qualità della vita quotidiana attraverso la tecnologia.*
---

## 📄 License & Credits

**AlzheimerApp** is developed and maintained by **[Cosmonet](https://www.cosmonet.info)**.

© 2026 Cosmonet (https://www.cosmonet.info) — All rights reserved.

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license.

- ✅ You can use and share this project with proper attribution to Cosmonet.
- ❌ Commercial use is **not permitted** without explicit written permission.

For commercial licensing or collaboration inquiries:
👉 [https://www.cosmonet.info](https://www.cosmonet.info)

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
