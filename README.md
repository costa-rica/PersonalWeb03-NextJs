# Personal Web 03 - Next.js

Personal Web 03 is a personal webpage built with Next.js and Tailwind CSS. It features a modern, responsive design and includes sections for project, resume, blog posts, a hero section.

## API Reference

This application connects to an API backend. API docuemtnation if found in the docs/API_REFERENCE.md and `docs/api` directory.

## Modals

This project uses a **Container/Content Modal Architecture** that separates infrastructure concerns from business logic. The pattern provides a reusable modal wrapper (`Modal`) combined with specialized content components (`ModalInformationOk`, `ModalInformationYesOrNo`, etc.).

### Container/Content Modal Architecture

This architecture splits modal functionality into two layers:

1. **Container Layer**: Handles backdrop rendering, positioning, keyboard events (ESC), click-outside-to-close, scroll locking, and z-index management
2. **Content Layer**: Manages business logic, form state, validation, and user interactions

This separation allows you to mix and match the same wrapper with different content components, promoting reusability and maintainability across the application.

### Modal Wrapper (`src/components/ui/modal/index.tsx`)

The `Modal` component is the foundational wrapper that provides:

- Fixed overlay with backdrop blur effect
- ESC key listener for closing
- Click-outside detection
- Body scroll locking when open
- Optional close button (X in top-right)
- Fullscreen mode support
- Controlled component pattern via `isOpen` prop

**Why we need it**: Without this wrapper, every modal would need to reimplement backdrop rendering, keyboard handling, scroll locking, and positioning logic. The wrapper centralizes these concerns, ensuring consistent behavior across all modals in the application.

### ModalInformationOk (`src/components/ui/modal/ModalInformationOk.tsx`)

A pre-built content component for alert/notification modals. Displays a title, message, and single action button.

**Features**:

- Variant-based styling: `info`, `success`, `error`, `warning`
- Customizable button text
- Colored message box matching variant
- Executes optional callback before closing

**Usage**:

```tsx
<Modal isOpen={show} onClose={handleClose}>
  <ModalInformationOk
    title="Success"
    message="Operation completed successfully"
    variant="success"
    onClose={handleClose}
  />
</Modal>
```

### ModalInformationYesOrNo (`src/components/ui/modal/ModalInformationYesOrNo.tsx`)

A confirmation dialog content component with two action buttons.

**Features**:

- Customizable Yes/No button text
- Button styling variants: `danger` (red) or `primary` (brand color)
- Separate callbacks for Yes and No actions
- Grey secondary button for cancel/no action

**Usage**:

```tsx
<Modal isOpen={show} onClose={handleClose}>
  <ModalInformationYesOrNo
    title="Delete Report?"
    message="This action cannot be undone."
    onYes={handleDelete}
    onClose={handleClose}
    yesButtonText="Yes, Delete"
    yesButtonStyle="danger"
  />
</Modal>
```

Both content components handle their own internal logic and automatically close the modal after executing their callbacks, making them self-contained and easy to use.
