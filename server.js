import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const app = express();
app.use(express.json());

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const SITE_URL = "https://3vfi-dev.github.io/"; // Remplace par ton URL GitHub Pages
app.use(cors({ origin: "https://3vfi-dev.github.io" })); 

client.once("ready", () => {
    console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
});

client.login(TOKEN);

app.get("/ping", async (req, res) => {
    try {
        const start = Date.now();
        await axios.get(SITE_URL);
        const ping = Date.now() - start;

        const channel = await client.channels.fetch(CHANNEL_ID);
        if (channel.isTextBased()) {
            channel.send(`🏓 Ping du site : **${ping}ms**`);
        }

        res.json({ message: "Ping envoyé !", ping });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors du ping" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur en ligne sur le port ${PORT}`));
