import React, { useState, useEffect } from 'react';
import gridStyle from "./homeFeed.module.css";
import UserCard from '../../component/UserCard';


function HomeFeed() {
  const [users, setUsers] = useState([]);
  const [usersByInterests,setUsersByInterests]=useState([])
  const [usersByQualification,setUsersByQualification]=useState([])
  
  const handleAccept = (userId) => {
    console.log(`Accepted user ${userId}`);
  };

  const handleReject = (userId) => {
    console.log(`Rejected user ${userId}`);
  };

  useEffect(() => {
    console.log("hi")
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwtToken', token);
    }

    const getLocationAndFetchUsers = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            try {
              await saveLocation(location);
              await fetchNearbyUsers();
            } catch (error) {
              console.error('Error in location or fetching users:', error);
            }
          },

        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
    const fetchUsersByInterests = async () => {
      try {
        const response = await fetch('http://localhost:8000/users-by-interests', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching users by interests');
        }
       const data=await response.json()
        setUsersByInterests(data.map(userdata => ({
          id: userdata.userDetails._id,
          bio: userdata.profileDetails.bio,
          name: userdata.userDetails.first_name,
          profilePic: userdata.profileDetails.profileImage,
        })));
  
      } catch (err) {
        console.log(err)
      }
    };
    const fetchUsersByQualification = async () => {
      try {
        const response = await fetch('http://localhost:8000/users-by-qualification', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        if (!response.ok) {
          throw new Error('Error fetching users by interests');
        }
       const data=await response.json()
        setUsersByQualification(data.map(userdata => ({
          id: userdata.userDetails._id,
          bio: userdata.profileDetails.bio,
          name: userdata.userDetails.first_name,
          profilePic: userdata.profileDetails.profileImage,
        })));
      } catch (err) {
        console.log(err)
      }
    };
    getLocationAndFetchUsers();
    fetchUsersByInterests();
    fetchUsersByQualification();
    
  }, []);

  const saveLocation = async (location) => {
    try {
      const response = await fetch('http://localhost:8000/save-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify(location),
      });
      if (!response.ok) {
        throw new Error('Error saving location');
      }
      await response.json();
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const fetchNearbyUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/nearby-users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching nearby users');
      }
      const data = await response.json();
      
      setUsers(data.map(userdata => ({
        id: userdata.user,
        bio: userdata.profileDetails.bio,
        name: userdata.userDetails.first_name,
        profilePic: userdata.profileDetails.profileImage,
      })));
    } catch (error) {
      console.error('Error fetching nearby users:', error);
    }
  };

  return (
    <>
    <h2 className={gridStyle.head}>People nearby</h2>
    <div className={gridStyle.user_grid}>
      
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </div>
    <h2 className={gridStyle.head}>People with same interest</h2>
    <div className={gridStyle.user_grid}>
      
      {usersByInterests.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </div>
    <h2 className={gridStyle.head}>People with same qualification</h2>
    <div className={gridStyle.user_grid}>
      
      {usersByQualification.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      ))}
    </div>
    </>
  );
}

export default HomeFeed;