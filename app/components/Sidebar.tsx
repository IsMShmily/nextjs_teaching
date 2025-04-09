import React, { Suspense } from "react";
import Link from "next/link";
import SidebarNoteList from "../components/SidebarNoteList";
import EditButton from "./EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
import SidebarSearchField from "./SidebarSearchField";

export default async function Sidebar() {
  return (
    <>
      <section className="col sidebar">
        <Link href={"/"} className="link--unstyled">
          <section className="sidebar-header">
            <img
              className="logo"
              src="/favicon.ico"
              width="22px"
              height="20px"
              alt=""
              role="presentation"
            />
            <strong>React Notes</strong>
          </section>
        </Link>
        <section className="sidebar-menu" role="menubar">
          <SidebarSearchField />
          <EditButton noteId={""}>New</EditButton>
        </section>
        <nav>
          <Suspense fallback={<NoteListSkeleton />}>
            <SidebarNoteList />
          </Suspense>
        </nav>
      </section>
    </>
  );
}
