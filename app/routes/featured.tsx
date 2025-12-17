import type {Route} from './+types/featured';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Featured | Communa SG'}];
};

export default function FeaturedRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">⭐ Featured</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen (Epic A). We’ll reuse the feed component and apply “featured”
          sorting.
        </p>
      </div>
    </AppLayout>
  );
}


