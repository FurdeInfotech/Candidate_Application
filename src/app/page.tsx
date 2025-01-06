import FormComponent from "@/components/FormComponent";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="px-5 pb-2 w-full min-h-screen">
      <Navbar />
      <FormComponent />
    </div>
  );
}
