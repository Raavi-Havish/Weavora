import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import React from 'react';
import { useState , useEffect } from 'react';
import { Search } from 'lucide-react'; // Ensure lucide-react is installed
// ─────────────────────────────────────────────
// ALL PRODUCTS DATA  (categorized)
// ─────────────────────────────────────────────

const allProducts = {

  // ═══════════════════════════════════════════
  // MEN  →  /category/men
  // ═══════════════════════════════════════════
  men: [
    // ── Men's Ethnic Wear ──────────────────
    { _id: 'm1',  name: 'Sherwani',                      price: 4000,  subcategory: "Men's Ethnic",   imageUrl: 'https://mehakboutique.com/cdn/shop/files/groom-sherwani-2805_b5609fc1-c6d8-456d-844b-0006d11eb061_1024x1024@2x.jpg' },
    { _id: 'm2',  name: 'Stylish Kurta',                 price: 4500,  subcategory: "Men's Ethnic",   imageUrl: 'https://cdn.shopify.com/s/files/1/0557/4452/8469/files/11_874be932-b419-4590-b1ee-1b3c2e389c72_480x480.png' },
    { _id: 'm3',  name: 'Ethnic Kurta',                  price: 2500,  subcategory: "Men's Ethnic",   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-XeLtaua453vg8oGyiL887ikWZXc-BUD3Lg&s' },
    { _id: 'm4',  name: 'Comfort Kurta',                 price: 5000,  subcategory: "Men's Ethnic",   imageUrl: 'https://www.fayonkids.com/cdn/shop/files/manufactured-by-fayon-kids-noida-u-p-elegant-blue-thread-kurta-set-42315696013568.webp' },
    { _id: 'm5',  name: 'Traditional Kurta',             price: 6000,  subcategory: "Men's Ethnic",   imageUrl: 'https://cdn.shopify.com/s/files/1/0600/0849/7284/files/Ethnic_wear_for_men_7544ae5d-9531-4dbc-a8d6-2dfb8da215cb.jpg' },
    { _id: 'm6',  name: 'Sharara Set',                   price: 5500,  subcategory: "Men's Ethnic",   imageUrl: 'https://www.nihalfashions.com/blog/wp-content/uploads/2019/05/Indian-Outfits-Nihal-fashions.jpg' },
    { _id: 'm7',  name: 'Designer Shirt',                price: 3500,  subcategory: "Men's Ethnic",   imageUrl: 'https://www.fashiola.in/product-list/118544695.webp' },
    { _id: 'm8',  name: 'Festive Pant',                  price: 4200,  subcategory: "Men's Ethnic",   imageUrl: 'https://cdn-images.farfetch-contents.com/18/87/82/32/18878232_41046787_600.jpg' },
    { _id: 'm9',  name: 'Lavender Indo Western Sherwani',price: 6500,  subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/f8/93/86/f8938698d584aa0083774c399ceb4da8.jpg' },
    { _id: 'm10', name: 'Kurta Pyjama',                  price: 10000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/c8/63/b1/c863b166d46765dcc87e9c4ca9a0c310.jpg' },
    { _id: 'm11', name: 'Royal Suit',                    price: 15000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/e7/e4/ce/e7e4ce8dbf199beb8a9fe698330edf45.jpg' },
    { _id: 'm12', name: 'Kurta Set',                     price: 7000,  subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/eb/10/ac/eb10ac821a700b39832d750a71f2bcc1.jpg' },
    { _id: 'm13', name: 'Indo Western',                  price: 95000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/05/0a/18/050a18806b5d08e9ee42d225e09631b7.jpg' },
    { _id: 'm14', name: 'Printed Kurta',                 price: 8000,  subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/c5/96/ae/c596aebeb530f249620fb46cd3f80eeb.jpg' },
    { _id: 'm15', name: "Men's Printed Kurta",           price: 7500,  subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/d9/42/ce/d942ce455d826d0f356271965215ec0b.jpg' },
    { _id: 'm16', name: 'White Achkan',                  price: 11000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/8a/57/95/8a5795dc75e0155de99baba75cca3d87.jpg' },
    { _id: 'm17', name: 'Printed Achkan',                price: 12000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/09/b8/61/09b8613c5029e58660c977970a905a19.jpg' },
    { _id: 'm18', name: 'Bandhgala Set',                 price: 16000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/73/40/41/734041c2d95a6938b8de046b29bab6c9.jpg' },
    { _id: 'm19', name: 'Embroidered Bandhgala',         price: 20000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/3d/0d/fb/3d0dfbb0c659b8ec4a2d4ad77798e8f4.jpg' },
    { _id: 'm20', name: 'Velvet Bandhgala',              price: 18000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/9e/1e/5e/9e1e5e82aa19cba0989aa4f8137c38cb.jpg' },
    { _id: 'm21', name: 'Pistachio Indo Western',        price: 18500, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/11/3d/b4/113db4136419c4b83823796957c025d1.jpg' },
    { _id: 'm22', name: 'Pathani Kurta',                 price: 17500, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/d1/3a/58/d13a58b616cc87ed56505912f216c543.jpg' },
    { _id: 'm23', name: 'Embroidered Kurta Set',         price: 16500, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/f5/b9/12/f5b9123b8851c434c37e078dcfc19760.jpg' },
    { _id: 'm24', name: 'Paithani Kurta Set',            price: 24500, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/16/e5/13/16e513eefbef15ec01d4c6e269788a18.jpg' },
    { _id: 'm25', name: 'Paithani Dhoti',                price: 22000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/9b/81/00/9b8100082270c7b12efda082d59a5ef3.jpg' },
    { _id: 'm26', name: 'Kerala Dhoti',                  price: 7000,  subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/0d/33/1b/0d331bfc32e9eb869012e5434afae723.jpg' },
    { _id: 'm27', name: 'Kerala Style Dhoti Shirt',      price: 10000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/1200x/e8/d0/61/e8d0610326dfb7419a1682f85a11f9b8.jpg' },
    { _id: 'm28', name: 'Asymmetric Kurta',              price: 14000, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/a4/1f/95/a41f958aff22e5b23d4717303fca5c65.jpg' },
    { _id: 'm29', name: 'White Asymmetric Kurta Set',    price: 14500, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/02/73/87/027387d5319e85f814362d1bf9920736.jpg' },
    { _id: 'm30', name: 'Chikankari Kurta Set',          price: 16500, subcategory: "Men's Ethnic",   imageUrl: 'https://i.pinimg.com/736x/53/f3/df/53f3df231b51b238e986086219ba3d67.jpg' },

    // ── Men's Blazers ──────────────────────
    { _id: 'm31', name: 'Classic Black Blazer',          price: 4000,  subcategory: "Men's Blazers",  imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=300' },
    { _id: 'm33', name: 'Wedding Blazer',                price: 6500,  subcategory: "Men's Blazers",  imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300' },
    { _id: 'm34', name: 'Blue Slim Fit Blazer',          price: 4800,  subcategory: "Men's Blazers",  imageUrl: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?w=300' },
    { _id: 'm35', name: 'Party Wear Blazer',             price: 5500,  subcategory: "Men's Blazers",  imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300' },
    { _id: 'm36', name: 'Casual Blazer',                 price: 3500,  subcategory: "Men's Blazers",  imageUrl: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=300' },

    // ── Kids Boys (ethnic) ─────────────────
    ],

  // ═══════════════════════════════════════════
  // WOMEN  →  /category/women
  // ═══════════════════════════════════════════
  women: [
    // ── Sarees ────────────────────────────
    { _id: 'w1',  name: 'Embroidered Pink Saree',        price: 20000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/4a/dd/22/4add22f5476a4c6563229e3642e5a873.jpg' },
    { _id: 'w2',  name: 'Raw Mango Pattu Saree',         price: 25000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/df/54/f3/df54f3a892e1f6f2a64dd6493f40720f.jpg' },
    { _id: 'w3',  name: 'Jute Saree',                    price: 15000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/d1/9d/24/d19d240094e34be513302a7f683b3c4e.jpg' },
    { _id: 'w4',  name: 'Pochampally Saree',             price: 21000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/ed/ce/e6/edcee65f8dda199a1a64e4bb747f8664.jpg' },
    { _id: 'w5',  name: 'Paithani Saree',                price: 50000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/57/d8/23/57d823a5940b238880f25a6c7af2e96a.jpg' },
    { _id: 'w6',  name: 'Kanchi Pattu Saree',            price: 25500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/43/18/65/431865e120eedf573752862d90fc0be3.jpg' },
    { _id: 'w7',  name: 'Mangalagiri Saree',             price: 15500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/e6/0c/72/e60c72daa25a649b1d1122e36622b59f.jpg' },
    { _id: 'w8',  name: 'Venkatagiri Handwoven Silk Saree', price: 25000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/d0/5c/78/d05c780cedfa1b5dbe3727a0215e48fe.jpg' },
    { _id: 'w9',  name: 'Raw Pattu Saree',               price: 19500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/f2/99/95/f29995a0690e195014ae82bc52d9bad0.jpg' },
    { _id: 'w10', name: 'Gadwal Saree',                  price: 10000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/dc/cf/cc/dccfccdae633efce822c8bd8f44ddbc9.jpg' },
    { _id: 'w11', name: 'Georgette Saree',               price: 15000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/33/48/22/33482278acc6fb5dfe5f3315e0b078a2.jpg' },
    { _id: 'w12', name: 'Bandhani Saree',                price: 17000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/ad/ec/60/adec6017ae169f8201e75fe20735e00f.jpg' },
    { _id: 'w13', name: 'Tissue Saree',                  price: 95000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/c0/b2/4c/c0b24cbf664337ca5c9f1908587c20fd.jpg' },
    { _id: 'w14', name: 'Katan Pattu Saree',             price: 18000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/9b/18/3a/9b183a5507b1cfd029c6b5e5fc595baa.jpg' },
    { _id: 'w15', name: 'Banarasi Crepe Silk Saree',     price: 17500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/9c/d7/0d/9cd70db7cfcd4dc20d3f79b3c1534821.jpg' },
    { _id: 'w16', name: 'Chanderi Saree',                price: 11000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/45/57/33/455733ba2dc06d1af0b54c37229368ef.jpg' },
    { _id: 'w17', name: 'Chiffon Saree',                 price: 12000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/53/07/b8/5307b869ba80a1c17fd1cbe43ed620cd.jpg' },
    { _id: 'w18', name: 'Floral Satin Saree',            price: 11000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/b5/77/9f/b5779f33dc91b4eb7a18e56e752f240d.jpg' },
    { _id: 'w19', name: 'Kota Saree',                    price: 10000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/d8/61/87/d8618764d0f80b65f7d128287bf4a4d2.jpg' },
    { _id: 'w20', name: 'Tussar Silk Saree',             price: 18000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/84/63/26/846326a3caee57bffcc2351e840f86bb.jpg' },
    { _id: 'w21', name: 'Linen Saree',                   price: 18500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/1d/11/72/1d11729941301166a13824775f7a9af9.jpg' },
    { _id: 'w22', name: 'Velvet Saree',                  price: 19500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/34/b8/b9/34b8b9f86ddcb59c57124e1887e0bb1c.jpg' },
    { _id: 'w23', name: 'Cotton Saree',                  price: 16500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/79/c4/39/79c4392ec77967fd8166fabda04be200.jpg' },
    { _id: 'w24', name: 'Kalamkari Saree',               price: 24500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/cf/a7/9f/cfa79fb904e3f2725734726debe8a974.jpg' },
    { _id: 'w25', name: 'Maheshwari Silk Saree',         price: 12000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/73/c5/9b/73c59bfa494d03b4f01b77edd097aa68.jpg' },
    { _id: 'w26', name: 'Pichwai Saree',                 price: 17000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/47/48/8a/47488a675183001dee7feeddb9fd1add.jpg' },
    { _id: 'w27', name: 'Ajrakh Saree',                  price: 10000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/0c/f1/c6/0cf1c6c56c8463cd6719f387ff022856.jpg' },
    { _id: 'w28', name: 'Ikkat Saree',                   price: 14000, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/736x/f9/cb/d2/f9cbd28a10ff343ab8ec4f038b437ffe.jpg' },
    { _id: 'w29', name: 'Organza Saree',                 price: 14500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/ed/2a/7d/ed2a7dfc1f38644f01c4d4b9ca5ff40f.jpg' },
    { _id: 'w30', name: 'Jamdani Saree',                 price: 16500, subcategory: 'Sarees', imageUrl: 'https://i.pinimg.com/1200x/41/51/90/41519037bd0d45d63bf6a3f4b69849f7.jpg' },

    // ── Lehengas ──────────────────────────
    { _id: 'w31', name: 'Winnie The Pooh: A-Line Lehenga', price: 1999, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/d1/ef/dd/d1efddecda7ec73e72f521dd6d52785c.jpg' },
    { _id: 'w32', name: 'TSS Originals: A-Line Lehenga',   price: 2999, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/f2/da/71/f2da71ef1e22525fd73f8e03651e00de.jpg' },
    { _id: 'w33', name: 'Souled Originals: A-Line Lehenga',price: 3050, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/b3/af/c0/b3afc0e249f99d073cd0991ae10568a1.jpg' },
    { _id: 'w34', name: 'Chip Dale: Fish Cut Lehenga',     price: 4000, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/1b/22/e2/1b22e2b0c7ee17e9db1338e7fcc8e8fd.jpg' },
    { _id: 'w35', name: 'Fish Cut Lehenga',                price: 5999, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/5f/9d/56/5f9d5693178013397a75d2b5bc52dd83.jpg' },
    { _id: 'w36', name: 'Fish Cut Lehenga (Premium)',      price: 7999, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/c4/4b/71/c44b713e93d6d5bedefd078cd283d037.jpg' },
    { _id: 'w37', name: 'Rajasthani Poshak Lehenga',       price: 9999, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/ed/e6/f8/ede6f84c7aae3ee3059b3113e6560857.jpg' },
    { _id: 'w38', name: 'Rajasthani Poshak Lehenga II',    price: 9999, subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/ca/a2/e4/caa2e4d3dfa748b5c58d721775e6b6f6.jpg' },
    { _id: 'w39', name: 'Rajasthani Poshak Lehenga III',   price: 10000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/2d/21/c8/2d21c8abaf2a5df8998d87d4a9013619.jpg' },
    { _id: 'w40', name: 'Bandhani Lehenga',                price: 11999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/1c/11/a3/1c11a3ecdbbfa16f2b30105d448d85df.jpg' },
    { _id: 'w41', name: 'Bandhani Lehenga II',             price: 12999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/91/a4/cb/91a4cb308ffa43164696863551bb7692.jpg' },
    { _id: 'w42', name: 'Bandhani Lehenga III',            price: 12999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/ad/74/71/ad7471401b92c18df8fa132394dd1117.jpg' },
    { _id: 'w43', name: 'Pastel Lehenga',                  price: 13000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/89/4d/be/894dbefa9fb5d8e7ed23fa7d0c26bca9.jpg' },
    { _id: 'w44', name: 'Pastel Lehenga II',               price: 14999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/13/0b/6f/130b6f90d8466c4420fe4f93f26013c7.jpg' },
    { _id: 'w45', name: 'Pastel Lehenga III',              price: 14999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/20/b5/d4/20b5d48ffa33bfebd7b7e33b9a4b5d22.jpg' },
    { _id: 'w46', name: 'Bridal Lehenga',                  price: 18999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/2b/c5/da/2bc5da3e642c9edfaa63e062621d3119.jpg' },
    { _id: 'w47', name: 'Bridal Lehenga II',               price: 19999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/b6/41/19/b64119715a6aed5a592e93dabe50853c.jpg' },
    { _id: 'w48', name: 'Bridal Lehenga III',              price: 20000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/30/d4/e8/30d4e80fb9608909de2921722996c952.jpg' },
    { _id: 'w49', name: 'Cape Style Dupatta Lehenga',      price: 21999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/f0/86/54/f08654e652b4b652c3bcec62eca20398.jpg' },
    { _id: 'w50', name: 'Cape Style Dupatta Lehenga II',   price: 22000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/83/33/69/83336948ad66ba64158cd0942a3b55a5.jpg' },
    { _id: 'w51', name: 'Cape Style Dupatta Lehenga III',  price: 22000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/18/c8/02/18c8025f26705cb1831c9878c6f11b9d.jpg' },
    { _id: 'w52', name: 'Floral Print Lehenga',            price: 25000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/1e/50/e2/1e50e20a086d8814c59b76ec7e563a73.jpg' },
    { _id: 'w53', name: 'Floral Print Lehenga II',         price: 25000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/87/04/fe/8704fe66b7b1c13054a64e9b95333566.jpg' },
    { _id: 'w54', name: 'Solid Lehenga',                   price: 26999,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/b7/5a/5b/b75a5b6ffaeeacf6dea64eb823820e1e.jpg' },
    { _id: 'w55', name: 'Solid Lehenga II',                price: 27000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/c3/10/3b/c3103b982a3801d4adf7b3602fe27a54.jpg' },
    { _id: 'w56', name: 'Solid Lehenga III',               price: 28000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/1200x/3b/ce/9b/3bce9b1ae8a27a679ec6e272133d5395.jpg' },
    { _id: 'w57', name: 'Indo Western Lehenga',            price: 29000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/2c/e5/32/2ce5327920fe0749251c13c77bee9dff.jpg' },
    { _id: 'w58', name: 'Indo Western Lehenga II',         price: 30000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/2c/e5/32/2ce5327920fe0749251c13c77bee9dff.jpg' },
    { _id: 'w59', name: 'Indo Western Lehenga III',        price: 32000,subcategory: 'Lehengas', imageUrl: 'https://i.pinimg.com/736x/9d/1d/de/9d1ddeb26c3e0cc76caf6f4d8d3e90be.jpg' },

    // ── Kurtis ────────────────────────────
    { _id: 'w60', name: 'Short Kurti',           price: 2000, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/91/63/72/91637272a06456fff05d2de8883c5f5e.jpg' },
    { _id: 'w61', name: 'Long Pink Kurti',       price: 2500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/10/56/c3/1056c3e843f55409cd94aa27e3f46971.jpg' },
    { _id: 'w62', name: 'Halter Neck Kurti',     price: 2500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/b4/49/b4/b449b46ff8c496e714dfa3c573a625c3.jpg' },
    { _id: 'w63', name: 'Sleeveless Kurti',      price: 2100, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/2a/93/b2/2a93b25e66f880c7405982a5ca220942.jpg' },
    { _id: 'w64', name: 'Square Neck Kurti',     price: 1500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/dc/fe/e8/dcfee8016ed530e3aaf12b08fb609e1f.jpg' },
    { _id: 'w65', name: 'Full Sleeves Kurti',    price: 2500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/34/98/70/349870ea34dfd266fecc10881ac08332.jpg' },
    { _id: 'w66', name: 'Chikankari Kurti',      price: 1500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/70/a9/2d/70a92dd918837fae9bff694382380122.jpg' },
    { _id: 'w67', name: 'Chikankari Kurti II',   price: 2500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/3d/0e/29/3d0e291d98c4283ca8ef07789d070d18.jpg' },
    { _id: 'w68', name: 'Alia Cut Kurti',        price: 1900, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/44/1b/9e/441b9e9e74222919cb4e5d1f18c3a7b4.jpg' },
    { _id: 'w69', name: 'Alia Cut Kurti II',     price: 1000, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/1200x/10/e4/60/10e460abee6a1e54b9a55832fb91c2a1.jpg' },
    { _id: 'w70', name: 'Kalamkari Kurti',       price: 1500, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/1200x/94/62/32/94623210a1c78a11c95f8b6003301736.jpg' },
    { _id: 'w71', name: 'Kalamkari Kurti II',    price: 1700, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/8e/88/29/8e88295f4cfaa36a66b00e9a784f1f46.jpg' },
    { _id: 'w72', name: 'Chiffon Kurti',         price: 1950, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/a5/7c/78/a57c786481eeef6b36e7f793784e9772.jpg' },
    { _id: 'w73', name: 'White Kurti',           price: 1800, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/b5/cb/d1/b5cbd160aea04f5fae093ad645a680fd.jpg' },
    { _id: 'w74', name: 'Flared Kurti',          price: 1700, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/a1/e3/a1/a1e3a1b962b2bbd954dbd221b6e2a9e7.jpg' },
    { _id: 'w75', name: 'V-Neck Kurti',          price: 1100, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/db/2a/0e/db2a0e54f58da9fa7a2ce7f29c3fbfb0.jpg' },
    { _id: 'w76', name: 'Pleated Kurti',         price: 1200, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/e0/66/73/e066733169b5db13bf8e78026977cbfd.jpg' },
    { _id: 'w77', name: 'Ikkat Kurti',           price: 1100, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/64/03/ed/6403edd7635e8a77840715044240c5fe.jpg' },
    { _id: 'w78', name: 'Netted Kurti',          price: 2000, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/1200x/1c/2d/5a/1c2d5acc8c046ecd459dbc11096f58ae.jpg' },
    { _id: 'w79', name: 'Cotton Kurti',          price: 1800, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/1200x/2f/93/c5/2f93c5795990721ad028da736307d445.jpg' },
    { _id: 'w80', name: 'Embroidered Kurti',     price: 1800, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/62/7e/c6/627ec633721bb51522aab8b0ee2e3a1e.jpg' },
    { _id: 'w81', name: 'Embroidered Kurti II',  price: 1950, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/65/47/24/6547249ff40c77e1fdaa2ccf282eafd5.jpg' },
    { _id: 'w82', name: 'Straight Cut Kurti',    price: 1650, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/0e/73/e2/0e73e26e3e409d7efe54e162934656e4.jpg' },
    { _id: 'w83', name: 'Straight Cut Kurti II', price: 2400, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/bc/e1/54/bce154b2a5c587657d3607146405ef09.jpg' },
    { _id: 'w84', name: 'A-Line Kurti',          price: 1200, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/0c/0d/46/0c0d465877274c784fb162afb0ceb20f.jpg' },
    { _id: 'w85', name: 'A-Line Kurti II',       price: 1700, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/dd/f9/c8/ddf9c8f92f0b29d493d6aa3f4f37519d.jpg' },
    { _id: 'w86', name: 'Printed Kurti',         price: 2000, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/1200x/c2/6a/de/c26ade0e56597a7efa5e104d8d8baa9c.jpg' },
    { _id: 'w87', name: 'Floral Kurti',          price: 1400, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/3a/08/31/3a083173750993ddfd6f74523f3bc2fe.jpg' },
    { _id: 'w88', name: 'Organza Kurti',         price: 1400, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/2e/fe/96/2efe96bd280e5f1d3a939b04174924d2.jpg' },
    { _id: 'w89', name: 'Pink Kurti',            price: 1650, subcategory: 'Kurtis', imageUrl: 'https://i.pinimg.com/736x/dd/75/c4/dd75c40daf152c8cb133d9300b3e7660.jpg' },

    // ── Women's Dresses (Ethnic/Fusion) ───
    { _id: 'w90',  name: 'Winnie The Pooh: Mini Dress',  price: 899,  subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/2b/6b/b8/2b6bb87e11ef1110ff655c921f7f461e.jpg' },
    { _id: 'w91',  name: 'TSS Originals: Mini Dress',    price: 999,  subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/c9/75/4b/c9754bca7b905629d1023ee72f457a30.jpg' },
    { _id: 'w92',  name: 'Souled Originals: Mini Dress', price: 1050, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/f1/9a/fd/f19afd9b5143a41b2fb119627741c10d.jpg' },
    { _id: 'w93',  name: 'Chip Dale: Midi Dress',        price: 1099, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/bf/f8/7d/bff87d3ab97c7ca877857a3a0fe5ea6d.jpg' },
    { _id: 'w94',  name: 'Midi Dress',                   price: 1199, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/a5/a2/ee/a5a2eeee59d575de9e0a068a9d7a5b46.jpg' },
    { _id: 'w95',  name: 'Midi Dress II',                price: 1299, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/5e/84/c2/5e84c2f4dbd56afb29687f656007b2ab.jpg' },
    { _id: 'w96',  name: 'Maxi Dress',                   price: 1350, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/ef/d1/c4/efd1c45893940c2f1f411b1d43b126eb.jpg' },
    { _id: 'w97',  name: 'Maxi Dress II',                price: 1399, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/e8/a4/58/e8a458ecca7087a869aa1c49ba74192f.jpg' },
    { _id: 'w98',  name: 'Maxi Dress III',               price: 1399, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/fc/bb/22/fcbb22bcb393121be455a1343d520182.jpg' },
    { _id: 'w99',  name: 'Bodycon Dress',                price: 1450, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/46/e8/96/46e89602526c97a5a73927035e7a92d7.jpg' },
    { _id: 'w100', name: 'Bodycon Dress II',             price: 1499, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/1e/36/23/1e36239d15a867360c1cee244e67118b.jpg' },
    { _id: 'w101', name: 'Bodycon Dress III',            price: 1599, subcategory: 'Dresses', imageUrl: 'https://www.yoyocamp.com/cdn/shop/files/Q1RIANQ_XHSE_675AG__H_5c5f9032-d068-4bb9-8b69-4dc695c7695f.jpg?v=1770183582&width=3840' },
    { _id: 'w102', name: 'A-Line Dress',                 price: 1750, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/16/b0/57/16b0579da281810ad8858b069a37e91c.jpg' },
    { _id: 'w103', name: 'A-Line Dress II',              price: 1799, subcategory: 'Dresses', imageUrl: 'https://img.fantaskycdn.com/14f12253603688c90427d6a79957395b_2056x.jpeg' },
    { _id: 'w104', name: 'A-Line Dress III',             price: 1899, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/33/98/da/3398daaf89f2796e99dfbedb007357c1.jpg' },
    { _id: 'w105', name: 'Shift Dress',                  price: 1950, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/f1/5f/ef/f15fef4dbdfb100dfad9a0f46325295e.jpg' },
    { _id: 'w106', name: 'Shift Dress II',               price: 1999, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/84/29/5b/84295b3514cd6aac1a1d8f479c2fabf4.jpg' },
    { _id: 'w107', name: 'Shift Dress III',              price: 2000, subcategory: 'Dresses', imageUrl: 'https://img.fantaskycdn.com/b41fdeeb4f8a0825e8570f9df2dd40ec_2056x.jpeg' },
    { _id: 'w108', name: 'Fit & Flare Dress',            price: 2500, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/07/bc/31/07bc31a952c21c396f08d1899ad18aaf.jpg' },
    { _id: 'w109', name: 'Fit & Flare Dress II',         price: 3000, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/ff/e6/17/ffe617184624f160c8d1e4dfe6c3072f.jpg' },
    { _id: 'w110', name: 'Fit & Flare Dress III',        price: 3500, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/5d/2b/13/5d2b13f3b8adb21193790dcd45c9d443.jpg' },
    { _id: 'w111', name: 'Half Shoulder Dress',          price: 4500, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/b2/81/a3/b281a3b9df0b5b4259358734c3a95deb.jpg' },
    { _id: 'w112', name: 'Half Shoulder Dress II',       price: 5000, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/6a/26/8a/6a268abf63fa085b0246a6c274de9caf.jpg' },
    { _id: 'w113', name: 'Half Shoulder Dress III',      price: 6000, subcategory: 'Dresses', imageUrl: 'https://www.numbersea.com/cdn/shop/files/1f77a921e33727a2fa77fe4e1fa00fbb.jpg?v=1741880430' },
    { _id: 'w114', name: 'SunDress',                     price: 7999, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/99/63/76/9963764da29aca1d5bd2d499507aab4a.jpg' },
    { _id: 'w115', name: 'SunDress II',                  price: 8050, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/e9/13/e6/e913e68ccca6813bf3fff7dedcbc6528.jpg' },
    { _id: 'w116', name: 'SunDress III',                 price: 9000, subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/8d/71/64/8d71648277be4028ec788b44e720cbaf.jpg' },
    { _id: 'w117', name: 'Cocktail Dress',               price: 10000,subcategory: 'Dresses', imageUrl: 'https://www.warasibe.com/cdn/shop/files/GlamorousSkyBlueCrystalEmbellishedMermaidGownwithLace-UpBackPromDress_2.webp?v=1772548083&width=1080' },
    { _id: 'w118', name: 'Cocktail Dress II',            price: 11000,subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/736x/50/eb/d4/50ebd493631ba3098177ae766de17a0e.jpg' },
    { _id: 'w119', name: 'Cocktail Dress III',           price: 11999,subcategory: 'Dresses', imageUrl: 'https://i.pinimg.com/1200x/d1/8a/0b/d18a0bd055478ef7903ca792fe0d0895.jpg' },

    // ── Kids Girls ────────────────────────
    
  ],

  // ═══════════════════════════════════════════
  // GEN-Z  →  /category/genz
  // ═══════════════════════════════════════════
  genz: [
    // ── T-Shirts ──────────────────────────
    { _id: 'g1',  name: 'Winnie The Pooh: Garden Fun',      price: 1499, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1774679103_8874505.jpg?w=360&dpr=2' },
    { _id: 'g2',  name: 'TSS Originals: Hustlebee',         price: 1099, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1774680067_7415352.jpg?w=480&dpr=2' },
    { _id: 'g3',  name: 'Souled Originals: Pink Grunge',    price: 2500, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1743585224_4414304.jpg?w=480&dpr=2' },
    { _id: 'g4',  name: 'Chip Dale: Troublemakers',         price: 1699, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1753338416_3258014.jpg?w=480&dpr=2' },
    { _id: 'g5',  name: "Harry Potter: Marauder's Map",     price: 1299, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1762155817_5261924.gif?w=480&dpr=2' },
    { _id: 'g6',  name: 'Hello Kitty: Varsity',             price: 1199, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1744960528_4690781.jpg?w=480&dpr=2' },
    { _id: 'g7',  name: 'Mickey Mouse: Goal',               price: 899,  subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1771578715_1094125.jpg?w=480&dpr=2' },
    { _id: 'g8',  name: 'Supergirl Vintage',                price: 1349, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1749630516_1384266.jpg?w=480&dpr=2' },
    { _id: 'g9',  name: 'Powerpuff Girls: Certified Baddie',price: 899,  subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1751010595_2058201.jpg?w=480&dpr=2' },
    { _id: 'g10', name: 'TSS Originals: Angel Cloud Nine',  price: 999,  subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1773821614_8328613.jpg?w=480&dpr=2' },
    { _id: 'g11', name: 'TSS Originals: Follow The Sun',    price: 849,  subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1725031999_9309677.jpg?w=480&dpr=2' },
    { _id: 'g12', name: 'Lotso Bear: Good Vibes',           price: 1399, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1758371181_4247916.jpg?w=480&dpr=2' },
    { _id: 'g13', name: 'TSS Originals: Pookie Bunny',      price: 1299, subcategory: 'T-Shirts', imageUrl: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1772263268_6907285.jpg?w=480&dpr=2' },

    // ── Men's Jeans ───────────────────────
    { _id: 'g14', name: 'Slim Fit Jeans',      price: 2000, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQf7UlWDLyxgUgSs79Nl0j4I4m4DpQv_gsoA&s' },
    { _id: 'g15', name: 'Regular Jeans',       price: 2200, subcategory: "Men's Jeans", imageUrl: 'https://wwd.com/wp-content/uploads/2026/02/SP26_JK_PR_logo_11.jpg?crop=0px%2C247px%2C5625px%2C3148px&resize=1000%2C563' },
    { _id: 'g16', name: 'Ripped Jeans',        price: 2500, subcategory: "Men's Jeans", imageUrl: 'https://static.iwmbuzz.com/wp-content/uploads/2023/09/bts-v-photos-a-guide-to-street-style-staples-baggy-jeans-tie-dyes-and-more-5-736x920.jpg' },
    { _id: 'g17', name: 'Skinny Jeans',        price: 2300, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfd1QlFqGDe4iieP30ugq7USQdkZc7kMGrdA&s' },
    { _id: 'g18', name: 'Loose Fit Jeans',     price: 2700, subcategory: "Men's Jeans", imageUrl: 'https://www.hindustantimes.com/ht-img/img/2025/09/07/original/IMG_8091_1757275581023_1757275598957.jpg' },
    { _id: 'g19', name: 'Black Jeans',         price: 2100, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjBjgJL6DmE_7ZQvd2HGRZqvgDoHFmyWwEMw&s' },
    { _id: 'g20', name: 'Blue Denim Jeans',    price: 2400, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY3BU8_tXnN2t_Fen8RzyszZyf4dKqjDfc3w&s' },
    { _id: 'g21', name: 'Stretchable Jeans',   price: 2600, subcategory: "Men's Jeans", imageUrl: 'https://64.media.tumblr.com/bd1b3fc96f97acb1d3fb5d6bfcb6a5cb/3efbe98b8d488f19-fc/s1280x1920/e8274701e0605e36bba28abb409ed2cdf3e5b390.jpg' },
    { _id: 'g22', name: 'Bootcut Jeans',       price: 2700, subcategory: "Men's Jeans", imageUrl: 'https://offduty.in/cdn/shop/files/IMG_4594.png?v=1774675710&width=1920' },
    { _id: 'g23', name: 'Baggy Jeans',         price: 3700, subcategory: "Men's Jeans", imageUrl: 'https://pbs.twimg.com/media/F8lD2nuWEAAYPQ1.jpg' },
    { _id: 'g24', name: 'Tapered Fit Jeans',   price: 4000, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7zmmfR0hcBVzSGh0jUBJV9b7Q8Fa6Q9UCjw&s' },
    { _id: 'g25', name: 'Relaxed Fit Jeans',   price: 5000, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7EuC6VJqPEx8KSHi9hlkr83CDjLybmfVMWg&s' },
    { _id: 'g26', name: 'High Waist Jeans',    price: 4400, subcategory: "Men's Jeans", imageUrl: 'https://cassette.sphdigital.com.sg/image/fzine/3c051aef07b62956d70a5a7371423aa7be194cde0c0a3c7565209d69e27072b9?w=660&q=85' },
    { _id: 'g27', name: 'Low Rise Jeans',      price: 6400, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScv8Uabnuxloio_cG1tN1cOU4H2cgcSgnjew&s' },
    { _id: 'g28', name: 'Mid Rise Jeans',      price: 7800, subcategory: "Men's Jeans", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSepeabViuAvJ-71eJh2hOEmI58dtHyjV2m7g&s' },
    { _id: 'g29', name: 'Vintage Jeans',       price: 1100, subcategory: "Men's Jeans", imageUrl: 'https://offduty.in/cdn/shop/files/190fdfe0-c1fe-4f3e-a367-eac23eb603a2.png?v=1768378394&width=1024' },

    // ── Women's Jeans ─────────────────────
    { _id: 'g30', name: 'Blue Jeans',           price: 2000, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/236x/d4/a2/2d/d4a22dec37d903a38f416e887a89c38b.jpg' },
    { _id: 'g31', name: 'Denim Jeans',          price: 2500, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/0f/8a/72/0f8a723b2f4ea45e9e30dcc6df05791c.jpg' },
    { _id: 'g32', name: 'Embroidered Jeans',    price: 2500, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/35/da/df/35dadfb26aaeaabb355d9b652402f8fd.jpg' },
    { _id: 'g33', name: 'Net Jeans',            price: 2100, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/91/71/65/917165b8db1b1c704342b9e97814363c.jpg' },
    { _id: 'g34', name: 'Scallop Cut Jeans',    price: 1500, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/98/06/d2/9806d2a848843791131651604ada9fd7.jpg' },
    { _id: 'g35', name: 'Embellished Jeans',    price: 2500, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/de/bf/96/debf961c0b3b657ea3d902c3004ce3fc.jpg' },
    { _id: 'g36', name: 'Blue-Green Shade Jeans',price: 1500,subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/10/3d/46/103d468df72284f9f302adc65d85f863.jpg' },
    { _id: 'g37', name: 'Wide Leg Jeans',       price: 2500, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/5c/4f/74/5c4f7452058b82b7d6cc74d328be4901.jpg' },
    { _id: 'g38', name: 'Casual Jeans',         price: 1900, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/fd/9c/d7/fd9cd702891f5340b21ae174403c0a73.jpg' },
    { _id: 'g39', name: 'Black Denim',          price: 1000, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/23/a5/01/23a5017cc17a22f5c2b03db561886598.jpg' },
    { _id: 'g40', name: 'Pink Denim',           price: 1500, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/b7/65/1f/b7651f8bb3def442dcde3044e242d6e0.jpg' },
    { _id: 'g41', name: 'Brown Denim',          price: 1700, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/4c/c0/43/4cc04362568c2b70874ac7f54ce7c4f2.jpg' },
    { _id: 'g42', name: 'Cherry Jeans',         price: 1950, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/93/35/db/9335db2d40289e766d1b4961082a73dc.jpg' },
    { _id: 'g43', name: 'Floral Jeans',         price: 1800, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/8f/a5/fd/8fa5fd8ece994be74e00dc584ba4bd16.jpg' },
    { _id: 'g44', name: 'Bow Jeans',            price: 1700, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/88/c2/e0/88c2e0e221c917c3646eb04361d7fd9c.jpg' },
    { _id: 'g45', name: 'Black Denim II',       price: 1100, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/7e/5b/ba/7e5bbade5028fc60fbcf37fa043721d6.jpg' },
    { _id: 'g46', name: 'Torn Jeans',           price: 1200, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/d7/d4/eb/d7d4ebd8fb423fec2f66b98f4fe7085d.jpg' },
    { _id: 'g47', name: 'Greenish Jeans',       price: 1100, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/36/a9/5b/36a95b43058911221908613e41c4bce3.jpg' },
    { _id: 'g48', name: 'Dual Jeans',           price: 1000, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/2d/eb/2c/2deb2cb8da486bb22495ca9ce39534c5.jpg' },
    { _id: 'g49', name: 'Wide Leg Jeans II',    price: 1800, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/14/a3/3f/14a33ff4fa9cfac17d30a10ebd1f90f4.jpg' },
    { _id: 'g50', name: 'Cargo Jeans',          price: 1800, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/be/60/55/be60556bd7bb137cb0f30840e4d8a4e2.jpg' },
    { _id: 'g51', name: 'Pink Cargo',           price: 1950, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/d7/7c/7c/d77c7c6ff03a7523b21609dfa7497e64.jpg' },
    { _id: 'g52', name: 'White Cargo',          price: 1650, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/eb/03/8f/eb038f7b1785af39c2439ac45f377bd2.jpg' },
    { _id: 'g53', name: 'Baggy Jeans (Women)',  price: 2400, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/1e/3f/b6/1e3fb683820f34e13ea0258f5c92fb03.jpg' },
    { _id: 'g54', name: 'Brown Shade Jeans',    price: 1200, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/e5/be/ba/e5beba2ca0d3597be043a5247cc5fb3c.jpg' },
    { _id: 'g55', name: 'Black Denim III',      price: 1700, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/0d/92/85/0d928533503d714f21ec4759accffe3e.jpg' },
    { _id: 'g56', name: 'Boot Cut Jeans',       price: 1000, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/1200x/a0/4c/8b/a04c8b287f21cee90d1b9ccb89bf2296.jpg' },
    { _id: 'g57', name: 'Boot Cut Jeans II',    price: 1400, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/35/a2/a5/35a2a5775979d4cd306be947a0f4bd80.jpg' },
    { _id: 'g58', name: 'Slit Jeans',           price: 1400, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/b1/dc/d2/b1dcd2e95e5695d1e0cfc7c8945df151.jpg' },
    { _id: 'g59', name: 'Slit Jeans II',        price: 1650, subcategory: "Women's Jeans", imageUrl: 'https://i.pinimg.com/736x/85/b7/ea/85b7ea36776614338593d7bb992a90a3.jpg' },
  ],
  kids: [
  // ── Unisex / General ──────────────────
  { _id: 'k1', name: 'Girls Frock',   price: 1099, subcategory: 'Girls',  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSibz2PKn5KdduG5pg2UY4XJ5IGd3d954w7pA&s' },
  { _id: 'k2', name: 'Boys Kurta',    price: 1399, subcategory: 'Boys',   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzz0v3gMlfNaJiaJBsLUlmvvRWcKBLoSgNoA&s' },
  { _id: 'k3', name: 'Kids Suit',     price: 1999, subcategory: 'Boys',   imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNlHz8sx71QPykdHoqS-z0YqPQsZCKuWK3A&s' },
  { _id: 'k4', name: 'Party Dress',   price: 1299, subcategory: 'Girls',  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIAojxVpOU27Un4Yo09jZnpSuFZWZ_n4XnFA&s' },
  { _id: 'k5', name: 'Casual Wear',   price: 799,  subcategory: 'Unisex', imageUrl: 'https://www.shutterstock.com/image-photo/cute-little-friends-jeans-near-260nw-2617634735.jpg' },
  { _id: 'k6', name: 'Ethnic Set',    price: 1599, subcategory: 'Unisex', imageUrl: 'https://images.meesho.com/images/products/469449459/q2fd7_512.webp?width=512' },
  { _id: 'k7', name: 'Kids Jacket',   price: 1199, subcategory: 'Unisex', imageUrl: 'https://m.media-amazon.com/images/I/617tCg0euFL._AC_UY1100_.jpg' },
  { _id: 'k8', name: 'Kids Jeans',    price: 999,  subcategory: 'Unisex', imageUrl: 'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/OCTOBER/16/drx26IKM_1638b07d9f1f4600919e2386942b6e30.jpg' },

  // ── Girls ─────────────────────────────
  { _id: 'k9',  name: 'Lehenga',              price: 6000, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/736x/86/78/34/8678342cf160800854f42dde26eafb00.jpg' },
  { _id: 'k10', name: 'Sharara Suit',         price: 3000, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/1200x/88/1e/84/881e849e1181ba3cd2e2c0cca28b953e.jpg' },
  { _id: 'k11', name: 'Ethnic Kurti',         price: 3500, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/736x/5f/a2/e2/5fa2e278d227899ffe016316e24be47c.jpg' },
  { _id: 'k12', name: 'Girls Kurti',          price: 2000, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/736x/4e/57/22/4e5722fd88a703686a16a176d71d77f4.jpg' },
  { _id: 'k13', name: 'Traditional Dress',    price: 6000, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/736x/67/c9/e1/67c9e192280e66e75753fd0e55465a86.jpg' },
  { _id: 'k14', name: 'Maxi Dress',           price: 5500, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/1200x/6b/ac/a6/6baca621fedfca7b9ad4b932fdd65cb1.jpg' },
  { _id: 'k15', name: 'Frock',                price: 3500, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/1200x/a0/88/56/a08856d3857b930d657300e2bbc05657.jpg' },
  { _id: 'k16', name: 'Skirt and Jacket',     price: 3000, subcategory: 'Girls', imageUrl: 'https://i.pinimg.com/1200x/e0/39/19/e039191a4ad4cf2b5e98d6a8a4c5ab6f.jpg' },

  // ── Boys ──────────────────────────────
  { _id: 'k17', name: 'Traditional Suit',     price: 7500, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/1200x/07/03/f6/0703f625388dc3f2b157bfaf29014b8f.jpg' },
  { _id: 'k18', name: 'Dhoti',                price: 5000, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/736x/e2/18/34/e218342d86c8d982f28f88314957b5c9.jpg' },
  { _id: 'k19', name: 'Salwar Kameez',        price: 5500, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/1200x/69/70/22/697022b3b210dbd082d4f5603e81c290.jpg' },
  { _id: 'k20', name: 'Ethnic Shirt',         price: 2000, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/1200x/10/ca/f5/10caf537abc329ea4cc8725887d596e0.jpg' },
  { _id: 'k21', name: 'Temple Wear',          price: 6000, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/736x/9e/0c/e3/9e0ce319ac5357e16e69ae6bee83bc5b.jpg' },
  { _id: 'k22', name: 'Traditional Pancha',   price: 4500, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/736x/15/cb/7e/15cb7e121c7780aae0ad87abee9f1df7.jpg' },
  { _id: 'k23', name: 'Kurta Set',            price: 5500, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/736x/05/a3/97/05a39763a778be444266294050b919d8.jpg' },
  { _id: 'k24', name: 'Boys Sherwani',        price: 8000, subcategory: 'Boys', imageUrl: 'https://i.pinimg.com/1200x/ff/a1/a1/ffa1a19cef2b802c9d94f526a26d34c6.jpg' },
]
};
// Add this inside allProducts, as a new category key:

// ─────────────────────────────────────────────
// SUBCATEGORY FILTER TABS CONFIG
// ─────────────────────────────────────────────
const subcategoryConfig = {
  men: ["All", "Men's Ethnic", "Men's Blazers"],
  women: ["All", "Sarees", "Lehengas", "Kurtis", "Dresses"],
  genz: ["All", "T-Shirts", "Men's Jeans", "Women's Jeans"],
  kids: ['All', 'Girls', 'Boys']
};

// ─────────────────────────────────────────────
// SORT OPTIONS
// ─────────────────────────────────────────────
const sortOptions = [
  { label: 'Featured',         value: 'featured' },
  { label: 'Price: Low → High',value: 'price_asc' },
  { label: 'Price: High → Low',value: 'price_desc' },
  { label: 'Name: A → Z',      value: 'name_asc' },
];

// ─────────────────────────────────────────────
// CATEGORY PAGE COMPONENT
// ─────────────────────────────────────────────
const Category = () => {
  const { name } = useParams(); // 'men' | 'women' | 'genz'

  const [activeSubcategory, setActiveSubcategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('featured');
const [searchQuery, setSearchQuery] = useState(''); // New search state
  const categoryKey = name?.toLowerCase();
  const rawProducts = allProducts[categoryKey] || [];
  const tabs = subcategoryConfig[categoryKey] || ['All'];

  // Reset filter when category changes
 useEffect(() => {
    setActiveSubcategory('All');
    setSortBy('featured');
    setSearchQuery('');
  }, [categoryKey]);
  // Filter
  const filtered = rawProducts.filter((product) => {
    const matchesTab = activeSubcategory === 'All' || product.subcategory === activeSubcategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'name_asc')   return a.name.localeCompare(b.name);
    return 0; // featured = original order
  });

  const categoryLabel =
    categoryKey === 'genz' ? 'Gen-Z' : name?.charAt(0).toUpperCase() + name?.slice(1);
return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ── Hero Banner ─────────────────────────── */}
      <div className="bg-weavora-dark text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold capitalize tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-weavora-light">
          {categoryLabel} Collection
        </h1>
        <p className="mt-4 text-weavora-light text-lg">
          Curated styles for {categoryLabel}. Find your fit.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* ── Search Bar Section ─────────────────── */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <input
              type="text"
              placeholder={`Search in ${categoryLabel}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-weavora-light outline-none transition-all font-medium text-gray-700"
            />
            <Search className="absolute left-4 top-4 text-gray-400 group-focus-within:text-weavora-dark transition-colors" size={24} />
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-4 text-xs font-bold text-gray-400 hover:text-red-500 uppercase tracking-widest"
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Subcategory Tabs ──────────────────── */}
        {tabs.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubcategory(tab)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all border-2
                  ${activeSubcategory === tab
                    ? 'bg-weavora-dark text-white border-weavora-dark'
                    : 'bg-white text-gray-400 border-gray-100 hover:border-weavora-light hover:text-weavora-dark'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* ── Toolbar ───────────────────────────── */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-100 pb-6">
          <p className="text-gray-500 font-black text-xs uppercase tracking-widest">
            {sorted.length} Item{sorted.length !== 1 ? 's' : ''} Found
            {searchQuery && <span className="text-weavora-dark ml-2">for "{searchQuery}"</span>}
          </p>
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-black uppercase text-gray-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-none bg-transparent font-black text-xs uppercase text-gray-900 focus:ring-0 outline-none cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Products Grid ─────────────────────── */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sorted.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl font-black text-gray-900 uppercase tracking-tighter">No items match your search</p>
            <p className="mt-2 text-gray-400 text-sm">Try adjusting your filters or search terms.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveSubcategory('All');}}
              className="mt-6 px-8 py-3 bg-weavora-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-weavora-light transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;