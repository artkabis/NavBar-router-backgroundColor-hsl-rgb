import "./nav.scss";

import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams
} from "react-router-dom";

export default function AnimationExample() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/hsl/10/90/50" />
        </Route>
        <Route path="*">
          <AnimationApp />
        </Route>
      </Switch>
    </Router>
  );
}

function AnimationApp() {
  let location = useLocation();
  return (
    <div style={styles.fill}>
      <ul style={styles.nav}>
        <li style={styles.navItem} id="nav-0" bgColor="red">
          <NavLink className="link" to="/hsl/10/90/50">
            Red
          </NavLink>
        </li>
        <li style={styles.navItem} id="nav-1" bgColor="green">
          <NavLink className="link" to="/hsl/120/100/40">
            Green
          </NavLink>
        </li>
        <li style={styles.navItem} id="nav-2" bgColor="blue">
          <NavLink className="link" id="nav-5" to="/rgb/33/150/243">
            Blue
          </NavLink>
        </li>
        <li style={styles.navItem} id="nav-3" bgColor="pink">
          <NavLink className="link" to="/rgb/240/98/146">
            Pink
          </NavLink>
        </li>
      </ul>

      <div style={styles.content}>
        <TransitionGroup>
          {/*
            Ce n'est pas différent des autres utilisations de
            <CSSTransition>, assurez-vous simplement de passer
            `location` à` Switch` pour qu'il puisse correspondre
            à l'ancien emplacement pendant l'animation.
          */}
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Switch location={location}>
              <Route path="/hsl/:h/:s/:l" children={<HSL />} />
              <Route path="/rgb/:r/:g/:b" children={<RGB />} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}
/** Hook transition *
function App() {
  const [inProp, setInProp] = useState(false);
  return (
    <div>
      <Transition in={this.state.in} timeout={150}>
  {state => (
    <MyComponent className={`fade fade-${state}`} />
  )}
</Transition>
      <button onClick={() => setInProp(true)}>
        Click to Enter
      </button>
    </div>
  );
}
*/

function NavLink(props) {
  return <Link {...props} style={{ color: "inherit" }} />;
}

function HSL() {
  let { h, s, l } = useParams();
  return (
    <div
      style={{
        ...styles.fill,
        ...styles.hsl,
        background: `hsl(${h}, ${s}%, ${l}%)`
      }}
    >
      hsl({h}, {s}%, {l}%)
    </div>
  );
}

function RGB() {
  let { r, g, b } = useParams();
  return (
    <div
      style={{
        ...styles.fill,
        ...styles.rgb,
        background: `rgb(${r}, ${g}, ${b})`
      }}
    >
      rgb({r}, {g}, {b})
    </div>
  );
}
/***
 * Styles interface
 */
const styles = {};
styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};
styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};
styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};
styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
