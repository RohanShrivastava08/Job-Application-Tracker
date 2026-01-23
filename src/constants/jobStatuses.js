

export const JOB_STATUSES = [
  'Wishlist',
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
];

export const STATUS_META = {
  Wishlist: {
    label: 'Wishlist',
    color: '#9CA3AF', // gray-400
    bgClass: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  },
  Applied: {
    label: 'Applied',
    color: '#F59E0B', // amber-500
    bgClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  },
  Interview: {
    label: 'Interview',
    color: '#3B82F6', // blue-500
    bgClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  },
  Offer: {
    label: 'Offer',
    color: '#10B981', // green-500
    bgClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  },
  Rejected: {
    label: 'Rejected',
    color: '#EF4444', // red-500
    bgClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  },
};

export const isValidStatus = (status) =>
  JOB_STATUSES.includes(status);
