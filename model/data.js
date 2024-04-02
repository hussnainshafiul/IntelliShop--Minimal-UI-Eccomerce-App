const PRODUCTS = [
  {
    id: 42419,
    Category: "Apparel",
    Gender: "girl",
    Title: "Gini and Jony Girls Knit White Top",
    image: require("../assets/shirt.png"),
    price: "250",
    description:
      "Stylish and comfortable girl's apparel designed to showcase individuality and express personal fashion preferences, offering a blend of trendy patterns, vibrant colors, and quality materials",
  },

  {
    id: 12345,
    Category: "Apparel",
    Gender: "girl",
    Title: "Floral Pink Dress",
    image: require("../assets/dress.png"),
    price: "300",
    description:
      "Adorable and fashionable girl's dress featuring a cute floral print, perfect for special occasions and everyday wear. Made with high-quality fabric for comfort and style.",
  },
  {
    id: 34009,
    Category: "Apparel",
    Gender: "girl",
    Title: "Gini and Jony Girls Black Top",
    image: require("../assets/shirt.png"),
    price: "200",
    description:
      "Stylish and comfortable girl's apparel designed to showcase individuality and express personal fashion preferences, offering a blend of trendy patterns, vibrant colors, and quality materials",
  },

  {
    id: 67890,
    Category: "Apparel",
    Gender: "girl",
    Title: "Denim Jeans for Girls",
    image: require("../assets/jeans.jpeg"),
    price: "180",
    description:
      "Trendy denim jeans designed for girls who love a casual and stylish look. These jeans are comfortable, durable, and perfect for everyday adventures.",
  },
  {
    id: 11111,
    Category: "Apparel",
    Gender: "Boys",
    Title: "Cool Graphic T-Shirt for Boys",
    image: require("../assets/BoysBlack.jpg"),
    price: "150",
    description:
      "Awesome graphic t-shirt for boys with unique designs and vibrant colors. Made from soft and breathable fabric, ensuring comfort and style for young adventurers.",
  },
  {
    id: 22222,
    Category: "Apparel",
    Gender: "Boys",
    Title: "Boys Jeans",
    image: require("../assets/jeans.jpeg"),
    price: "280",
    description:
      "Trendy denim jeans designed for girls who love a casual and stylish look. These jeans are comfortable, durable, and perfect for everyday adventures",
  },
  {
    id: 33333,
    Category: "Apparel",
    Gender: "Boys",
    Title: "Cargo Shorts for Active Boys",
    image: require("../assets/shorts.jpg"),
    price: "120",
    description:
      "Durable and comfortable cargo shorts designed for active boys. These shorts are perfect for outdoor activities and casual everyday wear.",
  },
  {
    id: 44444,
    Category: "Apparel",
    Gender: "Boys",
    Title: "Classic Denim Jacket",
    image: require("../assets/denim.jpg"),
    price: "220",
    description:
      "Timeless denim jacket for boys, adding a cool and stylish layer to their outfits. Made with quality denim for durability and a classic look.",
  },
];
export function getProducts() {
  return PRODUCTS;
}
export function getProduct(id) {
  return PRODUCTS.find((product) => product.id == id);
}
// import { firebase } from "../config";

// const getProductsFromFirebase = async () => {
//   try {
//     const snapshot = await firebase.firestore().collection("products").get();
//     const products = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return products;
//   } catch (error) {
//     console.error("Error fetching products: ", error);
//     return [];
//   }
// };

// const getProductFromFirebase = async (productId) => {
//   try {
//     const snapshot = await firebase
//       .firestore()
//       .collection("products")
//       .doc(productId)
//       .get();
//     return { id: snapshot.id, ...snapshot.data() };
//   } catch (error) {
//     console.error("Error fetching product: ", error);
//     return null;
//   }
// };

// export { getProductFromFirebase };

// export { getProductsFromFirebase };
