import type {Route} from './+types/create';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Create Post | Communa SG'}];
};

export default function CreateRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">➕ Create Post</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen (Epic A). We’ll add the Create Post UI later; persistence is
          parked for now.
        </p>
      </div>
    </AppLayout>
  );
}


