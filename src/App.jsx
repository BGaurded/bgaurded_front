import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import AgentDetail from './pages/AgentDetail';
import Connect from './pages/Connect';
import IntelligenceLookup from './pages/IntelligenceLookup';
import IntelligenceDashboard from './pages/IntelligenceDashboard';
import CustomAgent from './pages/CustomAgent';
import YourAgents from './pages/YourAgents';
import Research from './pages/Research';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:agentId" element={<AgentDetail />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/custom-agent" element={<CustomAgent />} />
        <Route path="/your-agents" element={<YourAgents />} />
        <Route path="/research" element={<Research />} />
      </Route>
      <Route path="/intelligence" element={<IntelligenceLookup />} />
      <Route path="/intelligence/:agentId" element={<IntelligenceDashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
