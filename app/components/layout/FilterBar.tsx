import {Link, useSearchParams} from 'react-router';
import clsx from 'clsx';

interface FilterBarProps {
  activeCategory?: string | null;
}

const categories = [
  { value: null, label: 'House Tours', featured: true },
  { value: 'HDB', label: 'HDB (BTO)' },
  { value: 'HDB-RESALE', label: 'HDB (Resale)' },
  { value: 'CONDO', label: 'Condo' },
];

const tabs = [
  { value: 'for-you', label: 'For You' },
  { value: 'featured', label: 'Featured' },
  { value: 'popular', label: 'Popular' },
];

export function FilterBar({ activeCategory }: FilterBarProps) {
  const [searchParams] = useSearchParams();

  const createCategoryUrl = (category: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="filter-bar">
      {/* Mobile horizontal scroll tabs */}
      <div className="filter-tabs-mobile">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={clsx(
              'filter-tab',
              tab.value === 'for-you' && !activeCategory && 'active'
            )}
          >
            {tab.label}
          </button>
        ))}
        <button
          className={clsx(
            'filter-tab featured',
            !activeCategory && 'active'
          )}
        >
          House Tours
        </button>
      </div>

      {/* Category filter pills */}
      <div className="filter-categories">
        {categories.map((category) => (
          <Link
            key={category.value || 'all'}
            to={createCategoryUrl(category.value)}
            className={clsx(
              'filter-pill',
              category.featured && 'featured',
              activeCategory === category.value && 'active'
            )}
          >
            {category.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
