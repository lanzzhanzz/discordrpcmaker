#!/usr/bin/env bash
set -e

# Pindah ke direktori script
cd "$(dirname "$0")"

# Cek Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "❌ Node.js tidak ditemukan. Install dulu:"
  echo "   curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -"
  echo "   sudo apt install -y nodejs"
  exit 1
fi

# Install dependensi kalau belum ada
if [ ! -d "node_modules" ]; then
  echo "📦 Menginstall dependensi..."
  npm install
fi

# Cek config
if [ ! -f "config.json" ]; then
  echo "❌ config.json tidak ada."
  echo "   Copy dulu: cp config.example.json config.json"
  echo "   Lalu isi clientId dan datanya."
  exit 1
fi

# Jalankan
echo "🚀 Menjalankan Discord RPC..."
exec node index.js