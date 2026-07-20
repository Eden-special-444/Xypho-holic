const { getTime, drive } = global.utils;

if (!global.temp.welcomeEvent) global.temp.welcomeEvent = {};

// Updated Welcome Video IDs (with all your added videos)
const welcomeVideos = [
  "1-RV0_mJS0vAZpvO6IDK3f5eJuLIE3jhm",
  "112ZN4pmSeC-HQwi-mG1jrI9qSLKufx7-",
  "11Day-bKc4UqdPtAI2hih7qya7HRb-vqU",
  "11D5NNC6idmP-b73pW9NWyFxJLKwgrhXs",
  "11BCayJggvB3dYlyRhOXAvNIEskJwpCQy",
  "119ylfNLTQuWY7wvfhsEp1yiJqZWkTOU9",
  "119a5bZ4PuXwe8YRVVVXqXZo4C-scjAvf",
  "173duL96CL-OJKt_ZGxtqbwPh38bZ0fQk",
  "17SXiqh-_zd3yRUmzp7s10YFhlK3hROOl",
  "17NvXt3Ss03yEyloiJ8yCPqvwQH8n2QgC",
  "17MiM6FTnnDuNAGJFRQOobEkZvQ_p7VRI",
  "17JmAJ9qe6yIMDVFII_wc2soOaSmrQwFG",
  "17FglmV8XgzNCXFmhoOwAGamYGUQdt3yL",
  "177hZ758fhPfSmTMTXs4MFX2tMsyk_q__",
  "1BvPPk93lUXmRuzmzVbVl9bHq53z9pZsR",
  "1CU-Tz8Z9sDteRGe8eqbXO-wstgIM-d_c",
  "1CSuDunNo0R66pq1WUO-WKVMSrKNIob4u",
  "1CRVzAtF4tWhjYtdEP70fNeH38gk5h_Vw",
  "1CRQjHi9QMX8WR5_FpNAEfgwO5exJBkqT",
  "1CP32jAPKU835YCx5DGzEDEKD1WTBu9l-",
  "1CJLLLiY3POnt41gvyjlvk1WR29JHOqDl",
  "1CIe9iD1G-8itkpXxNLoGoezr53v7rISu",
  "1CGFCoctb1U7jkKwg-52KRXnFx1QN3in3",
  "1CG8K3QuxQOk86_y4DDZSs-kzfpGoo3bz",
  "1CF7BUw95eyu2_FbgIizY15IINDH_s4Cg",
  "1C3Lp7yvutWG25tY_iAg2xEFKD-oApNfe",
  "1C2AbOT_C_YmyXoivrU5msuU0NhW34ySF",
  "1C1zuNkLSkbrV0dsrLOMozJByzn2Fi19t",
  "1CaLEhxjy-Uv_2BPUT6nEEw-Vym_lRbQD",
  "1CVIxTGEfGBi78uZu72j7PFybms0sFW7d"
];

module.exports = {
  config: {
    name: "welcome",
    version: "3.1",
    author: "saku",
    category: "events"
  },

  langs: {
    en: {
      session1: "🌅 𝑴𝒐𝒓𝒏𝒊𝒏𝒈",
      session2: "🌤️ 𝑵𝒐𝒐𝒏",
      session3: "🌇 𝑨𝒇𝒕𝒆𝒓𝒏𝒐𝒐𝒏",
      session4: "🌌 𝑬𝒗𝒆𝒏𝒊𝒏𝒈",
      welcomeMessage: 
`╭━━━━━━ ⬣ ⚝ ⬣ ━━━━━━╮
 🌸 𝑾𝒆𝒍𝒄𝒐𝒎𝒆, {userName} 🌸
 ╰━━━━━━ ⬣ ⚝ ⬣ ━━━━━━╯

🚪 𝗝𝗼𝗶𝗻𝗲𝗱 𝗧𝗵𝗲: 『 {boxName} 』
🧭 𝗧𝗶𝗺𝗲 𝗼𝗳 𝗗𝗮𝘆: {session}
🎭 𝗔𝗱𝗱𝗲𝗱 𝗕𝘆: {adderName}

📖 𝗥𝘂𝗹𝗲𝘀 𝗠𝗮𝘁𝘁𝗲𝗿 — 𝗥𝗲𝘀𝗽𝗲𝗰𝘁 𝗘𝘃𝗲𝗿𝘆𝗼𝗻𝗲 🛡️
🧃 𝗨𝘀𝗲 『 {prefix}help 』 𝘁𝗼 𝘀𝗲𝗲 𝗯𝗼𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀!

✨ 𝗛𝗮𝘃𝗲 𝗔 𝗠𝗮𝗴𝗶𝗰𝗮𝗹 𝗝𝗼𝘂𝗿𝗻𝗲𝘆! 🌠`,
      multiple1: "🌟 𝖸𝗈𝗎",
      multiple2: "🌟 𝖸𝗈𝗎 𝖦𝗎𝗒𝗌"
    }
  },

  onStart: async ({ threadsData, message, event, api, getLang }) => {
    if (event.logMessageType !== "log:subscribe") return;

    const { threadID, logMessageData } = event;
    const added = logMessageData.addedParticipants;
    const hours = parseInt(getTime("HH"));
    const nickNameBot = global.GoatBot.config.nickNameBot;

    // If bot was added to the group
    if (added.some(u => u.userFbId === api.getCurrentUserID())) {
      if (nickNameBot)
        await api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());

      const prefix = global.utils.getPrefix(threadID);
      const intro = `🤖 *Xypher added to the chat* \n\n📝 Type '${prefix}help' to see all available cmd`;
      await message.send(intro);

      // Also send the welcome message after intro
      return message.send(getLang("welcomeMessage", prefix));
    }

    if (!global.temp.welcomeEvent[threadID])
      global.temp.welcomeEvent[threadID] = { joinTimeout: null, data: [] };

    global.temp.welcomeEvent[threadID].data.push(...added);
    clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

    global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async () => {
      const td = await threadsData.get(threadID);
      const members = global.temp.welcomeEvent[threadID].data;
      const banned = td.data.banned_ban || [];
      const threadName = td.threadName;

      // Filter banned users out
      const newMembers = members.filter(m => !banned.some(b => b.id === m.userFbId));
      if (newMembers.length === 0) return;

      const mentions = newMembers.map(u => ({ tag: u.fullName, id: u.userFbId }));
      const names = newMembers.map(u => u.fullName).join(", ");
      const adderInfo = await api.getUserInfo(event.author);
      const adderName = adderInfo[event.author]?.name || "Someone";
      mentions.push({ tag: adderName, id: event.author });

      let session;
      if (hours <= 10) session = getLang("session1");
      else if (hours <= 12) session = getLang("session2");
      else if (hours <= 18) session = getLang("session3");
      else session = getLang("session4");

      const userNameText = newMembers.length > 1 ? getLang("multiple2") : getLang("multiple1");
      const prefix = global.utils.getPrefix(threadID);
      const body = getLang("welcomeMessage")
        .replace("{userName}", `${userNameText} (${names})`)
        .replace("{boxName}", threadName)
        .replace("{session}", session)
        .replace("{adderName}", adderName)
        .replace("{prefix}", prefix);

      const fileId = welcomeVideos[Math.floor(Math.random() * welcomeVideos.length)];
      let attachment = null;

      try {
        const stream = await drive.getFile(fileId, "stream");
        if (stream) attachment = [stream];
      } catch (err) {
        console.error("❌ Video Load Error:", err.message);
      }

      await message.send({ body, mentions, attachment });
      delete global.temp.welcomeEvent[threadID];
    }, 2500);
  }
};
