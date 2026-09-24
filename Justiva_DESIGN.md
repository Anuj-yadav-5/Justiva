# Justiva --- Design System & UI Direction

## 1. Design Goal

Justiva should feel like a premium legal-tech SaaS product rather than a
generic AI chatbot.

Design keywords:

-   calm
-   trustworthy
-   intelligent
-   modern
-   editorial
-   premium
-   human
-   evidence-driven
-   minimal
-   approachable

The design is inspired by the provided SaaS reference video in visual
language and interaction quality, but the branding, copy, product UI,
imagery, and compositions must be original to Justiva.

------------------------------------------------------------------------

# 2. Brand Identity

## Brand

**JUSTIVA**

Conceptual meaning:

-   "Just" → justice, fairness
-   "-iva" → modern, distinctive brand ending

Justiva is a coined brand name, not a claim that it is an established
legal term.

## Brand line

> Legal answers, backed by evidence.

## Product philosophy

> AI explains. Evidence supports. Verification checks. You decide.

------------------------------------------------------------------------

# 3. Color System

## Primary dark

``` text
Forest Green
#12332F
```

Alternative:

``` text
#153B36
#0F2D29
```

Use for:

-   hero
-   major dark sections
-   footer
-   navigation on dark areas

## Primary light

``` text
Warm Ivory
#F7F5ED
```

Alternative:

``` text
#F4F1E8
```

Use for:

-   page backgrounds
-   content sections
-   large cards

## White

``` text
#FFFFFF
```

Use for:

-   cards
-   document UI
-   overlays

## Lime accent

``` text
#D9FF4A
```

Use for:

-   primary CTA
-   selected states
-   supported verification state
-   small highlights

## Cyan accent

``` text
#57E5E0
```

Use sparingly for:

-   secondary highlights
-   evidence connections
-   interactive indicators

## Neutral text

Primary:

``` text
#17201E
```

Secondary:

``` text
#5C6662
```

Muted:

``` text
#8A928F
```

------------------------------------------------------------------------

# 4. Typography

Preferred:

1.  Inter
2.  Manrope
3.  DM Sans

Use one primary font consistently.

## Hero

Desktop:

``` text
64–80px
line-height: 0.95–1.05
font-weight: 600–700
```

Tablet:

``` text
48–60px
```

Mobile:

``` text
36–44px
```

## Section heading

``` text
44–64px desktop
32–40px mobile
```

## Body

``` text
16–18px
line-height: 1.5–1.7
```

## Eyebrow

``` text
11–13px
uppercase
letter-spacing: 0.08–0.14em
```

------------------------------------------------------------------------

# 5. Layout

Maximum width:

``` text
1240–1320px
```

Container padding:

Desktop:

``` text
24–40px
```

Mobile:

``` text
16–20px
```

Major section spacing:

``` text
120–180px desktop
80–120px mobile
```

------------------------------------------------------------------------

# 6. Border Radius

Use a consistent rounded visual language.

Large sections:

``` text
28–36px
```

Cards:

``` text
20–28px
```

Buttons:

``` text
999px
```

Small controls:

``` text
12–16px
```

------------------------------------------------------------------------

# 7. Hero

The hero is the most visually important section.

Background:

Forest green.

Layout:

``` text
Eyebrow

Huge headline

Supporting paragraph

Primary CTA   Secondary CTA

Floating legal-AI interface
```

Suggested headline:

> Legal answers, backed by evidence.

Supporting copy:

> Understand documents, find relevant legal information, and verify
> AI-generated claims before you rely on them.

Primary button:

> Try Justiva Free →

Secondary:

> See How It Works

------------------------------------------------------------------------

# 8. Hero AI Card

Create a floating card showing:

``` text
JUSTIVA AI

Can I terminate this rental agreement early?

Answer

Your agreement allows early termination
under Section 8.2, subject to the stated
notice requirement.

EVIDENCE

✓ Rental Agreement — Section 8.2
✓ Relevant official source

SUPPORTED
```

