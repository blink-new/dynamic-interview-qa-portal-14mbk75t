export interface Question {
  id: string;
  title: string;
  content: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  technology: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  createdAt: string;
}

export interface Technology {
  id: string;
  name: string;
  icon: string;
  color: string;
  questionCount: number;
}

export interface FilterOptions {
  technology: string;
  difficulty: string;
  search: string;
  category: string;
}

export interface GitHubRepo {
  owner: string;
  repo: string;
  path?: string;
}