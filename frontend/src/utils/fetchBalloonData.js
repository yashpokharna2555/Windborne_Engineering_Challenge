// utils/fetchBalloonData.js
export async function fetchAllBalloonData() {
  const balloonData = [];

  // Only attempt to fetch files that are known to work
  const validFiles = ['00.json', '03.json', '07.json'];

  for (const fileName of validFiles) {
    const url = `http://localhost:3000/balloon-data/${fileName}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      balloonData.push({
        fileName,
        timestamp: new Date().toISOString(),
        data,
      });

    } catch (err) {
      console.warn(`❌ Skipped ${fileName}: ${err.message}`);
    }
  }

  return balloonData;
}
