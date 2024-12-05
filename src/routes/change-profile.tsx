import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { useChangeProfile } from "@/hooks/changeProfile";
import { auth } from "@/firebase";

export const Route = createFileRoute("/change-profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const storage = getStorage();
  const { success, error, handleProfileChange } = useChangeProfile();
  const user = auth.currentUser;

  const uploadProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }

    try {
      if (!user) return;

      // Reference to the user's avatar folder
      const userImagesRef = ref(storage, `avatars/${user.uid}`);
      const listResponse = await listAll(userImagesRef);

      // Delete previous avatar if exists
      if (listResponse.items.length > 0) {
        const previousImageRef = listResponse.items[0];
        await deleteObject(previousImageRef);
      }

      // Upload new avatar
      const storageRef = ref(
        storage,
        `avatars/${user.uid}/${image.name}`
      );
      await uploadBytes(storageRef, image);
      const photoURL = await getDownloadURL(storageRef);
      await handleProfileChange(photoURL);
      console.log("File available at", photoURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="border border-border max-w-md mx-auto p-10 bg-background rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-1">Change Profile Picture</h1>
      <input
        type="file"
        onChange={uploadProfile}
        className="mt-4 p-2 border rounded-lg w-full"
      />
      <Button onClick={handleUpload} className="w-full mb-4">
        Upload
      </Button>

      <Button onClick={() => navigate({ to: "/" })} className="w-full mb-2">
        Back to Dashboard
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && (
        <p className="text-green-500">Profile picture updated successfully!</p>
      )}
    </div>
  );
}
