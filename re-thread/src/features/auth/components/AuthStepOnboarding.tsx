import React, { useState } from 'react';
import { Button, Input, Select, Chip } from '@/shared/ui';
import type { Category, Occasion } from '@/shared/types';

export interface OnboardingData {
  name: string;
  phone: string;
  locality: string;
  categories: Category[];
  occasions: Occasion[];
}

export interface AuthStepOnboardingProps {
  initialEmail: string;
  onComplete: (data: OnboardingData) => void;
}

export const AuthStepOnboarding: React.FC<AuthStepOnboardingProps> = ({
  onComplete,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [locality, setLocality] = useState('Indiranagar');
  const [selectedCats, setSelectedCats] = useState<Category[]>(['women']);
  const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>(['brunch', 'festive']);
  const [error, setError] = useState('');

  const localityOptions = [
    { value: 'Indiranagar', label: 'Indiranagar' },
    { value: 'Koramangala', label: 'Koramangala' },
    { value: 'HSR Layout', label: 'HSR Layout' },
    { value: 'Jayanagar', label: 'Jayanagar' },
    { value: 'Malleshwaram', label: 'Malleshwaram' },
    { value: 'Whitefield', label: 'Whitefield' },
    { value: 'JP Nagar', label: 'JP Nagar' },
    { value: 'Basavanagudi', label: 'Basavanagudi' },
    { value: 'Electronic City', label: 'Electronic City' },
    { value: 'Rajajinagar', label: 'Rajajinagar' },
  ];

  const categories: { label: string; value: Category }[] = [
    { label: "Women's", value: 'women' },
    { label: "Men's", value: 'men' },
    { label: 'Unisex', value: 'unisex' },
  ];

  const occasions: { label: string; value: Occasion }[] = [
    { label: 'Brunch', value: 'brunch' },
    { label: 'Daily Wear', value: 'daily' },
    { label: 'Festive & Ethnic', value: 'festive' },
    { label: 'Weddings & Receptions', value: 'wedding' },
    { label: 'Cocktails & Club', value: 'club' },
    { label: 'Travel & Vacation', value: 'vacation' },
    { label: 'College & Casual', value: 'college' },
    { label: 'Work & Formal', value: 'formal' },
  ];

  const toggleCategory = (cat: Category) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleOccasion = (occ: Occasion) => {
    setSelectedOccasions((prev) =>
      prev.includes(occ) ? prev.filter((o) => o !== occ) : [...prev, occ]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    setError('');
    onComplete({
      name,
      phone,
      locality,
      categories: selectedCats,
      occasions: selectedOccasions,
    });
  };

  return (
    <div className="space-y-6 text-left" data-testid="auth-onboarding-step">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted">Step 4 of 4</span>
        <h3 className="text-base font-semibold uppercase tracking-wider text-ink">
          Personalize Your Closet
        </h3>
        <p className="text-xs text-muted mt-1">
          Tell us your Bengaluru neighborhood and styles to seed your personalized “For You” feed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          required
          placeholder="e.g. Ananya Rao"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="onboarding-name-input"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-testid="onboarding-phone-input"
          />
          <Select
            label="Bengaluru Locality"
            options={localityOptions}
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            data-testid="onboarding-locality-select"
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-muted font-medium block">
            What styles are you shopping for?
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip
                key={c.value}
                label={c.label}
                active={selectedCats.includes(c.value)}
                onClick={() => toggleCategory(c.value)}
              />
            ))}
          </div>
        </div>

        {/* Occasions */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-muted font-medium block">
            Occasions you care about
          </label>
          <div className="flex flex-wrap gap-1.5">
            {occasions.map((o) => (
              <Chip
                key={o.value}
                label={o.label}
                active={selectedOccasions.includes(o.value)}
                onClick={() => toggleOccasion(o.value)}
              />
            ))}
          </div>
        </div>

        {error && <p className="text-xs text-danger">{error}</p>}

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          data-testid="onboarding-finish-btn"
        >
          Complete Setup & Start Browsing
        </Button>
      </form>
    </div>
  );
};

