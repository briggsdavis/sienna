export type SeedItem = {
  name: string
  desc?: string
  price?: string
  flag?: string
  options?: { label: string; price: number }[]
  note?: string
  serves?: string
  kitchen?: "emporio" | "mezzo"
  imageUrl?: string
}

export type SeedSection = { title: string; subtitle?: string; imageUrl?: string; items: SeedItem[] }

export const MENUS: Record<"emporio" | "mezzo" | "tetto" | "catering", SeedSection[]> = {
  emporio: [
    {
      title: "Starters",
      imageUrl:
        "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1400&q=75",
      items: [
        {
          name: "Buffalo Fried Chicken Balls",
          desc: "seven balls, bleu cheese, celery",
          price: "12",
        },
        {
          name: "Fried Mozzarella",
          desc: "fresh mozzarella, marinara",
          price: "12",
        },
        {
          name: "Cheesy Bread",
          desc: "provolone, parmesan, garlic butter",
          price: "12",
        },
        {
          name: "Bruschetta",
          desc: "whipped ricotta, roasted tomato, balsamic, arugula",
          price: "12",
        },
        {
          name: "Parmesan-Herb Fries",
          desc: "parm, parsley, garlic aioli",
          price: "12",
        },
        {
          name: "Crack Fries",
          desc: "smothered in crack sauce, buffalo & ranch",
          price: "12",
        },
        {
          name: "Chicken Tenders",
          desc: "three tenders, fries",
          price: "12",
        },
      ],
    },
    {
      title: "Soups & Salads",
      items: [
        {
          name: "Italian Wedding",
          desc: "tiny meatballs, escarole, broth, pecorino",
          price: "10",
        },
        {
          name: "Caesar",
          desc: "romaine, parmesan shavings, croutons",
          price: "10",
        },
      ],
    },
    {
      title: "Entrées",
      items: [
        {
          name: "Shrimp Vodka Pasta",
          desc: "seared shrimp, vodka cream, rigatoni",
          price: "22",
        },
        {
          name: "Penne Bolognese",
          desc: "twelve-hour ragù",
          price: "22",
        },
        {
          name: "Grilled Chicken Dinner",
          desc: "marinated breast, lemon, side",
          price: "22",
        },
        {
          name: "Chicken Parm Dinner",
          desc: "breaded, mozzarella, marinara, spaghetti",
          price: "22",
        },
      ],
    },
    {
      title: "On the Bun",
      items: [
        {
          name: "Meatball Hoagie",
          desc: "three classic balls, sauce of choice",
          price: "18",
        },
        {
          name: "Chicken Parm Sandwich",
          desc: "breaded chicken, mozzarella, marinara",
          price: "18",
        },
        {
          name: "Buffalo Chicken Sandwich",
          desc: "fried, buffalo, ranch, pickles",
          price: "18",
        },
        {
          name: "Emporio Burger",
          desc: "two patties, american, special sauce",
          price: "18",
        },
      ],
    },
    {
      title: "Bowls",
      subtitle: "Pick a base, three balls and a sauce.",
      items: [
        {
          name: "Jacked Mac Bowl",
          desc: "house mac & cheese • meatballs • crack sauce",
          price: "18",
        },
        {
          name: "Italian Classic",
          desc: "spaghetti • classic balls • marinara",
          price: "18",
        },
        {
          name: "Pesto Chicken Pasta",
          desc: "penne • grilled chicken • pesto",
          price: "18",
        },
        {
          name: "Build Your Own",
          desc: "pick a base, three balls, a sauce, see the matrix below",
          price: "18",
          flag: "build-your-own",
        },
      ],
    },
    {
      title: "Sides",
      items: [
        {
          name: "French Fries",
          price: "8",
        },
        {
          name: "Mac n' Cheese",
          price: "8",
        },
        {
          name: "Roasted Vegetables",
          price: "8",
        },
      ],
    },
    {
      title: "Desserts",
      items: [
        {
          name: "Homemade Ricotta Doughnuts",
          desc: "warm, dusted, dipped",
          price: "10",
        },
        {
          name: "Tiramisu",
          desc: "espresso-soaked lady fingers, mascarpone, cocoa",
          price: "10",
        },
      ],
    },
    {
      title: "Kids Menu",
      subtitle: "Pick any two, $7 each.",
      items: [
        {
          name: "Meatball with Sauce",
          price: "7",
        },
        {
          name: "Mac n' Cheese",
          price: "7",
        },
        {
          name: "Fried Chicken Balls",
          price: "7",
        },
        {
          name: "Spaghetti",
          price: "7",
        },
        {
          name: "Broccoli",
          price: "7",
        },
        {
          name: "Tater Tots",
          price: "7",
        },
        {
          name: "French Fries",
          price: "7",
        },
      ],
    },
  ],
  mezzo: [
    {
      title: "Antipasti",
      imageUrl:
        "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=1400&q=75",
      items: [
        {
          name: "Burrata",
          desc: "warm burrata, roasted tomato, sautéed garlic & shallot, basil, balsamic, focaccia",
          price: "14",
        },
        {
          name: "Toasted Focaccia",
          desc: "balsamic & olive oil",
          price: "10",
        },
        {
          name: "Caesar",
          desc: "chopped romaine, focaccia croutons, pecorino • add chicken, shrimp, or salmon +5",
          price: "13",
        },
        {
          name: "House Salad",
          desc: "romaine, red onion, tomato, cucumber, olives, peppercini",
          price: "13",
        },
        {
          name: "Arancini",
          desc: "risotto, swiss, fried golden, spicy tomato",
          price: "17",
        },
        {
          name: "Calamari",
          desc: "lightly breaded, marinara, lemon aioli",
          price: "20",
        },
      ],
    },
    {
      title: "Wood-Fired Pizza",
      imageUrl:
        "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1400&q=75",
      items: [
        {
          name: "Margherita",
          desc: "mozzarella, ricotta, marinara, oven-roasted tomato, torn basil",
          price: "24",
        },
        {
          name: "Pepperoni",
          desc: "four cheeses, pepperoni, marinara",
          price: "24",
        },
        {
          name: "Soppressata & Hot Honey",
          desc: "marinara, hot honey, soppressata, mozzarella",
          price: "25",
          flag: "house favorite",
        },
        {
          name: "Sausage alla Vodka",
          desc: "house vodka sauce, mozzarella, italian seasoning, basil, parmesan",
          price: "25",
        },
        {
          name: "Short Rib",
          desc: "rich wine sauce, braised short rib, mozzarella, caramelized onion",
          price: "26",
        },
      ],
    },
    {
      title: "Pasta",
      items: [
        {
          name: "Gemelli alla Vodka",
          desc: "gemelli, creamy vodka, blistered cherry tomato, fresh spinach",
          price: "25",
        },
        {
          name: "Spaghetti Carbonara",
          desc: "egg yolk, pecorino, black pepper, crispy pancetta, green peas",
          price: "27",
        },
        {
          name: "Gnocchi Florentine",
          desc: "roasted chicken, spinach, cherry tomato, pesto cream",
          price: "28",
        },
        {
          name: "Short Rib Pasta",
          desc: "braised short rib, pappardelle, whipped ricotta, pickled red onion",
          price: "29",
        },
        {
          name: "Crab-Stuffed Ravioli",
          desc: "jumbo lump crab, whipped ricotta, lemon zest, white truffle cream",
          price: "29",
        },
      ],
    },
    {
      title: "Mains",
      items: [
        {
          name: "Chicken Parmesan",
          desc: "breaded to order, golden, marinara & mozzarella, side of spaghetti",
          price: "32",
        },
        {
          name: "Chicken Marsala",
          desc: "chicken breast, crimini, marsala wine, heavy cream, parsley",
          price: "32",
        },
        {
          name: "Braised Short Rib",
          desc: "wine-braised beef, demi glace, pickled red onion, mashed potato, broccolini",
          price: "32",
        },
        {
          name: "Horseradish-Crusted Salmon",
          desc: "Alaskan salmon, dijon, horseradish breadcrumb, leek beurre blanc, spinach, risotto",
          price: "32",
        },
      ],
    },
    {
      title: "Dessert",
      items: [
        {
          name: "Tiramisù",
          desc: "espresso-dipped lady fingers, zabaglione, mascarpone, cocoa, cream",
          price: "14",
        },
        {
          name: "Tortino al Cioccolato",
          desc: "warm molten chocolate cake with a lava center, vanilla gelato",
          price: "14",
        },
        {
          name: "Vanilla Crème Brûlée",
          desc: "vanilla custard, caramelized sugar, mint",
          price: "12",
        },
        {
          name: "Espresso • single / double",
          desc: "from a Marzocco that runs all night",
          price: "3.50",
        },
      ],
    },
    {
      title: "House Bar",
      items: [
        {
          name: "House Martini",
          desc: "Tito's vodka or Iron City gin, blue cheese stuffed olives, peppercini",
          price: "15",
        },
        {
          name: "Espresso Martini",
          desc: "Tito's vodka, kahlua, espresso cold brew",
          price: "15",
        },
        {
          name: "Old Fashioned",
          desc: "rye, house simple, bitters, orange",
          price: "15",
        },
        {
          name: "Manhattan",
          desc: "bourbon, sweet vermouth, bitters, luxardo cherry",
          price: "15",
        },
        {
          name: "Peach Bellini",
          desc: "peach purée blend, prosecco, scoop of peaches",
          price: "14",
        },
      ],
    },
    {
      title: "Seasonal Cocktails",
      items: [
        {
          name: "Sugar Cookie",
          desc: "vodka, amaretto, heavy cream",
          price: "14",
        },
        {
          name: "Spiced Kentucky Mule",
          desc: "Big Springs whiskey, ginger beer, lime, cinnamon",
          price: "13",
        },
        {
          name: "Snow Day",
          desc: "blanco tequila, crème de cacao, blue curaçao, cream",
          price: "13",
        },
        {
          name: "Poinsettia",
          desc: "prosecco, cranberry, orange liqueur",
          price: "12",
        },
      ],
    },
    {
      title: "Barolo & Barbaresco",
      subtitle: "Piemonte",
      items: [
        {
          name: "Fratelli Ponte Barolo",
          desc: "Piemonte • 2020 • medium-bodied, red berry, earthy undertone",
          price: "60",
        },
        {
          name: "Giovanni Rosso Barolo del Comune di Serralunga d'Alba",
          desc: "Piemonte • 2017 • ripe fruit, oak, lingering dried orange",
          price: "110",
        },
        {
          name: "Rivetto Barbaresco Macarini",
          desc: "Piemonte • 2018 • fresh tannin, ruby red, floral aromatics",
          price: "120",
        },
        {
          name: "Vietti Rocche di Castiglione Barolo",
          desc: "Piemonte • 2017 • full-bodied, silky, rose, strawberry, raspberry",
          price: "180",
          flag: "cellar",
        },
      ],
    },
    {
      title: "Sangiovese & Brunello",
      subtitle: "Tuscany • CA",
      items: [
        {
          name: "Duxoup Sangiovese",
          desc: "California • dried red fruit, oak, vanilla",
          price: "65",
        },
        {
          name: "Jacopo Biondi Santi Sassoalloro Sangiovese",
          desc: "Tuscany • rich fruit, silky tannin",
          price: "130",
        },
        {
          name: "Frescobaldi Castelgiocondo Brunello di Montalcino",
          desc: "Tuscany • dense tannic foundation, legendary vinification",
          price: "140",
        },
      ],
    },
    {
      title: "The Long Red List",
      subtitle: "IT • FR • CA",
      items: [
        {
          name: "Aramis Shiraz",
          desc: "McLaren Vale, AU",
          price: "40",
        },
        {
          name: "Resa Grenache",
          desc: "Sonoma 2018",
          price: "60",
        },
        {
          name: "Rocca di Frassinello Red Blend",
          desc: "Tuscany 2016",
          price: "60",
        },
        {
          name: "Bertani Amarone della Valpolicella Valpantena",
          desc: "Veneto 2019",
          price: "75",
        },
        {
          name: "Rutherford Hill Merlot",
          desc: "Napa 2017",
          price: "75",
        },
        {
          name: "Trione Red Blend",
          desc: "Sonoma 2017",
          price: "90",
        },
        {
          name: "Eagle Eye Infatuation Red Blend",
          desc: "Napa 2010",
          price: "90",
        },
        {
          name: "Bouquet de Monbrison Château",
          desc: "Margaux 2017",
          price: "110",
        },
        {
          name: "Emeritus Pinot Noir",
          desc: "Sonoma 2019",
          price: "120",
        },
        {
          name: "Trefethen Dragon's Tooth Red Blend",
          desc: "Napa 2018",
          price: "130",
        },
        {
          name: "Trefethen Eschol Red Blend",
          desc: "Napa 2019",
          price: "140",
        },
        {
          name: "Tenuta Arceno Valadornia Toscana Red Blend",
          desc: "Tuscany 2016",
          price: "180",
        },
        {
          name: "Italian Sparkling Red",
          desc: "Lambrusco-style, by the bottle",
          price: "60",
        },
      ],
    },
    {
      title: "Whites & Rosé",
      items: [
        {
          name: "Sal Do Chenin Blanc",
          desc: "California 2020",
          price: "40",
        },
        {
          name: "Frescobaldi Pomino Bianco",
          desc: "Tuscany 2021",
          price: "40",
        },
        {
          name: "Sauska Furmint",
          desc: "Tokaj, Hungary 2020",
          price: "60",
        },
        {
          name: "Sauska Tokaji Aszú",
          desc: "Tokaj, Hungary 2017",
          price: "60",
        },
        {
          name: "Rombauer Chardonnay",
          desc: "Carneros, CA",
          price: "80",
        },
      ],
    },
  ],
  tetto: [
    {
      title: "Rooftop Kitchen",
      subtitle: "Whole pies from the wood oven below.",
      imageUrl:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1400&q=75",
      items: [
        {
          name: "Whole Pepperoni Pie",
          desc: "8 slices, baked hot from below",
          price: "25",
        },
        {
          name: "Whole Cheese Pie",
          desc: "four cheeses, marinara",
          price: "24",
        },
        {
          name: "Meatball Hoagie",
          desc: "three classic balls, sauce of choice",
          price: "18",
        },
        {
          name: "Buffalo Chicken Balls",
          desc: "seven balls, bleu cheese, celery",
          price: "12",
        },
        {
          name: "Fried Mozzarella",
          desc: "fresh mozzarella, marinara",
          price: "12",
        },
        {
          name: "Cheesy Bread",
          desc: "provolone, parmesan, garlic butter",
          price: "12",
        },
        {
          name: "Parmesan-Herb Fries",
          desc: "parm, parsley, garlic aioli",
          price: "12",
        },
        {
          name: "Crack Fries",
          desc: "smothered in crack sauce, buffalo & ranch",
          price: "12",
        },
        {
          name: "Chicken Tenders",
          desc: "three tenders, fries",
          price: "14",
        },
        {
          name: "Caesar",
          desc: "romaine, parm shavings, croutons",
          price: "12",
        },
      ],
    },
    {
      title: "On Draft",
      subtitle: "Thirty rotating lines. Local first.",
      items: [
        {
          name: "Peroni Original",
          desc: "Birra Peroni • Roma, IT • Pale Lager • 4.7%",
        },
        {
          name: "Yinzer Lager",
          desc: "Fat Head's Brewery • Middleburg Heights, OH • American Lager • 4.8%",
          flag: "local",
        },
        {
          name: "Mango Cart",
          desc: "Golden Road • Los Angeles, CA • Fruited Wheat • 4.0%",
        },
        {
          name: "Michelob Ultra",
          desc: "Anheuser-Busch • St. Louis, MO • Light Lager • 4.2%",
        },
        {
          name: "Bud Light",
          desc: "Anheuser-Busch • St. Louis, MO • Light Lager • 4.2%",
        },
        {
          name: "Miller Lite",
          desc: "Miller Brewing • Milwaukee, WI • Light Lager • 4.2%",
        },
        {
          name: "Lil Guy",
          desc: "Hamburg Brewing • Hamburg, NY • Session IPA • 3.9%",
        },
        {
          name: "Mexican Coffee",
          desc: "Brew Gentlemen • Braddock, PA • Coffee Oatmeal Stout • 6.5%",
          flag: "local",
        },
        {
          name: "Negley's Nectar",
          desc: "Arsenal Cider House • Pittsburgh, PA • Semi-Sweet Peach Cider • 8.4%",
          flag: "local",
        },
        {
          name: "Murray's Mead",
          desc: "Arsenal Cider House • Pittsburgh, PA • Traditional Mead • 9.0%",
          flag: "local",
        },
        {
          name: "Crisp Apple",
          desc: "Angry Orchard • Walden, NY • Hard Cider • 5.0%",
        },
        {
          name: "Autumn Blaze",
          desc: "Captain Lawrence • Elmsford, NY • Pumpkin Ale • 5.0%",
          flag: "seasonal",
        },
      ],
    },
  ],
  catering: [
    {
      title: "Family-Style",
      items: [
        {
          name: "Choice of Two Meatballs",
          options: [
            {
              label: "Tray",
              price: 110,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=85",
          note: "ten sauces",
          serves: "serves 25",
        },
        {
          name: "Chicken Parmesan",
          options: [
            {
              label: "Half pan",
              price: 57.5,
            },
            {
              label: "Full pan",
              price: 115,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Cheesy Bread",
          options: [
            {
              label: "Half pan",
              price: 70,
            },
            {
              label: "Full pan",
              price: 140,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Buffalo Chicken Balls",
          options: [
            {
              label: "Half pan",
              price: 55,
            },
            {
              label: "Full pan",
              price: 110,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Mac & Cheese",
          options: [
            {
              label: "Half pan",
              price: 60,
            },
            {
              label: "Full pan",
              price: 120,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Shepherd's Pie",
          options: [
            {
              label: "Half pan",
              price: 42.5,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Mashed Potatoes",
          options: [
            {
              label: "Half pan",
              price: 60,
            },
            {
              label: "Full pan",
              price: 120,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Roasted Brussels Sprouts",
          options: [
            {
              label: "Half pan",
              price: 115,
            },
            {
              label: "Full pan",
              price: 230,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1438118907704-7718ee9a191a?auto=format&fit=crop&w=900&q=85",
        },
      ],
    },
    {
      title: "Plated-Ready",
      items: [
        {
          name: "Mini Crab Cakes",
          options: [
            {
              label: "Half pan",
              price: 90,
            },
            {
              label: "Full pan",
              price: 180,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Hand-Tossed Pizza",
          options: [
            {
              label: "One topping",
              price: 20,
            },
            {
              label: "Two toppings",
              price: 24,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
          note: "one or two toppings • 8-cut",
        },
        {
          name: "Chicken • Veal Picatta",
          options: [
            {
              label: "Half pan",
              price: 90,
            },
            {
              label: "Full pan",
              price: 110,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Chicken • Veal Marsala",
          options: [
            {
              label: "Half pan",
              price: 90,
            },
            {
              label: "Full pan",
              price: 110,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=900&q=85",
        },
      ],
    },
    {
      title: "Boards & Apps",
      items: [
        {
          name: "Cheese & Charcuterie",
          options: [
            {
              label: "Half pan",
              price: 100,
            },
            {
              label: "Full pan",
              price: 200,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
          note: "3 meats • 3 cheeses • pickles • chutney",
        },
        {
          name: "Caprese with Focaccia",
          options: [
            {
              label: "Half pan",
              price: 50,
            },
            {
              label: "Full pan",
              price: 100,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=900&q=85",
        },
      ],
    },
    {
      title: "Pasta",
      items: [
        {
          name: "Rigatoni Bolognese",
          options: [
            {
              label: "Half pan",
              price: 80,
            },
            {
              label: "Full pan",
              price: 160,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=85",
        },
        {
          name: "Stuffed Shells",
          options: [
            {
              label: "Half pan",
              price: 60,
            },
            {
              label: "Full pan",
              price: 75,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85",
          note: "cheese or sausage",
        },
      ],
    },
    {
      title: "Sweets",
      items: [
        {
          name: "Cookies",
          options: [
            {
              label: "Half pan",
              price: 70,
            },
            {
              label: "Full pan",
              price: 140,
            },
          ],
          kitchen: "emporio",
          imageUrl:
            "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
          note: "chocolate chip • oatmeal raisin",
        },
        {
          name: "Cannolis",
          options: [
            {
              label: "Dozen",
              price: 30,
            },
          ],
          kitchen: "mezzo",
          imageUrl:
            "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=900&q=85",
          note: "pick two flavors",
        },
      ],
    },
  ],
}
