const TARGETS = [
    { url: "https://wa.me/6287800092728", weight: 33 }, // 33% chance
    { url: "https://wa.me/6281927573565", weight: 33 }, // 33% chance
    { url: "https://wa.me/6282258520768", weight: 33 }, // 34% chance (to make 100)
];

const server = Bun.serve({
    port: process.env.PORT || 3000,
    fetch(req) {
        const random = Math.random() * 100;
        let cumulativeWeight = 0;

        for (const target of TARGETS) {
            cumulativeWeight += target.weight;
            if (random <= cumulativeWeight) {
                return Response.redirect(target.url, 302);
            }
        }

        // Fallback to first link if something goes wrong
        return Response.redirect(TARGETS[0]!.url, 302);
    },
});

console.log(`Rotator running on ${server.url}`);