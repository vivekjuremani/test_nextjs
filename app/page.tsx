
import Image from "next/image";
import List from "./List";
import GuestbookEntryForm from "./form";
import { useRouter } from "next/navigation";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <GuestbookEntryForm/>
     <List/>
    </main>
  );
}
