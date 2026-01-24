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
      <div className="bg-card border rounded-2xl p-10 mb-12 text-center">
        <p className="text-lg font-medium">
          No applications yet
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Add your first job to start tracking progress.
        </p>
      </div>
    );
  }

  const statusCount = JOB_STATUSES.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  jobs.forEach((job) => {
    if (statusCount[job.status] !== undefined) {
      statusCount[job.status] += 1;
    }
  });

  const totalApplications = jobs.length;

  const pieData = JOB_STATUSES
    .map((status) => ({
      name: status,
      value: statusCount[status],
    }))
    .filter((item) => item.value > 0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10 mb-16"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-wide uppercase">
            Dashboard Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Snapshot of your job search progress
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total Applications
          </p>
          <p className="text-3xl font-bold">
            {totalApplications}
          </p>
        </div>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <StatCard
          label="Total"
          value={totalApplications}
          highlight
        />

        {JOB_STATUSES.map((status) => (
          <StatCard
            key={status}
            label={status}
            value={statusCount[status]}
            color={STATUS_COLORS[status]}
          />
        ))}
      </div>

      {/* ================= CHART ================= */}
      <div className="bg-card border rounded-2xl p-6">
        <div className="mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Status Distribution
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Visual breakdown of applications by stage
          </p>
        </div>

        {pieData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-20">
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
                    innerRadius={75}
                    outerRadius={105}
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

            <div className="flex flex-wrap justify-center gap-5 mt-4 text-xs">
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
                  <span className="text-muted-foreground">
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

function StatCard({ label, value, color, highlight }) {
  return (
    <div
      className={`rounded-xl border p-5 transition ${
        highlight
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-card'
      }`}
    >
      <p
        className={`text-xs uppercase tracking-wide ${
          highlight
            ? 'text-primary-foreground/80'
            : 'text-muted-foreground'
        }`}
      >
        {label}
      </p>

      <p className="text-2xl font-semibold mt-1">
        {value}
      </p>

      {!highlight && color && (
        <div
          className="w-full h-[3px] rounded-full mt-4"
          style={{
            backgroundColor: color,
            opacity: 0.75,
          }}
        />
      )}
    </div>
  );
}
