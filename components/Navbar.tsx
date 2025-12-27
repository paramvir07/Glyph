import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ui/toggle";
import { useActionState } from "react";
import { addNote } from "@/app/actions/user.action";

const Navbar = () => {
  const [state, action, isPending] = useActionState(
    addNote,
    {error: undefined}
  )
  return (
    <>
      <div className="flex items-center justify-between my-4 mx-4">
        <div className="text-xl font-bold">Glyph</div>
        <div className="flex gap-2 justify-center items-center">
          <Dialog>
            <form action={action}>
              <DialogTrigger asChild>
                <Button variant={"default"}>
                  <Pencil size={12} />
                  <span>New Note</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Note</DialogTitle>
                  <DialogDescription>
                    Add New Note here. Click Add Note when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="title">Title</Label>

                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter Title here"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Enter Content here"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Note</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
