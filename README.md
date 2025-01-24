# Travel Planner Application

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [APIs Used](#apis-used)
- [How to Use](#how-to-use)

---

## Overview
The Travel Planner application helps users plan trips by providing essential information about their destination, including geographic details, weather forecasts, weather on the same trip day for the latest 3 years and images. It integrates multiple APIs to fetch data dynamically based on user input, ensuring a seamless and interactive experience.1

---

## Features
1. **Destination Details**: Get latitude, longitude, country, and city details using the Geonames API.
2. **Weather Forecasts**: Fetch current and future weather information using the Weatherbit API.
3. **Destination Images**: Retrieve relevant images for the destination using the Pixabay API.
4. **Countdown Timer**: Displays how many days are left until the trip.
5. **Responsive Design**: Cross-browser compatible input for date selection.
6. **Dynamic Updates**: Integrated with Webpack for hot-reloading during development.


---

## Setup and Installation
### Prerequisites
- Node.js and npm installed
- Webpack knowledge
- API keys for Geonames, Weatherbit, and Pixabay

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Diaa-Dw/udacity_travel_app.git
   cd udacity_travel_app
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add:
   ```env
   GEONAMES_BASEURL = "http://api.geonames.org/searchJSON?"
   WEATHERBIT_BASEURL="https://api.weatherbit.io/v2.0/"
   PIXABAY_BASEURL="https://pixabay.com/api/?"

   GEONAMES_USER=<your-geonames-username>
   WEATHERBIT_APIKEY=<your-weatherbit-api-key>
   PIXABAY_APIKEY=<your-pixabay-api-key>
   ```
4. **Run Development Server**:
   ```bash
   npm run build-dev
   ```
5. **Build for Production**:
   ```bash
   npm run build-prod
   ```
6. **Start Express Server**:
   ```bash
   npm start
   ```


---

## APIs Used
1. **Geonames API**: Fetches geographic details.
2. **Weatherbit API**: Provides weather forecasts.
3. **Pixabay API**: Supplies images based on location.

---

## How to Use
1. Enter the destination city in the input field.
2. Select the trip date.
3. View the countdown to your trip, destination details, weather forecast, and images.

