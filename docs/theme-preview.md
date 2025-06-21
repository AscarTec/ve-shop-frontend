# Theme Preview

The design system defines matching light and dark palettes using CSS variables.
The snippet below demonstrates the two modes side by side.

```html
<div class="flex gap-6">
  <div class="p-6 rounded-lg bg-[hsl(var(--color-bg))] text-[hsl(var(--color-text))] shadow w-40 text-center">
    Light
  </div>
  <div class="p-6 rounded-lg bg-[hsl(var(--color-bg))] text-[hsl(var(--color-text))] shadow dark w-40 text-center">
    Dark
  </div>
</div>
```

Applying the `dark` class will toggle all variables and transition smoothly.
