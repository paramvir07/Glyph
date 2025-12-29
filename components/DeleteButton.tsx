"use client"
import { deleteNote } from "@/app/actions/user.action";
import { Button } from "./ui/button";
import { NoteIdDTO } from "@/types";

const DeleteButton = ({noteId}: NoteIdDTO) => {
  return <Button variant="destructive" onClick={()=>deleteNote(noteId)}>Delete Note</Button>;
};

export default DeleteButton;
