import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import SpadesRound from "../components/SpadesRound";
import "../App.css";

function SpadesCalculator() {
  // const [team1Score, setTeam1Score] = useState(0);
  // const [team1Bags, setTeam1Bags] = useState(0);
  // const [team2Score, setTeam2Score] = useState(0);
  // const [team2Bags, setTeam2Bags] = useState(0);
  // const [teamInfoCompleted, setTeamInfoCompleted] = useState(false);
  // const [roundStarted, setRoundStarted] = useState(false);
  const [roundData, setRoundData] = useState([]);
  const hasSessionStorage = !!sessionStorage.getItem("initialValues");
  const formik = useFormik({
    initialValues: {
      team1Name: hasSessionStorage
        ? JSON.parse(sessionStorage.getItem("initialValues")).team1Name
        : "Team 1",
      team2Name: hasSessionStorage
        ? JSON.parse(sessionStorage.getItem("initialValues")).team2Name
        : "Team 2",
      t1p1Name: hasSessionStorage
        ? JSON.parse(sessionStorage.getItem("initialValues")).t1p1Name
        : "",
      t2p1Name: hasSessionStorage
        ? JSON.parse(sessionStorage.getItem("initialValues")).t2p1Name
        : "",
      t1p2Name: hasSessionStorage
        ? JSON.parse(sessionStorage.getItem("initialValues")).t1p2Name
        : "",
      t2p2Name: hasSessionStorage
        ? JSON.parse(sessionStorage.getItem("initialValues")).t2p2Name
        : "",
      roundNumber: roundData.length,
      nameInfoSubmitted: false,
    },
    onSubmit: (values) => {
      formik.setFieldValue("nameInfoSubmitted", true);
      sessionStorage.setItem("initialValues", JSON.stringify(values));
    },
  });

  useEffect(() => {
    sessionStorage.setItem("initialValues", JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <div className="App">
      <div className="App-inner">
        <p>This is where my spades calculator will be!</p>
        <h1>TODO's</h1>
        <ul>
          <li>
            Make the 'Spades Calculator' landing page only ask for player names,
            with option to change team name (but defaulted to Team 1 and Team 2)
          </li>
          <li>
            When that information is entered, you are brought to a new screen
            with the Team info at the top as a sticky nav. This means I'll
            probably need to use the Provider API to share state between two
            different componenets. Alternative is to not have a different page,
            but to just update state after team information is entered and have
            conditional redering for "game round" information.
          </li>
          <li>
            Implement Formik (and maybe Yup) for easy form management, and make
            sure I'm not using both Formik form state and local state for the
            same information. Can only have one source of truth!!!
          </li>
          <li>if 'start' button is clicked, then round will come up</li>
          <li>determine where round number state will be stored</li>
        </ul>
        <div
          className="team-board"
          style={{
            display: "flex",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          <div>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="team1Name">Team 1 Name</label>
              <input
                type="text"
                value={formik.values.team1Name}
                onChange={formik.handleChange}
                id="team1Name"
                name="team1Name"
              />

              <label htmlFor="t1p1Name">Player 1 Name</label>
              <input
                type="text"
                value={formik.values.t1p1Name}
                onChange={formik.handleChange}
                id="t1p1Name"
                name="t1p1Name"
              />

              <label htmlFor="t1p2Name">Player 2 Name</label>
              <input
                value={formik.values.t1p2Name}
                onChange={formik.handleChange}
                id="t1p2Name"
                name="t1p2Name"
              />
              <label htmlFor="team2Name">Team Name</label>
              <input
                value={formik.values.team2Name}
                onChange={formik.handleChange}
                id="team2Name"
                name="team2Name"
              />

              <label htmlFor="t2p1Name">Player 1 Name</label>
              <input
                value={formik.values.t2p1Name}
                onChange={formik.handleChange}
                id="t2p1Name"
                name="t2p1Name"
              />

              <label htmlFor="t2p2Name">player 2 Name</label>
              <input
                value={formik.values.t2p2Name}
                onChange={formik.handleChange}
                id="t2p2Name"
                name="t2p2Name"
              />

              <button type="submit">Start</button>
            </form>
            {formik.values.nameInfoSubmitted ? (
              <SpadesRound values={formik.values} />
            ) : null}
            {/* 
          - initialize rounds to empty array
          - when round starts (when 'start' is clicked), then we push an object to our rounds array 
          {t1p1Bet, t1p2Bet, t2p1Bet, t2p2Bet, t1p1Actual, t1p2Actual, t2p1Actual, t2p2Actual, t1Bags, t2Bags, t1Score, t2Score}
          all initialized to falsey defaults
          - when an object is in our array (when arr.length is not falsey), then we render our first round, which is a form
          - When someone fills out all fields of the child component <Round>, form fields update to input values, and math is calculated, and another empty object is pushed to our rounds array
                - will need to pass handler from parent to child and the handler should update parent state
          */}
          </div>
        </div>
        {/* 
      if roundInSession === true, display current editable round

      if roundHasJustFinished === true, push most recent game to completedRounds array

      for each completed round, list game round stats in reverse order
    */}
      </div>
    </div>
  );
}

export default SpadesCalculator;
