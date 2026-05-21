import { useState, useEffect } from 'react';
import { Chama, Contribution, Payout, User } from '../types';
import { initialChamas, currentUser } from './mockData';

export function useChamaStore() {
  const [chamas, setChamas] = useState<Chama[]>(() => {
    const saved = localStorage.getItem('chamahub_data');
    return saved ? JSON.parse(saved) : initialChamas;
  });

  useEffect(() => {
    localStorage.setItem('chamahub_data', JSON.stringify(chamas));
  }, [chamas]);

  const addChama = (chama: Chama) => {
    setChamas([...chamas, chama]);
  };

  const addContribution = (chamaId: string, contribution: Contribution) => {
    setChamas(prev => prev.map(c => {
      if (c.id === chamaId) {
        return { ...c, contributions: [...c.contributions, contribution] };
      }
      return c;
    }));
  };

  const updateContributionStatus = (chamaId: string, contributionId: string, status: Contribution['status']) => {
    setChamas(prev => prev.map(c => {
      if (c.id === chamaId) {
        return {
          ...c,
          contributions: c.contributions.map(con => 
            con.id === contributionId ? { ...con, status } : con
          )
        };
      }
      return c;
    }));
  };

  const addPayout = (chamaId: string, payout: Payout) => {
    setChamas(prev => prev.map(c => {
      if (c.id === chamaId) {
        return { ...c, payouts: [...c.payouts, payout] };
      }
      return c;
    }));
  };

  return {
    chamas,
    currentUser,
    addChama,
    addContribution,
    updateContributionStatus,
    addPayout
  };
}