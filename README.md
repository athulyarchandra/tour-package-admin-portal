# Tour Management Dashboard

A React-based Tour Management Dashboard built using PrimeReact components for managing and creating tour packages. The application provides an intuitive interface for viewing, filtering, and creating tour packages through reusable components and multi-step forms.

## Features

### Dashboard
- View all tour packages in a PrimeReact DataTable.
- Pagination with custom paginator.
- Row selection.
- Sorting on multiple columns.
- Row highlighting based on package status.
- Status badges using PrimeReact Tag.
- Tour package preview.
- Reset filters functionality.

### Tour Package Creation
- Multi-step tour package creation flow.
- Progress indicator showing current step.
- General Information page.
- Tour Details section.
- Tour Package About.
- Tour Highlights.
- Inclusions & Exclusions.
- Booking Policies.
- Cancellation Policies.
- Rules & Regulations.
- Tour Images section.
- Tour Operator Details.

### Form Features
- Reusable form components.
- Floating labels.
- Calendar selection.
- Dropdowns.
- Number inputs.
- Radio buttons.
- Rich text editor.
- Form validation using Zod.

### UI Components
- Reusable Modal.
- Reusable Spinner.
- Reusable Section Cards.
- Preview Overlay Panel.
- Breadcrumb Navigation.


# Technologies Used

- React
- React Router DOM
- PrimeReact
- PrimeIcons
- PrimeFlex
- Tailwind CSS
- CSS
- Zod

---

# Project Structure

```
src
│
├── components
│   ├── common
│   │   ├── FormInput
│   │   ├── FormDropdown
│   │   ├── FormCalendar
│   │   ├── FormNumberInput
│   │   ├── FormRadioGroup
│   │   ├── FormEditor
│   │   ├── SectionCard
│   │   ├── Modal
│   │   ├── Spinner
│   │   └── Preview
│   │
│   ├── forms
│   │   ├── TourDetails
│   │   ├── TourImages
│   │   ├── TourOperatorDetails
│   │   └── ProgressBar
│   │
│   ├── hooks
│   │   ├── useValidation
│   │   └── useFilter
│   │
│   └── contexts
│       └── FilterContext
│
├── constants
│   └── tourConfig
│
├── pages
│   ├── Dashboard
│   ├── General
│   └── TourPackageAbout
│
└── App.jsx
```

---

# Reusable Components

The application is built using reusable UI components to improve maintainability and reduce duplicate code.

Components include:

- FormInput
- FormDropdown
- FormCalendar
- FormNumberInput
- FormRadioGroup
- FormEditor
- Modal
- Spinner
- Preview
- SectionCard

---

# State Management

The application uses:

- useState for local component state.
- Context API for sharing filter state across components.
- Custom Hooks for reusable logic.

---

# Validation

Form validation is implemented using **Zod**.

Validation is separated from UI using a custom hook.

```
useValidation()
```

This keeps validation logic reusable and maintainable.

---

# Routing

React Router is used for navigation.

The application uses a shared Dashboard Layout with **Outlet**, allowing the Header and Sidebar to remain common across all pages while only the page content changes.

---

# Styling

Styling is implemented using:

- Tailwind CSS
- PrimeFlex
- Custom CSS

PrimeReact component styles are customized using CSS overrides for:

- DataTable
- Calendar
- InputNumber
- RadioButton
- Dropdown
- Scrollbars
- Paginator

---

# Data Handling

The project currently uses constant configuration files for storing:

- Tour Types
- Travel Modes
- Tour Categories
- Dashboard data

Keeping configuration separate from UI improves maintainability and reusability.

---

# Custom Hooks

## useValidation

Handles reusable form validation.

## useFilter

Provides global filter state using Context API.

---

# Context API

Filter values are managed globally using Context API to avoid prop drilling.

Shared values include:

- Tour Type
- Tour Category
- Tour Name
- Withdrawal Date

---

# User Experience Features

- Responsive layout
- Floating labels
- Rich text editor
- Loading spinner
- Slide-in modal
- Overlay preview
- Custom progress bar
- Dynamic dropdowns
- Date validation
- Reusable form controls

---

# Future Improvements

- Backend integration
- PostgreSQL database
- REST API integration
- File upload API
- Search with debounce
- Backend filtering
- Authentication
- React Query integration

---

# Author

Athulya R Chandra
