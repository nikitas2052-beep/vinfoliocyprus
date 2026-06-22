import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RequestItem {
  name: string;
  winery?: string;
  vintage?: number | string;
  size?: string;
  quantity: number;
}

interface OfferBody {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  items: RequestItem[];
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  let body: OfferBody;
  try {
    body = (await req.json()) as OfferBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const company = (body.company ?? "").trim();
  const note = (body.message ?? "").trim();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!name || !EMAIL_RE.test(email) || items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, a valid email and at least one wine." },
      { status: 400 },
    );
  }

  const wineLines = items
    .map((it, i) => {
      const qty = Number(it.quantity) > 0 ? Number(it.quantity) : 1;
      const parts = [`${i + 1}. ${qty} x ${it.name}`];
      if (it.winery) parts.push(`- ${it.winery}`);
      if (it.vintage) parts.push(`(${it.vintage})`);
      if (it.size) parts.push(`- ${it.size}`);
      return parts.join(" ");
    })
    .join("\n");

  const text =
    `New offer request from the Vinfolio website\n` +
    `----------------------------------------\n\n` +
    `Customer\n` +
    `  Name:    ${name}\n` +
    `  Email:   ${email}\n` +
    `  Phone:   ${phone || "-"}\n` +
    `  Company: ${company || "-"}\n\n` +
    `Wines requested (${items.length})\n${wineLines}\n\n` +
    `Message\n  ${note || "-"}\n`;

  const payload: Record<string, unknown> = {
    access_key: accessKey,
    subject: `New Offer Request - ${name}`,
    from_name: "Vinfolio Website",
    email,
    replyto: email,
    message: text,
  };

  // Second recipient (the offer goes to both inboxes).
  const cc = process.env.WEB3FORMS_CC;
  if (cc) payload.cc = cc;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };
    if (!res.ok || !data.success) {
      return NextResponse.json(
        { ok: false, error: data.message || "Could not send your request. Please try again." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Network error while sending. Please try again." },
      { status: 502 },
    );
  }
}
