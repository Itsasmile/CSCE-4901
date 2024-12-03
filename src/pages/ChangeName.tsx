import {ReactNode} from 'react';
import { useChangeName } from '@/hooks/changeName';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
//import './ChangeName.css';

export default function changeName(): ReactNode {
  const { success, error, handleNameChange, setName } = useChangeName();
// const ChangeName = () => {
//   const [newName, setNewName] = useState("");
//   const [updateError, setUpdateError] = useState(null);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setNewName(e.target.value);
//   };

//   const handleUpdate = async () => {
//     if (!newName) {
//       setUpdateError('Please enter a new name.');
//       return;
//     }

//     try {
//       setUpdateError(null);
//       const user = auth.currentUser;
//       if (user) {
//         const userDocRef = doc(db, 'users', user.uid);
//         const userDoc = await getDoc(userDocRef);

//         if (userDoc.exists()) {
//           await updateDoc(userDocRef, { name: newName });
//           setUpdateSuccess(true);
//         } else {
//           setUpdateError('User document does not exist.');
//         }
//       } else {
//         setUpdateError('User is not logged in.');
//       }
//     } catch (error) {
//       console.error('Error updating name:', error);
//       setUpdateError(`Failed to update name. Please try again later. Error: ${error.message}`);
//     }
//   };

  return (
    <div className="border-border flex justify-center items-baseline mt-4 h-screen">
      <div className="border-border border bg-background p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Change Name</h2>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
      <form onSubmit={handleNameChange}>
        <div className="mb-4">
          <Label htmlFor="name">New Name</Label>
          <Input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your new name"
            required
          ></Input>
        </div>
        <Button type="submit" className="w-full">
          Change Name
        </Button>
        </form>
    </div>
  </div>
  );
};
