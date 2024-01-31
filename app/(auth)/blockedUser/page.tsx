'use client'


const blockedUser = () => {

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Your account has been disabled.</h1>
        <p className="text-lg">Please contact admin.</p>
      </div>
    </div>
  );
  };
  

export default blockedUser;
