const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "..", "public", "wines", "_orig");
const OUT = path.join(__dirname, "..", "public", "wines");

// Match the professional CDN convention: 1152x1536 (3:4), bottle ~92.5% of height.
const CANVAS_W = 1152;
const CANVAS_H = 1536;
const HEIGHT_FILL = 0.925;
const MAX_WIDTH_FILL = 0.82; // cap for wide bottles so they don't dominate

const TARGET_H = Math.round(CANVAS_H * HEIGHT_FILL);
const MAX_W = Math.round(CANVAS_W * MAX_WIDTH_FILL);

(async () => {
  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const f of files) {
    const inPath = path.join(SRC, f);
    const outPath = path.join(OUT, f);
    const ext = path.extname(f).toLowerCase();
    try {
      // Flatten onto white so trim works on near-white backgrounds, then trim.
      const trimmed = await sharp(inPath)
        .flatten({ background: "#ffffff" })
        .trim({ threshold: 12 })
        .toBuffer({ resolveWithObject: true });

      let { width, height } = trimmed.info;

      // Scale bottle so its HEIGHT matches target; cap width.
      let h = TARGET_H;
      let w = Math.round((width / height) * h);
      if (w > MAX_W) {
        w = MAX_W;
        h = Math.round((height / width) * w);
      }

      const bottle = await sharp(trimmed.data).resize(w, h).toBuffer();

      let img = sharp({
        create: {
          width: CANVAS_W,
          height: CANVAS_H,
          channels: 3,
          background: "#ffffff",
        },
      }).composite([
        {
          input: bottle,
          left: Math.round((CANVAS_W - w) / 2),
          top: Math.round((CANVAS_H - h) / 2),
        },
      ]);

      let outBuf;
      if (ext === ".png") outBuf = await img.png().toBuffer();
      else if (ext === ".webp") outBuf = await img.webp({ quality: 90 }).toBuffer();
      else outBuf = await img.jpeg({ quality: 90 }).toBuffer();

      fs.writeFileSync(outPath, outBuf);
      console.log(
        f.padEnd(42),
        `bottle ${width}x${height} -> ${w}x${h} on ${CANVAS_W}x${CANVAS_H}`,
      );
    } catch (e) {
      console.log(f.padEnd(42), "ERROR", e.message);
    }
  }
})();
