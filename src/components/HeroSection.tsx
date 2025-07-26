import { ArrowRight, Star, Users, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function HeroSection() {
  return (
    <section className="hero-gradient py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Ace Your Next{' '}
            <span className="gradient-text">Technical Interview</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Master interview questions from top tech companies. Practice with real questions 
            sourced from GitHub repositories and curated by industry experts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="gap-2 text-lg px-8 py-6">
              Start Practicing
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Browse Questions
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-card/50 border-border/50 backdrop-blur">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-muted-foreground">Interview Questions</div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 backdrop-blur">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-muted-foreground">Developers Helped</div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50 backdrop-blur">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-yellow-500/10">
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-muted-foreground">Success Rate</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}