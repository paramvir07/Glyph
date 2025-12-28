import { Input } from "@/components/ui/input";
import { getMyNotes } from "./actions/user.action";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const page = async () => {
  const notes = await getMyNotes();

  return (
    <>
      <div className="mt-9 mx-9">
        <Input placeholder="Search" />
      </div>

      <div className="flex flex-col justify-center items-center gap-5 m-5 ">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardContent>{note.title}</CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center items-center mt-10">
        <Link href="/profile" className="bg-primary rounded-lg py-2 px-3">
          Create Profile
        </Link>
      </div>
    </>
  );
};

export default page;
