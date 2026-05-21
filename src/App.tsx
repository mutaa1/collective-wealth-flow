import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { GroupsView } from './components/Groups';
import { useChamaStore } from './lib/store';
import { Chama } from './types';
import { Toaster, toast } from 'sonner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChama, setSelectedChama] = useState<Chama | null>(null);
  const { chamas, currentUser, updateContributionStatus } = useChamaStore();

  const handlePay = (chamaId: string, contributionId: string) => {
    updateContributionStatus(chamaId, contributionId, 'Paid');
    toast.success('Contribution recorded successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard chamas={chamas} user={currentUser} />;
      case 'groups':
        return (
          <GroupsView 
            chamas={chamas} 
            onSelect={setSelectedChama} 
            selectedChama={selectedChama}
            onPay={handlePay}
          />
        );
      case 'profile':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <img src={currentUser.avatar} className="w-32 h-32 rounded-full border-4 border-primary" alt="Profile" />
            <div>
              <h2 className="text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-8">
              <div className="p-4 bg-card border rounded-xl">
                <p className="text-xs text-muted-foreground">Joined</p>
                <p className="font-bold">Oct 2023</p>
              </div>
              <div className="p-4 bg-card border rounded-xl">
                <p className="text-xs text-muted-foreground">Reliability Score</p>
                <p className="font-bold text-emerald-600">98/100</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
            Coming Soon...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedChama(null);
      }} />
      
      <main className="pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-8">
          {renderContent()}
        </div>
      </main>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;