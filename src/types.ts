export type Frequency = 'Weekly' | 'Bi-Weekly' | 'Monthly';
export type ContributionStatus = 'Paid' | 'Pending' | 'Overdue';

export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface Contribution {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  status: ContributionStatus;
  roundIndex: number;
}

export interface Payout {
  id: string;
  memberId: string;
  amount: number;
  date: string;
  roundIndex: number;
  isCompleted: boolean;
}

export interface Chama {
  id: string;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: Frequency;
  startDate: string;
  members: User[];
  payoutRotation: string[]; // member IDs in order
  contributions: Contribution[];
  payouts: Payout[];
  createdBy: string;
  currentRound: number;
}