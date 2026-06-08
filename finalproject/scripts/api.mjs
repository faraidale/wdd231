export async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading projects:", error);
        return []; // Return empty array on failure
    }
}
