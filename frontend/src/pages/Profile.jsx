import Sidebar from '../components/Sidebar.jsx';
import PasswordForm from '../components/profile/PasswordForm.jsx';
import ProfileForm from '../components/profile/ProfileForm.jsx';
import useProfile from '../hooks/profile/useProfile.js';

const Profile = () => {
  const {
    isLoading,
    username,
    setUsername,
    profileError,
    passwordForm,
    setPasswordForm,
    handleProfileSubmit,
    handlePasswordSubmit,
  } = useProfile();

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_70%_-10%,#fff3e8_0%,#fff7f0_35%,#fffdfb_100%)] text-[#3d2d24]">
      <div className="flex min-h-screen w-full flex-col md:flex-row md:flex-wrap">
        <Sidebar />

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#3f2b20]">Profile</h2>
            <p className="mt-1 text-sm text-[#7a6151]">
              Atur informasi akun dan keamanan
            </p>
          </div>

          {profileError && (
            <div className="mt-4 rounded-2xl border border-[#f4c7b6] bg-[#fff1ea] px-4 py-3 text-sm text-[#9a3412]">
              {profileError}
            </div>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <ProfileForm
              isLoading={isLoading}
              username={username}
              onUsernameChange={(event) => setUsername(event.target.value)}
              onSubmit={handleProfileSubmit}
            />

            <PasswordForm
              passwordForm={passwordForm}
              onChange={(field, value) =>
                setPasswordForm((prev) => ({ ...prev, [field]: value }))
              }
              onSubmit={handlePasswordSubmit}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
