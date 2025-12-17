import type {Route} from './+types/experts';
import {AppLayout} from '~/components/layout/AppLayout';

export const meta: Route.MetaFunction = () => {
  return [{title: 'ID Experts | Communa SG'}];
};

export default function ExpertsRoute() {
  return (
    <AppLayout>
      <div className="feed-container">
        <h1 className="feed-section-title">👷 ID Experts</h1>
        <p style={{marginTop: 8, color: '#6b7280'}}>
          Placeholder screen. We’ll flesh this out later once we decide the experts directory
          structure.
        </p>
      </div>
    </AppLayout>
  );
}


