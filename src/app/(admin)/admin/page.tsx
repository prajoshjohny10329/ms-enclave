import UserCalendarAvailability from "@/components/User/Booking/UserCalendarAvailability";

export default function AdminHome() {
  return (
    <section>
      <div className="max-w-6xl mx-auto p-6  py-20 grid  md:grid-cols-10 gap-10">
        <div className="md:col-span-6">

        </div>
        
        <div className="md:col-span-4 shadow-md">
          <UserCalendarAvailability />
        </div>
      
      </div>
    </section>
  );
}
