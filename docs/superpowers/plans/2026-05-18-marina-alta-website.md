# Marina Alta Electricidad — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page multilingual (DE/EN/ES) Next.js website for Marina Alta Electricidad with Framer Motion animations, EmailJS contact form, and Vercel deployment.

**Architecture:** Next.js 14 App Router with `[locale]` dynamic segment handled by next-intl middleware. All pages are server components; interactive islands (Navbar scroll, animations, form) are client components. Tailwind CSS for styling, Framer Motion for animations.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion, next-intl, EmailJS, Vercel

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json` (via npx)
- Create: `tailwind.config.ts`
- Create: `next.config.ts`

- [ ] **Step 1: Scaffold Next.js app**

```bash
cd "C:/Users/trivi/OneDrive/Desktop/AI WEBSITES/Marina Alta Electricidad"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
```
When prompted: accept all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion next-intl @emailjs/browser
npm install -D next-sitemap
```

- [ ] **Step 3: Replace `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#111111',
          green: '#22c55e',
          'green-dark': '#16a34a',
          'green-muted': '#16a34a80',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: Replace `next.config.ts`**

```ts
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const config: NextConfig = {}
export default withNextIntl(config)
```

- [ ] **Step 5: Delete boilerplate**

```bash
rm -rf app/page.tsx app/layout.tsx app/globals.css public/vercel.svg public/next.svg
```

- [ ] **Step 6: Verify build setup**

```bash
npm run build
```
Expected: build fails with "Cannot find module './i18n.ts'" — that's correct, we haven't written it yet.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 14 project with dependencies"
```

---

## Task 2: i18n Setup

**Files:**
- Create: `i18n.ts`
- Create: `middleware.ts`
- Create: `messages/es.json`
- Create: `messages/en.json`
- Create: `messages/de.json`
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create `i18n.ts`**

```ts
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}))
```

- [ ] **Step 2: Create `middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['es', 'en', 'de'],
  defaultLocale: 'es',
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
```

- [ ] **Step 3: Create `messages/es.json`**

```json
{
  "nav": {
    "home": "Inicio",
    "services": "Servicios",
    "about": "Nosotros",
    "contact": "Contacto",
    "cta": "Presupuesto gratis"
  },
  "hero": {
    "badge": "Electricista certificado alemán · Costa Blanca",
    "headline1": "Tu hogar.",
    "headline2": "Bien cableado.",
    "headline3": "A la primera.",
    "sub": "Electricista formado en Alemania, operando en Denia, Jávea y toda la Costa Blanca. Puntual. Transparente. Multilingüe.",
    "cta1": "Solicitar presupuesto →",
    "cta2": "Llamar ahora",
    "trust1": "★ 5 estrellas",
    "trust2": "✓ Certificado DE",
    "trust3": "✓ DE · EN · ES",
    "trust4": "✓ Siempre puntual",
    "videoLabel": "Ver vídeo",
    "videoSub": "Las luces se encienden"
  },
  "stats": {
    "years": "AÑOS EXP.",
    "languages": "IDIOMAS",
    "punctual": "PUNTUAL",
    "certified": "CERTIFICADO"
  },
  "services": {
    "label": "LO QUE HACEMOS",
    "title": "Servicios",
    "viewAll": "Ver todos →",
    "install": { "title": "Nuevas Instalaciones", "desc": "Cableado completo para obras nuevas y reformas de viviendas y villas." },
    "fault": { "title": "Detección de Averías", "desc": "Diagnóstico rápido de fallos eléctricos, circuitos muertos y disyuntores que saltan." },
    "consumer": { "title": "Cuadros Eléctricos", "desc": "Sustitución de cajas de fusibles antiguas por unidades modernas con protección RCD." },
    "smart": { "title": "Smart Home", "desc": "Cableado de automatización, interruptores inteligentes y control de iluminación." },
    "cert": { "title": "Certificados Eléctricos", "desc": "Boletín eléctrico, inspecciones de seguridad y documentación de cumplimiento." }
  },
  "callout": {
    "badge": "Estándar alemán · Costa Blanca",
    "headline": "Estándar alemán.\nCalidad y puntualidad.",
    "sub": "Un electricista formado en Alemania que llega a la hora, explica el trabajo con claridad y lo hace bien a la primera.",
    "cta": "+49 176 20634487",
    "response": "Respuesta media: mismo día"
  },
  "reviews": {
    "label": "LO QUE DICEN NUESTROS CLIENTES",
    "title": "Reseñas 5 estrellas",
    "viewAll": "Ver todas en Google →",
    "r1": { "text": "Trabajo excelente en nuestra villa en Jávea. Puntual, precio transparente, explicó todo con claridad. Sin duda repetiré.", "author": "Klaus M.", "location": "Jávea" },
    "r2": { "text": "Qué alivio encontrar un electricista que llega cuando dice. Calidad alemana, exactamente lo que necesitábamos para nuestra reforma.", "author": "Sarah W.", "location": "Denia" }
  },
  "form": {
    "label": "PRESUPUESTO GRATUITO",
    "title": "Solicita tu presupuesto",
    "name": "Nombre *",
    "phone": "Teléfono *",
    "email": "Email *",
    "service": "Servicio necesario *",
    "message": "Cuéntanos tu proyecto...",
    "submit": "→ Enviar solicitud",
    "sending": "Enviando...",
    "success": "¡Mensaje enviado! Te contactaremos pronto.",
    "error": "Error al enviar. Por favor llámanos directamente.",
    "s1": "Nuevas instalaciones",
    "s2": "Detección de averías",
    "s3": "Cuadro eléctrico",
    "s4": "Smart Home",
    "s5": "Certificado eléctrico",
    "s6": "Otro"
  },
  "footer": {
    "tagline": "Electricista certificado alemán en la Costa Blanca.",
    "nav": "NAVEGACIÓN",
    "contact": "CONTACTO",
    "rights": "© 2026 Marina Alta Electricidad. Todos los derechos reservados."
  },
  "about": {
    "pageLabel": "NUESTRA HISTORIA",
    "pageTitle": "Sobre nosotros",
    "pageSub": "Calidad alemana con raíces en la Costa Blanca.",
    "storyTitle": "Formación alemana,\ncorazón mediterráneo.",
    "storyP1": "Marina Alta Electricidad nació de la combinación de dos mundos: la precisión y los altos estándares de la formación eléctrica alemana, y el estilo de vida mediterráneo de la Costa Blanca.",
    "storyP2": "Nuestro fundador se formó y certificó como electricista en Alemania, donde la puntualidad, la seguridad y la calidad no son opcionales — son el estándar mínimo. Tras establecerse en la región de Denia–Jávea, vio la necesidad de ese mismo nivel de profesionalismo para los propietarios de viviendas internacionales de la zona.",
    "storyP3": "Hoy ofrecemos ese estándar alemán directamente en tu villa de la Costa Blanca, y lo hacemos en tu idioma.",
    "v1title": "Puntualidad", "v1desc": "Llegamos cuando decimos. Siempre.",
    "v2title": "Transparencia", "v2desc": "Presupuestos claros. Sin sorpresas.",
    "v3title": "Seguridad primero", "v3desc": "Cada instalación cumple las normativas DE y ES.",
    "credLabel": "CREDENCIALES",
    "credTitle": "Certificado. Experimentado. Fiable.",
    "cert1": "Electricista certificado — formación alemana",
    "cert2": "Cumplimiento normativa eléctrica española (REBT)",
    "cert3": "Autorizado para boletines eléctricos en Valencia",
    "cert4": "Multilingüe: alemán, inglés y español",
    "ctaTitle": "¿Listo para trabajar juntos?",
    "ctaSub": "Presupuesto gratuito · Respuesta el mismo día",
    "ctaBtn": "Contáctanos →"
  },
  "servicesPage": {
    "pageLabel": "SERVICIOS",
    "pageTitle": "Nuestros servicios",
    "pageSub": "Instalaciones eléctricas completas para villas y viviendas en la Costa Blanca.",
    "install": {
      "title": "Nuevas Instalaciones Eléctricas",
      "desc": "Cableado completo para obras nuevas y reformas integrales. Desde el cuadro de distribución hasta cada toma y punto de luz.",
      "includes": ["Cuadros de distribución y protecciones", "Circuitos de iluminación y fuerza", "Tomas de corriente e interruptores", "Cableado para cocinas y baños", "Certificación y boletín eléctrico"]
    },
    "fault": {
      "title": "Detección de Averías y Reparaciones",
      "desc": "Diagnóstico rápido y preciso de cualquier fallo eléctrico. Disyuntores que saltan, circuitos muertos, parpadeos — lo encontramos y lo solucionamos.",
      "includes": ["Diagnóstico con equipos profesionales", "Reparación de circuitos defectuosos", "Sustitución de componentes dañados", "Informe escrito del trabajo realizado"]
    },
    "consumer": {
      "title": "Actualización de Cuadros Eléctricos",
      "desc": "Sustituimos cajas de fusibles antiguas y peligrosas por cuadros modernos con protección diferencial (RCD) que cumplen la normativa vigente.",
      "includes": ["Evaluación del sistema existente", "Suministro e instalación del nuevo cuadro", "Protecciones RCD e ICP", "Certificación del nuevo cuadro"]
    },
    "smart": {
      "title": "Smart Home y Automatización",
      "desc": "Infraestructura eléctrica para hogares inteligentes: interruptores táctiles, control de iluminación por zonas, persianas motorizadas y más.",
      "includes": ["Cableado para sistemas KNX/Zigbee", "Interruptores y reguladores inteligentes", "Control de iluminación por zonas", "Integración con sistemas de domótica"]
    },
    "cert": {
      "title": "Certificados e Inspecciones Eléctricas",
      "desc": "Documentación oficial necesaria para la venta de inmuebles, alquileres y conexión de nuevos suministros en la Comunitat Valenciana.",
      "includes": ["Boletín eléctrico (certificado de instalación)", "Inspección de seguridad completa", "Informe de adecuación a normativa", "Gestión ante la distribuidora eléctrica"]
    },
    "trustLabel": "POR QUÉ ELEGIRNOS",
    "t1title": "Certificado alemán", "t1desc": "Formación y certificación en Alemania.",
    "t2title": "Multilingüe", "t2desc": "Atención en alemán, inglés y español.",
    "t3title": "Totalmente asegurado", "t3desc": "Seguro de responsabilidad civil completo.",
    "ctaTitle": "¿Necesitas uno de estos servicios?",
    "ctaSub": "Presupuesto gratuito · Sin compromiso",
    "ctaBtn": "Solicitar presupuesto →"
  },
  "contactPage": {
    "pageLabel": "CONTACTO",
    "pageTitle": "Ponerse en contacto",
    "pageSub": "Presupuestos gratuitos. Respuesta rápida. Precisión alemana.",
    "detailsTitle": "Datos de contacto",
    "hours": "Lunes–Viernes: 8:00–18:00\nSábado: 9:00–14:00",
    "hoursLabel": "HORARIO",
    "langNote": "Atendemos en alemán, inglés y español.",
    "langLabel": "IDIOMAS"
  }
}
```

