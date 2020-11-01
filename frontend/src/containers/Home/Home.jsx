import React, { useState } from 'react';
import GroupEvents from '../../components/GroupEvents/GroupEvents';
import HomeTab from '../../components/MiddleSection/Home/HomeTab';
import FriendsTab from '../../components/MiddleSection/Friends/FriendsTab';
import SettingsTab from '../../components/MiddleSection/Settings/SettingsTab';
import LeftSection from '../../components/LeftSection/LeftSection';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
function Home() {
  const [activeTab1, setActiveTab1] = useState(true);
  const [activeTab2, setActiveTab2] = useState(false);
  const [activeTab3, setActiveTab3] = useState(false);

  return (
    <div>
      <Navbar
        activeTab1={activeTab1}
        activeTab2={activeTab2}
        activeTab3={activeTab3}
        setActiveTab1={setActiveTab1}
        setActiveTab2={setActiveTab2}
        setActiveTab3={setActiveTab3}
      />
      <div className='row'>
        <div className='col'></div>
        <div className='col-6 tab-buttons'>
          <button
            onClick={() => {
              setActiveTab2(false);
              setActiveTab3(false);
              setActiveTab1(true);
            }}
            className='tab-button'
          >
            <i className='fas fa-home tab-icon'></i>
            Home
          </button>
          <button
            onClick={() => {
              setActiveTab1(false);
              setActiveTab3(false);
              setActiveTab2(true);
            }}
            className='tab-button'
          >
            <i className='fas fa-user-friends tab-icon'></i>
            Friends
          </button>
          <button
            onClick={() => {
              setActiveTab1(false);
              setActiveTab2(false);
              setActiveTab3(true);
            }}
            className='tab-button'
          >
            <i className='fas fa-cog tab-icon'></i>
            Settings
          </button>
        </div>
        <div className='col'></div>
      </div>
      <div className='tabs-section-all'>
        <div className='row'>
          <div className='left col'>
            <LeftSection />
          </div>
          <div className='mid col-6'>
            {activeTab1 && <HomeTab />}
            {activeTab2 && <FriendsTab />}
            {activeTab3 && <SettingsTab />}
          </div>
          <div className='right col'>
            <GroupEvents />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
