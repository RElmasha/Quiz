// components/UserProfile.tsx

import React, { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContext";
import { Button,Box } from "@chakra-ui/react";

const UserProfile: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <p className="text-center">Utilisateur non connecté.</p>;
  }

  return (
    <Box className="flex flex-row justify-between items-center p-4 gap-8">
      <img
        src={user.avatarUrl}
        alt={`${user.firstName} ${user.lastName}`}
        className="w-24 h-24 rounded-full mb-4"
      />
      <Box>
      <h2 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h2>
      {user.email && <p className="text-gray-600">{user.email}</p>}
      {user.phoneNumber && <p className="text-gray-600">{user.phoneNumber}</p>}
      <p className="text-sm text-gray-500">Connecté via : {user.provider}</p>
      </Box>
      <Button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Déconnexion
      </Button>
    </Box>
  );
};

export default UserProfile;
