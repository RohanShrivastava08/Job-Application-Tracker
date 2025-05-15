import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';


const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

export default function Dashboard({ jobs }) {
  const stats = {
    total: jobs.length,
    interview: jobs.filter(job => job.status === 'Interview').length,
    offer: jobs.filter(job => job.status === 'Offer').length,
    rejected: jobs.filter(job => job.status === 'Rejected').length
  };

  const pieData = [
    { name: 'Applied', value: stats.total - stats.interview - stats.offer - stats.rejected },
    { name: 'Interview', value: stats.interview },
    { name: 'Offer', value: stats.offer },
    { name: 'Rejected', value: stats.rejected }
  ].filter(item => item.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Applications Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-background rounded-lg">
            <p className="text-sm text-foreground/60">Total Applications</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <p className="text-sm text-foreground/60">Interviews</p>
            <p className="text-2xl font-semibold">{stats.interview}</p>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <p className="text-sm text-foreground/60">Offers</p>
            <p className="text-2xl font-semibold">{stats.offer}</p>
          </div>
          <div className="p-4 bg-background rounded-lg">
            <p className="text-sm text-foreground/60">Rejections</p>
            <p className="text-2xl font-semibold">{stats.rejected}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Application Status</h2>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}