export const API_CONFIG = {
    BASE_URL: "https://63623fd2376fab57.mokky.dev",
};

export const fetchDrinks = async ({ query }: { query: string }): Promise<Drink[]> => {
    try {
        const url = `${API_CONFIG.BASE_URL}/drinks${query ? `?name=*${query}*` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch drinks: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching drinks:", error);
        throw error;
    }
};

export const fetchNews = async ({ query = "" } = {}): Promise<New[]> => {
    try {
        const url = `${API_CONFIG.BASE_URL}/news${query ? `?name=*${query}*` : ''}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};