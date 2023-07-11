// import React, { createContext, useState } from 'react';

// interface User {
//   userName: string;
//   email: string;
//   avatar: string;
// }

// interface AuthContextProps {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// export const AuthContext = createContext<AuthContextProps>({
//   user: null,
//   setUser: () => {
//     // Placeholder logic: Set the user state to a default user object
//     const defaultUser: User = {
//       userName: 'Guest',
//       email: '',
//       avatar: '',
//     };
//     setUser(defaultUser);
//   },
// });

// export const AuthProvider: React.FC = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
