import React from 'react';
import './App.css';

function App() {
  return (
    <div className='container'>
      <section className='scoreboard'>
        <div className='topRow'>
          <div className='home'>
            <h2 className='home__name'>Lions</h2>
            <div className='home__score'>32</div>
          </div>
          <div className='timer'>00:03</div>
          <div className='away'>
            <h2 className='away__name'>Tigers</h2>
            <div className='away__score'>32</div>
          </div>
        </div>
        <div className='bottomRow'>
          <div className='down'>
            <h3 className='down__title'>Down</h3>
            <div className='down__value'>3</div>
          </div>
          <div className='toGo'>
            <h3 className='toGo__title'>To Go</h3>
            <div className='toGo__value'>7</div>
          </div>
          <div className='ballOn'>
            <h3 className='ballOn__title'>Ball on</h3>
            <div className='ballOn__value'>21</div>
          </div>
          <div className='quarter'>
            <h3 className='quarter__title'>3</h3>
            <div className='quarter__value'>4</div>
          </div>
        </div>
      </section>
      <section className='buttons'>
        <div className='homeButtons'>
          <button className='homeButtons__touchdown'>Home Touchdown</button>
          <button className='homeButtons__fieldGoal'>Home Field Goal</button>
        </div>
        <div className='awayButtons'>
          <button className='awayButtons__touchdown'>Away Touchdown</button>
          <button className='awayButtons__fieldGoal'>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
