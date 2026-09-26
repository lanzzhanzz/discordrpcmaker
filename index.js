const RPC = require("discord-rpc");
const fs  = require("fs");
const path = require("path");

// Baca config
const configPath = path.join(__dirname, "config.json");
if (!fs.existsSync(configPath)) {
  console.error("❌ File config.json tidak ditemukan.");
  console.error("   Copy config.example.json menjadi config.json lalu isi datanya.");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

if (!config.clientId || config.clientId === "MASUKKAN_CLIENT_ID_KAMU") {
  console.error("❌ clientId belum diisi di config.json");
  process.exit(1);
}

const rpc = new RPC.Client({ transport: "ipc" });

rpc.on("ready", () => {
  const activity = {
    // 0 = Playing, 2 = Listening, 3 = Watching, 5 = Competing
    type: 2,
    details: config.details,
    state: config.state,
    startTimestamp: new Date(),
    largeImageKey: config.largeImage,
    largeImageText: config.largeText,
    smallImageKey: config.smallImage,
    smallImageText: config.smallText,
    instance: false
  };

  if (Array.isArray(config.buttons) && config.buttons.length > 0) {
    activity.buttons = config.buttons.slice(0, 2); // maks 2 tombol
  }

  rpc.setActivity(activity);
  console.log("✅ Rich Presence aktif!");
  console.log("   Details :", config.details);
  console.log("   State   :", config.state);
});

rpc.login({ clientId: config.clientId }).catch((err) => {
  console.error("❌ Gagal login ke Discord:", err.message);
  console.error("   Pastikan Discord Desktop berjalan di perangkat yang sama.");
});

// Tangani Ctrl+C dengan rapi
process.on("SIGINT", () => {
  console.log("\n👋 Menutup Rich Presence...");
  rpc.destroy();
  process.exit(0);
});

