/* ==========================================================================
   Eternal Invites — DESIGNS CATALOG
   --------------------------------------------------------------------------
   HOW TO ADD A NEW DESIGN
   -----------------------
   Copy one entry below, paste it into the list and edit the fields:

     id          unique short code (no spaces)  e.g. "p006"
     name        design name shown on the card
     type        "physical"  or  "digital"
     occasion    wedding | birthday | graduation | baptism |
                 engagement | anniversary | baby-shower | other
     styles      array of style tags used by the style filter:
                 "Elegant", "Luxury", "Minimalist", "Modern",
                 "Traditional", "Floral", "Black and Gold", "White and Gold"
     image       path to the preview image (1400px max width works well)
     alt         accessible description of the image
     desc        short customer-facing description
     liveUrl     (digital only) link to the live invitation preview, "" if none
     concept     true = clearly-labelled placeholder concept while you
                 prepare real artwork for this occasion

   Physical designs show "Request a Quote" automatically.
   Digital designs show the three package prices from js/config.js.
   ========================================================================== */

const DESIGNS = [

    /* ----------------------- PHYSICAL — REAL WORK ---------------------- */
    {
        id: "p001",
        name: "Traditional Habesha Charm",
        type: "physical",
        occasion: "wedding",
        styles: ["Traditional", "Elegant"],
        image: "assets/images/physical-invitations/card1.jpg",
        alt: "Traditional Ethiopian wedding invitation card with woven band, ribbons and Amharic calligraphy",
        desc: "A beautifully hand-finished invitation blending traditional Ethiopian textile details, a satin bow and classic Habesha calligraphy. Fully personalised with your names, date and venue.",
        liveUrl: ""
    },
    {
        id: "p002",
        name: "Emerald Vellum Wrap",
        type: "physical",
        occasion: "wedding",
        styles: ["Minimalist", "Modern", "Floral"],
        image: "assets/images/physical-invitations/card2.jpg",
        alt: "Minimalist wedding invitation wrapped in greenery-printed vellum tied with a silver string",
        desc: "Soft greenery watercolour and delicate vellum wrapping tied with silver twine — a fresh, modern invitation for couples who love simple natural elegance.",
        liveUrl: ""
    },
    {
        id: "p003",
        name: "Gilded Monogram",
        type: "physical",
        occasion: "wedding",
        styles: ["Luxury", "White and Gold", "Elegant"],
        image: "assets/images/physical-invitations/card3.jpg",
        alt: "White and gold wedding invitation with gold monogram, date and dried flower wax-seal detail",
        desc: "Crisp white stock, gold calligraphy and an elegant monogram finished with a botanical wax-seal ornament. A timeless white-and-gold statement.",
        liveUrl: ""
    },
    {
        id: "p004",
        name: "Royal Heritage Gold",
        type: "physical",
        occasion: "wedding",
        styles: ["Traditional", "Luxury"],
        image: "assets/images/physical-invitations/card4.jpg",
        alt: "Ornate gold traditional invitation with crowns, crosses and candle artwork",
        desc: "A rich, ornate golden design with royal and sacred motifs — perfect for grand traditional celebrations. Wording fully personalised.",
        liveUrl: ""
    },
    {
        id: "p005",
        name: "Golden Blossom Suite",
        type: "physical",
        occasion: "wedding",
        styles: ["Floral", "Luxury", "White and Gold"],
        image: "assets/images/physical-invitations/card5.jpg",
        alt: "Cream embossed wedding invitations with gold floral corners and ivory satin bows",
        desc: "Embossed cream card with gold botanical corners and soft ivory ribbon — a romantic suite that photographs beautifully.",
        liveUrl: ""
    },

    /* ----------------------- DIGITAL — LIVE INVITATIONS ---------------- */
    {
        id: "d001",
        name: "Evening of Grace",
        type: "digital",
        occasion: "wedding",
        styles: ["Luxury", "Modern", "Black and Gold"],
        image: "assets/images/digital-invitations/digital-feven.jpg",
        alt: "Digital wedding invitation preview for Endriyas and Feven",
        desc: "A complete digital wedding experience in Amharic — couple story, countdown, location, event program, songs and guest wishes. Open the live invitation to explore it.",
        liveUrl: "https://eternal-invites.github.io/Feven-and-Dn-Endriyas/"
    },
    {
        id: "d002",
        name: "Promise in Gold",
        type: "digital",
        occasion: "wedding",
        styles: ["Elegant", "Luxury", "Black and Gold"],
        image: "assets/images/digital-invitations/digital-minas.jpg",
        alt: "Digital wedding invitation preview for Minas and Tsion",
        desc: "An elegant digital wedding invitation with love story, program timeline, RSVP form, songs and guest wishes — everything your guests need in one link.",
        liveUrl: "https://eternal-invites.github.io/minas-and-tsion"
    },
    {
        id: "d003",
        name: "Golden Graduation",
        type: "digital",
        occasion: "graduation",
        styles: ["Modern", "Elegant"],
        image: "assets/images/digital-invitations/digital-grad.jpg",
        alt: "Digital graduation invitation preview for Lidya",
        desc: "A celebratory digital graduation invitation with photo gallery, countdown, program, location directions and guest wishes.",
        liveUrl: "https://eternal-invites.github.io/lidiyad-grad/"
    },
    {
        id: "d004",
        name: "Blessed Day",
        type: "digital",
        occasion: "baptism",
        styles: ["Traditional", "Elegant"],
        image: "assets/images/digital-invitations/digital-baptism.jpg",
        alt: "Digital baptism invitation preview in Amharic",
        desc: "A heartfelt digital baptism invitation in Amharic with scripture, countdown, program, church and reception locations with directions.",
        liveUrl: "https://eternal-invites.github.io/baptism/"
    },

    /* -------------- CONCEPT SAMPLES (clearly-labelled placeholders) ----
       These are visual concepts while real artwork for these occasions is
       being prepared. Replace each with real designs when ready.        */
    {
        id: "c001",
        name: "Golden Birthday Glow",
        type: "physical",
        occasion: "birthday",
        styles: ["Modern", "Black and Gold"],
        image: "assets/images/occasions/birthday.jpg",
        alt: "Golden birthday celebration concept preview",
        desc: "Concept preview — a bold black-and-gold birthday invitation design. Final artwork is customised for your celebration.",
        liveUrl: "",
        concept: true
    },
    {
        id: "c002",
        name: "Sparkling Birthday",
        type: "digital",
        occasion: "birthday",
        styles: ["Modern", "Black and Gold"],
        image: "assets/images/occasions/other.jpg",
        alt: "Sparkling celebration concept preview for a digital birthday invitation",
        desc: "Concept preview — an animated digital birthday invitation with countdown, photos and guest wishes (Deluxe features).",
        liveUrl: "",
        concept: true
    },
    {
        id: "c003",
        name: "Seal of Promise",
        type: "physical",
        occasion: "engagement",
        styles: ["Luxury", "White and Gold"],
        image: "assets/images/occasions/engagement.jpg",
        alt: "Elegant engagement celebration concept preview",
        desc: "Concept preview — a refined white-and-gold engagement card with monogram and wax-seal finish, tailored to your names and date.",
        liveUrl: "",
        concept: true
    },
    {
        id: "c004",
        name: "Candlelight Anniversary",
        type: "physical",
        occasion: "anniversary",
        styles: ["Elegant", "Traditional"],
        image: "assets/images/occasions/anniversary.jpg",
        alt: "Warm candlelit dinner concept preview for an anniversary invitation",
        desc: "Concept preview — a warm, romantic anniversary invitation celebrating years together, with elegant serif typography.",
        liveUrl: "",
        concept: true
    },
    {
        id: "c005",
        name: "Little Blessing",
        type: "digital",
        occasion: "baby-shower",
        styles: ["Modern", "Minimalist", "Floral"],
        image: "assets/images/occasions/babyshower.jpg",
        alt: "Soft pastel baby shower concept preview",
        desc: "Concept preview — a gentle digital baby-shower invitation with event details, countdown and RSVP.",
        liveUrl: "",
        concept: true
    },
    {
        id: "c006",
        name: "Cap & Laurel",
        type: "physical",
        occasion: "graduation",
        styles: ["Elegant", "Black and Gold"],
        image: "assets/images/occasions/graduation.jpg",
        alt: "Graduation celebration concept preview",
        desc: "Concept preview — a distinguished black-and-gold graduation card honouring a big achievement.",
        liveUrl: "",
        concept: true
    },
    {
        id: "c007",
        name: "Sacred Morning",
        type: "physical",
        occasion: "baptism",
        styles: ["Traditional", "Elegant"],
        image: "assets/images/occasions/baptism.jpg",
        alt: "Church interior concept preview for a baptism invitation",
        desc: "Concept preview — a reverent baptism invitation with soft sacred tones and traditional ornamentation.",
        liveUrl: "",
        concept: true
    }
];

/* Human-readable labels for occasion ids */
const OCCASION_LABELS = {
    "wedding": "Wedding",
    "birthday": "Birthday",
    "graduation": "Graduation",
    "baptism": "Baptism",
    "engagement": "Engagement",
    "anniversary": "Anniversary",
    "baby-shower": "Baby Shower",
    "other": "Other Occasions"
};

window.DESIGNS = DESIGNS;
window.OCCASION_LABELS = OCCASION_LABELS;
