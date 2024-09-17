import React, { useState, useEffect } from 'react';
import ProfileForm from 'frontend/src/components/ProfileForm';
import SubscriptionInfo from 'frontend/src/components/SubscriptionInfo';
import { getUserProfile, updateUserProfile } from 'frontend/src/services/api';
import { UserSchema } from 'frontend/src/schema/user';

// HUMAN ASSISTANCE NEEDED
// The following component may need additional error handling, loading states, and form validation.
// Please review and enhance as necessary for production readiness.

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (updatedProfile: UserSchema) => {
    try {
      const result = await updateUserProfile(updatedProfile);
      setUserProfile(result);
      // TODO: Add success message or notification
    } catch (err) {
      setError('Failed to update profile');
      // TODO: Add error message or notification
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      {userProfile && (
        <>
          <ProfileForm
            userProfile={userProfile}
            onSubmit={handleUpdateProfile}
          />
          <SubscriptionInfo subscriptionData={userProfile.subscription} />
        </>
      )}
    </div>
  );
};

export default Profile;