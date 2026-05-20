import * as functions from "firebase-functions";
import axios from "axios";

// It's highly recommended to set your API key in Firebase environment configuration
// using `firebase functions:config:set omdb.key="YOUR_OMDB_API_KEY"`
// and then access it via `functions.config().omdb.key`.
// For this example, it's hardcoded as per your instructions.
const OMDB_API_KEY = "d42a0580"; // TODO: Move to Firebase config for production

export const fetchMovie = functions.https.onRequest(async (req, res) => {
  // Allow CORS for all origins for this function. 
  // For production, you might want to restrict this to your Firebase Hosting domain.
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Send response to OPTIONS requests
    res.status(204).send("");
    return;
  }

  const title = req.query.title as string;

  if (!title) {
    res.status(400).send("Missing 'title' query parameter.");
    return;
  }

  if (!OMDB_API_KEY) {
    functions.logger.error("OMDb API key is not configured.");
    res.status(500).send("Server configuration error: OMDb API key missing.");
    return;
  }

  try {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        t: title,
        apikey: OMDB_API_KEY,
      },
    });

    if (response.data.Error) {
      functions.logger.warn("OMDb API Error:", response.data.Error, { title });
      // Send OMDb's error message back to the client, but with a 404 if movie not found
      if (response.data.Error.toLowerCase().includes("not found")) {
        res.status(404).json(response.data);
      } else {
        res.status(400).json(response.data);
      }
    } else {
      res.status(200).json(response.data);
    }
  } catch (error: any) {
    functions.logger.error("Error fetching from OMDb:", error.message, { title });
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).send(`Error fetching from OMDb: ${error.response.data?.Error || error.message}`);
    } else {
      res.status(500).send("Internal server error while fetching from OMDb.");
    }
  }
});
