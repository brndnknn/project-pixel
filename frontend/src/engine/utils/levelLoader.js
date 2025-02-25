export async function loadLevel(levelName){
    const levelString = `./src/assets/${levelName}.json`
    try {
        const response = await fetch(levelString);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}