import type {Route} from './+types/popular';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Popular | Communa SG'}];
};

export default function PopularRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">🔥 Popular</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen (Epic A). We’ll wire this to “popular” sorting next.
        </p>
      </div>
    </AppLayout>
  );
}


