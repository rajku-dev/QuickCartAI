// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// import {GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// import {onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
// import {collection,addDoc,query,onSnapshot,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// import { GoogleGenerativeAI } from "https://cdn.jsdelivr.net/npm/@google/generative-ai@latest/dist/index.mjs"

import './styles.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import aiImage from './assets/ai.png';
document.getElementById('categorizeBtn').src = aiImage;
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI((process.env.GOOGLE_API_KEY));
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run(itemsList) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: 'Task: Categorize Shopping Items Based on Predicted Prices\\n\\n    Items List:Bread, monitor, earpodes, table, chair, fan, bottle, \\n\\nCriteria for Categorization:\\n1. Cheap: Items priced at ₹2000 or less.\\n2. Expensive: Items priced over ₹2000.\\n\\nInstructions:\\n1. Price Prediction:\\n   - Research current prices on popular Indian e-commerce platforms like Amazon or Flipkart.\\n   - Provide realistic price estimates for each item(a number) according to Indian Market Scenario.\\n\\n2. Output Format:\\n   - Provide the results in JSON format with the following structure:\\n   \\n     {\\n       \\"cheapItems\\": [\\n         { \\"item\\": \\"itemname\\"(string in double quotes), \\"cost\\": itemcost (less than 2000) }\\n       ],\\n       \\"expensiveItems\\": [\\n         { \\"item\\": \\"itemname\\"(string in double quotes), \\"cost\\": itemcost (more than 2000) }\\n       ]\\n     }\\n   \\n     - cheapItems: List of items costing 2000 or less according to your accurate prediction.\\n     - expensiveItems: List of items costing more than 2000 according to your accurate prediction.\\n\\n3. Notes:\\n   - Both categories might not contain items.\\n   - Ensure prices reflect current market trends accurately.\\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"cheapItems": [{"item": "Bread", "cost": 50}, {"item": "earpodes", "cost": 1500}, {"item": "bottle", "cost": 100}, {"item": "chair", "cost": 1500}, {"item": "fan", "cost": 1800}], "expensiveItems": [{"item": "monitor", "cost": 3000}, {"item": "table", "cost": 2500}]}\n\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: 'Task: Categorize Shopping Items Based on Predicted Prices\\n\\n    Items List:Bread, monitor, earpodes, table, chair, fan, bottle, \\n\\nCriteria for Categorization:\\n1. Cheap: Items priced at ₹2000 or less.\\n2. Expensive: Items priced over ₹2000.\\n\\nInstructions:\\n1. Price Prediction:\\n   - Research current prices on popular Indian e-commerce platforms like Amazon or Flipkart.\\n   - Provide realistic price estimates for each item(a number) according to Indian Market Scenario.\\n\\n2. Output Format:\\n   - Provide the results in JSON format with the following structure:\\n   \\n     {\\n       \\"cheapItems\\": [\\n         { \\"item\\": \\"itemname\\"(string in double quotes), \\"cost\\": itemcost (less than 2000) }\\n       ],\\n       \\"expensiveItems\\": [\\n         { \\"item\\": \\"itemname\\"(string in double quotes), \\"cost\\": itemcost (more than 2000) }\\n       ]\\n     }\\n   \\n     - cheapItems: List of items costing 2000 or less according to your accurate prediction.\\n     - expensiveItems: List of items costing more than 2000 according to your accurate prediction.\\n\\n3. Notes:\\n   - Both categories might not contain items.\\n   - Ensure prices reflect current market trends accurately.\\n\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"cheapItems": [{"item": "Bread", "cost": 40}, {"item": "earpodes", "cost": 1000}, {"item": "bottle", "cost": 50}, {"item": "chair", "cost": 1500}, {"item": "fan", "cost": 1800}], "expensiveItems": [{"item": "monitor", "cost": 5000}, {"item": "table", "cost": 3000}]}\n\n```',
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: 'Task: Categorize Shopping Items Based on Predicted Prices\\n\\n    Items List:Bread, monitor, earpodes, table, chair, fan, bottle, \\n\\nCriteria for Categorization:\\n1. Cheap: Items priced at ₹2000 or less.\\n2. Expensive: Items priced over ₹2000.\\n\\nInstructions:\\n1. Price Prediction:\\n   - Research current prices on popular Indian e-commerce platforms like Amazon or Flipkart.\\n   - Provide realistic price estimates for each item(a number) according to Indian Market Scenario.\\n\\n2. Output Format:\\n   - Provide the results in JSON format with the following structure:\\n   \\n     {\\n       \\"cheapItems\\": [\\n         { \\"item\\": \\"itemname\\"(string in double quotes), \\"cost\\": itemcost (less than 2000) }\\n       ],\\n       \\"expensiveItems\\": [\\n         { \\"item\\": \\"itemname\\"(string in double quotes), \\"cost\\": itemcost (more than 2000) }\\n       ]\\n     }\\n   \\n     - cheapItems: List of items costing 2000 or less according to your accurate prediction.\\n     - expensiveItems: List of items costing more than 2000 according to your accurate prediction.\\n\\n3. Notes:\\n   - Both categories might not contain items.\\n   - Ensure prices reflect current market trends accurately.\\n',
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{"cheapItems": [{"item": "Bread", "cost": 40}, {"item": "earpodes", "cost": 1000}, {"item": "bottle", "cost": 50}, {"item": "chair", "cost": 1500}, {"item": "fan", "cost": 1800}], "expensiveItems": [{"item": "monitor", "cost": 5000}, {"item": "table", "cost": 3000}]}\n\n```',
          },
        ],
      },
    ],
  });

  var result = await chatSession.sendMessage(
    `Task: Categorize Shopping Items Based on Predicted Prices\n\n    Items List:${itemsList} \n\nCriteria for Categorization:\n1. Cheap: Items priced at ₹2000 or less.\n2. Expensive: Items priced over ₹2000.\n\nInstructions:\n1. Price Prediction:\n   - Research current prices on popular Indian e-commerce platforms like Amazon or Flipkart.\n   - Provide realistic price estimates for each item(a number) according to Indian Market Scenario.\n\n2. Output Format:\n   - Provide the results in JSON format with the following structure:\n   \n     {\n       \"cheapItems\": [\n         { \"item\": \"itemname\"(string in double quotes), \"cost\": itemcost (less than 2000) }\n       ],\n       \"expensiveItems\": [\n         { \"item\": \"itemname\"(string in double quotes), \"cost\": itemcost (more than 2000) }\n       ]\n     }\n   \n     - cheapItems: List of items costing 2000 or less according to your accurate prediction.\n     - expensiveItems: List of items costing more than 2000 according to your accurate prediction.\n\n3. Notes:\n   - Both categories might not contain items.\n   - Ensure prices reflect current market trends accurately.\n`
  );
  result = result.response.text();
  console.log(result);
  return JSON.parse(result);
}



