/**
 * i18n — English (default) + Tamil (ta).
 * Scope per spec: hero, services summary, FAQ, contact.
 * Manual toggle only (Navbar); optional auto-detect via `?lang=` or cookie.
 */

export type Locale = "en" | "ta";

export const LOCALES: Locale[] = ["en", "ta"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_LABELS: Record<Locale, string> = { en: "English", ta: "தமிழ்" };

export interface Faq {
    q: string;
    a: string;
}

/* ─────────────────────────── English ─────────────────────────── */

const en = {
    hero: {
        eyebrow: "CYBERSECURITY • LINUX • AIOPS • IT INFRASTRUCTURE",
        titleLine1: "Cybersecurity & IT",
        titleLine2: "Infrastructure Analyst & Consultant",
        role: "Cybersecurity & IT Infrastructure Analyst & Consultant",
        specialty: "Founder & CEO — NITECHSPARK",
        bio: "Building, securing and troubleshooting Linux, servers, networks and business infrastructure — with hands-on AIOps and automation experience.",
        primaryCta: "Book a Technical Consultation",
        secondaryCta: "View My Work",
        whatsappCta: "WhatsApp Me",
        chooserTitle: "I need help with…",
        chooserHint: "Pick one — it routes your intro call or pre-fills the contact form.",
        whyTitle: "Why Work With Us — Actually",
        whyEyebrow: "HONEST PROOF · REAL ENGINEERING",
        whySub: "Clear engineering execution backed by hands-on systems experience and verifiable technical credentials.",
        credentialsTitle: "Credentials & Qualifications",
        statsSub: "Counts computed from live site data — not marketing round numbers.",
    },
    contact: {
        eyebrow: "DIRECT CHANNELS",
        title: "GET IN TOUCH",
        sub: "Fastest reply is WhatsApp. For anything scoped, book a consultation call.",
        formTitle: "SEND A MESSAGE",
        formSub: "Messages go straight to Nithyananthan's inbox — no ticket queue.",
        name: "YOUR NAME",
        email: "YOUR EMAIL",
        message: "YOUR MESSAGE",
        submit: "SEND MESSAGE",
        sending: "SENDING…",
        success: "Message sent — will reply by email, usually within one working day.",
        error: "Could not send. Please WhatsApp +91 63855 76354 instead.",
        phoneLabel: "PHONE / VOICE",
        whatsappLabel: "WHATSAPP DIRECT",
        emailLabel: "OFFICIAL EMAIL",
        linkedinLabel: "LINKEDIN",
        calendlyLabel: "CALENDLY",
        calendlyValue: "Book a technical consultation",
        hqLabel: "HEADQUARTERS",
        hqValue: "Erode, Tamil Nadu · serving TN + remote India",
    },
    services: {
        eyebrow: "BUYABLE OFFERS · NITECHSPARK",
        title: "SERVICES & PRICING",
        sub: "Cybersecurity & IT infrastructure services mapped to hands-on engineering deliverables — with price anchors and timelines. Workflow: ASSESS → REPORT → REMEDIATE → RE-TEST.",
        pricingNote:
            "Price anchors mirror the published packages on nitechspark.site. Custom work is quoted after a written scope.",
        primaryCta: "Book a Technical Consultation",
    },
    faqs: [
        {
            q: "How much does an assessment cost?",
            a: "Published anchors: Essential ₹7,500, Professional ₹15,000, Business ₹25,000+. Final price depends on scope (server count, sites, teams) and is confirmed in writing before anything starts. See full pricing on nitechspark.site.",
        },
        {
            q: "Do you work remote or on-site?",
            a: "Remote-first across India. On-site is available in and around Erode, Tamil Nadu when hands-on work genuinely requires it (network closets, physical access reviews).",
        },
        {
            q: "What does the assessment actually cover?",
            a: "A structured 9-area review: asset inventory, access control, network exposure, patching, backup, monitoring, incident response, privacy/DPDP readiness, and process/documentation. You get a prioritised findings report and a hardening checklist.",
        },
        {
            q: "Do you guarantee we will not get hacked?",
            a: "No. Anyone promising a no-hack guarantee is selling something. We reduce likely attack paths and make incidents detectable and recoverable — that is honest security work, not a warranty.",
        },
        {
            q: "How long does an engagement take?",
            a: "Essential: 3–5 working days after access. Professional: 1–2 weeks. Business: 2–4 weeks depending on scope. The intro call itself is 15 minutes.",
        },
        {
            q: "Will you sign an NDA?",
            a: "Yes. NDA and written scope come before any access to systems, code or customer data.",
        },
        {
            q: "Is there founding-client pricing?",
            a: "Yes — a limited founding-cohort discount is available in exchange for a written scope you agree to let us publish as an anonymised case template (no names, no metrics you do not approve). Slots are limited to 3.",
        },
        {
            q: "What are the payment terms?",
            a: "50% advance and 50% on delivery for fixed-scope work; larger projects billed by milestone. Invoice via Udyam-registered NITECHSPARK — UPI or bank transfer. No auto-renewing retainers.",
        },
        {
            q: "Who actually does the work?",
            a: "Nithyananthan Nagarajan personally leads and executes technical engineering alongside dedicated specialists. You get direct hands-on engineering accountability — no account-manager relay or offshore handoff.",
        },
        {
            q: "How do I start?",
            a: "Book a technical consultation (or WhatsApp). Come with one sentence about what is worrying you — servers, an upcoming audit, monitoring alerts, or a infrastructure project.",
        },
    ] as Faq[],
};

/* ─────────────────────────── Tamil ─────────────────────────── */

const ta = {
    hero: {
        eyebrow: "சைபர் பாதுகாப்பு • LINUX • AIOPS • IT உள்கட்டமைப்பு",
        titleLine1: "சைபர் பாதுகாப்பு & IT",
        titleLine2: "உள்கட்டமைப்பு ஆய்வாளர் & ஆலோசகர்",
        role: "சைபர் பாதுகாப்பு & IT உள்கட்டமைப்பு ஆய்வாளர் & ஆலோசகர்",
        specialty: "நிறுவனர் & CEO — NITECHSPARK",
        bio: "Linux அமைப்புகள், சேவையகங்கள், நெட்வொர்க்குகள் மற்றும் வணிக உள்கட்டமைப்பை உருவாக்குதல், பாதுகாத்தல் மற்றும் சிக்கல் தீர்த்தல் — நேரடி AIOps மற்றும் ஆட்டோமேஷன் அனுபவத்துடன்.",
        primaryCta: "தொழில்நுட்ப ஆலோசனை முன்பதிவு",
        secondaryCta: "எனது திட்டங்களைப் பார்க்க",
        whatsappCta: "வாட்ஸ்அப் செய்தி",
        chooserTitle: "எனக்கு தேவை…",
        chooserHint: "ஒன்றைத் தேர்ந்தெடுக்கவும் — அழைப்பை அல்லது தொடர்பு படிவத்தை அதற்கேற்ப அமைக்கும்.",
        whyTitle: "ஏன் எங்களுடன் வேலை செய்ய வேண்டும் — உண்மையாக",
        whyEyebrow: "நேர்மையான சான்று · உண்மையான பொறியியல்",
        whySub: "நடைமுறை அமைப்புகள் அனுபவம் மற்றும் சரிபார்க்கக்கூடிய தொழில்நுட்ப நற்சான்றிதழ்களால் ஆதரிக்கப்படும் தெளிவான பொறியியல் செயல்படுத்தல்.",
        credentialsTitle: "சான்றுகள் & தகுதிகள்",
        statsSub: "இணையதள தரவில் இருந்து கணக்கிடப்படுகிறது — சந்தைப்படுத்தல் எண்கள் அல்ல.",
    },
    contact: {
        eyebrow: "நேரடி தொடர்பு",
        title: "தொடர்பு கொள்ளுங்கள்",
        sub: "விரைவான பதிலுக்கு வாட்ஸ்அப். வரம்பு தேவைப்பட்டால் 15 நிமிட அழைப்பை முன்பதிவு செய்யுங்கள்.",
        formTitle: "செய்தி அனுப்புங்கள்",
        formSub: "செய்திகள் நேரடியாக நிறுனருக்குச் செல்கின்றன — டிக்கெட் வரிசை இல்லை.",
        name: "உங்கள் பெயர்",
        email: "உங்கள் மின்னஞ்சல்",
        message: "உங்கள் செய்தி",
        submit: "செய்தியை அனுப்பு",
        sending: "அனுப்பப்படுகிறது…",
        success: "செய்தி அனுப்பப்பட்டது — ஒரு வேலை நாளுக்குள் பதில் வரும்.",
        error: "அனுப்ப முடியவில்லை. வாட்ஸ்அப் +91 63855 76354 ஐப் பயன்படுத்தவும்.",
        phoneLabel: "தொலைபேசி",
        whatsappLabel: "வாட்ஸ்அப்",
        emailLabel: "மின்னஞ்சல்",
        linkedinLabel: "லிங்க்ட்இன்",
        calendlyLabel: "கேலண்ட்லி",
        calendlyValue: "இலவச 15 நிமிட அழைப்பு",
        hqLabel: "தலைமையகம்",
        hqValue: "ஈரோடு, தமிழ்நாடு · தமிழ்நாடு + இந்தியா முழுவதும்",
    },
    services: {
        eyebrow: "வாங்கக்கூடிய சேவைகள்",
        title: "சேவைகள் & விலை",
        sub: "சைபர் பாதுகாப்பு & IT உள்கட்டமைப்பு சேவைகளை உண்மையில் வாங்கக்கூடிய சலுகைகளாக மாற்றியுள்ளோம் — விலை, பணிகள் மற்றும் கால அளவுடன். பணிமுறை: ASSESS → REPORT → REMEDIATE → RE-TEST. மதிப்பைப் பார்க்கும் வரை ரிட்டெய்னர் இல்லை.",
        pricingNote:
            "விலை அடித்தளங்கள் nitechspark.site இல் வெளியிடப்பட்ட தொகுப்புகளைப் பின்தொடர்கின்றன. தனிப்பயன் பணிக்கு எழுத்துப்பூர்வ வரம்புக்குப் பின் விலை.",
        primaryCta: "இலவச 15 நிமிட அறிமுக அழைப்பு",
    },
    faqs: [
        {
            q: "மதிப்பீட்டின் விலை என்ன?",
            a: "வெளியிடப்பட்ட விலை: Essential ₹7,500, Professional ₹15,000, Business ₹25,000+. இறுதி விலை வரம்பைப் (சர்வர் எண்ணிக்கை, தளங்கள்) பொறுத்தது; தொடங்குவதற்கு முன் எழுத்துப்பூர்வமாக உறுதிசெய்யப்படும்.",
        },
        {
            q: "ரிமோட்டா அல்லது ஆன்-சைட்டா?",
            a: "இந்தியா முழுவதும் ரிமோட்ட் முதலில். ஈரோடு மற்றும் அதன் சுற்றுவட்டாரத்தில் கைமுறையான பணிக்கு மட்டும் ஆன்-சைட் வசதி உண்டு.",
        },
        {
            q: "மதிப்பீடு எதை உள்ளடக்கியது?",
            a: "9 பகுதி சீரான மதிப்பீடு: சொத்து பட்டியல், அணுகல் கட்டுப்பாடு, நெட்வொர்க் வெளிப்பாடு, பேட்ச், பேக்அப், கண்காணிப்பு, சம்பவ பதில், தனியுரிமை/DPDP, செயல்முறை. முன்னுரிமை அளிக்கப்பட்ட அறிக்கை மற்றும் கடினப்படுத்தல் பட்டியல் கிடைக்கும்.",
        },
        {
            q: "ஹேக் ஆகாமல் இருக்க உத்தரவாதம் தருவீர்களா?",
            a: "இல்லை. ஹேக் ஆகாது என யார் உத்தரவாதம் அளித்தாலும் அது விற்பனை உத்தி. தாக்குதல் வாய்ப்புகளைக் குறைத்து, சம்பவங்களைக் கண்டறியவும் மீட்கவும் செய்வதே நேர்மையான பாதுகாப்பு வேலை.",
        },
        {
            q: "ஒரு பணி எவ்வளவு நாள் ஆகும்?",
            a: "Essential: அணுகல் பிறகு 3–5 வேலை நாட்கள். Professional: 1–2 வாரங்கள். Business: 2–4 வாரங்கள். அறிமுக அழைப்பு 15 நிமிடம்.",
        },
        {
            q: "NDA கையெழுத்திடுவீர்களா?",
            a: "ஆம். சிஸ்டம், கோட் அல்லது வாடிக்கையாளர் தரவை அணுகுவதற்கு முன் NDA மற்றும் எழுத்துப்பூர்வ வரம்பு.",
        },
        {
            q: "founding-client தள்ளுபடி உண்டா?",
            a: "ஆம் — குறித்த வரம்பில் founding-cohort தள்ளுபடி உண்டு; நீங்கள் ஒப்புக்கொள்ளும் வகையில் மறைமுக case template ஆக வெளியிட அனுமதி தேவை. இடங்கள் 3 மட்டுமே.",
        },
        {
            q: "கட்டண நிபந்தனைகள் என்ன?",
            a: "நிலையான வரம்புக்கு 50% முன்கட்டணம், ஒப்படைப்பில் 50%. பெரிய திட்டங்கள் milestone அடிப்படையில். Udyam-பதிவு NITECHSPARK விலைப்பட்டியல் — UPI அல்லது வங்கி பரிமாற்றம்.",
        },
        {
            q: "யார் பணியைச் செய்வார்?",
            a: "நிறுவனர் நித்யானந்தன் நாகராஜன் நேரடியாக வழிநடத்தி, பிரத்யேக சைபர் பாதுகாப்பு பொறியியல் குழுவுடன் இணைந்து பணிகளை மேற்கொள்கிறார். நேரடி பொறுப்புக்கூறல் மற்றும் சிறப்பு பொறியியல் குழுவின் கூட்டு உழைப்பு.",
        },
        {
            q: "எப்படி தொடங்குவது?",
            a: "இலவச 15 நிமிட அழைப்பை (அல்லது வாட்ஸ்அப்) முன்பதிவு செய்யுங்கள். உங்களை அறியச் செய்யும் ஒரு வரியைக் கொண்டு வாருங்கள் — சர்வர், தணிக்கை, வேலைவாய்ப்பு அல்லது தயாரிப்பு யோசனை. பொருத்தமா இல்லையா என்பதற்கும் அடுத்த எழுத்துப்பூர்வ படிக்கும் பதில் கிடைக்கும்.",
        },
    ] as Faq[],
};

export type Dict = typeof en;

const dictionaries: Record<Locale, Dict> = { en, ta };

export function getDict(locale: Locale | undefined | null): Dict {
    return dictionaries[locale ?? DEFAULT_LOCALE] ?? en;
}

export function getFaqs(locale: Locale | undefined | null): Faq[] {
    return getDict(locale).faqs;
}

/** Read locale from cookie or `?lang=` (set by the manual toggle). */
export function pickLocale(cookieValue?: string | null, searchValue?: string | null): Locale {
    const candidates = [searchValue, cookieValue];
    for (const c of candidates) {
        if (c === "en" || c === "ta") return c;
    }
    return DEFAULT_LOCALE;
}
