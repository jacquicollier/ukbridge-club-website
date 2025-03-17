export default function SessionsPage() {
  const sessions = [
    {
      title: 'Monday Morning Club Duplicate',
      where: 'RealBridge',
      when: 'Mondays at 10am',
      level: 4,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '20',
      mpAndNgs: true,
      additionalInfo: '',
    },
    {
      title: 'Tranquil Tuesday Club Duplicate',
      where: 'RealBridge',
      when: 'Tuesdays at 7pm',
      level: 2,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '18',
      mpAndNgs: true,
      additionalInfo: '',
    },
    {
      title: 'Wednesday Morning Club Duplicate',
      where: 'KGV',
      when: 'Wednesdays at 10am',
      level: 4,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '24',
      mpAndNgs: true,
      additionalInfo: '',
    },
    {
      title: 'Wednesday Evening Club Duplicate',
      where: 'RealBridge',
      when: 'Wednesdays at 7.30pm',
      level: 4,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '21/22',
      mpAndNgs: true,
      additionalInfo: '',
    },
    {
      title: 'Thursday Morning Club Duplicate',
      where: 'KGV',
      when: 'Thursdays at 10am',
      level: 2,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '24',
      mpAndNgs: true,
      additionalInfo: '',
    },
    {
      title: 'Thursday Afternoon Gentle Duplicate',
      where: 'RealBridge',
      when: 'Thursdays @4.30pm',
      level: 2,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '16',
      mpAndNgs: false,
      additionalInfo: '',
    },
    {
      title: 'Post Mortem Pairs/Workshop',
      where: 'KGV',
      when: 'Fridays at 10am',
      level: null,
      cost: '£5.00',
      visitorCost: '£5.00',
      additionalInfo: 'No partner needed, no sign up, just turn up!',
      boards: null,
      mpAndNgs: false,
    },
    {
      title: 'Saturday Morning Gentle Duplicate',
      where: 'KGV',
      when: 'Saturdays at 10.30am (alternate weeks)',
      level: 2,
      cost: '£2.50',
      visitorCost: '£5.00',
      boards: '16',
      mpAndNgs: false,
      additionalInfo: '',
    },
    {
      title: 'Supervised Play/Gentle Duplicate',
      where: 'KGV',
      when: 'Saturdays at 10.30am (alternate weeks)',
      level: 2,
      cost: '£2.50',
      visitorCost: '£5.00',
      mpAndNgs: false,
      additionalInfo: '',
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <h2 className='mb-6 text-center text-3xl font-bold'>Regular Sessions</h2>
      <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {sessions.map((session, index) => (
          <div
            key={index}
            className='rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition hover:shadow-xl'
          >
            <h3 className='text-xl font-bold text-gray-800'>{session.title}</h3>
            <p className='text-gray-600'>{session.when}</p>
            <p className='font-medium text-gray-700'>📍 {session.where}</p>
            {session.boards && (
              <p className='text-gray-700'>
                <span className='font-semibold'>Boards:</span> {session.boards}
              </p>
            )}
            <p className='text-gray-700'>
              <span className='font-semibold'>Entry:</span> {session.cost} (
              {session.visitorCost} for visitors)
            </p>
            {session.level && (
              <p className='text-gray-700'>
                <span className='font-semibold'>Level:</span> {session.level}
              </p>
            )}
            <p className='text-gray-700'>
              <span className='font-semibold'>{session.additionalInfo}</span>
            </p>
            <p
              className={`mt-2 text-sm font-semibold ${session.mpAndNgs ? 'text-green-600' : 'text-red-600'}`}
            >
              {session.mpAndNgs ? 'MP & NGS' : 'No MP & NGS'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
