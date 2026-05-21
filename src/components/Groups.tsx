import { Chama, User } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Users, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface GroupsViewProps {
  chamas: Chama[];
  onSelect: (chama: Chama) => void;
  selectedChama: Chama | null;
  onPay: (chamaId: string, contributionId: string) => void;
}

export function GroupsView({ chamas, onSelect, selectedChama, onPay }: GroupsViewProps) {
  if (selectedChama) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => onSelect(null as any)}>
            ← Back to Groups
          </Button>
          <h2 className="text-2xl font-bold">{selectedChama.name}</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pot</CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">
                KES {(selectedChama.contributionAmount * selectedChama.members.length).toLocaleString()}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Round</CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">
                {selectedChama.currentRound} of {selectedChama.members.length}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Next Recipient</CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">
                {selectedChama.members.find(m => m.id === selectedChama.payoutRotation[selectedChama.currentRound - 1])?.name}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="contributions">
          <TabsList>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="payouts">Payout History</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="mt-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedChama.contributions
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((con) => {
                      const member = selectedChama.members.find(m => m.id === con.memberId);
                      return (
                        <TableRow key={con.id}>
                          <TableCell className="font-medium">{member?.name}</TableCell>
                          <TableCell>KES {con.amount.toLocaleString()}</TableCell>
                          <TableCell>{new Date(con.date).toLocaleDateString()}</TableCell>
                          <TableCell>{con.roundIndex}</TableCell>
                          <TableCell>
                            <Badge 
                              className={con.status === 'Paid' ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-transparent' : ''} 
                              variant={con.status === 'Overdue' ? 'destructive' : 'secondary'}
                            >
                              {con.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {con.status === 'Pending' && member?.id === 'u1' && (
                              <Button size="sm" onClick={() => onPay(selectedChama.id, con.id)}>
                                Pay
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="mt-4">
            <Card>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Round</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedChama.payouts.map((p) => {
                    const member = selectedChama.members.find(m => m.id === p.memberId);
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{member?.name}</TableCell>
                        <TableCell>KES {p.amount.toLocaleString()}</TableCell>
                        <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                        <TableCell>{p.roundIndex}</TableCell>
                        <TableCell>
                           <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-transparent">Completed</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {selectedChama.payouts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No payouts yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedChama.members.map((m, idx) => (
                <Card key={m.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={m.avatar} className="w-12 h-12 rounded-full" alt={m.name} />
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Badge variant="outline" className="text-[10px]">Order: {idx + 1}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">My Groups</h2>
          <p className="text-muted-foreground">Manage your community contributions.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Create New Chama
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {chamas.map((chama) => (
          <Card 
            key={chama.id} 
            className="group hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary"
            onClick={() => onSelect(chama)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary/5 rounded-lg text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <Badge variant="secondary">{chama.frequency}</Badge>
              </div>
              <CardTitle className="mt-4">{chama.name}</CardTitle>
              <CardDescription className="line-clamp-2">{chama.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Contribution</span>
                  <span className="font-bold">KES {chama.contributionAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Round</span>
                  <span className="font-bold">{chama.currentRound} / {chama.members.length}</span>
                </div>
                <div className="pt-4 border-t flex -space-x-2">
                  {chama.members.slice(0, 4).map((m) => (
                    <img key={m.id} src={m.avatar} className="w-8 h-8 rounded-full border-2 border-background" alt={m.name} title={m.name} />
                  ))}
                  {chama.members.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold border-2 border-background">
                      +{chama.members.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}