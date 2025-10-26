'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingContext } from './layout-provider';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (query.trim() === '') {
      router.push('/');
    } else {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-2xl items-center space-x-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for amazing games..."
        className="flex-1 text-lg py-6 rounded-full border-2 border-input focus:border-primary transition-colors duration-300"
        aria-label="Search for games"
      />
      <Button type="submit" size="icon" className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 transition-transform hover:scale-110">
        <Search className="h-6 w-6" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
