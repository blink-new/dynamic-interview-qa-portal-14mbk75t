import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Question, FilterOptions } from '../types';
import { QuestionCard } from './QuestionCard';
import { FilterSidebar } from './FilterSidebar';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface QuestionsGridProps {
  questions: Question[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  loading?: boolean;
}

export function QuestionsGrid({ questions, filters, onFilterChange, loading = false }: QuestionsGridProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Filter questions
  const filteredQuestions = questions.filter((question) => {
    const matchesTechnology = filters.technology === 'all' || 
      question.technology.toLowerCase() === filters.technology.toLowerCase();
    
    const matchesDifficulty = filters.difficulty === 'all' || 
      question.difficulty === filters.difficulty;
    
    const matchesCategory = filters.category === 'all' || 
      question.category === filters.category;
    
    const matchesSearch = filters.search === '' || 
      question.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      question.content.toLowerCase().includes(filters.search.toLowerCase()) ||
      question.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));

    return matchesTechnology && matchesDifficulty && matchesCategory && matchesSearch;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'difficulty-asc': {
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
      case 'difficulty-desc': {
        const difficultyOrderDesc = { 'Easy': 3, 'Medium': 2, 'Hard': 1 };
        return difficultyOrderDesc[a.difficulty] - difficultyOrderDesc[b.difficulty];
      }
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Calculate question counts for filters
  const questionCounts = {
    total: filteredQuestions.length,
    byDifficulty: filteredQuestions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byCategory: filteredQuestions.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header with controls */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Interview Questions
                  {filters.technology !== 'all' && (
                    <span className="text-muted-foreground"> • {filters.technology}</span>
                  )}
                </h2>
                <p className="text-muted-foreground">
                  {sortedQuestions.length} question{sortedQuestions.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="difficulty-asc">Easy to Hard</SelectItem>
                    <SelectItem value="difficulty-desc">Hard to Easy</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  </SelectContent>
                </Select>

                {/* Filter toggle */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="gap-2 lg:hidden"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Questions Grid */}
            {loading ? (
              <div className="grid gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-lg border p-6 animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedQuestions.length > 0 ? (
              <div className="grid gap-6">
                {sortedQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => onFilterChange({
                    technology: 'all',
                    difficulty: 'all',
                    search: '',
                    category: 'all'
                  })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFilterChange={onFilterChange}
                isOpen={true}
                onClose={() => {}}
                questionCounts={questionCounts}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          filters={filters}
          onFilterChange={onFilterChange}
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          questionCounts={questionCounts}
        />
      </div>
    </section>
  );
}