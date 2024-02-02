import { joinClass } from "@/app/actions/actions";
export default async function JoinClass() {
  return (
    <div className="card max-w-96 bg-base-200 shadow-xl border border-gray-300 flex items-center justify-center p-6">
      <div className="card-body">
        <form action={joinClass} className="flex flex-col items-center">
          <label htmlFor="classId" className="mb-2 text-xl font-semibold">
            ClassId
          </label>
          <input
            className="input input-bordered input-primary w-full max-w-xs text-center text-lg"
            type="number"
            id="classId"
            name="classId"
            required
          />
          <button className="btn btn-primary mt-5 w-full max-w-xs">
            Join Class
          </button>
        </form>
      </div>
    </div>
  );
}
