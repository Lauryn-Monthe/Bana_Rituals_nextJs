export async function getAllItems() {
    try {
        const res = await fetch("http://localhost:3999/api/items", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Erreur lors de la récupération des items");
        }

        return await res.json();
    } catch (error) {
        console.error("Erreur getAllItems:", error);
        return [];
    }
}
