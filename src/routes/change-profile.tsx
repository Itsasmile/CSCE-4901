import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { useChangeProfile } from "@/hooks/changeProfile";
import { AuthContext } from "@/context/AuthContext";

export const Route = createFileRoute("/change-profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const { success, error, handleProfileChange } = useChangeProfile();
  const authState = useContext(AuthContext);

  const user = authState?.user;

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

      await handleProfileChange(image.type, await image.arrayBuffer());
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
