type CommitteeMember = {
  image: string | null;
  name: string;
  role: string;
  email: string;
  phone: string;
};

export default function CommitteeMemberGrid() {
  const committeeMembers = [
    {
      image: null,
      name: 'Graham Bull',
      role: 'Tournament Secretary',
      email: 'graham@gmail.com',
      phone: '01707 321759',
    },
    {
      image: null,
      name: 'Neil Grimson',
      role: 'Chair of Conduct Committee/Deputy Treasurer',
      email: '',
      phone: '07789 000478',
    },
    {
      image: null,
      name: 'Helen Holehouse',
      role: 'Chair',
      email: '',
      phone: '07813 479917',
    },
    {
      image: null,
      name: 'Louise Hughes',
      role: 'Welfare Officer',
      email: '',
      phone: '07774 723654',
    },
    {
      image: null,
      name: 'Steve Hull',
      role: 'Chief TD',
      email: '',
      phone: '07983 609233',
    },
    {
      image: null,
      name: 'Linda Lennox',
      role: 'Treasurer',
      email: '',
      phone: '01707 881769',
    },
    {
      image: null,
      name: 'Jan Palmer Sayer',
      role: 'Communication Officer',
      email: '',
      phone: '01992 581375',
    },
    {
      image: null,
      name: 'Satish Panchamia',
      role: 'Deputy Chief TD',
      email: '',
      phone: '07931 403053',
    },
    {
      image: null,
      name: 'Tim Nash',
      role: 'Expert Player Liason',
      email: '',
      phone: '07761 240688',
    },
    {
      image: null,
      name: 'Robert Reeve',
      role: 'Deputy Membership Secretary/Technical Support',
      email: '',
      phone: '07902 432274',
    },
    {
      image: null,
      name: 'Francis Wilson',
      role: 'Membership Secretary',
      email: '',
      phone: '01707 324639',
    },
    {
      image: null,
      name: 'Janet Wren',
      role: 'Club Secretary',
      email: '',
      phone: '07768 441022',
    },
  ] as CommitteeMember[];

  return (
    <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3'>
      {committeeMembers.map((committeeMember, index) => (
        <div
          key={index}
          className='flex flex-col items-center overflow-hidden rounded-2xl bg-white p-4 text-center shadow-lg'
        >
          <img
            src={committeeMember.image || '/images/149071.png'}
            alt={committeeMember.name}
            className='size-24 rounded-full border-2 border-gray-300 object-cover'
          />
          <h2 className='mt-3 text-lg font-semibold'>{committeeMember.name}</h2>
          <p className='text-sm text-gray-600'>{committeeMember.role}</p>
          <div className='mt-3 text-sm text-gray-500'>
            {committeeMember.email && (
              <p>
                📧{' '}
                <a
                  href={`mailto:${committeeMember.email}`}
                  className='text-blue-500 hover:underline'
                >
                  {committeeMember.email}
                </a>
              </p>
            )}
            {committeeMember.phone && <p>📞 {committeeMember.phone}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
