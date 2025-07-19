import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminAppBar from '../components/AdminAppbar';
import DashboardContent from '../components/DashboardContent';
import EmailContent from '../components/EmailContent';
import StatsContent from '../components/StatsContent';
import ArchiveContent from '../components/ArchiveContent';
import SettingsContent from '../components/SettingsContent';

const AdminPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminAppBar
        activeTab={activeTab}
        onDrawerToggle={() => setMobileOpen(!mobileOpen)}
      />
      <AdminSidebar
        mobileOpen={mobileOpen}
        onDrawerToggle={() => setMobileOpen(!mobileOpen)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 p-4 md:p-8 mt-20 overflow-y-auto ml-0 md:ml-[240px]">
        {activeTab === 'dashboard' && <DashboardContent />}
        {activeTab === 'email' && <EmailContent />}
        {activeTab === 'stats' && <StatsContent />}
        {activeTab === 'archive' && <ArchiveContent />}
        {activeTab === 'settings' && <SettingsContent />}
      </main>
    </div>
  );
};

export default AdminPage;
