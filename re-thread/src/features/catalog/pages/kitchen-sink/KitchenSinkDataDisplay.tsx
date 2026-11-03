import React, { useState } from 'react';
import {
  Badge,
  Chip,
  Price,
  Rating,
  ImageWithFallback,
  Carousel,
  Stepper,
  Timeline,
  Accordion,
  Tabs,
} from '@/shared/ui';
import { getImageUrl } from '@/shared/lib/image';

export const KitchenSinkDataDisplay: React.FC = () => {
  const [ratingVal, setRatingVal] = useState(4.5);
  const [currentStep, setCurrentStep] = useState(1);
  const [activeChip, setActiveChip] = useState('Festive');

  return (
    <section className="space-y-8 border-b border-line pb-10 text-left">
      <div>
        <h2 className="text-base font-semibold uppercase tracking-wider text-ink mb-1">
          2. Badges, Price, Rating & Data Display
        </h2>
        <p className="text-xs text-muted">Tokens, INR pricing, occasion chips, media components.</p>
      </div>

      {/* Badges & Chips */}
      <div className="space-y-4">
        <span className="text-xs uppercase font-mono text-muted block">Badges & Tag Chips</span>
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="ok">Quality Checked</Badge>
          <Badge variant="warn">Late Due: 2 Days</Badge>
          <Badge variant="danger">AI Flagged (Blur)</Badge>
          <Badge variant="sale">60% OFF</Badge>
          <Badge variant="verified">Verified Seller</Badge>
          <Badge variant="mist">Like New</Badge>
          <Badge variant="ink">Rental Tier: 3 Days</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {['Festive', 'Brunch', 'Resort', 'Wedding', 'College', 'Party'].map((occ) => (
            <Chip
              key={occ}
              label={occ}
              active={activeChip === occ}
              onClick={() => setActiveChip(occ)}
            />
          ))}
          <Chip label="Removable Chip" onRemove={() => alert('Removed!')} />
        </div>
      </div>

      {/* Price & Rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div className="space-y-3">
          <span className="text-xs uppercase font-mono text-muted block">Pricing Formatting</span>
          <div className="space-y-2">
            <div><Price amount={1499} size="lg" /></div>
            <div><Price amount={1299} mrp={3499} size="md" /></div>
            <div><Price amount={699} rentalPeriod="/ 3 days" size="sm" /></div>
          </div>
        </div>
        <div className="space-y-3">
          <span className="text-xs uppercase font-mono text-muted block">Star Rating</span>
          <div className="space-y-2">
            <Rating value={4.8} count={124} size="md" />
            <div>
              <p className="text-xs text-muted mb-1">Interactive mode (click a star):</p>
              <Rating value={ratingVal} interactive onChange={setRatingVal} size="md" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="space-y-3 pt-2">
        <span className="text-xs uppercase font-mono text-muted block">Tabs Primitive</span>
        <Tabs
          items={[
            { value: 'desc', label: 'Item Description', content: <p className="text-xs text-muted">Curated pre-loved Zara linen blazer in excellent condition. Smoke-free home.</p> },
            { value: 'measurements', label: 'Measurements (in)', content: <p className="text-xs text-muted">Chest: 40in · Length: 28in · Shoulders: 18in · Sleeve: 25in</p> },
            { value: 'impact', label: 'Environmental Impact', content: <p className="text-xs text-ok font-medium">Buying this pre-owned garment saved approx. 2,700 litres of clean water.</p> },
          ]}
        />
      </div>

      {/* Stepper */}
      <div className="space-y-3 pt-2">
        <span className="text-xs uppercase font-mono text-muted block">Progress Stepper</span>
        <Stepper
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          steps={[
            { id: 1, label: 'Photos', description: 'AI quality check' },
            { id: 2, label: 'Details', description: 'Brand, size, condition' },
            { id: 3, label: 'Pricing', description: 'Sale / Rental' },
            { id: 4, label: 'Review', description: 'Publish listing' },
          ]}
        />
      </div>

      {/* Accordion & Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div>
          <span className="text-xs uppercase font-mono text-muted block mb-3">Accordion Details</span>
          <Accordion
            items={[
              { id: '1', title: 'Fabric & Care Guide', content: '100% natural organic cotton. Gentle cold wash only. Dry in shade.' },
              { id: '2', title: 'Bengaluru Delivery & Meetup', content: 'Courier: ₹70 flat across Bengaluru (Free over ₹999). Direct meetup at Indiranagar Metro available.' },
              { id: '3', title: 'Return & Exchange Policy', content: 'Returns accepted within 3 days of delivery with original security tag intact.' },
            ]}
          />
        </div>

        <div>
          <span className="text-xs uppercase font-mono text-muted block mb-3">Rental QC Timeline</span>
          <Timeline
            items={[
              { id: '1', title: 'Booking Confirmed', subtitle: 'Deposit of ₹1,500 held', timestamp: '2 Nov, 10:00 AM', status: 'completed' },
              { id: '2', title: 'Pre-delivery QC (Seller)', subtitle: 'Ironed & Cleaned check verified by AI', timestamp: '2 Nov, 03:30 PM', status: 'completed' },
              { id: '3', title: 'Active Rental Period', subtitle: 'Return courier scheduled for 5 Nov', timestamp: 'In progress', status: 'current' },
              { id: '4', title: 'Post-pickup QC & Deposit Settlement', subtitle: 'Pending return delivery', status: 'pending' },
            ]}
          />
        </div>
      </div>

      {/* Image with fallback & Carousel */}
      <div className="space-y-3 pt-4">
        <span className="text-xs uppercase font-mono text-muted block">ImageWithFallback & Carousel</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <ImageWithFallback src={getImageUrl('ks-1', 400, 500)} alt="Live fashion photo" />
            <p className="text-[11px] text-muted mt-1">Loaded portrait (3:4)</p>
          </div>
          <div>
            <ImageWithFallback src="invalid-url-triggers-fallback" alt="Broken fallback" />
            <p className="text-[11px] text-muted mt-1">Fallback with hanger</p>
          </div>
          <div className="col-span-2">
            <Carousel>
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-mist p-8 text-center border border-line">
                  <h4 className="text-sm uppercase tracking-wider font-medium text-ink mb-1">
                    Carousel Slide {n}
                  </h4>
                  <p className="text-xs text-muted">Responsive swipe on mobile, arrow controls on desktop.</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