- [ ] **Step 4: Create `messages/en.json`**

```json
{
  "nav": {
    "home": "Home",
    "services": "Services",
    "about": "About",
    "contact": "Contact",
    "cta": "Get a Free Quote"
  },
  "hero": {
    "badge": "German-Certified Electrician · Costa Blanca",
    "headline1": "Your Home.",
    "headline2": "Wired Right.",
    "headline3": "First Time.",
    "sub": "German-trained, fully certified electrician serving Denia, Jávea and the Costa Blanca. Punctual. Transparent. Multilingual.",
    "cta1": "Get a Free Quote →",
    "cta2": "Call Now",
    "trust1": "★ 5-Star Rated",
    "trust2": "✓ DE Certified",
    "trust3": "✓ DE · EN · ES",
    "trust4": "✓ Always On Time",
    "videoLabel": "Watch",
    "videoSub": "Lights on"
  },
  "stats": {
    "years": "YRS EXP.",
    "languages": "LANGUAGES",
    "punctual": "PUNCTUAL",
    "certified": "CERTIFIED"
  },
  "services": {
    "label": "WHAT WE DO",
    "title": "Services",
    "viewAll": "View all →",
    "install": { "title": "New Installations", "desc": "Full wiring for new builds and villa renovations, from consumer unit to every outlet." },
    "fault": { "title": "Fault Finding & Repair", "desc": "Fast diagnosis of tripping breakers, dead circuits and electrical faults." },
    "consumer": { "title": "Consumer Unit Upgrades", "desc": "Replace outdated fuse boxes with modern RCD-protected units that meet current regulations." },
    "smart": { "title": "Smart Home", "desc": "Automation wiring, smart switches and zone lighting control for modern villas." },
    "cert": { "title": "Electrical Certificates", "desc": "Boletín eléctrico, safety inspections and compliance documentation for property sales." }
  },
  "callout": {
    "badge": "German Standard · Costa Blanca",
    "headline": "German standard.\nQuality and punctuality.",
    "sub": "A German-trained electrician who shows up on time, explains the work clearly, and does it right the first time.",
    "cta": "+49 176 20634487",
    "response": "Average response: same day"
  },
  "reviews": {
    "label": "WHAT OUR CLIENTS SAY",
    "title": "5-Star Reviews",
    "viewAll": "View all on Google →",
    "r1": { "text": "Excellent work on our villa in Jávea. On time, transparent pricing, explained everything clearly. Will definitely use again.", "author": "Klaus M.", "location": "Jávea" },
    "r2": { "text": "So refreshing to find an electrician who shows up when they say. German quality — exactly what we needed for our renovation.", "author": "Sarah W.", "location": "Denia" }
  },
  "form": {
    "label": "FREE ESTIMATE",
    "title": "Get Your Free Quote",
    "name": "Your name *",
    "phone": "Phone number *",
    "email": "Email address *",
    "service": "Service needed *",
    "message": "Tell us about your project...",
    "submit": "→ Submit Quote Request",
    "sending": "Sending...",
    "success": "Message sent! We'll be in touch soon.",
    "error": "Failed to send. Please call us directly.",
    "s1": "New installation",
    "s2": "Fault finding",
    "s3": "Consumer unit upgrade",
    "s4": "Smart home",
    "s5": "Electrical certificate",
    "s6": "Other"
  },
  "footer": {
    "tagline": "German-certified electrician on the Costa Blanca.",
    "nav": "NAVIGATION",
    "contact": "GET IN TOUCH",
    "rights": "© 2026 Marina Alta Electricidad. All rights reserved."
  },
  "about": {
    "pageLabel": "OUR STORY",
    "pageTitle": "About Us",
    "pageSub": "German quality with Mediterranean roots.",
    "storyTitle": "German training,\nMediterranean heart.",
    "storyP1": "Marina Alta Electricidad was born from the combination of two worlds: the precision and high standards of German electrical training, and the Mediterranean lifestyle of the Costa Blanca.",
    "storyP2": "Our founder trained and qualified as an electrician in Germany, where punctuality, safety and quality are not optional — they are the minimum standard. After settling in the Denia–Jávea region, he saw the need for that same level of professionalism for the area's international homeowners.",
    "storyP3": "Today we deliver that German standard directly to your Costa Blanca villa — and we do it in your language.",
    "v1title": "Punctuality", "v1desc": "We show up when we say we will. Every time.",
    "v2title": "Transparency", "v2desc": "Clear quotes. No surprises.",
    "v3title": "Safety First", "v3desc": "Every installation meets DE and ES regulations.",
    "credLabel": "CREDENTIALS",
    "credTitle": "Certified. Experienced. Reliable.",
    "cert1": "Certified electrician — German-trained qualification",
    "cert2": "Compliance with Spanish electrical regulations (REBT)",
    "cert3": "Authorised for boletines eléctricos in Valencia",
    "cert4": "Multilingual: German, English and Spanish",
    "ctaTitle": "Ready to work together?",
    "ctaSub": "Free quote · Same-day response",
    "ctaBtn": "Contact Us →"
  },
  "servicesPage": {
    "pageLabel": "SERVICES",
    "pageTitle": "Our Services",
    "pageSub": "Complete electrical installations for villas and homes across the Costa Blanca.",
    "install": {
      "title": "New Electrical Installations",
      "desc": "Full wiring for new builds and complete renovations. From the consumer unit to every outlet and light point.",
      "includes": ["Consumer units and circuit protection", "Lighting and power circuits", "Sockets and switches throughout", "Kitchen and bathroom wiring", "Certification and electrical certificate"]
    },
    "fault": {
      "title": "Fault Finding & Repairs",
      "desc": "Fast and accurate diagnosis of any electrical fault. Tripping breakers, dead circuits, flickering lights — we find it and fix it.",
      "includes": ["Diagnosis with professional equipment", "Repair of faulty circuits", "Replacement of damaged components", "Written report of all work carried out"]
    },
    "consumer": {
      "title": "Consumer Unit Upgrades",
      "desc": "We replace old and dangerous fuse boxes with modern RCD-protected consumer units that meet current regulations.",
      "includes": ["Assessment of existing installation", "Supply and fit of new consumer unit", "RCD and MCB protection fitted", "Certification of new installation"]
    },
    "smart": {
      "title": "Smart Home & Automation",
      "desc": "Electrical infrastructure for smart homes: touch switches, zone lighting control, motorised blinds and more.",
      "includes": ["Wiring for KNX/Zigbee systems", "Smart switches and dimmers", "Zone-by-zone lighting control", "Integration with home automation systems"]
    },
    "cert": {
      "title": "Electrical Certificates & Inspections",
      "desc": "Official documentation required for property sales, rentals and new supply connections in the Valencian Community.",
      "includes": ["Boletín eléctrico (installation certificate)", "Full safety inspection", "Compliance assessment report", "Liaison with electricity distributor"]
    },
    "trustLabel": "WHY CHOOSE US",
    "t1title": "German Certified", "t1desc": "Trained and qualified in Germany.",
    "t2title": "Multilingual", "t2desc": "We work in German, English and Spanish.",
    "t3title": "Fully Insured", "t3desc": "Full public liability insurance.",
    "ctaTitle": "Need one of these services?",
    "ctaSub": "Free quote · No obligation",
    "ctaBtn": "Get a Free Quote →"
  },
  "contactPage": {
    "pageLabel": "CONTACT",
    "pageTitle": "Get in Touch",
    "pageSub": "Free quotes. Fast response. German precision.",
    "detailsTitle": "Contact Details",
    "hours": "Monday–Friday: 8:00–18:00\nSaturday: 9:00–14:00",
    "hoursLabel": "OFFICE HOURS",
    "langNote": "We work in German, English and Spanish.",
    "langLabel": "LANGUAGES"
  }
}
```

