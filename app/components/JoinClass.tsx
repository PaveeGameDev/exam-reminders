import { joinClass } from "@/app/actions/actions";

export default async function JoinClass() {
  return (
    <form action={joinClass}>
      <label htmlFor="classId">ClassId:</label>
      <input type="number" id="classId" name="classId" required />
      <button type="submit">Submit</button>
    </form>
  );
}
