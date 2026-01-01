# Inam UI - Version 0.1 Release Plan

## Executive Summary

Version 0.1 should focus on delivering a **solid, production-ready foundation** with the most essential components that users need for basic application development. The goal is to release a **stable, well-documented, and tested** minimal viable product rather than a feature-heavy but potentially buggy release.

## Current Inventory

### Components Available (17 total)

Based on the codebase analysis, the following components exist:

| Component | Category | Complexity | Status                             |
| --------- | -------- | ---------- | ---------------------------------- |
| Accordion | Layout   | High       | In docs but NOT in CLI registry ⚠️ |
| Alert     | Feedback | Medium     | ✓ Complete                         |
| Badge     | Feedback | Low        | ✓ Complete                         |
| Button    | Form     | Medium     | ✓ Complete                         |
| Card      | Layout   | Medium     | ✓ Complete                         |
| Checkbox  | Form     | Low        | ✓ Complete                         |
| Dropdown  | Overlay  | High       | ✓ Complete                         |
| Input     | Form     | Low        | ✓ Complete                         |
| Modal     | Overlay  | High       | ✓ Complete                         |
| Progress  | Progress | Low        | ✓ Complete                         |
| Radio     | Form     | Low        | ✓ Complete                         |
| Select    | Form     | Very High  | In docs but NOT in CLI registry ⚠️ |
| Skeleton  | Feedback | Low        | In docs but NOT in CLI registry ⚠️ |
| Spinner   | Progress | Low        | ✓ Complete                         |
| Switch    | Form     | Low        | ✓ Complete                         |
| Textarea  | Form     | Medium     | ✓ Complete                         |
| Tooltip   | Overlay  | Medium     | ✓ Complete                         |

> [!WARNING]
> **Registry Mismatch Found**: Three components (Accordion, Select, Skeleton) exist in the docs but are NOT registered in the CLI `componentRegistry.ts`. These need to be added to the CLI before they can be included in v0.1.

---

## Version 0.1 Component Selection

### ✅ INCLUDE - Core Components (10 components)

These form the essential building blocks that users expect in any UI library:

#### **Form Components (6)**

1. **Button** ⭐ Priority 1
   - **Keep Features**: All variants (primary, secondary, outline, ghost, link, success, destructive), all sizes, loading state, fullWidth
   - **Rationale**: Most frequently used component, well-implemented with good variant coverage

2. **Input** ⭐ Priority 1
   - **Keep Features**: Label, error states, helper text, disabled, required, fullWidth
   - **Rationale**: Essential for forms, simple and stable

3. **Checkbox** ⭐ Priority 1
   - **Keep Features**: Basic checked/unchecked states, disabled, label
   - **Defer**: Indeterminate state (add in v0.2)

4. **Radio** ⭐ Priority 2
   - **Keep Features**: Basic radio button functionality, group support, label
   - **Defer**: Advanced styling variants (add in v0.2)

5. **Switch** ⭐ Priority 2
   - **Keep Features**: Toggle functionality, label, checked state
   - **Defer**: Size variants (add in v0.2)

6. **Textarea** ⭐ Priority 2
   - **Keep Features**: Basic outlined variant, label, error states, required
   - **Defer**: Filled/underlined variants, auto-resize, character counter (add in v0.2-0.3)

#### **Layout Components (1)**

7. **Card** ⭐ Priority 1
   - **Keep Features**: Default and outlined variants, basic sub-components (Header, Content, Footer)
   - **Defer**: Elevated, gradient, interactive variants, image support (add in v0.2)

#### **Feedback Components (2)**

8. **Alert** ⭐ Priority 1
   - **Keep Features**: All variants (info, success, warning, error), title, dismissible
   - **Rationale**: Critical for user feedback, well-defined component

9. **Badge** ⭐ Priority 1
   - **Keep Features**: All variants, all sizes
   - **Rationale**: Low complexity, high utility

#### **Progress Components (1)**

10. **Spinner** ⭐ Priority 1
    - **Keep Features**: Circular type, default and primary variants, all sizes
    - **Defer**: Dots and bars types (add in v0.2)

---

