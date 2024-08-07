const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/images', express.static('images'));

app.post('/generate-og-image', async (req, res) => {
  try {
    const { title, content, image } = req.body;

    const escapedImage = image ? image.replace(/&/g, '&amp;') : '';

    console.log('Received data:', { title, content, image });
    console.log('Escaped image URL:', escapedImage);

    const svgImage = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#f7f8fa;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#e2e2e2;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bgGradient)" />
    <!-- Title -->
    <text x="50" y="80" font-family="Arial" font-size="50" font-weight="bold" fill="#333" text-anchor="start">
      ${title}
    </text>
    <!-- Content -->
    <text x="50" y="160" font-family="Arial" font-size="30" fill="#666" text-anchor="start" width="1100">
      ${content.length > 200 ? content.substring(0, 200) + '...' : content}
    </text>
    <!-- Image -->
    ${escapedImage ? `
      <image x="50" y="220" width="500" height="300" href="${escapedImage}" style="border:2px solid #ccc;box-shadow:5px 5px 15px rgba(0,0,0,0.3);" />
    ` : ''}
    <!-- Footer -->
    <rect x="0" y="580" width="1200" height="50" fill="#333" />
    <text x="50" y="610" font-family="Arial" font-size="20" fill="#f7f8fa" text-anchor="start">
      Your Brand Name
    </text>
  </svg>
`;

    // console.log('Generated SVG:', svgImage);

    const imageName = `og-img-${Date.now()}.png`;
    const imagePath = path.join(__dirname, 'images', imageName);

    await sharp(Buffer.from(svgImage))
      .png()
      .toFile(imagePath);

    const ogImageUrl = `http://localhost:${port}/images/${imageName}`;

    console.log('Generated image URL:', ogImageUrl);

    res.json({ ogImageUrl });
  } catch (error) {
    console.error('Error generating OG image:', error);
    res.status(500).json({ error: 'Failed to generate OG image' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
