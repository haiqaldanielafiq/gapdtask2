export default function Home(){
  return (
    <main style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
      background:'#000',
      color:'#FFD700',
      fontFamily:'sans-serif'
    }}>
      <div style={{textAlign:'center'}}>
        <h1>Math-Man Base</h1>
        <p>Pac-Man inspired mathematics game starter.</p>
        <button style={{
          padding:'12px 24px',
          background:'#FFD700',
          border:'none',
          cursor:'pointer'
        }}>
          Start Game
        </button>
      </div>
    </main>
  );
}