const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginPage = document.getElementById("loginPage");
const cartPage = document.getElementById("cartPage");

// Login Page elements
const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
const signInBtn = document.getElementById("signInBtn");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpBtn = document.getElementById("signUpBtn");
const showSignIn = document.getElementById("showSignIn");
const showSignUp = document.getElementById("showSignUp");
const errorMessage = document.getElementById("error-message");

// Cart Page elements
const input = document.getElementById("input");
const addBtn = document.getElementById("add-btn");
const ul = document.getElementById("ul");
const categorizeBtn = document.getElementById("categorizeBtn");
const categorizedItems = document.getElementById("categorizedItems");
const cheap = document.getElementById("cheap");
const expensive = document.getElementById("expensive");
const costDiv = document.getElementById("cost");
const logoutBtn = document.getElementById("logoutBtn");
const name = document.getElementById("name-show");

// Authentication state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Show Cart Page and hide Login Page
    loginPage.style.display = "none";
    cartPage.style.display = "block";

    const itemsCollectionRef = collection(db, "users", user.uid, "items");
    name.innerHTML = `${user.displayName?.split(" ")[0] || "Your"}'s Cart`;

    const q = query(itemsCollectionRef);
    onSnapshot(q, (snapshot) => {
      ul.innerHTML = "";
      if (snapshot.empty) {
        ul.innerHTML = "Cart is Empty";
      } else {
        snapshot.forEach((doc) => {
          const itemData = doc.data();
          appendItem(doc.id, itemData.text);
        });
      }
    });

    addBtn.addEventListener("click", async () => {
      const itemText = input.value.trim();
      if (itemText) {
        await addDoc(itemsCollectionRef, {
          text: itemText,
          createdAt: new Date(),
        });
        input.value = "";
      }
    });

    categorizeBtn.addEventListener("click", async () => {
      const snapshot = await new Promise((resolve) =>
        onSnapshot(q, (snap) => resolve(snap))
      );

      const items = [];
      snapshot.forEach((doc) => {
        items.push(doc.data());
      });
      if (items.length === 0) return;
      const res = await getCategorizedItems(items);
      const cheapItems = res.cheapItems;
      const expensiveItems = res.expensiveItems;
      renderCategorizedItems(cheapItems, expensiveItems);
    });

    logoutBtn.addEventListener("click", async () => {
      try {
        await signOut(auth);
        window.location.reload();
      } catch (error) {
        console.error("Error signing out:", error);
      }
    });
  } else {
    // Show Login Page and hide Cart Page
    loginPage.style.display = "block";
    cartPage.style.display = "none";
  }
});

