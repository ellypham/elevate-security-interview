const PORT = 9000;
const axios = require('axios');
const express = require('express');
const app = express();

const baseUrl = 'https://incident-api.use1stag.elevatesecurity.io';


// Fetch mapping from IP address to employee id
async function fetchIdentities() {
  const response = await axios.get(`${baseUrl}/identities`, {
    auth: {
      username: 'elevateinterviews',
      password: 'ElevateSecurityInterviews'
    }
  })

  return response.data;
}

// fetch and format data 
async function fetchIncidents(type, identities) {
  // fetches the data from the api (all incident types)
  const response = await axios.get(`${baseUrl}/incidents/${type}/`, {
    auth: {
      username: 'elevateinterviews',
      password: 'ElevateSecurityInterviews'
    }
  });

  // format the data (timestamp, id, types, and priority)
  const incidents = response.data.results.map(incident => {
    // since some incidents represent an indenty as an IP address instead of id, we want to map through the GET/identities endpoint convert IP Address to id when formatting the data.
    let id;
    switch(type) {
      case 'denial':
        id = incident.reported_by;
        break;
      case 'intrusion':
        id = identities[incident.internal_ip];
        break;
      case 'executable':
        id = identities[incident.machine_ip];
        break;
      default:
        throw new Error(`Unknown incident type: ${type}`);
    }

    return {
      timestamp: incident.timestamp,
      id: id,
      types: type,
      priority: incident.priority
    };
  });

  return incidents;
}


app.get('/events', async (req, res) => {
  try {
    const identities = await fetchIdentities();
    const types = ['denial', 'intrusion', 'executable'];
    const incidents = await Promise.all(types.map(type => fetchIncidents(type, identities)));
    const allIncidents = [].concat(...incidents).sort((a, b) => b.timestamp - a.timestamp);

    res.json(allIncidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching events', error });
  }

})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))