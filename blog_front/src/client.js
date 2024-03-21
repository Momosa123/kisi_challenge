import { createClient } from "@sanity/client";

export default createClient({
  projectId: "m6zlsgmg", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  token:
    "skPYQ60ttsS72WXjQb7oKPXcjnGYOeNXIm72DAua4PD3XdsIqMY4DazPqPCqAJRKf39cJUobuLrZ1T0fcYpj0tXlW4fM3DteWtJouBq6Buy93FvYyOhsAibZC0qE9YWGhRnq0cWJIqWqENUByGSD9Fs1chbbFm4BWwBjGwzM9sK2qEYbabFY",
  useCdn: false, // `false` if you want to ensure fresh data
});
