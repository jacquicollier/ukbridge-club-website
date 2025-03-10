export type Event = {
  title: string;
  date: Date;
  description: string;
  location: string;
  realBridgeLink: string | null;
  signUpLink: string | null;
};

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function EventList({ events }: { events: Event[] }) {
  return (
    <div className='space-y-4'>
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className='rounded-lg border bg-white p-4 shadow-md'>
            <h3 className='text-lg font-semibold'>{event.title}</h3>
            <p className='text-gray-600'>
              {event.date.toLocaleString('en-GB', options)}
            </p>
            <p className='text-gray-500'>{event.description}</p>

            <div className='mt-3 flex gap-2'>
              {event.realBridgeLink && (
                <a
                  href={event.realBridgeLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
                >
                  Real Bridge
                </a>
              )}
              {event.signUpLink && (
                <a
                  href={event.signUpLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600'
                >
                  Sign Up
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>No events found.</p>
      )}
    </div>
  );
}