The card should visually demonstrate the product.

------------------------------------------------------------------------

# 9. Navigation

Desktop:

``` text
JUSTIVA

Product
How It Works
Features
Evidence
Professionals

Log in
Get Started
```

Navbar:

-   sticky
-   transparent initially
-   subtle background after scrolling
-   subtle bottom border
-   smooth transition

Mobile:

Hamburger menu.

------------------------------------------------------------------------

# 10. Buttons

## Primary

``` text
background: #D9FF4A
text: #12332F
border-radius: 999px
```

Hover:

-   translate slightly
-   arrow moves
-   subtle brightness change

## Secondary

Dark background:

``` text
transparent
border: 1px solid rgba(255,255,255,0.25)
color: white
```

Light background:

``` text
transparent
border: 1px solid #D5D8D4
```

------------------------------------------------------------------------

# 11. Problem Section

Background:

Warm ivory.

Large heading:

> Legal language wasn't designed for everyday people.

Three cards:

### Complex Documents

Contracts can hide important information inside pages of difficult
language.

### Unverified Answers

A fluent AI response does not automatically mean the claim is supported.

### Information Overload

Relevant legal information may be difficult to find and interpret.

Cards should be visually spacious.

------------------------------------------------------------------------

# 12. Process Section

Background:

Dark green.

Heading:

> From document to evidence-backed answer.

Four cards:

``` text
01 Upload
02 Understand
03 Ask
04 Verify
```

Use large numbers.

On scroll:

-   cards reveal sequentially
-   slight vertical movement
-   opacity transition

------------------------------------------------------------------------

# 13. Evidence Graph

This is Justiva's signature visual.

Create:

``` text
             DOCUMENT
                 │
                 ↓
CLAIM → EVIDENCE → SOURCE
                 │
                 ↓
            VERIFICATION
```

Example:

``` text
CLAIM
"30 days notice is required."

        ↓

DOCUMENT
Rental Agreement
Section 8.2

        ↓

LEGAL SOURCE
Official source

        ↓

VERIFICATION
SUPPORTED
```

Use animated connection lines.

This component should feel unique to Justiva.

------------------------------------------------------------------------

# 14. Verification UI

Show:

``` text
AI CLAIM

The agreement requires 30 days notice.

────────────────────

EVIDENCE

Rental Agreement
Section 8.2

────────────────────

VERIFICATION

✓ SUPPORTED
```

Possible states:

``` text
SUPPORTED
PARTIALLY SUPPORTED
CONTRADICTED
UNSUPPORTED
INSUFFICIENT EVIDENCE
REVIEW REQUIRED
```

Do not use fake "97% confidence" UI.

------------------------------------------------------------------------

# 15. Document Interface

Large rounded container.

Left:

Document preview.

Right:

AI panel.

Example:

``` text
DOCUMENT

Rental Agreement

Page 7

[highlighted clause]
```

Right:

``` text
IMPORTANT DETAILS

Notice Period
30 days

Termination
Section 8.2

Penalty
₹25,000

Jurisdiction
...
```

------------------------------------------------------------------------

# 16. Feature Grid

Use asymmetric cards.

Large card:

> Ask Your Documents

Medium:

> Evidence Verification

Small:

> Timeline

Large:

> Document Comparison

Small:

> Clause Extraction

Medium:

> Lawyer Brief

Avoid making every card identical.

------------------------------------------------------------------------

# 17. Legal Research UI

Dark green section.

Search bar:

``` text
What does the law say about early termination?
```

Results:

``` text
OFFICIAL SOURCE

Relevant legislation
Section ...
Updated ...
```

``` text
JUDICIAL SOURCE

Relevant judgment
...
```

Each result should show:

-   source
-   authority
-   section
-   date
-   citation
-   open source action

------------------------------------------------------------------------

