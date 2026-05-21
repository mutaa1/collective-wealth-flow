import { motion } from 'framer-motion';
import { Chama, User } from '../types';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Wallet, Users, TrendingUp, Calendar } from 'lucide-react';

interface DashboardProps {
  chamas: Chama[];
  user: User;
}

export function Dashboard({ chamas, user }: DashboardProps) {
  const totalContributed = chamas.reduce((acc, c) => {
    return acc + c.contributions
      .filter(con => con.memberId === user.id && con.status === 'Paid')
      .reduce((sum, con) => sum + con.amount, 0);
  }, 0);

  const activeGroups = chamas.length;
  
  const nextContribution = chamas
    .flatMap(c => c.contributions)
    .filter(con => con.memberId === user.id && con.status === 'Pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const stats = [
    { label: 'Total Saved', value: `KES ${totalContributed.toLocaleString()}`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Groups', value: activeGroups.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'My Growth', value: '+12.5%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name} 👋</h2>
        <p className="text-muted-foreground">Here's an overview of your financial groups.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="overflow-hidden border-none shadow-lg">
          <div className="h-48 relative">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3d78a544-f993-42a7-9bd0-f445d494860a/chamaconnect-hero-96953c5a-1779347502558.webp" 
              className="w-full h-full object-cover"
              alt="Community"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <div className="text-white">
                <h4 className="text-xl font-bold">Group Power</h4>
                <p className="text-sm opacity-90">Unlock your potential through collective saving.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextContribution ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-accent/50 rounded-lg">
                  <div>
                    <p className="font-semibold">KES {nextContribution.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Due: {new Date(nextContribution.date).toLocaleDateString()}</p>
                  </div>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                    Pay Now
                  </button>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  You are contributing to Round {nextContribution.roundIndex}
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No pending contributions. All caught up!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Recent Groups</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chamas.map((chama) => (
            <Card key={chama.id} className="hover:border-primary transition-colors cursor-pointer group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">
                    {chama.frequency}
                  </span>
                </div>
                <CardTitle className="mt-4 text-lg group-hover:text-primary transition-colors">{chama.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{chama.members.length} Members</span>
                  <span className="font-semibold text-foreground">KES {chama.contributionAmount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}