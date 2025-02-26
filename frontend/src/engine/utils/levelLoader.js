/**
 * Asynchronously loads level data from a JSON file.
 *
 * Fetches the level file from the assets directory, parses the JSON data, and returns the level configuration.
 * Logs an error to the console if the fetch operation fails.
 *
 * @param {string} levelName - The name of the level file (without the .json extension).
 * @returns {Promise<Object>} The parsed level data object.
 */
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