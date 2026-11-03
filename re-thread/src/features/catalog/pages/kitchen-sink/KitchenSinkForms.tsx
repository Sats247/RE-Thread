import React, { useState } from 'react';
import { Button, Input, Select, Checkbox } from '@/shared/ui';
import { Search, Mail } from 'lucide-react';

export const KitchenSinkForms: React.FC = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [checked, setChecked] = useState(true);

  return (
    <section className="space-y-6 border-b border-line pb-10 text-left">
      <div>
        <h2 className="text-base font-semibold uppercase tracking-wider text-ink mb-1">
          1. Buttons & Form Elements
        </h2>
        <p className="text-xs text-muted">Square corners, uppercase tracking, accessible states.</p>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <span className="text-xs uppercase font-mono text-muted block">Button Variants & Sizes</span>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button
            variant="primary"
            isLoading={btnLoading}
            onClick={() => {
              setBtnLoading(true);
              setTimeout(() => setBtnLoading(false), 2000);
            }}
          >
            {btnLoading ? 'Loading' : 'Click To Load'}
          </Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <Input
          label="Email Address"
          placeholder="yourname@gmail.com"
          leftIcon={<Mail className="h-4 w-4" />}
          helperText="We send order updates and drop alerts."
        />
        <Input
          label="Search Listings"
          placeholder="e.g. Vintage Zara Jacket"
          leftIcon={<Search className="h-4 w-4" />}
        />
        <Input
          label="With Error State"
          placeholder="Invalid field"
          defaultValue="invalid-format"
          error="Please enter a valid format."
        />
      </div>

      {/* Select & Checkbox */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-start">
        <Select
          label="Select Bengaluru Locality"
          options={[
            { value: 'indiranagar', label: 'Indiranagar' },
            { value: 'koramangala', label: 'Koramangala' },
            { value: 'hsr', label: 'HSR Layout' },
            { value: 'jayanagar', label: 'Jayanagar' },
          ]}
        />
        <div className="space-y-3 pt-2">
          <Checkbox
            label="Enable returns for this listing"
            description="Qualifies for 8% lower platform fee discount instead of standard 12%."
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Checkbox
            label="Ironed and professionally cleaned"
            description="Required checklist for all rental bookings."
            defaultChecked
          />
        </div>
      </div>
    </section>
  );
};

