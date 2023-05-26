# Elevate Security Interview

## Instructions to run the project
- Clone the repository `git clone https://github.com/ellypham/elevate-security-interview.git`
- Navigate to the directory
- Run npm install to install dependencies
- Run the project with `npm run dev`

## Available Scripts

In the project directory, you can run:

### `npm run server`
You can see the queried and formatted security incidents via HTTP

Open [http://localhost:9000](http://localhost:9000) to view it in your browser.

### `npm run client`
You won't be able to see any security incidents returned here unless you have the server running using the script above.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 

The page will reload when you make changes.

### `npm run dev`

Runs the the server (`npm run server`) and the client (`npm run client`) concurently so you can see the formatted data from the backend webserver displayed on the frontend.

## Overall approach and other approaches you considered
First I worked on the backend webserver using node.js, express and axios.
- queried all the service endpoints from the provided API
- formatted the data (Timestamp, Employee ID, Incident Type, Priority)
- merged all the endpoints together

Once the backend webserver was working, I worked on the front end to query the backend webserver and renders all the incidents sorted by incident timestamp. 
- Used React for the front end
- Used hooks; useEffect() to fetch the data from the backend webserver and useState() in order to add the state (the incident events) to the App.js component.
- Displayed all the data using a table 

## How you would enhance this code if you needed it to run in production
- Handle credentials sercurely. Currently the username and password live in the source code, so it would need to be stored securely using environmental variables
- Add tests to ensure all the functions work as expected
- If there were more events, we can control how much of the data is being fetched at a time by using pagination or maybe fetch the data as the user scrolls down and not all at once
- Add in error handling for both backend and front end
- Add loading status (loading spinner) for the front end if there is a lot of data and it's taking some time to fetch the data
