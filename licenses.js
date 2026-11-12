// Daftar lisensi. Edit file ini lalu deploy ulang ke Vercel.
// creatorIds : ID user/grup pemilik place yang diizinkan (kosongkan [] = bebas)
// placeIds   : PlaceId yang diizinkan (kosongkan [] = bebas)
// expires    : "YYYY-MM-DD" atau null (tanpa batas)
module.exports = {
  "MANK-AAAA-BBBB-CCCC": {
    owner: "Nama Pembeli",
    creatorIds: [123456789],
    placeIds: [],
    expires: "2027-12-31",
    revoked: false,
  },
};
