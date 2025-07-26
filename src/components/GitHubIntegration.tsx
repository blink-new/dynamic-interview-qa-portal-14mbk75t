import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Github, RefreshCw, ExternalLink, Calendar, Hash } from 'lucide-react';

interface Repository {
  id: number;
  owner: string;
  repo: string;
  url: string;
  last_synced: string;
  question_count: number;
}

interface GitHubIntegrationProps {
  onQuestionsUpdate: () => void;
}

export default function GitHubIntegration({ onQuestionsUpdate }: GitHubIntegrationProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isAddingRepo, setIsAddingRepo] = useState(false);
  const [newRepo, setNewRepo] = useState({ owner: '', repo: '', technology: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [syncingId, setSyncingId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const API_BASE = 'http://localhost:5000/api';

  const fetchRepositories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/repositories`);
      if (response.ok) {
        const data = await response.json();
        setRepositories(data);
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  }, []);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  const addRepository = async () => {
    if (!newRepo.owner || !newRepo.repo) {
      setMessage({ type: 'error', text: 'Please enter both owner and repository name' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE}/repositories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRepo),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        setNewRepo({ owner: '', repo: '', technology: '', category: '' });
        setIsAddingRepo(false);
        fetchRepositories();
        onQuestionsUpdate();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to add repository' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check if the server is running.' });
    } finally {
      setLoading(false);
    }
  };

  const syncRepository = async (id: number) => {
    setSyncingId(id);
    setMessage(null);

    try {
      const response = await fetch(`${API_BASE}/repositories/${id}/sync`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        fetchRepositories();
        onQuestionsUpdate();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to sync repository' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please check if the server is running.' });
    } finally {
      setSyncingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Github className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-white">GitHub Integration</h2>
        </div>
        <button
          onClick={() => setIsAddingRepo(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Repository
        </button>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-900/50 text-green-300 border border-green-700/50' 
            : 'bg-red-900/50 text-red-300 border border-red-700/50'
        }`}>
          {message.text}
        </div>
      )}

      {isAddingRepo && (
        <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
          <h3 className="text-lg font-medium text-white mb-4">Add New Repository</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Repository Owner
              </label>
              <input
                type="text"
                value={newRepo.owner}
                onChange={(e) => setNewRepo({ ...newRepo, owner: e.target.value })}
                placeholder="e.g., facebook"
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Repository Name
              </label>
              <input
                type="text"
                value={newRepo.repo}
                onChange={(e) => setNewRepo({ ...newRepo, repo: e.target.value })}
                placeholder="e.g., react"
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Technology (Optional)
              </label>
              <input
                type="text"
                value={newRepo.technology}
                onChange={(e) => setNewRepo({ ...newRepo, technology: e.target.value })}
                placeholder="e.g., React"
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category (Optional)
              </label>
              <input
                type="text"
                value={newRepo.category}
                onChange={(e) => setNewRepo({ ...newRepo, category: e.target.value })}
                placeholder="e.g., Frontend"
                className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addRepository}
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Repository
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsAddingRepo(false);
                setNewRepo({ owner: '', repo: '', technology: '', category: '' });
                setMessage(null);
              }}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {repositories.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Github className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-lg font-medium mb-2">No repositories added yet</p>
            <p className="text-sm">Add a GitHub repository to start importing interview questions from README files.</p>
          </div>
        ) : (
          repositories.map((repo) => (
            <div key={repo.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Github className="w-5 h-5 text-slate-400" />
                    <h3 className="text-lg font-medium text-white">
                      {repo.owner}/{repo.repo}
                    </h3>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      <span>{repo.question_count} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Last synced: {formatDate(repo.last_synced)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => syncRepository(repo.id)}
                  disabled={syncingId === repo.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 text-white rounded-lg transition-colors text-sm"
                >
                  <RefreshCw className={`w-4 h-4 ${syncingId === repo.id ? 'animate-spin' : ''}`} />
                  {syncingId === repo.id ? 'Syncing...' : 'Sync'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
        <h4 className="text-sm font-medium text-white mb-2">How it works:</h4>
        <ul className="text-sm text-slate-400 space-y-1">
          <li>• Add any GitHub repository that contains interview questions in its README</li>
          <li>• The system will automatically parse questions and answers from markdown format</li>
          <li>• Questions are categorized by difficulty and technology automatically</li>
          <li>• Use the sync button to update questions when the repository changes</li>
        </ul>
      </div>
    </div>
  );
}