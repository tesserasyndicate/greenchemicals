# Green Chemicals website

Static, responsive catalogue and product enquiry website.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. There is no compilation or package installation step.

## Deploy

Deploy the contents of this folder to any static web host. For Vercel, use this folder as the project root, select Other, and leave the build command and output directory blank for a static root deployment. The site does not require environment variables.

## Files

- `index.html`, `style.css`, `script.js`: home page, catalogue, enquiry dialog, and shared styles/behavior.
- `product.html`, `product.css`, `product-page.js`: product detail template and page behavior.
- `products.js`: product catalogue data.
- `assets/`: logo, certification files, and product photography.

## Enquiry behavior

The enquiry dialog prepares a message that the visitor can copy or continue with WhatsApp. This static site does not send email or store form submissions on a server.
