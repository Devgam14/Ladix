# DESIGN.md — Product UI Design Rules for Coding Agents

> Purpose: Build web apps that feel intentional, premium, fast, readable, and production-ready. Use these rules as the default design system unless the product brief or an existing repository design system clearly requires something else.

## 1. Design direction

Create a **calm, precise, modern product interface** inspired by the craft of Linear, the typography and component discipline of Geist, and the flexibility of shadcn/ui. Do not copy another company’s brand, exact page, logo, or signature composition.

The interface should feel:
- Clear before clever: the user’s main task is obvious immediately.
- Crafted, not decorated: alignment, type, spacing, and hierarchy do most of the work.
- Dense only when the job calls for it: dashboards can be information-rich without feeling cramped.
- Consistent across routes, with enough layout variation that every page does not look like the same template.
- Responsive and accessible, not just attractive at one desktop size.

**First decide what the user came to do.** Then design the information hierarchy around that task. Do not default every route to a hero, three feature cards, and a gradient.

## 2. Start by understanding the project

Before changing UI, inspect the existing repository and identify:
1. Framework, routing, styling method, and current component library.
2. Existing tokens, fonts, icons, layouts, and reusable components.
3. The page’s primary user, primary task, and most important action.
4. Existing constraints such as authentication, real data, API states, and mobile support.

Reuse the current stack and components where sensible. Do not replace working architecture, add a UI library, or introduce a new font dependency without a clear reason. If the project already has a design system, extend it instead of creating a competing one.

## 3. Typography

### Font roles

- **Primary UI and headings:** Geist Sans.
- **Code, wallet addresses, transaction IDs, and tabular technical values:** Geist Mono.
- If Geist is not available and adding it is not appropriate, use the existing project font; otherwise use Inter, then a system sans-serif fallback.
- Do not mix more than two font families. Never choose a decorative font for a data-heavy product UI.

Suggested font stack:

```css
font-family: "Geist", "Inter", ui-sans-serif, system-ui, -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;
```

### Type scale

Use a deliberate scale; exact values may adapt to the content and existing framework.

| Role | Size / line height | Weight | Guidance |
|---|---:|---:|---|
| Display | `clamp(2.75rem, 6vw, 5rem)` / 1.0–1.08 | 600–700 | Marketing pages only; short headline |
| Page title | 2rem–2.5rem / 1.15 | 600–650 | One clear H1 per page |
| Section title | 1.375rem–1.75rem / 1.25 | 600 | Major page sections |
| Component title | 1rem–1.125rem / 1.4 | 550–600 | Cards, panels, dialogs |
| Body | 0.9375rem–1rem / 1.55–1.7 | 400 | Main reading text |
| UI label | 0.8125rem–0.875rem / 1.4 | 450–550 | Navigation, forms, table labels |
| Small metadata | 0.75rem–0.8125rem / 1.45 | 400–500 | Timestamps and supporting details; avoid for key content |

Rules:
- Use tight negative letter spacing on large headings only; keep body text comfortable to read.
- Use sentence case for labels and headings. Avoid unnecessary all-caps labels.
- Keep line lengths around 45–80 characters for long-form copy.
- Use tabular numerals for prices, percentages, balances, and changing values.
- Establish hierarchy with size, weight, and contrast before introducing another color.
- Do not make all text bold or use muted gray for information users need to act on.

## 4. Color system

Use semantic tokens rather than scattering raw color values across components. The default is a neutral, dark-first palette with a restrained violet-blue accent. Apply the same semantic roles in light mode. A product’s brand may replace the accent, but keep the rest of the palette disciplined.

### Dark theme defaults

```css
:root {
  color-scheme: dark;
  --background: #0b0d12;
  --surface: #11141b;
  --surface-raised: #171b24;
  --surface-hover: #202633;
  --foreground: #f5f7fb;
  --muted: #a1a8b7;
  --subtle: #788193;
  --border: rgba(255, 255, 255, 0.09);
  --border-strong: rgba(255, 255, 255, 0.16);
  --primary: #8b7cff;
  --primary-hover: #a196ff;
  --primary-foreground: #ffffff;
  --focus-ring: #aaa0ff;
  --success: #34d399;
  --warning: #fbbf24;
  --danger: #fb7185;
  --info: #60a5fa;
  --radius-control: 0.625rem;
  --radius-card: 0.875rem;
  --radius-panel: 1.125rem;
}
```

