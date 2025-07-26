import { Technology } from '../types';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface TechnologyTabsProps {
  technologies: Technology[];
  selectedTechnology: string;
  onTechnologyChange: (technology: string) => void;
}

export function TechnologyTabs({ 
  technologies, 
  selectedTechnology, 
  onTechnologyChange 
}: TechnologyTabsProps) {
  return (
    <section className="py-12 border-b border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Choose Your Technology</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select from our curated collection of interview questions across popular technologies
          </p>
        </div>

        {/* Technology Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant={selectedTechnology === 'all' ? 'default' : 'outline'}
            onClick={() => onTechnologyChange('all')}
            className="tech-tab gap-2"
          >
            🌟 All Technologies
            <Badge variant="secondary" className="ml-2">
              {technologies.reduce((sum, tech) => sum + tech.questionCount, 0)}
            </Badge>
          </Button>
          
          {technologies.map((tech) => (
            <Button
              key={tech.id}
              variant={selectedTechnology === tech.id ? 'default' : 'outline'}
              onClick={() => onTechnologyChange(tech.id)}
              className="tech-tab gap-2"
            >
              <span>{tech.icon}</span>
              {tech.name}
              <Badge variant="secondary" className="ml-2">
                {tech.questionCount}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Selected Technology Info */}
        {selectedTechnology !== 'all' && (
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 border border-border/50">
              <span className="text-2xl">
                {technologies.find(t => t.id === selectedTechnology)?.icon}
              </span>
              <span className="font-medium">
                {technologies.find(t => t.id === selectedTechnology)?.name} Questions
              </span>
              <Badge variant="outline">
                {technologies.find(t => t.id === selectedTechnology)?.questionCount} available
              </Badge>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}