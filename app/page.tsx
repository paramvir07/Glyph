import { getMyNotes, updateNotes } from "./actions/user.action";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import DeleteButton from "@/components/DeleteButton";
const page = async () => {
  const notes = await getMyNotes();

  return (
    <>
      <div className="flex justify-center items-center mt-9 mx-9">
        <Input placeholder="Search" className="w-70" />
      </div>

      <div className="flex flex-col justify-center items-center gap-5 m-5">
        {notes.map((note) => (
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
                  <Button
                    form="update-form"
                    type="submit"
                    className="bg-green-800 hover:bg-green-900"
                  >
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
