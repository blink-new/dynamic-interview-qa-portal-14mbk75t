import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Question } from '../types';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Hard':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="question-card card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <Badge variant="secondary">
                {question.technology}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold leading-tight mb-2">
              {question.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {question.content}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(question.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {question.category}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-1 text-xs"
          >
            {isExpanded ? 'Hide Answer' : 'Show Answer'}
            {isExpanded ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="pt-0">
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                Question Details
              </h4>
              <p className="text-sm leading-relaxed">
                {question.content}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                Answer
              </h4>
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-sm leading-relaxed">
                  {question.answer}
                </p>
              </div>
            </div>

            {question.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {question.githubUrl && (
              <div className="pt-2">
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={question.githubUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}