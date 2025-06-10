import PageContainer from '@/components/layout/page-container';
import React from 'react';

interface IOverview {
  door_logs: React.ReactNode;
  user_credentials: React.ReactNode;
}

export default function OverViewLayout({
  door_logs,
  user_credentials
}: IOverview) {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-2'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Hi, Welcome back 👋
          </h2>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          {door_logs}
          {user_credentials}
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'></div>
          <div className='col-span-4 md:col-span-3'>
            {/* sales parallel routes */}
          </div>
          <div className='col-span-4'></div>
          <div className='col-span-4 md:col-span-3'></div>
        </div>
      </div>
    </PageContainer>
  );
}
