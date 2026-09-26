# Discord RPC for Armbian

Rich Presence sederhana yang bisa berjalan di **Armbian / Linux headless**, terhubung ke Discord Desktop melalui IPC socket.

![Demo](https://media1.tenor.com/m/ailAX1eBg9cAAAAC/denia-wuwa-wuwa.gif)

## ✨ Fitur

- Status **Listening** / Playing / Watching / Competing (bisa diganti)
- **2 tombol** yang bisa diklik
- Konfigurasi lewat `config.json` — tidak perlu edit kode
- Berjalan di Armbian / Linux headless
- Bisa dijalankan via **PM2** agar tetap hidup

## 📦 Instalasi

### 1. Install Node.js

```bash
curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

### 2. Clone repo

```bash
git clone https://github.com/USERNAME/discord-rpc-armbian.git
cd discord-rpc-armbian
```

### 3. Install dependensi

```bash
npm install
```

### 4. Siapkan konfigurasi

```bash
cp config.example.json config.json
nano config.json
```

Isi `clientId` dengan Application ID dari [Discord Developer Portal](https://discord.com/developers/applications).

### 5. Jalankan

```bash
./start.sh
```

## ⚙️ Konfigurasi

| Field | Deskripsi |
|-------|-----------|
| `clientId` | Application ID dari Discord Developer Portal |
| `details` | Teks baris atas |
| `state` | Teks baris bawah |
| `largeImage` | Nama asset besar (harus di-upload di Art Assets) |
| `largeText` | Tooltip saat hover gambar besar |
| `smallImage` | Nama asset kecil |
| `smallText` | Tooltip saat hover gambar kecil |
| `buttons` | Array maks 2 tombol `{ label, url }` |

## 🔄 Menjalankan di Background (PM2)

```bash
sudo npm install -g pm2
pm2 start index.js --name discord-rpc
pm2 save
pm2 startup
```

## ⚠️ Catatan IPC

Library `discord-rpc` terhubung ke **Discord Desktop** melalui socket IPC lokal. Artinya:

- Discord Desktop **harus berjalan di perangkat yang sama**.
- Kalau di Armbian tidak ada Discord Desktop, gunakan **bridge** seperti [`discord-ipc`](https://github.com/…​) atau alternatif berbasis HTTP.

## 📜 Lisensi

MIT