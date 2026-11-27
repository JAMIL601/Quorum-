# Orin Minecraft Bot – Enhanced build

## Changes
- A successful spawn starts a one-hour session timer. At 60 minutes the bot voluntarily disconnects; the main reconnect controller attempts to join again after 5 seconds.
- Ordinary disconnects use a fixed 5-second retry delay (no exponential backoff).
- If the server explicitly reports a reconnect/throttle limit, the bot waits 5 minutes before trying again. This is intentional: repeatedly retrying during a server-enforced cooldown will not bypass it and can cause further kicks.
- Added nearby exploration using Mineflayer pathfinder. It also walks toward nearby dropped-item entities; normal pickup occurs when the bot gets close enough.
- Added `!gift`: a player can ask the bot to throw one item from its inventory nearby. Minecraft clients cannot directly place an item into another player's inventory.
- Existing mob combat and auto-eat modules remain in place.
- Fixed Stop so a manual stop does not trigger an automatic reconnect.

## Deliberately not enabled
- Automatic attacks against other players are disabled. Only mob combat remains active; unsolicited PvP can disrupt other players and may violate server rules.
- Automatic block placement is disabled because it can modify or obstruct shared builds. No automatic world-editing behavior is enabled.

## Setup
1. Extract the ZIP and install Node.js 18 or newer.
2. Check `settings.json`: set the current Minecraft server host, port, and version. The uploaded original settings contained `Quorum.aternos.me:16928` and Minecraft `1.20.1`; update these if the server has changed.
3. Run `npm install`, then `npm start`.
4. Open the dashboard on the hosting machine at `http://localhost:5000` (or the host's assigned public URL).

## Important limits
A one-hour timer only schedules a voluntary reconnect; it cannot guarantee one hour of uninterrupted connection. Aternos, the Minecraft server, network, account limits, or hosting sleep policies can disconnect the bot earlier. A 5-second client retry cannot override a server-side cooldown or make a sleeping server start faster.
