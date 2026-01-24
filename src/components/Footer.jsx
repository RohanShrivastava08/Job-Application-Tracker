import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const HashnodeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="22"
    height="22"
  >
    <path d="M12 0C5.372 0 0 5.373 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm3.675 14.07c-.17.284-.604.224-.604.224-.23-.031-.38-.199-.38-.199l-1.68-2.79-1.64 2.83c-.075.1-.245.23-.44.23-.296 0-.565-.28-.565-.28l-3.47-6.11v-.58l2.63-4.62c.02-.04.08-.12.18-.12.12 0 .2.1.2.1l3.58 5.83c.09.17 0 .3 0 .3l-.84 1.45 1.83 2.99z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
          {/* LEFT */}
          <div className="space-y-1">
            <p className="text-sm font-semibold tracking-wide uppercase">
              Job Application Tracker
            </p>
            <p className="text-xs text-muted-foreground max-w-sm">
              A focused tool to organize and track real job applications with clarity and privacy.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {[
              {
                href: 'https://github.com/RohanShrivastava08',
                label: 'GitHub',
                icon: <FaGithub size={18} />,
              },
              {
                href: 'https://www.linkedin.com/in/rohan-shrivastava-887a15251/',
                label: 'LinkedIn',
                icon: <FaLinkedin size={18} />,
              },
              {
                href: 'https://x.com/rohan_sh0808',
                label: 'Twitter',
                icon: <FaTwitter size={18} />,
              },
              {
                href: 'https://rohanblogs.hashnode.dev/',
                label: 'Hashnode',
                icon: <HashnodeIcon />,
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg border text-muted-foreground hover:text-primary hover:bg-muted transition"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="mt-8 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Job Application Tracker
          </p>
          <p>
            Built by Rohan
          </p>
        </div>
      </div>
    </footer>
  );
}
