import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { BENGALURU_LOCALITIES } from '@/config/constants';
import { catalog } from '@/services';
import { Search, Camera, MapPin, X } from 'lucide-react';
import { ImageSearchModal } from './ImageSearchModal';

interface SearchBarProps {
  initialQuery?: string;
  initialCategory?: string;
  initialLocality?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery = '',
  initialCategory = '',
  initialLocality = '',
  className = '',
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [locality, setLocality] = useState(initialLocality);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    let active = true;
    if (!query.trim()) {
      setSuggestions(['Zara', 'Saree', 'Linen shirt', 'Lehenga', 'Levi\'s']);
      return;
    }
    catalog.suggest(query).then((items) => {
      if (active) setSuggestions(items);
    }).catch(() => {
      // fallback
    });
    return () => {
      active = false;
    };
  }, [query]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = (searchQuery?: string) => {
    const q = (searchQuery !== undefined ? searchQuery : query).trim();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    if (locality) params.set('locality', locality);
    setIsOpen(false);
    navigate(`${ROUTES.SEARCH}?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      <div ref={containerRef} className={`relative w-full ${className}`}>
        <div className="flex flex-col sm:flex-row items-stretch border border-ink bg-paper shadow-sm">
          {/* Category Dropdown */}
          <div className="relative border-b sm:border-b-0 sm:border-r border-line bg-mist/30">
            <select
              aria-label="Filter by department"
              data-testid="search-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto h-11 px-3.5 text-xs uppercase tracking-wider font-medium bg-transparent text-ink focus:outline-none cursor-pointer"
            >
              <option value="">All Categories</option>
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Locality Dropdown */}
          <div className="relative border-b sm:border-b-0 sm:border-r border-line bg-mist/30 flex items-center">
            <MapPin className="w-3.5 h-3.5 ml-3 text-muted shrink-0" />
            <select
              aria-label="Filter by Bengaluru locality"
              data-testid="search-locality-select"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full sm:w-auto h-11 pl-2 pr-3.5 text-xs uppercase tracking-wider font-medium bg-transparent text-ink focus:outline-none cursor-pointer"
            >
              <option value="">All Bengaluru</option>
              {BENGALURU_LOCALITIES.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Search Input */}
          <div className="flex-1 flex items-center px-3 gap-2">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              type="text"
              data-testid="search-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search garments, brands, RT-code, occasions..."
              className="w-full h-11 text-xs text-ink placeholder:text-muted bg-transparent focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                data-testid="search-clear-btn"
                className="p-1 text-muted hover:text-ink"
                aria-label="Clear query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              data-testid="search-camera-btn"
              onClick={() => setShowImageModal(true)}
              className="p-1.5 text-muted hover:text-ink transition-colors"
              title="Visual garment search"
              aria-label="Visual search with image"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            data-testid="search-submit-btn"
            onClick={() => handleSearch()}
            className="h-11 px-6 bg-ink text-paper text-xs uppercase tracking-widest font-medium hover:bg-muted transition-colors flex items-center justify-center shrink-0"
          >
            Search
          </button>
        </div>

        {/* Suggestions Popover */}
        {isOpen && suggestions.length > 0 && (
          <div
            data-testid="search-suggestions-dropdown"
            className="absolute left-0 right-0 top-full mt-1 bg-paper border border-line shadow-lg z-50 py-2"
          >
            <div className="px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-muted">
              {query ? 'Matching Catalog Suggestions' : 'Trending Searches'}
            </div>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                data-testid={`search-suggestion-${s.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleSearch(s)}
                className="w-full text-left px-3 py-2 text-xs text-ink hover:bg-mist/50 flex items-center justify-between"
              >
                <span>{s}</span>
                <span className="text-[10px] text-muted uppercase font-mono">Select</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <ImageSearchModal open={showImageModal} onClose={() => setShowImageModal(false)} />
    </>
  );
};

