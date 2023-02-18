import { FaInbox, FaStar, FaCalendarAlt } from "react-icons/fa";

import React from "react";

const filters = [
  { name: "wishlist", icon: <FaInbox /> },
  { name: "metacritic", icon: <FaStar /> },
  { name: "release date", icon: <FaCalendarAlt /> },
];

export default filters;
