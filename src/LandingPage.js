import React from 'react';
import './LandingPage.css';

function LandingPage() {
  // Component for displaying the landing page of the app
  // Is placed below the logout button
  // Displays an explanation of the app functionality,
  // an explanation of why it matters, and the creators of the app
  return (
    <div className="landingPage">
      <hr className="divider" />

      <section id="functionality" className="text-center">
        <h2 className="section">App Functionality</h2>
        <div>
          <p>
            A simple quiz game that tests your trivia knowledge. Nogginy has everything you need
            for a daily, competitive game. Players can:
          </p>
          <div className="listFunc">
            <ul className="functionality">
              <li>
                Login using their Google account
              </li>
              <li>
                Compete against a global leaderboard
              </li>
              <li>
                Play single or multiplayer modes
              </li>
              <li>
                Select desired question category and difficulty
              </li>
              <li>
                Receive points based on the number of correct answers
              </li>
              <li>
                Edit the display screen by selecting the color and font of your choice
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div>
        {' '}
        <hr className="divider" />
      </div>

      <section id="why" className="text-center">
        <h2 className="section">Why it matters?</h2>
        <div>
          <p>
            A fun and educational way to connect with friends and play a game!

          </p>
        </div>
      </section>

      <div>
        {' '}
        {' '}
        <hr className="divider" />
      </div>

      <section id="creators">
        <h2 className="section">Creators:</h2>
        <div className="list">
          <ul>
            <li>
              Mateo Micciche
            </li>
            <li>
              Janice Konadu
            </li>
            <li>
              Joncarlos Perdomo
            </li>
            <li>
              Venkata Sunkara
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
