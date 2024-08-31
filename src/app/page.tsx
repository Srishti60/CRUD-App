import Image from "next/image";
import ToDo from "./Ui/Page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <ToDo/>
    </main>
  );
}
