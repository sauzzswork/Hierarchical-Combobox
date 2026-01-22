# Hierarchical Combobox

A fully accessible, scalable **hierarchical combobox** built entirely from scratch using  
**React, TypeScript, Tailwind CSS, and Storybook**.

This component supports async tree loading, manual virtualization, keyboard-first
navigation, and multi-select with indeterminate states — without using any
pre-built UI component libraries.

---

## ✨ Features

- Async hierarchical tree loading
- Manual list virtualization (no third-party virtualization libraries)
- Search with ancestry visibility
- Multi-select with indeterminate parent states
- Keyboard-first navigation (Arrow keys, Enter, Space)
- Screen-reader friendly (ARIA compliant)

---

## 🧠 Architecture Highlights

- Normalized tree state (`nodes` + `rootIds`)
- Pure tree flattening and virtualization layers
- Roving focus model using `aria-activedescendant`
- Selection state decoupled from tree state
- Clear separation between logic and UI components

---

## ♿ Accessibility

- Fully keyboard operable
- Follows WAI-ARIA Combobox and TreeView patterns
- Stable focus during virtualization
- Indeterminate checkbox states correctly exposed

ARIA roles and attributes were manually verified using browser DevTools, including:
- `role="combobox"`
- `role="tree"`
- `role="treeitem"`
- `aria-expanded`
- `aria-activedescendant`

Accessibility was further validated using **Storybook v10 built-in a11y checks**.

---

## 📘 Storybook

The component is documented and tested using Storybook.

Included stories:
- Default usage
- Keyboard-only usage
- Empty state
- Loading state
- Error state

👉 **Storybook Preview:**  
https://www.chromatic.com/library?appId=REPLACE_WITH_YOUR_LINK

---

## 🛠 Tech Stack

- React
- TypeScript
- Tailwind CSS
- Storybook (Vite)
- Chromatic (for Storybook preview)

---

## 🚀 Running Locally

```bash
npm install
npm run dev
npm run storybook
