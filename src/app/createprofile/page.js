import { db } from "@/utils/dbConnections";
import { auth } from "@clerk/nextjs/server";

export default async function CreateProfilePage() {
  async function handleCreateProfile(rawFormData) {
    "use server";
    const { userId } = await auth();
    console.log(`Clerk user ID is : ${userId}`);

    const formValues = {
      id: userId,
      username: rawFormData.get("username"),
      first_name: rawFormData.get("firstname"),
      last_name: rawFormData.get("surname"),
      avatar_url: rawFormData.get("avatarlink"),
      university: rawFormData.get("uniname"),
    };

    await db.query(
      `INSERT INTO uni_users (clerk_id, username, first_name, last_name, avatar_url, university) VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        formValues.id,
        formValues.username,
        formValues.first_name,
        formValues.last_name,
        formValues.avatar_url,
        formValues.university,
      ],
    );
  }
  return (
    <>
      <h2>Registration (Final step)</h2>
      <form action={handleCreateProfile}>
        <label htmlFor="username">Your user name: </label>
        <input type="text" name="username" maxLength={128} required />
        <label htmlFor="firstname">Your first name:</label>
        <input type="text" name="firstname" maxLength={64} required />
        <label htmlFor="surname">Your last name:</label>
        <input type="text" name="surname" maxLength={64} required />
        <label htmlFor="avatarlink">Link to your profile picture:</label>
        <input type="text" name="avatarlink" />
        <label htmlFor="uniname">Your university:</label>
        <input type="text" name="uniname" required />
      </form>
    </>
  );
}
