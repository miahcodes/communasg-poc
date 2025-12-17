import {Link, useLocation} from 'react-router';
import clsx from 'clsx';

interface SidebarItem {
  label: string;
  path: string;
  icon: string;
  badge?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    label: 'For You',
    path: '/',
    icon: '🏠',
  },
  {
    label: 'Recent',
    path: '/recent',
    icon: '🕐',
  },
  {
    label: 'House Tours',
    path: '/house-tours',
    icon: '🏘️',
  },
  {
    label: 'Featured',
    path: '/featured',
    icon: '⭐',
  },
  {
    label: 'Popular',
    path: '/popular',
    icon: '🔥',
  },
  {
    label: 'Following',
    path: '/following',
    icon: '👥',
  },
  {
    label: 'ID Experts',
    path: '/experts',
    icon: '👷',
  },
  {
    label: 'Create Post',
    path: '/create',
    icon: '➕',
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Link to="/" className="logo-link">
          <span className="logo-text">Communa</span>
        </Link>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              'sidebar-nav-item',
              location.pathname === item.path && 'active'
            )}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Section - QR Code */}
      <div className="sidebar-bottom">
        <div className="qr-section">
          <p className="qr-text">Scan to get the app</p>
          <p className="qr-subtext">
            Get the better viewing experience on Communa
          </p>
          <div className="qr-code">
            <img
              src="https://cdn.shopify.com/s/files/1/0979/2995/3561/files/hv-qr.png?v=1765958665"
              alt="Download Communa App"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
