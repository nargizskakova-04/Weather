Weather App Documentation
Overview
The Weather App is a web-based application designed to provide detailed weather information. It allows users to enter a city name and retrieve current weather data, including temperature, description, UV index, as well as sunrise and sunset times for both the sun and the moon.

Installation
To run the application, Node.js needs to be installed on your system.

Clone the Repository:

bash
Copy code
git clone [Your Repository URL]
cd [Your Project Name]
Install Dependencies:

bash
Copy code
npm install
Start the Server:

bash
Copy code
node [Your Main Server File, e.g., app.js]
After starting, the server will be accessible at http://localhost:3000.

Usage
After starting the server, open a web browser and navigate to http://localhost:3000. Enter the name of a city in the input field and click the "Get Weather" button. The weather information will be displayed on a new page.

Key Features
Weather Retrieval and Display: The application uses the OpenWeatherMap API to fetch weather data based on the city name.
UV Index Display: Utilizes the OpenUV API to obtain and display the UV index.
Moon Phase Display: Uses the API from ipgeolocation.io to display moonrise and moonset times.
Interactive Map: Displays location on a map using Leaflet.
Key Technical Decisions
Node.js and Express.js: Used for creating the server and handling requests and responses.
External Weather APIs: Integration with OpenWeatherMap, OpenUV, and ipgeolocation.io for comprehensive weather data.
Front-End Development: HTML pages styled with Bootstrap for responsive design, ensuring compatibility across various devices and screen sizes.
Client-Side JavaScript: Used for dynamically updating the weather information without the need to reload the page.
API Usage
OpenWeatherMap API: Provides current weather data including temperature, humidity, pressure, and descriptive weather conditions.
OpenUV API: Offers real-time UV index data.
ipgeolocation.io API: Delivers moonrise and moonset times, enhancing the weather information with astronomical data.
Setup Instructions
Obtain API keys from OpenWeatherMap, OpenUV, and ipgeolocation.io.
Insert the API keys in the respective places in your server-side JavaScript file.
Run the server and access the application through a web browser.
Design Choices
User Interface: A simple and intuitive interface allowing easy access to weather data.
Responsive Design: Ensures that the application is usable on a wide range of devices.
Error Handling: Includes checks for incorrect city input and handles API errors gracefully, displaying relevant messages to the user.
