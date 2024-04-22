import ReactDOM from "react-dom/client";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import App from "./App.jsx";
import "./index.css";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const steps = [
  {
    id: "1",
    message: "Welcome to our real estate service! What is your name?",
    trigger: "2"
  },
  {
    id: "2",
    user: true,
    trigger: "3"
  },
  {
    id: "3",
    message:
      "Hi {previousValue}, nice to meet you! How can I assist you today?",
    trigger: "4"
  },
  {
    id: "4",
    options: [
      { value: "buy", label: "I'm looking to buy a property", trigger: "5" },
      { value: "sell", label: "I want to sell a property", trigger: "6" },
      { value: "rent", label: "I want to rent a property", trigger: "7" }
    ]
  },
  {
    id: "5",
    message:
      "Great! What type of property are you looking for? (e.g., apartment, house, etc.)",
    trigger: "8"
  },
  {
    id: "6",
    message:
      "Okay! Can you please provide details about the property you want to sell?",
    trigger: "9"
  },
  {
    id: "7",
    message: "Got it! What type of property are you looking to rent?",
    trigger: "8"
  },
  {
    id: "8",
    user: true,
    trigger: "10"
  },
  {
    id: "9",
    user: true,
    trigger: "11"
  },
  {
    id: "10",
    message:
      "Thank you for the information. Our team will reach out to you shortly to help you find your desired property.",
    end: true
  },
  {
    id: "11",
    message:
      "Thank you for the details. Our team will reach out to you soon to assist with selling your property.",
    end: true
  }
];
const theme = {
  background: "#FFFF99", // light yellow background
  headerBgColor: "#1E90FF", // bright blue header background color
  headerFontSize: "20px",
  botBubbleColor: "#4682B4", // steel blue color for bot bubble
  headerFontColor: "white",
  botFontColor: "white",
  userBubbleColor: "#FFD700", // bright yellow color for user bubble
  userFontColor: "black" // changed to black for better readability on yellow background
};

const config = {
  width: "300px",
  height: "400px",
  floating: true
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ThemeProvider theme={theme}>
        <ChatBot
          // This appears as the header
          // text for the chat bot
          headerTitle="Real Estate Help Bot"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