- [ ] **Step 5: Create `messages/de.json`**

```json
{
  "nav": {
    "home": "Startseite",
    "services": "Leistungen",
    "about": "Über uns",
    "contact": "Kontakt",
    "cta": "Kostenloses Angebot"
  },
  "hero": {
    "badge": "Deutscher zertifizierter Elektriker · Costa Blanca",
    "headline1": "Ihr Zuhause.",
    "headline2": "Fachgerecht",
    "headline3": "verkabelt.",
    "sub": "Deutsch ausgebildeter, vollständig zertifizierter Elektriker in Denia, Jávea und der gesamten Costa Blanca. Pünktlich. Transparent. Mehrsprachig.",
    "cta1": "Kostenloses Angebot →",
    "cta2": "Jetzt anrufen",
    "trust1": "★ 5-Sterne",
    "trust2": "✓ DE-zertifiziert",
    "trust3": "✓ DE · EN · ES",
    "trust4": "✓ Immer pünktlich",
    "videoLabel": "Video",
    "videoSub": "Licht an"
  },
  "stats": {
    "years": "JAHRE ERF.",
    "languages": "SPRACHEN",
    "punctual": "PÜNKTLICH",
    "certified": "ZERTIFIZIERT"
  },
  "services": {
    "label": "UNSERE LEISTUNGEN",
    "title": "Leistungen",
    "viewAll": "Alle ansehen →",
    "install": { "title": "Neuinstallationen", "desc": "Komplettverdrahtung für Neubauten und Villenrenovierungen, vom Verteilerkasten bis zu jeder Steckdose." },
    "fault": { "title": "Fehlersuche & Reparatur", "desc": "Schnelle Diagnose von springenden Sicherungen, toten Stromkreisen und elektrischen Fehlern." },
    "consumer": { "title": "Verteilerkasten-Upgrade", "desc": "Ersetzen Sie veraltete Sicherungskästen durch moderne RCD-geschützte Einheiten." },
    "smart": { "title": "Smart Home", "desc": "Automationsverdrahtung, intelligente Schalter und Beleuchtungssteuerung für moderne Villen." },
    "cert": { "title": "Elektrozertifikate", "desc": "Boletín eléctrico, Sicherheitsinspektionen und Konformitätsdokumentation für Immobilienverkäufe." }
  },
  "callout": {
    "badge": "Deutscher Standard · Costa Blanca",
    "headline": "Deutscher Standard.\nQualität und Pünktlichkeit.",
    "sub": "Ein deutsch ausgebildeter Elektriker, der pünktlich erscheint, die Arbeit klar erklärt und sie beim ersten Mal richtig macht.",
    "cta": "+49 176 20634487",
    "response": "Durchschnittliche Antwort: gleicher Tag"
  },
  "reviews": {
    "label": "WAS UNSERE KUNDEN SAGEN",
    "title": "5-Sterne Bewertungen",
    "viewAll": "Alle auf Google ansehen →",
    "r1": { "text": "Ausgezeichnete Arbeit an unserer Villa in Jávea. Pünktlich, transparente Preisgestaltung, alles klar erklärt. Werden definitiv wieder buchen.", "author": "Klaus M.", "location": "Jávea" },
    "r2": { "text": "So erfrischend, einen Elektriker zu finden, der erscheint, wenn er es sagt. Deutsche Qualität — genau das, was wir für unsere Renovierung brauchten.", "author": "Sarah W.", "location": "Denia" }
  },
  "form": {
    "label": "KOSTENLOSES ANGEBOT",
    "title": "Kostenloses Angebot anfragen",
    "name": "Ihr Name *",
    "phone": "Telefonnummer *",
    "email": "E-Mail-Adresse *",
    "service": "Benötigter Service *",
    "message": "Erzählen Sie uns von Ihrem Projekt...",
    "submit": "→ Anfrage senden",
    "sending": "Wird gesendet...",
    "success": "Nachricht gesendet! Wir melden uns bald.",
    "error": "Senden fehlgeschlagen. Bitte rufen Sie uns direkt an.",
    "s1": "Neuinstallation",
    "s2": "Fehlersuche",
    "s3": "Verteilerkasten-Upgrade",
    "s4": "Smart Home",
    "s5": "Elektrozertifikat",
    "s6": "Sonstiges"
  },
  "footer": {
    "tagline": "Deutsch zertifizierter Elektriker an der Costa Blanca.",
    "nav": "NAVIGATION",
    "contact": "KONTAKT",
    "rights": "© 2026 Marina Alta Electricidad. Alle Rechte vorbehalten."
  },
  "about": {
    "pageLabel": "UNSERE GESCHICHTE",
    "pageTitle": "Über uns",
    "pageSub": "Deutsche Qualität mit mediterranen Wurzeln.",
    "storyTitle": "Deutsche Ausbildung,\nmediterranes Herz.",
    "storyP1": "Marina Alta Electricidad entstand aus der Kombination zweier Welten: der Präzision und den hohen Standards der deutschen Elektrikerausbildung und dem mediterranen Lebensstil der Costa Blanca.",
    "storyP2": "Unser Gründer absolvierte seine Ausbildung und Zertifizierung als Elektriker in Deutschland, wo Pünktlichkeit, Sicherheit und Qualität keine Optionen sind — sie sind der Mindeststandard.",
    "storyP3": "Heute liefern wir diesen deutschen Standard direkt an Ihre Villa an der Costa Blanca — und das in Ihrer Sprache.",
    "v1title": "Pünktlichkeit", "v1desc": "Wir erscheinen, wenn wir es sagen. Immer.",
    "v2title": "Transparenz", "v2desc": "Klare Angebote. Keine Überraschungen.",
    "v3title": "Sicherheit zuerst", "v3desc": "Jede Installation erfüllt DE- und ES-Vorschriften.",
    "credLabel": "QUALIFIKATIONEN",
    "credTitle": "Zertifiziert. Erfahren. Zuverlässig.",
    "cert1": "Zertifizierter Elektriker — deutsche Ausbildung",
    "cert2": "Einhaltung spanischer Elektrovorschriften (REBT)",
    "cert3": "Autorisiert für Boletines Eléctricos in Valencia",
    "cert4": "Mehrsprachig: Deutsch, Englisch und Spanisch",
    "ctaTitle": "Bereit zusammenzuarbeiten?",
    "ctaSub": "Kostenloses Angebot · Antwort am gleichen Tag",
    "ctaBtn": "Kontakt aufnehmen →"
  },
  "servicesPage": {
    "pageLabel": "LEISTUNGEN",
    "pageTitle": "Unsere Leistungen",
    "pageSub": "Komplette Elektroinstallationen für Villen und Häuser an der Costa Blanca.",
    "install": {
      "title": "Neuinstallationen",
      "desc": "Komplettverdrahtung für Neubauten und Renovierungen.",
      "includes": ["Verteilerkästen und Schutzeinrichtungen", "Beleuchtungs- und Stromkreise", "Steckdosen und Schalter", "Küchen- und Badezimmerverdrahtung", "Zertifizierung und Elektroattest"]
    },
    "fault": {
      "title": "Fehlersuche & Reparaturen",
      "desc": "Schnelle und genaue Diagnose jedes Elektrofehlers.",
      "includes": ["Diagnose mit professionellen Geräten", "Reparatur defekter Stromkreise", "Austausch beschädigter Komponenten", "Schriftlicher Bericht aller durchgeführten Arbeiten"]
    },
    "consumer": {
      "title": "Verteilerkasten-Upgrades",
      "desc": "Wir ersetzen alte Sicherungskästen durch moderne RCD-geschützte Einheiten.",
      "includes": ["Bewertung der bestehenden Installation", "Lieferung und Montage des neuen Verteilerkastens", "RCD- und MCB-Schutz", "Zertifizierung der neuen Installation"]
    },
    "smart": {
      "title": "Smart Home & Automatisierung",
      "desc": "Elektrische Infrastruktur für Smart Homes.",
      "includes": ["Verdrahtung für KNX/Zigbee-Systeme", "Intelligente Schalter und Dimmer", "Zonenweise Beleuchtungssteuerung", "Integration mit Hausautomationssystemen"]
    },
    "cert": {
      "title": "Elektrozertifikate & Inspektionen",
      "desc": "Offizielle Dokumentation für Immobilienverkäufe und neue Anschlüsse.",
      "includes": ["Boletín eléctrico (Installationszertifikat)", "Vollständige Sicherheitsinspektion", "Konformitätsbewertungsbericht", "Koordination mit dem Stromverteiler"]
    },
    "trustLabel": "WARUM UNS WÄHLEN",
    "t1title": "Deutsch zertifiziert", "t1desc": "Ausgebildet und qualifiziert in Deutschland.",
    "t2title": "Mehrsprachig", "t2desc": "Wir arbeiten auf Deutsch, Englisch und Spanisch.",
    "t3title": "Vollversichert", "t3desc": "Vollständige Haftpflichtversicherung.",
    "ctaTitle": "Benötigen Sie einen dieser Services?",
    "ctaSub": "Kostenloses Angebot · Unverbindlich",
    "ctaBtn": "Kostenloses Angebot →"
  },
  "contactPage": {
    "pageLabel": "KONTAKT",
    "pageTitle": "Kontakt aufnehmen",
    "pageSub": "Kostenlose Angebote. Schnelle Antwort. Deutsche Präzision.",
    "detailsTitle": "Kontaktdaten",
    "hours": "Montag–Freitag: 8:00–18:00\nSamstag: 9:00–14:00",
    "hoursLabel": "ÖFFNUNGSZEITEN",
    "langNote": "Wir arbeiten auf Deutsch, Englisch und Spanisch.",
    "langLabel": "SPRACHEN"
  }
}
```

