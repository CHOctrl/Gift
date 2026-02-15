# A Cute Surprise for Your Girlfriend

This is a generative art web application built with p5.js and Node.js. It features a particle system that forms loving messages and reacts to mouse movement.

## Features
- **Generative Art**: Particles flow organically using Perlin noise.
- **Interactive**: Mouse movement disrupts particles, which then reform.
- **Customizable**: Click to cycle through messages ("Surprise!", "For You", "<3", "Love").
- **Responsive**: Adapts to window size.

## One-Click Deploy on Render

1.  **Push to GitHub/GitLab**: Push this code to a new repository on your GitHub or GitLab account.
2.  **Render Dashboard**: Go to [Render](https://dashboard.render.com/).
3.  **New Blueprint**: Click "New" -> "Blueprint".
4.  **Connect Repo**: Connect your new repository.
5.  **Deploy**: Render will automatically detect the `render.yaml` file and deploy your app.

## Local Development

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the server:
    ```bash
    node server.js
    ```
3.  Open `http://localhost:3000` in your browser.

## Customization

Edit `public/sketch.js` to change the messages in the `words` array or adjust colors.
