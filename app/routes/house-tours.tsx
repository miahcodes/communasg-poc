import type {Route} from './+types/house-tours';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'House Tours | Communa SG'}];
};

export default function HouseToursRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">🏠 House Tours</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen (Epic A). This will share the same feed layout as home.
        </p>
      </div>
    </AppLayout>
  );
}