showSignIn.addEventListener("click", () => {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
  });
  
  showSignUp.addEventListener("click", () => {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
  });
  
  // Google Sign-In
  document.getElementById("loginBtn").addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    //   window.location.href = "/cart";
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      errorMessage.textContent = error.message;
    }
  });
  
  // Email Sign-In
  signInBtn.addEventListener("click", async () => {
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    //   window.location.href = "/cart";
    } catch (error) {
      console.error("Error during email sign-in:", error);
      errorMessage.textContent = error.message;
    }
  });
  
  // Email Sign-Up
  signUpBtn.addEventListener("click", async () => {
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    //   window.location.href = "/cart";
    } catch (error) {
      console.error("Error during email sign-up:", error);
      errorMessage.textContent = error.message;
    }
  });
  
// Helper functions
async function getCategorizedItems(items) {
    try {
      const itemsList = items.map((item) => item.text).join(", ");
      const result = await run(itemsList);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Error:", error);
      return { cheapItems: [], expensiveItems: [] };
    }
}

function calculateTotalCost(cheapItems = [], expensiveItems = []) {
  const cheapTotal = cheapItems.reduce((total, item) => total + item.cost, 0);
  const expensiveTotal = expensiveItems.reduce(
    (total, item) => total + item.cost,
    0
  );
  return cheapTotal + expensiveTotal;
}

function renderCategorizedItems(cheapItems, expensiveItems) {
  const totalCost = calculateTotalCost(cheapItems, expensiveItems);
  categorizedItems.style.display = "flex";
  costDiv.style.display = "block";
  cheap.innerHTML = `${cheapItems
    .map((it) => `<li>${it["item"]} (₹${it["cost"]})</li>`)
    .join("")}`;
  expensive.innerHTML = `${expensiveItems
    .map((it) => `<li>${it["item"]} (₹${it["cost"]})</li>`)
    .join("")}`;
  costDiv.innerHTML = `Total Cost: ₹${totalCost}`;
}

const clearItems = () => {
  ul.innerHTML = "";
};

const appendItem = (id, val) => {
  const newItem = document.createElement("li");
  newItem.textContent = val;
  ul.appendChild(newItem);

  newItem.addEventListener("click", async () => {
    const itemDocRef = doc(db, "users", auth.currentUser.uid, "items", id);
    await deleteDoc(itemDocRef);
    console.log(`${val} removed from cart`);
  });
};

const clearInput = () => {
  input.value = "";
};
