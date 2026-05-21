# Implementation Plan - ChamaConnect

ChamaConnect is a platform designed to facilitate group contributions (Chamas), allowing members to track contributions, manage rounds, and monitor group financial health.

## Scope Summary
- **Member Management**: User profiles and group memberships.
- **Group/Chama Management**: Create and manage groups, set contribution amounts and frequencies.
- **Contribution Tracking**: Record and view contributions per member and per round.
- **Payout Rotation**: Manage the sequence of members receiving the "pot".
- **Dashboard**: Overview of individual and group progress.

**Non-Goals**:
- Real payment processing (simulated for this prototype).
- Server-side persistence (state will be managed via `localStorage` for this session).

## Assumptions & Open Questions
- **Assumption**: A "Chama" is a rotating savings and credit association (ROSCA) where members contribute a fixed amount at regular intervals, and one member takes the total pot each interval.
- **Assumption**: Users are comfortable with a local-first browser experience for this demo.

## Affected Areas
- **Frontend**: React components for dashboards, group views, and contribution forms.
- **State Management**: React Context or similar using `localStorage` for persistence.
- **UI Components**: Shadcn UI (already present in the project).

## Phase 1: Foundation & Data Modeling (Frontend Engineer)
- Define TypeScript interfaces for `User`, `Chama`, `Contribution`, and `Payout`.
- Implement a `localStorage` utility for data persistence.
- Setup basic routing using a lightweight approach (e.g., conditional rendering or basic router).

## Phase 2: Core Components & Layout (Frontend Engineer)
- Create a `Sidebar` for navigation (Dashboard, My Groups, Profile).
- Build a `Layout` wrapper for the application.
- Implement the `Dashboard` home view with high-level stats.

## Phase 3: Chama Management (Frontend Engineer)
- Implement "Create Chama" form (Name, Contribution Amount, Frequency, Members).
- Implement "Chama Details" view showing the contribution table and payout schedule.
- Logic for calculating the next person to receive the pot.

## Phase 4: Contribution Workflow (Quick Fix Engineer)
- Add "Record Contribution" functionality.
- Implement status badges (Paid, Pending, Overdue).
- Add simple charts/progress bars for group health (using existing `src/components/ui/chart.tsx`).

## Phase 5: Polishing & Demo Data (Quick Fix Engineer)
- Populate the app with realistic seed data if `localStorage` is empty.
- Add "Success" sonner notifications for contributions.
- Final UI/UX polish and responsive checks.

## Sequencing Constraints
- Phase 1 must be completed before any UI logic that depends on data.
- Phase 2 and 3 can be developed in parallel if interfaces are stable.
