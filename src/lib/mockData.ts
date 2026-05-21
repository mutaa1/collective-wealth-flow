import { Chama, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'u2', name: 'Sarah Mwaniki', email: 'sarah@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'u3', name: 'James Kimani', email: 'james@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'u4', name: 'Linda Atieno', email: 'linda@example.com', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda' },
];

export const initialChamas: Chama[] = [
  {
    id: 'c1',
    name: 'Tech Builders Savings',
    description: 'Monthly savings for investment in tech gadgets and ventures.',
    contributionAmount: 5000,
    frequency: 'Monthly',
    startDate: '2023-10-01',
    members: mockUsers,
    payoutRotation: ['u2', 'u3', 'u4', 'u1'],
    currentRound: 2,
    createdBy: 'u1',
    contributions: [
      { id: 'con1', memberId: 'u1', amount: 5000, date: '2023-10-05', status: 'Paid', roundIndex: 1 },
      { id: 'con2', memberId: 'u2', amount: 5000, date: '2023-10-02', status: 'Paid', roundIndex: 1 },
      { id: 'con3', memberId: 'u3', amount: 5000, date: '2023-10-03', status: 'Paid', roundIndex: 1 },
      { id: 'con4', memberId: 'u4', amount: 5000, date: '2023-10-04', status: 'Paid', roundIndex: 1 },
      { id: 'con5', memberId: 'u1', amount: 5000, date: '2023-11-05', status: 'Pending', roundIndex: 2 },
      { id: 'con6', memberId: 'u2', amount: 5000, date: '2023-11-02', status: 'Paid', roundIndex: 2 },
    ],
    payouts: [
      { id: 'p1', memberId: 'u2', amount: 20000, date: '2023-10-15', roundIndex: 1, isCompleted: true },
    ]
  }
];