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
      <button
        onClick={() => {
          setActiveTab2(false);
          setActiveTab3(false);
          setActiveTab1(true);
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          setActiveTab1(false);
          setActiveTab3(false);
          setActiveTab2(true);
        }}
      >
        {' '}
        Friends
      </button>
      <button
        onClick={() => {
          setActiveTab1(false);
          setActiveTab2(false);
          setActiveTab3(true);
        }}
      >
        {' '}
        Settings
      </button>
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
