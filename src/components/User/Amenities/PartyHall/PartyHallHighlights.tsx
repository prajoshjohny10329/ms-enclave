import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faRulerCombined,
  faChild,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

type RoomHighlightsProps = {
  beds: number;
  bedType: string;
  maxAdults: number;
  maxChildren: number;
  roomSize: string; // e.g. "45 sqm"
};

export default function PartyHallHighlights({
  beds,
  bedType,
  maxAdults,
  maxChildren,
  roomSize,
}: RoomHighlightsProps) {
  return (
    <div className="bg-white py-10 text-black">
      <h2 className="font-semibold mb-6 text-gray-800 text-2xl text-shadow-sm">
        Room Highlights
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Highlight
          icon={faPeopleGroup}
          title={`${maxAdults} Adults`}
          subtitle="Max Adults"
        />

        <Highlight
          icon={faChild}
          title={`${maxChildren} Children`}

          subtitle="Max Children"
        />

        <Highlight
          icon={faBed}
          title={`${beds} Beds`}
          subtitle={bedType}
        />

        <Highlight
          icon={faRulerCombined}
          title={roomSize}
          subtitle="Room Space"
        />

        
      </div>
    </div>
  );
}

/* ================= SINGLE ITEM ================= */

function Highlight({
  icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-4 shadow-md  rounded-xl hover:shadow transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>

      <p className="font-semibold font-dm">{title}</p>
      <p className="text-gray-600 text-sm font-dm">{subtitle}</p>
    </div>
  );
}
