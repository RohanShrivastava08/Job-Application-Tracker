import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const HashnodeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M12 0C5.372 0 0 5.373 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm3.675 14.07c-.17.284-.604.224-.604.224-.23-.031-.38-.199-.38-.199l-1.68-2.79-1.64 2.83c-.075.1-.245.23-.44.23-.296 0-.565-.28-.565-.28l-3.47-6.11v-.58l2.63-4.62c.02-.04.08-.12.18-.12.12 0 .2.1.2.1l3.58 5.83c.09.17 0 .3 0 .3l-.84 1.45 1.83 2.99z" />
  </svg>
);


export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black py-6 px-8 border-t border-gray-200 dark:border-gray-800">
      {/* First row: Left and Right */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-900 dark:text-gray-100 font-semibold text-base">
          Built with <span className="text-red-500">❤️</span> Rohan Shrivastava
        </p>

        <div className="flex space-x-6">
          {[{
            href: 'https://github.com/RohanShrivastava08',
            label: 'GitHub',
            icon: <FaGithub size={24} />
          }, {
            href: 'https://www.linkedin.com/in/rohan-shrivastava-887a15251/',
            label: 'LinkedIn',
            icon: <FaLinkedin size={24} />
          }, {
            href: 'https://x.com/rohan_sh0808',
            label: 'Twitter',
            icon: <FaTwitter size={24} />
          }, {
            href: 'https://rohanblogs.hashnode.dev/',
            label: 'Hashnode',
            icon: <HashnodeIcon size={24} />
          }].map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-300"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Second row: Centered project description */}
      <p className="text-center text-gray-600 dark:text-gray-300 text-sm max-w-xl mx-auto">
        A labor of love crafted to empower you in managing your job applications smoothly and efficiently.
      </p>
    </footer>
  );
}
