#!/usr/bin/env node
/**
 * SEO Build Script for Animal Awards
 * Generates individual animal pages and sitemap.xml
 */

const fs = require('fs');
const path = require('path');

// Load animal database
const animalDbPath = path.join(__dirname, 'data', 'animalDatabase.js');
const animalDbContent = fs.readFileSync(animalDbPath, 'utf8');

// Extract just the array definition and convert to a function that returns it
const arrayPart = animalDbContent.split('const AnimalDatabase')[0];
const modifiedCode = arrayPart.replace('const animalDatabase =', 'return ');
const getDatabase = new Function(modifiedCode);
const animalDatabase = getDatabase();

if (!animalDatabase || !Array.isArray(animalDatabase)) {
    console.error('Could not parse animal database');
    process.exit(1);
}

console.log(`Loaded ${animalDatabase.length} animals from database`);

// Create animals directory if it doesn't exist
const animalsDir = path.join(__dirname, 'animals');
if (!fs.existsSync(animalsDir)) {
    fs.mkdirSync(animalsDir, { recursive: true });
}

// Helper to create URL-safe slug
function createSlug(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

// Helper to get conservation status color
function getConservationColor(status) {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('critically endangered')) return '#dc3545';
    if (statusLower.includes('endangered')) return '#fd7e14';
    if (statusLower.includes('vulnerable')) return '#ffc107';
    if (statusLower.includes('near threatened')) return '#20c997';
    if (statusLower.includes('least concern')) return '#28a745';
    return '#6c757d';
}

