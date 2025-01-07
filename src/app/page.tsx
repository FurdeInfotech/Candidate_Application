import FormComponent from "@/components/FormComponent";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="md:px-24 px-1.5 pb-2 w-full min-h-screen">
      <Navbar />
      <FormComponent />
    </div>
  );
}
