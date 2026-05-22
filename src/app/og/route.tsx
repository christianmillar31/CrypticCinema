import { ImageResponse } from 'next/og';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #070b14 0%, #141a29 55%, #252f4a 100%)',
          color: '#f8fafc',
          padding: '64px',
          fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              border: '2px solid #38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8',
              fontSize: '24px',
              fontWeight: 700,
            }}
          >
            CC
          </div>
          <div style={{ fontSize: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Cryptic Cinema
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ fontSize: '62px', lineHeight: 1.05, fontWeight: 800, letterSpacing: '-0.03em' }}>
            Guess the movie.
            <br />
            Decode the clue.
          </div>
          <div style={{ fontSize: '30px', color: '#cbd5e1' }}>
            Difficulty filters • Genre filters • 300 handcrafted clues
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
