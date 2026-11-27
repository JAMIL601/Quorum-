"use strict";
// Optional standalone helper. Main index.js already owns reconnect scheduling;
// do not enable both reconnect controllers at once.
function setupLeaveRejoin(bot, createBot, options = {}) {
  const sessionMs = options.sessionMs ?? 60 * 60 * 1000;
  const reconnectMs = options.reconnectMs ?? 5000;
  let leaveTimer = null, reconnectTimer = null, stopped = false;
  const clearTimers = () => { if (leaveTimer) clearTimeout(leaveTimer); if (reconnectTimer) clearTimeout(reconnectTimer); leaveTimer = reconnectTimer = null; };
  bot.once("spawn", () => {
    stopped = false; clearTimers();
    console.log(`[Session] Scheduled reconnect in ${Math.round(sessionMs / 60000)} minutes.`);
    leaveTimer = setTimeout(() => { if (!stopped) { console.log("[Session] Scheduled session reconnect."); try { bot.quit("Scheduled session reconnect"); } catch (_) {} } }, sessionMs);
  });
  bot.on("end", () => {
    if (leaveTimer) clearTimeout(leaveTimer); leaveTimer = null;
    if (!stopped) reconnectTimer = setTimeout(() => { if (!stopped && typeof createBot === "function") createBot(); }, reconnectMs);
  });
  bot.on("error", err => console.log("[Session] Bot error:", err?.message || err));
  return () => { stopped = true; clearTimers(); };
}
module.exports = setupLeaveRejoin;