### Light theme defaults

```css
[data-theme="light"] {
  color-scheme: light;
  --background: #f7f8fa;
  --surface: #ffffff;
  --surface-raised: #ffffff;
  --surface-hover: #f0f1f6;
  --foreground: #171923;
  --muted: #62697a;
  --subtle: #7d8493;
  --border: rgba(18, 24, 40, 0.10);
  --border-strong: rgba(18, 24, 40, 0.18);
  --primary: #6754e8;
  --primary-hover: #5643d6;
  --primary-foreground: #ffffff;
  --focus-ring: #6754e8;
  --success: #087f5b;
  --warning: #966000;
  --danger: #c5344d;
  --info: #245fc7;
}
```

Color rules:
- Background, surfaces, borders, and text should carry most of the interface. Accent color is for actions, selected states, and important highlights—not every icon or card.
- Use semantic colors consistently for success, warning, danger, and information. Never communicate status using color alone; include text or an icon too.
- Preserve readable contrast. Test muted labels, disabled-looking controls, chart labels, and focus indicators—not just large headings.
- Avoid pure-black surfaces paired with pure-white text everywhere. Use small surface shifts to establish hierarchy.
- Do not add a gradient unless it serves a clear visual purpose. If used, make it subtle and keep text contrast high.

## 5. Spacing, layout, and shape

Use a 4px base spacing rhythm. Prefer values from this scale: **4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px**.

- Typical desktop page padding: 24–32px; mobile page padding: 16–20px.
- Keep main content at a useful reading width. For app screens, use the available width; for marketing or documentation copy, constrain long text instead of stretching it edge to edge.
- Marketing content commonly maxes out around 1120–1200px. A data table or chart may use the full available content width.
- Use a clear grid and align section headings, content, controls, and tables to consistent edges.
- Dashboard sidebars are usually 224–264px wide on desktop; collapse to a drawer or compact navigation on small screens.
- Use 10px–12px radius for controls, 12px–16px for normal cards, and up to 18px for large panels. Reserve pill shapes for chips, status tags, and truly pill-shaped controls.
- Prefer a subtle border and good spacing over a shadow on every component. Use elevation sparingly to distinguish floating menus, dialogs, or draggable content.
- Leave enough empty space to clarify hierarchy, but do not waste space in dense workflow screens.

## 6. Core components

### Buttons

- Provide clear primary, secondary, subtle/ghost, and destructive variants only when needed.
- Standard button height: 40–44px; compact controls should remain easy to target.
- Use concise, action-oriented labels such as “Create project”, “Save changes”, or “Connect wallet”.
- Make hover, pressed, disabled, loading, and keyboard-focus states visibly distinct.
- A page should usually have one visually dominant primary action per decision area. Do not style every button as primary.
- Avoid oversized, full-width buttons on desktop unless the task benefits from them.

### Inputs and forms

- Inputs should have visible labels. Placeholders are examples, not substitutes for labels.
- Keep input heights around 40–44px and use consistent internal padding.
- Show helper text, validation errors, and required state near the field they describe.
- Preserve entered values when validation fails. Make error copy specific and tell the user how to recover.
- Group related fields and break long forms into understandable sections.

### Cards and panels

- A card must have a job: group related information, provide a distinct interaction, or create meaningful separation.
- Do not wrap every text block in a card. Use page background, spacing, typography, and dividers to establish structure too.
- Keep card padding consistent, typically 16–24px. Use the same radius and border treatment for sibling components.
- Avoid nested-card mazes. If a card contains several cards, consider a table, list, or simpler section layout instead.

### Navigation

- Make the current location obvious through a subtle but clear active state.
- Use consistent icon size, alignment, label spacing, and click targets.
- Tooltips are for supplementary icon-only controls, not a replacement for primary navigation labels.
- Keep navigation structure stable across the app. Do not invent a different sidebar or header on every route.

### Tables and data

- Use a real table for comparable records and a card/list pattern for small-screen summaries when appropriate.
- Let important tables use the available content width. Do not squeeze evidence or operational data into a narrow prose column when there is room.
- Align numeric values consistently; use tabular numerals and clear units.
- Keep row heights and column spacing comfortable, with clear headers, hover states, and visible sorting/filtering where supported.
- Prefer quiet row dividers and restrained status badges to thick borders and brightly colored cells.
- Show units, time zones, date formats, and currency clearly. Do not fabricate live metrics or imply mock data is real.

