import React, { useState, useEffect } from "react";

const App = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [source, setSource] = useState<EventSource | null>(null)

  useEffect(() => {}, []);

  const handleSubscribe = () => {
     if (source) {
      return
    }
    const s = new EventSource("http://localhost:8080/stream");

    s.addEventListener("message", (event) => {
      setEvents((prevEvents) => [...prevEvents, event.data]);
    }, false);

    s.addEventListener("error", (error) => {
      console.log("EventSource failed: " + error);
    }, false);

    setSource(s)
  }

  const handleUnsubscribe = () => {
    if (source) {
      source.close()
      setSource(null)
    }
  }

  return (
    <div>
      <button onClick={handleSubscribe}>Start</button>
      <button onClick={handleUnsubscribe}>Close</button>
      <h1>Events:</h1>
      {events?.map((event, index) => (
        <p key={index}>{event}</p>
      ))}
    </div>
  );
};

export default App;