// Template for individual animal pages
function generateAnimalPage(animal) {
    const slug = createSlug(animal.name);
    const marsScore = Math.round((animal.intelligence + animal.adaptability + animal.survival + animal.usefulness) / 4);
    const conservationColor = getConservationColor(animal.conservation);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${animal.name} - Mars Readiness Profile | Animal Awards</title>
    <meta name="description" content="Learn about ${animal.name}'s potential for the Mars mission. Intelligence: ${animal.intelligence}/100, Adaptability: ${animal.adaptability}/100, Survival: ${animal.survival}/100. ${animal.facts[0]}.">
    <meta name="robots" content="index, follow">
    <meta name="author" content="Animal Awards">
    <link rel="canonical" href="https://www.animalawards.com/animals/${slug}.html">

    <!-- Open Graph -->
    <meta property="og:title" content="${animal.name} - Mars Readiness Profile | Animal Awards">
    <meta property="og:description" content="${animal.facts[0]}. Vote for ${animal.name} in the Mars animal selection!">
    <meta property="og:url" content="https://www.animalawards.com/animals/${slug}.html">
    <meta property="og:type" content="article">
    <meta property="og:image" content="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22 style=%22background:%23667eea%22><text x=%22200%22 y=%22280%22 font-size=%22200%22 text-anchor=%22middle%22>${encodeURIComponent(animal.emoji)}</text></svg>">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${animal.name} - Mars Readiness Profile">
    <meta name="twitter:description" content="${animal.facts[0]}">

    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${encodeURIComponent(animal.emoji)}</text></svg>">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${animal.name} - Mars Mission Candidate",
        "description": "${animal.facts[0]}. Comprehensive analysis of ${animal.name}'s potential for space colonization.",
        "author": {
            "@type": "Organization",
            "name": "Animal Awards"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Animal Awards",
            "url": "https://www.animalawards.com"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://www.animalawards.com/animals/${slug}.html"
        },
        "about": {
            "@type": "Thing",
            "name": "${animal.name}",
            "description": "${animal.category} from ${animal.habitat} habitat"
        }
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is ${animal.name}'s intelligence rating?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${animal.name} has an intelligence rating of ${animal.intelligence} out of 100, making it ${animal.intelligence >= 80 ? 'highly intelligent' : animal.intelligence >= 60 ? 'moderately intelligent' : 'less intelligent compared to other candidates'}."
                }
            },
            {
                "@type": "Question",
                "name": "Could ${animal.name} survive on Mars?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${animal.name} has a Mars readiness score of ${marsScore}/100 based on intelligence (${animal.intelligence}), adaptability (${animal.adaptability}), survival skills (${animal.survival}), and usefulness (${animal.usefulness})."
                }
            },
            {
                "@type": "Question",
                "name": "What is ${animal.name}'s conservation status?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${animal.name}'s current conservation status is: ${animal.conservation}."
                }
            },
            {
                "@type": "Question",
                "name": "What are some interesting facts about ${animal.name}?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "${animal.facts.join('. ')}."
                }
            }
        ]
    }
    </script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }

        .breadcrumb {
            background: rgba(255, 255, 255, 0.9);
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-size: 0.9rem;
        }

        .breadcrumb a {
            color: #667eea;
            text-decoration: none;
        }

        .breadcrumb a:hover {
            text-decoration: underline;
        }

        .animal-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .animal-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .animal-emoji {
            font-size: 8rem;
            margin-bottom: 20px;
            display: block;
        }

        .animal-name {
            font-size: 2.5rem;
            background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }

        .animal-meta {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 15px;
        }

        .conservation-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            color: white;
            font-weight: bold;
            font-size: 0.9rem;
            background: ${conservationColor};
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin: 30px 0;
        }

        .stat-box {
            text-align: center;
            padding: 20px;
            background: rgba(0, 0, 0, 0.05);
            border-radius: 15px;
        }

        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #4ECDC4;
        }

        .stat-label {
            color: #666;
            font-size: 0.85rem;
            margin-top: 5px;
        }

        .stat-bar {
            height: 6px;
            background: #eee;
            border-radius: 3px;
            margin-top: 8px;
            overflow: hidden;
        }

        .stat-fill {
            height: 100%;
            background: linear-gradient(90deg, #4ECDC4, #667eea);
            border-radius: 3px;
        }

        .mars-score {
            text-align: center;
            padding: 25px;
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E88 100%);
            border-radius: 15px;
            color: white;
            margin: 30px 0;
        }

        .mars-score-value {
            font-size: 4rem;
            font-weight: bold;
        }

        .mars-score-label {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .section {
            margin: 30px 0;
        }

        .section-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #333;
        }

        .facts-list {
            list-style: none;
            padding: 0;
        }

        .facts-list li {
            padding: 12px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .facts-list li:last-child {
            border-bottom: none;
        }

        .vote-section {
            text-align: center;
            margin-top: 30px;
        }

        .vote-count {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 15px;
        }

        .vote-count strong {
            color: #FF6B6B;
            font-size: 1.5rem;
        }

        .vote-btn {
            display: inline-block;
            padding: 15px 40px;
            background: linear-gradient(45deg, #FF6B6B, #FF8E88);
            color: white;
            text-decoration: none;
            border-radius: 30px;
            font-weight: bold;
            font-size: 1.1rem;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .vote-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
        }

        .related-section {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid rgba(0, 0, 0, 0.1);
        }

        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }

        .back-link:hover {
            text-decoration: underline;
        }

        @media (max-width: 600px) {
            .animal-emoji {
                font-size: 5rem;
            }
            .animal-name {
                font-size: 1.8rem;
            }
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> &gt;
            <a href="/#animals">Animals</a> &gt;
            <span>${animal.name}</span>
        </nav>

        <article class="animal-card" itemscope itemtype="https://schema.org/Article">
            <header class="animal-header">
                <span class="animal-emoji" role="img" aria-label="${animal.name}">${animal.emoji}</span>
                <h1 class="animal-name" itemprop="headline">${animal.name}</h1>
                <p class="animal-meta">${animal.category} &bull; ${animal.habitat} Habitat</p>
                <span class="conservation-badge">${animal.conservation}</span>
            </header>

            <div class="mars-score">
                <div class="mars-score-value">${marsScore}</div>
                <div class="mars-score-label">Mars Readiness Score</div>
            </div>

            <section class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value">${animal.intelligence}</div>
                    <div class="stat-label">Intelligence</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${animal.intelligence}%"></div></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${animal.adaptability}</div>
                    <div class="stat-label">Adaptability</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${animal.adaptability}%"></div></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${animal.cuteness}</div>
                    <div class="stat-label">Cuteness</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${animal.cuteness}%"></div></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${animal.survival}</div>
                    <div class="stat-label">Survival</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${animal.survival}%"></div></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${animal.social}</div>
                    <div class="stat-label">Social</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${animal.social}%"></div></div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${animal.usefulness}</div>
                    <div class="stat-label">Usefulness</div>
                    <div class="stat-bar"><div class="stat-fill" style="width: ${animal.usefulness}%"></div></div>
                </div>
            </section>

            <section class="section">
                <h2 class="section-title">Fascinating Facts</h2>
                <ul class="facts-list" itemprop="articleBody">
                    ${animal.facts.map(fact => `<li><span>&#10003;</span> ${fact}</li>`).join('\n                    ')}
                </ul>
            </section>

            <section class="vote-section">
                <p class="vote-count">Current Votes: <strong>${animal.votes.toLocaleString()}</strong></p>
                <a href="/?vote=${animal.id}" class="vote-btn">Vote for ${animal.name} for Mars!</a>
            </section>

            <nav class="related-section">
                <a href="/" class="back-link">&larr; Back to All Animals</a>
                <span style="margin: 0 15px; color: #ccc;">|</span>
                <a href="/game.html" class="back-link">Play Mars Ark Explorer Game &rarr;</a>
            </nav>
        </article>
    </div>
</body>
</html>`;
}

// Generate all animal pages
console.log('Generating individual animal pages...');
const generatedPages = [];
const uniqueAnimals = new Map();

// Deduplicate by name (keep first occurrence)
animalDatabase.forEach(animal => {
    if (!uniqueAnimals.has(animal.name)) {
        uniqueAnimals.set(animal.name, animal);
    }
});

uniqueAnimals.forEach((animal, name) => {
    const slug = createSlug(name);
    const filename = `${slug}.html`;
    const filepath = path.join(animalsDir, filename);

    const pageContent = generateAnimalPage(animal);
    fs.writeFileSync(filepath, pageContent);

    generatedPages.push({
        name: animal.name,
        slug: slug,
        filename: filename
    });
});

console.log(`Generated ${generatedPages.length} animal pages`);

// Generate sitemap.xml
console.log('Generating sitemap.xml...');
const today = new Date().toISOString().split('T')[0];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Main Pages -->
    <url>
        <loc>https://www.animalawards.com/</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.animalawards.com/game.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

    <!-- Individual Animal Pages -->
${generatedPages.map(page => `    <url>
        <loc>https://www.animalawards.com/animals/${page.filename}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapContent);
console.log('Generated sitemap.xml');

// Generate robots.txt
console.log('Generating robots.txt...');
const robotsContent = `# Robots.txt for Animal Awards
# https://www.animalawards.com

User-agent: *
Allow: /

# Sitemap location
Sitemap: https://www.animalawards.com/sitemap.xml

# Crawl-delay suggestion (optional)
Crawl-delay: 1

# Allow all search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsContent);
console.log('Generated robots.txt');

// Generate animal index JSON for dynamic use
console.log('Generating animal index...');
const animalIndex = generatedPages.map(page => ({
    name: page.name,
    slug: page.slug,
    url: `/animals/${page.filename}`
}));

fs.writeFileSync(
    path.join(__dirname, 'data', 'animal-index.json'),
    JSON.stringify(animalIndex, null, 2)
);
console.log('Generated animal-index.json');

console.log('\n=== SEO Build Complete ===');
console.log(`Total animal pages: ${generatedPages.length}`);
console.log('Files generated:');
console.log('  - sitemap.xml');
console.log('  - robots.txt');
console.log('  - data/animal-index.json');
console.log(`  - animals/*.html (${generatedPages.length} files)`);
