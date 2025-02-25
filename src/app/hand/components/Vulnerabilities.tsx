export default function Vulnerabilities(props: { vulnerable: string }) {
  const vulnerability = {
    N: ['NS', 'Both', 'All'].includes(props.vulnerable),
    S: ['NS', 'Both', 'All'].includes(props.vulnerable),
    E: ['EW', 'Both', 'All'].includes(props.vulnerable),
    W: ['EW', 'Both', 'All'].includes(props.vulnerable),
  };

  return (
    <>
      <div
        className={`absolute top-2 px-2 py-1 ${vulnerability.N ? 'bg-red-500' : 'bg-green-500'}`}
      >
        N
      </div>
      <div
        className={`absolute bottom-2 px-2 py-1 ${vulnerability.S ? 'bg-red-500' : 'bg-green-500'}`}
      >
        S
      </div>
      <div
        className={`absolute left-2 px-2 py-1 ${vulnerability.W ? 'bg-red-500' : 'bg-green-500'}`}
      >
        W
      </div>
      <div
        className={`absolute right-2 px-2 py-1 ${vulnerability.E ? 'bg-red-500' : 'bg-green-500'}`}
      >
        E
      </div>
    </>
  );
}
