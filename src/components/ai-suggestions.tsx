'use client';

import { enhanceSearchResultsWithAISuggestions } from '@/ai/flows/enhance-search-results-ai-suggestions';
import { Badge } from '@/components/ui/badge';
import { Loader2, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';

type AiSuggestionsProps = {
  searchTerm: string;
  initialResults: string[];
};

export function AiSuggestions({ searchTerm, initialResults }: AiSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchTerm) {
      setSuggestions([]); // Clear previous suggestions
      startTransition(async () => {
        try {
          const result = await enhanceSearchResultsWithAISuggestions({ searchTerm, initialResults });
          setSuggestions(result.suggestedTerms);
        } catch (error) {
          console.error("Failed to fetch AI suggestions:", error);
          setSuggestions([]); // Ensure no stale suggestions on error
        }
      });
    } else {
        setSuggestions([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  if (!searchTerm) return null;

  if (isPending) {
    return (
        <div className="flex items-center justify-center gap-3 text-muted-foreground p-4 rounded-lg bg-muted/50">
            <Loader2 className="h-6 w-6 animate-spin"/>
            <p className="font-semibold">Our AI is looking for suggestions...</p>
        </div>
    );
  }
  
  if (suggestions.length === 0) {
      return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 rounded-lg bg-accent/20 border border-accent/50">
        <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-accent-foreground/90">
            <Wand2 className="text-accent" />
            AI Suggestions
        </h3>
        <div className="flex flex-wrap gap-3">
            {suggestions.map((term) => (
                <Link href={`/search?q=${encodeURIComponent(term)}`} key={term}>
                    <Badge className="text-base px-4 py-2 cursor-pointer bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-200 ease-in-out transform hover:scale-105">
                        {term}
                    </Badge>
                </Link>
            ))}
        </div>
    </div>
  );
}
