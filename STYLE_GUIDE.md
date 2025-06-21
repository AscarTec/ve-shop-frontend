# Dashboard Layout Guide

## Breakpoints

| Range | Sidebar Behaviour |
|-------|------------------|
| `< lg` | Hidden by default. Toggle shows full-screen overlay. |
| `lg – xl` | Mini rail (`w-16`) collapsed. Toggle expands to `w-72`. |
| `≥ 2xl` | Expanded by default (`w-72`). Toggle collapses to `w-16`. |

RTL layouts mirror these positions.

```
           < lg      lg–xl     ≥2xl
LTR  | [  overlay ] [ mini ] [ full ]
RTL  | [ overlay ] [ mini ] [ full ]
```

## Spacing Rules

Header and main content apply `ml`/`mr` margins equal to the sidebar width on large screens. When the sidebar toggles, both elements update using the `sidebar` transition property for smooth motion.

```
Mini  ───┐ header/main: lg:ml-16  (rtl: lg:mr-16)
Full  ───┤ header/main: lg:ml-72  (rtl: lg:mr-72)
```

## Spinner Usage

Use `<Spinner size="sm" />` inside buttons and `<Spinner size="xl" />` for page overlays. Colors adapt via the `color` prop (`primary`, `muted`, or `white`).
