import DOMPurify from 'dompurify';

export default function CardGrid() {
  const cards = [
    {
      title: 'Duplicate and Lunch',
      image: null,
      description:
        '<p>Bridge and Lovely Lunch @ Waggoners</p><p>&nbsp;</p></p><p>Thursday 01 May 10am</p>' +
        '<p>&nbsp;</p><p>As it is polling day, KGV is unavailable, please see March bulletin for details.</p>' +
        '<p>&nbsp;</p><p>Please sign up here</p>',
    },
    {
      title: 'Congratulations',
      image: 'https://www.bridgewebs.com/herts/hertsbridge_5.jpg',
      description:
        '<p>Peter Clark and Jeff Green came Third in the HBA Green Pointed Swiss Pairs on Sunday 2nd March.</p><p>&nbsp;</p><p>Well Done!</p>',
    },
    {
      title: "Helen's Improver Lesson",
      image: null,
      description:
        "<p><b>When the opposition overcall</b></p><p>&nbsp;</p><p>Tuesday 04 March, 3-5pm & 7:30-9:30pm @ KGV</p><p>&nbsp;</p><p>For members of the club, £13/player.  Payment will be deducted from your cashless bridge account.</p><p>&nbsp;</p><p>Please email <a href='mailto:improverwgcbc@gmail.com'>improverwgcbc@gmail.com</a> for more details</p>",
    },
    {
      title: 'Steve’s Intermediate Lesson',
      image: null,
      description:
        "<p><b>Crowhurst</b></p><p>&nbsp;</p><p>Wednesday 05 March 2:30-4:30pm @ KGV, 7:30-9:30pm online</p><p>&nbsp;</p><p>For members of the club, £13/player.  Payment will be deducted from your cashless bridge account.</p><p>&nbsp;</p><p>Please email <a href='mailto:intermediatewgcbc@gmail.com'>intermediatewgcbc@gmail.com</a> for more details</p>",
    },
    {
      title: "Peter's Session",
      image: null,
      description:
        '<p><b>Defence to weak twos</b></p><p>&nbsp;</p><p>10am-12:30pm @ KGV</p><p>&nbsp;</p><p>For members of the club, £5/player.  Payment will be deducted from your cashless bridge account.</p><p>&nbsp;</p><p>Just turn up!</p>',
    },

    { title: 'Sign-up Sheets', image: null, description: '' },
    {
      title: 'Card 5',
      image: 'https://via.placeholder.com/300',
      description: '',
    },
    {
      title: 'Card 6',
      image: 'https://via.placeholder.com/300',
      description: '',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3'>
      {cards.map((card, index) => (
        <div key={index} className='w-full rounded-2xl bg-white shadow-lg'>
          <h2 className='mt-4 bg-blue-200 p-4 text-xl font-bold'>
            {card.title}
          </h2>
          <div className='mt-2 flex p-4'>
            {card.image && (
              <img
                className='m-4 w-32 object-cover'
                src={card.image}
                alt={card.title}
              />
            )}
            <div
              className='text-gray-600'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(card.description),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
