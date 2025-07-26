const API_BASE = 'http://localhost:5000/api';

export interface Question {
  id: number;
  title: string;
  content: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  technology: string;
  category: string;
  github_url: string;
  created_at: string;
  updated_at: string;
  owner: string;
  repo: string;
}

export interface Repository {
  id: number;
  owner: string;
  repo: string;
  url: string;
  last_synced: string;
  question_count: number;
}

export interface QuestionFilters {
  technology?: string;
  difficulty?: string;
  search?: string;
  limit?: number;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  // Questions API
  async getQuestions(filters: QuestionFilters = {}): Promise<Question[]> {
    const params = new URLSearchParams();
    
    if (filters.technology && filters.technology !== 'all') {
      params.append('technology', filters.technology);
    }
    if (filters.difficulty) {
      params.append('difficulty', filters.difficulty);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.limit) {
      params.append('limit', filters.limit.toString());
    }

    const queryString = params.toString();
    const endpoint = `/questions${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Question[]>(endpoint);
  }

  // Repositories API
  async getRepositories(): Promise<Repository[]> {
    return this.request<Repository[]>('/repositories');
  }

  async addRepository(data: {
    owner: string;
    repo: string;
    technology?: string;
    category?: string;
  }): Promise<{ message: string; questionsCount: number; repositoryId: number }> {
    return this.request('/repositories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async syncRepository(id: number): Promise<{ message: string; questionsCount: number }> {
    return this.request(`/repositories/${id}/sync`, {
      method: 'POST',
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request('/health');
  }

  // Check if server is running
  async isServerRunning(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch {
      return false;
    }
  }
}

export const apiService = new ApiService();