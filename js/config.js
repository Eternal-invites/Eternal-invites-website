/* ==========================================================================
   Eternal Invites — CENTRAL SITE CONFIGURATION
   --------------------------------------------------------------------------
   Edit business details in this ONE file. Every page (header, footer,
   contact page, order form) reads from here — no need to edit the HTML.
   ========================================================================== */

const SITE_CONFIG = {

    /* ---- Business identity ------------------------------------------- */
    businessName: "Eternal Invites",
    tagline: "Your Story, Beautifully Invited.",
    footerTagline: "Made with creativity for your unforgettable moments.",

    /* ---- Contact details (verified) -----------------------------------
       Phone: 0941187172                                               */
    phone: "0941187172",
    phoneInternational: "+251941187172",   // used for tel: / wa.me links

    /* Email — add the real address here when available, e.g.:
       email: "hello@eternalinvites.com"  . Leave "" to hide it.        */
    email: "",

    /* Business location — fill in when confirmed, e.g. "Addis Ababa, Ethiopia".
       Leave "" to hide the location row.                                */
    location: "",

    /* ---- Social profiles ----------------------------------------------
       Usernames below are verified from the brand artwork. The profile
       URLs use each platform's standard address format; confirm them and
       replace with the exact profile URLs if they differ.               */
    social: {
        tiktok: {
            username: "eternal_invites",
            url: "https://www.tiktok.com/@eternal_invites"   // verify & replace if needed
        },
        instagram: {
            username: "eternal_invites",
            url: "https://www.instagram.com/eternal_invites" // verify & replace if needed
        },
        telegram: {
            username: "",                                    // e.g. "eternal_invites"
            url: ""                                          // e.g. "https://t.me/eternal_invites"
        }
    },

    /* ---- Form submission (REQUIRED SETUP) -----------------------------
       This is a static site — form data must be sent to an external
       service. Create a FREE form at https://formspree.io (or Web3Forms)
       and paste your endpoint below, e.g.:
           orderFormEndpoint:   "https://formspree.io/f/abcdwxyz",
           contactFormEndpoint: "https://formspree.io/f/efghstuv",
       Leave "" until configured — the forms will then show a notice with
       the phone contact instead. See README.md for step-by-step setup.  */
    orderFormEndpoint: "",
    contactFormEndpoint: "",

    /* ---- Digital invitation packages (VERIFIED PRICES — do not change
       unless the business owner confirms new prices) ------------------- */
    packages: [
        {
            id: "basic",
            name: "Basic Package",
            price: 4500,
            currency: "birr",
            features: [
                "Basic event information",
                "4 photos",
                "Location",
                "Countdown timer"
            ]
        },
        {
            id: "premium",
            name: "Premium Package",
            price: 5500,
            currency: "birr",
            featured: true,
            features: [
                "Basic event information",
                "8 photos",
                "Location",
                "Events in the program",
                "Countdown timer"
            ]
        },
        {
            id: "deluxe",
            name: "Deluxe Package",
            price: 7000,
            currency: "birr",
            features: [
                "Basic event information",
                "10 photos in a photo gallery",
                "Location",
                "Events in the program",
                "Countdown timer",
                "RSVP form",
                "Guests' wishes",
                "Background music"
            ]
        }
    ],

    /* ---- Occasions supported ----------------------------------------- */
    occasions: [
        { id: "wedding",     label: "Wedding" },
        { id: "birthday",    label: "Birthday" },
        { id: "graduation",  label: "Graduation" },
        { id: "baptism",     label: "Baptism" },
        { id: "engagement",  label: "Engagement" },
        { id: "anniversary", label: "Anniversary" },
        { id: "baby-shower", label: "Baby Shower" },
        { id: "other",       label: "Other" }
    ]
};

/* Price helper: 4500 -> "4,500 birr" */
function formatPrice(pkg) {
    return pkg.price.toLocaleString("en-US") + " " + pkg.currency;
}

/* Make config available to other scripts */
window.SITE_CONFIG = SITE_CONFIG;
window.formatPrice = formatPrice;
