import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = {
  Wishlist: '#6B7280',   // gray
  Applied: '#F59E0B',    // yellow
  Interview: '#3B82F6',  // blue
  Offer: '#10B981',      // green
  Rejected: '#EF4444',   // red
};

export default function Dashboard({ jobs }) {
  // Safety check + empty state
  if (!jobs || jobs.length === 0) {
    return (
      <div className="bg-card rounded-xl p-6 text-center text-muted-foreground mb-8">
        No applications yet. Start by adding your first job application.
      </div>
    );
  }

  // Count jobs by status (clean + scalable)
  const statusCount = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const stats = {
    total: jobs.length,
    wishlist: statusCount.Wishlist || 0,
    applied: statusCount.Applied || 0,
    interview: statusCount.Interview || 0,
    offer: statusCount.Offer || 0,
    rejected: statusCount.Rejected || 0,
  };

  const pieData = [
    { name: 'Wishlist', value: stats.wishlist },
    { name: 'Applied', value: stats.applied },
    { name: 'Interview', value: stats.interview },
    { name: 'Offer', value: stats.offer },
    { name: 'Rejected', value: stats.rejected },
  ].filter(item => item.value > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
    >
      {/* Stats Cards */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Applications Overview
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <StatCard label="Total Applications" value={stats.total} />
          <StatCard label="Wishlist" value={stats.wishlist} />
          <StatCard label="Applied" value={stats.applied} />
          <StatCard label="Interviews" value={stats.interview} />
          <StatCard label="Offers" value={stats.offer} />
          <StatCard label="Rejections" value={stats.rejected} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-card rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Application Status Distribution
        </h2>

        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name]}
                  />
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

/* -------------------- */
/* Small reusable card */
/* -------------------- */
function StatCard({ label, value }) {
  return (
    <div className="p-4 bg-background rounded-lg">
      <p className="text-sm text-foreground/60">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}
