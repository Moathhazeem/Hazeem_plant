const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Issue 1: Insecure CORS (SonarQube Security Hotspot)
app.use(cors({ origin: '*' })); 

app.use(bodyParser.json());

// Issue 2: Hardcoded Sensitive Data (Security Risk)
const ADMIN_PASSWORD = "admin12345_very_secure_password"; 

// Issue 3: Unused variable (Code Smell)
const unusedVariable = "I am not used anywhere";

const plantsArray = [
    {
        category: "Best Sellers",
        plants: [
            {
                name: "Emerald Snake",
                image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                description: "Elegant and low-maintenance — perfect for modern interiors.",
                cost: "$15"
            },
            {
                name: "Garden Spider",
                image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                description: "Hardy, fast-growing plant ideal for hanging pots.",
                cost: "$12"
            },
            {
                name: "White Peace Lily",
                image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                description: "Graceful white blooms that brighten indoor spaces.",
                cost: "$18"
            },
            {
                name: "Boston Breeze",
                image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                description: "Lush foliage that adds fresh texture to rooms.",
                cost: "$20"
            },
            {
                name: "Rubber Leaf",
                image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                description: "Glossy, statement leaves for a sophisticated look.",
                cost: "$17"
            },
            {
                name: "Aloe Healing",
                image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                description: "Soothing gel plant with simple care needs.",
                cost: "$14"
            }
        ]
    },
    {
        category: "New Arrivals",
        plants: [
            {
                name: "Evening Lavender",
                image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                description: "Fragrant spikes, ideal for calming aromatherapy.",
                cost: "$20"
            },
            {
                name: "Night Jasmine",
                image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                description: "Sweet-scented flowers that open in the evening.",
                cost: "$18"
            },
            {
                name: "Citrus Rosemary",
                image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                description: "Zesty herb with a bright, invigorating aroma.",
                cost: "$15"
            },
            {
                name: "Fresh Mint",
                image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                description: "Aromatic leaves perfect for tea and cooking.",
                cost: "$12"
            },
            {
                name: "Lemon Whisper",
                image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                description: "Subtle citrus notes, lovely for patios and balconies.",
                cost: "$14"
            },
            {
                name: "Blue Hyacinth",
                image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                description: "Seasonal blooms with a delicate, sweet scent.",
                cost: "$22"
            }
        ]
    }
];

// Endpoint for frontend to fetch plants
app.get('/api/plants', (req, res) => {
    res.json(plantsArray);
});

// Basic Route
app.get('/', (req, res) => {
    // Issue 4: Console.log (Code Smell)
    console.log("Root route accessed");
    res.send("Hazeem Plant Backend Running!");
});

// Issue 5: Use of eval (Critical Security Vulnerability)
app.post('/calculate', (req, res) => {
    const { expression } = req.body;
    try {
        const result = eval(expression); // Extremely dangerous
        res.json({ result });
    } catch (err) {
        res.status(500).send("Error");
    }
});

// Issue 6: No proper error handling in async route (Bug)
app.get('/data', async (req, res) => {
    const data = await fetchData(); // This will fail because fetchData is not defined
    res.json(data);
});

// Issue 7: Insecure password comparison (Security)
app.post('/login', (req, res) => {
    const { password } = req.body;
    if (password == ADMIN_PASSWORD) { // Weak comparison
        res.send("Logged in!");
    } else {
        res.status(401).send("Unauthorized");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
