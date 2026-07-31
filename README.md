# DevTinder
Cors- install cors in backend and add the whitelisted domains
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

now in frontend when are making api call add { withCredentials: true }, otherwise cookies won't be stored in browser.
 const res = await axios.post(
        "http://localhost:7777/login",
        { emailId, password },
        { withCredentials: true },
      );
