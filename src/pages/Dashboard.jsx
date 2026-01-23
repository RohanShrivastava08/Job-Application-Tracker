import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { JOB_STATUSES } from '../constants/jobStatuses';

const STATUS_COLORS = {
  Wishlist: '#9CA3AF',
  Applied: '#F59E0B',
  Interview: '#3B82F6',
  Offer: '#10B981',
  Rejected: '#EF4444',
};

export default function Dashboard({ jobs }) {
 
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="bg-card border rounded-xl p-6 mb-10 text-center text-foreground/60">
        No job applications yet. Add your first job to get started.
      </div>
    );
  }

  const statusCount = JOB_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  for (const job of jobs) {
    if (statusCount[job.status] !== undefined) {
      statusCount[job.status] += 1;
    }
  }

  const totalApplications = jobs.length;

  const pieData = JOB_STATUSES
    .map((status) => ({
      name: status,
      value: statusCount[status],
    }))
    .filter((item) => item.value > 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12"
    >
      {/* STATS */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-5">
          Applications Overview
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard label="Total" value={totalApplications} />

          {JOB_STATUSES.map((status) => (
            <StatCard
              key={status}
              label={status}
              value={statusCount[status]}
            />
          ))}
        </div>
      </div>

      {/* CHART */}
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-5">
          Status Distribution
        </h2>

        {pieData.length === 0 ? (
          <p className="text-sm text-foreground/60 text-center mt-12">
            No data to visualize yet.
          </p>
        ) : (
          <>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
              {pieData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-2"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: STATUS_COLORS[item.name],
                    }}
                  />
                  <span className="text-foreground/70">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-background border rounded-lg p-4">
      <p className="text-sm text-foreground/60">
        {label}
      </p>
      <p className="text-2xl font-semibold">
        {value}
      </p>
    </div>
  );
}
