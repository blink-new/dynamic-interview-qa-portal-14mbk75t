import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TechnologyTabs } from './components/TechnologyTabs';
import { QuestionsGrid } from './components/QuestionsGrid';
import GitHubIntegration from './components/GitHubIntegration';
import { technologies, mockQuestions } from './data/mockData';
import { apiService } from './services/api';
import { FilterOptions } from './types';
import type { Question as ApiQuestion } from './services/api';
import { Settings, Database, AlertCircle } from 'lucide-react';

function App() {
  const [filters, setFilters] = useState<FilterOptions>({
    technology: 'all',
    difficulty: 'all',
    search: '',
    category: 'all'
  });

  const [questions, setQuestions] = useState(mockQuestions);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [showGitHubIntegration, setShowGitHubIntegration] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadQuestionsFromAPI = useCallback(async () => {
    setLoading(true);
    try {
      const apiQuestions = await apiService.getQuestions();
      
      // Convert API questions to our format
      const convertedQuestions = apiQuestions.map((q: ApiQuestion) => ({
        id: q.id.toString(),
        title: q.title,
        content: q.content,
        answer: q.answer,
        difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
        technology: q.technology,
        category: q.category,
        githubUrl: q.github_url,
        repository: `${q.owner}/${q.repo}`
      }));

      // Combine with mock questions for demo purposes
      setQuestions([...convertedQuestions, ...mockQuestions]);
    } catch (error) {
      console.error('Error loading questions from API:', error);
      // Keep using mock questions if API fails
    } finally {
      setLoading(false);
    }
  }, []);

  const checkServerConnection = useCallback(async () => {
    const connected = await apiService.isServerRunning();
    setIsServerConnected(connected);
    
    if (connected) {
      loadQuestionsFromAPI();
    }
  }, [loadQuestionsFromAPI]);

  // Check server connection on mount
  useEffect(() => {
    checkServerConnection();
  }, [checkServerConnection]);

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleTechnologyChange = (technology: string) => {
    setFilters(prev => ({ ...prev, technology }));
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleQuestionsUpdate = () => {
    if (isServerConnected) {
      loadQuestionsFromAPI();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onSearchChange={handleSearchChange}
        searchValue={filters.search}
      />
      
      <main>
        <HeroSection />
        
        {/* Server Status Banner */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className={`p-4 rounded-lg border ${
            isServerConnected 
              ? 'bg-green-900/20 border-green-700/50 text-green-300' 
              : 'bg-amber-900/20 border-amber-700/50 text-amber-300'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isServerConnected ? (
                  <Database className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <div>
                  <p className="font-medium">
                    {isServerConnected 
                      ? 'Connected to GitHub Integration Server' 
                      : 'GitHub Integration Server Offline'
                    }
                  </p>
                  <p className="text-sm opacity-80">
                    {isServerConnected 
                      ? 'You can now add GitHub repositories to import interview questions dynamically.'
                      : 'Start the Node.js server to enable GitHub integration. Currently showing demo questions.'
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGitHubIntegration(!showGitHubIntegration)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                {showGitHubIntegration ? 'Hide' : 'Show'} Integration
              </button>
            </div>
          </div>
        </div>

        {/* GitHub Integration Panel */}
        {showGitHubIntegration && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <GitHubIntegration onQuestionsUpdate={handleQuestionsUpdate} />
          </div>
        )}
        
        <TechnologyTabs
          technologies={technologies}
          selectedTechnology={filters.technology}
          onTechnologyChange={handleTechnologyChange}
        />
        
        <QuestionsGrid
          questions={questions}
          filters={filters}
          onFilterChange={handleFilterChange}
          loading={loading}
        />
      </main>
      
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">DI</span>
              </div>
              <span className="text-xl font-bold gradient-text">DevInterview</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Master your technical interviews with curated questions from GitHub repositories
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 DevInterview. Built with React, TypeScript, Node.js, and PostgreSQL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;