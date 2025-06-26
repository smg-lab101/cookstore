async function main() {
    try {
        await mongoose.connect(mongodbURI);
        console.log('Connected to MongoDB');

        // Nutzer anlegen
        const users = await User.insertMany([
            { name: 'Sarah', email: 'sarah@example.com', passwordHash: 'sarah123' },
            { name: 'Bernd', email: 'bernd@example.com', passwordHash: 'bernd123' },
            { name: 'Vivian', email: 'vivian@example.com', passwordHash: 'vivian123' }
        ]);

        const [sarah, bernd, vivian] = users;

        const recipes = [
            {
                title: "Sarahs Spaghetti Carbonara",
                description: "Italienischer Klassiker mit Eiern, Käse und Speck",
                image: "Bild",
                ingredients: [
                    "400g Spaghetti",
                    "200g Pancetta oder Guanciale",
                    "4 Eier",
                    "100g Pecorino Romano",
                    "Salz und Pfeffer"
                ],
                steps: `Spaghetti in Salzwasser kochen. In der Zwischenzeit den Speck in einer Pfanne auslassen.
Eier mit dem geriebenen Käse verquirlen, salzen und pfeffern.
Die abgetropften Nudeln mit dem Speck vermischen und vom Herd nehmen.
Die Ei-Käse-Mischung unterrühren bis eine cremige Sauce entsteht.
Sofort servieren mit etwas mehr geriebenem Käse.`,
                createdBy: sarah._id
            },
            {
                title: "Bernds bester Apfelkuchen",
                description: "Traditioneller Kuchen mit frischen Äpfeln und Zimt",
                image: "Bild",
                ingredients: [
                    "5 Äpfel",
                    "200g Mehl",
                    "100g Butter",
                    "100g Zucker",
                    "2 Eier",
                    "1 TL Zimt",
                    "1 TL Backpulver"
                ],
                steps: `Backofen auf 180°C vorheizen. Äpfel schälen, entkernen und in Scheiben schneiden.
Butter und Zucker cremig rühren, Eier einzeln unterrühren.
Mehl mit Backpulver und Zimt mischen und unterrühren.
Teig in eine gefettete Form geben, Äpfel darauf verteilen und leicht eindrücken.
Ca. 40 Minuten backen, abkühlen lassen und servieren.`,
                createdBy: bernd._id
            },
            {
                title: "Vivians bunter Quinoasalat",
                description: "Frischer, leichter Salat mit Gemüse und Feta",
                image: "Bild",
                ingredients: [
                    "150g Quinoa",
                    "1 rote Paprika",
                    "1/2 Gurke",
                    "100g Feta",
                    "2 Frühlingszwiebeln",
                    "Saft einer Zitrone",
                    "2 EL Olivenöl",
                    "Salz und Pfeffer"
                ],
                steps: `Quinoa nach Packungsanweisung kochen und abkühlen lassen.
Paprika, Gurke und Frühlingszwiebeln klein schneiden, Feta zerbröseln.
Alles mit dem Quinoa in einer großen Schüssel vermengen.
Zitronensaft und Olivenöl zugeben, mit Salz und Pfeffer abschmecken.
Gut durchziehen lassen und gekühlt servieren.`,
                createdBy: vivian._id
            },
            {
                title: "Vivians schnelle Brokkoli-Pasta",
                description: "Cremige Pasta mit grünem Gemüse",
                image: "Bild",
                ingredients: [
                    "300g Pasta",
                    "1 kleiner Brokkoli",
                    "1 Knoblauchzehe",
                    "100ml Sahne",
                    "50g Parmesan",
                    "Olivenöl",
                    "Salz und Pfeffer"
                ],
                steps: `Pasta in Salzwasser kochen. Brokkoli in Röschen teilen und in den letzten 5 Minuten mitgaren.
Knoblauch in Olivenöl anbraten, Sahne und Parmesan zugeben, kurz aufkochen.
Pasta und Brokkoli abgießen, zur Sauce geben und alles vermengen.
Mit Salz und Pfeffer abschmecken und servieren.`,
                createdBy: vivian._id
            },
            {
                title: "Sarahs Frühstücksbowle mit Beeren",
                description: "Gesunde Bowl mit Joghurt, Früchten und Haferflocken",
                image: "Bild",
                ingredients: [
                    "200g Naturjoghurt",
                    "2 EL Haferflocken",
                    "1 TL Honig",
                    "1 Handvoll Heidelbeeren",
                    "1 Handvoll Himbeeren",
                    "1/2 Banane",
                    "1 TL Chiasamen"
                ],
                steps: `Joghurt mit Haferflocken und Honig verrühren.
Banane in Scheiben schneiden, zusammen mit den Beeren auf dem Joghurt anrichten.
Chiasamen darüberstreuen und sofort genießen.`,
                createdBy: sarah._id
            },
            {
                title: "Bernds rustikaler Flammkuchen",
                description: "Herzhafter Flammkuchen mit Speck und Zwiebeln",
                image: "Bild",
                ingredients: [
                    "250g Mehl",
                    "125ml Wasser",
                    "2 EL Öl",
                    "1 Prise Salz",
                    "150g Crème fraîche",
                    "100g Speckwürfel",
                    "1 Zwiebel"
                ],
                steps: `Backofen auf 220°C vorheizen. Aus Mehl, Wasser, Öl und Salz einen Teig kneten und dünn ausrollen.
Crème fraîche auf dem Teig verstreichen.
Zwiebel in feine Ringe schneiden und mit Speckwürfeln auf dem Teig verteilen.
Ca. 15 Minuten backen, bis der Rand knusprig ist.`,
                createdBy: bernd._id
            }
        ];

        await Recipe.insertMany(recipes);
        console.log('Rezepte gespeichert:', recipes.map(r => r.title));

        const allRecipes = await Recipe.find().populate('createdBy');
        console.log('Alle Rezepte mit Benutzer:', allRecipes);

    } catch (err) {
        console.error('Fehler:', err);
    } finally {
        await mongoose.disconnect();
        console.log('Verbindung zu MongoDB beendet');
    }
}
