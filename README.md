<div align="center">
    
# Eco Pathfinder ![GitHub last commit](https://img.shields.io/github/last-commit/shdzhng/eco-pathfinder?color=green&logo=github)
</div>

## Motivation
Eco Pathfinder is a proof of concept SPA that envisions a new way of accessing multi-modal travel information to embed the consideration of our carbon footprint into our everyday commute. Eco Pathfinder encourages a “slower” mode of travel by providing users with four travel methods to their destination alongside its CO2 emission. Implicitly promoting carpooling over personal automobiles for long-distance travel and the use of scooter/bicycle over automobile for local journeys.

#### Technologies
JavaScript, React, Redux-Toolkit, CSS, Google Map API 

![SPA Demo](https://media1.giphy.com/media/In4iZ0z4cH0iHHQVmL/giphy.gif?cid=790b76114a32f9db6d0208d88976bf7eb8f7594d377f209d&rid=giphy.gif&ct=g)

## Installation
1. Clone the repository 
 ```
 $ git clone https://git@github.com:shdzhng/eco-pathfinder.git
 ```
2. Install the node package
 ```
 $ npm install
 ```
3. If you wish to use your own Google Maps API key you can do so at .env.local in the root folder. 
```
REACT_APP_GOOGLE_MAPS_API_KEY = ["YOUR_API_KEY"]
```
Ensure that your credential have the following APIs enabled: Directions API, Geocoding API, Maps Javascript API, Places API

4. Run npm start
 ```
 $ npm start
 ```

## Credits

Emissions calculation logic informed by data released by the [U.S. Department of Transportation](https://www.transit.dot.gov/sites/fta.dot.gov/files/docs/PublicTransportationsRoleInRespondingToClimateChange2010.pdf).

