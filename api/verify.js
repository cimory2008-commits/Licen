const LICENSES = require("../licenses");

const KEY_FORMAT = /^[A-Za-z0-9-]{8,64}$/;

function reply(res, success, message, extra) {
  // Selalu HTTP 200 supaya Roblox bisa bedakan "lisensi ditolak" vs "server error".
  return res.status(200).json({ success, message, ...(extra || {}) });
}

module.exports = (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { key, placeId, universeId, creatorId } = req.body || {};

  if (typeof key !== "string" || !KEY_FORMAT.test(key)) {
    return reply(res, false, "Invalid license key format");
  }
  if (!Object.prototype.hasOwnProperty.call(LICENSES, key)) {
    return reply(res, false, "License key not found");
  }

  const lic = LICENSES[key];

  if (lic.revoked) return reply(res, false, "License revoked");

  if (lic.expires && new Date(lic.expires + "T23:59:59Z") < new Date()) {
    return reply(res, false, "License expired");
  }

  if (lic.creatorIds && lic.creatorIds.length > 0 && !lic.creatorIds.includes(Number(creatorId))) {
    return reply(res, false, "Creator ID not registered for this license");
  }

  if (lic.placeIds && lic.placeIds.length > 0 &&
      !lic.placeIds.includes(Number(placeId)) && !lic.placeIds.includes(Number(universeId))) {
    return reply(res, false, "This place is not registered for this license");
  }

  return reply(res, true, "OK", { owner: lic.owner, expires: lic.expires || "never" });
};
