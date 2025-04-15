export async function fetchAllBalloonData() {
  const balloonData = [];

  for(let i=0;i<=23;i++){
    const fileName = `${String(i).padStart(2,'0')}.json`;
    const url = `https://a.windbornesystems.com/treasure/${filename}`;

    try {
      const response = await fetch(url);
      if(!response.ok) throw new Error(`HTTP ${response.status}`);;
      const data = await response.json();

      balloonData.push({
        fileName,
        timestamp: new Date().toISOString(),
        data
      });

    } catch (error) {
      console.warn(`❌ Skipped ${filename}: ${err.message}`);
    }
  }

  return balloonData;
}