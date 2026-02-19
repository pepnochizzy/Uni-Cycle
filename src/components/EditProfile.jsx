import { updateUniversity } from "@/app/actions/updateProfile";

export default function EditProfileForm({ profile, universities }) {
  return (
    <form action={updateUniversity} className="my-form">
      <h2>Edit Profile</h2>
      <label>University</label>
      <select
        name="university"
        defaultValue={profile.university || ""}
        required
      >
        <option value="">Select your new university</option>
        {universities.map((u) => (
          <option key={u.id} value={u.university}>
            {u.university}
          </option>
        ))}
      </select>
      <button className="button mb-4">Save Changes</button>
    </form>
  );
}
