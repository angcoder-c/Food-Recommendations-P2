'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from './../stores/useAuthStore';
import MostPopularProducts from '@/components/most-popular';

export default function Home() {
  return (
    <div className="mx-auto py-8">
        <MostPopularProducts/>
    </div>
  );
}