### ⏸️ DEFER - Complex Components (7 components)

These should be postponed to ensure quality and allow time for proper testing:

#### **Defer to v0.2 (Next Release - 3-4 months)**

1. **Tooltip** - Medium complexity, requires positioning logic
2. **Progress** - Simple but not as essential as spinner
3. **Modal** - High complexity, requires focus management and accessibility testing

#### **Defer to v0.3 (Future Release - 6+ months)**

4. **Dropdown** - Very high complexity (keyboard navigation, positioning)
5. **Select** - Very high complexity (search, multiple selection, groups)
   - **Note**: Needs to be added to CLI registry first
6. **Accordion** - High complexity with animation states
   - **Note**: Needs to be added to CLI registry first
7. **Skeleton** - Low complexity but nice-to-have feature
   - **Note**: Needs to be added to CLI registry first

---

## Feature Simplification Strategy

### Components Requiring Simplification

#### 1. **Button** - Keep As-Is ✓

Current implementation is excellent. All features are well-tested and essential.

#### 2. **Textarea** - Simplify

**Remove for v0.1:**

- Filled and underlined variants (keep only `outlined`)
- Auto-resize functionality (`autoResize`, `maxRows`)
- Character counter (`showCount`, `maxLength` display)
- Size variants (keep only default `md`)

**Keep for v0.1:**

- Outlined variant only
- Basic label, error, helper text
- Disabled and required states
- Resize prop (CSS-based)

#### 3. **Card** - Simplify

**Remove for v0.1:**

- Elevated, gradient, interactive, bordered, ghost variants
- Image sub-component
- Advanced props: `shadow`, `hover`, `clickable`, `gradient`
- Size variants (keep only default)

**Keep for v0.1:**

- Default and outlined variants only
- Basic sub-components: Header, Content, Footer, Title, Description
- Basic padding prop

#### 4. **Checkbox** - Minor Simplification

**Defer for v0.1:**

- Indeterminate state

**Keep for v0.1:**

- Basic checked/unchecked
- Label and disabled

#### 5. **Spinner** - Simplify

**Remove for v0.1:**

- Dots and bars types (keep only `circular`)
- Secondary variant (keep only `default` and `primary`)

---

## Pre-Release Requirements

### Critical Tasks Before v0.1

> [!IMPORTANT]
> These MUST be completed before releasing v0.1:

1. **Fix Registry Mismatch**
   - Add Accordion, Select, and Skeleton to `componentRegistry.ts` OR
   - Remove them from `components-data.ts` and docs temporarily
   - Decision: **Remove from docs for v0.1** (cleaner approach)

2. **Simplify Component Templates**
   - Update Button.tsx ✓ (no changes needed)
   - Simplify Textarea.tsx (remove variants, auto-resize, counter)
   - Simplify Card.tsx (keep only default/outlined)
   - Simplify Spinner.tsx (keep only circular)

3. **Update Documentation**
   - Remove deferred components from `components-data.ts`
   - Update `component-api-data.ts` for simplified components
   - Update README.md to reflect v0.1 component count (10 instead of 14+)

4. **Testing & Validation**
   - Test CLI generation for all 10 components
   - Verify docs build successfully
   - Manual testing of each component demo
   - Verify no broken links in documentation

5. **Update Marketing Copy**
   - README.md: Change "14+ Components" to "10 Core Components"
   - Update component table to show only v0.1 components
   - Add roadmap section for upcoming components

---

## Implementation Checklist

### Phase 1: Cleanup & Registry Fix

- [ ] Remove Accordion from `apps/docs/lib/components-data.ts`
- [ ] Remove Select from `apps/docs/lib/components-data.ts`
- [ ] Remove Skeleton from `apps/docs/lib/components-data.ts`
- [ ] Remove Tooltip from both files (defer to v0.2)
- [ ] Remove Progress from both files (defer to v0.2)
- [ ] Remove Modal from both files (defer to v0.2)
- [ ] Remove Dropdown from both files (defer to v0.3)
- [ ] Verify `componentRegistry.ts` has exactly 10 components

### Phase 2: Simplify Component Templates