# 18. Trust Section

Large statement:

> When the evidence isn't enough, Justiva says so.

Show a large empty/insufficient state:

``` text
INSUFFICIENT EVIDENCE

We couldn't find enough authoritative
evidence to answer this reliably.

What you can do next:

• Provide more information
• Review the relevant clause
• Consult a qualified professional
```

This is an important brand moment.

------------------------------------------------------------------------

# 19. Comparison UI

Two document columns:

``` text
CONTRACT A                 CONTRACT B

₹20,000                    ₹25,000

30 days                    60 days

No liability clause        Liability added
```

Use subtle highlight backgrounds.

------------------------------------------------------------------------

# 20. Pricing Design

Three cards.

Free:

``` text
₹0
```

Personal:

``` text
₹499/month
```

Professional:

``` text
Custom
```

Do not visually manipulate users with excessive urgency.

------------------------------------------------------------------------

# 21. FAQ

Use rounded accordion rows.

Each row:

``` text
Is Justiva a lawyer?                     +
```

When opened:

Smooth height animation.

------------------------------------------------------------------------

# 22. Footer

Dark green.

Logo.

Tagline:

> AI explains. Evidence supports.

Columns:

Product\
Solutions\
Resources\
Legal

Include disclaimer.

------------------------------------------------------------------------

# 23. Motion Design

Use Framer Motion.

### Entrance

``` text
opacity: 0 → 1
y: 20 → 0
```

Duration:

``` text
0.5–0.8s
```

### Cards

Stagger:

``` text
0.08–0.12s
```

### Hover

``` text
scale: 1 → 1.02
```

### Buttons

Arrow movement:

``` text
x: 0 → 4
```

### Evidence Graph

Animate lines after the claim appears.

### Important

Motion must support understanding.

Do not animate everything.

------------------------------------------------------------------------

# 24. Scroll Behavior

Use natural smooth scrolling.

Section sequence:

``` text
Hero
↓
Problem
↓
Process
↓
Evidence
↓
Document Intelligence
↓
Features
↓
Comparison
↓
Legal Research
↓
Trust
↓
Professionals
↓
Testimonials
↓
Pricing
↓
FAQ
↓
CTA
↓
Footer
```

------------------------------------------------------------------------

# 25. Responsive Design

Mobile is not simply a smaller desktop.

Mobile changes:

-   hero becomes vertically stacked
-   AI card moves below CTA
-   feature cards stack
-   Evidence Graph becomes vertical
-   document preview and AI panel stack
-   comparison becomes sequential
-   pricing cards stack
-   navbar becomes hamburger

Maintain large rounded containers.

------------------------------------------------------------------------

# 26. Accessibility

Required:

-   semantic HTML
-   keyboard navigation
-   focus states
-   accessible buttons
-   aria labels
-   accessible accordion
-   readable contrast
-   reduced-motion support
-   alt text

------------------------------------------------------------------------

# 27. Design Don'ts

Do not use:

-   generic blue SaaS palette
-   excessive gradients
-   neon cyberpunk
-   random glassmorphism
-   AI robot illustrations
-   fake legal seals
-   gavel/courthouse clichés everywhere
-   huge amounts of text
-   fake statistics
-   fake client logos
-   fake testimonials presented as real

------------------------------------------------------------------------

# 28. Design Principle

The design should constantly communicate:

``` text
Question
   ↓
Claim
   ↓
Evidence
   ↓
Verification
   ↓
Understanding
```

The product's visual identity should be based on **traceability**, not
just AI.

------------------------------------------------------------------------

# 29. Visual Quality Target

The final result should feel like:

-   premium SaaS
-   design-studio quality
-   calm legal technology
-   modern editorial website
-   strong motion design
-   polished product UI

It should not feel like:

-   a college project template
-   a generic dashboard
-   a ChatGPT clone
-   a government portal
-   a law-firm website
