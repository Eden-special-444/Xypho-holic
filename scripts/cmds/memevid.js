const axios = require("axios");
const fs = require("fs");
const path = require("path");

const mahmud = async () => {
        const base = await axios.get("https://raw.githubusercontent.com/mahmudx7/HINATA/main/baseApiUrl.json");
        return base.data.mahmud;
};

module.exports = {
        config: {
                name: "memevideo",
                aliases: ["memevid"],
                version: "1.8",
                role: 0,
                author: "MahMUD",
                category: "fun",
                guide: {
                        bn: "একটি র‍্যান্ডম মিম ভিডিও পেতে {pn} ব্যবহার করুন।",
                        en: "Use {pn} to get a random meme video.",
                        vi: "Sử dụng {pn} để lấy video meme ngẫu nhiên."
                }
        },

        langs: {
                bn: {
                        notAuth: "You are not authorized to change the author name.",
                        noVideo: "❌ | কোনো ভিডিও পাওয়া যায়নি।",
                        error: "× API error: %1. Contact MahMUD for help.\n•WhatsApp: 01836298139",
                        successBody: "𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 meme 𝐯𝐢𝐝𝐞𝐨 <🐸"
                },
                en: {
                        notAuth: "You are not authorized to change the author name.",
                        noVideo: "❌ | No videos found.",
                        error: "× API error: %1. Contact MahMUD for help.\n•WhatsApp: 01836298139",
                        successBody: "𝐇𝐞𝐫𝐞'𝐬 𝐲𝐨𝐮𝐫 meme 𝐯𝐢𝐝𝐞𝐨 <🐸"
                },
                vi: {
                        notAuth: "Bạn không có quyền thay đổi tên tác giả.",
                        noVideo: "❌ | Không tìm thấy video nào.",
                        error: "× API error: %1. Contact MahMUD for help.\n•WhatsApp: 01836298139",
                        successBody: "𝐕𝐢đ𝐞𝐨 𝐦𝐞𝐦𝐞 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐝𝐚̂𝐲 <🐸"
                }
        },

        onStart: async function ({ api, event, message, getLang }) {
                const authorName = String.fromCharCode(77, 97, 104, 77, 85, 68);
                if (this.config.author.trim() !== authorName) {
                        return api.sendMessage(getLang("notAuth"), event.threadID, event.messageID);
                }
                
                const filePath = path.join(__dirname, "temp_video.mp4");

                try {
                        api.setMessageReaction("⏳", event.messageID, () => {}, true);
                        const apiUrl = await mahmud();
                        const res = await axios.get(`${apiUrl}/api/album/mahmud/videos/meme?userID=${event.senderID}`);
                        if (!res.data.success || !res.data.videos.length) {
                                api.setMessageReaction("❌", event.messageID, () => {}, true);
                                return api.sendMessage(getLang("noVideo"), event.threadID, event.messageID);
                        }

                        const url = res.data.videos[Math.floor(Math.random() * res.data.videos.length)];

                        const video = await axios({
                                url,
                                method: "GET",
                                responseType: "stream",
                                headers: { 'User-Agent': 'Mozilla/5.0' }
                        });

                        const writer = fs.createWriteStream(filePath);
                        video.data.pipe(writer);

                        writer.on("finish", () => {
                                api.setMessageReaction("🪽", event.messageID, () => {}, true);
                                api.sendMessage({
                                        body: getLang("successBody"),
                                        attachment: fs.createReadStream(filePath)
                                }, event.threadID, () => {
                                        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                                }, event.messageID);
                        });

                        writer.on("error", (err) => {
                                api.setMessageReaction("❌", event.messageID, () => {}, true);
                                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                                api.sendMessage(getLang("error", err.message), event.threadID, event.messageID);
                        });
                } catch (e) {
                        console.error("ERROR:", e);
                        api.setMessageReaction("❌", event.messageID, () => {}, true);
                        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
                        api.sendMessage(getLang("error", e.response?.data?.error || e.message), event.threadID, event.messageID);
                }
        }
};