- [ ] Simplify [Textarea.tsx](file:///home/mani/mani/inam-ui/packages/inam-ui-cli/src/templates/Textarea.tsx)
  - Remove filled/underlined variants
  - Remove auto-resize logic
  - Remove character counter
  - Remove size variants
- [ ] Simplify [Card.tsx](file:///home/mani/mani/inam-ui/packages/inam-ui-cli/src/templates/Card.tsx)
  - Keep only default and outlined variants
  - Remove CardImage sub-component
  - Remove shadow, hover, clickable, gradient props
  - Remove size variants
- [ ] Simplify [Spinner.tsx](file:///home/mani/mani/inam-ui/packages/inam-ui-cli/src/templates/Spinner.tsx)
  - Keep only circular type
  - Remove dots and bars types
- [ ] Simplify [Checkbox.tsx](file:///home/mani/mani/inam-ui/packages/inam-ui-cli/src/templates/Checkbox.tsx)
  - Remove indeterminate state

### Phase 3: Update Documentation

- [ ] Update [component-api-data.ts](file:///home/mani/mani/inam-ui/apps/docs/lib/component-api-data.ts) for simplified components
- [ ] Update demos to reflect simplified APIs
- [ ] Update [README.md](file:///home/mani/mani/inam-ui/README.md)
  - Change component count
  - Update component table
  - Add v0.2 and v0.3 roadmap sections

### Phase 4: Testing & Verification

- [ ] Build CLI: `npm run build:cli`
- [ ] Test each component generation
- [ ] Build docs: `npm run build:docs`
- [ ] Visual review of all component pages
- [ ] Verify no 404s or broken demos

---

## v0.1 Component Summary

### Final v0.1 Component List (10 components)

| Category     | Components                                       | Count  |
| ------------ | ------------------------------------------------ | ------ |
| **Form**     | Button, Input, Checkbox, Radio, Switch, Textarea | 6      |
| **Layout**   | Card                                             | 1      |
| **Feedback** | Alert, Badge                                     | 2      |
| **Progress** | Spinner                                          | 1      |
| **TOTAL**    |                                                  | **10** |

---

## Future Roadmap

### v0.2 (3-4 months)

- Add Tooltip
- Add Progress bar
- Add Modal
- Restore advanced features to Card (variants, image, interactions)
- Restore advanced features to Textarea (variants, auto-resize, counter)
- Add size variants to Switch
- Add indeterminate state to Checkbox

### v0.3 (6+ months)

- Add Dropdown with full keyboard navigation
- Add Select with search and multi-select
- Add Accordion
- Add Skeleton
- Consider new components based on user feedback

---

## Success Metrics for v0.1

1. **Stability**: Zero critical bugs in core 10 components
2. **Documentation**: 100% API coverage for all included components
3. **CLI**: All 10 components generate successfully via CLI
4. **Build**: Clean builds with no errors or warnings
5. **User Feedback**: Gather feedback on core components before expanding

---

## Rationale Summary

### Why This Approach?

1. **Quality over Quantity**: Better to have 10 rock-solid components than 17 components with bugs
2. **Clear Foundation**: Simplified APIs are easier to maintain and extend
3. **User Focus**: The 10 selected components cover 90% of common UI needs
4. **Iterative Development**: Allows for user feedback before adding complexity
5. **Reduced Support Burden**: Fewer components = fewer edge cases = easier support
6. **Faster Release**: Can release v0.1 sooner with higher confidence

### Why Defer Complex Components?

- **Dropdown, Select, Accordion**: Require extensive keyboard navigation and accessibility testing
- **Modal**: Needs focus trap implementation and thorough testing
- **Tooltip**: Requires collision detection and positioning logic
- Components deferred are those that, if buggy, would seriously damage user trust

---

## Recommendations

> [!TIP]
> **Suggested Timeline**
>
> - Complete Phase 1-2: 1 week
> - Complete Phase 3-4: 1 week
> - User testing & bug fixes: 1 week
> - **Total to v0.1 release**: 3 weeks

After v0.1 is stable and users are happy with the core components, you can confidently add more components knowing your foundation is solid.
