import { SidebarLinks } from './sidebar-links/sidebar-links';

import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <SidebarLinks />
    </div>
  );
};

export { Sidebar };
