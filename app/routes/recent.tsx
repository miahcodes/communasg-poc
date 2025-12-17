import type {Route} from './+types/recent';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Recent | Communa SG'}];
};

export default function RecentRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">🕐 Recent</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen (Epic A). We’ll wire this to a “latest posts” feed next.
        </p>
      </div>
    </AppLayout>
  );
}