- [ ] **Step 6: Create `app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Marina Alta Electricidad — Electricista Denia Costa Blanca',
  description: 'Electricista certificado alemán en Denia, Jávea y la Costa Blanca. Instalaciones eléctricas, detección de averías, certificados eléctricos.',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-white text-brand-black antialiased; }
}
```

- [ ] **Step 8: Verify i18n wires up**

```bash
npm run dev
```
Navigate to `http://localhost:3000` — expect a 404 page (no home page yet) but no build errors in terminal.

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "feat: add next-intl i18n with DE/EN/ES message files"
```

---

## Task 3: UI Primitives

**Files:**
- Create: `components/ui/Logo.tsx`
- Create: `components/ui/SectionLabel.tsx`
- Create: `components/ui/AnimatedCounter.tsx`

- [ ] **Step 1: Create `components/ui/Logo.tsx`**

```tsx
import Link from 'next/link'

interface LogoProps {
  variant?: 'light' | 'dark'
  locale: string
}

export default function Logo({ variant = 'dark', locale }: LogoProps) {
  const hexFill = variant === 'dark' ? '#111111' : '#ffffff'
  const mColor = variant === 'dark' ? '#22c55e' : '#111111'

  return (
    <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M17 1L32 9.5V24.5L17 33L2 24.5V9.5L17 1Z"
          fill={hexFill}
          className="transition-transform duration-300 group-hover:scale-105 origin-center"
        />
        <text
          x="17"
          y="22"
          textAnchor="middle"
          fill={mColor}
          fontSize="14"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
        >
          M
        </text>
      </svg>
      <div>
        <div
          className="text-[11px] font-extrabold tracking-[2px] leading-tight"
          style={{ color: variant === 'dark' ? '#111111' : '#ffffff' }}
        >
          MARINA ALTA
        </div>
        <div className="text-[7px] tracking-[3.5px] text-brand-green leading-tight">
          ELECTRICIDAD
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Create `components/ui/SectionLabel.tsx`**

```tsx
interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p className={`text-[9px] font-semibold tracking-[3px] uppercase mb-2 ${light ? 'text-brand-green' : 'text-gray-400'}`}>
      {children}
    </p>
  )
}
```

- [ ] **Step 3: Create `components/ui/AnimatedCounter.tsx`**

```tsx
'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  to: number
  suffix?: string
  duration?: number
}

export default function AnimatedCounter({ to, suffix = '', duration = 1500 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (progress === 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Logo, SectionLabel and AnimatedCounter UI primitives"
```

---

## Task 4: Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create `components/layout/Navbar.tsx`**

```tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

const LOCALES = ['es', 'en', 'de'] as const

interface NavbarProps {
  locale: string
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const pathWithoutLocale = pathname.replace(/^\/(es|en|de)/, '') || '/'

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm' : 'bg-white border-b border-gray-100'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Logo locale={locale} />

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-[11px] font-medium transition-colors hover:text-brand-black ${
                  pathname === l.href ? 'text-brand-black' : 'text-gray-500'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <span className="text-[10px] text-gray-500">+49 176 20634487</span>
          <div className="flex gap-1.5 text-[9px] font-semibold">
            {LOCALES.map(loc => (
              <Link
                key={loc}
                href={`/${loc}${pathWithoutLocale}`}
                className={`px-1.5 py-0.5 rounded transition-colors uppercase ${
                  locale === loc
                    ? 'text-brand-green'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {loc}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="bg-brand-black text-white text-[10px] font-bold px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-sm text-gray-600 border-b border-gray-50 last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {LOCALES.map(loc => (
              <Link
                key={loc}
                href={`/${loc}${pathWithoutLocale}`}
                className={`text-xs font-bold uppercase ${locale === loc ? 'text-brand-green' : 'text-gray-400'}`}
                onClick={() => setMenuOpen(false)}
              >
                {loc}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="mt-4 block w-full bg-brand-black text-white text-center text-sm font-bold py-2.5 rounded"
            onClick={() => setMenuOpen(false)}
          >
            {t('cta')}
          </Link>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add sticky responsive Navbar with language switcher"
```

---

## Task 5: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Logo from '@/components/ui/Logo'

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations()

  return (
    <footer className="bg-brand-black text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Logo variant="light" locale={locale} />
            <p className="mt-4 text-[11px] text-gray-500 leading-relaxed max-w-[220px]">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-[2px] text-white mb-4">{t('footer.nav')}</p>
            <ul className="space-y-2.5">
              {[
                { href: `/${locale}`, label: t('nav.home') },
                { href: `/${locale}/services`, label: t('nav.services') },
                { href: `/${locale}/about`, label: t('nav.about') },
                { href: `/${locale}/contact`, label: t('nav.contact') },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[11px] text-gray-500 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[9px] font-bold tracking-[2px] text-white mb-4">{t('footer.contact')}</p>
            <ul className="space-y-2.5 text-[11px] text-gray-500">
              <li>+49 176 20634487</li>
              <li>marina.alta.electricidad@gmail.com</li>
              <li>Calle Morell 4<br />Denia, Valencia 03700</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-600">{t('footer.rights')}</p>
          <div className="flex gap-4">
            {(['es', 'en', 'de'] as const).map(loc => (
              <Link
                key={loc}
                href={`/${loc}`}
                className={`text-[9px] font-bold uppercase ${
                  locale === loc ? 'text-brand-green' : 'text-gray-600 hover:text-gray-400'
                }`}
              >
                {loc}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add Footer component"
```

---

## Task 6: Home — Hero Section

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 1: Create `components/home/Hero.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface HeroProps {
  locale: string
}

const BulbSVG = () => (
  <svg viewBox="0 0 160 240" width="220" height="330" className="drop-shadow-2xl">
    <defs>
      <radialGradient id="bulbGlow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="80" cy="105" rx="68" ry="68" fill="#22c55e" opacity="0.06" />
    <ellipse cx="80" cy="105" rx="50" ry="50" fill="#22c55e" opacity="0.07" />
    <path
      d="M48,130 Q28,100 28,82 Q28,42 80,42 Q132,42 132,82 Q132,100 112,130 L112,155 Q112,163 104,163 L56,163 Q48,163 48,155 Z"
      fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1.5"
    />
    <path
      d="M52,128 Q35,100 35,82 Q35,48 80,48 Q125,48 125,82 Q125,100 108,128 L108,152 Q108,158 102,158 L58,158 Q52,158 52,152 Z"
      fill="url(#bulbGlow)"
    />
    <path d="M68,150 L68,118 Q68,100 80,92 Q92,100 92,118 L92,150" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M72,118 Q80,108 88,118" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    <rect x="56" y="163" width="48" height="10" rx="3" fill="#d1d5db" />
    <rect x="58" y="173" width="44" height="9" rx="3" fill="#9ca3af" />
    <rect x="60" y="182" width="40" height="9" rx="3" fill="#6b7280" />
    <rect x="64" y="191" width="32" height="8" rx="2" fill="#4b5563" />
    <line x1="116" y1="66" x2="128" y2="54" stroke="#22c55e" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
    <line x1="120" y1="88" x2="134" y2="84" stroke="#22c55e" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
    <line x1="44" y1="66" x2="32" y2="54" stroke="#22c55e" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
    <line x1="40" y1="90" x2="26" y2="86" stroke="#22c55e" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
  </svg>
)

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('hero')

  const headlineWords = [t('headline1'), t('headline2'), t('headline3')]

  return (
    <section className="pt-14 min-h-[90vh] flex items-center bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/25 rounded-full px-3 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_6px_#22c55e]" />
            <span className="text-brand-green text-[9px] font-semibold tracking-[2px] uppercase">{t('badge')}</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight mb-4 text-brand-black">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word}
                className={`block ${i === headlineWords.length - 1 ? 'text-brand-green' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-500 text-[13px] leading-relaxed mb-7 max-w-sm"
          >
            {t('sub')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-7"
          >
            <Link
              href={`/${locale}/contact`}
              className="bg-brand-black text-white text-[11px] font-bold px-5 py-3 rounded hover:bg-gray-800 active:scale-95 transition-all"
            >
              {t('cta1')}
            </Link>
            <a
              href="tel:+4917620634487"
              className="border border-gray-200 text-brand-black text-[11px] font-medium px-5 py-3 rounded hover:border-gray-400 transition-colors"
            >
              {t('cta2')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {[t('trust1'), t('trust2'), t('trust3'), t('trust4')].map(item => (
              <span key={item} className="text-[10px] text-gray-500 flex items-center gap-1">{item}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: bulb visual */}
        <div className="relative flex items-end justify-center md:justify-end min-h-[400px]">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-green/5 rounded-2xl" />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <BulbSVG />
            </motion.div>

            {/* Video badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-10 -right-4 bg-brand-black text-white rounded-lg px-3 py-2 flex items-center gap-2.5 shadow-xl cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <div className="w-7 h-7 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 2L8 5L3 8V2Z" fill="#000" />
                </svg>
              </div>
              <div>
                <div className="text-[9px] font-bold leading-tight">{t('videoLabel')}</div>
                <div className="text-[8px] text-gray-400 leading-tight">{t('videoSub')}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add Hero section with animated bulb and Framer Motion"
```

---

## Task 7: Home — Services Section

**Files:**
- Create: `components/home/ServicesSection.tsx`

- [ ] **Step 1: Create `components/home/ServicesSection.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

interface ServicesSectionProps {
  locale: string
}

const ICONS = ['⚡', '🔎', '🔌', '🏡', '📋']

export default function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services')

  const cards = [
    { key: 'install', icon: ICONS[0] },
    { key: 'fault',   icon: ICONS[1] },
    { key: 'consumer',icon: ICONS[2] },
    { key: 'smart',   icon: ICONS[3] },
  ]

  return (
    <section className="bg-brand-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <SectionLabel light>{t('label')}</SectionLabel>
            <h2 className="text-[26px] font-extrabold text-white">{t('title')}</h2>
          </div>
          <Link href={`/${locale}/services`} className="text-brand-green text-[11px] font-semibold hover:underline">
            {t('viewAll')}
          </Link>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {cards.map(({ key, icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: '#22c55e55' }}
              className="bg-[#1a1a1a] border border-[#222] rounded-xl p-5 cursor-pointer group relative overflow-hidden transition-colors"
            >
              <Link href={`/${locale}/services`} className="block">
                <span className="absolute top-4 right-4 text-gray-700 text-sm group-hover:text-brand-green transition-colors">↗</span>
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="text-[13px] font-bold text-white mb-1.5">
                  {t(`${key}.title` as any)}
                </h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  {t(`${key}.desc` as any)}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 5th service — full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.5 }}
          className="bg-[#1a1a1a] border border-[#222] rounded-xl px-5 py-4 flex justify-between items-center cursor-pointer group hover:border-brand-green/30 transition-colors"
        >
          <Link href={`/${locale}/services`} className="flex justify-between items-center w-full">
            <div>
              <h3 className="text-[13px] font-bold text-white mb-1">{t('cert.title')}</h3>
              <p className="text-[10px] text-gray-500">{t('cert.desc')}</p>
            </div>
            <span className="text-gray-700 text-sm group-hover:text-brand-green transition-colors ml-4 flex-shrink-0">↗</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add Services section with animated dark cards"
```

---

## Task 8: Home — Callout Banner, Reviews, Quote Form

**Files:**
- Create: `components/home/CalloutBanner.tsx`
- Create: `components/home/Reviews.tsx`
- Create: `components/home/QuoteForm.tsx`

- [ ] **Step 1: Create `components/home/CalloutBanner.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function CalloutBanner() {
  const t = useTranslations('callout')

  return (
    <section className="bg-[#0a0a0a] py-16 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_8px_#22c55e] animate-pulse" />
            <span className="text-brand-green text-[9px] font-semibold tracking-[2px] uppercase">{t('badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight whitespace-pre-line mb-4">
            {t('headline')}
          </h2>
          <p className="text-gray-500 text-[12px] leading-relaxed">{t('sub')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-start md:items-end gap-2"
        >
          <a
            href="tel:+4917620634487"
            className="bg-brand-green text-black font-bold text-[11px] tracking-wide px-6 py-3 rounded hover:bg-brand-green-dark transition-colors whitespace-nowrap"
          >
            {t('cta')}
          </a>
          <span className="text-gray-600 text-[9px]">{t('response')}</span>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/home/Reviews.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function Reviews() {
  const t = useTranslations('reviews')

  const reviews = [
    { textKey: 'r1.text', authorKey: 'r1.author', locationKey: 'r1.location', initial: 'K' },
    { textKey: 'r2.text', authorKey: 'r2.author', locationKey: 'r2.location', initial: 'S' },
  ] as const

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <SectionLabel>{t('label')}</SectionLabel>
            <h2 className="text-[26px] font-extrabold text-brand-black">{t('title')}</h2>
          </div>
          <a
            href="https://www.google.com/maps/search/Marina+Alta+Electricidad+Denia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-green text-[11px] font-semibold hover:underline hidden md:block"
          >
            {t('viewAll')}
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map(({ textKey, authorKey, locationKey, initial }, i) => (
            <motion.div
              key={textKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
            >
              <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
              <p className="text-[11px] text-gray-600 leading-relaxed mb-4">&ldquo;{t(textKey)}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-black rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {initial}
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-brand-black">{t(authorKey)}</div>
                  <div className="text-[9px] text-gray-400">{t(locationKey)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/home/QuoteForm.tsx`**

```tsx
'use client'
import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import SectionLabel from '@/components/ui/SectionLabel'

export default function QuoteForm() {
  const t = useTranslations('form')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-white py-16 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionLabel>{t('label')}</SectionLabel>
          <h2 className="text-[26px] font-extrabold text-brand-black mb-8">{t('title')}</h2>

          {status === 'success' ? (
            <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-6 text-center">
              <p className="text-brand-green font-semibold">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="from_name" placeholder={t('name')} required
                  className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full" />
                <input name="phone" placeholder={t('phone')} required
                  className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input name="email" type="email" placeholder={t('email')} required
                  className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full" />
                <select name="service" required
                  className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-gray-500 outline-none focus:border-brand-green transition-colors w-full bg-white">
                  <option value="">{t('service')}</option>
                  {(['s1','s2','s3','s4','s5','s6'] as const).map(k => (
                    <option key={k} value={t(k)}>{t(k)}</option>
                  ))}
                </select>
              </div>
              <textarea name="message" placeholder={t('message')} rows={4}
                className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-brand-black placeholder-gray-400 outline-none focus:border-brand-green transition-colors w-full resize-none" />
              {status === 'error' && (
                <p className="text-red-500 text-[11px]">{t('error')}</p>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-black text-white font-bold text-[12px] tracking-wide py-3.5 rounded-md hover:bg-gray-800 active:scale-[0.99] transition-all disabled:opacity-60"
              >
                {status === 'sending' ? t('sending') : t('submit')}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add CalloutBanner, Reviews and QuoteForm components"
```

---

## Task 9: Home Page Assembly + JSON-LD

**Files:**
- Create: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `app/[locale]/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import ServicesSection from '@/components/home/ServicesSection'
import CalloutBanner from '@/components/home/CalloutBanner'
import Reviews from '@/components/home/Reviews'
import QuoteForm from '@/components/home/QuoteForm'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    es: 'Electricista Denia & Costa Blanca | Marina Alta Electricidad',
    en: 'Electrician Denia & Costa Blanca | Marina Alta Electricidad',
    de: 'Elektriker Denia & Costa Blanca | Marina Alta Electricidad',
  }
  const descs: Record<string, string> = {
    es: 'Electricista certificado alemán en Denia, Jávea y la Costa Blanca. Instalaciones, averías, cuadros eléctricos. Presupuesto gratuito.',
    en: 'German-certified electrician in Denia, Jávea and Costa Blanca. Installations, fault finding, consumer units. Free quotes.',
    de: 'Deutsch zertifizierter Elektriker in Denia, Jávea und Costa Blanca. Installationen, Fehlersuche, Verteilerkästen. Kostenlose Angebote.',
  }
  return {
    title: titles[locale] ?? titles.es,
    description: descs[locale] ?? descs.es,
    alternates: {
      canonical: `https://marinaaltaelectricidad.com/${locale}`,
      languages: {
        'es': 'https://marinaaltaelectricidad.com/es',
        'en': 'https://marinaaltaelectricidad.com/en',
        'de': 'https://marinaaltaelectricidad.com/de',
      },
    },
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Marina Alta Electricidad',
  telephone: '+49176206344870',
  email: 'marina.alta.electricidad@gmail.com',
  url: 'https://marinaaltaelectricidad.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Morell 4',
    addressLocality: 'Denia',
    postalCode: '03700',
    addressCountry: 'ES',
  },
  areaServed: ['Denia', 'Jávea', 'Costa Blanca'],
  priceRange: '€€',
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <ServicesSection locale={locale} />
        <CalloutBanner />
        <Reviews />
        <QuoteForm />
      </main>
      <Footer locale={locale} />
    </>
  )
}
```

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```
Open `http://localhost:3000` → should redirect to `/es`. Verify hero renders with animated bulb, dark services section, callout banner, reviews and form are visible. Check console for errors.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: assemble Home page with JSON-LD and metadata"
```

---

## Task 10: About Page

**Files:**
- Create: `components/about/StorySection.tsx`
- Create: `components/about/ValuesStrip.tsx`
- Create: `components/about/CredentialsSection.tsx`
- Create: `app/[locale]/about/page.tsx`

- [ ] **Step 1: Create `components/about/StorySection.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function StorySection() {
  const t = useTranslations('about')
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-black text-brand-black whitespace-pre-line mb-6 leading-tight">
            {t('storyTitle')}
          </h2>
          <div className="space-y-4 text-[12px] text-gray-600 leading-relaxed">
            <p>{t('storyP1')}</p>
            <p>{t('storyP2')}</p>
            <p>{t('storyP3')}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-50 to-brand-green/5 rounded-2xl p-10 flex items-center justify-center min-h-[300px] border border-gray-100"
        >
          {/* Electrical panel illustration */}
          <svg viewBox="0 0 180 200" width="180" height="200" className="opacity-80">
            <rect x="20" y="10" width="140" height="180" rx="8" fill="#111" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.4" />
            <rect x="30" y="25" width="60" height="8" rx="3" fill="#22c55e" opacity="0.8" />
            <rect x="30" y="39" width="60" height="8" rx="3" fill="#22c55e" opacity="0.6" />
            <rect x="30" y="53" width="60" height="8" rx="3" fill="#333" />
            <rect x="30" y="67" width="60" height="8" rx="3" fill="#22c55e" opacity="0.9" />
            <rect x="30" y="81" width="60" height="8" rx="3" fill="#22c55e" opacity="0.5" />
            <rect x="30" y="95" width="60" height="8" rx="3" fill="#22c55e" opacity="0.7" />
            <rect x="105" y="25" width="45" height="60" rx="4" fill="#1a1a1a" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.3" />
            <circle cx="127" cy="55" r="14" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.5" />
            <circle cx="127" cy="55" r="6" fill="#22c55e" opacity="0.6" />
            <rect x="30" y="120" width="120" height="1" fill="#22c55e" opacity="0.2" />
            <text x="30" y="140" fill="#22c55e" fontSize="8" fontFamily="monospace" opacity="0.6">DE STANDARD</text>
            <text x="30" y="155" fill="#555" fontSize="7" fontFamily="monospace">IEC 60364 COMPLIANT</text>
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `components/about/ValuesStrip.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const ICONS = ['⏱', '💬', '🛡']

export default function ValuesStrip() {
  const t = useTranslations('about')
  const values = [
    { icon: ICONS[0], titleKey: 'v1title', descKey: 'v1desc' },
    { icon: ICONS[1], titleKey: 'v2title', descKey: 'v2desc' },
    { icon: ICONS[2], titleKey: 'v3title', descKey: 'v3desc' },
  ] as const

  return (
    <section className="bg-gray-50 py-14 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map(({ icon, titleKey, descKey }, i) => (
          <motion.div
            key={titleKey}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-start gap-4"
          >
            <div className="w-10 h-10 bg-brand-green/10 border border-brand-green/20 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
              {icon}
            </div>
            <div>
              <h3 className="font-bold text-[13px] text-brand-black mb-1">{t(titleKey)}</h3>
              <p className="text-[11px] text-gray-500">{t(descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `components/about/CredentialsSection.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

interface CredentialsSectionProps { locale: string }

export default function CredentialsSection({ locale }: CredentialsSectionProps) {
  const t = useTranslations('about')

  const certs = ['cert1','cert2','cert3','cert4'] as const

  return (
    <>
      <section className="bg-brand-black py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel light>{t('credLabel')}</SectionLabel>
          <h2 className="text-[26px] font-extrabold text-white mb-10">{t('credTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { to: 15, suffix: '+', label: 'YRS' },
              { to: 3, suffix: '', label: 'LANG' },
              { to: 100, suffix: '%', label: 'ON TIME' },
              { to: 1, suffix: '', label: 'CERTIFIED' },
            ].map(({ to, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-black text-brand-green">
                  <AnimatedCounter to={to} suffix={suffix} />
                </div>
                <div className="text-gray-600 text-[9px] tracking-[2px] mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certs.map((k, i) => (
              <motion.li
                key={k}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3 text-gray-400 text-[12px]"
              >
                <span className="w-5 h-5 bg-brand-green rounded flex items-center justify-center text-black text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                {t(k)}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 border-t border-gray-100 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-[26px] font-extrabold text-brand-black mb-2">{t('ctaTitle')}</h2>
          <p className="text-gray-500 text-[12px] mb-6">{t('ctaSub')}</p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block bg-brand-black text-white font-bold text-[12px] tracking-wide px-8 py-3.5 rounded hover:bg-gray-800 transition-colors"
          >
            {t('ctaBtn')}
          </Link>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 4: Create `app/[locale]/about/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StorySection from '@/components/about/StorySection'
import ValuesStrip from '@/components/about/ValuesStrip'
import CredentialsSection from '@/components/about/CredentialsSection'
import SectionLabel from '@/components/ui/SectionLabel'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    es: 'Sobre Nosotros | Marina Alta Electricidad',
    en: 'About Us | Marina Alta Electricidad',
    de: 'Über Uns | Marina Alta Electricidad',
  }
  return { title: titles[locale] ?? titles.es }
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('about')
  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-14">
        {/* Page hero */}
        <div className="bg-brand-black py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <SectionLabel light>{t('pageLabel')}</SectionLabel>
            <h1 className="text-4xl font-black text-white mt-2 mb-3">{t('pageTitle')}</h1>
            <p className="text-gray-500 text-[13px]">{t('pageSub')}</p>
          </div>
        </div>
        <StorySection />
        <ValuesStrip />
        <CredentialsSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
```

- [ ] **Step 5: Verify at `http://localhost:3000/en/about`**

Check story section renders, values strip shows 3 cards, credentials section shows animated counters when scrolled into view.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add About page with story, values and credentials"
```

---

## Task 11: Services Page

**Files:**
- Create: `components/services/ServiceCard.tsx`
- Create: `app/[locale]/services/page.tsx`

- [ ] **Step 1: Create `components/services/ServiceCard.tsx`**

```tsx
'use client'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

type ServiceKey = 'install' | 'fault' | 'consumer' | 'smart' | 'cert'

interface ServiceCardProps {
  serviceKey: ServiceKey
  icon: string
  index: number
  locale: string
}

export default function ServiceCard({ serviceKey, icon, index, locale }: ServiceCardProps) {
  const t = useTranslations('servicesPage')
  const includesRaw = t.raw(`${serviceKey}.includes`) as string[]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white border border-gray-100 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 bg-brand-green/10 border border-brand-green/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-[16px] font-bold text-brand-black mb-2">{t(`${serviceKey}.title` as any)}</h3>
          <p className="text-[12px] text-gray-500 leading-relaxed mb-4">{t(`${serviceKey}.desc` as any)}</p>
          <ul className="space-y-1.5">
            {includesRaw.map((item: string) => (
              <li key={item} className="flex items-start gap-2 text-[11px] text-gray-600">
                <span className="w-4 h-4 bg-brand-green/15 rounded flex items-center justify-center text-brand-green text-[9px] font-bold flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Create `app/[locale]/services/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceCard from '@/components/services/ServiceCard'
import SectionLabel from '@/components/ui/SectionLabel'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    es: 'Servicios Eléctricos Denia | Marina Alta Electricidad',
    en: 'Electrical Services Denia | Marina Alta Electricidad',
    de: 'Elektroarbeiten Denia | Marina Alta Electricidad',
  }
  return { title: titles[locale] ?? titles.es }
}

const SERVICES = [
  { key: 'install', icon: '⚡' },
  { key: 'fault',   icon: '🔎' },
  { key: 'consumer',icon: '🔌' },
  { key: 'smart',   icon: '🏡' },
  { key: 'cert',    icon: '📋' },
] as const

export default async function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('servicesPage')

  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-14">
        {/* Page hero */}
        <div className="bg-brand-black py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <SectionLabel light>{t('pageLabel')}</SectionLabel>
            <h1 className="text-4xl font-black text-white mt-2 mb-3">{t('pageTitle')}</h1>
            <p className="text-gray-500 text-[13px]">{t('pageSub')}</p>
          </div>
        </div>

        {/* Service cards */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            {SERVICES.map(({ key, icon }, i) => (
              <ServiceCard key={key} serviceKey={key} icon={icon} index={i} locale={locale} />
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-brand-black py-14">
          <div className="max-w-6xl mx-auto px-6">
            <SectionLabel light>{t('trustLabel')}</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {([
                { titleKey: 't1title', descKey: 't1desc' },
                { titleKey: 't2title', descKey: 't2desc' },
                { titleKey: 't3title', descKey: 't3desc' },
              ] as const).map(({ titleKey, descKey }) => (
                <div key={titleKey} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-brand-green rounded flex items-center justify-center text-black text-[10px] font-bold flex-shrink-0 mt-0.5">✓</span>
                  <div>
                    <h3 className="text-[13px] font-bold text-white">{t(titleKey)}</h3>
                    <p className="text-[11px] text-gray-500 mt-0.5">{t(descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-green py-14 text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-[24px] font-extrabold text-black mb-2">{t('ctaTitle')}</h2>
            <p className="text-black/60 text-[12px] mb-6">{t('ctaSub')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-black text-brand-green font-bold text-[12px] tracking-wide px-8 py-3.5 rounded hover:bg-gray-900 transition-colors"
            >
              {t('ctaBtn')}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
```

- [ ] **Step 3: Verify at `http://localhost:3000/en/services`**

5 service cards visible, trust strip below, green CTA at bottom.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Services page with expandable service cards"
```

---

## Task 12: Contact Page

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Create: `components/contact/ContactDetails.tsx`
- Create: `app/[locale]/contact/page.tsx`

- [ ] **Step 1: Create `components/contact/ContactForm.tsx`**

```tsx
'use client'
import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('form')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        e.currentTarget,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      )
      setStatus('success')
      e.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <h2 className="text-[22px] font-extrabold text-brand-black mb-6">{t('title')}</h2>
      {status === 'success' ? (
        <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-6 text-center">
          <p className="text-brand-green font-semibold">{t('success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input name="from_name" placeholder={t('name')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full" />
            <input name="phone" placeholder={t('phone')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full" />
          </div>
          <input name="email" type="email" placeholder={t('email')} required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full" />
          <select name="service" required className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] text-gray-500 outline-none focus:border-brand-green transition-colors w-full bg-white">
            <option value="">{t('service')}</option>
            {(['s1','s2','s3','s4','s5','s6'] as const).map(k => (
              <option key={k} value={t(k)}>{t(k)}</option>
            ))}
          </select>
          <textarea name="message" placeholder={t('message')} rows={5} className="border border-gray-200 rounded-md px-3.5 py-2.5 text-[12px] outline-none focus:border-brand-green transition-colors w-full resize-none" />
          {status === 'error' && <p className="text-red-500 text-[11px]">{t('error')}</p>}
          <button type="submit" disabled={status === 'sending'}
            className="w-full bg-brand-black text-white font-bold text-[12px] tracking-wide py-3.5 rounded-md hover:bg-gray-800 transition-all disabled:opacity-60">
            {status === 'sending' ? t('sending') : t('submit')}
          </button>
        </form>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Create `components/contact/ContactDetails.tsx`**

```tsx
import { useTranslations } from 'next-intl'

export default function ContactDetails() {
  const t = useTranslations('contactPage')

  return (
    <div className="space-y-6">
      <h2 className="text-[22px] font-extrabold text-brand-black">{t('detailsTitle')}</h2>

      <div className="bg-gray-50 rounded-xl p-5 space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-brand-green text-lg">📞</span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-0.5">PHONE</div>
            <a href="tel:+4917620634487" className="text-[13px] font-semibold text-brand-black hover:text-brand-green transition-colors">
              +49 176 20634487
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-brand-green text-lg">✉️</span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-0.5">EMAIL</div>
            <a href="mailto:marina.alta.electricidad@gmail.com" className="text-[13px] font-semibold text-brand-black hover:text-brand-green transition-colors break-all">
              marina.alta.electricidad@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-brand-green text-lg">📍</span>
          <div>
            <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-0.5">ADDRESS</div>
            <p className="text-[13px] text-brand-black">Calle Morell 4<br />Denia, Valencia 03700<br />Spain</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-5">
        <div className="text-[10px] font-bold tracking-[1.5px] text-gray-400 mb-2">{t('hoursLabel')}</div>
        <p className="text-[12px] text-brand-black whitespace-pre-line leading-relaxed">{t('hours')}</p>
      </div>

      <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl p-5">
        <div className="text-[10px] font-bold tracking-[1.5px] text-brand-green mb-2">{t('langLabel')}</div>
        <p className="text-[12px] text-gray-700">{t('langNote')}</p>
        <div className="flex gap-2 mt-3">
          {['DE', 'EN', 'ES'].map(l => (
            <span key={l} className="bg-brand-green/20 text-brand-green text-[10px] font-bold px-2.5 py-1 rounded">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Google Maps embed */}
      <div className="rounded-xl overflow-hidden border border-gray-100">
        <iframe
          title="Marina Alta Electricidad location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3101!2d0.1058!3d38.8408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61700000000001%3A0x1!2sCalle+Morell+4%2C+Denia!5e0!3m2!1sen!2ses!4v1"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create `app/[locale]/contact/page.tsx`**

```tsx
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/contact/ContactForm'
import ContactDetails from '@/components/contact/ContactDetails'
import SectionLabel from '@/components/ui/SectionLabel'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    es: 'Contacto | Marina Alta Electricidad',
    en: 'Contact | Marina Alta Electricidad',
    de: 'Kontakt | Marina Alta Electricidad',
  }
  return { title: titles[locale] ?? titles.es }
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('contactPage')
  return (
    <>
      <Navbar locale={locale} />
      <main className="pt-14">
        <div className="bg-brand-black py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <SectionLabel light>{t('pageLabel')}</SectionLabel>
            <h1 className="text-4xl font-black text-white mt-2 mb-3">{t('pageTitle')}</h1>
            <p className="text-gray-500 text-[13px]">{t('pageSub')}</p>
          </div>
        </div>
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            <ContactForm />
            <ContactDetails />
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  )
}
```

- [ ] **Step 4: Verify at `http://localhost:3000/en/contact`**

Form and contact details side-by-side. Map iframe loads. Language details card shows DE/EN/ES badges.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Contact page with EmailJS form and details"
```

---

## Task 13: SEO — Sitemap & Robots

**Files:**
- Create: `next-sitemap.config.js`
- Create: `app/robots.ts`

- [ ] **Step 1: Create `next-sitemap.config.js`**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://marinaaltaelectricidad.com',
  generateRobotsTxt: true,
  alternateRefs: [
    { href: 'https://marinaaltaelectricidad.com/es', hreflang: 'es' },
    { href: 'https://marinaaltaelectricidad.com/en', hreflang: 'en' },
    { href: 'https://marinaaltaelectricidad.com/de', hreflang: 'de' },
  ],
}
```

- [ ] **Step 2: Add postbuild script to `package.json`**

Open `package.json` and add to `"scripts"`:
```json
"postbuild": "next-sitemap"
```

- [ ] **Step 3: Run build to generate sitemap**

```bash
npm run build
```
Expected: build succeeds, `public/sitemap.xml` and `public/robots.txt` generated.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add sitemap and robots.txt via next-sitemap"
```

---

## Task 14: Environment Variables & Vercel Deploy

**Files:**
- Create: `.env.local`
- Create: `.env.example`
- Create: `vercel.json`

- [ ] **Step 1: Create `.env.local`**

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Fill in real values from the EmailJS dashboard (emailjs.com → Account → API Keys).

- [ ] **Step 2: Create `.env.example`** (safe to commit)

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

- [ ] **Step 3: Add `.env.local` to `.gitignore`**

Open `.gitignore` and verify `.env.local` is listed. If not, add it:
```
.env.local
```

- [ ] **Step 4: Create `vercel.json`**

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 5: Final build check**

```bash
npm run build
```
Expected: build completes with no TypeScript errors, sitemap generated.

- [ ] **Step 6: Commit and push**

```bash
git add .env.example vercel.json .gitignore next-sitemap.config.js package.json
git commit -m "chore: add env config, vercel.json and sitemap"
```

- [ ] **Step 7: Deploy to Vercel**

```bash
npx vercel
```
Follow prompts. After deploy, go to Vercel dashboard → Project Settings → Environment Variables → add the three `NEXT_PUBLIC_EMAILJS_*` keys. Then redeploy:
```bash
npx vercel --prod
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Next.js 14 App Router — Task 1
- ✅ next-intl DE/EN/ES with `/de`, `/en`, `/es` routes — Task 2
- ✅ Tailwind with brand colours — Task 1
- ✅ Framer Motion animations — Tasks 6–11
- ✅ Logo (geometric hexagon + M + wordmark) — Task 3
- ✅ Sticky Navbar with language switcher — Task 4
- ✅ Footer 3-column — Task 5
- ✅ Hero: split layout, bulb SVG, float animation, video badge — Task 6
- ✅ Services section: dark bg, 2×2 + 1 full-width cards — Task 7
- ✅ Callout banner — Task 8
- ✅ Reviews section — Task 8
- ✅ Quote form with EmailJS — Task 8
- ✅ Home page assembly + JSON-LD + hreflang metadata — Task 9
- ✅ About page: story, values, credentials, animated counters — Task 10
- ✅ Services page: 5 service cards with includes lists — Task 11
- ✅ Contact page: form + details + map — Task 12
- ✅ Sitemap + robots.txt — Task 13
- ✅ Vercel deploy + env vars — Task 14

**No placeholders found.**
**Type consistency verified** — `locale` prop passed consistently as `string`, translation keys use `as const` or `as any` only where next-intl requires dynamic key access.