### Charts and financial interfaces

- Label axes, time ranges, units, and series clearly. Use grid lines lightly and avoid decorative chart clutter.
- Keep status colors consistent: gains/success and losses/errors must be distinguishable, but never rely on color alone.
- Make important values readable without hover; tooltips should add detail, not hide essential context.
- For trading or finance UIs, make price, size, fees, slippage, timestamps, and transaction status legible. Distinguish estimated values from confirmed values.
- Never present example balances, market data, performance, or trade outcomes as real. Clearly label demo or simulated data.

### Icons

- Use the icon set already present in the project. If none exists, prefer Lucide-style outline icons and add a dependency only if justified.
- Keep icon size, stroke, alignment, and color consistent. Typical sizes are 16px in controls and 18–20px for navigation.
- Use icons to improve scanning, not as decoration. Add accessible labels for icon-only buttons.
- Do not use emoji as interface icons in a polished professional product.

## 7. Page composition

### Product dashboards and tools

1. Start with a compact app shell: navigation, a clear page title, and relevant page actions.
2. Put the most useful status or key information near the top, but only when it helps the user’s current task.
3. Group related controls with the content they affect.
4. Use a consistent grid, usually 12 columns on desktop, and collapse it deliberately for tablet and mobile.
5. Use cards for metrics or distinct work areas—not as the default wrapper for every element.
6. Make important actions and changes easy to find without making the entire screen compete for attention.

### Marketing and landing pages

1. Use one unmistakable main message, a short supporting explanation, and one primary call to action.
2. Show the actual product or a meaningful visual explanation early; do not rely on abstract gradients to fill the hero.
3. Follow with evidence and useful details in an order that answers likely user questions.
4. Use deliberate section variation—such as a feature demonstration, comparison, workflow, or customer proof—instead of repeating the same three-card grid.
5. Keep the reading width comfortable and the next action obvious.
6. Never invent customer logos, testimonials, security claims, or performance metrics.

### Forms, onboarding, and settings

- Make the next step obvious and explain consequences before high-impact actions.
- Keep related settings together and use helpful defaults where safe.
- Make destructive actions visually distinct and require confirmation when the consequence is significant.
- Show progress for multi-step flows and preserve the user’s input when they go back.

## 8. Interaction and motion

- Every control that looks interactive must work. Do not ship decorative buttons, dead links, or inert filters.
- Use quick, subtle transitions—usually 150–220ms—for color, opacity, and small position changes.
- Avoid springy animation, constant motion, parallax, and large entrance animations in routine product workflows.
- Respect `prefers-reduced-motion`.
- Use visible focus states and ensure all actions work with a keyboard.
- Dialogs and menus must open, close, handle Escape appropriately, and return focus sensibly.
- Explain long-running work with a progress indicator or status message. Prevent accidental duplicate submissions where practical.

## 9. Responsive behavior

Design for mobile, tablet, and desktop instead of shrinking the desktop layout.

- Start with a clean single-column layout on small screens; introduce columns when space supports them.
- Use responsive typography and avoid clipping headings or buttons.
- Convert a desktop sidebar to a drawer or compact navigation on smaller screens.
- Keep primary actions reachable and avoid horizontal page overflow.
- Tables may scroll horizontally or switch to a carefully chosen summary/list representation; do not silently hide important fields.
- Charts must resize without losing labels or tooltips.
- Verify at minimum around 375px, 768px, 1024px, and 1440px widths.

## 10. Accessibility and trust

- Use semantic HTML and a logical heading order.
- Provide labels for inputs and accessible names for icon-only controls.
- Ensure keyboard navigation, visible focus, adequate contrast, and meaningful error messages.
- Do not communicate state by color alone.
- Avoid relying on hover as the only way to reveal key information.
- Make disabled, loading, success, empty, and error states explicit.
- Use honest language. Do not fabricate data, testimonials, ratings, user counts, or “live” activity.

## 11. Empty, loading, success, and error states

Build the full experience, not just the ideal populated screen.

