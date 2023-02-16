import { FaInbox, FaStar, FaCalendarAlt } from "react-icons/fa";

import React from "react";

const filters = [
  { name: "wishlist", icon: <FaInbox /> },
  { name: "ratings", icon: <FaStar /> },
  { name: "reviews", icon: <FaCalendarAlt /> },
];

export default filters;
