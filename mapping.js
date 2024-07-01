const fs = require("fs");

/**
 * @typedef { object } PlayerData
 * @prop { string } name
 * @prop { string } xuid
 * @prop { string } deviceId
 * @prop { string } uuid
 * @prop { string } reason
 * @prop { number } banTime
 * @prop { EvidenceURL[] } evidences
 */

/**
 * @typedef { Record<string, string> } MappingData
 */

/**
 * @typedef { Record<string, EvidenceURL[]> } EvidenceData
 */

/** @typedef { `https://raw.githubusercontent.com/SuikaMCBE/BanNetData/main/evidences/${string}` } EvidenceURL */

/** @type { PlayerData[] } */
const players = fs.readdirSync("./players")
    .filter(file => file.endsWith(".json"))
    .map(file => {
        return require(`./players/${file}`);
    });

// clean mapping folder
fs.readdirSync("./mappings")
    .filter(file => file.endsWith(".json"))
    .forEach(file => fs.unlinkSync(`./mappings/${file}`));

console.log(`Cleaned mappings folder`);
    
/** @type { Record<string, string> } */
const xuidMapping = {};

/** @type { Record<string, string> } */
const deviceIdMapping = {};

/** @type { Record<string, string> } */
const uuidMapping = {};

for (const player of players) {
    xuidMapping[player.xuid] = player.name;
    deviceIdMapping[player.deviceId] = player.name;
    uuidMapping[player.uuid] = player.name;

    console.log(`Mapped ${player.name}`);
}

fs.writeFileSync("./mappings/xuid.json", JSON.stringify(xuidMapping, null, 2));
fs.writeFileSync("./mappings/deviceId.json", JSON.stringify(deviceIdMapping, null, 2));
fs.writeFileSync("./mappings/uuid.json", JSON.stringify(uuidMapping, null, 2));

console.log(`Mapped ${players.length} players`);