import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import DeleteButton from "@/components/DeleteButton";
import { getMyNotes, updateNotes } from "../actions/user.action";
import AddNoteButton from "@/components/AddNoteButton";

export const dynamic = "force-dynamic";

const page = async () => {
  const notes = await getMyNotes();
  console.log(notes);
  return (
    <>
      <div className="flex justify-center mt-7 text-2xl font-extrabold text-primary">
        My Notes
      </div>
      <div className="flex flex-col justify-center items-center gap-3 my-5 mt-10 mb-5">
        {notes?.length === 0 && (
          <div className="flex flex-col justify-center items-center gap-3 text-center">
            <div>
              You don’t have any notes yet.
              <br />
              Create one to get started.
            </div>
            <AddNoteButton />
          </div>
        )}
        {notes?.map((note) => (
          <Sheet key={note.id}>
            <SheetTrigger asChild>
              <Card className="w-70">
                <CardContent>{note.title}</CardContent>
              </Card>
            </SheetTrigger>
            <form action={updateNotes.bind(null, note.id)} id="update-form">
              <SheetContent className="max-h-full">
                <SheetHeader>
                  <SheetTitle>
                    <Textarea
                      placeholder="Enter Title here"
                      required
                      form="update-form"
                      name="title"
                      defaultValue={note.title}
                      className="w-75 max-h-20 resize-none ml-14 text-xl"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex justify-center items-center mx-5">
                  <Textarea
                    placeholder="Enter Content here"
                    form="update-form"
                    name="content"
                    id="content"
                    className="h-110 resize-none"
                    defaultValue={note.content ?? ""}
                  />
                </div>
                <SheetFooter>
                  <Button form="update-form" type="submit" variant="default">
                    Save changes
                  </Button>
                  <SheetClose asChild>
                    <DeleteButton noteId={note.id} />
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="secondary">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </form>
          </Sheet>
        ))}
      </div>
    </>
  );
};

export default page;