- **Loading:** use a lightweight skeleton or progress state that roughly matches the final layout; avoid flashing large blank panels.
- **Empty:** explain why the area is empty when known and offer a relevant next action.
- **Error:** say what failed in plain language and provide a retry or recovery action where possible.
- **Success:** confirm what happened and what the user can do next; avoid unnecessary celebration animations.
- **Disabled:** show why an action is unavailable when the reason may not be obvious.

## 12. Patterns to avoid

Do not ship any of these without a clear product-specific reason:

- Generic “AI-generated SaaS” pages: giant gradient hero, three identical cards, logo strip, FAQ, and nothing specific to the product.
- The same dashboard template copied across every route regardless of the job the page performs.
- Excessive rounded cards, nested cards, and pills around ordinary text.
- Purple/blue accents on every surface or gradients behind every heading.
- Glassmorphism, heavy blur, neon glows, giant shadows, or decorative borders used to make a page seem more designed.
- Center-aligning long content or making every section the same width.
- Tiny low-contrast text, weak focus states, inconsistent icon styles, or placeholder-only form labels.
- Fake charts, meaningless KPI cards, fake testimonials, or fabricated user/activity data.
- Unicode symbols and emoji in place of consistent product icons.
- New dependencies and wholesale rewrites that are not needed for the requested change.

## 13. Implementation rules

- Store design decisions in shared theme variables or the project's existing token system.
- Prefer semantic names such as `background`, `surface`, `foreground`, `muted`, `border`, `primary`, `success`, and `danger` over hard-coded colors in each component.
- Build on existing primitives. Create shared variants for buttons, inputs, badges, and cards instead of re-styling each use independently.
- Keep components focused and avoid overly abstract design-system code for a one-off page.
- Use the project’s established styling conventions. For Tailwind or shadcn/ui, map the palette into theme tokens and use semantic utilities.
- Keep real behavior, validation, routing, and data logic intact while improving visuals.
- Do not claim the interface has been tested unless you actually ran the available checks.

## 14. Visual quality-control checklist

Before finishing, inspect the actual rendered page when browser or screenshot tooling is available. Fix issues instead of merely reporting them.

- [ ] The page’s main purpose and primary action are obvious within a few seconds.
- [ ] Type scale, line height, and weight are consistent.
- [ ] Spacing and alignment follow a deliberate rhythm.
- [ ] Colors use semantic tokens and have sufficient contrast.
- [ ] Cards, radii, borders, buttons, inputs, and icons feel like one system.
- [ ] Content hierarchy fits the specific task instead of forcing a stock template.
- [ ] Desktop and mobile layouts both work, with no clipping or horizontal overflow.
- [ ] Interactive controls have real behavior and all key states are implemented.
- [ ] Loading, empty, success, and error states are handled where relevant.
- [ ] No fabricated information, broken links, dead controls, or obvious console errors remain.
- [ ] Existing project behavior and conventions have not been needlessly broken.

## 15. Expected agent workflow

1. Inspect the repo and find existing design primitives before coding.
2. State the page’s primary user task in one sentence internally, then choose a hierarchy that serves it.
3. Implement the smallest coherent set of token and component changes needed.
4. Build the complete responsive state, including interactive and failure states.
5. Run the project’s available lint, typecheck, and tests where practical.
6. Review a rendered screenshot at desktop and mobile sizes when tooling is available.
7. Fix the three most visible quality problems before declaring the work finished.
8. In the final summary, list the meaningful UI changes and disclose any checks that could not be run.

## 16. Reference library

Use these for study and inspiration. Extract principles; do not clone their brands or pages.

- **Vercel `design.md`:** https://vercel.com/design.md — a public example of design guidance written for coding agents.
- **Geist design system:** https://vercel.com/geist/introduction — typography, colors, and product UI components.
- **Geist typography:** https://vercel.com/geist/typography — type hierarchy and text roles.
- **Linear:** https://linear.app/ — restrained product UI, issue lists, navigation, and dense workflows.
- **shadcn/ui theming:** https://ui.shadcn.com/docs/theming — semantic theme variables and consistent component colors.
- **Stripe:** https://stripe.com/ — polished product marketing, explanatory content, and conversion-focused page hierarchy.

## Final instruction

**Make the interface feel designed, not decorated.** Favor clear hierarchy, deliberate spacing, consistent tokens, credible content, and working behavior over visual effects. Preserve the product’s identity and choose the composition that best serves the user’s task.
