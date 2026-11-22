export const ANTIPASTO = [
  {
    name: "Burrata",
    desc: "warm burrata, roasted tomato, sautéed garlic & shallot, basil, balsamic, focaccia",
    price: "14",
  },
  { name: "Toasted Focaccia", desc: "balsamic & olive oil", price: "10" },
  {
    name: "Caesar",
    desc: "chopped romaine, focaccia croutons, pecorino · add chicken, shrimp, or salmon +5",
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
] as const

export const PIZZA = [
  {
    name: "Margherita",
    desc: "mozzarella, ricotta, marinara, oven-roasted tomato, torn basil",
    price: "24",
  },
  { name: "Pepperoni", desc: "four cheeses, pepperoni, marinara", price: "24" },
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
] as const

export const PASTA = [
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
] as const

export const MAINS = [
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
] as const

export const DESSERT = [
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
    name: "Espresso · single / double",
    desc: "from a Marzocco that runs all night",
    price: "3.50",
  },
] as const

export const COCKTAILS = [
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
] as const

export const SEASONAL_COCKTAILS = [
  { name: "Sugar Cookie", desc: "vodka, amaretto, heavy cream", price: "14" },
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
] as const

export const WINE_FEATURED = [
  {
    name: "Fratelli Ponte Barolo",
    region: "Piemonte · 2020",
    note: "medium-bodied, red berry, earthy undertone",
    price: "60",
  },
  {
    name: "Giovanni Rosso Barolo del Comune di Serralunga d'Alba",
    region: "Piemonte · 2017",
    note: "ripe fruit, oak, lingering dried orange",
    price: "110",
  },
  {
    name: "Rivetto Barbaresco Macarini",
    region: "Piemonte · 2018",
    note: "fresh tannin, ruby red, floral aromatics",
    price: "120",
  },
  {
    name: "Vietti Rocche di Castiglione Barolo",
    region: "Piemonte · 2017",
    note: "full-bodied, silky, rose, strawberry, raspberry",
    price: "180",
    flag: "cellar",
  },
] as const

export const WINE_VARIETAL = [
  {
    name: "Duxoup Sangiovese",
    region: "California",
    note: "dried red fruit, oak, vanilla",
    price: "65",
  },
  {
    name: "Jacopo Biondi Santi Sassoalloro Sangiovese",
    region: "Tuscany",
    note: "rich fruit, silky tannin",
    price: "130",
  },
  {
    name: "Frescobaldi Castelgiocondo Brunello di Montalcino",
    region: "Tuscany",
    note: "dense tannic foundation, legendary vinification",
    price: "140",
  },
] as const

export const WINE_REDS = [
  { name: "Aramis Shiraz", region: "McLaren Vale, AU", price: "40" },
  { name: "Resa Grenache", region: "Sonoma 2018", price: "60" },
  {
    name: "Rocca di Frassinello Red Blend",
    region: "Tuscany 2016",
    price: "60",
  },
  {
    name: "Bertani Amarone della Valpolicella Valpantena",
    region: "Veneto 2019",
    price: "75",
  },
  { name: "Rutherford Hill Merlot", region: "Napa 2017", price: "75" },
  { name: "Trione Red Blend", region: "Sonoma 2017", price: "90" },
  {
    name: "Eagle Eye Infatuation Red Blend",
    region: "Napa 2010",
    price: "90",
  },
  {
    name: "Bouquet de Monbrison Château",
    region: "Margaux 2017",
    price: "110",
  },
  { name: "Emeritus Pinot Noir", region: "Sonoma 2019", price: "120" },
  {
    name: "Trefethen Dragon's Tooth Red Blend",
    region: "Napa 2018",
    price: "130",
  },
  { name: "Trefethen Eschol Red Blend", region: "Napa 2019", price: "140" },
  {
    name: "Tenuta Arceno Valadornia Toscana Red Blend",
    region: "Tuscany 2016",
    price: "180",
  },
] as const

export const WINE_WHITES = [
  { name: "Sal Do Chenin Blanc", region: "California 2020", price: "40" },
  { name: "Frescobaldi Pomino Bianco", region: "Tuscany 2021", price: "40" },
  { name: "Sauska Furmint", region: "Tokaj, Hungary 2020", price: "60" },
  { name: "Sauska Tokaji Aszú", region: "Tokaj, Hungary 2017", price: "60" },
  { name: "Rombauer Chardonnay", region: "Carneros, CA", price: "80" },
] as const

export const STATS = [
  { value: "800°F", label: "oven temperature" },
  { value: "90 sec", label: "average pizza bake" },
  { value: "noon", label: "pasta rolled daily" },
] as const

export const HOURS = [
  { day: "Wed", hours: "5:00 → 9:30 PM" },
  { day: "Thu", hours: "5:00 → 10:00 PM" },
  { day: "Fri", hours: "5:00 → 11:00 PM" },
  { day: "Sat", hours: "4:30 → 11:00 PM" },
  { day: "Sun", hours: "4:30 → 9:30 PM" },
  { day: "Mon – Tue", hours: "Closed" },
] as const
