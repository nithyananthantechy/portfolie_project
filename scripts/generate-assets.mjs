/**
 * Generates committed static assets:
 *   1) public/og-image.png — 1200x630 social preview (professional headshot layout)
 *   2) public/msme-cyber-risk-self-check.pdf — 1-page, 20 yes/no questions lead magnet
 *
 * Run: node scripts/generate-assets.mjs
 * Requires: sharp (already a devDependency). No network needed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");

/* ─────────────────────────── 1) OG image ─────────────────────────── */

async function generateOgImage() {
    const W = 1200;
    const H = 630;
    const headshot = path.join(pub, "nithyananthan_executive.png");
    const meta = await sharp(headshot).metadata();
    const targetH = H;
    const targetW = Math.round((meta.width / meta.height) * targetH);
    const photoX = W - Math.round(targetW * 0.78); // crop a bit off the right

    const photo = await sharp(headshot)
        .resize(targetW, targetH, { fit: "cover", position: "top" })
        .png()
        .toBuffer();

    const blend = Buffer.from(`
        <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#020612" stop-opacity="1"/>
              <stop offset="0.55" stop-color="#020612" stop-opacity="0.35"/>
              <stop offset="1" stop-color="#020612" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <rect x="${photoX}" y="0" width="${Math.min(targetW, W - photoX)}" height="${H}" fill="url(#fade)"/>
        </svg>`);

    const text = Buffer.from(`
        <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="${W}" height="${H}" fill="none"/>
          <rect x="56" y="150" width="46" height="3" fill="#38bdf8"/>
          <text x="56" y="120" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#38bdf8" letter-spacing="4">NITECHSPARK · ERODE, TAMIL NADU</text>
          <text x="56" y="220" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#ffffff">Nithyananthan</text>
          <text x="56" y="284" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#ffffff">Nagarajan</text>
          <text x="56" y="330" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#cbd5e1">Founder &amp; CEO · NITECHSPARK · Udyam MSME</text>
          <text x="56" y="386" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#94a3b8">Helping businesses find cybersecurity &amp; IT</text>
          <text x="56" y="416" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#94a3b8">infrastructure risks before they become problems.</text>
          <rect x="56" y="470" width="430" height="64" rx="12" fill="#ffffff"/>
          <text x="271" y="510" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="bold" fill="#020612" text-anchor="middle">Book a Free 15-Min Intro Call</text>
          <text x="56" y="580" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#64748b">nitechspark.site</text>
        </svg>`);

    await sharp({
        create: { width: W, height: H, channels: 4, background: { r: 2, g: 6, b: 18, alpha: 1 } },
    })
        .composite([
            { input: photo, left: photoX, top: 0 },
            { input: blend, left: 0, top: 0 },
            { input: text, left: 0, top: 0 },
        ])
        .png()
        .toFile(path.join(pub, "og-image.png"));

    console.log("✓ public/og-image.png (1200x630)");
}

/* ─────────────────────────── 2) Checklist PDF ─────────────────────────── */

const QUESTIONS = [
    "Do servers use SSH key login with password login disabled?",
    "Is root login over SSH disabled?",
    "Is a firewall on, allowing only the ports you actually need?",
    "Are OS and critical packages patched within 30 days?",
    "Is critical data backed up off-site — and restored at least once this quarter?",
    "Does someone other than one person know the backup restore steps?",
    "Do you monitor uptime and TLS certificate expiry with alerts?",
    "Does every person have their own account (no shared logins)?",
    "Is MFA on for email, cloud consoles, DNS and hosting panels?",
    "Is there a written access list (who can reach what), reviewed twice a year?",
    "Are default passwords changed on routers, NAS, cameras and IoT devices?",
    "Do you know what customer personal data you store, where, and why?",
    "Do your forms and records capture clear consent for the data collected?",
    "Do you have a retention/deletion rule so old personal data is not kept forever?",
    "Can your team detect and report a suspected breach the same day?",
    "Is there a written incident checklist (who to call, what to preserve)?",
    "Are laptops and company devices encrypted or passcode-protected?",
    "Do joiners get access on day 1 — and lose ALL access on their last day?",
    "Are databases reachable only from your app/servers, not the public internet?",
    "Has someone outside your day-to-day team reviewed your security in 12 months?",
];

function esc(s) {
    return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf() {
    const lines = [];
    const W = 612;
    const LEFT = 46;
    const RIGHT_YES = 466;
    const RIGHT_NO = 526;

    const text = (x, y, size, str, bold = false) =>
        lines.push(`BT /${bold ? "F2" : "F1"} ${size} Tf ${x} ${y} Td (${esc(str)}) Tj ET`);

    const rule = (y) => lines.push(`0.2 0.72 0.97 RG 0.8 w ${LEFT} ${y} m ${W - 46} ${y} l S`);

    // Header
    text(LEFT, 748, 17, "MSME Cyber Risk Self-Check - 20 Yes/No Questions", true);
    text(LEFT, 730, 9.5, "NITECHSPARK | Erode, Tamil Nadu | Udyam MSME registered", false);
    text(LEFT, 716, 9.5, "Mark Yes or No for each question. Be honest - this is for you, not for us.", false);
    rule(708);

    // Column heads
    text(RIGHT_YES - 6, 694, 9, "YES", true);
    text(RIGHT_NO - 4, 694, 9, "NO", true);

    let y = 676;
    QUESTIONS.forEach((q, i) => {
        const n = String(i + 1).padStart(2, " ");
        const clipped = q.length > 78 ? q.slice(0, 75) + "..." : q;
        text(LEFT, y, 9.2, `${n}. ${clipped}`);
        text(RIGHT_YES, y, 9.2, "[   ]");
        text(RIGHT_NO, y, 9.2, "[   ]");
        y -= 15.5;
    });

    rule(y + 6);
    y -= 14;
    text(LEFT, y, 10, "SCORING (count your Yes answers):", true);
    y -= 14;
    text(LEFT, y, 9.2, "0-6  : Urgent gaps. Start here - do not postpone an assessment.");
    y -= 13;
    text(LEFT, y, 9.2, "7-13 : Baseline exists, but real holes remain (backup, access, incident path).");
    y -= 13;
    text(LEFT, y, 9.2, "14-20: Decent baseline - book a Professional review to validate and harden.");

    // Footer
    text(LEFT, 74, 8.5, "This checklist is a starting point, not an audit, certification or guarantee.", false);
    text(LEFT, 61, 8.5, "Free copy: nitechspark.site/msme-cyber-risk-self-check.pdf", false);
    text(LEFT, 48, 8.5, "Assessments from Rs 7,500 | Book a free 15-min intro call | WhatsApp +91 63855 76354", false);

    const stream = lines.join("\n");

    const objs = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
        `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
        `<< /Title (MSME Cyber Risk Self-Check Checklist) /Author (NITECHSPARK) /Subject (20 yes/no questions for MSME cyber risk) /Creator (NITECHSPARK portfolio) >>`,
    ];

    let pdf = "%PDF-1.4\n";
    const offsets = [];
    objs.forEach((body, i) => {
        offsets.push(pdf.length);
        pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xref = pdf.length;
    pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
    offsets.forEach((o) => {
        pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info ${objs.length} 0 R >>\nstartxref\n${xref}\n%%EOF`;

    fs.writeFileSync(path.join(pub, "msme-cyber-risk-self-check.pdf"), pdf, "latin1");
    console.log("✓ public/msme-cyber-risk-self-check.pdf (1 page, 20 questions)");
}

await generateOgImage();
buildPdf();
