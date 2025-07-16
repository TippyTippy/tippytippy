import Dashboard from '@/components/Dashboard';
import Header from '@/components/partials/Header';

const DashboardPage = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Topbar */}
      <Header />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
