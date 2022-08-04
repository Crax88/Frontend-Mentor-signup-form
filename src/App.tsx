function App() {
  return (
    <div className="wrapper">
      <div className="left">
        <h1 className="title">Learn to code by watching others</h1>
        <p className="lead">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
      <div className="right">
        <p className="promo">
          Try it free 7 days <span>then $20/mo. thereafter</span>
        </p>
        <form>
          <input type="text" placeholder="First Name" />
          <small>Error</small>
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Password" />
          <button type="submit">Claim your free trial</button>
          <p
            style={{ color: "black", fontSize: "0.7rem", textAlign: "center" }}
          >
            By clicking the button, you are agreeing to our{" "}
            <a href="#" style={{ color: "red" }}>
              Terms and Services
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default App;
