export async function createCartRequest({country, guestEmail, guestName, cartItemsFromFront}: {
    country: string;
    guestEmail: string;
    guestName: string;
    cartItemsFromFront: { itemId: string; quantity: number; price: number }[];
}) {
    const res = await fetch("http://localhost:3999/api/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            country,
            guestEmail,
            guestName,
            cartItemsFromFront: cartItemsFromFront
        }),
    });
    if (!res.ok) {
        throw new Error("Erreur lors de la création du panier");
    }
    return res.json();
}
