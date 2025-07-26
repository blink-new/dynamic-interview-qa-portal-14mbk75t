import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
  questionCounts: {
    total: number;
    byDifficulty: Record<string, number>;
    byCategory: Record<string, number>;
  };
}

export function FilterSidebar({ 
  filters, 
  onFilterChange, 
  isOpen, 
  onClose,
  questionCounts 
}: FilterSidebarProps) {
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = ['Core Concepts', 'Architecture', 'Fundamentals', 'Hooks', 'Advanced Types', 'API Design', 'Performance', 'Asynchronous'];

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      technology: 'all',
      difficulty: 'all',
      search: '',
      category: 'all'
    });
  };

  const hasActiveFilters = filters.difficulty !== 'all' || filters.category !== 'all' || filters.search !== '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Backdrop for mobile */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm lg:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <Card className="absolute right-0 top-0 h-full w-80 lg:relative lg:w-full lg:h-auto border-l lg:border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Results Count */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{questionCounts.total}</div>
            <div className="text-sm text-muted-foreground">Questions Found</div>
          </div>

          <Separator />

          {/* Difficulty Filter */}
          <div>
            <h3 className="font-medium mb-3">Difficulty</h3>
            <div className="space-y-2">
              <Button
                variant={filters.difficulty === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => updateFilter('difficulty', 'all')}
                className="w-full justify-between"
              >
                All Difficulties
                <Badge variant="secondary">{questionCounts.total}</Badge>
              </Button>
              {difficulties.map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={filters.difficulty === difficulty ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => updateFilter('difficulty', difficulty)}
                  className="w-full justify-between"
                >
                  {difficulty}
                  <Badge variant="secondary">
                    {questionCounts.byDifficulty[difficulty] || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Category Filter */}
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              <Button
                variant={filters.category === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => updateFilter('category', 'all')}
                className="w-full justify-between"
              >
                All Categories
                <Badge variant="secondary">{questionCounts.total}</Badge>
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filters.category === category ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => updateFilter('category', category)}
                  className="w-full justify-between text-left"
                >
                  <span className="truncate">{category}</span>
                  <Badge variant="secondary">
                    {questionCounts.byCategory[category] || 0}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}