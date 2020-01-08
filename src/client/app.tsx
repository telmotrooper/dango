import * as React from "react"
import ReactDOM from "react-dom"

class App extends React.Component<any, any> {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              Hello, World!
            </h1>
            <h2 className="subtitle">
              Let's make something nice. :)
            </h2>
          </div>
        </div>
      </section>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
