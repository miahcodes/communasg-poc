import type {Route} from './+types/following';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Following | Communa SG'}];
};

export default function FollowingRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">👥 Following</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen (Epic A). In MVP we’ll keep this UI-only (no auth).
        </p>
      </div>
    </AppLayout>
  );
}


