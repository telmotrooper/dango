import * as React from "react"
import ReactDOM from "react-dom"

class App extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <section class="section">
          <div class="container is-fluid">
            <header class="mb-1">
              <h1 class="title">Dango</h1>
              <h2 class="subtitle">ER diagrams to graph databases</h2>
            </header>
        
            <section id="top-menu" class="columns">
              <div class="column">
                <button class="button is-fullwidth" onclick="openSimpleModal('clear')()">Clear</button>
              </div>
              <div class="column">
                <button class="button is-fullwidth" onclick="saveERCode()">Save to device</button> 
              </div>
            </section>

            <p class="mb-05 fs-09 mt-minus-05">We've made a simple notation to represent ER diagrams in human-readable code! Learn more <a onclick="openSimpleModal('help')">here</a>.</p>

            <div class="columns">
              <section id="form" class="column is-two-fifths">
                <textarea class="textarea has-fixed-size is-small mb-1" rows="18" name="codebox"></textarea>
                <button class="button is-primary is-fullwidth" onclick="submitCode()">Send</button>
              </section>
              <section id="vis" class="column">
                <p>Placeholder for visualization</p>
              </section>
            </div>

        
          </div>
        </section>

        <div class="modal" id="parser-modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"><b>Parser output</b> <i>(JSON)</i></p>
              <button class="delete" aria-label="close" onclick="closeModal('parser')"></button>
            </header>
            <section class="modal-card-body">
              <p class="mb-05 ta-j">This is your Entity-Relationship Diagram represented as a JSON object:</p>
              <textarea readonly class="textarea has-fixed-size is-small mb-1" rows="18" id="json-code"></textarea>
            </section>
            <footer class="modal-card-foot jc-space-between">
              <button class="button"
                onclick="saveJSONCode()">Save to device</button>
              <button class="button is-success"
                onclick="getCypherFromER()">Convert to Cypher</button>
            </footer>
          </div>
        </div>

        <div class="modal" id="cypher-modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"><b>Converter output</b> <i>(Cypher)</i></p>
              <button class="delete" aria-label="close" onclick="closeModal('cypher')"></button>
            </header>
            <section class="modal-card-body">
              <p class="mb-05 ta-j">This is a schema for the Neo4j graph database (written in the Cypher query language) based on your Entity-Relationship Diagram:</p>
              <textarea readonly class="textarea has-fixed-size is-small mb-1" rows="18" id="get-cypher-from-er"></textarea>
            </section>
            <footer class="modal-card-foot jc-space-between">
              <button class="button"
                onclick="saveCypherCode()">Save to device</button>
              
              <div>
                <button class="button is-info"
                  onclick="">Generate visualization</button>
                <button class="button is-success"
                  onclick="">Run in Neo4j instance</button>
              </div>

            </footer>
          </div>
        </div>

        <div class="modal" id="clear-modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <section class="modal-card-body">
              <p>Are you sure you wanna clear your code?</p>
              <p><b>WARNING: This action is irreversible.</b></p>
            </section>
            <footer class="modal-card-foot jc-space-between">
              <button class="button is-danger"
                onclick="clearERCode()">Yes</button>
              <button class="button"
                onclick="closeModal('clear')">No</button>
            </footer>
          </div>
        </div>

        <div class="modal" id="help-modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title"><b>Notation</b></p>
              <button class="delete" aria-label="close" onclick="closeModal('help')"></button>
            </header>
            <section class="modal-card-body">
              <p class="mb-05 ta-j"><b>TODO:</b> Explain notation here.</p>
            </section>
            <footer class="modal-card-foot jc-flex-end">
              <button class="button"
                onclick="closeModal('help')">OK</button>
            </footer>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
