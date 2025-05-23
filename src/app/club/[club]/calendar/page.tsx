'use client';

import EventList from '@/app/club/[club]/calendar/components/EventList';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function CalendarPage() {
  const [filter, setFilter] = useState('today');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const today = dayjs();
  const startOfNextWeek = today.add(1, 'week').startOf('week');
  const startOfNextMonth = today.add(1, 'month').startOf('month');

  const calendarEvents = [
    {
      title: 'Competitive Pairs',
      date: new Date('2025-03-05T19:30:00Z'),
      description: '21/22 Brds Level 4 NGS & MP',
      location: 'RealBridge',
      realBridgeLink: 'real-bridge-link',
      signUpLink: 'sign-up-link',
    },
    {
      title: 'Thursday AM Pairs',
      date: new Date('2025-03-06T10:00:00Z'),
      description: '21/22 Brds Level 4 NGS & MP',
      location: 'KGV',
      realBridgeLink: null,
      signUpLink: 'sign-up-link',
    },
    {
      title: 'Gentle Duplicate',
      date: new Date('2025-03-06T16:30:00Z'),
      description: '21/22 Brds Level 4 NGS & MP',
      location: 'RealBridge',
      realBridgeLink: 'real-bridge-link',
      signUpLink: 'sign-up-link',
    },
  ];

  const filteredEvents = calendarEvents.filter((event) => {
    const eventDate = dayjs(event.date);

    switch (filter) {
      case 'today':
        return eventDate.isSame(today, 'day');
      case 'this-week':
        return eventDate.isSame(today, 'week');
      case 'next-week':
        return eventDate.isSame(startOfNextWeek, 'week');
      case 'this-month':
        return eventDate.isSame(today, 'month');
      case 'next-month':
        return eventDate.isSame(startOfNextMonth, 'month');
      case 'custom':
        return customStart && customEnd
          ? eventDate.isAfter(dayjs(customStart)) &&
              eventDate.isBefore(dayjs(customEnd))
          : true;
      default:
        return true;
    }
  });

  return (
    <div className='p-4'>
      <div className='mx-auto max-w-4xl p-4'>
        <h2 className='mb-4 text-center text-2xl font-semibold'>
          Upcoming Events
        </h2>

        {/* Dropdown Filter */}
        <div className='mb-4'>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='w-full rounded-md border p-2 sm:w-auto'
          >
            <option value='today'>Today</option>
            <option value='this-week'>This Week</option>
            <option value='next-week'>Next Week</option>
            <option value='this-month'>This Month</option>
            <option value='next-month'>Next Month</option>
            <option value='custom'>Custom</option>
          </select>
        </div>

        {/* Custom Date Inputs */}
        {filter === 'custom' && (
          <div className='mb-4 flex gap-2'>
            <input
              type='date'
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className='w-full rounded-md border p-2'
            />
            <input
              type='date'
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className='w-full rounded-md border p-2'
            />
          </div>
        )}
        <EventList events={filteredEvents} />
      </div>
    </div>
  );
}
