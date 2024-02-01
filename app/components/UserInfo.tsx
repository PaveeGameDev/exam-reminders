import { User } from "@prisma/client";

type Props = {
  user: User;
};
export default function UserInfo({ user }: Props) {
  return (
    <div>
      <p>User info</p>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
