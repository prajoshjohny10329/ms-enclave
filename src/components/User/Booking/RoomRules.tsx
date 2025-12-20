import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faDoorClosed,
  faSmokingBan,
  faBed,
  faPaw,
  faWaterLadder,
} from "@fortawesome/free-solid-svg-icons";

export default function RoomRules() {
  return (
    <div className="bg-white py-10 text-black">
      <h2 className="font-semibold mb-6 text-gray-800 text-2xl text-shadow-sm">
        Our Room Rules
      </h2>

      <ul className="space-y-4">
        <Rule
          icon={faClock}
          title="Check-in Time"
          description="From 3:00 PM"
        />

        <Rule
          icon={faDoorClosed}
          title="Check-out Time"
          description="By 11:00 AM"
        />

        <Rule
          icon={faClock}
          title="Early / Late Check-in"
          description="Subject to availability and may incur additional charges."
        />

        <Rule
          icon={faSmokingBan}
          title="Smoking Policy"
          description="All rooms are non-smoking. A deep cleaning fee will apply if smoking occurs inside."
        />

        <Rule
          icon={faBed}
          title="Extra Amenities"
          description="Requests for extra bedding, baby cots, or amenities should be made in advance."
        />

        <Rule
          icon={faPaw}
          title="Pets"
          description="Pets are not allowed."
        />

        <Rule
          icon={faWaterLadder}
          title="Swimming Pool"
          description="Swimming pool closed from 10:00 AM to 6:00 PM."
        />
      </ul>
    </div>
  );
}

/* ================= SINGLE RULE ================= */

function Rule({ icon, title, description }: any) {
  return (
    <li className="flex items-start gap-4">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-black">
        <FontAwesomeIcon icon={icon} />
      </div>

      <div>
        <p className="font-semibold font-dm">{title}</p>
        <p className="text-gray-600 text-sm font-dm">{description}</p>
      </div>
    </li>
  );
}
