# Spellchecker using Trie Data Structure

This project is a spellchecker application that utilizes a Trie data structure, developed with Flask and React. The spellchecker is designed to provide accurate and efficient spelling suggestions for input text, making it a valuable tool for proofreading and enhancing the quality of written content.

## Features

- **Trie Data Structure:** The spellchecker leverages the power of the Trie data structure, which allows for fast lookup and insertion.
- **Flask Backend:** The backend of the project is built with Flask, a Python web framework. It handles incoming requests, processes spellchecking logic, and serves the API endpoints.
- **React Frontend:** The frontend is developed using React, a popular JavaScript library for building user interfaces. It provides a seamless and interactive user experience for inputting text and displaying spelling suggestions.
- **Accurate Spellchecking:** The spellchecker uses the Trie data structure to efficiently search for potential correct word suggestions. It can handle a wide range of input words and provide accurate results by utilizing the Merriam Webster Collegiate Dictionary API.

## Getting Started

To run the spellchecker application locally, follow these steps:

1. **Clone the repository:** Clone the repository to your local machine using the following command:

   ```shell
   git clone https://github.com/dinh2644/spellchecker.git

2. **Set up the backend:**

- Inside **Spellchecker**, navigate to the backend directory using the command:

  ```
  cd server
  ```

- Install the required Python packages by running the following command:

  ```
  pip install -r requirements.txt
  ```

- Start the Flask server with the following command:

  ```
  python app.py
  ```

3. **Set up the frontend:**

- Open another terminal
- Inside **Spellchecker**, navigate to the frontend directory using the command:

  ```
  cd client
  ```

- Install the necessary dependencies by running the following command:

  ```
  npm install
  ```

- Start the React development server with the following command:

  ```
  npm start
  ```

4. **To access the spellchecker without React:**

- After **python server.py**,
- Open your web browser and go to `http://localhost:5000/spellcheck?text=insert_text` to use the spellchecker.
